import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Sprints",
    subtitle: "2-Week Sprints",
    price: "€4,500",
    period: "/ Bi-Weekly",
    cta: "Book a Call",
    href: "/book",
    features: [
      "AI developer team",
      "Unlimited revisions",
      "Product strategy & roadmap",
      "Integrations & APIs",
      "Communication via Slack",
      "Weekly progress updates",
      "Pause or cancel anytime",
    ],
  },
  {
    name: "MVP Development",
    subtitle: "We deliver an MVP in 2 weeks",
    price: "€9,500",
    period: "/ One-time",
    cta: "Get Started Today",
    href: "/book",
    highlight: true,
    features: [
      "Functional MVP built with Lovable",
      "Database + API integrations",
      "User auth & onboarding",
      "Product design components",
      "Communication via Slack",
      "Weekly progress updates",
      "Pause or cancel anytime",
    ],
  },
];

const HomePricing = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Our Pricing</h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">
            Your own fractionalized team, with flexible pricing. No contract term.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rounded-2xl border p-8 flex flex-col transition-all ${
                plan.highlight
                  ? "border-white/[0.12] bg-white/[0.04]"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              <p className="text-white/50 text-sm font-medium uppercase tracking-wider">{plan.name}</p>
              <p className="text-white/60 text-sm mt-1">{plan.subtitle}</p>
              <div className="mt-6 mb-8">
                <span className="text-4xl md:text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-white/40 text-sm ml-1">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-white/50">
                    <Check className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate(plan.href)}
                className={`rounded-full font-medium py-6 ${
                  plan.highlight
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/[0.08] text-white hover:bg-white/[0.12] border border-white/[0.1]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePricing;
