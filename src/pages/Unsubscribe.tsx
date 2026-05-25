import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type Status = "loading" | "valid" | "used" | "invalid" | "confirming" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [status, setStatus] = useState<Status>("loading");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    (async () => {
      try {
        const res = await fetch(`${SUPA_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
          headers: { apikey: ANON },
        });
        const json = await res.json();
        if (json.valid) { setStatus("valid"); setEmail(json.email || null); }
        else if (json.used) setStatus("used");
        else setStatus("invalid");
      } catch { setStatus("error"); }
    })();
  }, [token]);

  const confirm = async () => {
    setStatus("confirming");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error || !data?.success) throw new Error("Failed");
      setStatus("done");
    } catch { setStatus("error"); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card border rounded-2xl p-10 text-center">
        <p className="text-xs tracking-[0.18em] uppercase text-accent font-semibold mb-4">Solyn</p>
        {status === "loading" && <p className="text-muted-foreground">Verifying…</p>}
        {status === "invalid" && <p className="text-foreground">This unsubscribe link is invalid.</p>}
        {status === "error" && <p className="text-foreground">Something went wrong. Please try again later.</p>}
        {status === "used" && <p className="text-foreground">You are already unsubscribed.</p>}
        {status === "valid" && (
          <>
            <h1 className="text-2xl font-semibold mb-3">Unsubscribe</h1>
            <p className="text-muted-foreground mb-6">
              Confirm to stop receiving emails{email ? ` at ${email}` : ""}.
            </p>
            <Button onClick={confirm} className="rounded-full">Confirm unsubscribe</Button>
          </>
        )}
        {status === "confirming" && <p className="text-muted-foreground">Processing…</p>}
        {status === "done" && (
          <>
            <h1 className="text-2xl font-semibold mb-3">You're unsubscribed</h1>
            <p className="text-muted-foreground mb-6">You will no longer receive emails from us.</p>
            <Link to="/" className="text-accent underline">Back to home</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
