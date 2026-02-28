import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCreateClient } from "@/hooks/useClients";

export default function AddClientDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", website: "", notes: "" });
  const createClient = useCreateClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createClient.mutate(form, {
      onSuccess: () => {
        setOpen(false);
        setForm({ name: "", company: "", email: "", phone: "", website: "", notes: "" });
      },
    });
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" /> Nieuwe Klant
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Nieuwe Klant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Naam *" required value={form.name} onChange={set("name")} className="bg-muted border-border" />
          <Input placeholder="Bedrijf" value={form.company} onChange={set("company")} className="bg-muted border-border" />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="E-mail" type="email" value={form.email} onChange={set("email")} className="bg-muted border-border" />
            <Input placeholder="Telefoon" value={form.phone} onChange={set("phone")} className="bg-muted border-border" />
          </div>
          <Input placeholder="Website" value={form.website} onChange={set("website")} className="bg-muted border-border" />
          <Textarea placeholder="Notities" value={form.notes} onChange={set("notes")} className="bg-muted border-border" />
          <Button type="submit" className="w-full" disabled={createClient.isPending}>
            {createClient.isPending ? "Opslaan..." : "Klant Aanmaken"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
