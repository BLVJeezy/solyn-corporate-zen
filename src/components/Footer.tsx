import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import solynLogo from "@/assets/solyn-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim() });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.info(t("newsletter.alreadySubscribed"));
      } else {
        toast.error(t("newsletter.error"));
      }
      return;
    }
    toast.success(t("newsletter.success"));
    setEmail("");
  };

  const links = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-4 md:px-8 pb-6 pt-8"
    >
      <div className="bg-[hsl(0_0%_7%)] rounded-3xl overflow-hidden">
        {/* Main content */}
        <div className="px-8 md:px-12 pt-12 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Left: Subscribe */}
            <div className="max-w-sm">
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-2">
                {t("newsletter.heading")}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {t("footer.desc")}
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <div className="flex bg-white rounded-full overflow-hidden w-full max-w-xs">
                  <Input
                    type="email"
                    required
                    placeholder={t("newsletter.placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 bg-transparent text-sm focus-visible:ring-0 shadow-none px-5"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-[hsl(0_0%_7%)] text-white hover:bg-[hsl(0_0%_15%)] font-semibold px-5 m-1 shrink-0"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>

            {/* Right: Links */}
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 px-8 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-white/40">
            <img src={solynLogo} alt="Solyn" className="h-5 opacity-60" />
            <span>{t("footer.rights")}</span>
            <span className="text-white/20">·</span>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-white/20">·</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
