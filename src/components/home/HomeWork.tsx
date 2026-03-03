import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import portfolioSheff from "@/assets/portfolio-shefftrades.png";
import portfolioLeplana from "@/assets/portfolio-leplana.png";
import portfolioMomentum from "@/assets/portfolio-momentumos-1.png";

const cases = [
  {
    title: "SheffTrades",
    desc: "AI-powered trade management. Standardizing workflows across the industry.",
    img: portfolioSheff,
    icon: "S",
    iconBg: "bg-gray-900",
  },
  {
    title: "LePlana",
    desc: "Where event planners manage, collaborate and scale seamlessly.",
    img: portfolioLeplana,
    icon: "L",
    iconBg: "bg-emerald-600",
  },
  {
    title: "MomentumOS",
    desc: "The gamified engine powering data-driven growth intelligence.",
    img: portfolioMomentum,
    icon: "M",
    iconBg: "bg-purple-600",
  },
];

const HomeWork = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tight">Explore work</h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            We build polished, production-ready apps that look great and scale fast.
          </p>
          <Button
            onClick={() => navigate("/portfolio")}
            className="rounded-full bg-black text-white hover:bg-black/90 font-medium mt-6 gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            View all work
          </Button>
        </motion.div>

        {/* Case cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate("/portfolio")}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 mb-5">
                <img
                  src={cs.img}
                  alt={cs.title}
                  className="w-full aspect-[4/3] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              {/* Info */}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${cs.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-bold">{cs.icon}</span>
                </div>
                <div>
                  <h3 className="text-black font-semibold text-base">{cs.title}</h3>
                  <p className="text-gray-400 text-sm mt-0.5 leading-relaxed">{cs.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeWork;
