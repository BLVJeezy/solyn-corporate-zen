import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import lovableLogo from "@/assets/lovable-logo.png";

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="home" className="min-h-[70vh] md:min-h-[90vh] flex items-center bg-[hsl(0_0%_7%)] pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center">



          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.15] tracking-tight mb-6 md:mb-10">
            {t("hero.subtitle")}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-white text-[hsl(0_0%_7%)] hover:bg-white/90 font-medium px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-full w-full sm:w-auto"
              onClick={() => navigate("/book")}>
              <ArrowRight className="mr-2 w-4 h-4" />
              {t("hero.cta1")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-full w-full sm:w-auto"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
              {t("hero.cta2")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default Hero;