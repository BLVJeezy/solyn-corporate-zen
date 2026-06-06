import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, Search, TrendingUp, MapPin, BarChart3, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import BelgianSocialProof from "@/components/home/BelgianSocialProof";

const SERVICES = [
  { icon: Search, title: "Lokale SEO", desc: "Wij optimaliseren uw website en Google Bedrijfsprofiel zodat u bovenaan verschijnt voor zoekopdrachten in uw gemeente en regio." },
  { icon: TrendingUp, title: "Technische SEO", desc: "Snelheid, structuur, schema markup, interne links — de technische basis die Google nodig heeft om uw site te begrijpen en te belonen." },
  { icon: MapPin, title: "Google Bedrijfsprofiel", desc: "Uw GMB-profiel volledig geoptimaliseerd: categorieën, beschrijving, foto's, posts en review-strategie voor maximale lokale zichtbaarheid." },
  { icon: BarChart3, title: "SEO-audit & rapportage", desc: "Maandelijkse rapporten met uw rankings, verkeer en leads. U ziet precies wat werkt en waar we verder groeien." },
  { icon: ChevronRight, title: "Contentcreatie", desc: "SEO-teksten en lokale landingspagina's geschreven voor uw doelgroep in uw regio — inclusief alle gemeenten die u wilt bereiken." },
  { icon: Star, title: "Linkbuilding", desc: "Kwalitatieve, lokale vermeldingen en backlinks die uw autoriteit verhogen in de ogen van Google." },
];

const PROCESS = [
  { n: "01", title: "Gratis SEO-audit", desc: "We analyseren uw huidige positie, uw concurrenten en de zoektermen die uw klanten gebruiken. U ontvangt een concreet rapport." },
  { n: "02", title: "Strategie & plan", desc: "Op basis van de audit stellen we een duidelijk actieplan op: welke zoektermen, welke pagina's, welke optimalisaties — in welke volgorde." },
  { n: "03", title: "Implementatie", desc: "We voeren alle technische en on-page SEO-verbeteringen door, optimaliseren uw GMB en starten de contentcreatie." },
  { n: "04", title: "Groei & rapportage", desc: "Maandelijkse rapporten, continue optimalisatie en een duidelijk overzicht van uw rankinggroei. Transparant, meetbaar." },
];

