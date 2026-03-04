import { useState, useMemo } from "react";
import { Search, Trash2, Pencil, Building2 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useClients, useDeleteClient, Client } from "@/hooks/useClients";
import { useIsMobile } from "@/hooks/use-mobile";
import AddClientDialog from "@/components/admin/AddClientDialog";
import EditClientDialog from "@/components/admin/EditClientDialog";
import ClientDetailPanel from "@/components/admin/ClientDetailPanel";
import MobileClientCard from "@/components/admin/MobileClientCard";
import MobileClientDrawer from "@/components/admin/MobileClientDrawer";

export default function ClientsSection() {
  const { data: clients = [], isLoading } = useClients();
  const deleteClient = useDeleteClient();
  const isMobile = useIsMobile();
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

  const activeClient = selectedClient ? clients.find((c) => c.id === selectedClient.id) || null : null;

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Klanten</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{clients.length} klanten</p>
          </div>
          <AddClientDialog />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op naam, bedrijf of e-mail..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm bg-card border-border shadow-sm"
              />
            </div>

            {/* Table Card */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              {isLoading ? (
                <div className="p-4 space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <Building2 className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Geen klanten gevonden</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Voeg een nieuwe klant toe om te beginnen</p>
                </div>
              ) : isMobile ? (
                <div className="divide-y divide-border">
                  {filtered.map((client) => (
                    <MobileClientCard
                      key={client.id}
                      client={client}
                      isActive={activeClient?.id === client.id}
                      onClick={() => setSelectedClient(client)}
                    />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="text-xs font-medium text-muted-foreground h-10">Naam</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground h-10 hidden md:table-cell">Bedrijf</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground h-10 hidden lg:table-cell text-right">Setup Fee</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground h-10 hidden lg:table-cell text-right">Fee</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground h-10 hidden md:table-cell">Startdatum</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground h-10 w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((client) => (
                      <TableRow
                        key={client.id}
                        className={`cursor-pointer transition-colors hover:bg-muted/40 ${activeClient?.id === client.id ? "bg-accent/5 border-l-2 border-l-foreground" : ""}`}
                        onClick={() => setSelectedClient(client)}
                      >
                        <TableCell className="py-3">
                          <div className="font-medium text-sm text-foreground">{client.name}</div>
                          {client.email && <div className="text-xs text-muted-foreground">{client.email}</div>}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden md:table-cell">{client.company || "—"}</TableCell>
                        <TableCell className="text-sm font-medium text-foreground hidden lg:table-cell text-right tabular-nums">{client.setup_fee ? `€${client.setup_fee}` : "—"}</TableCell>
                        <TableCell className="hidden lg:table-cell text-right">
                          {client.recurring_fee ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <span className="text-sm font-medium text-foreground tabular-nums">€{client.recurring_fee}</span>
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                {client.billing_cycle === "jaarlijks" ? "/jaar" : "/mnd"}
                              </Badge>
                            </div>
                          ) : "—"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden md:table-cell tabular-nums">
                          {client.start_date ? format(new Date(client.start_date), "d MMM yyyy", { locale: nl }) : "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-0.5" onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => setEditingClient(client)}>
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(client.id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              {activeClient ? (
                <ClientDetailPanel client={activeClient} onClose={() => setSelectedClient(null)} />
              ) : (
                <div className="bg-card rounded-xl border border-border shadow-sm p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Selecteer een klant</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Klik op een rij voor details en facturen</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {editingClient && (
        <EditClientDialog
          client={editingClient}
          open={!!editingClient}
          onOpenChange={(open) => { if (!open) setEditingClient(null); }}
        />
      )}

      {/* Mobile Drawer */}
      <MobileClientDrawer
        client={activeClient}
        open={isMobile && !!activeClient}
        onClose={() => setSelectedClient(null)}
        onEdit={(c) => { setEditingClient(c); setSelectedClient(null); }}
      />
    </>
  );
}
