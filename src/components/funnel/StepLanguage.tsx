import { useLanguage } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";
import StepShell from "./StepShell";
import { ChoiceCard } from "./FieldKit";
import { FunnelState } from "@/lib/funnel/types";

interface Props {
  state: FunnelState;
  update: (patch: Partial<FunnelState>) => void;
  onNext: () => void;
}

const LANG_OPTIONS: { key: Lang; labelKey: string }[] = [
  { key: "NL", labelKey: "funnel.lang.nl" },
  { key: "FR", labelKey: "funnel.lang.fr" },
  { key: "EN", labelKey: "funnel.lang.en" },
];

const langToSpoken: Record<Lang, "nl" | "fr" | "en"> = {
  NL: "nl",
  FR: "fr",
  EN: "en",
};

const StepLanguage = ({ state, update, onNext }: Props) => {
  const { lang: currentLang, setLang, t } = useLanguage();

  const handleSelect = (l: Lang) => {
    setLang(l);
    update({ preferred_language: langToSpoken[l] });
  };

  const valid = state.preferred_language !== "";

  return (
    <StepShell
      eyebrow={t("funnel.lang.eyebrow")}
      title={t("funnel.lang.title")}
      subtitle={t("funnel.lang.subtitle")}
      onNext={onNext}
      nextDisabled={!valid}
    >
      <div className="grid gap-3">
        {LANG_OPTIONS.map((opt) => (
          <ChoiceCard
            key={opt.key}
            label={t(opt.labelKey)}
            selected={selectedLang === opt.key}
            onClick={() => handleSelect(opt.key)}
          />
        ))}
      </div>
    </StepShell>
  );
};

export default StepLanguage;
