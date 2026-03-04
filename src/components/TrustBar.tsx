import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const TrustBar = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "200+", label: "Products Built" },
    { value: "100%", label: "Satisfied clients" },
    { value: "12+", label: "Countries" },
  ];

  return (
    <section className="py-16 bg-[hsl(0_0%_7%)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[hsl(0_0%_12%)] border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <div className="text-sm text-white/60 mb-8 md:mb-12">{t(stat.labelKey)}</div>
              <div className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-[hsl(40_48%_56%)] to-[hsl(210_15%_70%)] bg-clip-text text-transparent">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
