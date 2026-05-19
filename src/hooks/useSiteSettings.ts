import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettings = {
  home_enabled: boolean;
  about_enabled: boolean;
};

const DEFAULTS: SiteSettings = {
  home_enabled: false,
  about_enabled: false,
};

const KEYS: (keyof SiteSettings)[] = ["home_enabled", "about_enabled"];

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", KEYS);
    if (data) {
      const next = { ...DEFAULTS };
      for (const row of data) {
        if ((KEYS as string[]).includes(row.key)) {
          (next as any)[row.key] = row.value === true || row.value === "true";
        }
      }
      setSettings(next);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
    const channel = supabase
      .channel("site_settings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => fetchSettings()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateSetting = async (key: keyof SiteSettings, value: boolean) => {
    setSettings((s) => ({ ...s, [key]: value }));
    await supabase
      .from("site_settings")
      .upsert({ key, value: value as any, updated_at: new Date().toISOString() });
  };

  return { settings, loading, updateSetting };
}
