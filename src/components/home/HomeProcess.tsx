import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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
  return (
    <section className="relative overflow-hidden">
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
              className="sticky"
              style={{ top: `${80 + i * 32}px` }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-6xl mx-auto mb-6"
              >
                <div
                  className="rounded-3xl bg-white p-8 md:p-12 shadow-2xl shadow-black/10"
                  style={{
                    transform: `scale(${1 - i * 0.01})`,
                  }}
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
                    {/* Visual placeholder */}
                    <div className="rounded-2xl bg-gray-50 border border-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
                      <div className="w-4/5 h-4/5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                        <step.icon className="w-10 h-10 text-gray-200" />
                      </div>
                    </div>
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
