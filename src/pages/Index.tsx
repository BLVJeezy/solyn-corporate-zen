import HomeNav from "@/components/home/HomeNav";
import HomeHero from "@/components/home/HomeHero";
import HomeMetrics from "@/components/home/HomeMetrics";
import HomeProcess from "@/components/home/HomeProcess";
import HomeWork from "@/components/home/HomeWork";
import HomeValueProps from "@/components/home/HomeValueProps";
import MobileViewSection from "@/components/MobileViewSection";
import HomePricing from "@/components/home/HomePricing";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeFAQ from "@/components/home/HomeFAQ";
import HomeCTA from "@/components/home/HomeCTA";
import HomeFooter from "@/components/home/HomeFooter";
import { useTrackPageView } from "@/hooks/useTrackPageView";

const Index = () => {
  useTrackPageView("/");
  return (
    <div className="bg-white min-h-screen">
      <HomeNav />
      <HomeHero />
      <HomeMetrics />
      <HomeProcess />
      <HomeWork />
      <MobileViewSection />
      <HomeValueProps />
      <HomePricing />
      <HomeTestimonials />
      <HomeFAQ />
      <HomeCTA />
      <HomeFooter />
    </div>
  );
};

export default Index;
