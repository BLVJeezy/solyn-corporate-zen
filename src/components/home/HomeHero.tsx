import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { PLACEHOLDER_PRODUCTS } from "./placeholders";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-8 overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <Badge
            variant="outline"
            className="rounded-full border-white/10 bg-white/[0.04] text-white/60 px-4 py-1.5 text-sm font-normal gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Official Gold Partner of Lovable
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05]">
            Turn your idea into a{" "}
            <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
              ready-to-launch MVP
            </span>{" "}
            in 2 weeks
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center text-white/40 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          We're an AI-native product studio trusted by startups and founders to ship polished, production-ready software — fast.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          <Button
            onClick={() => navigate("/book")}
            className="rounded-full bg-white text-black hover:bg-white/90 font-medium px-8 py-6 text-base"
          >
            Book a Call
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/pricing")}
            className="rounded-full border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] font-medium px-8 py-6 text-base"
          >
            View Pricing
          </Button>
        </motion.div>
      </div>

      {/* Products Built Rail */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-20 w-full"
      >
        <p className="text-center text-xs uppercase tracking-[0.2em] text-white/30 mb-6">
          Products Built
        </p>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-6 pb-4 w-max">
            {PLACEHOLDER_PRODUCTS.map((p, i) => (
              <div
                key={i}
                className="group relative w-[280px] sm:w-[320px] flex-shrink-0 rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden transition-all hover:border-white/[0.12] hover:bg-white/[0.05]"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-white/[0.05] to-transparent flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-xl bg-white/[0.04] border border-white/[0.06]" />
                </div>
                <div className="p-4">
                  <p className="text-white/70 text-sm font-medium">{p.title}</p>
                  <p className="text-white/30 text-xs mt-1">{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeHero;
