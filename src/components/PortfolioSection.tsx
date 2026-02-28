import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";

const projects = [
  {
    image: portfolio1,
    title: "Belgomed BV",
    category: "Medische Groothandel",
    description: "Corporate website met GDP & WDA certificering integratie.",
  },
  {
    image: portfolio2,
    title: "Shinelab Detailing",
    category: "Automotive Detailing",
    description: "Lead-generatie platform met offerte-aanvraag systeem.",
  },
  {
    image: portfolio3,
    title: "L'atelier 9",
    category: "Beauty & Wellness",
    description: "Elegant brand platform voor premium nail art studio.",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-gold font-medium">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            Recente Projecten
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Een selectie van onze meest recente samenwerkingen en resultaten.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-xl overflow-hidden border border-border/50 bg-card hover:border-gold/40 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-gold/80 font-medium">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
