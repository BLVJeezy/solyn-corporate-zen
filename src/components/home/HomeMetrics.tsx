import { motion } from "framer-motion";
import { PLACEHOLDER_LOGOS } from "./placeholders";

const metrics = [
  { label: "Products Built", value: "200+", },
  { label: "Satisfied clients", value: "98%", },
  { label: "Countries", value: "12+", },
];

const HomeMetrics = () => (
  <section className="py-20 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl bg-gray-50 border border-gray-100 p-8"
          >
            <p className="text-gray-400 text-sm mb-8">{m.label}</p>
            <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent tracking-tight">
              {m.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Trusted by + Logo strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
      >
        <p className="text-gray-400 text-sm mb-8">Trusted by industry leaders</p>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-12 animate-infinite-scroll whitespace-nowrap">
            {[...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS].map((name, i) => (
              <span
                key={i}
                className="text-gray-300 text-lg font-semibold tracking-wider uppercase flex-shrink-0"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HomeMetrics;
