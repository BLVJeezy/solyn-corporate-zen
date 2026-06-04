import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Check, ChevronRight, MapPin, Sparkles, Search, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import BelgianSocialProof from "@/components/home/BelgianSocialProof";

type CityKey =
  | "brussel"
  | "antwerpen"
  | "gent"
  | "hasselt"
  | "tongeren"
  | "luik"
  | "namen"
  | "leuven"
  | "mechelen";

type CityData = {
  name: string;
  region: string;
  intro: string;
  slug: string;
  lang: "nl" | "fr";
  h1: string;
  metaDescription: string;
};

const CITIES: Record<CityKey, CityData> = {
  brussel: {
    name: "Brussel", region: "Brussels Hoofdstedelijk Gewest", lang: "nl", slug: "webdesign-brussel",
    h1: "Webdesign Brussel — Professionele websites voor Brusselse bedrijven",
    metaDescription: "Solyn Global bouwt premium websites en MVPs voor startups en KMO's in Brussel.",
    intro: "Brussel is het kloppende hart van België — een hyper-competitieve markt waar online zichtbaarheid het verschil maakt tussen groei en stilstand. Wij bouwen websites voor Brusselse KMO's, scale-ups en lokale ondernemers die hoger willen scoren in Google.be en meer kwalitatieve leads willen binnenhalen.",
  },
  antwerpen: {
    name: "Antwerpen", region: "Antwerpen", lang: "nl", slug: "webdesign-antwerpen",
    h1: "Webdesign Antwerpen — Professionele websites voor Antwerpse bedrijven",
    metaDescription: "Solyn Global bouwt premium websites en MVPs voor startups en KMO's in Antwerpen.",
    intro: "Antwerpen telt duizenden ambitieuze ondernemers. Wij helpen Antwerpse bedrijven met een snelle, mobiel-geoptimaliseerde website die direct converteert — en met lokale SEO die zorgt dat klanten u vinden vóór de concurrent.",
  },
  gent: {
    name: "Gent", region: "Oost-Vlaanderen", lang: "nl", slug: "webdesign-gent",
    h1: "Webdesign Gent — Professionele websites voor Gentse bedrijven",
    metaDescription: "Solyn Global bouwt premium websites en MVPs voor startups en KMO's in Gent.",
    intro: "Gent is een broedplaats voor creatieve en technische ondernemers. Onze webdesign- en SEO-aanpak combineert sterk visueel ontwerp met techniek die ranked op Google.be — speciaal afgestemd op de Gentse markt.",
  },
  hasselt: {
    name: "Hasselt", region: "Limburg", lang: "nl", slug: "webdesign-hasselt",
    h1: "Webdesign Hasselt — Professionele websites voor Hasseltse bedrijven",
    metaDescription: "Solyn Global bouwt premium websites en MVPs voor startups en KMO's in Hasselt.",
    intro: "Hasselt en de bredere Limburgse regio bieden enorme groeikansen voor lokale KMO's. Wij ontwerpen websites die niet alleen mooi zijn, maar vooral resultaat opleveren — hoger in Google, meer aanvragen, meer omzet.",
  },
  tongeren: {
    name: "Tongeren", region: "Limburg", lang: "nl", slug: "webdesign-tongeren",
    h1: "Webdesign Tongeren — Professionele websites voor bedrijven in Tongeren",
    metaDescription: "Solyn Global bouwt premium websites en MVPs voor startups en KMO's in Tongeren en de regio Zuid-Limburg.",
    intro: "Tongeren is de oudste stad van België met een levendige lokale economie. Wij bouwen voor Tongerse ondernemers websites die opvallen in Google.be en bezoekers omzetten in klanten — afgestemd op de regio Zuid-Limburg.",
  },
  luik: {
    name: "Liège", region: "Liège", lang: "fr", slug: "webdesign-luik",
    h1: "Création de site web à Liège — Sites web professionnels pour entreprises liégeoises",
    metaDescription: "Solyn Global crée des sites web premium et MVPs pour startups et PMEs à Liège.",
    intro: "Liège est l'un des principaux pôles économiques de Wallonie. Nous concevons des sites rapides et orientés conversion pour les entreprises liégeoises qui veulent dominer Google.be et générer plus de leads qualifiés.",
  },
  namen: {
    name: "Namur", region: "Namur", lang: "fr", slug: "webdesign-namen",
    h1: "Création de site web à Namur — Sites web professionnels pour entreprises namuroises",
    metaDescription: "Solyn Global crée des sites web premium et MVPs pour startups et PMEs à Namur.",
    intro: "Namur, capitale de la Wallonie, est un terrain fertile pour les PMEs ambitieuses. Nous construisons des sites web performants, orientés SEO et conversion, parfaitement adaptés au marché namurois.",
  },
  leuven: {
    name: "Leuven", region: "Vlaams-Brabant", lang: "nl", slug: "webdesign-leuven",
    h1: "Webdesign Leuven — Professionele websites voor bedrijven in Leuven",
    metaDescription: "Solyn Global bouwt premium websites en MVPs voor startups en KMO's in Leuven.",
    intro: "Leuven combineert academische innovatie met een sterk ondernemersklimaat. Wij ontwerpen websites voor Leuvense startups en KMO's die snel willen groeien en hoog willen ranken in Google.be.",
  },
  mechelen: {
    name: "Mechelen", region: "Antwerpen", lang: "nl", slug: "webdesign-mechelen",
    h1: "Webdesign Mechelen — Professionele websites voor bedrijven in Mechelen",
    metaDescription: "Solyn Global bouwt premium websites en MVPs voor startups en KMO's in Mechelen.",
    intro: "Mechelen is uitgegroeid tot een dynamische hub voor ondernemers tussen Brussel en Antwerpen. Wij bouwen websites die de Mechelse markt aanspreken en zichtbaar maken op Google.be.",
  },
};

