import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  MapPin,
  Search,
  Gauge,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import BelgianSocialProof from "@/components/home/BelgianSocialProof";

const CITIES = [
  { name: "Tongeren", slug: "/webdesign-tongeren", desc: "Oudste stad van België — sterke lokale markt voor dienstverleners en handelaars." },
  { name: "Bilzen", slug: "/webdesign-bilzen", desc: "Centraal tussen Tongeren en Hasselt — weinig online concurrentie, grote kans." },
  { name: "Borgloon", slug: "/webdesign-borgloon", desc: "Hart van Haspengouw — lokale ondernemers met weinig online zichtbaarheid." },
  { name: "Riemst", slug: "/webdesign-riemst", desc: "Grensgemeente met NL — dubbel bereik voor lokale bedrijven." },
  { name: "Sint-Truiden", slug: "/webdesign-sint-truiden", desc: "Bruisende handelsstad in Haspengouw — grote vraag naar lokale SEO." },
  { name: "Hasselt", slug: "/webdesign-hasselt", desc: "Hoofdstad van Limburg — competitief maar hoge zoekvolumes." },
];

const SERVICES = [
  {
    icon: Search,
    title: "Lokale SEO voor Limburg",
    desc: "We optimaliseren uw Google Bedrijfsprofiel, bouwen lokale landingspagina's en zorgen dat u bovenaan staat voor zoekopdrachten in uw gemeente en omgeving.",
  },
  {
    icon: Gauge,
    title: "Professionele website laten maken",
    desc: "Snelle, mobielvriendelijke websites gebouwd om te converteren. Geen slaperige template — een website die écht werkt voor uw bedrijf.",
  },
  {
    icon: Sparkles,
    title: "SEO-audit & strategie",
    desc: "Wij analyseren uw huidige website en Google-positie, en leveren een concrete actieplan om hoger te ranken in uw regio.",
  },
];

const FAQ = [
  {
    q: "Wat is lokale SEO en waarom is het belangrijk voor Limburgse bedrijven?",
    a: "Lokale SEO zorgt dat uw bedrijf verschijnt wanneer mensen in uw gemeente of regio zoeken op Google. Denk aan zoekopdrachten als 'loodgieter Tongeren' of 'kapper Bilzen'. Voor KMO's en zelfstandigen in Zuid-Limburg is dit vaak de snelste weg naar meer klanten.",
  },
  {
    q: "Werken jullie samen met bedrijven in heel Zuid-Limburg?",
    a: "Ja. Wij bedienen zelfstandigen en KMO's in Tongeren, Bilzen, Borgloon, Riemst, Sint-Truiden en alle omliggende deelgemeenten. We kennen de regio en weten hoe lokale klanten zoeken.",
  },
  {
    q: "Hoe snel zie ik resultaten van lokale SEO?",
    a: "In kleinere gemeenten zoals Borgloon of Riemst zien we vaak al binnen 60 dagen merkbare verbetering in Google-rankings. In grotere steden zoals Sint-Truiden of Tongeren duurt het typisch 60 tot 90 dagen.",
  },
  {
    q: "Wat kost een website laten maken in Zuid-Limburg?",
    a: "Wij werken met een vast maandbedrag vanaf €300/maand of een eenmalige build vanaf €3.000. Geen verborgen kosten. U weet altijd precies wat u betaalt.",
  },
  {
    q: "Helpen jullie ook met Google Bedrijfsprofiel optimalisatie?",
    a: "Absoluut. Google Bedrijfsprofiel is voor lokale bedrijven een van de krachtigste SEO-tools. We optimaliseren uw profiel volledig als onderdeel van elke lokale SEO-opdracht.",
  },
];

const TITLE = "Webdesign & Lokale SEO in Zuid-Limburg | Solyn";
const DESC =
  "Solyn maakt professionele websites en lokale SEO voor bedrijven in Tongeren, Bilzen, Borgloon, Riemst en heel Zuid-Limburg. Hogere Google-positie, meer klanten. Gratis audit.";
