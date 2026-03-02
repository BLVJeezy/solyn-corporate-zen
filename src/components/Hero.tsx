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
    <section id="home" className="min-h-[70vh] md:min-h-[90vh] flex items-end md:items-center bg-background pt-20 pb-12 md:pt-24 md:pb-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-10">
            <span className="text-xs md:text-sm font-medium text-foreground">
              Official <strong>Gold</strong> Partner of <strong>Lovable</strong>
            </span>
            <img src={lovableLogo} alt="Lovable" className="w-4 h-4 rounded-sm" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-[hsl(var(--gradient-from))] via-[hsl(var(--gradient-via))] to-[hsl(var(--gradient-to))] bg-clip-text text-transparent">{t("hero.title1")}</span>{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--gradient-from))] via-[hsl(var(--gradient-via))] to-[hsl(var(--gradient-to))] bg-clip-text text-transparent">{t("hero.title2")}</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-xl">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-full w-full sm:w-auto"
              onClick={() => navigate("/book")}
            >
              <ArrowRight className="mr-2 w-4 h-4" />
              {t("hero.cta1")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-accent px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-full w-full sm:w-auto"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("hero.cta2")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
