import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutHero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="bg-black min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.15]"
        >
          {t("aboutHero.headline")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <Button
            onClick={() => navigate("/book")}
            className="rounded-full bg-white text-black hover:bg-white/90 font-medium px-7 py-6 text-base gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            {t("aboutHero.cta1")}
          </Button>
          <Button
            onClick={() => navigate("/pricing")}
            className="rounded-full bg-white/10 text-white hover:bg-white/20 border-0 font-medium px-7 py-6 text-base"
          >
            {t("aboutHero.cta2")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
