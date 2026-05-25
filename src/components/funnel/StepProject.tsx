import { FunnelState, Feature, WebsiteType, AiRanking } from "@/lib/funnel/types";
import { featureKeys, websiteTypeKeys, aiRankingKeys } from "@/lib/funnel/labels";
import StepShell from "./StepShell";
import { Field, GlassTextarea, ChoiceCard } from "./FieldKit";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  state: FunnelState;
  update: (patch: Partial<FunnelState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepProject = ({ state, update, onNext, onBack }: Props) => {
  const { t } = useLanguage();
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
      eyebrow={t("funnel.s3.eyebrow")}
      title={t("funnel.s3.title")}
      onNext={onNext}
      onBack={onBack}
      nextDisabled={!valid}
    >
      <Field label={t("funnel.s3.avoidLabel")}>
        <GlassTextarea
          value={state.avoid_text}
          onChange={(e) => update({ avoid_text: e.target.value })}
          placeholder={t("funnel.s3.avoidPh")}
        />
      </Field>

      <Field label={t("funnel.s3.typeLabel")}>
        <div className="grid gap-2.5">
          {(["hardcoded", "cms"] as WebsiteType[]).map((k) => (
            <ChoiceCard
              key={k}
              label={t(websiteTypeKeys[k].title)}
              description={t(websiteTypeKeys[k].desc)}
              selected={state.website_type === k}
              onClick={() => update({ website_type: k })}
            />
          ))}
        </div>
      </Field>

      <Field label={t("funnel.s3.seoLabel")}>
        <div className="grid grid-cols-2 gap-3">
          <ChoiceCard label={t("funnel.yes")} selected={state.seo_important === true} onClick={() => update({ seo_important: true })} />
          <ChoiceCard label={t("funnel.no")} selected={state.seo_important === false} onClick={() => update({ seo_important: false })} />
        </div>
      </Field>

      <Field label={t("funnel.s3.aiLabel")} hint={t("funnel.s3.aiHint")}>
        <div className="grid grid-cols-3 gap-3">
          {(["yes", "no", "unsure"] as AiRanking[]).map((k) => (
            <ChoiceCard
              key={k}
              label={t(aiRankingKeys[k])}
              selected={state.ai_ranking === k}
              onClick={() => update({ ai_ranking: k })}
            />
          ))}
        </div>
      </Field>

      <Field label={t("funnel.s3.featuresLabel")} hint={t("funnel.selectAll")}>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {(Object.keys(featureKeys) as Feature[]).map((k) => (
            <ChoiceCard
              key={k}
              label={t(featureKeys[k])}
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
