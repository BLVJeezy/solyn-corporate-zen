import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, MapPin } from "lucide-react";
import solynLogo from "@/assets/solyn-logo.png";

const CITY_LINKS = [
  { label: "Webdesign Tongeren", href: "/webdesign-tongeren" },
  { label: "Webdesign Bilzen", href: "/webdesign-bilzen" },
  { label: "Webdesign Borgloon", href: "/webdesign-borgloon" },
  { label: "Webdesign Riemst", href: "/webdesign-riemst" },
  { label: "Webdesign Sint-Truiden", href: "/webdesign-sint-truiden" },
  { label: "Webdesign Zuid-Limburg", href: "/webdesign-zuid-limburg" },
  { label: "Webdesign Hasselt", href: "/webdesign-hasselt" },
  { label: "Webdesign Brussel", href: "/webdesign-brussel" },
];

const SERVICE_LINKS = [
  { label: "Lokale SEO", href: "/website-laten-maken" },
  { label: "Website Laten Maken", href: "/website-laten-maken" },
  { label: "Website Laten Maken (FR)", href: "/creation-site-web" },
  { label: "MVP Development", href: "/mvp-development" },
  { label: "Maatwerk Software", href: "/maatwerk-software" },
  { label: "Startup Website", href: "/startup-website" },
];

const COMPANY_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Prijzen", href: "/pricing" },
  { label: "Gratis Audit", href: "/book" },
  { label: "Privacy", href: "/privacy" },
  { label: "Voorwaarden", href: "/terms" },
];

const HomeFooter = () => {
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout>();

  const handleSecretClick = useCallback(() => {
    clickCount.current++;
    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 2000);
    }
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      clearTimeout(clickTimer.current);
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <footer className="border-t border-gray-100 py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img src={solynLogo} alt="Solyn Global" className="h-8 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              SEO & Webdesign Bureau actief in Tongeren, Bilzen, Borgloon en heel België.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              Bilzen, Limburg — België
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4">Diensten</p>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href + l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); navigate(l.href); }}
                    className="text-gray-500 text-sm hover:text-black transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4">Regio's</p>
            <ul className="space-y-2.5">
              {CITY_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); navigate(l.href); }}
                    className="text-gray-500 text-sm hover:text-black transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4">Bedrijf</p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href + l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); navigate(l.href); }}
                    className="text-gray-500 text-sm hover:text-black transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-gray-400">
            <p className="select-none" onClick={handleSecretClick}>
              © {new Date().getFullYear()} Solyn Global. Alle rechten voorbehouden.
            </p>
            <span className="hidden sm:inline text-gray-200">·</span>
            <a href="mailto:info@solyn-global.com" className="hover:text-black transition-colors">
              info@solyn-global.com
            </a>
            <span className="hidden sm:inline text-gray-200">·</span>
            <span>KMO Webdesign & SEO — Tongeren · Bilzen · Borgloon · Limburg</span>
          </div>
          <div className="flex gap-3">
            <a href="#" className="text-gray-300 hover:text-gray-500 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-300 hover:text-gray-500 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
