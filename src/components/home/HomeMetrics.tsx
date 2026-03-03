import { motion } from "framer-motion";
import { PLACEHOLDER_LOGOS } from "./placeholders";

const metrics = [
  { value: "50+", label: "Products Built" },
  { value: "€2M+", label: "Client Revenue Generated" },
  { value: "80+", label: "Trusted by Founders" },
];

const HomeMetrics = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-5xl md:text-6xl font-bold text-white tracking-tight">{m.value}</p>
            <p className="text-white/40 text-sm mt-2 uppercase tracking-wider">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Logo strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-8"
      >
        {PLACEHOLDER_LOGOS.map((name, i) => (
          <div
            key={i}
            className="px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-white/30 text-xs font-medium tracking-wider uppercase"
          >
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HomeMetrics;
