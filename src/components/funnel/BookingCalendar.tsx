import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Globe, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface AvailabilityConfig {
  timezone: string;
  slot_minutes: number;
  weekday_hours: Record<string, [string, string]>;
  max_days_ahead: number;
  min_hours_notice: number;
}

interface BookingCalendarProps {
  leadId: string;
  onBooked: (booking: { scheduled_at: string; timezone: string }) => void;
  onBack: () => void;
}

const DEFAULT_CONFIG: AvailabilityConfig = {
  timezone: "Europe/Brussels",
  slot_minutes: 30,
  weekday_hours: { "1": ["09:00", "17:00"], "2": ["09:00", "17:00"], "3": ["09:00", "17:00"], "4": ["09:00", "17:00"], "5": ["09:00", "17:00"] },
  max_days_ahead: 30,
  min_hours_notice: 12,
};

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const BookingCalendar = ({ leadId, onBooked, onBack }: BookingCalendarProps) => {
  const { t, lang } = useLanguage();
  const locale = lang === "NL" ? "nl-BE" : lang === "FR" ? "fr-BE" : "en-GB";
  const [config, setConfig] = useState<AvailabilityConfig>(DEFAULT_CONFIG);
  const [monthCursor, setMonthCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visitorTz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  // Load availability config
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "booking_availability").maybeSingle();
      if (data?.value) setConfig({ ...DEFAULT_CONFIG, ...(data.value as object) } as AvailabilityConfig);
    })();
  }, []);

  // Load existing bookings for current month
  useEffect(() => {
    setLoading(true);
    const start = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1);
    const end = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 2, 0);
    supabase
      .functions.invoke("booking-availability", {
        body: { start: start.toISOString(), end: end.toISOString() },
      })
      .then(({ data }) => {
        const slots = (data?.booked_slots ?? []) as string[];
        setBookedSlots(new Set(slots));
      })
      .finally(() => setLoading(false));
  }, [monthCursor]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + config.max_days_ahead);
    return d;
  }, [today, config.max_days_ahead]);

  const days = useMemo(() => {
    const first = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1);
    const startWeekday = (first.getDay() + 6) % 7; // Mon=0
    const daysInMonth = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(monthCursor.getFullYear(), monthCursor.getMonth(), d));
    return cells;
  }, [monthCursor]);

  const isDateAvailable = (date: Date) => {
    if (date < today) return false;
    if (date > maxDate) return false;
    const wd = String(date.getDay() === 0 ? 7 : date.getDay());
    return !!config.weekday_hours[wd];
  };

  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    const wd = String(selectedDate.getDay() === 0 ? 7 : selectedDate.getDay());
    const hours = config.weekday_hours[wd];
    if (!hours) return [];
    const [startH, startM] = hours[0].split(":").map(Number);
    const [endH, endM] = hours[1].split(":").map(Number);
    const slots: { iso: string; label: string; disabled: boolean }[] = [];
    const cur = new Date(selectedDate);
    cur.setHours(startH, startM, 0, 0);
    const end = new Date(selectedDate);
    end.setHours(endH, endM, 0, 0);
    const noticeMs = config.min_hours_notice * 3600 * 1000;
    const earliest = Date.now() + noticeMs;
    while (cur < end) {
      const iso = cur.toISOString();
      const tooSoon = cur.getTime() < earliest;
      const booked = bookedSlots.has(iso);
      slots.push({
        iso,
        label: cur.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", hour12: false }),
        disabled: tooSoon || booked,
      });
      cur.setMinutes(cur.getMinutes() + config.slot_minutes);
    }
    return slots;
  }, [selectedDate, config, bookedSlots]);

  const confirmBooking = async () => {
    if (!selectedSlot) return;
    setSubmitting(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("create-booking", {
        body: { lead_id: leadId, scheduled_at: selectedSlot, timezone: visitorTz },
      });
      if (error) throw error;
      if (!data?.ok) throw new Error(data?.error ?? "Failed to create booking");
      onBooked({ scheduled_at: selectedSlot, timezone: visitorTz });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const monthLabel = monthCursor.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const canGoPrev = monthCursor > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoNext = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1) <= maxDate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-amber-300/80 font-medium mb-4">
        {t("funnel.bk.eyebrow")}
      </p>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] mb-3 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
        {t("funnel.bk.title")}
      </h1>
      <p className="text-white/55 text-base mb-2">{t("funnel.bk.sub")}</p>
      <p className="text-white/40 text-xs flex items-center gap-1.5 mb-8">
        <Globe className="w-3 h-3" /> {t("funnel.bk.tz")} <span className="text-white/60">{visitorTz}</span>
      </p>


      <div className="grid lg:grid-cols-[1fr,260px] gap-6">
        {/* Calendar */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => canGoPrev && setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))}
              disabled={!canGoPrev}
              className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-medium capitalize">{monthLabel}</h3>
            <button
              onClick={() => canGoNext && setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))}
              disabled={!canGoNext}
              className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="text-[10px] text-white/30 text-center font-medium">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              if (!d) return <div key={i} />;
              const avail = isDateAvailable(d);
              const isSelected = selectedDate && sameDay(selectedDate, d);
              const isToday = sameDay(d, today);
              return (
                <button
                  key={i}
                  disabled={!avail}
                  onClick={() => {
                    setSelectedDate(d);
                    setSelectedSlot(null);
                  }}
                  className={cn(
                    "aspect-square rounded-lg text-sm font-medium transition-all relative",
                    avail ? "text-white/85 hover:bg-white/10" : "text-white/15 cursor-not-allowed",
                    isSelected && "bg-gradient-to-br from-amber-300 to-amber-400 text-zinc-900 hover:bg-amber-300",
                    isToday && !isSelected && "ring-1 ring-white/20"
                  )}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slots */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
          <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {selectedDate
              ? selectedDate.toLocaleDateString(locale, { weekday: "short", month: "short", day: "numeric" })
              : t("funnel.bk.pickDate")}
          </h3>
          {selectedDate ? (
            <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {slotsForDate.length === 0 && <p className="text-xs text-white/40">{t("funnel.bk.noSlots")}</p>}
                {slotsForDate.map((s) => (
                  <motion.button
                    key={s.iso}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    disabled={s.disabled}
                    onClick={() => setSelectedSlot(s.iso)}
                    className={cn(
                      "w-full h-10 rounded-lg text-sm font-medium transition-all tabular-nums",
                      s.disabled && "text-white/20 cursor-not-allowed line-through",
                      !s.disabled && selectedSlot === s.iso
                        ? "bg-gradient-to-r from-amber-300 to-amber-400 text-zinc-900"
                        : !s.disabled && "bg-white/5 text-white/85 hover:bg-white/10"
                    )}
                  >
                    {s.label}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <p className="text-xs text-white/40">{t("funnel.bk.selectDate")}</p>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-400 mt-4">{error}</p>}

      <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-white/5">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white/60 hover:text-white hover:bg-white/5 rounded-full gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button
          onClick={confirmBooking}
          disabled={!selectedSlot || submitting}
          className="bg-white text-zinc-900 hover:bg-white/90 rounded-full px-6 font-medium disabled:opacity-40"
        >
          {submitting ? "Confirming…" : "Confirm booking"}
        </Button>
      </div>
    </motion.div>
  );
};

export default BookingCalendar;
