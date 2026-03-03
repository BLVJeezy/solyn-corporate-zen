import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PLACEHOLDER_CASE_STUDIES } from "./placeholders";

const HomeWork = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Explore work</h2>
            <p className="text-white/40 mt-3 max-w-lg">
              We build polished, production-ready apps that look great and scale fast.
            </p>
          </motion.div>
          <Button
            variant="outline"
            onClick={() => navigate("/portfolio")}
            className="rounded-full border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] font-medium"
          >
            View all work
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PLACEHOLDER_CASE_STUDIES.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate("/portfolio")}
              className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${cs.color} flex items-center justify-center`}>
                <div className="w-3/4 h-3/4 rounded-xl bg-white/[0.05] border border-white/[0.06] transition-transform group-hover:scale-[1.02]" />
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-lg">{cs.title}</h3>
                <p className="text-white/40 text-sm mt-2 leading-relaxed">{cs.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeWork;
