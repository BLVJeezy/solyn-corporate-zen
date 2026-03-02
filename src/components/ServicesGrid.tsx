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
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4 tracking-tight">
            {t("services.heading1")} <span className="text-gradient-gold">{t("services.heading2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
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
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-lg border border-border bg-card p-8 hover:border-steel/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{t(service.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
