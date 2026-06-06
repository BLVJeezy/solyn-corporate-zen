import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MapPin, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import solynLogo from "@/assets/solyn-logo.png";

const SERVICES = [
  { label: "Lokale SEO", href: "/seo-bureau", desc: "Hoger in Google voor uw regio", icon: Search },
  { label: "Webdesign", href: "/webdesign-bureau", desc: "Professionele website laten maken", icon: Globe },
];

const REGIONS = [
  { label: "Tongeren", href: "/webdesign-tongeren" },
  { label: "Bilzen", href: "/webdesign-bilzen" },
  { label: "Hoeselt", href: "/webdesign-hoeselt" },
  { label: "Borgloon", href: "/webdesign-borgloon" },
  { label: "Limburg", href: "/webdesign-limburg" },
  { label: "België", href: "/webdesign-belgie" },
];

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Prijzen", href: "/pricing" },
];

const Dropdown = ({
  open, onClose, children,
}: { open: boolean; onClose: () => void; children: React.ReactNode }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 z-50 min-w-[220px]"
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const HomeNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const regionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (regionsRef.current && !regionsRef.current.contains(e.target as Node)) setRegionsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => { setMobileOpen(false); setServicesOpen(false); setRegionsOpen(false); }, [location.pathname]);

  const go = (href: string) => { setMobileOpen(false); setServicesOpen(false); setRegionsOpen(false); navigate(href); };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className={`transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-6">

            {/* Brand */}
            <button onClick={() => go("/")} className="flex items-center gap-2 shrink-0">
              <img src={solynLogo} alt="Solyn" className="h-7 md:h-9 w-auto" fetchPriority="high" decoding="async" />
              <span className="text-base md:text-lg font-semibold text-black tracking-tight">Solyn</span>
            </button>

            {/* Center pill nav — desktop */}
            <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-0.5 rounded-full px-1.5 py-1 border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm">

                {/* Services dropdown */}
                <div ref={servicesRef} className="relative">
                  <button
                    onClick={() => { setServicesOpen(o => !o); setRegionsOpen(false); }}
                    className={`flex items-center gap-1 text-sm transition-colors px-4 py-1.5 rounded-full ${servicesOpen ? "text-black bg-gray-100" : "text-gray-600 hover:text-black"}`}
                  >
                    Diensten
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <Dropdown open={servicesOpen} onClose={() => setServicesOpen(false)}>
                    {SERVICES.map((s) => (
                      <button key={s.href} onClick={() => go(s.href)}
                        className="w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shrink-0 mt-0.5">
                          <s.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-black">{s.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                        </div>
                      </button>
                    ))}
                  </Dropdown>
                </div>

                {/* Regions dropdown */}
                <div ref={regionsRef} className="relative">
                  <button
                    onClick={() => { setRegionsOpen(o => !o); setServicesOpen(false); }}
                    className={`flex items-center gap-1 text-sm transition-colors px-4 py-1.5 rounded-full ${regionsOpen ? "text-black bg-gray-100" : "text-gray-600 hover:text-black"}`}
                  >
                    Regio's
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${regionsOpen ? "rotate-180" : ""}`} />
                  </button>
                  <Dropdown open={regionsOpen} onClose={() => setRegionsOpen(false)}>
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Wij zijn actief in</div>
                    {REGIONS.map((r) => (
                      <button key={r.href} onClick={() => go(r.href)}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="text-sm text-black font-medium">{r.label}</span>
                      </button>
                    ))}
                  </Dropdown>
                </div>

                {NAV_LINKS.map((l) => (
                  <button key={l.href} onClick={() => go(l.href)}
                    className="text-sm text-gray-600 hover:text-black transition-colors px-4 py-1.5 rounded-full"
                  >
                    {l.label}
                  </button>
                ))}

                <Button size="sm" onClick={() => go("/book")}
                  className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-5 text-sm"
                >
                  Gratis audit
                </Button>
              </div>
            </div>

            {/* Right spacer desktop */}
            <div className="hidden md:block w-24" />

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-black p-2">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden bg-black/20" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 right-4 z-50 bg-white rounded-2xl shadow-2xl p-5 flex flex-col gap-1 min-w-[260px] md:hidden border border-gray-100"
            >
              <div className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold px-1 mb-1">Diensten</div>
              {SERVICES.map((s) => (
                <button key={s.href} onClick={() => go(s.href)}
                  className="flex items-center gap-3 text-sm font-medium text-black py-2 px-2 hover:bg-gray-50 rounded-xl transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center shrink-0">
                    <s.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  {s.label}
                </button>
              ))}

              <div className="border-t border-gray-100 my-2" />
              <div className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold px-1 mb-1">Regio's</div>
              <div className="grid grid-cols-2 gap-1">
                {REGIONS.map((r) => (
                  <button key={r.href} onClick={() => go(r.href)}
                    className="flex items-center gap-1.5 text-sm text-black py-1.5 px-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-100 my-2" />
              {NAV_LINKS.map((l) => (
                <button key={l.href} onClick={() => go(l.href)}
                  className="text-sm font-medium text-black py-2 px-1 hover:text-black/70 transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}

              <Button className="bg-black text-white hover:bg-black/90 font-medium rounded-full mt-2 w-full" onClick={() => go("/book")}>
                Gratis audit aanvragen
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeNav;
