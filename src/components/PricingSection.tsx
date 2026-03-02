import { motion } from "framer-motion";
import { ArrowRight, Zap, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import goldTexture from "@/assets/gold-texture.jpeg";
import silverTexture from "@/assets/silver-texture.webp";

const PricingSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

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
      icon: Zap,
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
      icon: Rocket,
    },
  ];




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
              className="rounded-2xl p-8 transition-all duration-300 relative overflow-hidden shadow-[0_10px_40px_-4px_rgba(0,0,0,0.25)]"
              style={{
                backgroundImage: `url(${plan.inverted ? goldTexture : silverTexture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3 className={`text-xl font-semibold flex items-center gap-2 ${plan.inverted ? "text-yellow-950" : "text-slate-800"}`}>
                <plan.icon className="w-5 h-5" />
                {t(plan.nameKey)}
              </h3>
              <p className={`text-sm mt-1 ${plan.inverted ? "text-yellow-900/70" : "text-slate-600"}`}>{t(plan.descKey)}</p>

              <div className="mt-6 mb-6">
                <span className={`text-4xl font-semibold ${plan.inverted ? "text-yellow-950" : "text-slate-800"}`}>{t(plan.priceKey)}</span>
                <span className={`text-sm ml-2 ${plan.inverted ? "text-yellow-900/60" : "text-slate-500"}`}>{t(plan.periodKey)}</span>
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((fKey) => (
                  <li key={fKey} className={`flex items-start gap-2.5 text-sm ${plan.inverted ? "text-yellow-900/70" : "text-slate-600"}`}>
                    <span className={`mt-0.5 ${plan.inverted ? "text-yellow-950" : "text-slate-800"}`}>—</span>
                    {t(fKey)}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate("/book")}
                className={`w-full font-medium rounded-full border-0 ${
                  plan.inverted
                    ? "bg-yellow-950 text-yellow-100 hover:bg-yellow-900"
                    : "bg-slate-700 text-slate-100 hover:bg-slate-600"
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
