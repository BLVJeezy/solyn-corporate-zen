import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, RefreshCw, Users, Target, TrendingUp, Percent,
  Monitor, Smartphone, Tablet, Globe, ExternalLink, Eye,
  Activity, Clock, Zap, MousePointerClick, ArrowUpRight, ArrowDownRight,
  Radio, MapPin, BarChart3, LogOut
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { format, eachDayOfInterval, eachHourOfInterval, startOfDay, subHours, subDays, differenceInMinutes } from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { useLeads } from "@/hooks/useLeads";
import { useSiteAnalytics, useRealtimeAnalytics, type DateRange, type AnalyticsEvent } from "@/hooks/useAnalytics";

// Theme-aware colors
const COLORS = {
  primary: "hsl(220, 90%, 56%)",
  gold: "hsl(40, 48%, 56%)",
  green: "hsl(152, 55%, 48%)",
  red: "hsl(0, 72%, 55%)",
  purple: "hsl(270, 60%, 58%)",
  cyan: "hsl(190, 70%, 50%)",
  orange: "hsl(25, 85%, 55%)",
  pink: "hsl(330, 70%, 55%)",
};

const PIE_COLORS = [COLORS.primary, COLORS.gold, COLORS.green, COLORS.red, COLORS.purple, COLORS.cyan, COLORS.orange, COLORS.pink];

const RANGE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: "24h", label: "Vandaag" },
  { value: "7d", label: "7 dagen" },
  { value: "30d", label: "30 dagen" },
  { value: "90d", label: "90 dagen" },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 10,
  fontSize: 12,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.15)",
};

function KpiSkeleton() {
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 p-4 sm:p-5 space-y-2">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-7 w-24" />
    </div>
  );
}

function ChartSkeleton({ height = "h-64" }: { height?: string }) {
  return <Skeleton className={`w-full ${height} rounded-lg`} />;
}

// ─── KPI Card with comparison ───
function KpiCard({ icon: Icon, label, value, change, changeLabel }: {
  icon: React.ElementType;
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
}) {
  const isPositive = change !== undefined && change >= 0;
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm p-4 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium truncate">{label}</span>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-foreground font-mono truncate">{value}</div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-1.5 text-[11px] font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          <span>{isPositive ? "+" : ""}{change.toFixed(1)}%</span>
          {changeLabel && <span className="text-muted-foreground ml-0.5">vs vorige periode</span>}
        </div>
      )}
    </div>
  );
}

// ─── Section Card ───
function SectionCard({ title, subtitle, children, className = "" }: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm dark:shadow-lg dark:shadow-black/20 p-4 sm:p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
        {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ─── Live Visitor Row ───
function LiveVisitorRow({ event }: { event: AnalyticsEvent }) {
  const deviceIcon = event.device_type === "mobile" ? Smartphone : event.device_type === "tablet" ? Tablet : Monitor;
  const DevIcon = deviceIcon;
  const minutesAgo = differenceInMinutes(new Date(), new Date(event.created_at));
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      <DevIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      <span className="text-sm text-foreground font-medium truncate flex-1">{event.page_path}</span>
      {event.country && (
        <span className="text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
          <MapPin className="w-3 h-3" />{event.country}
        </span>
      )}
      <span className="text-[10px] text-muted-foreground/70 tabular-nums shrink-0">
        {minutesAgo < 1 ? "nu" : `${minutesAgo}m geleden`}
      </span>
    </div>
  );
}

// ─── Activity Feed Item ───
function ActivityItem({ event }: { event: AnalyticsEvent }) {
  const actionMap: Record<string, string> = {
    page_view: "opende",
    chatbot_started: "startte chatbot op",
    lead_captured: "werd lead via",
  };
  const action = actionMap[event.event_type || "page_view"] || "bezocht";
  const time = format(new Date(event.created_at), "HH:mm:ss");

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Zap className="w-3 h-3 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">
          <span className="text-muted-foreground">Bezoeker{event.country ? ` uit ${event.country}` : ""}</span>
          {" "}{action}{" "}
          <span className="font-medium">{event.page_path}</span>
        </p>
        <span className="text-[10px] text-muted-foreground/70 tabular-nums">{time}</span>
      </div>
    </div>
  );
}

