import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import lovableLogo from "@/assets/solyn-icon.svg";

// Import showcase images
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

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-28 md:pt-36 pb-0 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            Official <span className="font-semibold text-black">Gold</span> Partner of
            <img src={lovableLogo} alt="Lovable" className="h-5 w-auto" fetchPriority="high" decoding="async" />
            <span className="font-bold text-black">Lovable</span>
          </div>
        </motion.div>

        {/* Headline — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-black tracking-tight leading-[1.2]">
            Turn your idea into a ready to<br className="hidden sm:block" /> launch MVP in 2-weeks
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-gray-500 text-base sm:text-lg max-w-xl mt-6 leading-relaxed"
        >
          The #1 AI product studio — trusted by startups and founders to design, build, and launch products that scale.
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
            Book a Call
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/pricing")}
            className="rounded-full border-gray-300 text-black hover:bg-gray-50 font-medium px-7 py-6 text-base"
          >
            View Pricing
          </Button>
        </motion.div>
      </div>

      {/* Infinite scroll product showcase */}
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
