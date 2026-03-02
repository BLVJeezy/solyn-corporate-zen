import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useTrackPageView } from "@/hooks/useTrackPageView";

const Pricing = () => {
  useTrackPageView("/pricing");
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <div className="pt-20">
          <PricingSection />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Pricing;
