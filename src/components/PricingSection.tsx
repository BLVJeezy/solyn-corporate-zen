import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Rocket, Clock, Crown, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import goldTexture from "@/assets/gold-texture.jpeg";
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

  return (
    <section id="pricing" className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            {t("pricing.label")}
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground mt-3 tracking-tight">
            {t("pricing.heading")}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center justify-center gap-3"
        >
          <Clock className="w-4 h-4 text-destructive animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">{t("pricing.countdown")}</span>
          <div className="flex gap-1.5">
            {[
              { value: timeLeft.days, label: "d" },
              { value: timeLeft.hours, label: "h" },
              { value: timeLeft.minutes, label: "m" },
              { value: timeLeft.seconds, label: "s" },
            ].map((unit) => (
              <div key={unit.label} className="bg-foreground text-background rounded-md px-2 py-1 text-center min-w-[36px]">
                <span className="text-sm font-bold tabular-nums">{String(unit.value).padStart(2, "0")}</span>
                <span className="text-[9px] ml-0.5 opacity-60">{unit.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Two cards side by side */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          
          {/* Left: MVP Website Launch — light card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-7 md:p-9 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(40_48%_56%)] to-[hsl(30_50%_45%)] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{t("pricing.mvp.name")}</h3>
                <p className="text-xs text-muted-foreground">{t("pricing.mvp.desc")}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {t("pricing.mvp.longDesc")}
            </p>

            <div className="mb-1">
              <span className="text-base font-bold text-destructive line-through mr-2">€3.997</span>
            </div>
            <div className="mb-1">
              <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[hsl(40_48%_56%)] to-[hsl(210_15%_70%)] bg-clip-text text-transparent">
                {t("pricing.mvp.price")}
              </span>
              <span className="text-sm ml-2 text-muted-foreground">/ {t("pricing.mvp.period")}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-7">{t("pricing.pauseCancel")}</p>

            <Button
              onClick={() => navigate("/book")}
              className="w-full font-medium rounded-full border border-border bg-card text-foreground hover:bg-muted py-5 mb-8"
              variant="outline"
            >
              {t("nav.book")}
            </Button>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">{t("pricing.whatsIncluded")}</h4>
              <ul className="space-y-3">
                {["pricing.mvp.f1", "pricing.mvp.f2", "pricing.mvp.f3", "pricing.mvp.f4", "pricing.growth.f1", "pricing.growth.f2"].map((fKey) => (
                  <li key={fKey} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-foreground/40 flex-shrink-0" />
                    {t(fKey)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: VIP App MVP — dark card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl p-7 md:p-9 relative overflow-hidden group flex flex-col"
            style={{
              backgroundImage: `url(${diamondTexture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/70 z-0" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
                animation: "shimmer 2.5s ease-in-out infinite",
              }}
            />

            <div className="relative z-10 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{t("pricing.diamond.name")}</h3>
                  <p className="text-xs text-white/50">{t("pricing.diamond.desc")}</p>
                </div>
              </div>

              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                {t("pricing.diamond.longDesc")}
              </p>

              <div className="mb-1">
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  €9.500
                </span>
                <span className="text-sm ml-2 text-white/50">/ {t("pricing.diamond.setupLabel")}</span>
              </div>
              <p className="text-xs text-white/40 mb-7">{t("pricing.pauseCancel")}</p>

              <Button
                onClick={() => navigate("/book")}
                className="w-full font-medium rounded-full bg-white text-black hover:bg-white/90 py-5 mb-8"
              >
                {t("pricing.diamond.cta")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <div>
                <h4 className="text-sm font-semibold text-white mb-4">{t("pricing.whatsIncluded")}</h4>
                <ul className="space-y-3">
                  {["pricing.diamond.f1", "pricing.diamond.f2", "pricing.diamond.f3", "pricing.diamond.f4", "pricing.diamond.f5", "pricing.diamond.f6"].map((fKey) => (
                    <li key={fKey} className="flex items-start gap-2.5 text-sm text-white/60">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                      {t(fKey)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Book a Call card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-muted/50 border border-border p-5 flex items-center justify-between gap-4 mt-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[hsl(0_0%_7%)] flex items-center justify-center text-white text-sm font-bold">S</div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">{t("pricing.bookCall.title")}</h4>
              <p className="text-xs text-muted-foreground">{t("pricing.bookCall.subtitle")}</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/book")}
            className="rounded-full bg-[hsl(0_0%_14%)] text-white hover:bg-[hsl(0_0%_20%)] px-5 text-sm shrink-0"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t("nav.book")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