const FEATURES_NL = [
  { icon: Search, title: "Lokale SEO voor Google.be", desc: "Geoptimaliseerd om te ranken voor zoekopdrachten in uw stad en regio." },
  { icon: Gauge, title: "Razendsnelle laadtijden", desc: "Sub-1 seconde laadtijd op desktop én mobiel — cruciaal voor SEO en conversie." },
  { icon: Sparkles, title: "Conversiegericht ontwerp", desc: "Elk element heeft één doel: van bezoeker naar offerte-aanvraag." },
];
const FEATURES_FR = [
  { icon: Search, title: "SEO local pour Google.be", desc: "Optimisé pour ranker sur les recherches dans votre ville et région." },
  { icon: Gauge, title: "Temps de chargement ultra-rapides", desc: "Moins d'une seconde sur desktop et mobile — essentiel pour le SEO et la conversion." },
  { icon: Sparkles, title: "Design orienté conversion", desc: "Chaque élément a un objectif : transformer le visiteur en demande de devis." },
];

const FAQ_NL = (city: string) => [
  { q: `Werken jullie ook met bedrijven buiten ${city}?`, a: `Ja. Wij bedienen klanten in heel België, met extra focus op ${city} en omgeving voor lokale SEO-projecten.` },
  { q: `Hoe lang duurt een webdesign-project?`, a: `De meeste websites zijn live in 2 tot 4 weken. MVP's en complexere projecten lopen typisch 4 tot 8 weken.` },
  { q: `Wat kost een website in ${city}?`, a: `We werken met een vast maandbedrag vanaf €300/maand of een eenmalige MVP-build vanaf €3.000. Geen verborgen kosten.` },
];
const FAQ_FR = (city: string) => [
  { q: `Travaillez-vous avec des entreprises en dehors de ${city} ?`, a: `Oui. Nous travaillons avec des clients dans toute la Belgique, avec une expertise locale particulière à ${city}.` },
  { q: `Combien de temps prend un projet de site web ?`, a: `La plupart des sites sont en ligne en 2 à 4 semaines. Les MVPs prennent généralement 4 à 8 semaines.` },
  { q: `Combien coûte un site web à ${city} ?`, a: `Nous proposons un forfait mensuel dès 300€/mois ou un build MVP unique dès 3.000€. Pas de frais cachés.` },
];

