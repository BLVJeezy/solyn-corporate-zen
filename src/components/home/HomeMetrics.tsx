import { motion } from "framer-motion";
import { TrendingUp, Search, Users, Star, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import showcaseBelgomed from "@/assets/showcase-belgomed.png";
import portfolioRiory from "@/assets/portfolio-riory-1.png";
import showcaseAtelier9 from "@/assets/showcase-atelier9.png";

const metrics = [
  {
    icon: TrendingUp,
    value: "14/15",
    label: "Zoekwoorden verbeterd in maand één",
    desc: "Klantcase Riory (loodgieter, Bilzen): 14 van de 15 gemeten zoekwoorden stegen in de eerste maand — het 15e stond al op #1.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Search,
    value: "26",
    label: "Leads gemeten in één maand",
    desc: "Dezelfde klant ging van 0 meetbare leads naar 26 in juni — de eerste volledige maand na de SEO-start.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Users,
    value: "#1",
    label: "In nieuw gebied bij eerste meting",
    desc: "Bij uitbreiding naar Riemst stond de klant direct op positie 1 voor twee kernzoektermen — zonder extra werk.",
    color: "bg-violet-50 text-violet-600",
  },
];

const clients = [
  "Belgomed", "Auto Detailing", "L'Atelier 9", "Le Plan A",
  "Riory", "MomentumOS", "SheffTrades", "La Mama Restaurant",
];

const HomeMetrics = () => {
  return (
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
              className="rounded-2xl bg-gray-50 border border-gray-100 p-8 flex flex-col"
            >
              <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center mb-5`}>
                <m.icon className="w-5 h-5" />
              </div>
              <p className="text-5xl md:text-6xl font-bold text-black tracking-tight mb-2">
                {m.value}
              </p>
              <p className="text-sm font-semibold text-black mb-2">{m.label}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm mb-8">Vertrouwd door Belgische bedrijven en ondernemers</p>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-12 animate-infinite-scroll whitespace-nowrap">
              {[...clients, ...clients].map((name, i) => (
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
};

export default HomeMetrics;
