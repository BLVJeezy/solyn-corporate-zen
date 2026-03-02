import { Clock, Pencil, Code2, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const ProcessSection = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Clock, hour: "0h", titleKey: "process.step1.title", descKey: "process.step1.desc" },
    { icon: Pencil, hour: "12h", titleKey: "process.step2.title", descKey: "process.step2.desc" },
    { icon: Code2, hour: "24h", titleKey: "process.step3.title", descKey: "process.step3.desc" },
    { icon: Rocket, hour: "48h", titleKey: "process.step4.title", descKey: "process.step4.desc" },
  ];

  return (
    <section id="process" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("process.heading1")} <span className="text-gradient-gold">{t("process.heading2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("process.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.hour}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-6 relative group hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{step.hour}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">{t(step.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;