import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCreateLead } from "@/hooks/useLeads";

export default function AddLeadDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", budget: "", message: "" });
  const createLead = useCreateLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLead.mutate(
      { ...form, status: "nieuw" as const },
      { onSuccess: () => { setOpen(false); setForm({ name: "", company: "", email: "", phone: "", budget: "", message: "" }); } }
    );
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" /> Nieuwe Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Nieuwe Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Naam *" required value={form.name} onChange={set("name")} className="bg-muted border-border" />
          <Input placeholder="Bedrijf" value={form.company} onChange={set("company")} className="bg-muted border-border" />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="E-mail" type="email" value={form.email} onChange={set("email")} className="bg-muted border-border" />
            <Input placeholder="Telefoon" value={form.phone} onChange={set("phone")} className="bg-muted border-border" />
          </div>
          <Input placeholder="Budget (bijv. €1.500)" value={form.budget} onChange={set("budget")} className="bg-muted border-border" />
          <Textarea placeholder="Bericht / opmerking" value={form.message} onChange={set("message")} className="bg-muted border-border" />
          <Button type="submit" className="w-full" disabled={createLead.isPending}>
            {createLead.isPending ? "Opslaan..." : "Lead Aanmaken"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
