import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, RefreshCw, Users, Target, TrendingUp, Percent,
  Monitor, Smartphone, Tablet, Globe, Eye, Activity, Clock,
  Zap, MousePointerClick, ArrowUpRight, ArrowDownRight,
  Radio, MapPin, LogOut, Info, Bug, Send, CheckCircle2,
  AlertTriangle, WifiOff, Lightbulb, Timer, BarChart3
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import {
  format, eachDayOfInterval, eachHourOfInterval, startOfDay,
  subHours, subDays, differenceInSeconds, formatDistanceToNow
} from "date-fns";
import { nl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useLeads } from "@/hooks/useLeads";
import {
  useSiteAnalytics, usePreviousPeriodAnalytics, useRealtimeAnalytics,
  useDataQuality, type DateRange, type AnalyticsEvent
} from "@/hooks/useAnalytics";
import { sendTestEvent } from "@/hooks/useTrackPageView";
import { toast } from "sonner";

// ─── Colors ───
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

const chartTooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 10,
  fontSize: 12,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.15)",
};

// ─── Metric definitions (for info tooltips) ───
const METRIC_DEFS: Record<string, string> = {
  visitors: "Een bezoeker = een unieke sessie vanuit een apparaat/browser. Gebaseerd op session_id.",
  unique_visitors: "Unieke bezoekers = unieke visitor_id's binnen de geselecteerde periode. Overleeft sessies.",
  page_views: "Elke page_view event. Route-wijzigingen in de SPA tellen mee. Duplicaten binnen 3s worden genegeerd.",
  active_visitors: "Sessies waarvan het laatste event binnen de afgelopen 30 seconden is ontvangen.",
  bounce_rate: "Percentage sessies met slechts 1 page_view. Formule: (sessies met 1 pv / totaal sessies) × 100%.",
  session_duration: "Tijd tussen session_start en session_end (of laatste event). Gemiddelde over alle sessies.",
  conversion_rate: "Conversie-events (lead_captured + chatbot_started + form_submit) / unieke bezoekers × 100%.",
};

// ─── Helpers ───
function pctChange(current: number, previous: number): number | undefined {
  if (previous === 0) return current > 0 ? 100 : undefined;
  return ((current - previous) / previous) * 100;
}

function computeMetrics(events: AnalyticsEvent[]) {
  const pageViews = events.filter((e) => e.event_type === "page_view");
  const sessions = new Set(events.map((e) => e.session_id));
  const uniqueVisitors = new Set(events.filter(e => e.visitor_id).map((e) => e.visitor_id));
  const totalPageViews = pageViews.length;
  const chatbotStarted = events.filter((e) => e.event_type === "chatbot_started").length;
  const leadsCaptured = events.filter((e) => e.event_type === "lead_captured").length;
  const formSubmits = events.filter((e) => e.event_type === "form_submit").length;
  const conversions = chatbotStarted + leadsCaptured + formSubmits;
  const convRate = sessions.size > 0 ? (conversions / sessions.size) * 100 : 0;

  // Bounce rate
  const sessionPageCounts = new Map<string, number>();
  pageViews.forEach((e) => sessionPageCounts.set(e.session_id, (sessionPageCounts.get(e.session_id) || 0) + 1));
  const bouncedSessions = [...sessionPageCounts.values()].filter((c) => c === 1).length;
  const bounceRate = sessionPageCounts.size > 0 ? (bouncedSessions / sessionPageCounts.size) * 100 : 0;

  // Avg session duration
  const sessionTimes = new Map<string, { first: number; last: number }>();
  events.forEach((e) => {
    const t = new Date(e.created_at).getTime();
    const existing = sessionTimes.get(e.session_id);
    if (!existing) {
      sessionTimes.set(e.session_id, { first: t, last: t });
    } else {
      existing.first = Math.min(existing.first, t);
      existing.last = Math.max(existing.last, t);
    }
  });
  const durations = [...sessionTimes.values()].map(({ first, last }) => (last - first) / 1000).filter((d) => d > 0);
  const avgDuration = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;

  return {
    sessions: sessions.size,
    uniqueVisitors: uniqueVisitors.size,
    totalPageViews,
    chatbotStarted,
    leadsCaptured,
    formSubmits,
    conversions,
    convRate,
    bounceRate,
    avgDuration,
  };
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

// ─── Subcomponents ───
function InfoTip({ id }: { id: string }) {
  const text = METRIC_DEFS[id];
  if (!text) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-3 h-3 text-muted-foreground/50 cursor-help inline ml-1" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[260px] text-xs">{text}</TooltipContent>
    </Tooltip>
  );
}

