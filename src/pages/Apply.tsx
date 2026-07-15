import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FunnelState, INITIAL_STATE, isQualified } from "@/lib/funnel/types";
import { loadFunnelState, saveFunnelState, clearFunnelState } from "@/lib/funnel/storage";
import BookingCalendar from "@/components/funnel/BookingCalendar";
import StepConfirmation from "@/components/funnel/StepConfirmation";
import StepDisqualified from "@/components/funnel/StepDisqualified";
import { Check, ChevronRight, ChevronLeft, Search, Globe, TrendingUp, ArrowRight, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import solynLogo from "@/assets/solyn-logo.png";

type Phase = "form" | "disqualified" | "booking" | "confirmed";
type ServiceType = "seo" | "website" | "both" | "";
type BudgetOption = "300-600" | "600-1500" | "1500+" | "";
type TimelineOption = "asap" | "1_month" | "3_months" | "";

interface SimpleState {
  service: ServiceType;
  name: string;
  business: string;
  email: string;
  phone: string;
  city: string;
  website_url: string;
  has_website: boolean | null;
  budget: BudgetOption;
  timeline: TimelineOption;
  goals: string;
}

const INIT: SimpleState = {
  service: "",
  name: "",
  business: "",
  email: "",
  phone: "",
  city: "",
  website_url: "",
  has_website: null,
  budget: "",
  timeline: "",
  goals: "",
};

const SERVICES = [
  {
    key: "seo" as ServiceType,
    icon: Search,
    title: "Lokale SEO",
    desc: "Hoger ranken in Google voor zoekopdrachten in mijn gemeente of regio.",
    badge: "Populairste keuze",
  },
  {
    key: "website" as ServiceType,
    icon: Globe,
    title: "Website laten maken",
    desc: "Een professionele, snelle website die bezoekers omzet in klanten.",
    badge: "",
  },
  {
    key: "both" as ServiceType,
    icon: TrendingUp,
    title: "Website + SEO",
    desc: "Een nieuwe website én direct hoger ranken in Google — het complete pakket.",
    badge: "Beste resultaat",
  },
];


const TIMELINES: { key: TimelineOption; label: string; sub: string }[] = [
  { key: "asap", label: "Zo snel mogelijk", sub: "Ik wil snel starten" },
  { key: "1_month", label: "Binnen 1 maand", sub: "Ik plan mijn start" },
  { key: "3_months", label: "Binnen 3 maanden", sub: "Ik oriënteer me nog" },
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-black rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(step / total) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </div>
  );
}

