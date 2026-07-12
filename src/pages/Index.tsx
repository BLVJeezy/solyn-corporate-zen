import { Helmet } from "react-helmet-async";
import HomeNav from "@/components/home/HomeNav";
import HomeHero from "@/components/home/HomeHero";
import HomeMetrics from "@/components/home/HomeMetrics";
import HomeProcess from "@/components/home/HomeProcess";
import HomeWork from "@/components/home/HomeWork";
import MobileViewSection from "@/components/MobileViewSection";
import HomeValueProps from "@/components/home/HomeValueProps";
import BelgianSocialProof from "@/components/home/BelgianSocialProof";
import HomePricing from "@/components/home/HomePricing";
import HomeFAQ from "@/components/home/HomeFAQ";
import HomeCTA from "@/components/home/HomeCTA";
import HomeFooter from "@/components/home/HomeFooter";
import { useTrackPageView } from "@/hooks/useTrackPageView";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Solyn Global",
  url: "https://solyn-global.com",
  description: "SEO & Webdesign Bureau in Bilzen, Tongeren en heel Zuid-Limburg. Wij bouwen professionele websites en lokale SEO-strategieën die KMO's en zelfstandigen helpen hoger te ranken in Google.be.",
  telephone: "+32-xxx-xx-xx-xx",
  email: "info@solyn-global.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bilzen",
    addressLocality: "Bilzen",
    addressRegion: "Limburg",
    postalCode: "3740",
    addressCountry: "BE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.8689,
    longitude: 5.5178,
  },
  areaServed: [
    { "@type": "City", name: "Bilzen" },
    { "@type": "City", name: "Tongeren" },
    { "@type": "City", name: "Borgloon" },
    { "@type": "City", name: "Riemst" },
    { "@type": "City", name: "Sint-Truiden" },
    { "@type": "City", name: "Hasselt" },
    { "@type": "AdministrativeArea", name: "Limburg" },
    { "@type": "Country", name: "België" },
  ],
  serviceType: ["Webdesign", "Lokale SEO", "MVP Development", "Website Laten Maken"],
  priceRange: "€€",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: ["https://solyn-global.com"],
};

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
      <Helmet>
        <html lang="nl" />
        <title>Webdesign & SEO Bureau Bilzen, Tongeren, Limburg | Solyn Global</title>
        <meta name="description" content="Solyn Global is het SEO en webdesign bureau voor KMO's en zelfstandigen in Tongeren, Bilzen, Borgloon en heel Limburg. Meer klanten via Google — website laten maken op maat." />
        <link rel="canonical" href="https://solyn-global.com/" />
        <meta property="og:title" content="Webdesign & SEO Bureau — Tongeren, Bilzen, Limburg | Solyn Global" />
        <meta property="og:description" content="Professionele websites en lokale SEO voor Limburgse KMO's. Gevonden worden op Google.be voor uw gemeente en regio." />
        <meta property="og:url" content="https://solyn-global.com/" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="BE-VLI" />
        <meta name="geo.placename" content="Bilzen, Limburg" />
        <meta name="geo.position" content="50.8689;5.5178" />
        <meta name="keywords" content="webdesign Tongeren, webdesign Bilzen, website laten maken Limburg, SEO bureau Tongeren, lokale SEO België, website laten maken KMO, webdesign Borgloon, website Riemst" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA_ORG)}</script>
      </Helmet>

      <HomeNav />
      <HomeHero />
      <HomeMetrics />
      <HomeProcess />
      <BelgianSocialProof />
      <HomeValueProps />
      <HomeWork />
      <HomePricing />
      <HomeFAQ />
      <HomeCTA />
      <HomeFooter />
    </div>
  );
};

export default Index;
