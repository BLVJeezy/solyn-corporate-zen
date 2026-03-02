import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import ServicesGrid from "@/components/ServicesGrid";
import TrustBar from "@/components/TrustBar";
import ProcessSection from "@/components/ProcessSection";

import WhyUsSection from "@/components/WhyUsSection";
import CTASection from "@/components/CTASection";

import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useTrackPageView } from "@/hooks/useTrackPageView";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  useTrackPageView("/");
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <PageTransition>
          <Hero />
          <ServicesGrid />
          <TrustBar />
          <WhyUsSection />
          <CTASection />
        </PageTransition>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
