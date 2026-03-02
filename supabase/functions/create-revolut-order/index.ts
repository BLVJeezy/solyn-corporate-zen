import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency, description } = await req.json();

    if (!amount || !currency) {
      return new Response(
        JSON.stringify({ error: "amount and currency are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("REVOLUT_API_KEY");
    const merchantId = Deno.env.get("REVOLUT_MERCHANT_ID");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Revolut API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Determine environment from API key prefix
    const isSandbox = apiKey.startsWith("sk_test") || apiKey.startsWith("sand_");
    const baseUrl = isSandbox
      ? "https://sandbox-merchant.revolut.com"
      : "https://merchant.revolut.com";

    const orderPayload: Record<string, unknown> = {
      amount: Math.round(amount * 100), // Convert to minor units (cents)
      currency: currency.toUpperCase(),
      description: description || "Solyn Service Payment",
    };

    if (merchantId) {
      orderPayload.merchant_id = merchantId;
    }

    const response = await fetch(`${baseUrl}/api/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Revolut-Api-Version": "2024-09-01",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Revolut API error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to create order", details: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        token: data.token || data.public_id,
        order_id: data.id,
        mode: isSandbox ? "sandbox" : "prod",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
