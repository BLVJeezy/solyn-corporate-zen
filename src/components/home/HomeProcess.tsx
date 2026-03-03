import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Code2, Map, Cpu, MessageCircle, PauseCircle } from "lucide-react";
import showcaseBelgomed from "@/assets/showcase-belgomed.png";
import showcaseMvpBuilder from "@/assets/showcase-mvp-builder.png";
import showcaseDetailing from "@/assets/showcase-detailing.png";
import showcaseRoadmap from "@/assets/showcase-roadmap.png";
import showcaseShefftrades from "@/assets/portfolio-shefftrades.png";
import showcaseAtelier9 from "@/assets/showcase-atelier9.png";
import showcaseMomentum from "@/assets/showcase-momentumos.png";
import showcaseTaskboard from "@/assets/showcase-taskboard.png";
import showcaseLeplana from "@/assets/showcase-leplana.png";
import iconSupabase from "@/assets/icon-supabase.svg";
import iconCursor from "@/assets/icon-cursor.svg";
import iconLovable from "@/assets/icon-lovable.svg";

const toolIcons = [
  { src: iconLovable, alt: "Lovable" },
  { src: iconCursor, alt: "Cursor" },
  { src: iconSupabase, alt: "Supabase" },
];

const imageAnimations = [
  { initial: { opacity: 0, x: 80 }, animate: { opacity: 1, x: 0 } },       // slide from right
  { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } },      // slide from left
  {},                                                                         // toolScroll card — no image anim
  { initial: { opacity: 0, x: 60, y: 40 }, animate: { opacity: 1, x: 0, y: 0 } }, // slide from bottom-right
];

const steps = [
  {
    icon: Code2,
    tab: "Build",
    title: "Build your MVP in just 2 weeks",
    text: "We start by designing and developing the core functionality to validate your concept fast — so you can prove traction before investing big.",
    image: showcaseMvpBuilder,
  },
  {
    icon: Map,
    tab: "Iterate",
    title: "Set your roadmap and milestones",
    text: "We help you prioritize features, set weekly milestones, and iterate based on real user feedback. Stay on track, ship fast.",
    image: showcaseRoadmap,
  },
  {
    icon: Cpu,
    tab: "Grow",
    title: "Move faster with AI-powered tools",
    text: "We leverage cutting-edge AI tools like Lovable, Cursor, and Supabase to deliver 10x faster than traditional development.",
    image: showcaseAtelier9,
    toolScroll: true,
  },
  {
    icon: MessageCircle,
    tab: "Collaborate",
    title: "Stay flexible with async collaboration",
    text: "Communicate via Slack, get weekly updates, and provide feedback asynchronously. No unnecessary meetings or time zone friction.",
    image: showcaseTaskboard,
  },
];

const HomeProcess = () => {
  return (
    <section className="relative overflow-x-clip">
      {/* Top fade */}
      <div className="h-32 bg-gradient-to-b from-white via-white to-transparent relative z-10" />

      {/* Gradient background that spans behind all cards */}
      <div className="relative bg-gradient-to-b from-purple-500 via-purple-900 to-blue-600">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center pt-16 pb-20 px-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            How we work?{" "}
            <span className="text-white/50">
              We simplify complex builds into fast, focused sprints that ship real results every week.
            </span>
          </h2>
        </motion.div>

        {/* Stacking cards */}
        <div className="relative px-4 md:px-6 pb-24">
          {steps.map((step, i) => (
            <div
              key={i}
              className="sticky h-[85vh] md:h-[80vh]"
              style={{ top: `${60 + i * 24}px`, zIndex: i + 1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-6xl mx-auto"
              >
                <div
                  className="rounded-3xl bg-white p-8 md:p-12 shadow-[0_-8px_30px_-6px_rgba(0,0,0,0.15),0_8px_30px_-6px_rgba(0,0,0,0.1)] origin-top"
                >
                  {/* Tab label */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-gray-500" />
                    </span>
                    <span className="text-sm font-medium text-gray-500">{step.tab}</span>
                  </div>

                  {/* Content */}
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-base max-w-md">
                        {step.text}
                      </p>
                    </div>
                    {/* Visual */}
                    {step.toolScroll ? (
                      <div className="rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shadow-sm aspect-[4/3] flex items-center">
                        <div className="w-full overflow-hidden">
                          <div className="flex gap-10 animate-infinite-scroll w-max items-center py-8">
                            {[...toolIcons, ...toolIcons, ...toolIcons, ...toolIcons].map((icon, j) => (
                              <img key={j} src={icon.src} alt={icon.alt} className="h-16 md:h-20 w-auto flex-shrink-0" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        initial={imageAnimations[i]?.initial}
                        whileInView={imageAnimations[i]?.animate}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                        className="rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shadow-sm"
                      >
                        <img
                          src={step.image}
                          alt={step.tab}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </motion.div>
                    )}
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
