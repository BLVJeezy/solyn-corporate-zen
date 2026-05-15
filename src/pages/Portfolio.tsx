import Navbar from "@/components/Navbar";
import PortfolioSection from "@/components/PortfolioSection";
import MobileViewSection from "@/components/MobileViewSection";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { useTrackPageView } from "@/hooks/useTrackPageView";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BookMeetingCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-20 px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto rounded-3xl bg-black text-white p-10 md:p-14 text-center shadow-xl"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Like what you see?
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto">
          Book a free meeting and let's build something just as great for you.
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/book")}
          className="rounded-full bg-white text-black hover:bg-white/90 font-semibold px-8 py-6 text-base gap-2"
        >
          <Calendar className="w-5 h-5" />
          Book a Meeting
        </Button>
      </motion.div>
    </section>
  );
};

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
            <BookMeetingCTA />
          </div>
        </PageTransition>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Portfolio;
