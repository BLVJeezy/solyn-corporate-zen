import { useMemo } from "react";
import { Coins, Euro, TrendingDown, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { parseEuro, fmtEuro, CREDIT_COST, TX_FEE_RATE } from "@/lib/adminUtils";
import { Client } from "@/hooks/useClients";
import KpiCard from "./KpiCard";

const CHART_BG = "hsl(222,14%,20%)";
const CHART_SLATE = "hsl(215,15%,60%)";
const CHART_GOLD = "hsl(40,48%,56%)";
const CHART_RED = "hsl(0,84%,60%)";
const CHART_GREEN = "hsl(142,71%,45%)";

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
    backgroundColor: "hsl(222,14%,12%)",
    border: `1px solid ${CHART_BG}`,
    borderRadius: "10px",
    color: "hsl(210,40%,98%)",
    fontSize: 12,
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard icon={Coins} label="Gem. Credits/Project" value={String(stats.avgCredits)} color="hsl(194,28%,49%)" />
        <KpiCard icon={Euro} label="Totale Credit Kosten" value={fmtEuro(Math.round(stats.totalCreditCost))} valueColor="text-red-400" color={CHART_RED} />
        <KpiCard icon={BarChart3} label="Totaal Credits" value={String(stats.totalCredits)} />
        <KpiCard icon={TrendingDown} label="Profit na Credits" value={fmtEuro(Math.round(stats.profitAfterCredits))} valueColor="text-emerald-400" color={CHART_GREEN} />
      </div>

      {/* Credits per client chart */}
      {perClientData.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Credits per klant</h3>
          <ResponsiveContainer width="100%" height={Math.max(200, perClientData.length * 40)}>
            <BarChart data={perClientData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_BG} horizontal={false} />
              <XAxis type="number" stroke={CHART_SLATE} fontSize={11} />
              <YAxis type="category" dataKey="name" stroke={CHART_SLATE} fontSize={11} width={100} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="credits" fill={CHART_GOLD} name="Credits" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Credits cost vs revenue */}
      {perClientData.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Credit kosten vs Omzet</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={perClientData}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_BG} />
              <XAxis dataKey="name" stroke={CHART_SLATE} fontSize={10} interval={0} angle={-45} textAnchor="end" height={60} />
              <YAxis stroke={CHART_SLATE} fontSize={11} tickFormatter={(v) => `€${v}`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [`€${value}`, name]} />
              <Legend />
              <Bar dataKey="revenue" fill={CHART_GREEN} name="Omzet" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cost" fill={CHART_RED} name="Credit kosten" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Client breakdown table */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-card-foreground mb-4">Klant overzicht</h3>
        {perClientData.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-6">Geen klanten met credits</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Klant</TableHead>
                <TableHead className="text-muted-foreground text-right">Credits</TableHead>
                <TableHead className="text-muted-foreground text-right">Kosten</TableHead>
                <TableHead className="text-muted-foreground text-right">Omzet</TableHead>
                <TableHead className="text-muted-foreground text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perClientData.map((c) => (
                <TableRow key={c.name} className="border-border">
                  <TableCell className="font-medium text-card-foreground">{c.name}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{c.credits}</TableCell>
                  <TableCell className="text-right text-red-400 font-medium">-€{c.cost}</TableCell>
                  <TableCell className="text-right text-card-foreground font-medium">€{c.revenue}</TableCell>
                  <TableCell className={`text-right font-semibold ${c.profit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
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
