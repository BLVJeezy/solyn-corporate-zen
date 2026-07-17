import { Helmet } from "react-helmet-async";
import HomeNav from "@/components/home/HomeNav";
import HomeHero from "@/components/home/HomeHero";
import HomeMetrics from "@/components/home/HomeMetrics";
import HomeProcess from "@/components/home/HomeProcess";
import HomeWork from "@/components/home/HomeWork";
import MobileViewSection from "@/components/MobileViewSection";
import HomeValueProps from "@/components/home/HomeValueProps";
import HomeFounder from "@/components/home/HomeFounder";

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
  url: "https://solynglobal.be",
  description: "SEO & Webdesign Bureau in Bilzen, Tongeren en heel Zuid-Limburg. Wij bouwen professionele websites en lokale SEO-strategieën die KMO's en zelfstandigen helpen hoger te ranken in Google.be.",
  telephone: "+32-xxx-xx-xx-xx",
  email: "jason@solynglobal.be",
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
  sameAs: ["https://solynglobal.be"],
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
        <meta name="description" content="Website laten maken of uw Google Bedrijfsprofiel optimaliseren in Limburg? Solyn Global helpt KMO's en zelfstandigen in Tongeren, Bilzen en Hasselt hoger scoren op Google." />
        <link rel="canonical" href="https://solynglobal.be/" />
        <meta property="og:title" content="Webdesign & SEO Bureau — Tongeren, Bilzen, Limburg | Solyn Global" />
        <meta property="og:description" content="Professionele websites en lokale SEO voor Limburgse KMO's. Gevonden worden op Google.be voor uw gemeente en regio." />
        <meta property="og:url" content="https://solynglobal.be/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Solyn Global" />
        <meta property="og:locale" content="nl_BE" />
        <meta property="og:image" content="https://solynglobal.be/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Solyn Global — SEO & Webdesign Bureau Limburg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Webdesign & SEO Bureau — Tongeren, Bilzen, Limburg | Solyn Global" />
        <meta name="twitter:description" content="Professionele websites en lokale SEO voor Limburgse KMO's. Gevonden worden op Google.be." />
        <meta name="twitter:image" content="https://solynglobal.be/og-image.png" />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <meta name="geo.region" content="BE-VLI" />
        <meta name="geo.placename" content="Bilzen, Limburg" />
        <meta name="geo.position" content="50.8689;5.5178" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA_ORG)}</script>
      </Helmet>

      <HomeNav />
      <HomeHero />
      <HomeMetrics />
      <HomeProcess />
      <HomeValueProps />
      <HomeFounder />
      <HomeWork />
      <HomePricing />
      <HomeFAQ />
      <HomeCTA />

      {/* Google Maps */}
      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-6 pb-4">
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.955013675351!2d5.4616894!3d50.77640749999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0e3c110f0b6fb%3A0xe003edb80d07d71a!2sSolyn%20Global%20LTD!5e0!3m2!1snl!2sbe!4v1784316541337!5m2!1snl!2sbe"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Solyn Global locatie"
              className="w-full h-[320px] md:h-[400px]"
            />
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default Index;
