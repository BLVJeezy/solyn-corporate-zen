import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BillingCycle, useCreateClient } from "@/hooks/useClients";

export default function AddClientDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", website: "", notes: "",
    setup_fee: "", recurring_fee: "", billing_cycle: "maandelijks" as BillingCycle,
    start_date: undefined as Date | undefined, credits_used: "",
  });
  const createClient = useCreateClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createClient.mutate(
      {
        name: form.name,
        company: form.company || null,
        email: form.email || null,
        phone: form.phone || null,
        website: form.website || null,
        notes: form.notes || null,
        setup_fee: form.setup_fee || null,
        recurring_fee: form.recurring_fee || null,
        billing_cycle: form.billing_cycle,
        start_date: form.start_date ? format(form.start_date, "yyyy-MM-dd") : null,
        credits_used: form.credits_used ? parseInt(form.credits_used) : null,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setForm({ name: "", company: "", email: "", phone: "", website: "", notes: "", setup_fee: "", recurring_fee: "", billing_cycle: "maandelijks", start_date: undefined, credits_used: "" });
        },
      }
    );
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
      <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto">
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Setup Fee</label>
              <Input placeholder="bijv. €500" value={form.setup_fee} onChange={set("setup_fee")} className="bg-muted border-border" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Terugkerende Fee</label>
              <Input placeholder="bijv. €150" value={form.recurring_fee} onChange={set("recurring_fee")} className="bg-muted border-border" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Cyclus</label>
              <Select value={form.billing_cycle} onValueChange={(v) => setForm((f) => ({ ...f, billing_cycle: v as BillingCycle }))}>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maandelijks">Maandelijks</SelectItem>
                  <SelectItem value="jaarlijks">Jaarlijks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Startdatum</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className={cn("w-full justify-start text-left font-normal bg-muted border-border", !form.start_date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.start_date ? format(form.start_date, "d MMM yyyy") : "Kies datum"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.start_date}
                    onSelect={(d) => setForm((f) => ({ ...f, start_date: d }))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Credits gebruikt</label>
            <Input placeholder="bijv. 45" type="number" min="0" value={form.credits_used} onChange={set("credits_used")} className="bg-muted border-border" />
            {form.credits_used && parseInt(form.credits_used) > 0 && (
              <p className="text-xs text-muted-foreground mt-1">Kosten: €{(parseInt(form.credits_used) * 0.23).toFixed(2)}</p>
            )}
          </div>
          <Textarea placeholder="Notities" value={form.notes} onChange={set("notes")} className="bg-muted border-border" />
          <Button type="submit" className="w-full" disabled={createClient.isPending}>
            {createClient.isPending ? "Opslaan..." : "Klant Aanmaken"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
