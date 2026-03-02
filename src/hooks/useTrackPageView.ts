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
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

function getSourceType(): string {
  const ref = document.referrer;
  if (!ref) return "direct";
  try {
    const refHost = new URL(ref).hostname;
    if (refHost === window.location.hostname) return "direct";
    return "referral";
  } catch {
    return "direct";
  }
}

export function useTrackPageView(pagePath?: string) {
  useEffect(() => {
    const path = pagePath || window.location.pathname;
    // Don't track admin pages
    if (path.startsWith("/admin") || path.startsWith("/login")) return;

    supabase.from("site_analytics").insert({
      session_id: getSessionId(),
      page_path: path,
      referrer: document.referrer || null,
      device_type: getDeviceType(),
      source_type: getSourceType(),
      event_type: "page_view",
    }).then(() => {});
  }, [pagePath]);
}

/** Call this when a user starts the chatbot */
export async function trackChatbotStarted() {
  await supabase.from("site_analytics").insert({
    session_id: sessionStorage.getItem("solyn_sid") || crypto.randomUUID(),
    page_path: window.location.pathname,
    device_type: window.innerWidth < 768 ? "mobile" : "desktop",
    source_type: "direct",
    event_type: "chatbot_started",
  });
}

/** Call this when a lead form is submitted */
export async function trackLeadCaptured() {
  await supabase.from("site_analytics").insert({
    session_id: sessionStorage.getItem("solyn_sid") || crypto.randomUUID(),
    page_path: window.location.pathname,
    device_type: window.innerWidth < 768 ? "mobile" : "desktop",
    source_type: "direct",
    event_type: "lead_captured",
  });
}
