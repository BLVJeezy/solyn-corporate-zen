import { useState, useMemo } from "react";
import { Search, Building2, Mail, Phone, Globe, Trash2, Pencil } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClients, useDeleteClient } from "@/hooks/useClients";
import AddClientDialog from "@/components/admin/AddClientDialog";

export default function ClientsSection() {
  const { data: clients = [], isLoading } = useClients();
  const deleteClient = useDeleteClient();
  const [search, setSearch] = useState("");

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
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
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
              <TableHead className="text-muted-foreground hidden md:table-cell">E-mail</TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">Telefoon</TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">Sinds</TableHead>
              <TableHead className="text-muted-foreground w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((client) => (
              <TableRow key={client.id} className="border-border">
                <TableCell className="font-medium text-card-foreground">{client.name}</TableCell>
                <TableCell className="text-muted-foreground hidden md:table-cell">
                  {client.company || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground hidden md:table-cell">
                  {client.email || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground hidden lg:table-cell">
                  {client.phone || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground hidden lg:table-cell">
                  {format(new Date(client.created_at), "d MMM yyyy", { locale: nl })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(client.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
