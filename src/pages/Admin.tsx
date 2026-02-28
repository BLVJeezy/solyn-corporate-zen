import { useState, useMemo } from "react";
import { ArrowLeft, Users, DollarSign, BarChart3, Search, LogOut, Euro, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useLeads, Lead, LeadStatus } from "@/hooks/useLeads";
import { useClients } from "@/hooks/useClients";
import LeadDetailPanel from "@/components/admin/LeadDetailPanel";
import AddLeadDialog from "@/components/admin/AddLeadDialog";
import ClientsSection from "@/components/admin/ClientsSection";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

/** Parse a euro string like "1.500", "€1500", "1500,50" to a number */
function parseEuro(val: string | null): number {
  if (!val) return 0;
  const cleaned = val.replace(/[€\s]/g, "").replace(/\./g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/** Format number as euro */
function fmtEuro(val: number): string {
  return "€" + val.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  nieuw: { label: "Nieuw", className: "bg-steel/20 text-steel" },
  in_behandeling: { label: "In behandeling", className: "bg-primary/20 text-primary" },
  gewonnen: { label: "Gewonnen", className: "bg-green-500/20 text-green-500" },
  verloren: { label: "Verloren", className: "bg-destructive/20 text-destructive" },
};


const AdminPage = () => {
  const { signOut } = useAuth();
  const { data: leads = [], isLoading } = useLeads();
  const { data: clients = [] } = useClients();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        !search ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        (l.company?.toLowerCase() || "").includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  // Live stats from data
  const totalLeads = leads.length;
  const avgBudget = leads.length
    ? fmtEuro(Math.round(leads.reduce((sum, l) => sum + parseEuro(l.budget), 0) / leads.length))
    : "€0";
  const wonLeads = leads.filter((l) => l.status === "gewonnen").length;
  const conversionRate = totalLeads ? ((wonLeads / totalLeads) * 100).toFixed(1) + "%" : "0%";

  // Revenue stats from clients
  const totalSetupFees = clients.reduce((sum, c) => sum + parseEuro(c.setup_fee), 0);
  const totalRecurringMonthly = clients.reduce((sum, c) => {
    const fee = parseEuro(c.recurring_fee);
    return sum + (c.billing_cycle === "jaarlijks" ? fee / 12 : fee);
  }, 0);
  const totalRecurringYearly = totalRecurringMonthly * 12;
  const totalRevenue = totalSetupFees + totalRecurringYearly;

  // Revenue per client for chart
  const revenuePerClient = useMemo(() => {
    return clients.map((c) => {
      const setup = parseEuro(c.setup_fee);
      const recurring = parseEuro(c.recurring_fee);
      const yearlyRecurring = c.billing_cycle === "jaarlijks" ? recurring : recurring * 12;
      return {
        name: c.name,
        setup,
        recurring: yearlyRecurring,
      };
    });
  }, [clients]);

  // Keep selected lead in sync with data
  const activeLead = selectedLead ? leads.find((l) => l.id === selectedLead.id) || null : null;

  return (
    <div className="min-h-screen bg-background dark">
      <div className="bg-charcoal text-charcoal-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-charcoal-foreground/60 hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold">Solyn Admin</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-charcoal-foreground/60 hover:text-primary gap-1.5">
            <LogOut className="w-4 h-4" /> Uitloggen
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Leads", value: String(totalLeads), icon: Users },
            { label: "Gem. Budget", value: avgBudget, icon: DollarSign },
            { label: "Conversie", value: conversionRate, icon: BarChart3 },
            { label: "Totale Omzet", value: fmtEuro(totalRevenue), icon: Euro },
            { label: "MRR", value: fmtEuro(Math.round(totalRecurringMonthly)), icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Omzet per Klant (jaarlijks)</h2>
          {revenuePerClient.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">Nog geen klanten</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenuePerClient}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,14%,20%)" />
                <XAxis dataKey="name" stroke="hsl(215,15%,60%)" fontSize={12} />
                <YAxis stroke="hsl(215,15%,60%)" fontSize={12} tickFormatter={(v) => `€${v}`} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(222,14%,15%)",
                    border: "1px solid hsl(222,14%,20%)",
                    borderRadius: "8px",
                    color: "hsl(210,40%,98%)",
                  }}
                  formatter={(value: number, name: string) => [`€${value.toLocaleString("nl-NL")}`, name === "setup" ? "Setup Fee" : "Recurring/jaar"]}
                />
                <Bar dataKey="setup" stackId="a" fill="hsl(40,48%,56%)" name="setup" radius={[0, 0, 0, 0]} />
                <Bar dataKey="recurring" stackId="a" fill="hsl(40,48%,36%)" name="recurring" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* CRM Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Table */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-lg font-semibold text-card-foreground">Lead Manager</h2>
              <AddLeadDialog />
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Zoek op naam of bedrijf..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-muted border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] bg-muted border-border">
                  <SelectValue placeholder="Alle statussen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle statussen</SelectItem>
                  {Object.entries(statusConfig).map(([key, cfg]) => (
                    <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <p className="text-muted-foreground text-sm py-8 text-center">Laden...</p>
            ) : filteredLeads.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">Geen leads gevonden</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Naam</TableHead>
                    <TableHead className="text-muted-foreground hidden md:table-cell">Bedrijf</TableHead>
                    <TableHead className="text-muted-foreground">Budget</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground hidden md:table-cell">Datum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className={`border-border cursor-pointer transition-colors hover:bg-muted/50 ${activeLead?.id === lead.id ? "bg-muted/50" : ""}`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <TableCell className="font-medium text-card-foreground">{lead.name}</TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">{lead.company || "—"}</TableCell>
                      <TableCell className="text-primary font-semibold">{lead.budget || "—"}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusConfig[lead.status]?.className}>
                          {statusConfig[lead.status]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">
                        {format(new Date(lead.created_at), "d MMM yyyy", { locale: nl })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {activeLead ? (
              <LeadDetailPanel lead={activeLead} onClose={() => setSelectedLead(null)} />
            ) : (
              <div className="bg-card rounded-lg border border-border p-8 text-center">
                <p className="text-muted-foreground text-sm">Selecteer een lead om details te bekijken</p>
              </div>
            )}
          </div>
        </div>

        {/* Clients Section */}
        <ClientsSection />
      </div>
    </div>
  );
};

export default AdminPage;
