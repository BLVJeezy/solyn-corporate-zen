import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("portfolio.heading")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-medium">
                    {t(project.categoryKey)}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mt-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-lg">
                    {t(project.descKey)}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 hidden md:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;