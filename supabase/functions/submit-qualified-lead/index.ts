import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { funnel, qualification_status, disqualification_reason } = await req.json();
    if (!funnel?.email || !funnel?.full_name || !funnel?.business_name) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const row = {
      full_name: funnel.full_name,
      business_name: funnel.business_name,
      email: funnel.email,
      phone: funnel.phone || null,
      business_description: funnel.business_description || null,
      referral_source: funnel.referral_source || null,
      has_website: !!funnel.has_website,
      website_url: funnel.website_url || null,
      website_issues: funnel.website_issues || [],
      website_keep: funnel.website_keep || null,
      style_inspiration: funnel.style_inspiration || null,
      style_preference: Array.isArray(funnel.style_preference) ? funnel.style_preference.join(",") : (funnel.style_preference || null),
      avoid_text: funnel.avoid_text || null,
      website_type: funnel.website_type || null,
      seo_important: typeof funnel.seo_important === "boolean" ? funnel.seo_important : null,
      ai_ranking: funnel.ai_ranking || null,
      features_needed: funnel.features_needed || [],
      budget_range: funnel.budget_range,
      launch_timeline: funnel.launch_timeline,
      investment_ready: funnel.investment_ready,
      qualification_status,
      disqualification_reason,
      raw_payload: funnel,
    };

    const { data, error } = await supabase.from("qualified_leads").insert(row).select("id").single();
    if (error) throw error;

    // Fire-and-forget transactional emails
    const templateData = {
      ...funnel,
      qualification_status,
      disqualification_reason: disqualification_reason || null,
      lead_id: data.id,
      submitted_at: new Date().toISOString(),
    };
    try {
      await Promise.all([
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "customer-application-received",
            recipientEmail: funnel.email,
            idempotencyKey: `customer-app-${data.id}`,
            templateData: { name: funnel.full_name, business_name: funnel.business_name },
          },
        }),
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "owner-new-application",
            recipientEmail: Deno.env.get("OWNER_EMAIL") || "jasonbalongo@gmail.com",
            idempotencyKey: `owner-app-${data.id}`,
            templateData,
          },
        }),
      ]);
    } catch (mailErr) {
      console.error("email dispatch failed (non-fatal)", mailErr);
    }

    return new Response(JSON.stringify({ ok: true, lead_id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-qualified-lead error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
