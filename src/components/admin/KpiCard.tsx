import { LucideIcon } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  sparkData?: number[];
  color?: string;
  valueColor?: string;
  highlight?: boolean;
}

export default function KpiCard({ icon: Icon, label, value, trend, trendUp, sparkData, color = "hsl(var(--admin-accent))", valueColor, highlight }: KpiCardProps) {
  const chartData = sparkData?.map((v, i) => ({ i, v })) ?? [];

  return (
    <div className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${
      highlight 
        ? "bg-card/90 backdrop-blur-sm border border-border/60 shadow-md dark:shadow-lg dark:shadow-black/30 ring-1 ring-foreground/[0.03]" 
        : "bg-card/70 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20"
    }`}>
      {/* Faint sparkline watermark */}
      {chartData.length > 1 && (
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`sparkbg-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="none" fill={`url(#sparkbg-${label})`} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Subtle gradient border glow for highlight cards */}
      {highlight && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${color}08, transparent 40%, transparent 60%, ${color}05)` }}
        />
      )}

      <div className="relative z-10 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-muted/60 dark:bg-muted/40 flex items-center justify-center transition-colors">
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{label}</span>
          </div>
          {trend && (
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              trendUp 
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" 
                : "text-red-600 dark:text-red-400 bg-red-500/10"
            }`}>
              {trendUp ? "↑" : "↓"} {trend}
            </span>
          )}
        </div>

        <div className={`text-2xl sm:text-[28px] font-bold tracking-tight tabular-nums leading-none ${valueColor || "text-foreground"}`}>
          {value}
        </div>

        {chartData.length > 1 && (
          <div className="mt-3 -mx-1">
            <ResponsiveContainer width="100%" height={36}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={color}
                  strokeWidth={1.5}
                  fill={`url(#spark-${label})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
