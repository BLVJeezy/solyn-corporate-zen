import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const TrustBar = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "50+", labelKey: "trust.projects" },
    { value: "98%", labelKey: "trust.clients" },
    { value: "48h", labelKey: "trust.delivery" },
    { value: "24/7", labelKey: "trust.support" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-12 tracking-wide">
          {t("trust.heading")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold mb-3">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;