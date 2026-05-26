import React, { useState, useEffect, Fragment } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Rocket, Clock, Crown, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import silverTexture from "@/assets/silver-texture.webp";
import diamondTexture from "@/assets/diamond-texture.jpeg";
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
        hours: Math.floor(diff / (1000 * 60 * 60) % 24),
        minutes: Math.floor(diff / (1000 * 60) % 60),
        seconds: Math.floor(diff / 1000 % 60)
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
    features: ["pricing.growth.f2", "pricing.growth.f3", "pricing.growth.f4", "pricing.growth.f5"],
    ctaKey: "pricing.growth.cta",
    icon: Zap,
    texture: silverTexture,
    badge: "pricing.growth.requires"
  }];


  return (
    <section id="pricing" className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14">
          
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
        




















        

        {/* Tab Pill Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-muted p-1 border border-border">
            <button
              onClick={() => setActiveTab("websites")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "websites" ?
              "bg-foreground text-background shadow-sm" :
              "text-muted-foreground hover:text-foreground"}`
              }>
              
              {t("pricing.section.websites")}
            </button>
            <button
              onClick={() => setActiveTab("apps")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "apps" ?
              "bg-foreground text-background shadow-sm" :
              "text-muted-foreground hover:text-foreground"}`
              }>
              
              {t("pricing.section.apps")}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
        {activeTab === "websites" &&
          <motion.div
            key="websites"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}>
            
        {/* Plans Grid - 3 tier cards */}
        <div className="grid md:grid-cols-3 gap-3 md:gap-6">
          {(["starter", "business", "larger"] as const).map((tierKey, idx) => {
            const isFeatured = tierKey === "business";
            const isPremium = tierKey === "larger";
            const featureCount = tierKey === "starter" ? 6 : 7;
            const featureKeys = Array.from({ length: featureCount }, (_, i) => `pricing.tier.${tierKey}.f${i + 1}`);

            const TierIcon = tierKey === "starter" ? Zap : tierKey === "business" ? Rocket : Crown;

            const cardClasses = isPremium
              ? "rounded-2xl border border-white/10 bg-[hsl(0_0%_7%)] text-white shadow-xl relative overflow-hidden"
              : isFeatured
                ? "rounded-2xl border-2 border-foreground bg-card shadow-xl relative ring-1 ring-foreground/5"
                : "rounded-2xl border border-border bg-card";

            const iconWrapClasses = isPremium
              ? "bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600"
              : isFeatured
                ? "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500"
                : "bg-gradient-to-br from-sky-400 to-blue-600";

            const headingClass = isPremium ? "text-white" : "text-foreground";
            const subtitleClass = isPremium ? "text-white/60" : "text-muted-foreground";
            const descClass = isPremium ? "text-white/70" : "text-muted-foreground";
            const includedClass = isPremium ? "text-white" : "text-foreground";
            const featureTextClass = isPremium ? "text-white/70" : "text-muted-foreground";
            const featureLabelClass = isPremium ? "text-white" : "text-foreground";
            const checkClass = isPremium ? "text-amber-400" : isFeatured ? "text-violet-500" : "text-sky-500";

            const buttonClass = isPremium
              ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-black hover:brightness-110"
              : isFeatured
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "border border-border bg-card text-foreground hover:bg-muted";

            return (
              <motion.div
                key={tierKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`${cardClasses} p-4 sm:p-5 md:p-8 flex flex-col`}>

                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest font-bold text-background bg-foreground px-3 py-1 rounded-full shadow">
                    {t("pricing.mostPopular")}
                  </span>
                )}

                <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                  <span className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-sm ${iconWrapClasses}`}>
                    <TierIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isPremium ? "text-black" : "text-white"}`} />
                  </span>
                  <div className="min-w-0">
                    <h3 className={`text-base sm:text-lg font-bold ${headingClass} truncate`}>{t(`pricing.growth.tier.${tierKey}`)}</h3>
                    <p className={`text-[11px] sm:text-xs ${subtitleClass}`}>{t(`pricing.tier.${tierKey}.subtitle`)}</p>
                  </div>
                </div>

                <p className={`text-sm mb-4 sm:mb-5 leading-relaxed ${descClass}`}>
                  {t(`pricing.tier.${tierKey}.desc`)}
                </p>

                <Button
                  onClick={() => navigate("/book")}
                  className={`w-full font-medium rounded-full mb-6 ${buttonClass}`}
                  variant={isFeatured && !isPremium ? "default" : "outline"}>
                  {t(plans[0].ctaKey)}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <h4 className={`text-sm font-semibold mb-3 ${includedClass}`}>{t("pricing.whatsIncluded")}</h4>
                <ul className="space-y-2.5 flex-1">
                  {featureKeys.map((fKey) => {
                    const raw = t(fKey);
                    const [label, ...rest] = raw.split("::");
                    const value = rest.join("::");
                    return (
                      <li key={fKey} className={`flex items-start gap-2 text-sm ${featureTextClass}`}>
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${checkClass}`} />
                        <span>
                          {value ? (
                            <>
                              <span className={`font-semibold ${featureLabelClass}`}>{label}:</span> {value}
                            </>
                          ) : (
                            label
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </div>



        </motion.div>
          }

        {activeTab === "apps" &&
          <motion.div
            key="apps"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}>
            
        {/* Sprints + MVP Development Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="rounded-2xl border border-border bg-card p-7 md:p-8 flex flex-col">
                
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

            <p className="text-xs text-muted-foreground mb-6">{t("pricing.sprints.pauseCancel")}</p>

            <Button
                  onClick={() => navigate("/book")}
                  className="w-full font-medium rounded-full border border-border bg-card text-foreground hover:bg-muted mb-6"
                  variant="outline">
                  
              {t("pricing.sprints.cta")}
            </Button>

            <h4 className="text-sm font-semibold text-foreground mb-3">{t("pricing.whatsIncluded")}</h4>
            <ul className="space-y-2.5 flex-1">
              {["pricing.sprints.f1", "pricing.sprints.f2", "pricing.sprints.f3", "pricing.sprints.f4", "pricing.sprints.f5", "pricing.sprints.f6"].map((fKey) =>
                  <li key={fKey} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-muted-foreground/60 flex-shrink-0" />
                  {t(fKey)}
                </li>
                  )}
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
                  backgroundPosition: "center"
                }}>
                
            <div className="absolute inset-0 bg-black/70 z-0" />
            <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
                    animation: "shimmer 2.5s ease-in-out infinite"
                  }} />
                

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

              <p className="text-xs text-white/40 mb-6">{t("pricing.diamond.pauseCancel")}</p>

              <Button
                    onClick={() => navigate("/book")}
                    className="w-full font-medium rounded-full bg-white text-black hover:bg-white/90 mb-6">
                    
                {t("pricing.diamond.cta")}
              </Button>

              <h4 className="text-sm font-bold text-white mb-3">{t("pricing.whatsIncluded")}</h4>
              <ul className="space-y-2.5 flex-1">
                {["pricing.diamond.f1", "pricing.diamond.f2", "pricing.diamond.f3", "pricing.diamond.f4", "pricing.diamond.f5", "pricing.diamond.f6"].map((fKey) =>
                    <li key={fKey} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-white/40 flex-shrink-0" />
                    {t(fKey)}
                  </li>
                    )}
              </ul>
            </div>
          </motion.div>
        </div>
        </motion.div>
          }
        </AnimatePresence>

        {/* Book a Call card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-muted/50 border border-border p-5 flex items-center justify-between gap-4 mt-8">
          
          <div className="flex items-center gap-4">
            <img src={profilePhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className="text-sm font-semibold text-foreground">{t("pricing.bookCall.title")}</h4>
              <p className="text-xs text-muted-foreground">{t("pricing.bookCall.subtitle")}</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/book")}
            className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-5 text-sm shrink-0">
            
            <Calendar className="w-4 h-4 mr-2" />
            {t("nav.bookCall")}
          </Button>
        </motion.div>
      </div>
    </section>);

};

export default PricingSection;