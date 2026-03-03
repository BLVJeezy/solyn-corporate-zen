import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Code2, Map, Cpu, MessageCircle, PauseCircle } from "lucide-react";

const steps = [
  {
    icon: Code2,
    tab: "Build",
    title: "Build your MVP in just 2 weeks",
    text: "We start by designing and developing the core functionality to validate your concept fast — so you can prove traction before investing big.",
  },
  {
    icon: Map,
    tab: "Iterate",
    title: "Set your roadmap and milestones",
    text: "We help you prioritize features, set weekly milestones, and iterate based on real user feedback. Stay on track, ship fast.",
  },
  {
    icon: Cpu,
    tab: "Grow",
    title: "Move faster with AI-powered tools",
    text: "We leverage cutting-edge AI tools like Lovable, Cursor, and Supabase to deliver 10x faster than traditional development.",
  },
  {
    icon: MessageCircle,
    tab: "Collaborate",
    title: "Stay flexible with async collaboration",
    text: "Communicate via Slack, get weekly updates, and provide feedback asynchronously. No unnecessary meetings or time zone friction.",
  },
  {
    icon: PauseCircle,
    tab: "Pause or Cancel",
    title: "Pause or cancel anytime",
    text: "No contracts, no lock-in. Pause your subscription when you need a break, or cancel anytime. Your code is always yours.",
  },
];

const HomeProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(steps.length - 1, Math.floor(v * steps.length));
    setActive(idx);
  });

  return (
    <section className="relative overflow-hidden">
      {/* Top fade */}
      <div className="h-24 bg-gradient-to-b from-white to-black" />

      {/* Scrollable container — each step gets ~100vh of scroll space */}
      <div ref={containerRef} style={{ height: `${steps.length * 100}vh` }} className="relative">
        {/* Sticky wrapper that stays in view while scrolling */}
        <div className="sticky top-0 h-screen bg-gradient-to-b from-black via-purple-900 to-blue-600 flex flex-col justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              How we work?{" "}
              <span className="text-white/50">
                We simplify complex builds into fast, focused sprints that ship real results every week.
              </span>
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto w-full">
            <div className="rounded-3xl bg-white p-8 md:p-12 shadow-2xl">
              {/* Progress dots / tabs */}
              <div className="flex gap-2 overflow-x-auto mb-10 pb-2">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      active === i
                        ? "bg-gray-100 text-black"
                        : "text-gray-400"
                    }`}
                  >
                    <s.icon className="w-4 h-4" />
                    {s.tab}
                  </div>
                ))}
              </div>

              {/* Content — animate on active change */}
              <div className="grid md:grid-cols-2 gap-10 items-center min-h-[280px]">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-black mb-5 leading-tight">
                    {steps[active].title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-base">{steps[active].text}</p>
                </motion.div>
                <motion.div
                  key={`icon-${active}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl bg-gray-50 border border-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden"
                >
                  <div className="w-4/5 h-4/5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                    {(() => { const Icon = steps[active].icon; return <Icon className="w-10 h-10 text-gray-200" />; })()}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="h-24 bg-gradient-to-b from-blue-600 to-white" />
    </section>
  );
};

export default HomeProcess;
