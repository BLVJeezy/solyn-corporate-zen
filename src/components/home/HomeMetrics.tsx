import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import portfolioBelgomed from "@/assets/portfolio-1.png";
import portfolioRiory from "@/assets/portfolio-riory-1.png";
import portfolioAtelier9 from "@/assets/portfolio-3.png";



const portfolioPreview = [
  {
    name: "Belgomed BV",
    category: "Webdesign & SEO",
    img: portfolioBelgomed,
    bg: "#0a2622",
  },
  {
    name: "Riory BV",
    category: "Lokale SEO",
    img: portfolioRiory,
    bg: "#0a0a0a",
  },
  {
    name: "L'atelier 9",
    category: "Webdesign",
    img: portfolioAtelier9,
    bg: "#f0eeeb",
  },
];

const HomeMetrics = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Portfolio preview */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-emerald-600 text-sm font-semibold mb-2">Recent werk</p>
              <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                Websites die resultaat boeken
              </h2>
            </div>
            <button
              onClick={() => navigate("/portfolio")}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
            >
              Bekijk portfolio <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {portfolioPreview.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => navigate("/portfolio")}
                className="group cursor-pointer"
              >
                <div className="rounded-2xl overflow-hidden border border-gray-100 mb-4" style={{ background: item.bg }}>
                  <img
                    src={item.img}
                    alt={`Portfolio voorbeeld ${item.name}`}
                    className="w-full aspect-[4/3] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-black font-semibold text-base">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.category}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <button
              onClick={() => navigate("/portfolio")}
              className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
            >
              Bekijk portfolio <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeMetrics;
