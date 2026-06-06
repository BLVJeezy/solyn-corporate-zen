import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Check, TrendingUp, Search, Star } from "lucide-react";
import showcaseBelgomed from "@/assets/showcase-belgomed.png";
import showcaseDetailing from "@/assets/showcase-detailing.png";
import showcaseAtelier9 from "@/assets/showcase-atelier9.png";
import showcaseMomentum from "@/assets/showcase-momentumos.png";
import showcaseLeplana from "@/assets/showcase-leplana.png";

const showcaseItems = [
  { img: showcaseBelgomed, alt: "Belgomed" },
  { img: showcaseDetailing, alt: "Auto Detailing" },
  { img: showcaseAtelier9, alt: "L'atelier 9" },
  { img: showcaseMomentum, alt: "MomentumOS" },
  { img: showcaseLeplana, alt: "Le Plan A" },
];

const STATS = [
  { value: "90 dagen", label: "Gemiddelde tijd naar pagina 1" },
  { value: "3×", label: "Meer leads na website redesign" },
  { value: "100%", label: "Tevreden klanten" },
];

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-28 md:pt-36 pb-0 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6"
        >
          <Search className="w-3.5 h-3.5" />
          SEO & Webdesign Bureau — Tongeren, Bilzen, Limburg & heel België
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.08] text-left">
            Meer klanten via Google.
            <span className="text-gray-400"> Wij ranken uw bedrijf hoger.</span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-gray-500 text-base sm:text-lg max-w-xl mt-6 leading-relaxed"
        >
          Wij bouwen snelle, converterende websites met lokale SEO voor KMO's en zelfstandigen in Tongeren, Bilzen, Borgloon en heel België. Gevonden worden door klanten die al zoeken naar wat u biedt.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center gap-3 mt-8"
        >
          <Button
            onClick={() => navigate("/book")}
            className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-7 py-6 text-base gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            Gratis SEO-audit aanvragen
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/webdesign-zuid-limburg")}
            className="rounded-full border-gray-300 text-black hover:bg-gray-50 font-medium px-7 py-6 text-base"
          >
            Uw regio bekijken
          </Button>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600"
        >
          {[
            "SEO-First Webdesign",
            "Actief in Tongeren, Bilzen & omgeving",
            "Resultaten binnen 90 dagen",
            "Geoptimaliseerd voor Google.be",
          ].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-lg"
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-left">
              <div className="text-2xl sm:text-3xl font-bold text-black tracking-tight">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Infinite scroll showcase */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 w-full overflow-hidden"
      >
        <div className="relative">
          <div className="flex gap-5 animate-infinite-scroll w-max">
            {[...showcaseItems, ...showcaseItems].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[420px] sm:w-[520px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm"
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-auto object-cover"
                  decoding="async"
                  fetchPriority={i < 3 ? "high" : "auto"}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeHero;
