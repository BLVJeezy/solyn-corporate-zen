import { motion } from "framer-motion";
import { PLACEHOLDER_TESTIMONIALS } from "./placeholders";

const HomeTestimonials = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-tight max-w-2xl mx-auto">
          Trusted by industry leaders.{" "}
          <span className="text-gray-400">Hear what clients are saying about Process.</span>
        </h2>
      </motion.div>

      {/* Horizontal scroll cards */}
      <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
        <div className="flex gap-5 w-max pb-4">
          {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="w-[340px] flex-shrink-0 rounded-2xl border border-gray-100 bg-white p-7 flex flex-col"
            >
              <p className="text-black text-sm leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-black text-sm font-medium">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.title}</p>
                  </div>
                </div>
                <span className="text-gray-200 text-xs font-semibold tracking-wider uppercase">
                  {t.title.split("@")[1] || "Client"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HomeTestimonials;
