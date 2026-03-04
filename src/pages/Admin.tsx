import { useState, useMemo } from "react";
import { ArrowLeft, LogOut, BarChart3, Search, LayoutDashboard, Users, Building2, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLeads, Lead, LeadStatus } from "@/hooks/useLeads";
import { useClients } from "@/hooks/useClients";
import { useAuth } from "@/hooks/useAuth";
import LeadDetailPanel from "@/components/admin/LeadDetailPanel";
import AddLeadDialog from "@/components/admin/AddLeadDialog";
import MobileLeadCard from "@/components/admin/MobileLeadCard";
import MobileLeadDrawer from "@/components/admin/MobileLeadDrawer";
import ClientsSection from "@/components/admin/ClientsSection";
import DashboardOverview from "@/components/admin/DashboardOverview";
import CreditsAnalytics from "@/components/admin/CreditsAnalytics";
import GlobalSearch from "@/components/admin/GlobalSearch";
import ExportButtons from "@/components/admin/ExportButtons";

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  nieuw: { label: "Nieuw", className: "bg-steel/20 text-steel" },
  in_behandeling: { label: "In behandeling", className: "bg-primary/20 text-primary" },
  gewonnen: { label: "Gewonnen", className: "bg-emerald-500/20 text-emerald-400" },
  verloren: { label: "Verloren", className: "bg-destructive/20 text-destructive" },
};

const AdminPage = () => {
  const { signOut } = useAuth();
  const isMobile = useIsMobile();
  const { data: leads = [], isLoading } = useLeads();
  const { data: clients = [] } = useClients();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("overview");

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch = !search ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        (l.company?.toLowerCase() || "").includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const activeLead = selectedLead ? leads.find((l) => l.id === selectedLead.id) || null : null;

  const handleSearchSelectLead = (lead: Lead) => {
    setActiveTab("leads");
    setSelectedLead(lead);
  };

  const handleSearchSelectClient = () => {
    setActiveTab("clients");
  };

  return (
    <div className="min-h-screen bg-background dark">
      {/* ── Header ── */}
      <div className="bg-card border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4.5 h-4.5" />
            </Link>
            <div>
              <h1 className="text-base font-bold text-card-foreground">Command Center</h1>
              <p className="text-[10px] text-muted-foreground hidden sm:block">Solyn Business Intelligence</p>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <GlobalSearch
              leads={leads}
              clients={clients}
              onSelectLead={handleSearchSelectLead}
              onSelectClient={handleSearchSelectClient}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <ExportButtons leads={leads} clients={clients} />
            <Link to="/admin/analytics">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5 h-8 text-xs">
                <BarChart3 className="w-3.5 h-3.5" /> Analytics
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-muted-foreground hover:text-foreground gap-1.5 h-8 text-xs">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Uitloggen</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab Navigation */}
          <div className="mb-6 overflow-x-auto">
            <TabsList className="bg-muted h-10 p-1 w-auto inline-flex">
              <TabsTrigger value="overview" className="gap-1.5 text-xs px-4 h-8 data-[state=active]:bg-card">
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Overzicht</span>
              </TabsTrigger>
              <TabsTrigger value="leads" className="gap-1.5 text-xs px-4 h-8 data-[state=active]:bg-card">
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Leads</span>
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">{leads.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="clients" className="gap-1.5 text-xs px-4 h-8 data-[state=active]:bg-card">
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Klanten</span>
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">{clients.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="credits" className="gap-1.5 text-xs px-4 h-8 data-[state=active]:bg-card">
                <Coins className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Credits</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ═══ Overview Tab ═══ */}
          <TabsContent value="overview" className="mt-0">
            <DashboardOverview leads={leads} clients={clients} />
          </TabsContent>

          {/* ═══ Leads Tab ═══ */}
          <TabsContent value="leads" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card rounded-xl border border-border p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <h2 className="text-base font-semibold text-card-foreground">Lead Manager</h2>
                  <AddLeadDialog />
                </div>

                {/* Search & Filter */}
                <div className="sticky top-[57px] z-10 bg-card pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 pt-1">
                  <div className="flex gap-3 flex-wrap">
                    <div className="relative flex-1 min-w-[140px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Zoek..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-muted border-border h-9 text-sm"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[130px] sm:w-[160px] bg-muted border-border h-9 text-sm">
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
                </div>

                {isLoading ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">Laden...</p>
                ) : filteredLeads.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">Geen leads gevonden</p>
                ) : isMobile ? (
                  <div className="space-y-2">
                    {filteredLeads.map((lead) => (
                      <MobileLeadCard key={lead.id} lead={lead} onClick={() => setSelectedLead(lead)} />
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-muted-foreground text-xs">Naam</TableHead>
                        <TableHead className="text-muted-foreground text-xs">Bedrijf</TableHead>
                        <TableHead className="text-muted-foreground text-xs">Budget</TableHead>
                        <TableHead className="text-muted-foreground text-xs">Status</TableHead>
                        <TableHead className="text-muted-foreground text-xs">Datum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow
                          key={lead.id}
                          className={`border-border cursor-pointer transition-colors hover:bg-muted/50 ${activeLead?.id === lead.id ? "bg-muted/50" : ""}`}
                          onClick={() => setSelectedLead(lead)}
                        >
                          <TableCell className="font-medium text-card-foreground text-sm">{lead.name}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{lead.company || "—"}</TableCell>
                          <TableCell className="text-emerald-400 font-semibold text-sm">{lead.budget || "—"}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={`${statusConfig[lead.status]?.className} text-[10px]`}>
                              {statusConfig[lead.status]?.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {format(new Date(lead.created_at), "d MMM yyyy", { locale: nl })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              {/* Detail Panel */}
              <div className="hidden lg:block lg:col-span-1">
                {activeLead ? (
                  <LeadDetailPanel lead={activeLead} onClose={() => setSelectedLead(null)} />
                ) : (
                  <div className="bg-card rounded-xl border border-border p-8 text-center">
                    <p className="text-muted-foreground text-sm">Selecteer een lead</p>
                  </div>
                )}
              </div>
            </div>

            <MobileLeadDrawer
              lead={activeLead}
              open={isMobile && !!activeLead}
              onClose={() => setSelectedLead(null)}
            />
          </TabsContent>

          {/* ═══ Clients Tab ═══ */}
          <TabsContent value="clients" className="mt-0">
            <ClientsSection />
          </TabsContent>

          {/* ═══ Credits Tab ═══ */}
          <TabsContent value="credits" className="mt-0">
            <CreditsAnalytics clients={clients} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
