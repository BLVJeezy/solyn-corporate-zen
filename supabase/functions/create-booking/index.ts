import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { lead_id, scheduled_at, timezone } = await req.json();
    if (!lead_id || !scheduled_at) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Verify the lead exists and is qualified
    const { data: lead, error: leadErr } = await supabase
      .from("qualified_leads")
      .select("id, full_name, email, qualification_status")
      .eq("id", lead_id)
      .maybeSingle();
    if (leadErr || !lead) throw new Error("Lead not found");
    if (lead.qualification_status !== "qualified") throw new Error("Lead is not qualified");

    // Server-side conflict check
    const slot = new Date(scheduled_at);
    if (isNaN(slot.getTime())) throw new Error("Invalid scheduled_at");
    if (slot.getTime() < Date.now() + 60 * 60 * 1000) throw new Error("Slot is in the past or too soon");

    const { data: existing } = await supabase
      .from("bookings")
      .select("id")
      .eq("scheduled_at", slot.toISOString())
      .neq("status", "cancelled")
      .maybeSingle();
    if (existing) throw new Error("That slot was just taken — please pick another.");

    const { data: booking, error: bErr } = await supabase
      .from("bookings")
      .insert({
        lead_id,
        scheduled_at: slot.toISOString(),
        duration_minutes: 30,
        timezone: timezone || "Europe/Brussels",
        status: "scheduled",
      })
      .select("id")
      .single();
    if (bErr) throw bErr;

    // Pull full lead details for owner email
    const { data: fullLead } = await supabase
      .from("qualified_leads")
      .select("full_name, business_name, email, phone, business_description, budget_range, launch_timeline")
      .eq("id", lead_id)
      .maybeSingle();

    const tz = timezone || "Europe/Brussels";
    try {
      await Promise.all([
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "customer-booking-confirmed",
            recipientEmail: lead.email,
            idempotencyKey: `customer-booking-${booking.id}`,
            templateData: {
              name: lead.full_name,
              scheduled_at: slot.toISOString(),
              timezone: tz,
              meeting_link: "",
            },
          },
        }),
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "owner-new-booking",
            recipientEmail: "owner@placeholder",
            idempotencyKey: `owner-booking-${booking.id}`,
            templateData: {
              ...(fullLead || { full_name: lead.full_name, email: lead.email }),
              scheduled_at: slot.toISOString(),
              timezone: tz,
              lead_id,
              booking_id: booking.id,
            },
          },
        }),
      ]);
    } catch (mailErr) {
      console.error("email dispatch failed (non-fatal)", mailErr);
    }

    return new Response(JSON.stringify({ ok: true, booking_id: booking.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-booking error:", e);
    return new Response(JSON.stringify({ ok: false, error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
