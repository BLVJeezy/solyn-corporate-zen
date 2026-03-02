import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroPortfolioPreview from "@/components/HeroPortfolioPreview";
import ServicesGrid from "@/components/ServicesGrid";
import TrustBar from "@/components/TrustBar";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import MobileViewSection from "@/components/MobileViewSection";

import LeadForm from "@/components/LeadForm";
import NewsletterSection from "@/components/NewsletterSection";

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
        <HeroPortfolioPreview />
        <ServicesGrid />
        <TrustBar />
        <ProcessSection />
        <PricingSection />
        <MobileViewSection />
        
        <LeadForm />
        <NewsletterSection />
        <Footer />
        
      </div>
    </LanguageProvider>
  );
};

export default Index;
