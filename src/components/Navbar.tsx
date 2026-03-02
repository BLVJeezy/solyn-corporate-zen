import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import solynLogo from "@/assets/solyn-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";
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
    { label: t("nav.pricing"), href: "#pricing" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
          {/* Logo - left */}
          <a href="#home" className="flex items-center gap-2">
            <img src={solynLogo} alt="Solyn Global Ltd" className="h-7 md:h-9 w-auto" />
          </a>

          {/* Center pill nav */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-0.5 bg-[hsl(0_0%_18%)] border border-white/10 rounded-full px-1.5 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.href.startsWith("/")) {
                      navigate(link.href);
                    } else if (window.location.pathname !== "/") {
                      navigate("/" + link.href);
                    } else {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-1.5 rounded-full"
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="bg-[hsl(0_0%_24%)] text-white hover:bg-[hsl(0_0%_30%)] font-medium rounded-full px-5 border border-white/10"
                onClick={() => navigate("/book")}
              >
                {t("nav.bookCall")}
              </Button>
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-sm">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                    lang === l ? "bg-foreground/10 text-foreground" : "text-foreground/50 hover:text-foreground"
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
              className="gap-2 text-foreground/50 hover:text-foreground hover:bg-foreground/10"
              onClick={() => navigate("/login")}
            >
              <User className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
                    e.preventDefault();
                    setMobileOpen(false);
                    if (link.href.startsWith("/")) {
                      navigate(link.href);
                    } else if (window.location.pathname !== "/") {
                      navigate("/" + link.href);
                    } else {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
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
                onClick={() => { setMobileOpen(false); navigate("/book"); }}
              >
                {t("nav.bookCall")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
