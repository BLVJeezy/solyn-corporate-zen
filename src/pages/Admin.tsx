import { useState } from "react";
import { ArrowLeft, Users, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const trafficData = [
  { month: "Jan", visitors: 1200 },
  { month: "Feb", visitors: 1800 },
  { month: "Mar", visitors: 2400 },
  { month: "Apr", visitors: 2100 },
  { month: "May", visitors: 3200 },
  { month: "Jun", visitors: 2800 },
  { month: "Jul", visitors: 3600 },
];

const leads = [
  { id: 1, name: "Jan de Vries", company: "TechBouw B.V.", budget: "€1.200", status: "Nieuw", date: "2026-02-25" },
  { id: 2, name: "Sophie Claes", company: "Infra Solutions", budget: "€1.800", status: "In behandeling", date: "2026-02-24" },
  { id: 3, name: "Marc Peeters", company: "BuildCo NV", budget: "€950", status: "Nieuw", date: "2026-02-23" },
  { id: 4, name: "Lien Wouters", company: "Global Connect", budget: "€750", status: "Gewonnen", date: "2026-02-22" },
  { id: 5, name: "Thomas Maes", company: "StructuraTech", budget: "€2.000", status: "In behandeling", date: "2026-02-20" },
];

const statusColors: Record<string, string> = {
  Nieuw: "bg-steel/20 text-steel",
  "In behandeling": "bg-primary/20 text-primary",
  Gewonnen: "bg-green-500/20 text-green-500",
};

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <div className="bg-charcoal text-charcoal-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="text-charcoal-foreground/60 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Solyn Admin</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Bezoekers", value: "3,642", icon: Users, change: "+12%" },
            { label: "Leads", value: "24", icon: TrendingUp, change: "+8%" },
            { label: "Gem. Budget", value: "€1.340", icon: DollarSign, change: "+5%" },
            { label: "Conversie", value: "6.2%", icon: BarChart3, change: "+2%" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-green-500 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Bezoekers Overzicht</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,14%,20%)" />
              <XAxis dataKey="month" stroke="hsl(215,15%,60%)" fontSize={12} />
              <YAxis stroke="hsl(215,15%,60%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(222,14%,15%)",
                  border: "1px solid hsl(222,14%,20%)",
                  borderRadius: "8px",
                  color: "hsl(210,40%,98%)",
                }}
              />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="hsl(40,48%,56%)"
                strokeWidth={2}
                dot={{ fill: "hsl(40,48%,56%)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leads table */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Lead Manager</h2>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Naam</TableHead>
                <TableHead className="text-muted-foreground">Bedrijf</TableHead>
                <TableHead className="text-muted-foreground">Budget</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Datum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="border-border">
                  <TableCell className="font-medium text-card-foreground">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.company}</TableCell>
                  <TableCell className="text-primary font-semibold">{lead.budget}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