const URL = "https://solyn-global.com/webdesign-zuid-limburg";

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Solyn Global",
  url: "https://solyn-global.com",
  description: DESC,
  address: {
    "@type": "PostalAddress",
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
    { "@type": "AdministrativeArea", name: "Zuid-Limburg" },
    { "@type": "City", name: "Tongeren" },
    { "@type": "City", name: "Bilzen" },
    { "@type": "City", name: "Borgloon" },
    { "@type": "City", name: "Riemst" },
    { "@type": "City", name: "Sint-Truiden" },
    { "@type": "City", name: "Hasselt" },
  ],
  serviceType: "Webdesign & Lokale SEO",
  priceRange: "€€",
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://solyn-global.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Webdesign Zuid-Limburg",
      item: URL,
    },
  ],
};

const ZuidLimburg = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <html lang="nl" />
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="BE-VLI" />
        <meta name="geo.placename" content="Zuid-Limburg" />
        <meta name="geo.position" content="50.8689;5.5178" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <HomeNav />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-6"
          >
            <MapPin className="w-3.5 h-3.5" />
            Provincie Limburg — België
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.1]"
          >
            Webdesign & Lokale SEO<br className="hidden sm:block" /> in Zuid-Limburg
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-gray-500 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed"
          >
            De meeste bedrijven in Tongeren, Bilzen, Borgloon en de rest van Zuid-Limburg zijn online bijna onzichtbaar. Dat is een gemiste kans — en voor u een groot voordeel als u nu actie onderneemt. Wij bouwen professionele websites met lokale SEO die uw bedrijf bovenaan Google.be zetten.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Wij zijn een webdesign- en SEO-bureau gevestigd in de regio Zuid-Limburg. We kennen de lokale markt, de gemeenten en de manier waarop Limburgse consumenten zoeken op Google.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            <Button
              onClick={() => navigate("/book")}
              className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-7 py-6 text-base gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              Gratis audit aanvragen
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/pricing")}
              className="rounded-full border-gray-300 text-black hover:bg-gray-50 font-medium px-7 py-6 text-base"
            >
              Bekijk Prijzen
            </Button>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            {[
              "SEO-First Webdesign",
              "Actief in heel Zuid-Limburg",
              "Resultaten binnen 90 dagen",
              "Geoptimaliseerd voor Google.be",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Onze diensten in Zuid-Limburg
            </h2>
            <p className="text-gray-500 mt-3">
              Van een professionele website laten maken tot volledige lokale SEO-strategie — wij nemen uw online aanwezigheid serieus.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center mb-5">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BelgianSocialProof />

      {/* City grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Gemeenten waar we actief zijn
            </h2>
            <p className="text-gray-500 mt-3">
              Klik op uw gemeente voor specifieke informatie over webdesign en lokale SEO in uw regio.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CITIES.map((city, i) => (
              <motion.button
                key={city.slug}
                onClick={() => navigate(city.slug)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="text-left bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:border-black hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-black text-lg">{city.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors mt-1" />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{city.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Why local matters */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-6">
            Waarom lokale SEO in Zuid-Limburg zo snel werkt
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>
              Grote steden zoals Brussel of Antwerpen hebben honderden webdesignbureaus die strijden om hetzelfde. Maar in gemeenten als <strong className="text-black">Borgloon, Riemst of Bilzen</strong>? Daar zijn nauwelijks lokale concurrenten online actief. Dat betekent dat een goed geoptimaliseerde website hier razendsnel naar de top van Google kan klimmen.
            </p>
            <p>
              Wij richten ons specifiek op de regio Zuid-Limburg. We weten hoe lokale consumenten zoeken — of dat nu gaat om een <strong className="text-black">elektricien in Tongeren</strong>, een <strong className="text-black">boekhoudkantoor in Sint-Truiden</strong> of een <strong className="text-black">tuinaanlegger in Borgloon</strong>. Die kennis vertalen we naar een website en SEO-strategie die écht resultaat oplevert.
            </p>
            <p>
              Een professionele website laten maken in Zuid-Limburg hoeft ook niet duur te zijn. Wij werken met transparante, vaste prijzen — zonder verborgen kosten en zonder langdurige contracten die u gevangen houden.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-10">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white">
                <h3 className="font-semibold text-black">{item.q}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-black rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Klaar om hoger te ranken in Zuid-Limburg?
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Ontvang een gratis audit van uw huidige website met concrete verbeterpunten voor SEO, snelheid en conversie. Geen verplichtingen.
          </p>
          <Button
            onClick={() => navigate("/book")}
            className="mt-8 rounded-full bg-white text-black hover:bg-white/90 font-medium px-7 py-6 text-base gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            Gratis audit aanvragen
          </Button>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default ZuidLimburg;
