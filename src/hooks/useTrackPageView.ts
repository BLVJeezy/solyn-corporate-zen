import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

function getSessionId(): string {
  let id = sessionStorage.getItem("solyn_sid");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("solyn_sid", id);
  }
  return id;
}

function getDeviceType(): string {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getSourceType(): string {
  const ref = document.referrer;
  if (!ref) return "direct";
  try {
    const refHost = new URL(ref).hostname.toLowerCase();
    if (refHost === window.location.hostname) return "direct";
    if (refHost.includes("google")) return "google";
    if (refHost.includes("linkedin")) return "linkedin";
    if (refHost.includes("twitter") || refHost.includes("x.com") || refHost.includes("t.co")) return "twitter";
    if (refHost.includes("reddit")) return "reddit";
    if (refHost.includes("facebook") || refHost.includes("fb.com")) return "facebook";
    if (refHost.includes("instagram")) return "instagram";
    return "referral";
  } catch {
    return "direct";
  }
}

let countryCache: string | null = null;

async function getCountry(): Promise<string | null> {
  if (countryCache) return countryCache;
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const data = await res.json();
    countryCache = data.country_name || data.country || null;
    return countryCache;
  } catch {
    return null;
  }
}

export function useTrackPageView(pagePath?: string) {
  useEffect(() => {
    const path = pagePath || window.location.pathname;
    if (path.startsWith("/admin") || path.startsWith("/login")) return;

    (async () => {
      const country = await getCountry();
      await supabase.from("site_analytics").insert({
        session_id: getSessionId(),
        page_path: path,
        referrer: document.referrer || null,
        device_type: getDeviceType(),
        source_type: getSourceType(),
        event_type: "page_view",
        country,
      });
    })();
  }, [pagePath]);
}

/** Call this when a user starts the chatbot */
export async function trackChatbotStarted() {
  const country = await getCountry();
  await supabase.from("site_analytics").insert({
    session_id: sessionStorage.getItem("solyn_sid") || crypto.randomUUID(),
    page_path: window.location.pathname,
    device_type: getDeviceType(),
    source_type: getSourceType(),
    event_type: "chatbot_started",
    country,
  });
}

/** Call this when a lead form is submitted */
export async function trackLeadCaptured() {
  const country = await getCountry();
  await supabase.from("site_analytics").insert({
    session_id: sessionStorage.getItem("solyn_sid") || crypto.randomUUID(),
    page_path: window.location.pathname,
    device_type: getDeviceType(),
    source_type: getSourceType(),
    event_type: "lead_captured",
    country,
  });
}
