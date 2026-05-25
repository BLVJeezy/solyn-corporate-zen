import { FunnelState, WebsiteIssue, StylePreference } from "@/lib/funnel/types";
import { websiteIssueLabels, stylePreferenceLabels } from "@/lib/funnel/labels";
import StepShell from "./StepShell";
import { Field, GlassInput, GlassTextarea, ChoiceCard } from "./FieldKit";

interface Props {
  state: FunnelState;
  update: (patch: Partial<FunnelState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepWebsite = ({ state, update, onNext, onBack }: Props) => {
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
      eyebrow="Step 2 — Website status"
      title="Do you currently have a website?"
      onNext={onNext}
      onBack={onBack}
      nextDisabled={!valid}
    >
      <div className="grid grid-cols-2 gap-3">
        <ChoiceCard label="Yes" selected={state.has_website === true} onClick={() => update({ has_website: true })} />
        <ChoiceCard label="No" selected={state.has_website === false} onClick={() => update({ has_website: false })} />
      </div>

      {state.has_website === true && (
        <div className="space-y-5 pt-2">
          <Field label="Current website URL">
            <GlassInput
              type="url"
              value={state.website_url}
              onChange={(e) => update({ website_url: e.target.value })}
              placeholder="https://"
            />
          </Field>
          <Field label="What currently bothers you most about your website?" hint="Select all that apply">
            <div className="grid sm:grid-cols-2 gap-2.5">
              {(Object.keys(websiteIssueLabels) as WebsiteIssue[]).map((k) => (
                <ChoiceCard
                  key={k}
                  label={websiteIssueLabels[k]}
                  selected={state.website_issues.includes(k)}
                  onClick={() => toggleIssue(k)}
                  multi
                />
              ))}
            </div>
          </Field>
          <Field label="What would you like to keep from your current website?">
            <GlassTextarea
              value={state.website_keep}
              onChange={(e) => update({ website_keep: e.target.value })}
              placeholder="Logo, color palette, certain content…"
            />
          </Field>
        </div>
      )}

      {state.has_website === false && (
        <div className="space-y-5 pt-2">
          <Field label="Websites or competitors whose style you like">
            <GlassTextarea
              value={state.style_inspiration}
              onChange={(e) => update({ style_inspiration: e.target.value })}
              placeholder="Drop a few URLs or names…"
            />
          </Field>
          <Field label="What type of style are you looking for?">
            <div className="grid sm:grid-cols-2 gap-2.5">
              {(Object.keys(stylePreferenceLabels) as StylePreference[]).map((k) => (
                <ChoiceCard
                  key={k}
                  label={stylePreferenceLabels[k]}
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
