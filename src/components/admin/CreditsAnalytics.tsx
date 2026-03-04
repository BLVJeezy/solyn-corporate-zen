import { useMemo } from "react";
import { Coins, Euro, TrendingDown, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { parseEuro, fmtEuro, CREDIT_COST, TX_FEE_RATE } from "@/lib/adminUtils";
import { Client } from "@/hooks/useClients";
import KpiCard from "./KpiCard";

function useChartColors() {
  const root = typeof document !== 'undefined' ? document.querySelector('.dark') : null;
  const isDark = !!root;
  return {
    accent: isDark ? "hsl(220, 90%, 62%)" : "hsl(220, 90%, 56%)",
    red: isDark ? "hsl(0, 72%, 62%)" : "hsl(0, 72%, 55%)",
    green: isDark ? "hsl(152, 55%, 52%)" : "hsl(152, 60%, 42%)",
    slate: isDark ? "hsl(220, 8%, 52%)" : "hsl(215, 15%, 55%)",
    grid: isDark ? "hsl(220, 12%, 18%)" : "hsl(220, 10%, 92%)",
    tooltipBg: isDark ? "hsl(220, 16%, 12%)" : "hsl(0, 0%, 100%)",
    tooltipBorder: isDark ? "hsl(220, 12%, 20%)" : "hsl(220, 10%, 90%)",
    tooltipColor: isDark ? "hsl(220, 10%, 92%)" : "hsl(220, 10%, 15%)",
  };
}

interface Props { clients: Client[]; }

export default function CreditsAnalytics({ clients }: Props) {
  const colors = useChartColors();

  const stats = useMemo(() => {
    const withCredits = clients.filter((c) => c.credits_used && c.credits_used > 0);
    const totalCredits = clients.reduce((s, c) => s + (c.credits_used || 0), 0);
    const avgCredits = withCredits.length ? Math.round(totalCredits / withCredits.length) : 0;
    const totalCreditCost = totalCredits * CREDIT_COST;
    const totalRevenue = clients.reduce((s, c) => {
      const setup = parseEuro(c.setup_fee); const rec = parseEuro(c.recurring_fee);
      const yearly = c.billing_cycle === "jaarlijks" ? rec : rec * 12;
      return s + setup + yearly;
    }, 0);
    const profitAfterCredits = totalRevenue - totalRevenue * TX_FEE_RATE - totalCreditCost;
    return { avgCredits, totalCreditCost, profitAfterCredits, withCredits, totalCredits };
  }, [clients]);

  const perClientData = useMemo(() => {
    return clients.filter((c) => c.credits_used && c.credits_used > 0).map((c) => {
      const setup = parseEuro(c.setup_fee); const rec = parseEuro(c.recurring_fee);
      const yearly = c.billing_cycle === "jaarlijks" ? rec : rec * 12; const revenue = setup + yearly;
      const creditCost = (c.credits_used || 0) * CREDIT_COST; const profit = revenue - revenue * TX_FEE_RATE - creditCost;
      return { name: c.company || c.name, credits: c.credits_used || 0, cost: Math.round(creditCost), revenue: Math.round(revenue), profit: Math.round(profit) };
    }).sort((a, b) => b.credits - a.credits);
  }, [clients]);

  const tooltipStyle = { backgroundColor: colors.tooltipBg, border: `1px solid ${colors.tooltipBorder}`, borderRadius: "10px", color: colors.tooltipColor, fontSize: 12, boxShadow: "0 8px 24px -4px rgba(0,0,0,0.12)" };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground tracking-tight">Credits</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Verbruik en kosten per project</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <KpiCard icon={Coins} label="Gem./Project" value={String(stats.avgCredits)} color={colors.accent} />
        <KpiCard icon={Euro} label="Totale Kosten" value={fmtEuro(Math.round(stats.totalCreditCost))} valueColor="text-red-600 dark:text-red-400" color={colors.red} />
        <KpiCard icon={BarChart3} label="Totaal Credits" value={String(stats.totalCredits)} color={colors.slate} />
        <KpiCard icon={TrendingDown} label="Profit na Credits" value={fmtEuro(Math.round(stats.profitAfterCredits))} valueColor="text-emerald-600 dark:text-emerald-400" color={colors.green} highlight />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        {perClientData.length > 0 && (
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm dark:shadow-lg dark:shadow-black/20 p-5">
            <h3 className="text-sm font-semibold text-foreground tracking-tight mb-1">Credits per klant</h3>
            <p className="text-[11px] text-muted-foreground mb-4">Gesorteerd op verbruik</p>
            <ResponsiveContainer width="100%" height={Math.max(200, perClientData.length * 40)}>
              <BarChart data={perClientData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} horizontal={false} />
                <XAxis type="number" stroke={colors.slate} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke={colors.slate} fontSize={11} width={100} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="credits" fill={colors.accent} name="Credits" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {perClientData.length > 0 && (
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm dark:shadow-lg dark:shadow-black/20 p-5">
            <h3 className="text-sm font-semibold text-foreground tracking-tight mb-1">Kosten vs Omzet</h3>
            <p className="text-[11px] text-muted-foreground mb-4">Credit kosten tegenover revenue</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={perClientData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                <XAxis dataKey="name" stroke={colors.slate} fontSize={10} interval={0} angle={-45} textAnchor="end" height={60} tickLine={false} axisLine={false} />
                <YAxis stroke={colors.slate} fontSize={11} tickFormatter={(v) => `€${v}`} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [`€${value}`, name]} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="revenue" fill={colors.green} name="Omzet" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" fill={colors.red} name="Credit kosten" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/60 shadow-sm dark:shadow-lg dark:shadow-black/20 overflow-hidden">
        <div className="px-5 py-4 border-b border-border/60">
          <h3 className="text-sm font-semibold text-foreground tracking-tight">Klant Overzicht</h3>
        </div>
        {perClientData.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-muted/60 mx-auto mb-4 flex items-center justify-center">
              <Coins className="w-6 h-6 text-muted-foreground/40" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Geen klanten met credits</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-b border-border/60">
                <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-9">Klant</TableHead>
                <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-9 text-right">Credits</TableHead>
                <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-9 text-right">Kosten</TableHead>
                <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-9 text-right">Omzet</TableHead>
                <TableHead className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider h-9 text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perClientData.map((c, idx) => (
                <TableRow key={c.name} className={`hover:bg-muted/30 border-border/40 ${idx % 2 === 1 ? "bg-muted/10" : ""}`}>
                  <TableCell className="font-medium text-foreground text-sm">{c.name}</TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm tabular-nums">{c.credits}</TableCell>
                  <TableCell className="text-right text-red-600 dark:text-red-400 font-medium text-sm tabular-nums">-€{c.cost}</TableCell>
                  <TableCell className="text-right text-foreground font-medium text-sm tabular-nums">€{c.revenue}</TableCell>
                  <TableCell className={`text-right font-semibold text-sm tabular-nums ${c.profit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>€{c.profit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
