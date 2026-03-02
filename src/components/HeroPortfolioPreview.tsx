import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";

const HeroPortfolioPreview = () => {
  return (
    <section className="pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden bg-[hsl(0,0%,8%)] aspect-[4/3] relative group"
          >
            <img
              src={portfolio1}
              alt="Belgomed BV"
              className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%)] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <span className="text-xs uppercase tracking-widest text-[hsl(0,0%,60%)] font-medium">
                Medisch Platform
              </span>
              <h3 className="text-lg font-semibold text-[hsl(0,0%,97%)] mt-1">
                Belgomed BV
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden bg-[hsl(0,0%,8%)] aspect-[4/3] relative group"
          >
            <img
              src={portfolio2}
              alt="Shinelab Detailing"
              className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,4%)] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <span className="text-xs uppercase tracking-widest text-[hsl(0,0%,60%)] font-medium">
                Automotive
              </span>
              <h3 className="text-lg font-semibold text-[hsl(0,0%,97%)] mt-1">
                Shinelab Detailing
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroPortfolioPreview;