const COPY = {
  nl: {
    badge: (r: string) => r,
    cta1: "Vraag een gratis audit aan",
    cta2: "Bekijk Prijzen",
    trust: (c: string) => ["SEO-First Webdesign", `Actief in ${c}`, "Resultaten binnen 90 dagen", "Gebouwd om te ranken op Google.be"],
    whyHeading: (c: string) => `Waarom Solyn voor uw onderneming in ${c}?`,
    whySub: "Lokaal verankerd, technisch sterk, en gericht op meetbaar resultaat in Google.be.",
    faqHeading: "Veelgestelde vragen",
    ctaHeading: (c: string) => `Klaar om hoger te ranken in ${c}?`,
    ctaSub: "Ontvang een gratis audit van uw huidige site met concrete verbeterpunten voor SEO, snelheid en conversie.",
  },
  fr: {
    badge: (r: string) => r,
    cta1: "Demandez un audit gratuit",
    cta2: "Voir les Tarifs",
    trust: (c: string) => ["Webdesign orienté SEO", `Actifs à ${c}`, "Résultats en 90 jours", "Conçu pour ranker sur Google.be"],
    whyHeading: (c: string) => `Pourquoi choisir Solyn pour votre entreprise à ${c} ?`,
    whySub: "Ancrés localement, techniquement solides, et focalisés sur des résultats mesurables sur Google.be.",
    faqHeading: "Questions fréquentes",
    ctaHeading: (c: string) => `Prêt à ranker plus haut à ${c} ?`,
    ctaSub: "Recevez un audit gratuit de votre site actuel avec des recommandations concrètes pour le SEO, la vitesse et la conversion.",
  },
};

const CityLanding = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/webdesign-/, "").replace(/\/$/, "") as CityKey;
  const navigate = useNavigate();
  const data = CITIES[slug];

  if (!data) {
    navigate("/", { replace: true });
    return null;
  }

  const title = `Webdesign & SEO in ${data.name} | Solyn Global`;
  const description = `Webdesign & SEO bureau actief in ${data.name}. Wij bouwen snelle, converterende websites die hoog ranken in Google voor bedrijven in ${data.name} en omgeving.`;
  const url = `https://solyn-global.com/${data.slug}`;

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Solyn Global",
          url,
          description,
          areaServed: { "@type": "City", name: data.name },
          serviceType: ["Webdesign", "SEO", "Lokale SEO", "Website Redesign"],
          address: { "@type": "PostalAddress", addressLocality: "Hasselt", addressCountry: "BE" },
          email: "info@solyn-global.com",
          inLanguage: ["nl", "fr"],
        })}</script>
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
            {data.region}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.1]"
          >
            Webdesign & SEO in {data.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-gray-500 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed"
          >
            {data.intro}
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

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            {[
              "SEO-First Webdesign",
              `Actief in ${data.name}`,
              "Resultaten binnen 90 dagen",
              "Gebouwd om te ranken op Google.be",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Waarom Solyn voor uw onderneming in {data.name}?
            </h2>
            <p className="text-gray-500 mt-3">
              Lokaal verankerd, technisch sterk, en gericht op meetbaar resultaat in Google.be.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BelgianSocialProof />

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-black rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Klaar om hoger te ranken in {data.name}?
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Ontvang een gratis audit van uw huidige site met concrete verbeterpunten voor SEO, snelheid en conversie.
          </p>
          <Button
            onClick={() => navigate("/book")}
            className="mt-8 rounded-full bg-white text-black hover:bg-white/90 font-medium px-7 py-6 text-base gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            Vraag een gratis audit aan
          </Button>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default CityLanding;
