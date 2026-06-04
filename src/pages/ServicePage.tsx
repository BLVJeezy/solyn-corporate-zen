import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import BelgianSocialProof from "@/components/home/BelgianSocialProof";

export type ServicePageProps = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  paragraphs: string[];
  bullets: string[];
  serviceType: string;
  faq: { q: string; a: string }[];
};

const ServicePage = ({
  slug,
  title,
  metaDescription,
  h1,
  intro,
  paragraphs,
  bullets,
  serviceType,
  faq,
}: ServicePageProps) => {
  const navigate = useNavigate();
  const url = `https://solyn-global.com/${slug}`;

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <html lang="nl" />
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType,
          provider: {
            "@type": "ProfessionalService",
            name: "Solyn Global",
            url: "https://solyn-global.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tongeren",
              addressRegion: "Limburg",
              postalCode: "3700",
              addressCountry: "BE",
            },
          },
          areaServed: { "@type": "Country", name: "Belgium" },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}</script>
      </Helmet>

      <HomeNav />

      <section className="relative pt-32 md:pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.1]"
          >
            {h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-500 text-lg max-w-2xl mt-6 leading-relaxed"
          >
            {intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            <Button
              onClick={() => navigate("/book")}
              className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-7 py-6 text-base gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              Vraag een gratis audit aan
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/pricing")}
              className="rounded-full border-gray-300 text-black hover:bg-gray-50 font-medium px-7 py-6 text-base"
            >
              Bekijk Prijzen
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-gray-700 text-base md:text-lg leading-relaxed">
              {p}
            </p>
          ))}
          <ul className="pt-4 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-gray-700">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={3} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BelgianSocialProof />

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-10">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white">
                <h3 className="font-semibold text-black">{item.q}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-black rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Klaar om uw project te starten?
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Plan een vrijblijvend gesprek — binnen 24 uur reactie, transparante prijzen, geen verkooppraat.
          </p>
          <Button
            onClick={() => navigate("/book")}
            className="mt-8 rounded-full bg-white text-black hover:bg-white/90 font-medium px-7 py-6 text-base gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            Plan een gesprek
          </Button>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default ServicePage;
