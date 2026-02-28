import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import TrustBar from "@/components/TrustBar";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import LeadForm from "@/components/LeadForm";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="dark">
      <Navbar />
      <Hero />
      <ServicesGrid />
      <TrustBar />
      <ProcessSection />
      <PortfolioSection />
      <LeadForm />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
