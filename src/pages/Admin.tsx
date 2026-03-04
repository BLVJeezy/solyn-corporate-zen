import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, LogOut, BarChart3, Search, LayoutDashboard, Users, Building2, Coins, Plus, UserPlus, ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  nieuw: { label: "Nieuw", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  in_behandeling: { label: "In behandeling", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  gewonnen: { label: "Gewonnen", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  verloren: { label: "Verloren", className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
};

const sidebarItems = [
  { id: "overview", icon: LayoutDashboard, label: "Overzicht" },
  { id: "leads", icon: Users, label: "Leads" },
  { id: "clients", icon: Building2, label: "Klanten" },
  { id: "credits", icon: Coins, label: "Credits" },
];

const AdminPage = () => {
  const { signOut } = useAuth();
  const isMobile = useIsMobile();
  const { data: leads = [], isLoading } = useLeads();
  const { data: clients = [] } = useClients();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [adminDark, setAdminDark] = useState(() => localStorage.getItem("admin-dark") === "true");

  useEffect(() => {
    localStorage.setItem("admin-dark", String(adminDark));
  }, [adminDark]);

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
    <div className={adminDark ? "dark" : ""}>
    <div className="min-h-screen bg-muted/30">
      {/* ── Sticky Header ── */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 lg:px-6 h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-foreground leading-none">Command Center</h1>
              <p className="text-[11px] text-muted-foreground mt-0.5">Business Intelligence</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <GlobalSearch
              leads={leads}
              clients={clients}
              onSelectLead={handleSearchSelectLead}
              onSelectClient={handleSearchSelectClient}
            />
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAdminDark(!adminDark)}
              className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
              title={adminDark ? "Light mode" : "Dark mode"}
            >
              {adminDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <ExportButtons leads={leads} clients={clients} />
            <Link to="/admin/analytics">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8 w-8 p-0 lg:w-auto lg:px-3 lg:gap-1.5">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden lg:inline text-xs">Analytics</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-muted-foreground hover:text-foreground h-8 w-8 p-0 lg:w-auto lg:px-3 lg:gap-1.5">
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline text-xs">Uit</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* ── Sidebar (desktop) ── */}
        <aside className={`hidden lg:flex flex-col border-r border-border bg-card/50 sticky top-14 h-[calc(100vh-3.5rem)] transition-all duration-200 ${sidebarCollapsed ? "w-16" : "w-52"}`}>
          <nav className="flex-1 py-3 px-2 space-y-0.5">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id;
              const count = item.id === "leads" ? leads.length : item.id === "clients" ? clients.length : undefined;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {count !== undefined && (
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                          isActive ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                        }`}>
                          {count}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
          <div className="p-2 border-t border-border">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* ── Mobile Tab Bar ── */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-xl border-t border-border">
            <div className="flex">
              {sidebarItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="w-4.5 h-4.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-24 lg:pb-6">
            {/* ═══ Overview ═══ */}
            {activeTab === "overview" && (
              <DashboardOverview leads={leads} clients={clients} />
            )}

            {/* ═══ Leads ═══ */}
            {activeTab === "leads" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Leads</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{leads.length} totaal · {leads.filter(l => l.status === "nieuw").length} nieuw</p>
                  </div>
                  <AddLeadDialog />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2 space-y-3">
                    {/* Search & Filter */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Zoek op naam of bedrijf..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="pl-9 h-9 text-sm bg-card border-border shadow-sm"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px] h-9 text-sm bg-card border-border shadow-sm">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle statussen</SelectItem>
                          {Object.entries(statusConfig).map(([key, cfg]) => (
                            <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      ) : filteredLeads.length === 0 ? (
                        <div className="py-16 text-center">
                          <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">Geen leads gevonden</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">Pas je filters aan of voeg een nieuwe lead toe</p>
                        </div>
                      ) : isMobile ? (
                        <div className="divide-y divide-border">
                          {filteredLeads.map((lead) => (
                            <MobileLeadCard key={lead.id} lead={lead} onClick={() => setSelectedLead(lead)} />
                          ))}
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                              <TableHead className="text-xs font-medium text-muted-foreground h-10">Naam</TableHead>
                              <TableHead className="text-xs font-medium text-muted-foreground h-10">Bedrijf</TableHead>
                              <TableHead className="text-xs font-medium text-muted-foreground h-10 text-right">Budget</TableHead>
                              <TableHead className="text-xs font-medium text-muted-foreground h-10">Status</TableHead>
                              <TableHead className="text-xs font-medium text-muted-foreground h-10">Datum</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredLeads.map((lead) => (
                              <TableRow
                                key={lead.id}
                                className={`cursor-pointer transition-colors hover:bg-muted/40 ${activeLead?.id === lead.id ? "bg-accent/5 border-l-2 border-l-foreground" : ""}`}
                                onClick={() => setSelectedLead(lead)}
                              >
                                <TableCell className="py-3">
                                  <span className="font-medium text-sm text-foreground">{lead.name}</span>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">{lead.company || "—"}</TableCell>
                                <TableCell className="text-sm font-semibold text-foreground text-right tabular-nums">{lead.budget || "—"}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`text-[11px] font-medium border ${statusConfig[lead.status]?.className}`}>
                                    {statusConfig[lead.status]?.label}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground tabular-nums">
                                  {format(new Date(lead.created_at), "d MMM yyyy", { locale: nl })}
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
                      {activeLead ? (
                        <LeadDetailPanel lead={activeLead} onClose={() => setSelectedLead(null)} />
                      ) : (
                        <div className="bg-card rounded-xl border border-border shadow-sm p-10 text-center">
                          <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                            <Users className="w-5 h-5 text-muted-foreground/50" />
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">Selecteer een lead</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">Klik op een rij om details te bekijken</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <MobileLeadDrawer
                  lead={activeLead}
                  open={isMobile && !!activeLead}
                  onClose={() => setSelectedLead(null)}
                />
              </div>
            )}

            {/* ═══ Clients ═══ */}
            {activeTab === "clients" && <ClientsSection />}

            {/* ═══ Credits ═══ */}
            {activeTab === "credits" && <CreditsAnalytics clients={clients} />}
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default AdminPage;
