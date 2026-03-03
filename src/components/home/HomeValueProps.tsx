import { motion } from "framer-motion";
import { Cpu, MessagesSquare, Zap } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI Native",
    text: "We leverage cutting-edge AI tools to build faster and smarter. Our AI-native approach means higher quality at a fraction of the cost.",
  },
  {
    icon: MessagesSquare,
    title: "Clear, async collaboration",
    text: "No unnecessary meetings. Communicate via Slack, get weekly updates, and stay in the loop with full transparency.",
  },
  {
    icon: Zap,
    title: "Ship weekly",
    text: "Every week you see real, working progress. No months of waiting — just fast, iterative delivery that keeps you moving.",
  },
];

const HomeValueProps = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-3xl">
          Why subscribe?{" "}
          <span className="text-white/40">
            By the end you'll have a full working product ready to launch to the world.
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mt-14">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all hover:border-white/[0.1] hover:bg-white/[0.04]"
          >
            <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mb-6">
              <f.icon className="w-5 h-5 text-white/60" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">{f.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{f.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeValueProps;
