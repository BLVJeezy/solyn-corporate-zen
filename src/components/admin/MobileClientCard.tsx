import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/hooks/useClients";

function parseEuro(val: string | null): number {
  if (!val) return 0;
  const cleaned = val.replace(/[€\s]/g, "").replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

interface Props {
  client: Client;
  onClick: () => void;
  isActive?: boolean;
}

export default function MobileClientCard({ client, onClick, isActive }: Props) {
  const setupFee = parseEuro(client.setup_fee);
  const recurringFee = parseEuro(client.recurring_fee);
  const totalRevenue = setupFee + (client.billing_cycle === "jaarlijks" ? recurringFee : recurringFee * 12);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-card rounded-lg border p-4 active:bg-muted/50 transition-colors ${
        isActive ? "border-primary/50 bg-muted/30" : "border-border"
      }`}
    >
      {/* Header: Name + Billing Badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-semibold text-card-foreground truncate text-sm">
          {client.company || client.name}
        </span>
        {client.billing_cycle && (
          <Badge variant="secondary" className="text-[10px] shrink-0 bg-primary/15 text-primary border-primary/25">
            {client.billing_cycle === "jaarlijks" ? "Jaarlijks" : "Maandelijks"}
          </Badge>
        )}
      </div>

      {/* Body: Contact + Start date */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="truncate">{client.company ? client.name : (client.email || "—")}</span>
        <span className="shrink-0 ml-2">
          {client.start_date
            ? format(new Date(client.start_date), "d MMM", { locale: nl })
            : format(new Date(client.created_at), "d MMM", { locale: nl })}
        </span>
      </div>

      {/* Fee indicators */}
      <div className="mt-2 flex items-center gap-3 flex-wrap">
        {client.setup_fee && (
          <span className="text-xs text-muted-foreground">
            Setup: <span className="font-semibold text-primary">€{client.setup_fee}</span>
          </span>
        )}
        {client.recurring_fee && (
          <span className="text-xs text-muted-foreground">
            Fee: <span className="font-semibold text-primary">€{client.recurring_fee}</span>
            <span className="text-[10px]">{client.billing_cycle === "jaarlijks" ? "/jaar" : "/mnd"}</span>
          </span>
        )}
      </div>

      {/* Credits indicator */}
      {client.credits_used != null && client.credits_used > 0 && (
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">
            {client.credits_used} credits
          </span>
          <span className="text-[10px] text-red-500 font-medium">
            -€{(client.credits_used * 0.23).toFixed(2)}
          </span>
        </div>
      )}
    </button>
  );
}
