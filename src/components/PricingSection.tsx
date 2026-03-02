import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PricingSection = () => {
  const { t } = useLanguage();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      nameKey: "pricing.mvp.name",
      priceKey: "pricing.mvp.price",
      periodKey: "pricing.mvp.period",
      descKey: "pricing.mvp.desc",
      features: ["pricing.mvp.f1", "pricing.mvp.f2", "pricing.mvp.f3", "pricing.mvp.f4"],
      highlighted: true,
      amount: 2000,
      currency: "EUR",
    },
    {
      nameKey: "pricing.sprint.name",
      priceKey: "pricing.sprint.price",
      periodKey: "pricing.sprint.period",
      descKey: "pricing.sprint.desc",
      features: ["pricing.sprint.f1", "pricing.sprint.f2", "pricing.sprint.f3", "pricing.sprint.f4"],
      highlighted: false,
      amount: 250,
      currency: "EUR",
    },
  ];

  const handlePayment = async (plan: typeof plans[0]) => {
    setLoadingPlan(plan.nameKey);

    try {
      const { data, error } = await supabase.functions.invoke("create-revolut-order", {
        body: {
          amount: plan.amount,
          currency: plan.currency,
          description: t(plan.nameKey),
        },
      });

      if (error || !data?.token) {
        throw new Error(error?.message || "Could not create order");
      }

      const { default: RevolutCheckout } = await import("@revolut/checkout");
      const instance = await RevolutCheckout(data.token, data.mode || "prod");

      instance.payWithPopup({
        onSuccess: () => {
          toast.success("Betaling geslaagd! We nemen snel contact op.");
          setLoadingPlan(null);
        },
        onError: (err: Error) => {
          console.error("Payment error:", err);
          toast.error("Betaling mislukt. Probeer het opnieuw.");
          setLoadingPlan(null);
        },
        onCancel: () => {
          setLoadingPlan(null);
        },
      });
    } catch (err) {
      console.error("Payment init error:", err);
      toast.error("Er ging iets mis. Probeer het later opnieuw.");
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium">
            {t("pricing.label")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-3 tracking-tight">
            {t("pricing.heading")}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-lg border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary/40 bg-card"
                  : "border-border bg-card"
              }`}
            >
              <div className="mb-6">
                <h3 className="font-serif text-2xl text-foreground tracking-tight">
                  {t(plan.nameKey)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{t(plan.descKey)}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-serif text-foreground tracking-tight">
                  {t(plan.priceKey)}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  {t(plan.periodKey)}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((fKey) => (
                  <li key={fKey} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">—</span>
                    {t(fKey)}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePayment(plan)}
                disabled={loadingPlan !== null}
                className={`w-full font-semibold ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-transparent border border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {loadingPlan === plan.nameKey ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : null}
                {loadingPlan === plan.nameKey ? "Laden..." : t("pricing.cta")}
                {loadingPlan !== plan.nameKey && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
