import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Map, Cpu, MessageCircle, PauseCircle } from "lucide-react";

const steps = [
  {
    icon: Rocket,
    tab: "Build",
    title: "Build your MVP in just 2 weeks",
    text: "We take your idea from concept to a fully functional product. Rapid prototyping, real code, production-ready from day one.",
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
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-3xl">
            How we work?{" "}
            <span className="text-white/40">
              We simplify complex builds into fast, focused sprints that ship real results every week.
            </span>
          </h2>
        </motion.div>

        <div className="mt-12 flex flex-col lg:flex-row gap-8">
          {/* Tab nav */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:w-56 flex-shrink-0">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  active === i
                    ? "bg-white/[0.08] text-white border border-white/[0.1]"
                    : "text-white/40 hover:text-white/60 hover:bg-white/[0.03]"
                }`}
              >
                <s.icon className="w-4 h-4 flex-shrink-0" />
                {s.tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-8 h-full"
              >
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{current.title}</h3>
                  <p className="text-white/40 leading-relaxed">{current.text}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center min-h-[240px]">
                  <div className="text-center p-8">
                    <current.icon className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/20 text-sm">Visual placeholder</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProcess;
