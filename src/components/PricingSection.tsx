import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Rocket, Clock, Diamond, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import goldTexture from "@/assets/gold-texture.jpeg";
import silverTexture from "@/assets/silver-texture.webp";
import diamondTexture from "@/assets/diamond-texture.jpeg";

const useCountdown = () => {
  const getTarget = () => {
    const stored = localStorage.getItem("pricing_countdown_target");
    if (stored) {
      const target = parseInt(stored, 10);
      if (target > Date.now()) return target;
    }
    const target = Date.now() + 3 * 24 * 60 * 60 * 1000;
    localStorage.setItem("pricing_countdown_target", target.toString());
    return target;
  };

  const [target] = useState(getTarget);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
};

const PricingSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const timeLeft = useCountdown();

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
    <section id="pricing" className="py-12 md:py-24 bg-background">
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

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-center gap-3 flex-wrap"
        >
          <Clock className="w-5 h-5 text-destructive animate-pulse" />
          <span className="text-sm font-semibold text-foreground">{t("pricing.countdown")}</span>
          <div className="flex gap-2">
            {[
              { value: timeLeft.days, label: "d" },
              { value: timeLeft.hours, label: "u" },
              { value: timeLeft.minutes, label: "m" },
              { value: timeLeft.seconds, label: "s" },
            ].map((unit) => (
              <div key={unit.label} className="bg-foreground text-background rounded-lg px-2.5 py-1.5 text-center min-w-[40px]">
                <span className="text-lg font-bold tabular-nums">{String(unit.value).padStart(2, "0")}</span>
                <span className="text-[10px] ml-0.5 opacity-70">{unit.label}</span>
              </div>
            ))}
          </div>
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

              {plan.inverted && (
                <div className="absolute -top-0 right-4 z-20">
                  <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-b-lg shadow-md">
                    ⭐ {t("pricing.mostPopular")}
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold flex items-center gap-2 text-black relative z-10">
                <plan.icon className="w-5 h-5" />
                {t(plan.nameKey)}
              </h3>
              <p className={`text-sm mt-1 relative z-10 ${plan.inverted ? "text-black/80 font-semibold" : "text-black/70"}`}>{t(plan.descKey)}</p>

              <div className="mt-6 mb-6 relative z-10">
                {plan.inverted && (
                  <span className="text-lg font-bold text-red-700 line-through mr-2">€3.997</span>
                )}
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

        {/* Diamond Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-3xl rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-[0_10px_60px_-4px_rgba(0,0,0,0.4)] group"
          style={{
            backgroundImage: `url(${diamondTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60 z-0" />
          {/* Diamond shimmer */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
              animation: "shimmer 2.5s ease-in-out infinite",
            }}
          />

          <div className="flex items-center gap-3 mb-2 relative z-10 drop-shadow-lg">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Diamond className="w-6 h-6 text-white" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">{t("pricing.diamond.name")}</h3>
              <p className="text-sm text-white/70">{t("pricing.diamond.desc")}</p>
            </div>
          </div>

          <div className="mt-4 mb-2 relative z-10">
            <span className="text-5xl font-bold text-white drop-shadow-lg">€9.500</span>
            <span className="text-sm ml-2 text-white/70">{t("pricing.diamond.setupLabel")}</span>
          </div>
          <p className="text-white/60 text-sm mb-6 relative z-10">+ €3.500 {t("pricing.diamond.period")}</p>

          <Button
            onClick={() => navigate("/book")}
            className="w-full md:w-auto font-semibold rounded-full bg-background text-foreground hover:bg-background/90 px-8 py-6 text-base relative z-10 mb-8"
          >
            {t("pricing.diamond.cta")}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <div className="relative z-10">
            <p className="font-semibold text-white mb-4">{t("pricing.diamond.included") || "What's included:"}</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {["pricing.diamond.f1", "pricing.diamond.f2", "pricing.diamond.f3", "pricing.diamond.f4", "pricing.diamond.f5", "pricing.diamond.f6"].map((fKey) => (
                <li key={fKey} className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle className="w-5 h-5 text-white/60 flex-shrink-0" />
                  {t(fKey)}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
