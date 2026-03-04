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
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  useTrackPageView("/");
  const navigate = useNavigate();
  const seqIndex = useRef(0);

  useEffect(() => {
    const seq = ["a", "d", "m", "i", "n"];
    const handler = (e: KeyboardEvent) => {
      if (e.key === seq[seqIndex.current]) {
        seqIndex.current++;
        if (seqIndex.current === seq.length) {
          seqIndex.current = 0;
          navigate("/admin");
        }
      } else {
        seqIndex.current = e.key === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);
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
