import { motion } from "framer-motion";
import { Code2, Map, Cpu, MessageCircle } from "lucide-react";
import showcaseMvpBuilder from "@/assets/showcase-mvp-builder.png";
import showcaseRoadmap from "@/assets/showcase-roadmap.png";
import showcaseAtelier9 from "@/assets/showcase-atelier9.png";
import showcaseTaskboard from "@/assets/showcase-taskboard.png";
import iconSupabase from "@/assets/icon-supabase.svg";
import iconCursor from "@/assets/icon-cursor.svg";
import iconLovable from "@/assets/icon-lovable.svg";
import { useLanguage } from "@/i18n/LanguageContext";

const toolIcons = [
  { src: iconLovable, alt: "Lovable" },
  { src: iconCursor, alt: "Cursor" },
  { src: iconSupabase, alt: "Supabase" },
];

const imageAnimations = [
  { initial: { opacity: 0, x: 80, rotate: 3 }, animate: { opacity: 1, x: 0, rotate: 0 } },
  { initial: { opacity: 0, x: -80, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 } },
  {},
  { initial: { opacity: 0, x: 60, y: 40, rotate: -2 }, animate: { opacity: 1, x: 0, y: 0, rotate: 0 } },
];

const HomeProcess = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Code2,
      tabKey: "homeProcess.build.tab",
      titleKey: "homeProcess.build.title",
      textKey: "homeProcess.build.text",
      image: showcaseMvpBuilder,
    },
    {
      icon: Map,
      tabKey: "homeProcess.iterate.tab",
      titleKey: "homeProcess.iterate.title",
      textKey: "homeProcess.iterate.text",
      image: showcaseRoadmap,
    },
    {
      icon: MessageCircle,
      tabKey: "homeProcess.collaborate.tab",
      titleKey: "homeProcess.collaborate.title",
      textKey: "homeProcess.collaborate.text",
      image: showcaseTaskboard,
    },
  ];

  return (
    <section className="relative overflow-x-clip">
      {/* Top fade */}
      <div className="h-32 bg-gradient-to-b from-white via-white to-transparent relative z-10" />

      {/* Gradient background */}
      <div className="relative bg-gradient-to-b from-purple-500 via-purple-900 to-blue-600">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center pt-16 pb-20 px-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {t("homeProcess.heading")}{" "}
            <span className="text-white/50">
              {t("homeProcess.headingGray")}
            </span>
          </h2>
        </motion.div>

        {/* Stacking cards */}
        <div className="relative px-4 md:px-6 pb-24">
          {steps.map((step, i) => (
            <div
              key={i}
              className="sticky min-h-[auto] md:h-[80vh]"
              style={{ top: `${60 + i * 24}px`, zIndex: i + 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-6xl mx-auto"
              >
                <div className="rounded-3xl bg-white p-6 md:p-12 shadow-[0_-8px_30px_-6px_rgba(0,0,0,0.15),0_8px_30px_-6px_rgba(0,0,0,0.1)] origin-top overflow-hidden">
                  {/* Tab label */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-gray-500" />
                    </span>
                    <span className="text-sm font-medium text-gray-500">{t(step.tabKey)}</span>
                  </div>

                  {/* Content */}
                  <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-start">
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight break-words">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-md">
                        {t(step.textKey)}
                      </p>
                    </div>
                    {/* Visual */}
                    <motion.div
                      initial={imageAnimations[i]?.initial}
                      whileInView={imageAnimations[i]?.animate}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                      className="rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shadow-sm"
                    >
                      <img
                          src={step.image}
                          alt={t(step.tabKey)}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="h-32 bg-gradient-to-b from-blue-600 via-transparent to-white" />
    </section>
  );
};

export default HomeProcess;
