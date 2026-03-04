import { useMemo, useState } from "react";
import { Users, Percent, Euro, TrendingUp, CalendarClock, Coins, Target, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend, LineChart, Line } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { startOfDay, startOfWeek, startOfMonth, startOfQuarter, startOfYear, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, subMonths, subYears, addMonths } from "date-fns";
import { parseEuro, fmtEuro, TX_FEE_RATE, CREDIT_COST } from "@/lib/adminUtils";
import { Lead } from "@/hooks/useLeads";
import { Client } from "@/hooks/useClients";
import KpiCard from "./KpiCard";
import { X } from "lucide-react";

const CHART_GOLD = "hsl(40,48%,56%)";
const CHART_GOLD_DARK = "hsl(40,48%,36%)";
const CHART_GREEN = "hsl(142,71%,45%)";
const CHART_SLATE = "hsl(215,15%,60%)";
const CHART_BG = "hsl(222,14%,20%)";
const CHART_TOOLTIP_BG = "hsl(222,14%,12%)";

interface Props {
  leads: Lead[];
  clients: Client[];
}

export default function DashboardOverview({ leads, clients }: Props) {
  const [revPeriod, setRevPeriod] = useState<string>("maand");
  const [showPackagePanel, setShowPackagePanel] = useState<"mrr" | "jrr" | null>(null);

  // ── KPI Calculations ──
  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const wonLeads = leads.filter((l) => l.status === "gewonnen").length;
    const conversionRate = totalLeads ? (wonLeads / totalLeads * 100).toFixed(1) : "0";
    const avgSetupFee = clients.length
      ? Math.round(clients.reduce((sum, c) => sum + parseEuro(c.setup_fee), 0) / clients.length)
      : 0;

    const totalSetupFees = clients.reduce((sum, c) => sum + parseEuro(c.setup_fee), 0);
    const monthlyClients = clients.filter((c) => c.billing_cycle !== "jaarlijks");
    const yearlyClients = clients.filter((c) => c.billing_cycle === "jaarlijks");
    const mrr = monthlyClients.reduce((sum, c) => sum + parseEuro(c.recurring_fee), 0);
    const jrr = yearlyClients.reduce((sum, c) => sum + parseEuro(c.recurring_fee), 0);
    const totalRecurringYearly = (mrr + jrr / 12) * 12;
    const totalRevenue = totalSetupFees + totalRecurringYearly;
    const transactionFees = totalRevenue * TX_FEE_RATE;
    const totalCreditCosts = clients.reduce((sum, c) => sum + (c.credits_used || 0) * CREDIT_COST, 0);
    const profit = totalRevenue - transactionFees - totalCreditCosts;

    const clientsWithCredits = clients.filter((c) => c.credits_used && c.credits_used > 0);
    const avgCreditCount = clientsWithCredits.length
      ? Math.round(clientsWithCredits.reduce((sum, c) => sum + (c.credits_used || 0), 0) / clientsWithCredits.length)
      : 0;

    return {
      totalLeads, conversionRate, avgSetupFee, totalRevenue, profit,
      mrr, jrr, avgCreditCount, monthlyClients, yearlyClients,
    };
  }, [leads, clients]);

  // ── Sparkline data (monthly revenue for last 6 months) ──
  const revenueSparkline = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const month = subMonths(now, 5 - i);
      const monthStart = startOfMonth(month);
      const monthEnd = i === 5 ? now : startOfMonth(addMonths(month, 1));
      let rev = 0;
      clients.forEach((c) => {
        const cStart = c.start_date ? new Date(c.start_date) : new Date(c.created_at);
        if (cStart >= monthStart && cStart < monthEnd) rev += parseEuro(c.setup_fee);
        if (cStart <= monthEnd) {
          const recFee = parseEuro(c.recurring_fee);
          if (c.billing_cycle === "jaarlijks") {
            if (cStart.getMonth() === monthStart.getMonth()) rev += recFee;
          } else {
            rev += recFee;
          }
        }
      });
      return Math.round(rev);
    });
  }, [clients]);

  const leadsSparkline = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const month = subMonths(now, 5 - i);
      const ms = startOfMonth(month);
      const me = i === 5 ? now : startOfMonth(addMonths(month, 1));
      return leads.filter((l) => {
        const d = new Date(l.created_at);
        return d >= ms && d < me;
      }).length;
    });
  }, [leads]);

  // ── Revenue Timeline ──
  const revenueTimeline = useMemo(() => {
    if (clients.length === 0) return [];
    const now = new Date();
    type PK = "dag" | "week" | "maand" | "kwartaal" | "jaar";
    const rangeStart: Record<PK, Date> = {
      dag: subMonths(now, 1), week: subMonths(now, 3), maand: subYears(now, 1),
      kwartaal: subYears(now, 2), jaar: subYears(now, 5)
    };
    const start = rangeStart[revPeriod as PK] || subYears(now, 1);
    const fmtDate = (d: Date) => {
      switch (revPeriod) {
        case "dag": return format(d, "dd/MM");
        case "week": return "W" + format(d, "ww/yy");
        case "maand": return format(d, "MMM yy");
        case "kwartaal": return "Q" + (Math.floor(d.getMonth() / 3) + 1) + " " + format(d, "yy");
        case "jaar": return format(d, "yyyy");
        default: return format(d, "MMM yy");
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
    intervals.forEach((d) => { const k = fmtDate(d); if (!buckets.has(k)) buckets.set(k, { label: k, setup: 0, recurring: 0 }); });

    clients.forEach((c) => {
      const setupVal = parseEuro(c.setup_fee);
      const recurringVal = parseEuro(c.recurring_fee);
      const clientStart = c.start_date ? new Date(c.start_date) : new Date(c.created_at);
      if (clientStart >= start && clientStart <= now) {
        const key = fmtDate(getBucketStart(clientStart));
        const b = buckets.get(key);
        if (b) b.setup += setupVal;
      }
      if (recurringVal > 0) {
        if (c.billing_cycle === "jaarlijks") {
          let anniversary = new Date(clientStart);
          while (anniversary <= now) {
            if (anniversary >= start) {
              const key = fmtDate(getBucketStart(anniversary));
              const b = buckets.get(key);
              if (b) b.recurring += recurringVal;
            }
            anniversary = new Date(anniversary.getFullYear() + 1, anniversary.getMonth(), anniversary.getDate());
          }
        } else {
          const monthlyFee = recurringVal;
          let mult = 1;
          switch (revPeriod) { case "dag": mult = 1 / 30; break; case "week": mult = 7 / 30; break; case "maand": mult = 1; break; case "kwartaal": mult = 3; break; case "jaar": mult = 12; break; }
          const feePerPeriod = monthlyFee * mult;
          buckets.forEach((b, key) => {
            const bd = intervals.find((d) => fmtDate(d) === key);
            if (bd && bd >= getBucketStart(clientStart)) b.recurring += feePerPeriod;
          });
        }
      }
    });

    let cum = 0;
    return Array.from(buckets.values()).map((b) => {
      const total = Math.round(b.setup + b.recurring);
      const txFee = total * TX_FEE_RATE;
      const creditCostPeriod = 0; // approximate
      const periodProfit = total - txFee - creditCostPeriod;
      const margin = total > 0 ? (periodProfit / total) * 100 : 0;
      cum += total;
      return { label: b.label, setup: Math.round(b.setup), recurring: Math.round(b.recurring), totaal: total, cumulatief: cum, profit: Math.round(periodProfit), margin: Math.round(margin) };
    });
  }, [clients, revPeriod]);

  // ── Forecast (simple linear projection) ──
  const forecastData = useMemo(() => {
    if (revenueTimeline.length < 2) return [];
    const last6 = revenueTimeline.slice(-6);
    const avg = last6.reduce((s, d) => s + d.totaal, 0) / last6.length;
    const growth = last6.length >= 2 ? (last6[last6.length - 1].totaal - last6[0].totaal) / last6.length : 0;
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const m = addMonths(now, i + 1);
      return {
        label: format(m, "MMM yy"),
        forecast: Math.max(0, Math.round(avg + growth * (i + 1))),
      };
    });
  }, [revenueTimeline]);

  const tooltipStyle = {
    backgroundColor: CHART_TOOLTIP_BG,
    border: `1px solid ${CHART_BG}`,
    borderRadius: "10px",
    color: "hsl(210,40%,98%)",
    fontSize: 12,
  };

  return (
    <div className="space-y-6">
      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard icon={Users} label="Leads" value={String(stats.totalLeads)} sparkData={leadsSparkline} color="hsl(194,28%,49%)" />
        <KpiCard icon={Target} label="Conversie" value={`${stats.conversionRate}%`} color={CHART_GREEN} />
        <KpiCard icon={BarChart3} label="Gem. Setup Fee" value={fmtEuro(stats.avgSetupFee)} />
        <KpiCard icon={Euro} label="Totale Omzet" value={fmtEuro(Math.round(stats.totalRevenue))} sparkData={revenueSparkline} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <KpiCard icon={Percent} label="Profit" value={fmtEuro(Math.round(stats.profit))} valueColor="text-emerald-400" color={CHART_GREEN} />
        <KpiCard
          icon={TrendingUp} label="MRR" value={fmtEuro(Math.round(stats.mrr))}
          color={CHART_GOLD}
        />
        <KpiCard
          icon={CalendarClock} label="JRR" value={fmtEuro(Math.round(stats.jrr))}
          color={CHART_GOLD}
        />
      </div>

      {/* ── MRR/JRR Quick Expand ── */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowPackagePanel(showPackagePanel === "mrr" ? null : "mrr")}>
          MRR Details
        </Button>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowPackagePanel(showPackagePanel === "jrr" ? null : "jrr")}>
          JRR Details
        </Button>
      </div>

      {showPackagePanel && (
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-card-foreground">
              {showPackagePanel === "mrr" ? "Maandelijkse abonnementen" : "Jaarlijkse abonnementen"}
            </h3>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowPackagePanel(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {(() => {
            const list = showPackagePanel === "mrr" ? stats.monthlyClients : stats.yearlyClients;
            if (list.length === 0) return <p className="text-muted-foreground text-sm text-center py-4">Geen klanten</p>;
            return (
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Naam</TableHead>
                    <TableHead className="text-muted-foreground hidden md:table-cell">Bedrijf</TableHead>
                    <TableHead className="text-muted-foreground">Fee</TableHead>
                    <TableHead className="text-muted-foreground hidden md:table-cell">Start</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((c) => (
                    <TableRow key={c.id} className="border-border">
                      <TableCell className="font-medium text-card-foreground">{c.name}</TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">{c.company || "—"}</TableCell>
                      <TableCell>
                        <span className="text-emerald-400 font-semibold">{c.recurring_fee ? `€${c.recurring_fee}` : "—"}</span>
                        <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">
                          {showPackagePanel === "mrr" ? "/mnd" : "/jaar"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden md:table-cell">
                        {c.start_date ? format(new Date(c.start_date), "d MMM yyyy", { locale: nl }) : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-border border-t-2">
                    <TableCell className="font-bold text-card-foreground">Totaal ({list.length})</TableCell>
                    <TableCell className="hidden md:table-cell" />
                    <TableCell>
                      <span className="text-emerald-400 font-bold">
                        {fmtEuro(list.reduce((sum, c) => sum + parseEuro(c.recurring_fee), 0))}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell" />
                  </TableRow>
                </TableBody>
              </Table>
            );
          })()}
        </div>
      )}

      {/* ── Revenue Analytics ── */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h3 className="text-base font-semibold text-card-foreground">Omzet Analytics</h3>
          <Tabs value={revPeriod} onValueChange={setRevPeriod}>
            <TabsList className="bg-muted h-8">
              {["dag", "week", "maand", "kwartaal", "jaar"].map((p) => (
                <TabsTrigger key={p} value={p} className="text-[11px] capitalize px-3 h-7">{p}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {revenueTimeline.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">Nog geen klanten</p>
        ) : (
          <div className="space-y-8">
            {/* Revenue Split */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-3">Setup vs Recurring</h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenueTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_BG} />
                  <XAxis dataKey="label" stroke={CHART_SLATE} fontSize={11} interval="preserveStartEnd" />
                  <YAxis stroke={CHART_SLATE} fontSize={11} tickFormatter={(v) => `€${v}`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [`€${value.toLocaleString("nl-NL")}`, name === "setup" ? "Setup" : "Recurring"]} />
                  <Legend />
                  <Bar dataKey="setup" stackId="a" fill={CHART_GOLD} name="Setup" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="recurring" stackId="a" fill={CHART_GOLD_DARK} name="Recurring" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Cumulative Trendline */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-3">Cumulatieve omzet</h4>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={revenueTimeline}>
                  <defs>
                    <linearGradient id="trendGradNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_GOLD} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={CHART_GOLD} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_BG} />
                  <XAxis dataKey="label" stroke={CHART_SLATE} fontSize={11} interval="preserveStartEnd" />
                  <YAxis stroke={CHART_SLATE} fontSize={11} tickFormatter={(v) => `€${v}`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`€${value.toLocaleString("nl-NL")}`, "Cumulatief"]} />
                  <Area type="monotone" dataKey="cumulatief" stroke={CHART_GOLD} fill="url(#trendGradNew)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Profit Margin Trend */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-3">Winstmarge trend</h4>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={revenueTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_BG} />
                  <XAxis dataKey="label" stroke={CHART_SLATE} fontSize={11} interval="preserveStartEnd" />
                  <YAxis stroke={CHART_SLATE} fontSize={11} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value}%`, "Marge"]} />
                  <Line type="monotone" dataKey="margin" stroke={CHART_GREEN} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Forecast */}
            {forecastData.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-3">Omzet forecast (6 maanden)</h4>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_BG} />
                    <XAxis dataKey="label" stroke={CHART_SLATE} fontSize={11} />
                    <YAxis stroke={CHART_SLATE} fontSize={11} tickFormatter={(v) => `€${v}`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`€${value.toLocaleString("nl-NL")}`, "Forecast"]} />
                    <Bar dataKey="forecast" fill="hsl(194,28%,49%)" radius={[4, 4, 0, 0]} opacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
