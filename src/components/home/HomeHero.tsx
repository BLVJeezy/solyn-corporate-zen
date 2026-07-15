import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Check, Search } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import mobileHero2 from "@/assets/mobile-hero-2.png.asset.json";
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
  { value: "14 van 15", label: "Zoekwoorden verbeterd in maand 1 (klantcase)" },
  { value: "26 leads", label: "Gemeten in één maand voor één klant" },
  { value: "#1", label: "In nieuw servicegebied bij eerste meting" },
];

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-28 md:pt-36 pb-0 overflow-hidden bg-white min-h-[85vh] flex flex-col">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={mobileHero2.url}
          alt="Solyn Global — SEO analyse in Google Search Console"
          className="w-full h-full object-cover"
          decoding="async"
          fetchPriority="high"
        />
        {/* Legibility overlay: near-solid white on mobile, image visible on desktop */}
        <div className="absolute inset-0 bg-white/92 md:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent md:from-transparent md:via-transparent md:to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 w-fit"
        >
          <Search className="w-3.5 h-3.5" />
          SEO & Webdesign Bureau — Tongeren · Bilzen · Hoeselt · Limburg
        </motion.div>


        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black md:text-white tracking-tight leading-[1.06] max-w-3xl"
        >
          Website laten maken in Limburg.
          <span className="text-gray-500 md:text-white"> Wij ranken uw bedrijf hoger op Google.</span>
        </motion.h1>

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
            onClick={() => navigate("/webdesign-limburg")}
            className="rounded-full border-gray-300 text-black hover:bg-gray-50 font-medium px-7 py-6 text-base"
          >
            Uw regio bekijken
          </Button>
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700"
        >
          {["SEO-First Webdesign", "Tongeren · Bilzen · Hoeselt · Limburg", "Maandelijks meetbaar rapport", "Geoptimaliseerd voor Google.be"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-lg"
        >
          {STATS.map((s, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-bold text-black tracking-tight">{s.value}</div>
              <div className="text-xs text-gray-600 mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Showcase scroll */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-16 w-full overflow-hidden"
      >
        <div className="flex gap-5 animate-infinite-scroll w-max">
          <div className="flex-shrink-0 w-[320px] sm:w-[480px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
            <img
              src={mobileHero2.url}
              alt="Solyn Global — SEO analyse in Google Search Console"
              className="w-full aspect-[4/3] object-cover"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          {[...showcaseItems, ...showcaseItems].map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[320px] sm:w-[480px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
              <img src={item.img} alt={item.alt} className="w-full h-auto object-cover" decoding="async" fetchPriority={i < 3 ? "high" : "auto"} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HomeHero;
