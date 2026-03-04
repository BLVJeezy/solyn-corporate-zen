import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo, useEffect, useState, useCallback, useRef } from "react";
import { subHours, subDays } from "date-fns";

export type DateRange = "24h" | "7d" | "30d" | "90d";

function getRangeStart(range: DateRange): Date {
  const now = new Date();
  switch (range) {
    case "24h": return subHours(now, 24);
    case "7d": return subDays(now, 7);
    case "30d": return subDays(now, 30);
    case "90d": return subDays(now, 90);
  }
}

function getPreviousRangeStart(range: DateRange): { start: Date; end: Date } {
  const now = new Date();
  switch (range) {
    case "24h": return { start: subHours(now, 48), end: subHours(now, 24) };
    case "7d": return { start: subDays(now, 14), end: subDays(now, 7) };
    case "30d": return { start: subDays(now, 60), end: subDays(now, 30) };
    case "90d": return { start: subDays(now, 180), end: subDays(now, 90) };
  }
}

export interface AnalyticsEvent {
  id: string;
  visitor_id: string | null;
  session_id: string;
  page_path: string;
  referrer: string | null;
  device_type: string | null;
  source_type: string | null;
  event_type: string | null;
  country: string | null;
  created_at: string;
}

export function useSiteAnalytics(range: DateRange) {
  const queryClient = useQueryClient();
  const rangeStart = useMemo(() => getRangeStart(range).toISOString(), [range]);

  const query = useQuery({
    queryKey: ["site-analytics", range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_analytics")
        .select("*")
        .gte("created_at", rangeStart)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as unknown as AnalyticsEvent[];
    },
    refetchInterval: 30000, // auto-refresh every 30s
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["site-analytics"] });

  return { ...query, refresh };
}

export function usePreviousPeriodAnalytics(range: DateRange) {
  const { start, end } = useMemo(() => {
    const r = getPreviousRangeStart(range);
    return { start: r.start.toISOString(), end: r.end.toISOString() };
  }, [range]);

  return useQuery({
    queryKey: ["site-analytics-prev", range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_analytics")
        .select("*")
        .gte("created_at", start)
        .lt("created_at", end)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as unknown as AnalyticsEvent[];
    },
  });
}

export function useRealtimeAnalytics() {
  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchRecent = useCallback(async () => {
    const fiveMinAgo = subHours(new Date(), 0.083).toISOString();
    const { data } = await supabase
      .from("site_analytics")
      .select("*")
      .gte("created_at", fiveMinAgo)
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) {
      setRecentEvents(data as unknown as AnalyticsEvent[]);
      setLastUpdated(new Date());
    }
  }, []);

  useEffect(() => {
    fetchRecent();

    const channel = supabase
      .channel("realtime-analytics")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "site_analytics" },
        (payload) => {
          const newEvent = payload.new as AnalyticsEvent;
          setRecentEvents((prev) => [newEvent, ...prev].slice(0, 50));
          setLastUpdated(new Date());
        }
      )
      .subscribe();

    const interval = setInterval(fetchRecent, 5000); // every 5s

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [fetchRecent]);

  return { recentEvents, lastUpdated };
}

// ─── Data quality check ───
export function useDataQuality() {
  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  }, []);

  return useQuery({
    queryKey: ["data-quality"],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from("site_analytics")
        .select("*", { count: "exact", head: false })
        .gte("created_at", todayStart)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) return { status: "offline" as const, eventsToday: 0, lastEvent: null };

      return {
        status: "ok" as const,
        eventsToday: count || 0,
        lastEvent: data?.[0]?.created_at || null,
      };
    },
    refetchInterval: 10000,
  });
}
