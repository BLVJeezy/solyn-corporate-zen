import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

import p1 from "@/assets/portfolio-shefftrades.png";
import p2 from "@/assets/portfolio-leplana.png";
import p3 from "@/assets/portfolio-momentumos-1.png";
import p4 from "@/assets/portfolio-luxfitness-1.png";
import p5 from "@/assets/portfolio-daroumi-1.png";
import p6 from "@/assets/portfolio-riory-1.png";
import p7 from "@/assets/portfolio-poortpilates-1.png";
import p8 from "@/assets/portfolio-rw-academy.png";
import p9 from "@/assets/portfolio-memorial-1.png";

const items = [
  { src: p1, alt: "SheffTrades" },
  { src: p2, alt: "LePlana" },
  { src: p3, alt: "MomentumOS" },
  { src: p4, alt: "LuxFitness" },
  { src: p5, alt: "Daroumi" },
  { src: p6, alt: "Riory" },
  { src: p7, alt: "Poort Pilates" },
  { src: p8, alt: "RW Academy" },
  { src: p9, alt: "Memorial" },
];

const labels = {
  "nl-BE": {
    title: "Onze recente projecten",
    subtitle: "Klik op een project om het in detail te bekijken.",
    cta: "Boek een afspraak met gratis demo",
  },
  "fr-BE": {
    title: "Nos projets récents",
    subtitle: "Cliquez sur un projet pour le voir en détail.",
    cta: "Réservez un rendez-vous avec démo gratuite",
  },
  en: {
    title: "Our recent projects",
    subtitle: "Click on a project to view it in detail.",
    cta: "Book a meeting with free demo",
  },
} as const;

type Lang = keyof typeof labels;

const SeoPortfolioScroll = ({ hreflang }: { hreflang: string }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<string | null>(null);
  const l = labels[(hreflang as Lang)] ?? labels.en;

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-3">{l.title}</h2>
        <p className="text-gray-600">{l.subtitle}</p>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex animate-infinite-scroll hover:[animation-play-state:paused]">
            {[...items, ...items].map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setOpen(item.src)}
                className="flex-shrink-0 w-[280px] sm:w-[360px] md:w-[480px] lg:w-[560px] mx-2 md:mx-3 rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10] relative group cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 md:bottom-4 md:left-5">
                  <span className="text-xs md:text-sm font-medium text-white">{item.alt}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center mt-14 px-6">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => navigate("/book")}
          className="group relative inline-flex items-center gap-3 rounded-full bg-black text-white pl-7 pr-3 py-3 text-base font-semibold shadow-[0_20px_60px_-15px_rgba(201,168,76,0.6)] hover:shadow-[0_25px_70px_-15px_rgba(201,168,76,0.85)] transition-shadow overflow-hidden"
        >
          {/* Gold shimmer sweep */}
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
            style={{
              background:
                "linear-gradient(120deg, transparent 30%, rgba(232,200,122,0.35) 50%, transparent 70%)",
            }}
          />
          {/* Outer gold ring */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(232,200,122,0.35)",
            }}
          />

          <span className="relative flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            {l.cta}
          </span>

          <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#e8c87a] via-[#c9a84c] to-[#8a7a3d] text-black transition-transform duration-300 group-hover:rotate-12">
            <Calendar className="w-4 h-4" />
          </span>
        </motion.button>
      </div>


      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-0">
          {open && (
            <img src={open} alt="Project preview" className="w-full h-auto object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SeoPortfolioScroll;
