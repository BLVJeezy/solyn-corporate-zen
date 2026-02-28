import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Client, BillingCycle, useUpdateClient } from "@/hooks/useClients";

interface Props {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditClientDialog({ client, open, onOpenChange }: Props) {
  const [form, setForm] = useState({
    name: client.name,
    company: client.company || "",
    email: client.email || "",
    phone: client.phone || "",
    website: client.website || "",
    notes: client.notes || "",
    setup_fee: client.setup_fee || "",
    recurring_fee: client.recurring_fee || "",
    billing_cycle: (client.billing_cycle || "maandelijks") as BillingCycle,
    start_date: client.start_date ? new Date(client.start_date) : undefined as Date | undefined,
  });

  const updateClient = useUpdateClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClient.mutate(
      {
        id: client.id,
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
      },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Klant Bewerken</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Naam *" required value={form.name} onChange={set("name")} className="bg-muted border-border" />
          <Input placeholder="Bedrijf" value={form.company} onChange={set("company")} className="bg-muted border-border" />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="E-mail" type="email" value={form.email} onChange={set("email")} className="bg-muted border-border" />
            <Input placeholder="Telefoon" value={form.phone} onChange={set("phone")} className="bg-muted border-border" />
          </div>
          <Input placeholder="Website" value={form.website} onChange={set("website")} className="bg-muted border-border" />

          {/* Fees */}
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

          <Textarea placeholder="Notities" value={form.notes} onChange={set("notes")} className="bg-muted border-border" />
          <Button type="submit" className="w-full" disabled={updateClient.isPending}>
            {updateClient.isPending ? "Opslaan..." : "Opslaan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
