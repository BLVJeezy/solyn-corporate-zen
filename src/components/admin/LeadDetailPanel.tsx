import { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { X, Send, Building2, Mail, Phone, Calendar, MessageSquare, PhoneCall, MessageCircle } from "lucide-react";
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
  lead: Lead;
  onClose: () => void;
}

export default function LeadDetailPanel({ lead, onClose }: Props) {
  const [note, setNote] = useState("");
  const { data: notes = [] } = useLeadNotes(lead.id);
  const updateLead = useUpdateLead();
  const addNote = useAddNote();
  const deleteLead = useDeleteLead();

  const budget = parseEuro(lead.budget);
  const isTargetDeal = budget >= 750 && budget <= 2000;
  const isPaid = lead.status === "gewonnen";

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
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-card-foreground">{lead.name}</h2>
          {lead.company && (
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
              <Building2 className="w-3.5 h-3.5" />
              {lead.company}
            </div>
          )}
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Payment & Deal Status */}
        <div className="flex gap-2 flex-wrap">
          <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md font-medium ${
            isPaid 
              ? "bg-green-500/10 text-green-500 border border-green-500/20" 
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}>
            {isPaid ? "✅ Fee voldaan" : "⚠️ Betaal de fee"}
          </div>
          {isTargetDeal && (
            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md font-medium bg-primary/10 text-primary border border-primary/20">
              🎯 Target Deal
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex flex-col items-center gap-1 bg-muted rounded-lg p-3 hover:bg-muted/70 transition-colors">
              <PhoneCall className="w-5 h-5 text-primary" />
              <span className="text-[10px] text-muted-foreground">Bellen</span>
            </a>
          )}
          {lead.phone && (
            <a href={`https://wa.me/${lead.phone.replace(/[^0-9+]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 bg-muted rounded-lg p-3 hover:bg-muted/70 transition-colors">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-[10px] text-muted-foreground">WhatsApp</span>
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="flex flex-col items-center gap-1 bg-muted rounded-lg p-3 hover:bg-muted/70 transition-colors">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-[10px] text-muted-foreground">E-mail</span>
            </a>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Status</label>
          <Select value={lead.status} onValueChange={(v) => handleStatusChange(v as LeadStatus)}>
            <SelectTrigger className="bg-muted border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contact & Deal info */}
        <div className="bg-muted rounded-lg p-3 space-y-2">
          {lead.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <a href={`mailto:${lead.email}`} className="text-primary hover:underline truncate">{lead.email}</a>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a>
            </div>
          )}
          {lead.budget && (
            <div className="flex items-center justify-between text-sm pt-1 border-t border-border">
              <span className="text-muted-foreground">Budget</span>
              <span className={`font-semibold ${isTargetDeal ? "text-primary" : "text-card-foreground"}`}>{lead.budget}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(lead.created_at), "d MMM yyyy, HH:mm", { locale: nl })}
          </div>
        </div>

        {lead.message && (
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Bericht</label>
            <p className="text-sm text-card-foreground bg-muted p-3 rounded-md">{lead.message}</p>
          </div>
        )}

        {/* Notes */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            <label className="text-xs text-muted-foreground font-medium">Notities ({notes.length})</label>
          </div>
          <div className="flex gap-2 mb-3">
            <Textarea
              placeholder="Schrijf een notitie..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-muted border-border text-sm min-h-[60px]"
            />
            <Button size="icon" variant="ghost" onClick={handleAddNote} disabled={!note.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {notes.map((n) => (
              <div key={n.id} className="bg-muted rounded-md p-3">
                <p className="text-sm text-card-foreground">{n.content}</p>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {format(new Date(n.created_at), "d MMM yyyy, HH:mm", { locale: nl })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button variant="destructive" size="sm" className="w-full" onClick={handleDelete}>
          Lead verwijderen
        </Button>
      </div>
    </div>
  );
}
