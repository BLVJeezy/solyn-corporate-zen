import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const LeadForm = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", company: "", budget: "", message: "" });

  const fields = [
    { key: "name" as const, labelKey: "lead.name", phKey: "lead.namePh", type: "text" },
    { key: "company" as const, labelKey: "lead.company", phKey: "lead.companyPh", type: "text" },
    { key: "budget" as const, labelKey: "lead.budget", phKey: "lead.budgetPh", type: "text" },
  ];

  const handleNext = () => {
    if (step < fields.length) {
      setStep(step + 1);
    } else {
      toast.success(t("lead.success"));
      setForm({ name: "", company: "", budget: "", message: "" });
      setStep(0);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-2">
            {t("lead.heading1")} {t("lead.heading2")}
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            {t("lead.subtitle")}
          </p>

          <div className="space-y-4">
            <div className="flex gap-1 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-foreground" : "bg-border"
                  }`}
                />
              ))}
            </div>

            {step < fields.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <label className="text-sm font-medium text-foreground">{t(fields[step].labelKey)}</label>
                <Input
                  placeholder={t(fields[step].phKey)}
                  value={form[fields[step].key]}
                  onChange={(e) => setForm({ ...form, [fields[step].key]: e.target.value })}
                  className="bg-card border-border rounded-xl"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <label className="text-sm font-medium text-foreground">{t("lead.message")}</label>
                <Textarea
                  placeholder={t("lead.messagePh")}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="bg-card border-border rounded-xl"
                />
              </motion.div>
            )}

            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-border text-foreground rounded-full"
                >
                  {t("lead.back")}
                </Button>
              )}
              <Button onClick={handleNext} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full">
                {step < fields.length ? t("lead.next") : t("lead.send")}
                {step === fields.length && <Send className="ml-2 w-4 h-4" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadForm;
