import Navbar from "@/components/Navbar";
import PortfolioSection from "@/components/PortfolioSection";
import MobileViewSection from "@/components/MobileViewSection";
import DesktopViewSection from "@/components/DesktopViewSection";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useTrackPageView } from "@/hooks/useTrackPageView";

const Portfolio = () => {
  useTrackPageView("/portfolio");
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <div className="pt-20">
          <PortfolioSection />
          <MobileViewSection />
          <DesktopViewSection />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Portfolio;
