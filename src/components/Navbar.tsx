import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import solynLogo from "@/assets/solyn-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";
import { openCalendly } from "@/lib/calendly";
import ThemeToggle from "@/components/ThemeToggle";

const languages: Lang[] = ["NL", "FR", "EN"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  const navLinks = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: "Pricing", href: "#pricing" },
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
            ? "bg-background/90 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
          <a href="#home" className="flex items-center gap-2">
            <img src={solynLogo} alt="Solyn Global Ltd" className="h-8 md:h-10 w-auto" />
          </a>

          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-card border border-border rounded-full px-2 py-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/")) {
                      e.preventDefault();
                      navigate(link.href);
                    }
                  }}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-4 py-1.5 rounded-full hover:bg-accent"
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-5"
                onClick={openCalendly}
              >
                Book a Call
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-sm text-muted-foreground">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                    lang === l ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/login")}
            >
              <User className="w-4 h-4" />
            </Button>
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-16 z-40 bg-background/98 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center gap-6 pt-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (link.href.startsWith("/")) {
                      e.preventDefault();
                      navigate(link.href);
                    }
                  }}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      lang === l ? "bg-accent text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <ThemeToggle />
              <Button
                variant="outline"
                className="gap-2 border-border text-foreground rounded-full"
                onClick={() => { setMobileOpen(false); navigate("/login"); }}
              >
                <User className="w-4 h-4" />
                {t("nav.clientLogin")}
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full"
                onClick={() => { setMobileOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Book a Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
