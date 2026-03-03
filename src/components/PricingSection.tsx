import React, { useState, useEffect, Fragment } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Rocket, Clock, Crown, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import goldTexture from "@/assets/gold-texture.jpeg";
import silverTexture from "@/assets/silver-texture.webp";
import diamondTexture from "@/assets/diamond-texture.jpeg";
import diamondsBg from "@/assets/diamonds-bg.webp";
import solynLogo from "@/assets/solyn-logo.png";
import profilePhoto from "@/assets/profile-photo.jpg";

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
  const [activeTab, setActiveTab] = useState<"websites" | "apps">("websites");
  const plans = [
    {
      nameKey: "pricing.growth.name",
      descKey: "pricing.growth.desc",
      priceKey: "pricing.growth.price",
      periodKey: "pricing.growth.period",
      oldPrice: null,
      features: ["pricing.growth.f1", "pricing.growth.f2", "pricing.growth.f3", "pricing.growth.f4", "pricing.growth.f5"],
      ctaKey: "pricing.growth.cta",
      icon: Zap,
      texture: silverTexture,
      badge: "pricing.growth.requires",
    },
    {
      nameKey: "pricing.mvp.name",
      descKey: "pricing.mvp.desc",
      priceKey: "pricing.mvp.price",
      periodKey: "pricing.mvp.period",
      oldPrice: "€3.997",
      features: ["pricing.mvp.f1", "pricing.mvp.f2", "pricing.mvp.f3", "pricing.mvp.f4"],
      ctaKey: "pricing.mvp.cta",
      icon: Rocket,
      texture: goldTexture,
      badge: null,
    },
  ];

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

        {/* Tab Pill Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-muted p-1 border border-border">
            <button
              onClick={() => setActiveTab("websites")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "websites"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("pricing.section.websites")}
            </button>
            <button
              onClick={() => setActiveTab("apps")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "apps"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("pricing.section.apps")}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
        {activeTab === "websites" && (
        <motion.div
          key="websites"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
        {/* Plans Grid */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-0 items-stretch mb-5">
          {/* Monthly Maintenance - Light card (like Sprints) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-7 md:p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{t(plans[0].nameKey)}</h3>
                <p className="text-xs text-muted-foreground">{t(plans[0].descKey)}</p>
              </div>
            </div>

            {plans[0].badge && (
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full self-start mb-3">
                {t(plans[0].badge)}
              </span>
            )}

            <div className="mb-6">
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">{t(plans[0].priceKey)}</span>
              <span className="text-sm text-muted-foreground ml-2">{t(plans[0].periodKey)}</span>
            </div>

            <Button
              onClick={() => navigate("/book")}
              className="w-full font-medium rounded-full border border-border bg-card text-foreground hover:bg-muted mb-6"
              variant="outline"
            >
              {t(plans[0].ctaKey)}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <h4 className="text-sm font-semibold text-foreground mb-3">{t("pricing.whatsIncluded")}</h4>
            <ul className="space-y-2.5 flex-1">
              {plans[0].features.map((fKey) => (
                <li key={fKey} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-muted-foreground/60 flex-shrink-0" />
                  {t(fKey)}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Plus divider */}
          <div className="hidden md:flex items-center justify-center px-4">
            <span className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-xl font-bold text-muted-foreground">+</span>
          </div>
          <div className="flex md:hidden items-center justify-center py-4">
            <span className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-xl font-bold text-muted-foreground">+</span>
          </div>

          {/* Website Development - Dark card (like MVP) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl p-7 md:p-8 relative overflow-hidden group flex flex-col"
            style={{
              backgroundImage: `url(${diamondsBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 z-0" />
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
                  <Rocket className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{t(plans[1].nameKey)}</h3>
                  <p className="text-xs text-white/60">{t(plans[1].descKey)}</p>
                </div>
              </div>

              <div className="mb-6">
                {plans[1].oldPrice && (
                  <span className="text-base font-bold text-red-400 line-through mr-2">{plans[1].oldPrice}</span>
                )}
                <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">{t(plans[1].priceKey)}</span>
                <span className="text-sm text-white/60 ml-2">{t(plans[1].periodKey)}</span>
              </div>

              <Button
                onClick={() => navigate("/book")}
                className="w-full font-medium rounded-full bg-white text-black hover:bg-white/90 mb-6"
              >
                {t(plans[1].ctaKey)}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <h4 className="text-sm font-bold text-white mb-3">{t("pricing.whatsIncluded")}</h4>
              <ul className="space-y-2.5 flex-1">
                {plans[1].features.map((fKey) => (
                  <li key={fKey} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-white/40 flex-shrink-0" />
                    {t(fKey)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        </motion.div>
        )}

        {activeTab === "apps" && (
        <motion.div
          key="apps"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
        {/* Sprints + MVP Development Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-border bg-card p-7 md:p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{t("pricing.sprints.name")}</h3>
                <p className="text-xs text-muted-foreground">{t("pricing.sprints.subtitle")}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">{t("pricing.sprints.desc")}</p>

            <div className="mb-1">
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">{t("pricing.sprints.price")}</span>
              <span className="text-sm text-muted-foreground ml-2">{t("pricing.sprints.period")}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6">{t("pricing.sprints.pauseCancel")}</p>

            <Button
              onClick={() => navigate("/book")}
              className="w-full font-medium rounded-full border border-border bg-card text-foreground hover:bg-muted mb-6"
              variant="outline"
            >
              {t("pricing.sprints.cta")}
            </Button>

            <h4 className="text-sm font-semibold text-foreground mb-3">{t("pricing.whatsIncluded")}</h4>
            <ul className="space-y-2.5 flex-1">
              {["pricing.sprints.f1", "pricing.sprints.f2", "pricing.sprints.f3", "pricing.sprints.f4", "pricing.sprints.f5", "pricing.sprints.f6"].map((fKey) => (
                <li key={fKey} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-muted-foreground/60 flex-shrink-0" />
                  {t(fKey)}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* MVP Development Card - Dark */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="rounded-2xl p-7 md:p-8 relative overflow-hidden group flex flex-col"
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
                  <p className="text-xs text-white/60">{t("pricing.diamond.desc")}</p>
                </div>
              </div>

              <p className="text-sm text-white/50 mb-6">{t("pricing.diamond.subtitle")}</p>

              <div className="mb-1">
                <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">{t("pricing.diamond.price")}</span>
                <span className="text-sm text-white/60 ml-2">{t("pricing.diamond.setupLabel")}</span>
              </div>
              <p className="text-xs text-white/40 mb-6">{t("pricing.diamond.pauseCancel")}</p>

              <Button
                onClick={() => navigate("/book")}
                className="w-full font-medium rounded-full bg-white text-black hover:bg-white/90 mb-6"
              >
                {t("pricing.diamond.cta")}
              </Button>

              <h4 className="text-sm font-bold text-white mb-3">{t("pricing.whatsIncluded")}</h4>
              <ul className="space-y-2.5 flex-1">
                {["pricing.diamond.f1", "pricing.diamond.f2", "pricing.diamond.f3", "pricing.diamond.f4", "pricing.diamond.f5", "pricing.diamond.f6"].map((fKey) => (
                  <li key={fKey} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-white/40 flex-shrink-0" />
                    {t(fKey)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        </motion.div>
        )}
        </AnimatePresence>

        {/* Book a Call card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-muted/50 border border-border p-5 flex items-center justify-between gap-4 mt-8"
        >
          <div className="flex items-center gap-4">
            <img src={profilePhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className="text-sm font-semibold text-foreground">{t("pricing.bookCall.title")}</h4>
              <p className="text-xs text-muted-foreground">{t("pricing.bookCall.subtitle")}</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/book")}
            className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 text-sm shrink-0"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t("nav.bookCall")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