function ChoiceBtn({
  selected, onClick, children, badge,
}: { selected: boolean; onClick: () => void; children: React.ReactNode; badge?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border p-4 transition-all duration-150 relative ${
        selected
          ? "border-black bg-black text-white shadow-sm"
          : "border-gray-200 bg-white text-black hover:border-gray-400"
      }`}
    >
      {badge && (
        <span className={`absolute top-3 right-3 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${selected ? "bg-white/20 text-white" : "bg-black text-white"}`}>
          {badge}
        </span>
      )}
      {children}
    </button>
  );
}

function GlassInput({ label, type = "text", value, onChange, placeholder, autoComplete }: {
  label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors"
      />
    </div>
  );
}

const Apply = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<SimpleState>(INIT);
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<Phase>("form");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<{ scheduled_at: string; timezone: string } | null>(null);

  const update = (patch: Partial<SimpleState>) => setState((s) => ({ ...s, ...patch }));

  const TOTAL_STEPS = 4;

  const canNext = () => {
    if (step === 1) return state.service !== "";
    if (step === 2) return (
      state.name.trim().length >= 2 &&
      state.business.trim().length >= 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email) &&
      state.city.trim().length >= 2
    );
    if (step === 3) return state.has_website !== null && (state.has_website ? state.website_url.trim().length > 3 : true);
    if (step === 4) return state.timeline !== "";
    return false;
  };

  const submitLead = async () => {
    setSubmitting(true);
    // Map simplified state to FunnelState shape for submission
    const funnelPayload: Partial<FunnelState> = {
      full_name: state.name,
      business_name: state.business,
      email: state.email,
      phone: state.phone,
      business_description: `Stad/gemeente: ${state.city}. Service: ${state.service}. Doelen: ${state.goals}`,
      has_website: state.has_website ?? false,
      website_url: state.website_url,
      seo_important: state.service === "seo" || state.service === "both",
      launch_timeline: state.timeline === "asap" ? "asap" : state.timeline === "1_month" ? "1_month" : "3_months",
      investment_ready: "yes",
    };

    try {
      const { data, error } = await supabase.functions.invoke("submit-qualified-lead", {
        body: {
          funnel: { ...INITIAL_STATE, ...funnelPayload },
          qualification_status: "qualified",
          disqualification_reason: null,
          city: state.city,
          wants_website: state.service === "website" || state.service === "both",
        },
      });
      if (error) throw error;
      if (!data?.lead_id) throw new Error("Submission failed");
      setLeadId(data.lead_id);
      setPhase("booking");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Er is iets misgegaan. Probeer opnieuw.");
    } finally {
      setSubmitting(false);
    }
  };

  if (phase === "booking" && leadId) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <div className="flex-1 flex items-start justify-center px-4 py-12">
          <div className="w-full max-w-3xl">
            <BookingCalendar
              leadId={leadId}
              onBack={() => setPhase("form")}
              onBooked={(b) => { setBooking(b); setPhase("confirmed"); clearFunnelState(); }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (phase === "confirmed" && booking) {
    return (
      <StepConfirmation
        scheduledAt={booking.scheduled_at}
        timezone={booking.timezone}
        email={state.email}
        name={state.name}
      />
    );
  }

  if (phase === "disqualified") {
    return <StepDisqualified />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src={solynLogo} alt="Solyn" className="h-7 w-auto" />
        </button>
        <button onClick={() => navigate("/")} className="text-gray-400 hover:text-black transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
              <span>Stap {step} van {TOTAL_STEPS}</span>
              <span>{Math.round((step / TOTAL_STEPS) * 100)}% compleet</span>
            </div>
            <ProgressBar step={step} total={TOTAL_STEPS} />
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1 — Service */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="mb-8">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Stap 1</p>
                  <h1 className="text-2xl font-bold text-black">Wat heeft u nodig?</h1>
                  <p className="text-gray-500 text-sm mt-2">Kies de dienst die het beste past bij uw situatie.</p>
                </div>
                <div className="space-y-3">
                  {SERVICES.map((s) => (
                    <ChoiceBtn
                      key={s.key}
                      selected={state.service === s.key}
                      onClick={() => update({ service: s.key })}
                      badge={s.badge}
                    >
                      <div className="flex items-start gap-3 pr-16">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${state.service === s.key ? "bg-white/15" : "bg-gray-100"}`}>
                          <s.icon className={`w-4 h-4 ${state.service === s.key ? "text-white" : "text-black"}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{s.title}</div>
                          <div className={`text-xs mt-0.5 ${state.service === s.key ? "text-white/60" : "text-gray-400"}`}>{s.desc}</div>
                        </div>
                      </div>
                    </ChoiceBtn>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 — Contact info */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="mb-8">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Stap 2</p>
                  <h1 className="text-2xl font-bold text-black">Wie zijn wij aan het helpen?</h1>
                  <p className="text-gray-500 text-sm mt-2">Uw gegevens worden enkel gebruikt om uw afspraak te bevestigen.</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <GlassInput label="Uw naam" value={state.name} onChange={(v) => update({ name: v })} placeholder="Jan Janssen" autoComplete="name" />
                    <GlassInput label="Bedrijfsnaam" value={state.business} onChange={(v) => update({ business: v })} placeholder="Uw bedrijf" autoComplete="organization" />
                  </div>
                  <GlassInput label="E-mail" type="email" value={state.email} onChange={(v) => update({ email: v })} placeholder="jan@bedrijf.be" autoComplete="email" />
                  <div className="grid grid-cols-2 gap-4">
                    <GlassInput label="Telefoon (optioneel)" type="tel" value={state.phone} onChange={(v) => update({ phone: v })} placeholder="+32 ..." autoComplete="tel" />
                    <GlassInput label="Uw stad / gemeente" value={state.city} onChange={(v) => update({ city: v })} placeholder="bv. Bilzen, Tongeren..." />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Website situation */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="mb-8">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Stap 3</p>
                  <h1 className="text-2xl font-bold text-black">Heeft u al een website?</h1>
                  <p className="text-gray-500 text-sm mt-2">Dit helpt ons begrijpen waar we starten.</p>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <ChoiceBtn selected={state.has_website === true} onClick={() => update({ has_website: true })}>
                      <div className="text-center py-2">
                        <div className="text-2xl mb-1">✅</div>
                        <div className="font-semibold text-sm">Ja, ik heb een website</div>
                      </div>
                    </ChoiceBtn>
                    <ChoiceBtn selected={state.has_website === false} onClick={() => update({ has_website: false })}>
                      <div className="text-center py-2">
                        <div className="text-2xl mb-1">❌</div>
                        <div className="font-semibold text-sm">Nee, nog geen website</div>
                      </div>
                    </ChoiceBtn>
                  </div>

                  {state.has_website === true && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                      <GlassInput label="Website URL" type="url" value={state.website_url} onChange={(v) => update({ website_url: v })} placeholder="https://uwbedrijf.be" />
                    </motion.div>
                  )}

                  <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Wat zijn uw voornaamste doelen? (optioneel)</label>
                    <textarea
                      value={state.goals}
                      onChange={(e) => update({ goals: e.target.value })}
                      placeholder="bv. Meer aanvragen via Google, hoger ranken in Bilzen, nieuwe website nodig..."
                      rows={3}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4 — Timeline */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="mb-8">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Stap 4</p>
                  <h1 className="text-2xl font-bold text-black">Planning</h1>
                  <p className="text-gray-500 text-sm mt-2">Wij passen ons aan uw situatie aan. Geen verplichtingen.</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Wanneer wilt u starten?</p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {TIMELINES.map((t) => (
                        <ChoiceBtn key={t.key} selected={state.timeline === t.key} onClick={() => update({ timeline: t.key })}>
                          <div className="text-center">
                            <div className="font-semibold text-xs">{t.label}</div>
                            <div className={`text-[10px] mt-0.5 ${state.timeline === t.key ? "text-white/60" : "text-gray-400"}`}>{t.sub}</div>
                          </div>
                        </ChoiceBtn>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 gap-3">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep((s) => s - 1) : navigate("/")}
              className="rounded-full border-gray-200 text-gray-500 hover:text-black gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              {step === 1 ? "Terug" : "Vorige"}
            </Button>

            {step < TOTAL_STEPS ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="rounded-full bg-black text-white hover:bg-black/90 gap-1 px-7 disabled:opacity-30"
              >
                Volgende
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={submitLead}
                disabled={!canNext() || submitting}
                className="rounded-full bg-black text-white hover:bg-black/90 gap-1 px-7 disabled:opacity-30"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verwerken...
                  </>
                ) : (
                  <>
                    Afspraak plannen
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Trust footer */}
          <div className="mt-8 flex items-center justify-center gap-5 text-xs text-gray-400">
            {["Gratis gesprek", "Geen verplichtingen", "Antwoord binnen 24u"].map((t) => (
              <div key={t} className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
