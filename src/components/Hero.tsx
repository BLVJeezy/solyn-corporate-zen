import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-[90vh] flex items-center bg-background pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 mb-10">
            <span className="text-sm font-medium text-foreground">
              Official <strong>Gold</strong> Partner of <strong>Lovable</strong>
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight mb-6">
            {t("hero.title1")}{" "}
            {t("hero.title2")}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
            {t("hero.subtitle")}
          </p>

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 py-6 text-base rounded-full"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <ArrowRight className="mr-2 w-4 h-4" />
              {t("hero.cta1")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-accent px-8 py-6 text-base rounded-full"
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
