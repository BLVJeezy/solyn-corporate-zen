import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { ArrowLeft, LogOut, BarChart3, Search, LayoutDashboard, Users, Building2, Coins, ChevronLeft, ChevronRight, Moon, Sun, Activity } from "lucide-react";
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
  { id: "analytics", icon: Activity, label: "Analytics" },
];

const LazyAnalytics = lazy(() => import("@/pages/Analytics"));

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
    <div className="min-h-screen bg-background admin-noise relative overflow-hidden">
      {/* Gradient blobs */}
      <div className="admin-blob-1" />
      <div className="admin-blob-2" />
      <div className="admin-blob-3" />

      {/* ── Sticky Header ── */}
      <header className="bg-card/70 backdrop-blur-2xl border-b border-border/60 sticky top-0 z-40 relative">
        <div className="flex items-center justify-between px-4 lg:px-6 h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted/60">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-foreground tracking-tight leading-none">Command Center</h1>
              <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Solyn Business Intelligence</p>
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

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAdminDark(!adminDark)}
              className="text-muted-foreground hover:text-foreground h-8 w-8 p-0 hover:bg-muted/60 transition-all"
              title={adminDark ? "Light mode" : "Dark mode"}
            >
              {adminDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <ExportButtons leads={leads} clients={clients} />
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-muted-foreground hover:text-foreground h-8 w-8 p-0 lg:w-auto lg:px-3 lg:gap-1.5 hover:bg-muted/60">
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-medium">Uit</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative z-[2]">
        {/* ── Sidebar (desktop) ── */}
        <aside className={`hidden lg:flex flex-col border-r border-border/60 bg-card/40 backdrop-blur-xl sticky top-14 h-[calc(100vh-3.5rem)] transition-all duration-300 ease-out ${sidebarCollapsed ? "w-[60px]" : "w-52"}`}>
          <nav className="flex-1 py-3 px-2 space-y-px">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id;
              const count = item.id === "leads" ? leads.length : item.id === "clients" ? clients.length : undefined;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all duration-150 ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium"
                  }`}
                >
                  <item.icon className={`w-[15px] h-[15px] shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {count !== undefined && (
                        <span className={`text-[10px] tabular-nums font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center transition-colors ${
                          isActive ? "bg-primary/15 text-primary" : "text-muted-foreground/70"
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
          <div className="p-2 border-t border-border/60">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* ── Mobile Tab Bar (floating pill) ── */}
        {isMobile && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
            <div className="flex items-center gap-0.5 px-1.5 py-1.5 bg-card/90 backdrop-blur-2xl border border-border/60 rounded-full shadow-lg dark:shadow-black/40">
              {sidebarItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 shrink-0" />
                    {isActive && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-24 lg:pb-8">
            {/* ═══ Overview ═══ */}
            {activeTab === "overview" && (
              <DashboardOverview leads={leads} clients={clients} />
            )}

            {/* ═══ Leads ═══ */}
            {activeTab === "leads" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground tracking-tight">Leads</h2>
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
                          className="pl-9 h-9 text-sm bg-card/80 border-border/60 shadow-sm backdrop-blur-sm"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px] h-9 text-sm bg-card/80 border-border/60 shadow-sm backdrop-blur-sm">
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
                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm dark:shadow-lg dark:shadow-black/20 overflow-hidden transition-shadow duration-300">
                      {isLoading ? (
                        <div className="p-5 space-y-3">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex gap-4">
                              <Skeleton className="h-5 w-32 rounded-md" />
                              <Skeleton className="h-5 w-24 rounded-md" />
                              <Skeleton className="h-5 w-16 rounded-md" />
                              <Skeleton className="h-5 w-20 rounded-md" />
                            </div>
                          ))}
                        </div>
                      ) : filteredLeads.length === 0 ? (
                        <div className="py-20 text-center">
                          <div className="w-14 h-14 rounded-2xl bg-muted/60 mx-auto mb-4 flex items-center justify-center">
                            <Users className="w-6 h-6 text-muted-foreground/40" />
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">Geen leads gevonden</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">Pas je filters aan of voeg een nieuwe lead toe</p>
                        </div>
                      ) : isMobile ? (
                        <div className="divide-y divide-border/60">
                          {filteredLeads.map((lead) => (
                            <MobileLeadCard key={lead.id} lead={lead} onClick={() => setSelectedLead(lead)} />
                          ))}
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border/60">
                              <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-10">Naam</TableHead>
                              <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-10">Bedrijf</TableHead>
                              <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-10 text-right">Budget</TableHead>
                              <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-10">Status</TableHead>
                              <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-10">Datum</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredLeads.map((lead, idx) => (
                              <TableRow
                                key={lead.id}
                                className={`cursor-pointer transition-all duration-150 hover:bg-muted/40 ${
                                  activeLead?.id === lead.id 
                                    ? "bg-muted/50 ring-1 ring-inset ring-foreground/5" 
                                    : idx % 2 === 1 ? "bg-muted/10" : ""
                                }`}
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
                        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm p-10 text-center">
                          <div className="w-14 h-14 rounded-2xl bg-muted/60 mx-auto mb-4 flex items-center justify-center">
                            <Users className="w-6 h-6 text-muted-foreground/40" />
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

            {/* ═══ Analytics ═══ */}
            {activeTab === "analytics" && (
              <Suspense fallback={<div className="flex items-center justify-center py-20"><Skeleton className="h-8 w-32" /></div>}>
                <LazyAnalytics embedded />
              </Suspense>
            )}
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default AdminPage;
