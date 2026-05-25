import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FunnelState, INITIAL_STATE, isQualified } from "@/lib/funnel/types";
import { loadFunnelState, saveFunnelState, clearFunnelState } from "@/lib/funnel/storage";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import StepBasicInfo from "@/components/funnel/StepBasicInfo";
import StepWebsite from "@/components/funnel/StepWebsite";
import StepProject from "@/components/funnel/StepProject";
import StepBudget from "@/components/funnel/StepBudget";
import StepDisqualified from "@/components/funnel/StepDisqualified";
import StepConfirmation from "@/components/funnel/StepConfirmation";
import BookingCalendar from "@/components/funnel/BookingCalendar";

type Phase = "form" | "disqualified" | "booking" | "confirmed";

const TOTAL_STEPS = 5;

const Apply = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<FunnelState>(INITIAL_STATE);
  const [step, setStep] = useState(1); // 1..4 form steps
  const [phase, setPhase] = useState<Phase>("form");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<{ scheduled_at: string; timezone: string } | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    setState(loadFunnelState());
  }, []);

  // Persist on change
  useEffect(() => {
    saveFunnelState(state);
  }, [state]);

  const update = (patch: Partial<FunnelState>) => setState((s) => ({ ...s, ...patch }));

  const goNext = () => setStep((s) => Math.min(s + 1, 4));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const submitLead = async () => {
    setSubmitting(true);
    const q = isQualified(state);
    try {
      const { data, error } = await supabase.functions.invoke("submit-qualified-lead", {
        body: { funnel: state, qualification_status: q.qualified ? "qualified" : "disqualified", disqualification_reason: q.reason ?? null },
      });
      if (error) throw error;
      if (!data?.lead_id) throw new Error("Submission failed");
      setLeadId(data.lead_id);
      if (q.qualified) {
        setPhase("booking");
      } else {
        setPhase("disqualified");
        clearFunnelState();
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FunnelLayout
      step={phase === "booking" ? 5 : phase === "confirmed" ? TOTAL_STEPS : step}
      totalSteps={TOTAL_STEPS}
      hideProgress={phase === "disqualified" || phase === "confirmed"}
    >
      <AnimatePresence mode="wait">
        {phase === "form" && step === 1 && (
          <StepBasicInfo key="s1" state={state} update={update} onNext={goNext} />
        )}
        {phase === "form" && step === 2 && (
          <StepWebsite key="s2" state={state} update={update} onNext={goNext} onBack={goBack} />
        )}
        {phase === "form" && step === 3 && (
          <StepProject key="s3" state={state} update={update} onNext={goNext} onBack={goBack} />
        )}
        {phase === "form" && step === 4 && (
          <StepBudget
            key="s4"
            state={state}
            update={update}
            onNext={submitLead}
            onBack={goBack}
            loading={submitting}
          />
        )}
        {phase === "disqualified" && <StepDisqualified key="dq" />}
        {phase === "booking" && leadId && (
          <BookingCalendar
            key="bk"
            leadId={leadId}
            onBack={() => setPhase("form")}
            onBooked={(b) => {
              setBooking(b);
              setPhase("confirmed");
              clearFunnelState();
            }}
          />
        )}
        {phase === "confirmed" && booking && (
          <StepConfirmation
            key="cf"
            scheduledAt={booking.scheduled_at}
            timezone={booking.timezone}
            email={state.email}
            name={state.full_name}
          />
        )}
      </AnimatePresence>
    </FunnelLayout>
  );
};

export default Apply;
