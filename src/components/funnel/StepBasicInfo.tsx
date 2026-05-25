import { FunnelState, ReferralSource, SpokenLanguage } from "@/lib/funnel/types";
import StepShell from "./StepShell";
import { Field, GlassInput, GlassTextarea, ChoiceCard } from "./FieldKit";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  state: FunnelState;
  update: (patch: Partial<FunnelState>) => void;
  onNext: () => void;
}

const REFERRAL_OPTIONS: ReferralSource[] = ["google", "facebook", "instagram", "ai", "word_of_mouth", "other"];
const LANGUAGE_OPTIONS: SpokenLanguage[] = ["nl", "fr", "en", "other"];

const StepBasicInfo = ({ state, update, onNext }: Props) => {
  const { t } = useLanguage();
  const valid =
    state.full_name.trim().length >= 2 &&
    state.business_name.trim().length >= 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email) &&
    state.preferred_language !== "" &&
    state.referral_source !== "";

  return (
    <StepShell
      eyebrow={t("funnel.s1.eyebrow")}
      title={t("funnel.s1.title")}
      subtitle={t("funnel.s1.subtitle")}
      onNext={onNext}
      nextDisabled={!valid}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t("funnel.s1.fullName")}>
          <GlassInput
            value={state.full_name}
            onChange={(e) => update({ full_name: e.target.value })}
            placeholder={t("funnel.s1.namePh")}
            autoComplete="name"
          />
        </Field>
        <Field label={t("funnel.s1.businessName")}>
          <GlassInput
            value={state.business_name}
            onChange={(e) => update({ business_name: e.target.value })}
            placeholder={t("funnel.s1.bizPh")}
            autoComplete="organization"
          />
        </Field>
        <Field label={t("funnel.s1.email")}>
          <GlassInput
            type="email"
            value={state.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder={t("funnel.s1.emailPh")}
            autoComplete="email"
          />
        </Field>
        <Field label={t("funnel.s1.phone")}>
          <GlassInput
            type="tel"
            value={state.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder={t("funnel.s1.phonePh")}
            autoComplete="tel"
          />
        </Field>
      </div>
      <Field label={t("funnel.s1.bizDesc")}>
        <GlassTextarea
          value={state.business_description}
          onChange={(e) => update({ business_description: e.target.value })}
          placeholder={t("funnel.s1.bizDescPh")}
        />
      </Field>
      <Field label={t("funnel.s1.language")}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {LANGUAGE_OPTIONS.map((k) => (
            <ChoiceCard
              key={k}
              label={t(`language.${k}`)}
              selected={state.preferred_language === k}
              onClick={() => update({ preferred_language: k })}
            />
          ))}
        </div>
      </Field>
      <Field label={t("funnel.s1.referral")}>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {REFERRAL_OPTIONS.map((k) => (
            <ChoiceCard
              key={k}
              label={t(`referral.${k}`)}
              selected={state.referral_source === k}
              onClick={() => update({ referral_source: k })}
            />
          ))}
        </div>
      </Field>
    </StepShell>
  );
};

export default StepBasicInfo;
