import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Rocket, Zap } from "lucide-react";

const plans = [
  {
    name: "Sprints",
    subtitle: "2-Week Sprints",
    desc: "For founders or teams who want to move fast — strategy, design, and development executed in 14 days.",
    price: "€4,500",
    period: "/ Bi-Weekly",
    cta: "Book A Call",
    href: "/book",
    dark: false,
    icon: Rocket,
    features: [
      "AI developer team",
      "Unlimited revisions",
      "Product strategy & roadmap",
      "Integrations & API's",
      "Communication via Slack",
      "Weekly progress updates",
    ],
  },
  {
    name: "MVP Development",
    subtitle: "We deliver an MVP in 2 weeks",
    desc: "In 2-weeks you'll have a full working product ready to launch to the world.",
    price: "€9,500",
    period: "/ One-time",
    cta: "Get Started Today",
    href: "/book",
    dark: true,
    icon: Zap,
    features: [
      "Functional MVP built with Lovable",
      "Database + API integrations (Supabase, OpenAI, etc)",
      "User authentication & onboarding flow",
      "Product design components",
      "Communication via Slack",
      "Weekly progress updates",
    ],
  },
];

const HomePricing = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-tight">
            Our Pricing.{" "}
            <span className="text-gray-400">
              Your own fractionalized team, with flexible pricing. No contract term.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rounded-2xl border p-8 flex flex-col ${
                plan.dark
                  ? "bg-gray-900 border-gray-800 text-white"
                  : "bg-white border-gray-200 text-black"
              }`}
            >
              {/* Icon + name */}
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  plan.dark
                    ? "bg-gradient-to-br from-purple-500 to-blue-500"
                    : "bg-gradient-to-br from-pink-500 to-orange-400"
                }`}>
                  <plan.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{plan.name}</p>
                  <p className={`text-sm ${plan.dark ? "text-gray-400" : "text-gray-500"}`}>{plan.subtitle}</p>
                </div>
              </div>

              <p className={`text-sm mt-4 mb-6 ${plan.dark ? "text-gray-400" : "text-gray-500"}`}>
                {plan.desc}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                  {plan.price}
                </span>
                <span className={`text-sm ml-1 ${plan.dark ? "text-gray-400" : "text-gray-500"}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-6 ${plan.dark ? "text-gray-500" : "text-gray-400"}`}>
                Pause or cancel anytime
              </p>

              {/* CTA */}
              <Button
                onClick={() => navigate(plan.href)}
                className={`rounded-full font-medium py-6 mb-8 ${
                  plan.dark
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-black/90 border-0"
                }`}
                variant={plan.dark ? "default" : "outline"}
              >
                {plan.cta}
              </Button>

              {/* Features */}
              <div>
                <p className={`font-semibold text-sm mb-4 ${plan.dark ? "text-white" : "text-black"}`}>
                  What's included:
                </p>
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-start gap-3 text-sm ${plan.dark ? "text-gray-400" : "text-gray-500"}`}>
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.dark ? "text-gray-500" : "text-gray-400"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePricing;
