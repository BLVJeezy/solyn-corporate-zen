import { FunnelState, Feature, WebsiteType, AiRanking } from "@/lib/funnel/types";
import { featureLabels, websiteTypeLabels, aiRankingLabels } from "@/lib/funnel/labels";
import StepShell from "./StepShell";
import { Field, GlassTextarea, ChoiceCard } from "./FieldKit";

interface Props {
  state: FunnelState;
  update: (patch: Partial<FunnelState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepProject = ({ state, update, onNext, onBack }: Props) => {
  const toggleFeature = (f: Feature) => {
    const next = state.features_needed.includes(f)
      ? state.features_needed.filter((i) => i !== f)
      : [...state.features_needed, f];
    update({ features_needed: next });
  };

  const valid =
    state.website_type !== "" &&
    state.seo_important !== null &&
    state.ai_ranking !== "";

  return (
    <StepShell
      eyebrow="Step 3 — Project qualification"
      title="Tell us about your project"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={!valid}
    >
      <Field label="What do you absolutely NOT want on your website?">
        <GlassTextarea
          value={state.avoid_text}
          onChange={(e) => update({ avoid_text: e.target.value })}
          placeholder="Pop-ups, stock photos, anything specific to avoid…"
        />
      </Field>

      <Field label="What type of website are you looking for?">
        <div className="grid gap-2.5">
          {(["hardcoded", "cms"] as WebsiteType[]).map((k) => (
            <ChoiceCard
              key={k}
              label={websiteTypeLabels[k].title}
              description={websiteTypeLabels[k].desc}
              selected={state.website_type === k}
              onClick={() => update({ website_type: k })}
            />
          ))}
        </div>
      </Field>

      <Field label="Is Google ranking (SEO) important for your business?">
        <div className="grid grid-cols-2 gap-3">
          <ChoiceCard label="Yes" selected={state.seo_important === true} onClick={() => update({ seo_important: true })} />
          <ChoiceCard label="No" selected={state.seo_important === false} onClick={() => update({ seo_important: false })} />
        </div>
      </Field>

      <Field
        label="Is AI ranking important for your business?"
        hint="For example appearing in ChatGPT or AI search recommendations."
      >
        <div className="grid grid-cols-3 gap-3">
          {(["yes", "no", "unsure"] as AiRanking[]).map((k) => (
            <ChoiceCard
              key={k}
              label={aiRankingLabels[k]}
              selected={state.ai_ranking === k}
              onClick={() => update({ ai_ranking: k })}
            />
          ))}
        </div>
      </Field>

      <Field label="What functionalities do you need?" hint="Select all that apply">
        <div className="grid sm:grid-cols-2 gap-2.5">
          {(Object.keys(featureLabels) as Feature[]).map((k) => (
            <ChoiceCard
              key={k}
              label={featureLabels[k]}
              selected={state.features_needed.includes(k)}
              onClick={() => toggleFeature(k)}
              multi
            />
          ))}
        </div>
      </Field>
    </StepShell>
  );
};

export default StepProject;
