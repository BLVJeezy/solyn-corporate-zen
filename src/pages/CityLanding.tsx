import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Check, ChevronRight, MapPin, Sparkles, Search, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import BelgianSocialProof from "@/components/home/BelgianSocialProof";

type CityKey = "brussel" | "antwerpen" | "gent" | "hasselt";

const CITIES: Record<CityKey, {
  name: string;
  region: string;
  intro: string;
  slug: string;
}> = {
  brussel: {
    name: "Brussel",
    region: "Brussels Hoofdstedelijk Gewest",
    intro: "Brussel is het kloppende hart van België — een hyper-competitieve markt waar online zichtbaarheid het verschil maakt tussen groei en stilstand. Wij bouwen websites voor Brusselse KMO's, scale-ups en lokale ondernemers die hoger willen scoren in Google.be en meer kwalitatieve leads willen binnenhalen.",
    slug: "webdesign-brussel",
  },
  antwerpen: {
    name: "Antwerpen",
    region: "Provincie Antwerpen",
    intro: "Antwerpen telt duizenden ambitieuze ondernemers. Wij helpen Antwerpse bedrijven met een snelle, mobiel-geoptimaliseerde website die direct converteert — en met lokale SEO die zorgt dat klanten u vinden vóór de concurrent.",
    slug: "webdesign-antwerpen",
  },
  gent: {
    name: "Gent",
    region: "Provincie Oost-Vlaanderen",
    intro: "Gent is een broedplaats voor creatieve en technische ondernemers. Onze webdesign- en SEO-aanpak combineert sterk visueel ontwerp met techniek die ranked op Google.be — speciaal afgestemd op de Gentse markt.",
    slug: "webdesign-gent",
  },
  hasselt: {
    name: "Hasselt",
    region: "Provincie Limburg",
    intro: "Hasselt en de bredere Limburgse regio bieden enorme groeikansen voor lokale KMO's. Wij ontwerpen websites die niet alleen mooi zijn, maar vooral resultaat opleveren — hoger in Google, meer aanvragen, meer omzet.",
    slug: "webdesign-hasselt",
  },
};

const FEATURES = [
  { icon: Search, title: "Lokale SEO voor Google.be", desc: "Geoptimaliseerd om te ranken voor zoekopdrachten in uw stad en regio." },
  { icon: Gauge, title: "Razendsnelle laadtijden", desc: "Sub-1 seconde laadtijd op desktop én mobiel — cruciaal voor SEO en conversie." },
  { icon: Sparkles, title: "Conversiegericht ontwerp", desc: "Elk element heeft één doel: van bezoeker naar offerte-aanvraag." },
];

const CityLanding = () => {
  const { city } = useParams<{ city: CityKey }>();
  const navigate = useNavigate();
  const data = city && CITIES[city as CityKey];

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
