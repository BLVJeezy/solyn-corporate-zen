import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, Globe, Zap, Search, Shield, Smartphone, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import BelgianSocialProof from "@/components/home/BelgianSocialProof";

const SERVICES = [
  { icon: Globe, title: "Website op maat", desc: "Geen template. Uw website wordt volledig op maat ontworpen en gebouwd — afgestemd op uw merk, uw doelgroep en uw doelen." },
  { icon: Search, title: "SEO ingebouwd", desc: "SEO is geen nagedachte — het zit ingebouwd vanaf dag 1. Correcte structuur, snelheid, meta-tags en lokale optimalisatie." },
  { icon: Zap, title: "Sub-1 seconde laadtijd", desc: "Snelheid is een rankingfactor én conversiefactor. Wij bouwen sites die razendsnel laden op mobiel en desktop." },
  { icon: Smartphone, title: "Mobile-first design", desc: "Meer dan 70% van uw bezoekers komt via mobiel. Uw website moet er perfect uitzien en werken op elk scherm." },
  { icon: Shield, title: "Onderhoud & support", desc: "Na de lancering laten wij u niet los. Proactief onderhoud, bugfixes en WhatsApp support inbegrepen." },
  { icon: ArrowRight, title: "Conversiegericht", desc: "Elke pagina heeft één doel: van bezoeker naar aanvraag. Duidelijke call-to-actions, vertrouwenssignalen en slimme UX." },
];

const PACKAGES = [
  {
    name: "Starter website",
    price: "Vaste prijs",
    period: "eenmalig — offerte op maat",
    features: ["Tot 5 pagina's", "Mobile-first design", "SEO-basis ingebouwd", "Contactformulier", "Google Analytics", "Oplevering in 2 weken"],
    cta: "Offerte aanvragen",
    dark: false,
  },
  {
    name: "Business website",
    price: "Vaste prijs",
    period: "eenmalig — offerte op maat",
    badge: "Meest gekozen",
    features: ["Onbeperkt pagina's", "Premium design op maat", "Volledige SEO-optimalisatie", "Lokale landingspagina's", "Google Search Console", "Offerte- of boekingssysteem", "1 maand gratis support"],
    cta: "Offerte aanvragen",
    dark: true,
  },
  {
    name: "Website + SEO pakket",
    price: "Op maat",
    period: "maandelijks na build",
    features: ["Business website inbegrepen", "Maandelijkse SEO-optimalisatie", "Google Bedrijfsprofiel beheer", "Maandelijks rankingrapport", "Nieuwe content & pagina's", "WhatsApp support"],
    cta: "Pakket bespreken",
    dark: false,
  },
];

