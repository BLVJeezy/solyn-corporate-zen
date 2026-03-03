import { motion } from "framer-motion";
import mobile1 from "@/assets/mobile-preview-1.png";
import mobile2 from "@/assets/mobile-preview-2.png";
import mobile3 from "@/assets/mobile-preview-3.png";
import mobile4 from "@/assets/mobile-preview-4.png";
import { useLanguage } from "@/i18n/LanguageContext";

const mobileItems = [
  { src: mobile1, alt: "Belgomed Analytics" },
  { src: mobile2, alt: "RW Intelligence" },
  { src: mobile3, alt: "Trading Journal" },
  { src: mobile4, alt: "Smash Burgers" },
];

const MobileViewSection = () => {
  const { t } = useLanguage();

  return (
    <section id="mobile-view" className="py-12 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
            {t("portfolio.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2 tracking-tight">
            {t("mobileView.heading")}
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center animate-infinite-scroll hover:[animation-play-state:paused]">
            {[...mobileItems, ...mobileItems].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px] mx-3 md:mx-4 rounded-2xl overflow-hidden group shadow-lg"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileViewSection;
