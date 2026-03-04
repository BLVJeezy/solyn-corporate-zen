import { motion } from "framer-motion";
import { Search, Map, Rocket } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ProcessSection = () => {
  const { t } = useLanguage();

  const steps = [
    { number: "01", titleKey: "process.step1.title", descKey: "process.step1.desc", icon: Search },
    { number: "02", titleKey: "process.step2.title", descKey: "process.step2.desc", icon: Map },
    { number: "03", titleKey: "process.step3.title", descKey: "process.step3.desc", icon: Rocket },
  ];

  return (
    <section className="py-24 bg-[hsl(0_0%_7%)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t("process.heading1")} {t("process.heading2")}
          </h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto leading-relaxed">
            {t("process.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative rounded-2xl border border-[hsl(40_48%_56%_/_0.2)] bg-[hsl(0_0%_10%)] p-8 md:p-10 overflow-hidden shadow-[0_0_20px_-5px_hsl(40_48%_56%_/_0.15)]"
            >
              {/* Gold glow gradient */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_hsl(40_48%_56%_/_0.1),_transparent_60%)] group-hover:bg-[radial-gradient(ellipse_at_bottom_left,_hsl(40_48%_56%_/_0.18),_transparent_60%)] transition-all duration-500" />

              <div className="relative">
                {/* Number + Icon row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-b from-[hsl(40_48%_56%)] to-[hsl(210_15%_70%)] bg-clip-text text-transparent">
                    {step.number}
                  </span>
                  <step.icon className="w-6 h-6 text-white/30" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">
                  {t(step.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
