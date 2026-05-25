import { FunnelState, BudgetRange, Timeline, InvestmentReady } from "@/lib/funnel/types";
import { budgetLabels, timelineLabels, investmentReadyLabels } from "@/lib/funnel/labels";
import StepShell from "./StepShell";
import { Field, ChoiceCard } from "./FieldKit";

interface Props {
  state: FunnelState;
  update: (patch: Partial<FunnelState>) => void;
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
}

const StepBudget = ({ state, update, onNext, onBack, loading }: Props) => {
  const valid =
    state.budget_range !== "" &&
    state.launch_timeline !== "" &&
    state.investment_ready !== "";

  return (
    <StepShell
      eyebrow="Step 4 — Budget & timeline"
      title="Budget & launch window"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={!valid}
      nextLabel="Review & continue"
      loading={loading}
    >
      <Field
        label="What is your estimated investment budget for this project?"
        hint="We create premium websites focused on conversion, branding and long-term growth. This helps us determine if we're the right fit."
      >
        <div className="grid sm:grid-cols-2 gap-2.5">
          {(Object.keys(budgetLabels) as BudgetRange[]).map((k) => (
            <ChoiceCard
              key={k}
              label={budgetLabels[k]}
              selected={state.budget_range === k}
              onClick={() => update({ budget_range: k })}
            />
          ))}
        </div>
      </Field>

      <Field label="When would you like to launch?">
        <div className="grid sm:grid-cols-2 gap-2.5">
          {(Object.keys(timelineLabels) as Timeline[]).map((k) => (
            <ChoiceCard
              key={k}
              label={timelineLabels[k]}
              selected={state.launch_timeline === k}
              onClick={() => update({ launch_timeline: k })}
            />
          ))}
        </div>
      </Field>

      <Field label="Are you ready to invest in a professional online presence if the demo convinces you?">
        <div className="grid grid-cols-3 gap-3">
          {(["yes", "maybe", "no"] as InvestmentReady[]).map((k) => (
            <ChoiceCard
              key={k}
              label={investmentReadyLabels[k]}
              selected={state.investment_ready === k}
              onClick={() => update({ investment_ready: k })}
            />
          ))}
        </div>
      </Field>
    </StepShell>
  );
};

export default StepBudget;
