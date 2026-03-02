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
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4 tracking-tight">
            {t("process.heading1")} <span className="text-gradient-gold">{t("process.heading2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("process.subtitle")}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center"
              >
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{t(step.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
