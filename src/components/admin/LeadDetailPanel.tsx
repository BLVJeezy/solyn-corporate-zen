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
  nieuw: { label: "Nieuw", className: "bg-blue-50 text-blue-700 border-blue-200" },
  in_behandeling: { label: "In behandeling", className: "bg-amber-50 text-amber-700 border-amber-200" },
  gewonnen: { label: "Gewonnen", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  verloren: { label: "Verloren", className: "bg-red-50 text-red-700 border-red-200" },
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
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-2 duration-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">{lead.name}</h2>
          {lead.company && (
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-0.5">
              <Building2 className="w-3.5 h-3.5" />
              {lead.company}
            </div>
          )}
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Payment & Deal Status */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className={`text-xs font-medium border ${
            isPaid
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}>
            {isPaid ? "✅ Fee voldaan" : "⚠️ Betaal de fee"}
          </Badge>
          {isTargetDeal && (
            <Badge variant="outline" className="text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200">
              🎯 Target Deal
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex flex-col items-center gap-1.5 bg-muted/50 rounded-xl p-3 hover:bg-muted transition-colors border border-transparent hover:border-border">
              <PhoneCall className="w-4 h-4 text-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium">Bellen</span>
            </a>
          )}
          {lead.phone && (
            <a href={`https://wa.me/${lead.phone.replace(/[^0-9+]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 bg-muted/50 rounded-xl p-3 hover:bg-muted transition-colors border border-transparent hover:border-border">
              <MessageCircle className="w-4 h-4 text-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium">WhatsApp</span>
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="flex flex-col items-center gap-1.5 bg-muted/50 rounded-xl p-3 hover:bg-muted transition-colors border border-transparent hover:border-border">
              <Mail className="w-4 h-4 text-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium">E-mail</span>
            </a>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Status</label>
          <Select value={lead.status} onValueChange={(v) => handleStatusChange(v as LeadStatus)}>
            <SelectTrigger className="bg-card border-border shadow-sm h-9">
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
        <div className="bg-muted/40 rounded-xl p-4 space-y-2.5 border border-border/50">
          {lead.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <a href={`mailto:${lead.email}`} className="text-foreground hover:underline truncate text-sm">{lead.email}</a>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <a href={`tel:${lead.phone}`} className="text-foreground hover:underline text-sm">{lead.phone}</a>
            </div>
          )}
          {lead.budget && (
            <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-semibold text-foreground tabular-nums">{lead.budget}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(lead.created_at), "d MMM yyyy, HH:mm", { locale: nl })}
          </div>
        </div>

        {lead.message && (
          <div>
            <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Bericht</label>
            <p className="text-sm text-foreground bg-muted/40 p-3 rounded-lg border border-border/50">{lead.message}</p>
          </div>
        )}

        {/* Notes */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
            <label className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Notities ({notes.length})</label>
          </div>
          <div className="flex gap-2 mb-3">
            <Textarea
              placeholder="Schrijf een notitie..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-card border-border text-sm min-h-[60px] shadow-sm"
            />
            <Button size="icon" variant="outline" className="shrink-0 shadow-sm" onClick={handleAddNote} disabled={!note.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {notes.map((n) => (
              <div key={n.id} className="bg-muted/40 rounded-lg p-3 border border-border/50">
                <p className="text-sm text-foreground">{n.content}</p>
                <span className="text-[11px] text-muted-foreground mt-1 block">
                  {format(new Date(n.created_at), "d MMM yyyy, HH:mm", { locale: nl })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/20" onClick={handleDelete}>
          Lead verwijderen
        </Button>
      </div>
    </div>
  );
}
