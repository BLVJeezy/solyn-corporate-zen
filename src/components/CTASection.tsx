import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/50 rounded-3xl py-16 md:py-24 px-6 text-center max-w-5xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
            {t("cta.heading")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full px-8 py-6"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("cta.contact")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-accent rounded-full px-8 py-6"
              onClick={() => navigate("/book")}
            >
              {t("cta.book")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
