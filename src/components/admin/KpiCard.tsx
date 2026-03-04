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
}

export default function KpiCard({ icon: Icon, label, value, trend, trendUp, sparkData, color = "hsl(40,48%,56%)", valueColor }: KpiCardProps) {
  const chartData = sparkData?.map((v, i) => ({ i, v })) ?? [];

  return (
    <div className="group relative bg-card rounded-xl border border-border p-4 sm:p-5 overflow-hidden hover:border-muted-foreground/30 transition-all duration-300">
      {/* Subtle glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-muted/50 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">{label}</span>
          </div>
          {trend && (
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              trendUp 
                ? "text-emerald-400 bg-emerald-400/10" 
                : "text-red-400 bg-red-400/10"
            }`}>
              {trendUp ? "↑" : "↓"} {trend}
            </span>
          )}
        </div>

        <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${valueColor || "text-card-foreground"}`}>
          {value}
        </div>

        {chartData.length > 1 && (
          <div className="mt-3 -mx-1">
            <ResponsiveContainer width="100%" height={40}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
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