const FAQ = [
  { q: "Hoe lang duurt het bouwen van een website?", a: "De meeste websites zijn live binnen 2 tot 4 weken na de kick-off. Complexere projecten met webshop of meertaligheid duren 4 tot 6 weken. U krijgt altijd een concrete planning vooraf." },
  { q: "Wat kost een professionele website?", a: "Wij werken met vaste, transparante prijzen op maat van uw project. Na een kort gesprek weet u exact wat het kost — geen verrassingen achteraf." },
  { q: "Bouwen jullie ook webshops?", a: "Ja. Wij bouwen e-commerce websites voor lokale KMO's — van eenvoudige productcatalogi tot volledige webshops met betaalmodules en voorraadbeheer." },
  { q: "Gebruik ik WordPress of een ander CMS?", a: "Dat hangt af van uw noden. Wij werken met moderne technologieën die het beste passen bij uw project: React, Next.js, WordPress of headless CMS. Wij adviseren u eerlijk over de beste keuze." },
  { q: "Wat als ik later extra pagina's wil toevoegen?", a: "Geen probleem. Klanten met een onderhoudsabonnement krijgen maandelijks development-uren inbegrepen voor nieuwe pagina's of aanpassingen. Éénmalige uitbreidingen zijn ook mogelijk." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Solyn Global — Webdesign Bureau Limburg",
  url: "https://solyn-global.com/webdesign-bureau",
  description: "Professioneel webdesign bureau voor KMO's in Tongeren, Bilzen, Hoeselt en Limburg. Website laten maken met SEO ingebouwd.",
  address: { "@type": "PostalAddress", addressLocality: "Bilzen", addressRegion: "Limburg", postalCode: "3740", addressCountry: "BE" },
  areaServed: [{ "@type": "City", name: "Tongeren" }, { "@type": "City", name: "Bilzen" }, { "@type": "City", name: "Hoeselt" }, { "@type": "AdministrativeArea", name: "Limburg" }],
  serviceType: "Webdesign",
  priceRange: "€€",
};

const WebdesignBureau = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <html lang="nl" />
        <title>Webdesign Bureau Tongeren, Bilzen & Limburg | Website Laten Maken | Solyn</title>
        <meta name="description" content="Website laten maken in Tongeren, Bilzen, Hoeselt of Limburg? Solyn bouwt professionele, snelle websites met SEO ingebouwd. Vaste prijs, oplevering in 2 weken." />
        <link rel="canonical" href="https://solyn-global.com/webdesign-bureau" />
        <meta property="og:title" content="Webdesign Bureau Tongeren, Bilzen & Limburg | Solyn" />
        <meta property="og:description" content="Professionele website laten maken met SEO ingebouwd — voor KMO's en zelfstandigen in Limburg." />
        <meta name="keywords" content="webdesign Tongeren, website laten maken Bilzen, webdesign bureau Limburg, website laten maken Hoeselt, professionele website KMO, webdesign België" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })}</script>
      </Helmet>

      <HomeNav />

      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-20 px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6"
          >
            <Globe className="w-3.5 h-3.5" />
            Webdesign Bureau — Tongeren · Bilzen · Hoeselt · Limburg
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.08]"
          >
            Website laten maken die <span className="text-blue-600">klanten oplevert</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-gray-500 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed"
          >
            Wij bouwen professionele websites voor KMO's en zelfstandigen in Tongeren, Bilzen, Hoeselt en heel Limburg. SEO ingebouwd vanaf dag 1, opgeleverd in 2 tot 4 weken, vaste prijs.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Button onClick={() => navigate("/book")} className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-7 py-6 text-base gap-1">
              <ChevronRight className="w-4 h-4" /> Gratis offerte aanvragen
            </Button>
            <Button variant="outline" onClick={() => navigate("/portfolio")} className="rounded-full border-gray-300 text-black hover:bg-gray-50 font-medium px-7 py-6 text-base">
              Bekijk ons werk
            </Button>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            {["Design op maat", "SEO ingebouwd", "Oplevering in 2–4 weken", "Maandelijks opzegbaar onderhoud"].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600 shrink-0" strokeWidth={3} />
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
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Wat wij voor u bouwen</h2>
            <p className="text-gray-500 mt-3">Geen generieke templates — websites die werken voor uw bedrijf, uw markt en uw klanten.</p>
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

      {/* Packages */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Pakketten & prijzen</h2>
            <p className="text-gray-500 mt-3">Transparant, vaste prijs. Geen verborgen kosten. Maandelijks opzegbaar onderhoud.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PACKAGES.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-7 flex flex-col relative ${p.dark ? "bg-black text-white" : "bg-white border border-gray-200"}`}
              >
                {p.badge && <div className={`absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full ${p.dark ? "bg-white/15 text-white/70" : "bg-black text-white"}`}>{p.badge}</div>}
                <h3 className={`text-lg font-bold mb-1 ${p.dark ? "text-white" : "text-black"}`}>{p.name}</h3>
                <div className="mb-5">
                  <span className={`text-2xl font-bold ${p.dark ? "text-white" : "text-black"}`}>{p.price}</span>
                  <span className={`text-xs ml-1 ${p.dark ? "text-white/50" : "text-gray-400"}`}>{p.period}</span>
                </div>
                <Button onClick={() => navigate("/book")} className={`w-full rounded-full mb-5 ${p.dark ? "bg-white text-black hover:bg-white/90" : "border border-gray-200 bg-white text-black hover:bg-gray-50"}`} variant={p.dark ? "default" : "outline"}>
                  {p.cta} <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
                <ul className="space-y-2 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.dark ? "text-white/40" : "text-emerald-500"}`} />
                      <span className={p.dark ? "text-white/70" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BelgianSocialProof />

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-10">Veelgestelde vragen over webdesign</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Klaar voor uw nieuwe website?</h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">Vraag een gratis offerte aan. Wij bespreken uw project en geven u een concrete prijsindicatie — zonder verplichtingen.</p>
          <Button onClick={() => navigate("/book")} className="mt-8 rounded-full bg-white text-black hover:bg-white/90 font-medium px-7 py-6 text-base gap-1">
            <ChevronRight className="w-4 h-4" /> Gratis offerte aanvragen
          </Button>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default WebdesignBureau;
