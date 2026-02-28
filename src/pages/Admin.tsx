import { useState, useMemo } from "react";
import { ArrowLeft, Users, DollarSign, BarChart3, Search, LogOut, Euro, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Area, AreaChart } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { startOfDay, startOfWeek, startOfMonth, startOfQuarter, startOfYear, format as fnsFormat, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, subMonths, subYears } from "date-fns";
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
  const avgSetupFee = clients.length
    ? fmtEuro(Math.round(clients.reduce((sum, c) => sum + parseEuro(c.setup_fee), 0) / clients.length))
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
      return { name: c.name, setup, recurring: yearlyRecurring };
    });
  }, [clients]);

  const [revPeriod, setRevPeriod] = useState<string>("maand");

  const revenueTimeline = useMemo(() => {
    if (clients.length === 0) return [];
    const now = new Date();
    type PK = "dag" | "week" | "maand" | "kwartaal" | "jaar";
    const rangeStart: Record<PK, Date> = {
      dag: subMonths(now, 1), week: subMonths(now, 3), maand: subYears(now, 1),
      kwartaal: subYears(now, 2), jaar: subYears(now, 5),
    };
    const start = rangeStart[revPeriod as PK] || subYears(now, 1);

    const getKey = (d: Date) => {
      switch (revPeriod) {
        case "dag": return fnsFormat(d, "dd/MM");
        case "week": return "W" + fnsFormat(d, "ww/yy");
        case "maand": return fnsFormat(d, "MMM yy");
        case "kwartaal": return "Q" + (Math.floor(d.getMonth() / 3) + 1) + " " + fnsFormat(d, "yy");
        case "jaar": return fnsFormat(d, "yyyy");
        default: return fnsFormat(d, "MMM yy");
      }
    };
    const getBucketStart = (d: Date) => {
      switch (revPeriod) {
        case "dag": return startOfDay(d);
        case "week": return startOfWeek(d, { weekStartsOn: 1 });
        case "maand": return startOfMonth(d);
        case "kwartaal": return startOfQuarter(d);
        case "jaar": return startOfYear(d);
        default: return startOfMonth(d);
      }
    };

    const buckets = new Map<string, { label: string; setup: number; recurring: number }>();
    let intervals: Date[];
    if (revPeriod === "dag") intervals = eachDayOfInterval({ start, end: now });
    else if (revPeriod === "week") intervals = eachWeekOfInterval({ start, end: now }, { weekStartsOn: 1 });
    else {
      intervals = eachMonthOfInterval({ start, end: now });
      if (revPeriod === "kwartaal") intervals = intervals.filter((d) => d.getMonth() % 3 === 0);
      else if (revPeriod === "jaar") intervals = intervals.filter((d) => d.getMonth() === 0);
    }
    intervals.forEach((d) => { const k = getKey(d); if (!buckets.has(k)) buckets.set(k, { label: k, setup: 0, recurring: 0 }); });

    clients.forEach((c) => {
      const setupVal = parseEuro(c.setup_fee);
      const recurringVal = parseEuro(c.recurring_fee);
      const clientStart = c.start_date ? new Date(c.start_date) : new Date(c.created_at);
      if (clientStart >= start && clientStart <= now) {
        const key = getKey(getBucketStart(clientStart));
        const b = buckets.get(key);
        if (b) b.setup += setupVal;
      }
      if (recurringVal > 0) {
        if (c.billing_cycle === "jaarlijks") {
          // Yearly billing: full amount paid upfront at start date (once per year)
          // Place full recurring fee in the bucket of each yearly anniversary
          let anniversary = new Date(clientStart);
          while (anniversary <= now) {
            if (anniversary >= start) {
              const key = getKey(getBucketStart(anniversary));
              const b = buckets.get(key);
              if (b) b.recurring += recurringVal;
            }
            anniversary = new Date(anniversary.getFullYear() + 1, anniversary.getMonth(), anniversary.getDate());
          }
        } else {
          // Monthly billing: distribute per period
          const monthlyFee = recurringVal;
          let mult = 1;
          switch (revPeriod) { case "dag": mult = 1/30; break; case "week": mult = 7/30; break; case "maand": mult = 1; break; case "kwartaal": mult = 3; break; case "jaar": mult = 12; break; }
          const feePerPeriod = monthlyFee * mult;
          buckets.forEach((b, key) => {
            const bd = intervals.find((d) => getKey(d) === key);
            if (bd && bd >= getBucketStart(clientStart)) b.recurring += feePerPeriod;
          });
        }
      }
    });

    let cum = 0;
    return Array.from(buckets.values()).map((b) => {
      const total = Math.round(b.setup + b.recurring);
      cum += total;
      return { label: b.label, setup: Math.round(b.setup), recurring: Math.round(b.recurring), totaal: total, cumulatief: cum };
    });
  }, [clients, revPeriod]);

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

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
          {[
            { label: "Leads", value: String(totalLeads), icon: Users },
            { label: "Gem. Setup Fee", value: avgSetupFee, icon: DollarSign },
            { label: "Conversie", value: conversionRate, icon: BarChart3 },
            { label: "Totale Omzet", value: fmtEuro(totalRevenue), icon: Euro },
            { label: "MRR", value: fmtEuro(Math.round(totalRecurringMonthly)), icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-lg border border-border p-3 sm:p-5">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-card-foreground truncate">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 truncate">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Revenue Analytics */}
        <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-base sm:text-lg font-semibold text-card-foreground">Omzet Analytics</h2>
            <Tabs value={revPeriod} onValueChange={setRevPeriod}>
              <TabsList className="bg-muted">
                {["dag", "week", "maand", "kwartaal", "jaar"].map((p) => (
                  <TabsTrigger key={p} value={p} className="text-[10px] sm:text-xs capitalize px-2 sm:px-3">{p}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          {revenueTimeline.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">Nog geen klanten</p>
          ) : (
            <div className="space-y-6">
              {/* Bar chart: setup + recurring per period */}
              <ResponsiveContainer width="100%" height={180} className="sm:!h-[240px]">
                <BarChart data={revenueTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,14%,20%)" />
                  <XAxis dataKey="label" stroke="hsl(215,15%,60%)" fontSize={11} interval="preserveStartEnd" />
                  <YAxis stroke="hsl(215,15%,60%)" fontSize={11} tickFormatter={(v) => `€${v}`} />
                  <Tooltip
                    contentStyle={{ background: "hsl(222,14%,15%)", border: "1px solid hsl(222,14%,20%)", borderRadius: "8px", color: "hsl(210,40%,98%)" }}
                    formatter={(value: number, name: string) => [`€${value.toLocaleString("nl-NL")}`, name === "setup" ? "Setup" : "Recurring"]}
                  />
                  <Legend />
                  <Bar dataKey="setup" stackId="a" fill="hsl(40,48%,56%)" name="Setup" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="recurring" stackId="a" fill="hsl(40,48%,36%)" name="Recurring" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              {/* Trendline: cumulative revenue */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Cumulatieve omzet (trendlijn)</h3>
                <ResponsiveContainer width="100%" height={160} className="sm:!h-[200px]">
                  <AreaChart data={revenueTimeline}>
                    <defs>
                      <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(40,48%,56%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(40,48%,56%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,14%,20%)" />
                    <XAxis dataKey="label" stroke="hsl(215,15%,60%)" fontSize={11} interval="preserveStartEnd" />
                    <YAxis stroke="hsl(215,15%,60%)" fontSize={11} tickFormatter={(v) => `€${v}`} />
                    <Tooltip
                      contentStyle={{ background: "hsl(222,14%,15%)", border: "1px solid hsl(222,14%,20%)", borderRadius: "8px", color: "hsl(210,40%,98%)" }}
                      formatter={(value: number) => [`€${value.toLocaleString("nl-NL")}`, "Cumulatief"]}
                    />
                    <Area type="monotone" dataKey="cumulatief" stroke="hsl(40,48%,56%)" fill="url(#trendGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* CRM Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Table */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4 sm:p-6">
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

          {/* Detail Panel - hide empty state on mobile */}
          <div className="lg:col-span-1">
            {activeLead ? (
              <LeadDetailPanel lead={activeLead} onClose={() => setSelectedLead(null)} />
            ) : (
              <div className="hidden lg:block bg-card rounded-lg border border-border p-8 text-center">
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
