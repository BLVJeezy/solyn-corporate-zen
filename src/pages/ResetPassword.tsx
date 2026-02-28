import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Wachtwoord moet minimaal 6 tekens zijn");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) toast.error(error.message);
    else {
      toast.success("Wachtwoord gewijzigd!");
      navigate("/admin");
    }
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
          <h1 className="text-xl font-bold text-card-foreground text-center mb-1">Nieuw Wachtwoord</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Voer je nieuwe wachtwoord in</p>
          <form onSubmit={handleReset} className="space-y-3">
            <Input
              type="password"
              placeholder="Nieuw wachtwoord (min. 6 tekens)"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted border-border"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Opslaan..." : "Wachtwoord Wijzigen"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
