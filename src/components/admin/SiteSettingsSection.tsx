import { Switch } from "@/components/ui/switch";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Eye, EyeOff, Home, Info } from "lucide-react";

const SiteSettingsSection = () => {
  const { settings, loading, updateSetting } = useSiteSettings();

  const rows = [
    {
      key: "home_enabled" as const,
      icon: Home,
      title: "Home page",
      description:
        "When off, the Portfolio page becomes the homepage and the About link is hidden too.",
    },
    {
      key: "about_enabled" as const,
      icon: Info,
      title: "About page",
      description:
        "Show the About page and its link in the navigation. Requires Home to be enabled.",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Site visibility</h2>
        <p className="text-sm text-muted-foreground">
          Toggle public pages on or off instantly — no redeploy needed.
        </p>
      </div>

      <div className="rounded-xl border bg-card divide-y">
        {rows.map(({ key, icon: Icon, title, description }) => {
          const isAbout = key === "about_enabled";
          const disabled = isAbout && !settings.home_enabled;
          const checked = settings[key] && !disabled;
          return (
            <div key={key} className="flex items-start gap-4 p-5">
              <div className="mt-0.5 rounded-lg bg-muted p-2">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{title}</h3>
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                      checked
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {checked ? (
                      <>
                        <Eye className="w-3 h-3" /> Visible
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" /> Hidden
                      </>
                    )}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              </div>
              <Switch
                checked={checked}
                disabled={loading || disabled}
                onCheckedChange={(v) => updateSetting(key, v)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiteSettingsSection;
