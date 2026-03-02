import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { CALENDLY_URL, loadCalendlyScript } from "@/lib/calendly";
import PageTransition from "@/components/PageTransition";


const BookCallContent = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    loadCalendlyScript();
  }, []);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Button
          variant="outline"
          className="rounded-full gap-2 text-foreground"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("bookPage.back")}
        </Button>
        
      </div>

      <hr className="border-border" />

      {/* Hero text */}
      <div className="container mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-12 text-center max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
          {t("bookPage.heading")}
        </h1>
        <p className="text-muted-foreground mt-6 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          {t("bookPage.subtitle")}
        </p>
      </div>

      {/* Calendly inline embed */}
      <div className="container mx-auto px-4 pb-16">
        <div
          className="calendly-inline-widget mx-auto rounded-2xl overflow-hidden border border-border"
          data-url={CALENDLY_URL}
          style={{ minWidth: "280px", height: "700px", maxWidth: "700px" }}
        />
      </div>
    </div>
    </PageTransition>
  );
};

const BookCall = () => (
  <LanguageProvider>
    <BookCallContent />
  </LanguageProvider>
);

export default BookCall;
