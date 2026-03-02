import { Mail, MapPin, Phone } from "lucide-react";
import solynLogo from "@/assets/solyn-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { label: t("nav.services"), href: "#process" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src={solynLogo} alt="Solyn Global Ltd" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-background/50 text-sm leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-background/80 mb-4 text-sm uppercase tracking-wider">{t("footer.quickLinks")}</h4>
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-background/50 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-background/80 mb-4 text-sm uppercase tracking-wider">{t("footer.contact")}</h4>
            <div className="space-y-3 text-sm text-background/50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@solynglobal.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +32 (0) 123 456 789
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Brussel, België
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 pt-6 text-center text-xs text-background/30">
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;