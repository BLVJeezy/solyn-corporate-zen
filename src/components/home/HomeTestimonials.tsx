import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { PLACEHOLDER_TESTIMONIALS } from "./placeholders";

const HomeTestimonials = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Trusted by industry leaders
        </h2>
        <p className="text-white/40 mt-4">Hear what clients are saying about working with us.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col hover:border-white/[0.1] transition-all"
          >
            <Quote className="w-5 h-5 text-white/15 mb-4" />
            <p className="text-white/60 text-sm leading-relaxed flex-1">"{t.quote}"</p>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <div className="w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center text-white/40 text-xs font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">{t.name}</p>
                <p className="text-white/30 text-xs">{t.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeTestimonials;
