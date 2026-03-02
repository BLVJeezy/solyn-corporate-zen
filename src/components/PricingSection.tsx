import { Check, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const PricingSection = () => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("pricing.heading1")} <span className="text-gradient-gold">{t("pricing.heading2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Sprint Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Zap className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground">{t("pricing.sprint.name")}</h3>
                <p className="text-sm text-muted-foreground">{t("pricing.sprint.sub")}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {t("pricing.sprint.desc")}
            </p>
            <div className="mb-6">
              <span className="font-serif text-5xl font-bold text-gradient-gold">€250</span>
              <span className="text-muted-foreground ml-2">/ sprint</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6">{t("pricing.sprint.note")}</p>
            <a href="#contact">
              <Button variant="outline" className="w-full rounded-full border-border text-foreground hover:bg-muted">
                {t("pricing.sprint.cta")}
              </Button>
            </a>
            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium text-foreground">{t("pricing.included")}:</p>
              {["sprint.f1", "sprint.f2", "sprint.f3", "sprint.f4", "sprint.f5"].map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {t(`pricing.${key}`)}
                </div>
              ))}
            </div>
          </motion.div>

          {/* MVP Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-foreground text-background rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">{t("pricing.mvp.name")}</h3>
                <p className="text-sm opacity-60">{t("pricing.mvp.sub")}</p>
              </div>
            </div>
            <p className="text-sm opacity-60 mb-6 leading-relaxed">
              {t("pricing.mvp.desc")}
            </p>
            <div className="mb-6">
              <span className="font-serif text-5xl font-bold text-gradient-gold">€2,000</span>
              <span className="opacity-60 ml-2">/ {t("pricing.mvp.period")}</span>
            </div>
            <p className="text-xs opacity-50 mb-6">{t("pricing.mvp.note")}</p>
            <a href="#contact">
              <Button className="w-full rounded-full bg-background text-foreground hover:bg-background/90">
                {t("pricing.mvp.cta")}
              </Button>
            </a>
            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium">{t("pricing.included")}:</p>
              {["mvp.f1", "mvp.f2", "mvp.f3", "mvp.f4", "mvp.f5", "mvp.f6"].map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm opacity-70">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {t(`pricing.${key}`)}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;