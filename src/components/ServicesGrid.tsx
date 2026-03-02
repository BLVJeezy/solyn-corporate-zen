import { Code, Building2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const ServicesGrid = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Code, titleKey: "services.web.title", descKey: "services.web.desc" },
    { icon: Building2, titleKey: "services.infra.title", descKey: "services.infra.desc" },
    { icon: Users, titleKey: "services.consult.title", descKey: "services.consult.desc" },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            {t("services.heading1")} {t("services.heading2")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-8 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-6">
                <service.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{t(service.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
