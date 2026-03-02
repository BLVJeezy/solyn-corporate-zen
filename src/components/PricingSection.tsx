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
              className="rounded-2xl p-8 transition-all duration-300 relative overflow-hidden shadow-[0_10px_40px_-4px_rgba(0,0,0,0.25)] group"
              style={{
                backgroundImage: `url(${plan.inverted ? goldTexture : silverTexture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 60%)",
                  animation: "shimmer 2.5s ease-in-out infinite",
                }}
              />

              <h3 className="text-xl font-bold flex items-center gap-2 text-black relative z-10">
                <plan.icon className="w-5 h-5" />
                {t(plan.nameKey)}
              </h3>
              <p className={`text-sm mt-1 relative z-10 ${plan.inverted ? "text-black/80 font-semibold" : "text-black/70"}`}>{t(plan.descKey)}</p>

              <div className="mt-6 mb-6 relative z-10">
                <span className="text-4xl font-bold text-black">{t(plan.priceKey)}</span>
                <span className="text-sm ml-2 text-black/60">{t(plan.periodKey)}</span>
              </div>

              <ul className="space-y-2.5 mb-8 relative z-10">
                {plan.features.map((fKey) => (
                  <li key={fKey} className={`flex items-start gap-2.5 text-sm ${plan.inverted ? "text-black/90 font-semibold" : "text-black/80"}`}>
                    <span className="mt-0.5 text-black font-bold">—</span>
                    {t(fKey)}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate("/book")}
                className="w-full font-semibold rounded-full border-0 bg-black/80 text-white hover:bg-black relative z-10"
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
