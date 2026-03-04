import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const HomeFooter = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();
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

  const footerLinks = [
    { labelKey: "homeFooter.about", href: "/about" },
    { labelKey: "homeFooter.work", href: "/portfolio" },
    { labelKey: "homeFooter.pricing", href: "/pricing" },
    { labelKey: "homeFooter.blog", href: "/blog" },
    { labelKey: "homeFooter.contact", href: "/book" },
    { labelKey: "homeFooter.testimonials", href: "/testimonials" },
    { labelKey: "homeFooter.faqs", href: "/faqs" },
  ];

  return (
    <footer className="border-t border-gray-100 py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-black mb-2">{t("homeFooter.subscribe")}</h3>
            <p className="text-gray-400 text-sm mb-6">
              {t("homeFooter.subtitle")}
            </p>
            <div className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder={t("homeFooter.emailPh")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full border-gray-200 bg-gray-50 text-black placeholder:text-gray-400"
              />
              <Button className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-6 flex-shrink-0">
                {t("homeFooter.signUp")}
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end md:items-start">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.href);
                }}
                className="text-gray-400 text-sm hover:text-black transition-colors"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <p className="text-gray-300 text-xs select-none" onClick={handleSecretClick}>
            {t("homeFooter.copyright")}
          </p>
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
