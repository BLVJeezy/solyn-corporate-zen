import { Mail, MapPin, Phone } from "lucide-react";
import solynLogo from "@/assets/solyn-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.portfolio"), href: "/portfolio" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img src={solynLogo} alt="Solyn Global Ltd" className="h-8 mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">{t("footer.quickLinks")}</h4>
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">{t("footer.contact")}</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@solynglobal.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +32 (0) 123 456 789
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Brussel, België
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
