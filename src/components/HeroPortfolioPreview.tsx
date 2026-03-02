import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";

const HeroPortfolioPreview = () => {
  return (
    <section className="pb-12 md:pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden bg-[hsl(0,0%,8%)] aspect-[4/3] relative group">

            <img
              src={portfolio1}
              alt="Belgomed BV"
              className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              loading="lazy" />

            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%)] via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden bg-[hsl(0,0%,8%)] aspect-[4/3] relative group">

            <img
              src={portfolio2}
              alt="Shinelab Detailing"
              className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              loading="lazy" />

            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%)] via-transparent to-transparent" />
            







          </motion.div>
        </div>
      </div>
    </section>);

};

export default HeroPortfolioPreview;