import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import solynLogo from "@/assets/solyn-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";

const languages: Lang[] = ["NL", "FR", "EN"];

const HomeNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t("nav.services"), href: "/about" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.pricing"), href: "/pricing" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-6">
          {/* Brand */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="flex items-center gap-2"
          >
            <img src={solynLogo} alt="Solyn Global Ltd" className="h-7 md:h-9 w-auto" fetchPriority="high" decoding="async" />
            <span className="text-base md:text-lg font-semibold text-black tracking-tight">Solyn Global</span>
          </a>

          {/* Center pill nav */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-0.5 rounded-full px-1.5 py-1 border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                  className="text-sm text-gray-600 hover:text-black transition-colors px-4 py-1.5 rounded-full"
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                onClick={() => navigate("/book")}
                className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-5 text-sm"
              >
                {t("nav.bookCall")}
              </Button>
            </div>
          </div>

          {/* Desktop language switcher */}
          <div className="hidden md:flex items-center gap-0.5 text-sm rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm px-1.5 py-1">
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

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-black p-2">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-20 right-4 z-50 bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-1 min-w-[180px] md:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    navigate(link.href);
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

export default HomeNav;
