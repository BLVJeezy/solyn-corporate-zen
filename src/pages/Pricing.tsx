import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useTrackPageView } from "@/hooks/useTrackPageView";
import PageTransition from "@/components/PageTransition";

const Pricing = () => {
  useTrackPageView("/pricing");
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <PageTransition>
          <div className="pt-20">
            <PricingSection />
          </div>
        </PageTransition>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Pricing;
