import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import solynLogo from "@/assets/solyn-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";
import { useSiteSettings } from "@/hooks/useSiteSettings";


const languages: Lang[] = ["NL", "FR", "EN"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useSiteSettings();

  // About link only appears when both Home and About are enabled (Home off ⇒ About off).
  const aboutVisible = settings.home_enabled && settings.about_enabled;

  // Portfolio is always in the nav. When Home is disabled it lives at "/", otherwise at "/portfolio".
  const portfolioHref = settings.home_enabled ? "/portfolio" : "/";
  const navLinks = [
    ...(aboutVisible ? [{ label: t("nav.services"), href: "/seo-bureau" }] : []),
    { label: t("nav.portfolio"), href: portfolioHref },
    { label: t("nav.pricing"), href: "/pricing" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(location.pathname);
      return;
    }

    const sections = ["services", "pricing"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection("#" + id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/")) return location.pathname === href;
    return activeSection === href;
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent border-none">
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 border-none">
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center gap-2">
            <img src={solynLogo} alt="Solyn Global Ltd" className="h-7 md:h-9 w-auto" />
          </a>

          {/* Center pill nav */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className={`flex items-center gap-0.5 rounded-full px-1.5 py-1 border ${
              isHomePage
                ? "bg-[hsl(0_0%_14%)] border-white/10"
                : "bg-muted border-border"
            }`}>
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
                  className={`text-sm font-medium transition-colors px-4 py-1.5 rounded-full ${
                    isActive(link.href)
                      ? isHomePage ? "bg-white/10 text-white" : "bg-primary text-primary-foreground"
                      : isHomePage ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className={`font-medium rounded-full px-5 border ${
                  isHomePage
                    ? location.pathname === "/book"
                      ? "bg-white text-[hsl(0_0%_7%)] hover:bg-white/90 border-white/10"
                      : "bg-[hsl(0_0%_24%)] text-white hover:bg-[hsl(0_0%_30%)] border-white/10"
                    : location.pathname === "/book"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 border-border"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border"
                }`}
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
                    lang === l
                      ? isHomePage ? "bg-white/10 text-white" : "bg-primary text-primary-foreground"
                      : isHomePage ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={isHomePage ? "text-white" : "text-foreground"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop to close menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Dropdown card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-20 right-4 left-auto z-50 bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-1 min-w-[180px] md:hidden"
            >
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
                  className="text-base font-medium text-black py-2 px-1 hover:text-black/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="flex gap-2 py-2 px-1">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      lang === l ? "bg-black text-white" : "text-black/50 hover:text-black"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <Button
                className="bg-black text-white hover:bg-black/90 font-medium rounded-full mt-1 w-full"
                onClick={() => { setMobileOpen(false); navigate("/book"); }}
              >
                {t("nav.bookCall")}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
