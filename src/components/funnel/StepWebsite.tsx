import { FunnelState, WebsiteIssue, StylePreference } from "@/lib/funnel/types";
import { websiteIssueKeys, stylePreferenceKeys } from "@/lib/funnel/labels";
import StepShell from "./StepShell";
import { Field, GlassInput, GlassTextarea, ChoiceCard } from "./FieldKit";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  state: FunnelState;
  update: (patch: Partial<FunnelState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepWebsite = ({ state, update, onNext, onBack }: Props) => {
  const { t } = useLanguage();
  const toggleIssue = (issue: WebsiteIssue) => {
    const next = state.website_issues.includes(issue)
      ? state.website_issues.filter((i) => i !== issue)
      : [...state.website_issues, issue];
    update({ website_issues: next });
  };

  const valid =
    state.has_website !== null &&
    (state.has_website
      ? state.website_url.trim().length > 0
      : state.style_preference !== "");

  return (
    <StepShell
      eyebrow={t("funnel.s2.eyebrow")}
      title={t("funnel.s2.title")}
      onNext={onNext}
      onBack={onBack}
      nextDisabled={!valid}
    >
      <div className="grid grid-cols-2 gap-3">
        <ChoiceCard label={t("funnel.yes")} selected={state.has_website === true} onClick={() => update({ has_website: true })} />
        <ChoiceCard label={t("funnel.no")} selected={state.has_website === false} onClick={() => update({ has_website: false })} />
      </div>

      {state.has_website === true && (
        <div className="space-y-5 pt-2">
          <Field label={t("funnel.s2.urlLabel")}>
            <GlassInput
              type="url"
              value={state.website_url}
              onChange={(e) => update({ website_url: e.target.value })}
              placeholder="https://"
            />
          </Field>
          <Field label={t("funnel.s2.issuesLabel")} hint={t("funnel.selectAll")}>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {(Object.keys(websiteIssueKeys) as WebsiteIssue[]).map((k) => (
                <ChoiceCard
                  key={k}
                  label={t(websiteIssueKeys[k])}
                  selected={state.website_issues.includes(k)}
                  onClick={() => toggleIssue(k)}
                  multi
                />
              ))}
            </div>
          </Field>
          <Field label={t("funnel.s2.keepLabel")}>
            <GlassTextarea
              value={state.website_keep}
              onChange={(e) => update({ website_keep: e.target.value })}
              placeholder={t("funnel.s2.keepPh")}
            />
          </Field>
        </div>
      )}

      {state.has_website === false && (
        <div className="space-y-5 pt-2">
          <Field label={t("funnel.s2.inspLabel")}>
            <GlassTextarea
              value={state.style_inspiration}
              onChange={(e) => update({ style_inspiration: e.target.value })}
              placeholder={t("funnel.s2.inspPh")}
            />
          </Field>
          <Field label={t("funnel.s2.styleLabel")}>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {(Object.keys(stylePreferenceKeys) as StylePreference[]).map((k) => (
                <ChoiceCard
                  key={k}
                  label={t(stylePreferenceKeys[k])}
                  selected={state.style_preference === k}
                  onClick={() => update({ style_preference: k })}
                />
              ))}
            </div>
          </Field>
        </div>
      )}
    </StepShell>
  );
};

export default StepWebsite;
