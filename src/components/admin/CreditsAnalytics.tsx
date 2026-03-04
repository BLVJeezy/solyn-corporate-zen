import { useMemo } from "react";
import { Coins, Euro, TrendingDown, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { parseEuro, fmtEuro, CREDIT_COST, TX_FEE_RATE } from "@/lib/adminUtils";
import { Client } from "@/hooks/useClients";
import KpiCard from "./KpiCard";

const ACCENT = "hsl(220, 90%, 56%)";
const RED = "hsl(0, 72%, 55%)";
const GREEN = "hsl(152, 60%, 42%)";
const SLATE = "hsl(215, 15%, 55%)";
const GRID = "hsl(220, 10%, 92%)";

interface Props {
  clients: Client[];
}

export default function CreditsAnalytics({ clients }: Props) {
  const stats = useMemo(() => {
    const withCredits = clients.filter((c) => c.credits_used && c.credits_used > 0);
    const totalCredits = clients.reduce((s, c) => s + (c.credits_used || 0), 0);
    const avgCredits = withCredits.length ? Math.round(totalCredits / withCredits.length) : 0;
    const totalCreditCost = totalCredits * CREDIT_COST;
    const totalRevenue = clients.reduce((s, c) => {
      const setup = parseEuro(c.setup_fee);
      const rec = parseEuro(c.recurring_fee);
      const yearly = c.billing_cycle === "jaarlijks" ? rec : rec * 12;
      return s + setup + yearly;
    }, 0);
    const profitAfterCredits = totalRevenue - totalRevenue * TX_FEE_RATE - totalCreditCost;
    return { avgCredits, totalCreditCost, profitAfterCredits, withCredits, totalCredits };
  }, [clients]);

  const perClientData = useMemo(() => {
    return clients
      .filter((c) => c.credits_used && c.credits_used > 0)
      .map((c) => {
        const setup = parseEuro(c.setup_fee);
        const rec = parseEuro(c.recurring_fee);
        const yearly = c.billing_cycle === "jaarlijks" ? rec : rec * 12;
        const revenue = setup + yearly;
        const creditCost = (c.credits_used || 0) * CREDIT_COST;
        const profit = revenue - revenue * TX_FEE_RATE - creditCost;
        return {
          name: c.company || c.name,
          credits: c.credits_used || 0,
          cost: Math.round(creditCost),
          revenue: Math.round(revenue),
          profit: Math.round(profit),
        };
      })
      .sort((a, b) => b.credits - a.credits);
  }, [clients]);

  const tooltipStyle = {
    backgroundColor: "hsl(0, 0%, 100%)",
    border: "1px solid hsl(220, 10%, 90%)",
    borderRadius: "8px",
    color: "hsl(220, 10%, 15%)",
    fontSize: 12,
    boxShadow: "0 4px 12px -2px rgba(0,0,0,0.08)",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Credits</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Verbruik en kosten per project</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <KpiCard icon={Coins} label="Gem./Project" value={String(stats.avgCredits)} color={ACCENT} />
        <KpiCard icon={Euro} label="Totale Kosten" value={fmtEuro(Math.round(stats.totalCreditCost))} valueColor="text-red-600" color={RED} />
        <KpiCard icon={BarChart3} label="Totaal Credits" value={String(stats.totalCredits)} color={SLATE} />
        <KpiCard icon={TrendingDown} label="Profit na Credits" value={fmtEuro(Math.round(stats.profitAfterCredits))} valueColor="text-emerald-600" color={GREEN} highlight />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        {/* Credits per client */}
        {perClientData.length > 0 && (
          <div className="bg-card rounded-xl border border-border shadow-sm p-5">
            <h3 className="text-sm font-semibold text-foreground mb-1">Credits per klant</h3>
            <p className="text-[11px] text-muted-foreground mb-4">Gesorteerd op verbruik</p>
            <ResponsiveContainer width="100%" height={Math.max(200, perClientData.length * 40)}>
              <BarChart data={perClientData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
                <XAxis type="number" stroke={SLATE} fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke={SLATE} fontSize={11} width={100} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="credits" fill={ACCENT} name="Credits" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Cost vs Revenue */}
        {perClientData.length > 0 && (
          <div className="bg-card rounded-xl border border-border shadow-sm p-5">
            <h3 className="text-sm font-semibold text-foreground mb-1">Kosten vs Omzet</h3>
            <p className="text-[11px] text-muted-foreground mb-4">Credit kosten tegenover revenue</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={perClientData}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
                <XAxis dataKey="name" stroke={SLATE} fontSize={10} interval={0} angle={-45} textAnchor="end" height={60} tickLine={false} axisLine={false} />
                <YAxis stroke={SLATE} fontSize={11} tickFormatter={(v) => `€${v}`} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [`€${value}`, name]} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="revenue" fill={GREEN} name="Omzet" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" fill={RED} name="Credit kosten" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Klant Overzicht</h3>
        </div>
        {perClientData.length === 0 ? (
          <div className="py-12 text-center">
            <Coins className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Geen klanten met credits</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-medium text-muted-foreground h-9">Klant</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground h-9 text-right">Credits</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground h-9 text-right">Kosten</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground h-9 text-right">Omzet</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground h-9 text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perClientData.map((c) => (
                <TableRow key={c.name} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground text-sm">{c.name}</TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm tabular-nums">{c.credits}</TableCell>
                  <TableCell className="text-right text-red-600 font-medium text-sm tabular-nums">-€{c.cost}</TableCell>
                  <TableCell className="text-right text-foreground font-medium text-sm tabular-nums">€{c.revenue}</TableCell>
                  <TableCell className={`text-right font-semibold text-sm tabular-nums ${c.profit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    €{c.profit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
