import { Mail, MapPin, Phone } from "lucide-react";
import solynLogo from "@/assets/solyn-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.portfolio"), href: "#portfolio" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-charcoal text-charcoal-foreground py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src={solynLogo} alt="Solyn Global Ltd" className="h-12 mb-4" />
            <p className="text-charcoal-foreground/60 text-sm leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-4">{t("footer.quickLinks")}</h4>
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-charcoal-foreground/60 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-4">{t("footer.contact")}</h4>
            <div className="space-y-3 text-sm text-charcoal-foreground/60">
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
        <div className="border-t border-charcoal-foreground/10 pt-6 text-center text-xs text-charcoal-foreground/40">
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
