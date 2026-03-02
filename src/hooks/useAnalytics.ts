import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo } from "react";
import { subHours, subDays } from "date-fns";

export type DateRange = "24h" | "7d" | "30d";

function getRangeStart(range: DateRange): Date {
  const now = new Date();
  switch (range) {
    case "24h": return subHours(now, 24);
    case "7d": return subDays(now, 7);
    case "30d": return subDays(now, 30);
  }
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
      return data;
    },
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["site-analytics"] });

  return { ...query, refresh };
}
