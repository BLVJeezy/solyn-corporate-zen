import { FunnelState } from "@/lib/funnel/types";
import StepShell from "./StepShell";
import { Field, GlassInput, GlassTextarea } from "./FieldKit";

interface Props {
  state: FunnelState;
  update: (patch: Partial<FunnelState>) => void;
  onNext: () => void;
}

const StepBasicInfo = ({ state, update, onNext }: Props) => {
  const valid =
    state.full_name.trim().length >= 2 &&
    state.business_name.trim().length >= 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);

  return (
    <StepShell
      eyebrow="Step 1 — Introduction"
      title="Let's See If We're A Good Fit"
      subtitle="Answer a few quick questions so we can understand your business and prepare the right strategy for you."
      onNext={onNext}
      nextDisabled={!valid}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name">
          <GlassInput
            value={state.full_name}
            onChange={(e) => update({ full_name: e.target.value })}
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </Field>
        <Field label="Business name">
          <GlassInput
            value={state.business_name}
            onChange={(e) => update({ business_name: e.target.value })}
            placeholder="Acme Inc."
            autoComplete="organization"
          />
        </Field>
        <Field label="Email address">
          <GlassInput
            type="email"
            value={state.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Phone number">
          <GlassInput
            type="tel"
            value={state.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="+32 …"
            autoComplete="tel"
          />
        </Field>
      </div>
      <Field label="What does your business do?">
        <GlassTextarea
          value={state.business_description}
          onChange={(e) => update({ business_description: e.target.value })}
          placeholder="One or two sentences about your business and customers."
        />
      </Field>
      <Field label="How did you hear about us?">
        <GlassInput
          value={state.referral_source}
          onChange={(e) => update({ referral_source: e.target.value })}
          placeholder="Google, Instagram, referral…"
        />
      </Field>
    </StepShell>
  );
};

export default StepBasicInfo;
