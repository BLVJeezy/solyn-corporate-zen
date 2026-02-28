import { useState, useMemo } from "react";
import { Search, Trash2, Pencil } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useClients, useDeleteClient, Client } from "@/hooks/useClients";
import AddClientDialog from "@/components/admin/AddClientDialog";
import EditClientDialog from "@/components/admin/EditClientDialog";
import ClientDetailPanel from "@/components/admin/ClientDetailPanel";

export default function ClientsSection() {
  const { data: clients = [], isLoading } = useClients();
  const deleteClient = useDeleteClient();
  const [search, setSearch] = useState("");
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filtered = useMemo(() => {
    if (!search) return clients;
    const q = search.toLowerCase();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.company?.toLowerCase() || "").includes(q) ||
        (c.email?.toLowerCase() || "").includes(q)
    );
  }, [clients, search]);

  const handleDelete = (id: string) => {
    if (confirm("Weet je zeker dat je deze klant wilt verwijderen?")) {
      deleteClient.mutate(id);
      if (selectedClient?.id === id) setSelectedClient(null);
    }
  };

  // Keep selected client in sync
  const activeClient = selectedClient ? clients.find((c) => c.id === selectedClient.id) || null : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-lg font-semibold text-card-foreground">Klanten ({clients.length})</h2>
          <AddClientDialog />
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Zoek op naam, bedrijf of e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-muted border-border"
          />
        </div>

        {isLoading ? (
          <p className="text-muted-foreground text-sm py-8 text-center">Laden...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">Geen klanten gevonden</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Naam</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Bedrijf</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Setup Fee</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Fee</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Startdatum</TableHead>
                <TableHead className="text-muted-foreground w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((client) => (
                <TableRow
                  key={client.id}
                  className={`border-border cursor-pointer transition-colors hover:bg-muted/50 ${activeClient?.id === client.id ? "bg-muted/50" : ""}`}
                  onClick={() => setSelectedClient(client)}
                >
                  <TableCell>
                    <div className="font-medium text-card-foreground">{client.name}</div>
                    {client.email && <div className="text-xs text-muted-foreground">{client.email}</div>}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">{client.company || "—"}</TableCell>
                  <TableCell className="text-primary font-semibold hidden lg:table-cell">{client.setup_fee ? `€${client.setup_fee}` : "—"}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {client.recurring_fee ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-primary font-semibold">€{client.recurring_fee}</span>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {client.billing_cycle === "jaarlijks" ? "/jaar" : "/mnd"}
                        </Badge>
                      </div>
                    ) : "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {client.start_date ? format(new Date(client.start_date), "d MMM yyyy", { locale: nl }) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setEditingClient(client)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(client.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {editingClient && (
          <EditClientDialog
            client={editingClient}
            open={!!editingClient}
            onOpenChange={(open) => { if (!open) setEditingClient(null); }}
          />
        )}
      </div>

      {/* Detail Panel - hide empty state on mobile */}
      <div className="lg:col-span-1">
        {activeClient ? (
          <ClientDetailPanel client={activeClient} onClose={() => setSelectedClient(null)} />
        ) : (
          <div className="hidden lg:block bg-card rounded-lg border border-border p-8 text-center">
            <p className="text-muted-foreground text-sm">Selecteer een klant om details en facturen te bekijken</p>
          </div>
        )}
      </div>
    </div>
  );
}
