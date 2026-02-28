import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/admin", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) toast.error(error.message);else
    toast.success("Reset link verstuurd naar je e-mail");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-card-foreground text-center mb-1">Solyn Clients</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {mode === "login" ? "Log in om verder te gaan" : "Voer je e-mail in voor een reset link"}
          </p>

          {mode === "login" ?
          <form onSubmit={handleLogin} className="space-y-3">
              <Input
              type="email"
              placeholder="E-mailadres"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted border-border" />

              <Input
              type="password"
              placeholder="Wachtwoord"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted border-border" />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Inloggen..." : "Inloggen"}
              </Button>
              <button
              type="button"
              onClick={() => setMode("forgot")}
              className="text-xs text-muted-foreground hover:text-primary w-full text-center mt-2 transition-colors">

                Wachtwoord vergeten?
              </button>
            </form> :

          <form onSubmit={handleForgotPassword} className="space-y-3">
              <Input
              type="email"
              placeholder="E-mailadres"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted border-border" />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Versturen..." : "Reset Link Versturen"}
              </Button>
              <button
              type="button"
              onClick={() => setMode("login")}
              className="text-xs text-muted-foreground hover:text-primary w-full text-center mt-2 transition-colors">

                Terug naar inloggen
              </button>
            </form>
          }
        </div>
      </div>
    </div>);

}