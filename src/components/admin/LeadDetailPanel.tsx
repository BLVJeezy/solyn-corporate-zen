import { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { X, Send, Building2, Mail, Phone, Calendar, MessageSquare } from "lucide-react";
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

        {/* Contact info */}
        <div className="space-y-2">
          {lead.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-3.5 h-3.5" /> {lead.email}
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-3.5 h-3.5" /> {lead.phone}
            </div>
          )}
          {lead.budget && (
            <div className="text-sm">
              <span className="text-muted-foreground">Budget: </span>
              <span className="text-primary font-semibold">{lead.budget}</span>
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
