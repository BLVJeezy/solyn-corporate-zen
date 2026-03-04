import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, RefreshCw, Users, Target, TrendingUp, Percent,
  Monitor, Smartphone, Globe, ExternalLink
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { format, eachDayOfInterval, eachHourOfInterval, startOfDay, subHours, subDays } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useLeads } from "@/hooks/useLeads";
import { useSiteAnalytics, type DateRange } from "@/hooks/useAnalytics";
import { LogOut } from "lucide-react";

const NAVY = "#00427A";
const GOLD = "hsl(40, 48%, 56%)";
const STEEL = "hsl(194, 28%, 49%)";
const SLATE = "hsl(215, 15%, 60%)";

const RANGE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: "24h", label: "24u" },
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
];

function KpiSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border p-4 sm:p-5 space-y-2">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-7 w-24" />
    </div>
  );
}

function ChartSkeleton({ height = "h-64" }: { height?: string }) {
  return <Skeleton className={`w-full ${height} rounded-lg`} />;
}

export default function AnalyticsPage({ embedded = false }: { embedded?: boolean }) {
  const { signOut } = useAuth();
  const [range, setRange] = useState<DateRange>("7d");
  const { data: events = [], isLoading, refresh } = useSiteAnalytics(range);
  const { data: leads = [] } = useLeads();

  // Computed metrics
  const metrics = useMemo(() => {
    const uniqueSessions = new Set(events.map((e) => e.session_id)).size;
    const pageViews = events.filter((e) => e.event_type === "page_view").length;
    const chatbotStarted = events.filter((e) => e.event_type === "chatbot_started").length;
    const leadsCaptured = events.filter((e) => e.event_type === "lead_captured").length;
    const conversions = chatbotStarted + leadsCaptured;
    const convRate = uniqueSessions > 0 ? ((conversions / uniqueSessions) * 100).toFixed(1) : "0.0";

    const activeLeads = leads.filter((l) => l.status === "nieuw" || l.status === "in_behandeling").length;
    const targetLeads = leads.filter((l) => {
      if (!l.budget) return false;
      const val = parseFloat(l.budget.replace(/[€\s.]/g, "").replace(",", "."));
      return val >= 750 && val <= 2000;
    }).length;

    // Device split
    const desktop = events.filter((e) => e.device_type === "desktop").length;
    const mobile = events.filter((e) => e.device_type === "mobile").length;

    // Source split
    const direct = events.filter((e) => e.source_type === "direct").length;
    const referral = events.filter((e) => e.source_type === "referral").length;

    return {
      uniqueSessions, pageViews, activeLeads, targetLeads,
      convRate, chatbotStarted, leadsCaptured,
      desktop, mobile, direct, referral,
    };
  }, [events, leads]);

  // Daily/hourly traffic data
  const trafficData = useMemo(() => {
    if (events.length === 0) return [];
    const now = new Date();

    if (range === "24h") {
      const hours = eachHourOfInterval({ start: subHours(now, 24), end: now });
      return hours.map((h) => {
        const key = format(h, "HH:mm");
        const hourEvents = events.filter((e) => {
          const d = new Date(e.created_at);
          return d.getHours() === h.getHours() && d.getDate() === h.getDate();
        });
        const visitors = new Set(hourEvents.map((e) => e.session_id)).size;
        const views = hourEvents.filter((e) => e.event_type === "page_view").length;
        return { label: key, visitors, views };
      });
    }

    const days = eachDayOfInterval({
      start: subDays(now, range === "7d" ? 7 : 30),
      end: now,
    });
    return days.map((d) => {
      const key = format(d, "d MMM", { locale: nl });
      const dayStart = startOfDay(d);
      const dayEnd = new Date(dayStart.getTime() + 86400000);
      const dayEvents = events.filter((e) => {
        const ed = new Date(e.created_at);
        return ed >= dayStart && ed < dayEnd;
      });
      const visitors = new Set(dayEvents.map((e) => e.session_id)).size;
      const views = dayEvents.filter((e) => e.event_type === "page_view").length;
      return { label: key, visitors, views };
    });
  }, [events, range]);

  // Funnel data
  const funnelData = useMemo(() => [
    { name: "Bezoekers", value: metrics.uniqueSessions },
    { name: "Chatbot gestart", value: metrics.chatbotStarted },
    { name: "Lead vastgelegd", value: metrics.leadsCaptured },
  ], [metrics]);

  const deviceData = useMemo(() => [
    { name: "Desktop", value: metrics.desktop },
    { name: "Mobiel", value: metrics.mobile },
  ], [metrics]);

  const sourceData = useMemo(() => [
    { name: "Direct", value: metrics.direct },
    { name: "Referral", value: metrics.referral },
  ], [metrics]);

  const PIE_COLORS = [NAVY, GOLD];

  if (embedded) {
    return (
      <div className="space-y-6">
        {/* Date Range Picker */}
        <div className="flex items-center gap-2">
          {RANGE_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={range === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => setRange(opt.value)}
              className="font-mono text-xs"
            >
              {opt.label}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={refresh} className="ml-auto text-muted-foreground hover:text-foreground gap-1.5">
            <RefreshCw className="w-4 h-4" /> Vernieuwen
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {isLoading ? (
            <>
              <KpiSkeleton /><KpiSkeleton /><KpiSkeleton /><KpiSkeleton />
            </>
          ) : (
            <>
              <KpiCard icon={Users} label="Unieke sessies" value={String(metrics.uniqueSessions)} />
              <KpiCard icon={TrendingUp} label="Paginaweergaven" value={String(metrics.pageViews)} />
              <KpiCard icon={Target} label="Actieve leads" value={String(metrics.activeLeads)} />
              <KpiCard icon={Percent} label="Conversie" value={`${metrics.convRate}%`} />
            </>
          )}
        </div>

        {/* Traffic Flow Chart */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Bezoekers & Paginaweergaven</h2>
          {isLoading ? (
            <ChartSkeleton height="h-72" />
          ) : (
            <ResponsiveContainer width="100%" height={288}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="visitors" stroke={NAVY} fill={NAVY} fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="views" stroke={GOLD} fill={GOLD} fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Funnel + Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Conversie Trechter</h2>
            {isLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              <ResponsiveContainer width="100%" height={192}>
                <BarChart data={funnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="value" fill={NAVY} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Apparaat Verdeling</h2>
            {isLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              <ResponsiveContainer width="100%" height={192}>
                <PieChart>
                  <Pie data={deviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {deviceData.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Bron Verdeling</h2>
            {isLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              <ResponsiveContainer width="100%" height={192}>
                <PieChart>
                  <Pie data={sourceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {sourceData.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <div className="bg-charcoal text-charcoal-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-charcoal-foreground/60 hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold">Website Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={refresh} className="text-charcoal-foreground/60 hover:text-primary gap-1.5">
              <RefreshCw className="w-4 h-4" /> Vernieuwen
            </Button>
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-charcoal-foreground/60 hover:text-primary gap-1.5">
              <LogOut className="w-4 h-4" /> Uitloggen
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-6">
        {/* Date Range Picker */}
        <div className="flex items-center gap-2">
          {RANGE_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={range === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => setRange(opt.value)}
              className="font-mono text-xs"
            >
              {opt.label}
            </Button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {isLoading ? (
            <>
              <KpiSkeleton /><KpiSkeleton /><KpiSkeleton /><KpiSkeleton />
            </>
          ) : (
            <>
              <KpiCard icon={Users} label="Bezoekers" value={String(metrics.uniqueSessions)} />
              <KpiCard icon={Target} label="Actieve Leads" value={String(metrics.activeLeads)} />
              <KpiCard icon={TrendingUp} label="Target €750-2K" value={String(metrics.targetLeads)} />
              <KpiCard icon={Percent} label="Conv. Rate" value={`${metrics.convRate}%`} />
            </>
          )}
        </div>

        {/* Traffic Flow Chart */}
        <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-card-foreground mb-4">Bezoekers & Paginaweergaven</h2>
          {isLoading ? (
            <ChartSkeleton height="h-72" />
          ) : (
            <ResponsiveContainer width="100%" height={288}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 14%, 20%)" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fontFamily: "monospace", fill: SLATE }} />
                <YAxis tick={{ fontSize: 11, fontFamily: "monospace", fill: SLATE }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(222, 14%, 15%)", border: "1px solid hsl(222, 14%, 20%)", borderRadius: 8, fontFamily: "monospace", fontSize: 12 }} />
                <Area type="monotone" dataKey="visitors" stroke={NAVY} fill={NAVY} fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="views" stroke={GOLD} fill={GOLD} fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Funnel + Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-card-foreground mb-4">Conversie Trechter</h2>
            {isLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              <ResponsiveContainer width="100%" height={192}>
                <BarChart data={funnelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 14%, 20%)" />
                  <XAxis type="number" tick={{ fontSize: 11, fontFamily: "monospace", fill: SLATE }} />
                  <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11, fontFamily: "monospace", fill: SLATE }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(222, 14%, 15%)", border: "1px solid hsl(222, 14%, 20%)", borderRadius: 8, fontFamily: "monospace", fontSize: 12 }} />
                  <Bar dataKey="value" fill={NAVY} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-card-foreground mb-4">Apparaat Verdeling</h2>
            {isLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              <ResponsiveContainer width="100%" height={192}>
                <PieChart>
                  <Pie data={deviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {deviceData.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-card-foreground mb-4">Bron Verdeling</h2>
            {isLoading ? (
              <ChartSkeleton height="h-48" />
            ) : (
              <ResponsiveContainer width="100%" height={192}>
                <PieChart>
                  <Pie data={sourceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {sourceData.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="bg-card rounded-lg border border-border p-3 sm:p-5">
      <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
        <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-muted-foreground" />
        <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{label}</span>
      </div>
      <div className="text-lg sm:text-2xl font-bold text-card-foreground font-mono truncate">{value}</div>
    </div>
  );
}
