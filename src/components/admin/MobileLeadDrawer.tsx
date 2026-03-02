import { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Phone, MessageCircle, Send, Mail, Building2, Calendar, MessageSquare } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lead, LeadStatus, useLeadNotes, useUpdateLead, useAddNote, useDeleteLead } from "@/hooks/useLeads";

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
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

export default function MobileLeadDrawer({ lead, open, onClose }: Props) {
  const [note, setNote] = useState("");
  const { data: notes = [] } = useLeadNotes(lead?.id ?? null);
  const updateLead = useUpdateLead();
  const addNote = useAddNote();
  const deleteLead = useDeleteLead();

  if (!lead) return null;

  const budget = parseEuro(lead.budget);
  const isTargetDeal = budget >= 750 && budget <= 2000;
  // Simple heuristic: "gewonnen" = fee paid
  const feePaid = lead.status === "gewonnen";

  const handleStatusChange = (status: LeadStatus) => {
    updateLead.mutate({ id: lead.id, status });
  };

  const handleAddNote = () => {
    if (!note.trim()) return;
    addNote.mutate({ lead_id: lead.id, content: note.trim() });
    setNote("");
  };

  const handleDelete = () => {
    if (confirm("Weet je zeker dat je deze lead wilt verwijderen?")) {
      deleteLead.mutate(lead.id);
      onClose();
    }
  };

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="text-left text-base">{lead.name}</DrawerTitle>
          {lead.company && (
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Building2 className="w-3 h-3" />
              {lead.company}
            </div>
          )}
        </DrawerHeader>

        <div className="px-4 pb-6 space-y-4 overflow-y-auto">
          {/* Payment + Deal indicators */}
          <div className="flex gap-2">
            <div className={`flex-1 rounded-lg border p-3 text-center text-xs font-medium ${feePaid ? "border-green-500/30 bg-green-500/10 text-green-500" : "border-destructive/30 bg-destructive/10 text-destructive"}`}>
              {feePaid ? "✅ Fee voldaan" : "⚠️ Betaal de fee"}
            </div>
            {lead.budget && (
              <div className={`flex-1 rounded-lg border p-3 text-center text-xs font-medium ${isTargetDeal ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground"}`}>
                {lead.budget} {isTargetDeal && "🎯"}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2">
            {lead.phone && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs border-border"
                onClick={() => window.open(`tel:${lead.phone}`)}
              >
                <Phone className="w-3.5 h-3.5" /> Bel
              </Button>
            )}
            {lead.phone && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs border-border"
                onClick={() => window.open(`https://wa.me/${lead.phone?.replace(/[^0-9+]/g, "")}`)}
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </Button>
            )}
            {lead.email && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs border-border"
                onClick={() => window.open(`mailto:${lead.email}`)}
              >
                <Mail className="w-3.5 h-3.5" /> Mail
              </Button>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Status</label>
            <Select value={lead.status} onValueChange={(v) => handleStatusChange(v as LeadStatus)}>
              <SelectTrigger className="bg-muted border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusConfig).map(([key, cfg]) => (
                  <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact details */}
          <div className="space-y-1.5 text-xs text-muted-foreground">
            {lead.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" /> {lead.email}
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" /> {lead.phone}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              {format(new Date(lead.created_at), "d MMM yyyy, HH:mm", { locale: nl })}
            </div>
          </div>

          {lead.message && (
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Bericht</label>
              <p className="text-xs text-card-foreground bg-muted p-3 rounded-md">{lead.message}</p>
            </div>
          )}

          {/* Notes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
              <label className="text-xs text-muted-foreground font-medium">Notities ({notes.length})</label>
            </div>
            <div className="flex gap-2 mb-2">
              <Textarea
                placeholder="Schrijf een notitie..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-muted border-border text-xs min-h-[50px]"
              />
              <Button size="icon" variant="ghost" onClick={handleAddNote} disabled={!note.trim()}>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {notes.map((n) => (
                <div key={n.id} className="bg-muted rounded-md p-2.5">
                  <p className="text-xs text-card-foreground">{n.content}</p>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">
                    {format(new Date(n.created_at), "d MMM, HH:mm", { locale: nl })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button variant="destructive" size="sm" className="w-full text-xs" onClick={handleDelete}>
            Lead verwijderen
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
