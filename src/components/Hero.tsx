import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground">
              Official <span className="font-semibold text-foreground">Gold</span> Partner of Lovable
            </span>
          </motion.div>

          {/* Main headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] tracking-tight mb-8">
            {t("hero.title1")}{" "}
            <span className="text-gradient-gold">{t("hero.title2")}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            {t("hero.subtitle")}
          </p>

          {/* Pricing anchor */}
          <div className="flex items-center gap-4 mb-10 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">MVP Launch: <span className="text-gradient-gold font-bold">€2,000</span></span>
            <span className="w-px h-4 bg-border" />
            <span className="font-medium text-foreground">48h Sprints: <span className="text-gradient-gold font-bold">€250</span></span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a href="#contact">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 py-6 text-base rounded-full"
              >
                <ArrowRight className="mr-2 w-5 h-5" />
                {t("hero.cta1")}
              </Button>
            </a>
            <a href="#pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-card px-8 py-6 text-base rounded-full"
              >
                {t("hero.cta2")}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default Hero;