export default function AnalyticsPage({ embedded = false }: { embedded?: boolean }) {
  const { signOut } = useAuth();
  const [range, setRange] = useState<DateRange>("7d");
  const { data: events = [], isLoading, refresh } = useSiteAnalytics(range);
  const { data: leads = [] } = useLeads();
  const realtimeEvents = useRealtimeAnalytics();

  // ─── Previous period events for comparison ───
  const { data: prevEvents = [] } = useSiteAnalytics(range);

  // ─── Computed Metrics ───
  const metrics = useMemo(() => {
    const pageViews = events.filter((e) => e.event_type === "page_view");
    const uniqueSessions = new Set(events.map((e) => e.session_id)).size;
    const totalPageViews = pageViews.length;
    const chatbotStarted = events.filter((e) => e.event_type === "chatbot_started").length;
    const leadsCaptured = events.filter((e) => e.event_type === "lead_captured").length;
    const conversions = chatbotStarted + leadsCaptured;
    const convRate = uniqueSessions > 0 ? (conversions / uniqueSessions) * 100 : 0;

    // Bounce rate estimate: sessions with only 1 page view
    const sessionPageCounts = new Map<string, number>();
    pageViews.forEach((e) => sessionPageCounts.set(e.session_id, (sessionPageCounts.get(e.session_id) || 0) + 1));
    const bouncedSessions = [...sessionPageCounts.values()].filter((c) => c === 1).length;
    const bounceRate = sessionPageCounts.size > 0 ? (bouncedSessions / sessionPageCounts.size) * 100 : 0;

    return {
      uniqueSessions,
      totalPageViews,
      chatbotStarted,
      leadsCaptured,
      conversions,
      convRate,
      bounceRate,
    };
  }, [events]);

  // ─── Live Visitors (last 5 min) ───
  const liveVisitors = useMemo(() => {
    const fiveMinAgo = subHours(new Date(), 0.083);
    return realtimeEvents.filter((e) => new Date(e.created_at) >= fiveMinAgo);
  }, [realtimeEvents]);

  // ─── Traffic Over Time ───
  const trafficData = useMemo(() => {
    if (events.length === 0) return [];
    const now = new Date();

    if (range === "24h") {
      const hours = eachHourOfInterval({ start: subHours(now, 24), end: now });
      return hours.map((h) => {
        const hourEvents = events.filter((e) => {
          const d = new Date(e.created_at);
          return d.getHours() === h.getHours() && d.getDate() === h.getDate();
        });
        return {
          label: format(h, "HH:mm"),
          bezoekers: new Set(hourEvents.map((e) => e.session_id)).size,
          weergaven: hourEvents.filter((e) => e.event_type === "page_view").length,
        };
      });
    }

    const days = eachDayOfInterval({
      start: subDays(now, range === "7d" ? 7 : range === "30d" ? 30 : 90),
      end: now,
    });
    return days.map((d) => {
      const dayStart = startOfDay(d);
      const dayEnd = new Date(dayStart.getTime() + 86400000);
      const dayEvents = events.filter((e) => {
        const ed = new Date(e.created_at);
        return ed >= dayStart && ed < dayEnd;
      });
      return {
        label: format(d, range === "90d" ? "d/M" : "d MMM", { locale: nl }),
        bezoekers: new Set(dayEvents.map((e) => e.session_id)).size,
        weergaven: dayEvents.filter((e) => e.event_type === "page_view").length,
      };
    });
  }, [events, range]);

  // ─── Traffic Sources ───
  const sourceData = useMemo(() => {
    const counts = new Map<string, number>();
    events.forEach((e) => {
      const src = e.source_type || "direct";
      counts.set(src, (counts.get(src) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
      .sort((a, b) => b.value - a.value);
  }, [events]);

  // ─── Page Performance ───
  const pageData = useMemo(() => {
    const pageMap = new Map<string, { views: number; sessions: Set<string> }>();
    events.filter((e) => e.event_type === "page_view").forEach((e) => {
      const existing = pageMap.get(e.page_path) || { views: 0, sessions: new Set<string>() };
      existing.views++;
      existing.sessions.add(e.session_id);
      pageMap.set(e.page_path, existing);
    });
    return [...pageMap.entries()]
      .map(([page, data]) => ({ page, views: data.views, uniques: data.sessions.size }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }, [events]);

  // ─── Country Data ───
  const countryData = useMemo(() => {
    const counts = new Map<string, number>();
    events.forEach((e) => {
      const country = e.country || "Onbekend";
      counts.set(country, (counts.get(country) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [events]);

  // ─── Device Data ───
  const deviceData = useMemo(() => {
    const counts = new Map<string, number>();
    events.forEach((e) => {
      const dev = e.device_type || "desktop";
      counts.set(dev, (counts.get(dev) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, value]) => ({
        name: name === "desktop" ? "Desktop" : name === "mobile" ? "Mobiel" : "Tablet",
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [events]);

  // ─── Hourly Heatmap ───
  const hourlyData = useMemo(() => {
    const hourCounts = new Array(24).fill(0);
    events.forEach((e) => {
      const hour = new Date(e.created_at).getHours();
      hourCounts[hour]++;
    });
    return hourCounts.map((count, hour) => ({
      uur: `${String(hour).padStart(2, "0")}:00`,
      bezoekers: count,
    }));
  }, [events]);

  // ─── Conversion data ───
  const conversionData = useMemo(() => [
    { name: "Bezoekers", value: metrics.uniqueSessions },
    { name: "Chatbot gestart", value: metrics.chatbotStarted },
    { name: "Lead vastgelegd", value: metrics.leadsCaptured },
  ], [metrics]);

  const content = (
    <div className="space-y-6">
      {/* ── Filters ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {RANGE_OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            variant={range === opt.value ? "default" : "outline"}
            size="sm"
            onClick={() => setRange(opt.value)}
            className="text-xs font-medium"
          >
            {opt.label}
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={refresh} className="ml-auto text-muted-foreground hover:text-foreground gap-1.5">
          <RefreshCw className="w-4 h-4" /> Vernieuwen
        </Button>
      </div>

      {/* ── 1. Live Visitors ── */}
      <SectionCard
        title="Live Bezoekers"
        subtitle={`${liveVisitors.length} actieve bezoeker${liveVisitors.length !== 1 ? "s" : ""} nu`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-500 animate-pulse" />
            <span className="text-3xl font-bold text-foreground font-mono">{liveVisitors.length}</span>
          </div>
          <span className="text-sm text-muted-foreground">online nu</span>
        </div>
        {liveVisitors.length > 0 ? (
          <div className="space-y-0.5 max-h-48 overflow-y-auto">
            {liveVisitors.slice(0, 10).map((e) => (
              <LiveVisitorRow key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground/60 py-4 text-center">Geen actieve bezoekers op dit moment</p>
        )}
      </SectionCard>

      {/* ── 2. Traffic Overview KPIs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {isLoading ? (
          <>
            <KpiSkeleton /><KpiSkeleton /><KpiSkeleton />
            <KpiSkeleton /><KpiSkeleton /><KpiSkeleton />
          </>
        ) : (
          <>
            <KpiCard icon={Users} label="Totaal Bezoekers" value={String(metrics.uniqueSessions)} />
            <KpiCard icon={Eye} label="Paginaweergaven" value={String(metrics.totalPageViews)} />
            <KpiCard icon={MousePointerClick} label="Conversies" value={String(metrics.conversions)} />
            <KpiCard icon={Percent} label="Conversie %" value={`${metrics.convRate.toFixed(1)}%`} />
            <KpiCard icon={TrendingUp} label="Bounce Rate" value={`${metrics.bounceRate.toFixed(1)}%`} />
            <KpiCard icon={Target} label="Leads" value={String(metrics.leadsCaptured)} />
          </>
        )}
      </div>

      {/* ── 3. Traffic Over Time ── */}
      <SectionCard title="Verkeer Over Tijd" subtitle="Bezoekers en paginaweergaven">
        {isLoading ? (
          <ChartSkeleton height="h-72" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" iconSize={8} />
              <Area type="monotone" dataKey="bezoekers" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.12} strokeWidth={2} name="Bezoekers" />
              <Area type="monotone" dataKey="weergaven" stroke={COLORS.gold} fill={COLORS.gold} fillOpacity={0.08} strokeWidth={2} name="Weergaven" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </SectionCard>

      {/* ── Row: Sources + Device + Country ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 3. Traffic Sources */}
        <SectionCard title="Verkeersbronnen" subtitle="Waar komen bezoekers vandaan">
          {isLoading ? <ChartSkeleton height="h-52" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" name="Bezoeken" radius={[0, 6, 6, 0]}>
                  {sourceData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        {/* 6. Device Breakdown */}
        <SectionCard title="Apparaten" subtitle="Desktop, Mobiel & Tablet">
          {isLoading ? <ChartSkeleton height="h-52" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        {/* 5. Country Breakdown */}
        <SectionCard title="Landen" subtitle="Top bezoekerslanden">
          {isLoading ? <ChartSkeleton height="h-52" /> : countryData.length === 0 ? (
            <p className="text-sm text-muted-foreground/60 py-8 text-center">Geen landdata beschikbaar</p>
          ) : (
            <div className="space-y-2 max-h-[220px] overflow-y-auto">
              {countryData.map((c, i) => {
                const maxVal = countryData[0]?.value || 1;
                const pct = (c.value / maxVal) * 100;
                return (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="text-sm text-foreground font-medium w-24 truncate">{c.name}</span>
                    <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">{c.value}</span>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>
      </div>

      {/* ── 4. Page Performance ── */}
      <SectionCard title="Pagina Prestaties" subtitle="Meest bezochte pagina's">
        {isLoading ? <ChartSkeleton height="h-48" /> : pageData.length === 0 ? (
          <p className="text-sm text-muted-foreground/60 py-8 text-center">Geen data</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-border/60">
                  <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-9">Pagina</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-9 text-right">Weergaven</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-9 text-right">Uniek</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.map((p, idx) => (
                  <TableRow key={p.page} className={`hover:bg-muted/30 border-border/40 ${idx % 2 === 1 ? "bg-muted/10" : ""}`}>
                    <TableCell className="font-medium text-foreground text-sm font-mono">{p.page}</TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm tabular-nums">{p.views}</TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm tabular-nums">{p.uniques}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </SectionCard>

      {/* ── Row: Hourly Heat + Conversions + Activity Feed ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 9. Session Heat */}
        <SectionCard title="Uurlijks Verkeer" subtitle="Bezoekers per uur" className="lg:col-span-1">
          {isLoading ? <ChartSkeleton height="h-52" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="uur" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} interval={2} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="bezoekers" name="Bezoekers" radius={[4, 4, 0, 0]}>
                  {hourlyData.map((entry, i) => (
                    <Cell key={i} fill={entry.bezoekers > 0 ? COLORS.primary : "hsl(var(--muted))"} fillOpacity={Math.max(0.3, entry.bezoekers / (Math.max(...hourlyData.map(h => h.bezoekers)) || 1))} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        {/* 8. Conversion Funnel */}
        <SectionCard title="Conversie Trechter" subtitle="Bezoeker → Lead flow">
          {isLoading ? <ChartSkeleton height="h-52" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={conversionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" name="Aantal" fill={COLORS.green} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        {/* 7. Real-time Activity Feed */}
        <SectionCard title="Live Activiteit" subtitle="Recente bezoekersacties">
          <div className="space-y-1 max-h-[220px] overflow-y-auto">
            {realtimeEvents.length > 0 ? (
              realtimeEvents.slice(0, 15).map((e) => (
                <ActivityItem key={e.id} event={e} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground/60 py-8 text-center">Nog geen recente activiteit</p>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );

  if (embedded) return content;

  return (
    <div className="min-h-screen bg-background dark">
      <div className="bg-card/70 backdrop-blur-2xl border-b border-border/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold text-foreground">Website Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={refresh} className="text-muted-foreground hover:text-foreground gap-1.5">
              <RefreshCw className="w-4 h-4" /> Vernieuwen
            </Button>
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-muted-foreground hover:text-foreground gap-1.5">
              <LogOut className="w-4 h-4" /> Uitloggen
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {content}
      </div>
    </div>
  );
}
