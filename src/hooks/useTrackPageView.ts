import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

// ─── Persistent visitor ID (survives sessions) ───
function getVisitorId(): string {
  let id = localStorage.getItem("solyn_vid");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("solyn_vid", id);
  }
  return id;
}

// ─── Session ID (new per browser session/tab) ───
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

// ─── Country detection (cached per session) ───
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

// ─── Deduplication: prevent rapid duplicate page_views within 3s ───
let lastPageViewKey = "";
let lastPageViewTime = 0;

function isDuplicatePageView(path: string): boolean {
  const now = Date.now();
  const key = `pv:${path}`;
  if (key === lastPageViewKey && now - lastPageViewTime < 3000) {
    return true;
  }
  lastPageViewKey = key;
  lastPageViewTime = now;
  return false;
}

// ─── Core event tracker ───
async function trackEvent(eventType: string, pagePath?: string, extra?: Record<string, string>) {
  const path = pagePath || window.location.pathname;
  // Never track admin or login pages
  if (path.startsWith("/admin") || path.startsWith("/login")) return;

  // Deduplicate page_views
  if (eventType === "page_view" && isDuplicatePageView(path)) return;

  const country = await getCountry();
  
  const payload = {
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    page_path: path,
    referrer: document.referrer || null,
    device_type: getDeviceType(),
    source_type: getSourceType(),
    event_type: eventType,
    country,
  };

  const { error } = await supabase.from("site_analytics").insert(payload);
  
  // Offline fallback: queue in localStorage if insert fails
  if (error) {
    try {
      const queue = JSON.parse(localStorage.getItem("solyn_event_queue") || "[]");
      queue.push({ ...payload, queued_at: new Date().toISOString() });
      localStorage.setItem("solyn_event_queue", JSON.stringify(queue.slice(-100))); // keep last 100
    } catch {}
  }
}

// ─── Flush offline queue when back online ───
async function flushOfflineQueue() {
  try {
    const raw = localStorage.getItem("solyn_event_queue");
    if (!raw) return;
    const queue = JSON.parse(raw);
    if (!queue.length) return;
    
    const { error } = await supabase.from("site_analytics").insert(queue.map((e: any) => {
      const { queued_at, ...rest } = e;
      return rest;
    }));
    
    if (!error) {
      localStorage.removeItem("solyn_event_queue");
    }
  } catch {}
}

// ─── Session start tracking ───
let sessionStarted = false;

function ensureSessionStart() {
  if (sessionStarted) return;
  const key = `solyn_session_started_${getSessionId()}`;
  if (sessionStorage.getItem(key)) {
    sessionStarted = true;
    return;
  }
  sessionStarted = true;
  sessionStorage.setItem(key, "1");
  trackEvent("session_start");
}

// ─── Session end tracking (best effort via beforeunload) ───
function setupSessionEnd() {
  const handler = () => {
    const path = window.location.pathname;
    if (path.startsWith("/admin") || path.startsWith("/login")) return;
    
    // Use sendBeacon for reliability on page unload
    const payload = {
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      page_path: path,
      referrer: document.referrer || null,
      device_type: getDeviceType(),
      source_type: getSourceType(),
      event_type: "session_end",
      country: countryCache,
    };
    
    const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/site_analytics`;
    const headers = {
      "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      "Prefer": "return=minimal",
    };
    
    try {
      navigator.sendBeacon(url, new Blob([JSON.stringify(payload)], { type: "application/json" }));
    } catch {}
  };
  
  window.addEventListener("beforeunload", handler, { once: true });
  return () => window.removeEventListener("beforeunload", handler);
}

// ─── Page View Hook (SPA-aware) ───
export function useTrackPageView(pagePath?: string) {
  const cleanupRef = useRef<(() => void) | null>(null);
  
  useEffect(() => {
    // Flush offline queue on mount
    flushOfflineQueue();
    
    // Track session start
    ensureSessionStart();
    
    // Setup session end
    cleanupRef.current = setupSessionEnd();
    
    return () => {
      cleanupRef.current?.();
    };
  }, []);
  
  useEffect(() => {
    const path = pagePath || window.location.pathname;
    if (path.startsWith("/admin") || path.startsWith("/login")) return;
    trackEvent("page_view", path);
  }, [pagePath]);
}

// ─── CTA / Button click tracking ───
export function trackClick(buttonName: string, pagePath?: string) {
  const path = pagePath || window.location.pathname;
  trackEvent("click", path);
}

// ─── Form submit tracking ───
export function trackFormSubmit(formName: string, pagePath?: string) {
  const path = pagePath || window.location.pathname;
  trackEvent("form_submit", path);
}

/** Call this when a user starts the chatbot */
export async function trackChatbotStarted() {
  await trackEvent("chatbot_started");
}

/** Call this when a lead form is submitted */
export async function trackLeadCaptured() {
  await trackEvent("lead_captured");
}

/** Call this when a reservation is created */
export async function trackReservationCreated() {
  await trackEvent("reservation_created");
}

/** Send a test event (for debug panel) */
export async function sendTestEvent() {
  const country = await getCountry();
  return supabase.from("site_analytics").insert({
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    page_path: "/debug-test",
    referrer: null,
    device_type: getDeviceType(),
    source_type: "direct",
    event_type: "test_event",
    country,
  });
}
