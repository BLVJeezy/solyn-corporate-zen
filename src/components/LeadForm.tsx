import { useState } from "react";
import { ArrowRight, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

const LeadForm = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", budget: "", message: "", package: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: form.name,
        company: form.company || null,
        email: form.email,
        phone: form.phone || null,
        budget: form.package === "mvp" ? "€2.000" : form.package === "sprint" ? "€250" : form.budget || null,
        message: form.message || null,
        status: "nieuw" as const,
      });
      if (error) throw error;
      toast.success(t("lead.success"));
      setForm({ name: "", company: "", email: "", phone: "", budget: "", message: "", package: "" });
      setOpen(false);
    } catch {
      toast.error("Er ging iets mis. Probeer opnieuw.");
    }
    setSubmitting(false);
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <>
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t("lead.heading1")} <span className="text-gradient-gold">{t("lead.heading2")}</span>
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              {t("lead.subtitle")}
            </p>
            <Button
              size="lg"
              onClick={() => setOpen(true)}
              className="bg-foreground text-background hover:bg-foreground/90 font-medium px-10 py-6 text-base rounded-full"
            >
              <ArrowRight className="mr-2 w-5 h-5" />
              {t("lead.cta")}
            </Button>
          </motion.div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-background border-border p-0 gap-0 [&>button]:hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">{t("lead.modalTitle")}</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder={t("lead.namePh")} required value={form.name} onChange={set("name")} className="bg-card border-border rounded-lg" />
              <Input placeholder={t("lead.companyPh")} value={form.company} onChange={set("company")} className="bg-card border-border rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder={t("lead.emailPh")} type="email" required value={form.email} onChange={set("email")} className="bg-card border-border rounded-lg" />
                <Input placeholder={t("lead.phonePh")} value={form.phone} onChange={set("phone")} className="bg-card border-border rounded-lg" />
              </div>
              <Select value={form.package} onValueChange={(v) => setForm(f => ({ ...f, package: v }))}>
                <SelectTrigger className="bg-card border-border rounded-lg">
                  <SelectValue placeholder={t("lead.packagePh")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sprint">48h Sprint — €250</SelectItem>
                  <SelectItem value="mvp">MVP Launch — €2,000</SelectItem>
                  <SelectItem value="custom">{t("lead.custom")}</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder={t("lead.messagePh")} value={form.message} onChange={set("message")} rows={3} className="bg-card border-border rounded-lg" />
              <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full py-6" disabled={submitting}>
                {submitting ? "..." : t("lead.send")}
                {!submitting && <Send className="ml-2 w-4 h-4" />}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeadForm;