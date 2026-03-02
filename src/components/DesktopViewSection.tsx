import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";
import { useLanguage } from "@/i18n/LanguageContext";

const desktopItems = [
  { src: portfolio1, alt: "Belgomed BV" },
  { src: portfolio2, alt: "Shinelab Detailing" },
  { src: portfolio3, alt: "L'atelier 9" },
];

const DesktopViewSection = () => {
  const { t } = useLanguage();

  return (
    <section id="desktop-view" className="py-12 md:py-24 bg-background overflow-hidden">
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
            Desktop View
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex animate-infinite-scroll hover:[animation-play-state:paused]">
            {[...desktopItems, ...desktopItems].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[320px] sm:w-[420px] md:w-[540px] lg:w-[620px] mx-3 md:mx-4 rounded-2xl overflow-hidden group"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesktopViewSection;