const FAQ = [
  { q: "Hoe lang duurt het voor ik resultaten zie?", a: "In kleinere gemeenten zoals Bilzen, Hoeselt of Borgloon zien we vaak al verbetering binnen 30 tot 60 dagen. In grotere steden zoals Tongeren of Sint-Truiden duurt het typisch 60 tot 90 dagen. SEO is een investering die exponentieel terugbetaalt." },
  { q: "Wat maakt lokale SEO anders dan gewone SEO?", a: "Lokale SEO richt zich op geografische zoekopdrachten: 'loodgieter Tongeren', 'kapper Bilzen', 'boekhouder Hoeselt'. Hierbij speelt uw Google Bedrijfsprofiel een cruciale rol — het bepaalt of u in de kaartresultaten verschijnt, die 70% van de kliks krijgen." },
  { q: "Werken jullie enkel voor bepaalde sectoren?", a: "Nee. Wij werken voor zelfstandigen en KMO's in alle sectoren — bouw, horeca, vrije beroepen, detailhandel, dienstverlening. Elke sector heeft zijn eigen zoekgedrag, dat is precies onze expertise." },
  { q: "Kan ik maandelijks opzeggen?", a: "Ja. Wij werken zonder langdurige contracten. U betaalt per maand en kunt op elk moment stoppen. Wij verdienen ons mandaat door resultaten te leveren, niet door u vast te houden." },
  { q: "Wat kost lokale SEO?", a: "Onze SEO-pakketten starten vanaf €300/maand voor lokale SEO. Het exacte bedrag hangt af van uw markt, uw concurrenten en de doelstellingen. We geven altijd een eerlijk advies na de gratis audit." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Solyn Global — SEO Bureau Limburg",
  url: "https://solyn-global.com/seo-bureau",
  description: "Lokale SEO bureau actief in Tongeren, Bilzen, Hoeselt, Borgloon en heel Limburg. Wij ranken KMO's en zelfstandigen hoger in Google.be.",
  address: { "@type": "PostalAddress", addressLocality: "Bilzen", addressRegion: "Limburg", postalCode: "3740", addressCountry: "BE" },
  geo: { "@type": "GeoCoordinates", latitude: 50.8689, longitude: 5.5178 },
  areaServed: [
    { "@type": "City", name: "Tongeren" }, { "@type": "City", name: "Bilzen" },
    { "@type": "City", name: "Hoeselt" }, { "@type": "City", name: "Borgloon" },
    { "@type": "AdministrativeArea", name: "Limburg" },
  ],
  serviceType: "Lokale SEO",
  priceRange: "€€",
};

const SeoBureau = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <html lang="nl" />
        <title>SEO Bureau Tongeren, Bilzen & Limburg | Lokale SEO | Solyn</title>
        <meta name="description" content="Solyn is het SEO bureau voor KMO's en zelfstandigen in Tongeren, Bilzen, Hoeselt en heel Limburg. Meer klanten via Google.be — meetbaar resultaat, maandelijks opzegbaar." />
        <link rel="canonical" href="https://solyn-global.com/seo-bureau" />
        <meta property="og:title" content="SEO Bureau Tongeren, Bilzen & Limburg | Solyn" />
        <meta property="og:description" content="Lokale SEO die uw bedrijf op pagina 1 van Google zet in uw gemeente en regio. Gratis audit aanvragen." />
        <meta property="og:url" content="https://solyn-global.com/seo-bureau" />
        <meta name="geo.region" content="BE-VLI" />
        <meta name="geo.placename" content="Limburg, België" />
        <meta name="keywords" content="SEO bureau Tongeren, SEO bureau Bilzen, lokale SEO Limburg, SEO specialist Hoeselt, Google ranking Limburg, website hoger in Google, SEO audit België" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })}</script>
      </Helmet>

      <HomeNav />

      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-20 px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6"
          >
            <Search className="w-3.5 h-3.5" />
            SEO Bureau — Tongeren · Bilzen · Hoeselt · Limburg
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.08]"
          >
            Lokale SEO die uw bedrijf op <span className="text-emerald-600">pagina 1</span> zet
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
            className="text-gray-500 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed"
          >
            Wij zijn het SEO bureau voor KMO's en zelfstandigen in Tongeren, Bilzen, Hoeselt, Borgloon en heel Limburg. Geen vage beloftes — meetbaar resultaat, transparante rapportage, maandelijks opzegbaar.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Button onClick={() => navigate("/book")} className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-7 py-6 text-base gap-1">
              <ChevronRight className="w-4 h-4" /> Gratis SEO-audit aanvragen
            </Button>
            <Button variant="outline" onClick={() => navigate("/pricing")} className="rounded-full border-gray-300 text-black hover:bg-gray-50 font-medium px-7 py-6 text-base">
              Bekijk prijzen
            </Button>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            {["Gratis audit", "Geen langdurig contract", "Resultaten binnen 90 dagen", "Maandelijkse rapportage"].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Onze SEO-diensten</h2>
            <p className="text-gray-500 mt-3">Alles wat nodig is om hoger te ranken in Google — technisch, inhoudelijk en lokaal.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm"
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

      {/* Process */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Hoe wij werken</h2>
            <p className="text-gray-500 mt-3">Van audit naar meetbare groei in Google — stap voor stap.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PROCESS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl border border-gray-100 p-7"
              >
                <span className="text-4xl font-bold text-gray-100 select-none block mb-4">{p.n}</span>
                <h3 className="text-lg font-bold text-black mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BelgianSocialProof />

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-10">Veelgestelde vragen over SEO</h2>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white">
                <h3 className="font-semibold text-black">{f.q}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-black rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Klaar om hoger te ranken in Google?</h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">Vraag een gratis SEO-audit aan. Wij analyseren uw situatie en geven u concrete verbeterpunten — zonder verplichtingen.</p>
          <Button onClick={() => navigate("/book")} className="mt-8 rounded-full bg-white text-black hover:bg-white/90 font-medium px-7 py-6 text-base gap-1">
            <ChevronRight className="w-4 h-4" /> Gratis audit aanvragen
          </Button>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default SeoBureau;
