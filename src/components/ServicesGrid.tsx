import { Code, Building2, Users } from "lucide-react";
import { motion } from "framer-motion";

const services = [
{
  icon: Code,
  title: "Web Development",
  description: "Professionele websites en webapplicaties op maat, gebouwd met de nieuwste technologieën voor optimale prestaties."
},
{
  icon: Building2,
  title: "Infrastructure",
  description: "End-to-end infrastructuuroplossingen die de basis leggen voor duurzame groei en operationele efficiëntie."
},
{
  icon: Users,
  title: "Consultancy",
  description: "Strategisch advies op maat dat uw organisatie begeleidt van visie naar realisatie."
}];


const ServicesGrid = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Onze <span className="text-gradient-gold">Diensten</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">wij bieden complete oplossingen voor uw onderneming.

          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) =>
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="group relative rounded-lg border border-border bg-card p-8 hover:border-steel/50 transition-all duration-300 hover:shadow-lg">

              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default ServicesGrid;