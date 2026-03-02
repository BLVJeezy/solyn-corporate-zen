import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WhyUsSection = () => {
  const { t } = useLanguage();

  const painPoints = [
    "whyUs.pain1",
    "whyUs.pain2",
    "whyUs.pain3",
    "whyUs.pain4",
  ];

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl space-y-6">
        {/* Design matters card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card p-6 md:p-14 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            {t("whyUs.designTitle")}
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed max-w-lg mx-auto">
            {t("whyUs.designDesc")}
          </p>
        </motion.div>

        {/* Say no more to + Operate with freedom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 md:p-14"
        >
          <div className="bg-background rounded-xl border border-border p-6 md:p-8 max-w-md">
            <h3 className="text-xl font-semibold text-foreground mb-5">
              {t("whyUs.noMoreTitle")}
            </h3>
            <ul className="space-y-3.5">
              {painPoints.map((key) => (
                <li key={key} className="flex items-center gap-3 text-foreground">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <X className="w-4 h-4 text-destructive" />
                  </span>
                  <span className="font-medium">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              {t("whyUs.freedomTitle")}
            </h3>
            <p className="text-muted-foreground mt-4 leading-relaxed max-w-lg mx-auto">
              {t("whyUs.freedomDesc")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
