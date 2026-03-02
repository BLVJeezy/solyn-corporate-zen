import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const ProcessSection = () => {
  const { t } = useLanguage();

  const steps = [
    { number: "01", titleKey: "process.step1.title", descKey: "process.step1.desc" },
    { number: "02", titleKey: "process.step2.title", descKey: "process.step2.desc" },
    { number: "03", titleKey: "process.step3.title", descKey: "process.step3.desc" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            {t("process.heading1")} {t("process.heading2")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
            {t("process.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="text-5xl font-semibold text-border">{step.number}</span>
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">{t(step.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
