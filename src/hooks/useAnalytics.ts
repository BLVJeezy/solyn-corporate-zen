import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo, useEffect, useState } from "react";
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

export interface AnalyticsEvent {
  id: string;
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
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["site-analytics"] });

  return { ...query, refresh };
}

export function useRealtimeAnalytics() {
  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    // Fetch last 5 minutes of events
    const fetchRecent = async () => {
      const fiveMinAgo = subHours(new Date(), 0.083).toISOString(); // ~5 min
      const { data } = await supabase
        .from("site_analytics")
        .select("*")
        .gte("created_at", fiveMinAgo)
        .order("created_at", { ascending: false })
        .limit(50);
      if (data) setRecentEvents(data as unknown as AnalyticsEvent[]);
    };

    fetchRecent();

    const channel = supabase
      .channel("realtime-analytics")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "site_analytics" },
        (payload) => {
          const newEvent = payload.new as AnalyticsEvent;
          setRecentEvents((prev) => [newEvent, ...prev].slice(0, 50));
        }
      )
      .subscribe();

    const interval = setInterval(fetchRecent, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  return recentEvents;
}
