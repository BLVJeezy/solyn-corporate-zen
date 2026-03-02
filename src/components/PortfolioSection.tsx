import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";
import { useLanguage } from "@/i18n/LanguageContext";

const PortfolioSection = () => {
  const { t } = useLanguage();

  const projects = [
    { image: portfolio1, title: "Belgomed BV", categoryKey: "portfolio.p1.category", descKey: "portfolio.p1.desc" },
    { image: portfolio2, title: "Shinelab Detailing", categoryKey: "portfolio.p2.category", descKey: "portfolio.p2.desc" },
    { image: portfolio3, title: "L'atelier 9", categoryKey: "portfolio.p3.category", descKey: "portfolio.p3.desc" },
  ];

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
            {t("portfolio.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-2 tracking-tight">
            {t("portfolio.heading")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-foreground/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {t(project.categoryKey)}
                </span>
                <h3 className="text-base font-semibold text-foreground mt-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t(project.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
