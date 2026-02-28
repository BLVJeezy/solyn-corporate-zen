import { useState, useMemo } from "react";
import { ArrowLeft, Users, TrendingUp, DollarSign, BarChart3, Search } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useLeads, Lead, LeadStatus } from "@/hooks/useLeads";
import LeadDetailPanel from "@/components/admin/LeadDetailPanel";
import AddLeadDialog from "@/components/admin/AddLeadDialog";
import ClientsSection from "@/components/admin/ClientsSection";

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  nieuw: { label: "Nieuw", className: "bg-steel/20 text-steel" },
  in_behandeling: { label: "In behandeling", className: "bg-primary/20 text-primary" },
  gewonnen: { label: "Gewonnen", className: "bg-green-500/20 text-green-500" },
  verloren: { label: "Verloren", className: "bg-destructive/20 text-destructive" },
};

const trafficData = [
  { month: "Jan", visitors: 1200 },
  { month: "Feb", visitors: 1800 },
  { month: "Mar", visitors: 2400 },
  { month: "Apr", visitors: 2100 },
  { month: "May", visitors: 3200 },
  { month: "Jun", visitors: 2800 },
  { month: "Jul", visitors: 3600 },
];

const AdminPage = () => {
  const { data: leads = [], isLoading } = useLeads();
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
    ? "€" + Math.round(
        leads.reduce((sum, l) => {
          const num = parseFloat((l.budget || "0").replace(/[€.,\s]/g, ""));
          return sum + (isNaN(num) ? 0 : num);
        }, 0) / leads.length
      ).toLocaleString("nl-NL")
    : "€0";
  const wonLeads = leads.filter((l) => l.status === "gewonnen").length;
  const conversionRate = totalLeads ? ((wonLeads / totalLeads) * 100).toFixed(1) + "%" : "0%";

  // Keep selected lead in sync with data
  const activeLead = selectedLead ? leads.find((l) => l.id === selectedLead.id) || null : null;

  return (
    <div className="min-h-screen bg-background dark">
      <div className="bg-charcoal text-charcoal-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="text-charcoal-foreground/60 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Solyn Admin</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Bezoekers", value: "3,642", icon: Users, change: "+12%" },
            { label: "Leads", value: String(totalLeads), icon: TrendingUp, change: "" },
            { label: "Gem. Budget", value: avgBudget, icon: DollarSign, change: "" },
            { label: "Conversie", value: conversionRate, icon: BarChart3, change: "" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                {stat.change && <span className="text-xs text-green-500 font-medium">{stat.change}</span>}
              </div>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Bezoekers Overzicht</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,14%,20%)" />
              <XAxis dataKey="month" stroke="hsl(215,15%,60%)" fontSize={12} />
              <YAxis stroke="hsl(215,15%,60%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(222,14%,15%)",
                  border: "1px solid hsl(222,14%,20%)",
                  borderRadius: "8px",
                  color: "hsl(210,40%,98%)",
                }}
              />
              <Line type="monotone" dataKey="visitors" stroke="hsl(40,48%,56%)" strokeWidth={2} dot={{ fill: "hsl(40,48%,56%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
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
