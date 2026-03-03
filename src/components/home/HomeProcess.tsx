import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section className="relative overflow-hidden">
      {/* Top fade */}
      <div className="h-24 bg-gradient-to-b from-white to-black" />
      {/* Gradient background */}
      <div className="bg-gradient-to-b from-black via-purple-900 to-blue-600 py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            How we work?{" "}
            <span className="text-white/50">
              We simplify complex builds into fast, focused sprints that ship real results every week.
            </span>
          </h2>
        </motion.div>

        {/* White card container */}
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl bg-white p-8 md:p-12 shadow-2xl">
            {/* Step tabs */}
            <div className="flex gap-2 overflow-x-auto mb-10 pb-2">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    active === i
                      ? "bg-gray-100 text-black"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  {s.tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-10 items-center"
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-black mb-5 leading-tight">
                    {current.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-base">{current.text}</p>
                </div>
                {/* Visual placeholder */}
                <div className="rounded-2xl bg-gray-50 border border-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
                  <div className="w-4/5 h-4/5 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                    <current.icon className="w-10 h-10 text-gray-200" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Bottom fade */}
      <div className="h-24 bg-gradient-to-b from-blue-600 to-white" />
    </section>
  );
};

export default HomeProcess;
