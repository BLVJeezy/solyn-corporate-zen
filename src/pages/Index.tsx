import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import PortfolioSection from "@/components/PortfolioSection";
import LeadForm from "@/components/LeadForm";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useTrackPageView } from "@/hooks/useTrackPageView";

const Index = () => {
  useTrackPageView("/");
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <Hero />
        <TrustBar />
        <ProcessSection />
        <PricingSection />
        <PortfolioSection />
        <LeadForm />
        <Footer />
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
};

export default Index;