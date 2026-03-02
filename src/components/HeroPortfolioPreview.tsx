import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";

const portfolioItems = [
  { src: portfolio1, alt: "Belgomed BV" },
  { src: portfolio2, alt: "Shinelab Detailing" },
  { src: portfolio3, alt: "L'atelier 9" },
];

const HeroPortfolioPreview = () => {
  return (
    <section className="pb-12 md:pb-24 bg-background overflow-hidden">
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
          <div className="inline-flex animate-infinite-scroll hover:[animation-play-state:paused]">
            {/* Render items twice for seamless loop */}
            {[...portfolioItems, ...portfolioItems].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[280px] sm:w-[360px] md:w-[480px] lg:w-[560px] mx-2 md:mx-3 rounded-2xl overflow-hidden bg-[hsl(0,0%,8%)] aspect-[16/10] relative group"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%)] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 md:bottom-4 md:left-5">
                  <span className="text-xs md:text-sm font-medium text-foreground/80">{item.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroPortfolioPreview;
