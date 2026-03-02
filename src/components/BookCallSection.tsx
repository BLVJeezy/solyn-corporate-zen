import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const BookCallSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section id="book" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card p-8 md:p-16 max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {t("book.heading")}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
            {t("book.subtitle")}
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-8 py-6 text-base"
            onClick={() => navigate("/book")}
          >
            <ArrowRight className="mr-2 w-4 h-4" />
            {t("book.cta")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookCallSection;
