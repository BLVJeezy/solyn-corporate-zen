import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Lead, LeadStatus } from "@/hooks/useLeads";

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  nieuw: { label: "Nieuw", className: "bg-steel/20 text-steel border-steel/30" },
  in_behandeling: { label: "In behandeling", className: "bg-primary/20 text-primary border-primary/30" },
  gewonnen: { label: "Gewonnen", className: "bg-green-500/20 text-green-500 border-green-500/30" },
  verloren: { label: "Verloren", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

function parseEuro(val: string | null): number {
  if (!val) return 0;
  const cleaned = val.replace(/[€\s]/g, "").replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

interface Props {
  lead: Lead;
  onClick: () => void;
}

export default function MobileLeadCard({ lead, onClick }: Props) {
  const budget = parseEuro(lead.budget);
  const isTargetDeal = budget >= 750 && budget <= 2000;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card rounded-lg border border-border p-4 active:bg-muted/50 transition-colors"
    >
      {/* Header: Company + Status */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-semibold text-card-foreground truncate text-sm">
          {lead.company || lead.name}
        </span>
        <Badge variant="secondary" className={`${statusConfig[lead.status]?.className} text-[10px] shrink-0`}>
          {statusConfig[lead.status]?.label}
        </Badge>
      </div>

      {/* Body: Contact + Date */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="truncate">{lead.company ? lead.name : "—"}</span>
        <span className="shrink-0 ml-2">
          {format(new Date(lead.created_at), "d MMM", { locale: nl })}
        </span>
      </div>

      {/* Budget indicator */}
      {lead.budget && (
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-xs font-semibold ${isTargetDeal ? "text-primary" : "text-muted-foreground"}`}>
            {lead.budget}
          </span>
          {isTargetDeal && (
            <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">Target</span>
          )}
        </div>
      )}
    </button>
  );
}
