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
      <div>
        <Navbar />
        <PageTransition>
          <div className="pt-20">
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