function KpiCard({ icon: Icon, label, value, change, infoId }: {
  icon: React.ElementType; label: string; value: string; change?: number; infoId?: string;
}) {
  const isPositive = change !== undefined && change >= 0;
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm p-4 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium truncate">{label}</span>
        {infoId && <InfoTip id={infoId} />}
      </div>
      <div className="text-xl sm:text-2xl font-bold text-foreground font-mono truncate">{value}</div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-1.5 text-[11px] font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          <span>{isPositive ? "+" : ""}{change.toFixed(1)}%</span>
          <span className="text-muted-foreground/60 ml-0.5">vs vorige</span>
        </div>
      )}
    </div>
  );
}

function SectionCard({ title, subtitle, children, className = "" }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
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

function DataQualityBadge() {
  const { data } = useDataQuality();
  if (!data) return null;

  const statusConfig = {
    ok: { icon: CheckCircle2, label: "Tracking OK", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    partial: { icon: AlertTriangle, label: "Partial", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    offline: { icon: WifiOff, label: "Offline", color: "text-red-600 dark:text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  };
  const cfg = statusConfig[data.status];
  const StatusIcon = cfg.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium cursor-help ${cfg.bg} ${cfg.color}`}>
          <StatusIcon className="w-3 h-3" />
          {cfg.label}
        </div>
      </TooltipTrigger>
      <TooltipContent className="text-xs space-y-1">
        <p>Events vandaag: <strong>{data.eventsToday}</strong></p>
        {data.lastEvent && <p>Laatste event: {format(new Date(data.lastEvent), "HH:mm:ss")}</p>}
      </TooltipContent>
    </Tooltip>
  );
}

// ─── Top Insights ───
function TopInsights({ events }: { events: AnalyticsEvent[] }) {
  const insights = useMemo(() => {
    if (events.length === 0) return [];
    const result: { icon: React.ElementType; text: string; color: string }[] = [];

    // Best traffic source
    const sourceCounts = new Map<string, number>();
    events.forEach((e) => sourceCounts.set(e.source_type || "direct", (sourceCounts.get(e.source_type || "direct") || 0) + 1));
    const topSource = [...sourceCounts.entries()].sort((a, b) => b[1] - a[1])[0];
    if (topSource) {
      result.push({ icon: TrendingUp, text: `Beste bron: ${topSource[0]} (${topSource[1]} events)`, color: "text-emerald-600 dark:text-emerald-400" });
    }

    // Worst bounce page
    const pageViews = events.filter((e) => e.event_type === "page_view");
    const pageSessions = new Map<string, Map<string, number>>();
    pageViews.forEach((e) => {
      if (!pageSessions.has(e.page_path)) pageSessions.set(e.page_path, new Map());
      const sessions = pageSessions.get(e.page_path)!;
      sessions.set(e.session_id, (sessions.get(e.session_id) || 0) + 1);
    });
    let worstBouncePage = "";
    let worstBounceRate = 0;
    pageSessions.forEach((sessions, page) => {
      if (sessions.size < 3) return; // need enough data
      const bounced = [...sessions.values()].filter((c) => c === 1).length;
      const rate = bounced / sessions.size;
      if (rate > worstBounceRate) { worstBounceRate = rate; worstBouncePage = page; }
    });
    if (worstBouncePage) {
      result.push({ icon: ArrowDownRight, text: `Hoogste bounce: ${worstBouncePage} (${(worstBounceRate * 100).toFixed(0)}%)`, color: "text-red-500 dark:text-red-400" });
    }

    // Peak hour
    const hourCounts = new Array(24).fill(0);
    events.forEach((e) => hourCounts[new Date(e.created_at).getHours()]++);
    const peakHour = hourCounts.indexOf(Math.max(...hourCounts));
    result.push({ icon: Clock, text: `Piekuur: ${String(peakHour).padStart(2, "0")}:00 (${hourCounts[peakHour]} events)`, color: "text-primary" });

    // Conversion trend
    const metrics = computeMetrics(events);
    const convLabel = metrics.convRate > 5 ? "Goede conversie" : metrics.convRate > 0 ? "Lage conversie" : "Geen conversies";
    result.push({ icon: Target, text: `${convLabel}: ${metrics.convRate.toFixed(1)}%`, color: metrics.convRate > 5 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400" });

    return result;
  }, [events]);

  if (insights.length === 0) return null;

  return (
    <SectionCard title="Top Inzichten" subtitle="Automatische highlights uit je data">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map((ins, i) => {
          const InsIcon = ins.icon;
          return (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 border border-border/40">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <InsIcon className={`w-4 h-4 ${ins.color}`} />
              </div>
              <p className="text-sm text-foreground leading-snug">{ins.text}</p>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ─── Debug Panel ───
function DebugPanel({ events }: { events: AnalyticsEvent[] }) {
  const [open, setOpen] = useState(false);
  const last20 = events.slice(-20).reverse();

  return (
    <SectionCard title="Analytics Debug" subtitle="Alleen zichtbaar voor admins">
      <div className="flex items-center gap-3 mb-4">
        <Button size="sm" variant={open ? "default" : "outline"} onClick={() => setOpen(!open)} className="gap-1.5 text-xs">
          <Bug className="w-3.5 h-3.5" /> {open ? "Verberg events" : "Toon laatste 20 events"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 text-xs"
          onClick={async () => {
            const { error } = await sendTestEvent();
            if (error) toast.error("Test event mislukt: " + error.message);
            else toast.success("Test event verzonden!");
          }}
        >
          <Send className="w-3.5 h-3.5" /> Test event verzenden
        </Button>
      </div>
      {open && (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableHead className="text-[10px] uppercase tracking-wider h-8">Type</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider h-8">Pagina</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider h-8">Bron</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider h-8">Tijd</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider h-8">Visitor ID</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider h-8">Session ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {last20.map((e) => (
                <TableRow key={e.id} className="hover:bg-muted/30">
                  <TableCell className="text-xs font-mono py-1.5">
                    <Badge variant="outline" className="text-[10px] font-mono">{e.event_type}</Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground py-1.5">{e.page_path}</TableCell>
                  <TableCell className="text-xs text-muted-foreground py-1.5">{e.source_type}</TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground py-1.5 tabular-nums">{format(new Date(e.created_at), "HH:mm:ss")}</TableCell>
                  <TableCell className="text-[10px] font-mono text-muted-foreground/60 py-1.5 max-w-[80px] truncate">{e.visitor_id?.slice(0, 8) || "—"}</TableCell>
                  <TableCell className="text-[10px] font-mono text-muted-foreground/60 py-1.5 max-w-[80px] truncate">{e.session_id?.slice(0, 8)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </SectionCard>
  );
}

// ─── Live Visitor Row ───
function LiveVisitorRow({ event }: { event: AnalyticsEvent }) {
  const DevIcon = event.device_type === "mobile" ? Smartphone : event.device_type === "tablet" ? Tablet : Monitor;
  const secsAgo = differenceInSeconds(new Date(), new Date(event.created_at));
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
        {secsAgo < 5 ? "nu" : secsAgo < 60 ? `${secsAgo}s` : `${Math.floor(secsAgo / 60)}m`}
      </span>
    </div>
  );
}

// ─── Activity Feed ───
function ActivityItem({ event }: { event: AnalyticsEvent }) {
  const actionMap: Record<string, string> = {
    page_view: "opende",
    session_start: "startte sessie op",
    session_end: "beëindigde sessie op",
    chatbot_started: "startte chatbot op",
    lead_captured: "werd lead via",
    form_submit: "verzond formulier op",
    click: "klikte op",
    reservation_created: "maakte reservering op",
    test_event: "stuurde test event op",
  };
  const action = actionMap[event.event_type || "page_view"] || "bezocht";
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
        <span className="text-[10px] text-muted-foreground/70 tabular-nums">{format(new Date(event.created_at), "HH:mm:ss")}</span>
      </div>
    </div>
  );
}

function ChartSkeleton({ height = "h-64" }: { height?: string }) {
  return <Skeleton className={`w-full ${height} rounded-lg`} />;
}

function KpiSkeleton() {
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 p-4 sm:p-5 space-y-2">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-7 w-24" />
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function AnalyticsPage({ embedded = false }: { embedded?: boolean }) {
  const { signOut } = useAuth();
  const [range, setRange] = useState<DateRange>("7d");
  const [showCompare, setShowCompare] = useState(false);
  const { data: events = [], isLoading, refresh } = useSiteAnalytics(range);
  const { data: prevEvents = [] } = usePreviousPeriodAnalytics(range);
  const { data: leads = [] } = useLeads();
  const { recentEvents, lastUpdated } = useRealtimeAnalytics();

  const metrics = useMemo(() => computeMetrics(events), [events]);
  const prevMetrics = useMemo(() => computeMetrics(prevEvents), [prevEvents]);

  // ─── Live Visitors (last 30 seconds) ───
  const liveVisitors = useMemo(() => {
    const thirtySecAgo = new Date(Date.now() - 30000);
    return recentEvents.filter((e) => new Date(e.created_at) >= thirtySecAgo);
  }, [recentEvents]);

  // ─── Traffic Over Time ───
  const trafficData = useMemo(() => {
    if (events.length === 0) return [];
    const now = new Date();
    if (range === "24h") {
      return eachHourOfInterval({ start: subHours(now, 24), end: now }).map((h) => {
        const hourEvents = events.filter((e) => {
          const d = new Date(e.created_at);
          return d.getHours() === h.getHours() && d.getDate() === h.getDate();
        });
        return {
          label: format(h, "HH:mm"),
          Bezoekers: new Set(hourEvents.map((e) => e.session_id)).size,
          Weergaven: hourEvents.filter((e) => e.event_type === "page_view").length,
        };
      });
    }
    const dayCount = range === "7d" ? 7 : range === "30d" ? 30 : 90;
    return eachDayOfInterval({ start: subDays(now, dayCount), end: now }).map((d) => {
      const dayStart = startOfDay(d);
      const dayEnd = new Date(dayStart.getTime() + 86400000);
      const dayEvents = events.filter((e) => { const ed = new Date(e.created_at); return ed >= dayStart && ed < dayEnd; });
      return {
        label: format(d, range === "90d" ? "d/M" : "d MMM", { locale: nl }),
        Bezoekers: new Set(dayEvents.map((e) => e.session_id)).size,
        Weergaven: dayEvents.filter((e) => e.event_type === "page_view").length,
      };
    });
  }, [events, range]);

  // ─── Traffic Sources ───
  const sourceData = useMemo(() => {
    const counts = new Map<string, number>();
    events.forEach((e) => counts.set(e.source_type || "direct", (counts.get(e.source_type || "direct") || 0) + 1));
    return [...counts.entries()].map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value })).sort((a, b) => b.value - a.value);
  }, [events]);

  // ─── Page Performance ───
  const pageData = useMemo(() => {
    const pageMap = new Map<string, { views: number; sessions: Set<string>; bounced: number }>();
    const sessionPV = new Map<string, string[]>();
    events.filter((e) => e.event_type === "page_view").forEach((e) => {
      if (!pageMap.has(e.page_path)) pageMap.set(e.page_path, { views: 0, sessions: new Set(), bounced: 0 });
      const p = pageMap.get(e.page_path)!;
      p.views++;
      p.sessions.add(e.session_id);
      if (!sessionPV.has(e.session_id)) sessionPV.set(e.session_id, []);
      sessionPV.get(e.session_id)!.push(e.page_path);
    });
    // Calculate per-page bounce rate
    pageMap.forEach((data, page) => {
      data.sessions.forEach((sid) => {
        const pages = sessionPV.get(sid) || [];
        if (pages.length === 1 && pages[0] === page) data.bounced++;
      });
    });
    return [...pageMap.entries()]
      .map(([page, d]) => ({ page, views: d.views, uniques: d.sessions.size, bounceRate: d.sessions.size > 0 ? (d.bounced / d.sessions.size * 100) : 0 }))
      .sort((a, b) => b.views - a.views).slice(0, 10);
  }, [events]);

  // ─── Country Data ───
  const countryData = useMemo(() => {
    const counts = new Map<string, number>();
    events.forEach((e) => { const c = e.country || "Onbekend"; counts.set(c, (counts.get(c) || 0) + 1); });
    return [...counts.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
  }, [events]);

  // ─── Device Data ───
  const deviceData = useMemo(() => {
    const counts = new Map<string, number>();
    events.forEach((e) => counts.set(e.device_type || "desktop", (counts.get(e.device_type || "desktop") || 0) + 1));
    return [...counts.entries()].map(([name, value]) => ({
      name: name === "desktop" ? "Desktop" : name === "mobile" ? "Mobiel" : "Tablet", value,
    })).sort((a, b) => b.value - a.value);
  }, [events]);

  // ─── Hourly Heatmap ───
  const hourlyData = useMemo(() => {
    const hourCounts = new Array(24).fill(0);
    events.forEach((e) => hourCounts[new Date(e.created_at).getHours()]++);
    return hourCounts.map((count, hour) => ({ uur: `${String(hour).padStart(2, "0")}:00`, Bezoekers: count }));
  }, [events]);

  // ─── Conversion funnel ───
  const conversionData = useMemo(() => [
    { name: "Bezoekers", value: metrics.sessions },
    { name: "Chatbot gestart", value: metrics.chatbotStarted },
    { name: "Formulier verzonden", value: metrics.formSubmits },
    { name: "Lead vastgelegd", value: metrics.leadsCaptured },
  ], [metrics]);

  const content = (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        {/* ── Header Row: Filters + Data Quality + Compare ── */}
        <div className="flex items-center gap-2 flex-wrap">
          {RANGE_OPTIONS.map((opt) => (
            <Button key={opt.value} variant={range === opt.value ? "default" : "outline"} size="sm"
              onClick={() => setRange(opt.value)} className="text-xs font-medium">
              {opt.label}
            </Button>
          ))}
          <div className="flex-1" />
          <DataQualityBadge />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Vergelijk</span>
            <Switch checked={showCompare} onCheckedChange={setShowCompare} className="scale-75" />
          </div>
          <Button variant="ghost" size="sm" onClick={refresh} className="text-muted-foreground hover:text-foreground gap-1.5">
            <RefreshCw className="w-4 h-4" /> Vernieuwen
          </Button>
        </div>

        {/* ── 1. Live Visitors ── */}
        <SectionCard title="Live Bezoekers" subtitle={`Actief in de afgelopen 30 seconden`}>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-emerald-500 animate-pulse" />
              <span className="text-3xl font-bold text-foreground font-mono">{liveVisitors.length}</span>
              <InfoTip id="active_visitors" />
            </div>
            <span className="text-xs text-muted-foreground/60 ml-auto tabular-nums">
              Laatst bijgewerkt: {format(lastUpdated, "HH:mm:ss")}
            </span>
          </div>
          {liveVisitors.length > 0 ? (
            <div className="space-y-0.5 max-h-48 overflow-y-auto">{liveVisitors.slice(0, 10).map((e) => <LiveVisitorRow key={e.id} event={e} />)}</div>
          ) : (
            <p className="text-sm text-muted-foreground/60 py-4 text-center">Geen actieve bezoekers</p>
          )}
        </SectionCard>

        {/* ── Top Insights ── */}
        <TopInsights events={events} />

        {/* ── 2. KPIs ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {isLoading ? Array.from({ length: 7 }).map((_, i) => <KpiSkeleton key={i} />) : (
            <>
              <KpiCard icon={Users} label="Sessies" value={String(metrics.sessions)} infoId="visitors"
                change={showCompare ? pctChange(metrics.sessions, prevMetrics.sessions) : undefined} />
              <KpiCard icon={Globe} label="Unieke bezoekers" value={String(metrics.uniqueVisitors)} infoId="unique_visitors"
                change={showCompare ? pctChange(metrics.uniqueVisitors, prevMetrics.uniqueVisitors) : undefined} />
              <KpiCard icon={Eye} label="Paginaweergaven" value={String(metrics.totalPageViews)} infoId="page_views"
                change={showCompare ? pctChange(metrics.totalPageViews, prevMetrics.totalPageViews) : undefined} />
              <KpiCard icon={Timer} label="Gem. Sessieduur" value={formatDuration(metrics.avgDuration)} infoId="session_duration"
                change={showCompare ? pctChange(metrics.avgDuration, prevMetrics.avgDuration) : undefined} />
              <KpiCard icon={TrendingUp} label="Bounce Rate" value={`${metrics.bounceRate.toFixed(1)}%`} infoId="bounce_rate"
                change={showCompare ? pctChange(metrics.bounceRate, prevMetrics.bounceRate) : undefined} />
              <KpiCard icon={Percent} label="Conversie %" value={`${metrics.convRate.toFixed(1)}%`} infoId="conversion_rate"
                change={showCompare ? pctChange(metrics.convRate, prevMetrics.convRate) : undefined} />
              <KpiCard icon={Target} label="Conversies" value={String(metrics.conversions)}
                change={showCompare ? pctChange(metrics.conversions, prevMetrics.conversions) : undefined} />
            </>
          )}
        </div>

        {/* ── 3. Traffic Over Time ── */}
        <SectionCard title="Verkeer Over Tijd" subtitle="Sessies en paginaweergaven per tijdsperiode">
          {isLoading ? <ChartSkeleton height="h-72" /> : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} label={{ value: "Aantal", angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "hsl(var(--muted-foreground))" } }} />
                <ReTooltip contentStyle={chartTooltipStyle} />
                <Legend iconType="circle" iconSize={8} />
                <Area type="monotone" dataKey="Bezoekers" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.12} strokeWidth={2} />
                <Area type="monotone" dataKey="Weergaven" stroke={COLORS.gold} fill={COLORS.gold} fillOpacity={0.08} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        {/* ── Row: Sources + Device + Country ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Verkeersbronnen" subtitle="Origine van bezoeken">
            {isLoading ? <ChartSkeleton height="h-52" /> : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={sourceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} label={{ value: "Events", position: "insideBottom", offset: -5, style: { fontSize: 10, fill: "hsl(var(--muted-foreground))" } }} />
                  <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <ReTooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="value" name="Bezoeken" radius={[0, 6, 6, 0]}>
                    {sourceData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </SectionCard>

          <SectionCard title="Apparaten" subtitle="Desktop, Mobiel & Tablet">
            {isLoading ? <ChartSkeleton height="h-52" /> : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={deviceData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {deviceData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <ReTooltip contentStyle={chartTooltipStyle} />
                  <Legend iconType="circle" iconSize={8} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </SectionCard>

          <SectionCard title="Landen" subtitle="Top bezoekerslanden">
            {isLoading ? <ChartSkeleton height="h-52" /> : countryData.length === 0 ? (
              <p className="text-sm text-muted-foreground/60 py-8 text-center">Geen landdata</p>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto">
                {countryData.map((c, i) => {
                  const maxVal = countryData[0]?.value || 1;
                  return (
                    <div key={c.name} className="flex items-center gap-3">
                      <span className="text-sm text-foreground font-medium w-24 truncate">{c.name}</span>
                      <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${(c.value / maxVal) * 100}%`, backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                      </div>
                      <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">{c.value}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </SectionCard>
        </div>

        {/* ── Page Performance ── */}
        <SectionCard title="Pagina Prestaties" subtitle="Meest bezochte pagina's met bounce rate">
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
                    <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-9 text-right">Bounce %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageData.map((p, idx) => (
                    <TableRow key={p.page} className={`hover:bg-muted/30 border-border/40 ${idx % 2 === 1 ? "bg-muted/10" : ""}`}>
                      <TableCell className="font-medium text-foreground text-sm font-mono">{p.page}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm tabular-nums">{p.views}</TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm tabular-nums">{p.uniques}</TableCell>
                      <TableCell className={`text-right text-sm tabular-nums font-medium ${p.bounceRate > 70 ? "text-red-500 dark:text-red-400" : p.bounceRate > 50 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                        {p.bounceRate.toFixed(0)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </SectionCard>

        {/* ── Row: Hourly Heat + Conversions + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SectionCard title="Uurlijks Verkeer" subtitle="Events per uur van de dag">
            {isLoading ? <ChartSkeleton height="h-52" /> : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="uur" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} interval={2} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} label={{ value: "Events", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "hsl(var(--muted-foreground))" } }} />
                  <ReTooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="Bezoekers" name="Bezoekers" radius={[4, 4, 0, 0]}>
                    {hourlyData.map((entry, i) => {
                      const max = Math.max(...hourlyData.map((h) => h.Bezoekers)) || 1;
                      return <Cell key={i} fill={entry.Bezoekers > 0 ? COLORS.primary : "hsl(var(--muted))"} fillOpacity={Math.max(0.3, entry.Bezoekers / max)} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </SectionCard>

          <SectionCard title="Conversie Trechter" subtitle="Bezoeker → Lead flow">
            {isLoading ? <ChartSkeleton height="h-52" /> : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={conversionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <ReTooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="value" name="Aantal" fill={COLORS.green} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </SectionCard>

          <SectionCard title="Live Activiteit" subtitle="Recente bezoekersacties">
            <div className="space-y-1 max-h-[220px] overflow-y-auto">
              {recentEvents.length > 0 ? (
                recentEvents.slice(0, 15).map((e) => <ActivityItem key={e.id} event={e} />)
              ) : (
                <p className="text-sm text-muted-foreground/60 py-8 text-center">Geen recente activiteit</p>
              )}
            </div>
          </SectionCard>
        </div>

        {/* ── Debug Panel ── */}
        <DebugPanel events={events} />
      </div>
    </TooltipProvider>
  );

  if (embedded) return content;

  return (
    <div className="min-h-screen bg-background dark">
      <div className="bg-card/70 backdrop-blur-2xl border-b border-border/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="text-lg font-bold text-foreground">Website Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={refresh} className="text-muted-foreground hover:text-foreground gap-1.5"><RefreshCw className="w-4 h-4" /> Vernieuwen</Button>
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-muted-foreground hover:text-foreground gap-1.5"><LogOut className="w-4 h-4" /> Uitloggen</Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">{content}</div>
    </div>
  );
}
