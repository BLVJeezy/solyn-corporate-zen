import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import WhyUsSection from "@/components/WhyUsSection";
import ProcessSection from "@/components/ProcessSection";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useTrackPageView } from "@/hooks/useTrackPageView";
import PageTransition from "@/components/PageTransition";

const About = () => {
  useTrackPageView("/about");
  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <PageTransition>
          <AboutHero />
          <WhyUsSection />
          <TrustBar />
          <ProcessSection />
          <CTASection />
        </PageTransition>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default About;
