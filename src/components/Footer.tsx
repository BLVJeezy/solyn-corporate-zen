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
          </div>
          <div className="flex items-center gap-4 text-white/40">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
