import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import ServicesGrid from "@/components/ServicesGrid";
import TrustBar from "@/components/TrustBar";
import ProcessSection from "@/components/ProcessSection";

import WhyUsSection from "@/components/WhyUsSection";
import CTASection from "@/components/CTASection";
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
        
        <ServicesGrid />
        <TrustBar />
        
        <WhyUsSection />
        <CTASection />
        <NewsletterSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
