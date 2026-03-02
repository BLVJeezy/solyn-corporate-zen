import Navbar from "@/components/Navbar";
import PortfolioSection from "@/components/PortfolioSection";
import MobileViewSection from "@/components/MobileViewSection";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useTrackPageView } from "@/hooks/useTrackPageView";
import PageTransition from "@/components/PageTransition";

const Portfolio = () => {
  useTrackPageView("/portfolio");
  return (
    <LanguageProvider>
      <div className="border-none">
        <Navbar />
        <PageTransition>
            <div className="pt-20 border-none">
            <PortfolioSection />
            <MobileViewSection />
          </div>
        </PageTransition>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Portfolio;
