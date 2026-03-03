import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Zap, Rocket, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import diamondTexture from "@/assets/diamond-texture.jpeg";
import diamondsBg from "@/assets/diamonds-bg.webp";
import { useLanguage } from "@/i18n/LanguageContext";

const HomePricing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"websites" | "apps">("websites");

  const websitePlans = [
  {
    nameKey: "pricing.growth.name",
    descKey: "pricing.growth.desc",
    priceKey: "pricing.growth.price",
    periodKey: "pricing.growth.period",
    badge: "pricing.growth.requires",
    features: ["pricing.growth.f1", "pricing.growth.f2", "pricing.growth.f3", "pricing.growth.f4", "pricing.growth.f5"],
    ctaKey: "pricing.growth.cta",
    icon: Zap,
    dark: false
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
    dark: true
  }];


  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14">
          
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-tight">
            Our Pricing.{" "}
            <span className="text-gray-400">
              Your own fractionalized team, with flexible pricing. No contract term.
            </span>
          </h2>
        </motion.div>

        {/* Tab Pill Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-gray-100 p-1 border border-gray-200">
            <button
              onClick={() => setActiveTab("websites")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "websites" ?
              "bg-black text-white shadow-sm" :
              "text-gray-500 hover:text-black"}`
              }>
              
              {t("pricing.section.websites")}
            </button>
            <button
              onClick={() => setActiveTab("apps")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === "apps" ?
              "bg-black text-white shadow-sm" :
              "text-gray-500 hover:text-black"}`
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
            
              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 items-stretch">
                {/* Monthly Maintenance - Light */}
                <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-200 bg-white p-7 md:p-8 flex flex-col">
                
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-black">{t(websitePlans[0].nameKey)}</h3>
                      <p className="text-xs text-gray-500">{t(websitePlans[0].descKey)}</p>
                    </div>
                  </div>

                  {websitePlans[0].badge &&
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full self-start mb-3">
                      {t(websitePlans[0].badge)}
                    </span>
                }

                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">{t(websitePlans[0].priceKey)}</span>
                    <span className="text-sm text-gray-500 ml-2">{t(websitePlans[0].periodKey)}</span>
                  </div>

                  <Button
                  onClick={() => navigate("/book")}
                  className="w-full font-medium rounded-full border border-gray-200 bg-white text-black hover:bg-gray-50 mb-6"
                  variant="outline">
                  
                    {t(websitePlans[0].ctaKey)}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <h4 className="text-sm font-semibold text-black mb-3">{t("pricing.whatsIncluded")}</h4>
                  <ul className="space-y-2.5 flex-1">
                    {websitePlans[0].features.map((fKey) =>
                  <li key={fKey} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        {t(fKey)}
                      </li>
                  )}
                  </ul>
                </motion.div>

                {/* Plus divider */}
                <div className="hidden md:flex items-center justify-center px-4">
                  <span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-400">+</span>
                </div>
                <div className="flex md:hidden items-center justify-center py-4">
                  <span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-400">+</span>
                </div>

                {/* Website Development - Dark */}
                <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="rounded-2xl p-7 md:p-8 relative overflow-hidden group flex flex-col"
                style={{
                  backgroundImage: `url(${diamondsBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}>
                
                  <div className="absolute inset-0 bg-black/60 z-0" />
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                        <Rocket className="w-5 h-5 text-white" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{t(websitePlans[1].nameKey)}</h3>
                        <p className="text-xs text-white/60">{t(websitePlans[1].descKey)}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      {websitePlans[1].oldPrice

                    }
                      <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">{t(websitePlans[1].priceKey)}</span>
                      <span className="text-sm text-white/60 ml-2">{t(websitePlans[1].periodKey)}</span>
                    </div>

                    <Button
                    onClick={() => navigate("/book")}
                    className="w-full font-medium rounded-full bg-white text-black hover:bg-white/90 mb-6">
                    
                      {t(websitePlans[1].ctaKey)}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>

                    <h4 className="text-sm font-bold text-white mb-3">{t("pricing.whatsIncluded")}</h4>
                    <ul className="space-y-2.5 flex-1">
                      {websitePlans[1].features.map((fKey) =>
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

          {activeTab === "apps" &&
          <motion.div
            key="apps"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}>
            
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sprints - Light */}
                <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-gray-200 bg-white p-7 md:p-8 flex flex-col">
                
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-black">{t("pricing.sprints.name")}</h3>
                      <p className="text-xs text-gray-500">{t("pricing.sprints.subtitle")}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-6">{t("pricing.sprints.desc")}</p>

                  <div className="mb-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">{t("pricing.sprints.price")}</span>
                    <span className="text-sm text-gray-500 ml-2">{t("pricing.sprints.period")}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-6">{t("pricing.sprints.pauseCancel")}</p>

                  <Button
                  onClick={() => navigate("/book")}
                  className="w-full font-medium rounded-full border border-gray-200 bg-white text-black hover:bg-gray-50 mb-6"
                  variant="outline">
                  
                    {t("pricing.sprints.cta")}
                  </Button>

                  <h4 className="text-sm font-semibold text-black mb-3">{t("pricing.whatsIncluded")}</h4>
                  <ul className="space-y-2.5 flex-1">
                    {["pricing.sprints.f1", "pricing.sprints.f2", "pricing.sprints.f3", "pricing.sprints.f4", "pricing.sprints.f5", "pricing.sprints.f6"].map((fKey) =>
                  <li key={fKey} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        {t(fKey)}
                      </li>
                  )}
                  </ul>
                </motion.div>

                {/* MVP Development - Dark */}
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
      </div>
    </section>);

};

export default HomePricing;