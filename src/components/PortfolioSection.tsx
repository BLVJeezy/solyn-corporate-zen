import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";
import portfolioSheff from "@/assets/portfolio-shefftrades.png";

interface Project {
  image: string;
  title: string;
  descKey: string;
}

const PortfolioSection = () => {
  const { t } = useLanguage();

  const projects: Project[] = [
    { image: portfolio1, title: "Belgomed BV", descKey: "portfolio.p1.desc" },
    { image: portfolio2, title: "Shinelab Detailing", descKey: "portfolio.p2.desc" },
    { image: portfolio3, title: "L'atelier 9", descKey: "portfolio.p3.desc" },
    { image: portfolioSheff, title: "Sheff Trades", descKey: "portfolio.p4.desc" },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                {/* Card with bottom glow on hover */}
                <div className="relative rounded-2xl overflow-hidden border border-border/60 aspect-[4/3] bg-muted/20 transition-shadow duration-500 group-hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Bottom light glow on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/60 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Project info below card */}
                <div className="mt-5 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-foreground/[0.06] border border-border/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-foreground">{project.title.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-foreground leading-tight">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t(project.descKey)}</p>
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
