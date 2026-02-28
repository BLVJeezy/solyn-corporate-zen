import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Kennismaking",
    description: "We luisteren naar uw behoeften en analyseren uw huidige situatie grondig.",
  },
  {
    number: "02",
    title: "Strategie",
    description: "Op basis van onze analyse ontwikkelen we een maatwerk strategie en roadmap.",
  },
  {
    number: "03",
    title: "Uitvoering",
    description: "We implementeren de oplossing en begeleiden u bij elke stap van het proces.",
  },
];

const ProcessSection = () => {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ons <span className="text-gradient-gold">Proces</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Een gestructureerde aanpak die resulteert in meetbare resultaten.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center"
              >
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
