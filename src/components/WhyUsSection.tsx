import { motion } from "framer-motion";
import { Zap, Star, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const cards = [
  { icon: Zap, titleKey: "whyUs.card1Title", descKey: "whyUs.card1Desc" },
  { icon: Star, titleKey: "whyUs.card2Title", descKey: "whyUs.card2Desc" },
  { icon: Heart, titleKey: "whyUs.card3Title", descKey: "whyUs.card3Desc" },
  { icon: Sparkles, titleKey: "whyUs.card4Title", descKey: "whyUs.card4Desc" },
];

const WhyUsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-24 bg-[hsl(0_0%_7%)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl border border-[hsl(40_48%_56%_/_0.2)] bg-[hsl(0_0%_10%)] p-8 md:p-10 overflow-hidden shadow-[0_0_20px_-5px_hsl(40_48%_56%_/_0.15)]"
            >
              {/* Gold glow gradient - always visible */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_hsl(40_48%_56%_/_0.1),_transparent_60%)] group-hover:bg-[radial-gradient(ellipse_at_bottom_left,_hsl(40_48%_56%_/_0.18),_transparent_60%)] transition-all duration-500" />

              <card.icon className="w-7 h-7 text-white mb-6" strokeWidth={1.5} />

              <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-3">
                {t(card.titleKey)}
              </h3>

              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {t(card.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
