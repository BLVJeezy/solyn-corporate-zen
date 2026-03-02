import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import solynLogo from "@/assets/solyn-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";

const languages: Lang[] = ["NL", "FR", "EN"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  const navLinks = [
    { label: t("nav.services"), href: "#process" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
          <a href="#home" className="flex items-center gap-2">
            <img src={solynLogo} alt="Solyn Global Ltd" className="h-9 md:h-10 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-sm text-muted-foreground mr-2">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                    lang === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/60 hover:text-foreground"
              onClick={() => navigate("/login")}
            >
              {t("nav.clientLogin")}
            </Button>
            <a href="#contact">
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full px-5">
                {t("nav.cta")}
              </Button>
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col px-6 pt-12 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-serif font-semibold text-foreground py-3 border-b border-border"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 mt-8">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      lang === l ? "text-foreground bg-muted" : "text-muted-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground/70"
                  onClick={() => { setMobileOpen(false); navigate("/login"); }}
                >
                  {t("nav.clientLogin")}
                </Button>
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full">
                    {t("nav.cta")}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;