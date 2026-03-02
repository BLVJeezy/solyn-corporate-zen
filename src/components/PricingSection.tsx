import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { openCalendly, loadCalendlyScript } from "@/lib/calendly";

const PricingSection = () => {
  const { t } = useLanguage();

  const plans = [
    {
      nameKey: "pricing.sprint.name",
      priceKey: "pricing.sprint.price",
      periodKey: "pricing.sprint.period",
      descKey: "pricing.sprint.desc",
      features: ["pricing.sprint.f1", "pricing.sprint.f2", "pricing.sprint.f3", "pricing.sprint.f4"],
      highlighted: false,
      ctaKey: "pricing.sprint.cta",
      inverted: false,
    },
    {
      nameKey: "pricing.mvp.name",
      priceKey: "pricing.mvp.price",
      periodKey: "pricing.mvp.period",
      descKey: "pricing.mvp.desc",
      features: ["pricing.mvp.f1", "pricing.mvp.f2", "pricing.mvp.f3", "pricing.mvp.f4"],
      highlighted: true,
      ctaKey: "pricing.mvp.cta",
      inverted: true,
    },
  ];

  useEffect(() => {
    loadCalendlyScript();
  }, []);

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
            {t("pricing.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2 tracking-tight">
            {t("pricing.heading")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-8 transition-all duration-300 ${
                plan.inverted
                  ? "border-foreground/20 bg-foreground text-background"
                  : "border-border bg-card"
              }`}
            >
              <h3 className={`text-xl font-semibold ${plan.inverted ? "text-background" : "text-foreground"}`}>{t(plan.nameKey)}</h3>
              <p className={`text-sm mt-1 ${plan.inverted ? "text-background/60" : "text-muted-foreground"}`}>{t(plan.descKey)}</p>

              <div className="mt-6 mb-6">
                <span className="text-4xl font-semibold bg-gradient-to-r from-[hsl(var(--gradient-from))] via-[hsl(var(--gradient-via))] to-[hsl(var(--gradient-to))] bg-clip-text text-transparent">{t(plan.priceKey)}</span>
                <span className={`text-sm ml-2 ${plan.inverted ? "text-background/60" : "text-muted-foreground"}`}>{t(plan.periodKey)}</span>
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((fKey) => (
                  <li key={fKey} className={`flex items-start gap-2.5 text-sm ${plan.inverted ? "text-background/60" : "text-muted-foreground"}`}>
                    <span className={`mt-0.5 ${plan.inverted ? "text-background" : "text-foreground"}`}>—</span>
                    {t(fKey)}
                  </li>
                ))}
              </ul>

              <Button
                onClick={openCalendly}
                className={`w-full font-medium rounded-full ${
                  plan.inverted
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-transparent border border-border text-foreground hover:border-foreground/30"
                }`}
              >
                {t(plan.ctaKey)}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
