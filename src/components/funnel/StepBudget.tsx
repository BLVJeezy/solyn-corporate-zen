import { FunnelState, BudgetRange, Timeline, InvestmentReady } from "@/lib/funnel/types";
import { budgetKeys, timelineKeys, investmentReadyKeys } from "@/lib/funnel/labels";
import StepShell from "./StepShell";
import { Field, ChoiceCard } from "./FieldKit";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  state: FunnelState;
  update: (patch: Partial<FunnelState>) => void;
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
}

const StepBudget = ({ state, update, onNext, onBack, loading }: Props) => {
  const { t } = useLanguage();
  const valid =
    state.budget_range !== "" &&
    state.launch_timeline !== "" &&
    state.investment_ready !== "";

  return (
    <StepShell
      eyebrow={t("funnel.s4.eyebrow")}
      title={t("funnel.s4.title")}
      onNext={onNext}
      onBack={onBack}
      nextDisabled={!valid}
      nextLabel={t("funnel.s4.review")}
      loading={loading}
    >
      <Field label={t("funnel.s4.budgetLabel")} hint={t("funnel.s4.budgetHint")}>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {(Object.keys(budgetKeys) as BudgetRange[]).map((k) => (
            <ChoiceCard
              key={k}
              label={t(budgetKeys[k])}
              selected={state.budget_range === k}
              onClick={() => update({ budget_range: k })}
            />
          ))}
        </div>
      </Field>

      <Field label={t("funnel.s4.timelineLabel")}>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {(Object.keys(timelineKeys) as Timeline[]).map((k) => (
            <ChoiceCard
              key={k}
              label={t(timelineKeys[k])}
              selected={state.launch_timeline === k}
              onClick={() => update({ launch_timeline: k })}
            />
          ))}
        </div>
      </Field>

      <Field label={t("funnel.s4.readyLabel")}>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {(["yes", "maybe", "no"] as InvestmentReady[]).map((k) => (
            <ChoiceCard
              key={k}
              label={t(investmentReadyKeys[k])}
              selected={state.investment_ready === k}
              onClick={() => update({ investment_ready: k })}
              compact
            />
          ))}
        </div>
      </Field>
    </StepShell>
  );
};

export default StepBudget;
