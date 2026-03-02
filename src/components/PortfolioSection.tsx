import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

interface Project {
  image: string;
  title: string;
  descKey: string;
}

const PortfolioSection = () => {
  const { t } = useLanguage();

  // Projects array - add new projects here
  const projects: Project[] = [];

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
            {t("portfolio.heading")}
          </h2>
          <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-2xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden bg-muted/30 border border-border aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-foreground">{project.title.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{t(project.descKey)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
