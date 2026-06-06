import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Check, ChevronRight, MapPin, Sparkles, Search, Gauge, Star } from "lucide-react";
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
  | "bilzen"
  | "borgloon"
  | "riemst"
  | "sint-truiden"
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
  metaTitle?: string;
  localContext?: string;
  nearbyTowns?: string[];
  geoLat?: number;
  geoLng?: number;
  extraFAQ?: { q: string; a: string }[];
};

const CITIES: Record<CityKey, CityData> = {
  brussel: {
    name: "Brussel",
    region: "Brussels Hoofdstedelijk Gewest",
    lang: "nl",
    slug: "webdesign-brussel",
    geoLat: 50.8503,
    geoLng: 4.3517,
    h1: "Webdesign Brussel — Professionele websites voor Brusselse bedrijven",
    metaTitle: "Webdesign Brussel | Professionele Website Laten Maken | Solyn",
    metaDescription:
      "Solyn bouwt snelle, SEO-geoptimaliseerde websites voor KMO's en startups in Brussel. Meer leads via Google.be. Vraag een gratis audit aan.",
    intro:
      "Brussel is het kloppende hart van België — een hyper-competitieve markt waar online zichtbaarheid het verschil maakt tussen groei en stilstand. Wij bouwen websites voor Brusselse KMO's, scale-ups en lokale ondernemers die hoger willen scoren in Google.be en meer kwalitatieve leads willen binnenhalen.",
    nearbyTowns: ["Etterbeek", "Schaarbeek", "Anderlecht", "Molenbeek", "Elsene"],
  },
  antwerpen: {
    name: "Antwerpen",
    region: "Antwerpen",
    lang: "nl",
    slug: "webdesign-antwerpen",
    geoLat: 51.2213,
    geoLng: 4.4051,
    h1: "Webdesign Antwerpen — Professionele websites voor Antwerpse bedrijven",
    metaTitle: "Webdesign Antwerpen | Website Laten Maken | Solyn",
    metaDescription:
      "Solyn bouwt premium websites voor Antwerpse KMO's en startups. Lokale SEO, snelle laadtijden, meer klanten via Google.be.",
    intro:
      "Antwerpen telt duizenden ambitieuze ondernemers. Wij helpen Antwerpse bedrijven met een snelle, mobiel-geoptimaliseerde website die direct converteert — en met lokale SEO die zorgt dat klanten u vinden vóór de concurrent.",
    nearbyTowns: ["Berchem", "Deurne", "Merksem", "Hoboken", "Borgerhout"],
  },
  gent: {
    name: "Gent",
    region: "Oost-Vlaanderen",
    lang: "nl",
    slug: "webdesign-gent",
    geoLat: 51.0543,
    geoLng: 3.7174,
    h1: "Webdesign Gent — Professionele websites voor Gentse bedrijven",
    metaTitle: "Webdesign Gent | Website Laten Maken Gent | Solyn",
    metaDescription:
      "Solyn bouwt SEO-geoptimaliseerde websites voor Gentse bedrijven. Van KMO tot startup — wij zorgen dat uw klanten u vinden op Google.be.",
    intro:
      "Gent is een broedplaats voor creatieve en technische ondernemers. Onze webdesign- en SEO-aanpak combineert sterk visueel ontwerp met techniek die ranked op Google.be — speciaal afgestemd op de Gentse markt.",
    nearbyTowns: ["Ledeberg", "Gentbrugge", "Merelbeke", "De Pinte", "Lochristi"],
  },
  hasselt: {
    name: "Hasselt",
    region: "Limburg",
    lang: "nl",
    slug: "webdesign-hasselt",
    geoLat: 50.9311,
    geoLng: 5.3378,
    h1: "Webdesign Hasselt — Professionele websites voor Hasseltse bedrijven",
    metaTitle: "Webdesign Hasselt | Website Laten Maken Limburg | Solyn",
    metaDescription:
      "Solyn bouwt professionele websites voor KMO's in Hasselt en heel Limburg. SEO, snelheid en conversie — afgestemd op de Limburgse markt.",
    intro:
      "Hasselt en de bredere Limburgse regio bieden enorme groeikansen voor lokale KMO's. Wij ontwerpen websites die niet alleen mooi zijn, maar vooral resultaat opleveren — hoger in Google, meer aanvragen, meer omzet.",
    nearbyTowns: ["Genk", "Sint-Truiden", "Tongeren", "Bilzen", "Diepenbeek"],
  },
  tongeren: {
    name: "Tongeren",
    region: "Zuid-Limburg",
    lang: "nl",
    slug: "webdesign-tongeren",
    geoLat: 50.7804,
    geoLng: 5.4639,
    h1: "Webdesign Tongeren — Professionele website laten maken in Tongeren",
    metaTitle: "Webdesign Tongeren | Website Laten Maken | Lokale SEO | Solyn",
    metaDescription:
      "Solyn maakt professionele websites voor zelfstandigen en KMO's in Tongeren. Hogere Google-positie, meer klanten, vaste prijs. Gratis audit aanvragen.",
    intro:
      "Tongeren is de oudste stad van België — en de lokale markt is wakker. Steeds meer Tongerse ondernemers beseffen dat een professionele website niet meer optioneel is. Wij bouwen websites voor zelfstandigen, bouwbedrijven, horecazaken en lokale dienstverleners in Tongeren die écht gevonden worden op Google.be.",
    localContext:
      "Of je nu een zaak hebt op de Grote Markt, langs de Maastrichterstraat of ergens in de deelgemeenten zoals Mal, Henis of Piringen — wij kennen de regio. Lokale SEO voor Tongeren betekent dat we jou laten ranken voor zoekopdrachten als 'loodgieter Tongeren', 'kapper Tongeren', of 'website laten maken Tongeren'.",
    nearbyTowns: ["Bilzen", "Borgloon", "Riemst", "Herstappe", "Alken"],
    extraFAQ: [
      {
        q: "Ranken jullie ook voor mijn specifieke dienst in Tongeren?",
        a: "Ja. We optimaliseren uw website voor de exacte zoektermen die uw klanten gebruiken — bijvoorbeeld 'elektricien Tongeren' of 'boekhoudkantoor Tongeren'. We gebruiken lokale SEO-technieken zoals Google Bedrijfsprofiel-optimalisatie, lokale landingspagina's en interne linkstructuur.",
      },
      {
        q: "Ik ben zelfstandige in Tongeren. Is een professionele website de moeite waard?",
        a: "Absoluut. In een stad als Tongeren zoeken mensen hun lokale dienstverleners steeds vaker via Google. Een professionele website met lokale SEO geeft u een groot voordeel op concurrenten die nog geen sterke online aanwezigheid hebben.",
      },
    ],
  },
  bilzen: {
    name: "Bilzen",
    region: "Zuid-Limburg",
    lang: "nl",
    slug: "webdesign-bilzen",
    geoLat: 50.8689,
    geoLng: 5.5178,
    h1: "Webdesign Bilzen — Website laten maken voor bedrijven in Bilzen",
    metaTitle: "Webdesign Bilzen | Website Laten Maken Bilzen | SEO | Solyn",
    metaDescription:
      "Solyn maakt professionele websites voor zelfstandigen en KMO's in Bilzen en omgeving. Lokale SEO, snelle websites, meer klanten via Google. Gratis audit.",
    intro:
      "Veel ondernemers in Bilzen werken nog zonder een sterke online aanwezigheid — en dat is precies uw kans. Wij bouwen professionele websites voor lokale bedrijven in Bilzen die klanten aantrekken via Google.be. Van schilders tot advocaten, van bouwbedrijven tot horecazaken — we kennen de markt hier.",
    localContext:
      "Bilzen ligt centraal in Zuid-Limburg, tussen Tongeren, Hasselt en Maastricht. Uw klanten zoeken lokaal: 'website laten maken Bilzen', 'loodgieter Bilzen', 'kapsalon Bilzen'. Wij zorgen dat u bovenaan die resultaten staat.",
    nearbyTowns: ["Tongeren", "Hasselt", "Riemst", "Borgloon", "Diepenbeek", "Wellen"],
    extraFAQ: [
      {
        q: "Zijn er veel concurrenten voor mijn zoekterm in Bilzen?",
        a: "Bilzen is een kleinere stad, wat betekent dat lokale SEO hier sneller resultaat oplevert dan in grotere steden. In veel niches in Bilzen heeft u weinig directe online concurrentie. Dat is een voordeel dat u nu moet benutten.",
      },
      {
        q: "Werken jullie ook met bedrijven in de deelgemeenten rond Bilzen?",
        a: "Ja — we bedienen ook klanten in Hoeselt, Eigenbilzen, Rosmeer, Kleine-Spouwen en de rest van de regio rond Bilzen. Lokale kennis is onze troef.",
      },
    ],
  },
  borgloon: {
    name: "Borgloon",
    region: "Zuid-Limburg",
    lang: "nl",
    slug: "webdesign-borgloon",
    geoLat: 50.8014,
    geoLng: 5.3519,
    h1: "Webdesign Borgloon — Professionele website laten maken in Borgloon",
    metaTitle: "Webdesign Borgloon | Website Laten Maken | Lokale SEO | Solyn",
    metaDescription:
      "Solyn bouwt professionele websites voor zelfstandigen en KMO's in Borgloon en de Haspengouwregio. Lokale SEO, vaste prijs, meetbaar resultaat.",
    intro:
      "Borgloon ligt in het hart van Haspengouw — een regio vol ambitieuze lokale ondernemers die online nog niet zichtbaar zijn. Wij bouwen voor bedrijven in Borgloon websites die gevonden worden op Google.be en bezoekers omzetten in echte klanten.",
    localContext:
      "Of je nu in Borgloon-centrum, Jesseren, Kortessem of omgeving zit — lokale zoekopdrachten zoals 'website laten maken Borgloon' of 'webdesign Haspengouw' zijn regio's waar wij jou bovenaan willen zetten. Wij weten hoe de Limburgse consument zoekt.",
    nearbyTowns: ["Tongeren", "Sint-Truiden", "Wellen", "Heers", "Alken"],
    extraFAQ: [
      {
        q: "Is lokale SEO ook nuttig voor kleine bedrijven in Borgloon?",
        a: "Zeker. In een gemeente als Borgloon is het competitieniveau online laag — een goed geoptimaliseerde website scoort hier snel hoog in Google. Dat geeft kleinere bedrijven een enorm voordeel tegenover grotere concurrenten die uw regio negeren.",
      },
      {
        q: "Wij zijn actief in Haspengouw, niet alleen in Borgloon. Kunnen jullie helpen?",
        a: "Absoluut. We bouwen regionale landingspagina's voor elke gemeente of deelgemeente die u wilt bereiken — Borgloon, Heers, Wellen, Sint-Truiden, Tongeren — en we optimaliseren per locatie.",
      },
    ],
  },
  riemst: {
    name: "Riemst",
    region: "Zuid-Limburg",
    lang: "nl",
    slug: "webdesign-riemst",
    geoLat: 50.8131,
    geoLng: 5.5906,
    h1: "Webdesign Riemst — Website laten maken voor bedrijven in Riemst",
    metaTitle: "Webdesign Riemst | Website Laten Maken Riemst | Solyn",
    metaDescription:
      "Solyn bouwt professionele websites voor bedrijven in Riemst en omliggende gemeenten. Lokale SEO, vaste prijs. Vraag vandaag een gratis audit aan.",
    intro:
      "Riemst is een gemeente met veel zelfstandige ondernemers die online nauwelijks zichtbaar zijn. Dat is uw kans. Wij bouwen voor lokale bedrijven in Riemst een professionele website met lokale SEO — zodat uw klanten u vinden vóór uw concurrenten.",
    localContext:
      "Van Kanne tot Vlijtingen, van Vroenhoven tot Val-Meer — wij kennen de deelgemeenten van Riemst en hoe lokale klanten zoeken. 'Schilder Riemst', 'tuinaannemer Riemst' of 'boekhoudkantoor Tongeren' — wij optimaliseren voor wat uw doelklant intypt.",
    nearbyTowns: ["Tongeren", "Bilzen", "Maastricht (NL)", "Visé", "Herstappe"],
    extraFAQ: [
      {
        q: "Kan een website mij helpen klanten te vinden in Riemst én Maastricht?",
        a: "Ja — Riemst ligt vlak aan de grens met Nederland. We kunnen uw website optimaliseren voor zowel Belgische als Nederlandse zoekresultaten, zodat u klanten aan beide kanten van de grens aantrekt.",
      },
    ],
  },
  "sint-truiden": {
    name: "Sint-Truiden",
    region: "Zuid-Limburg",
    lang: "nl",
    slug: "webdesign-sint-truiden",
    geoLat: 50.8178,
    geoLng: 5.1866,
    h1: "Webdesign Sint-Truiden — Professionele website laten maken in Sint-Truiden",
    metaTitle: "Webdesign Sint-Truiden | Website Laten Maken | SEO | Solyn",
    metaDescription:
      "Solyn maakt professionele websites voor KMO's en zelfstandigen in Sint-Truiden. Lokale SEO, hogere Google-positie, meer klanten. Gratis audit.",
    intro:
      "Sint-Truiden is een bruisende stad in het hart van Haspengouw met een sterke handelskern en veel lokale bedrijven. Toch zijn de meeste KMO's hier online nauwelijks zichtbaar. Dat is precies waar Solyn het verschil maakt — wij bouwen websites die ranken op Google.be voor zoektermen die uw klanten écht gebruiken.",
    localContext:
      "Of uw bedrijf nu in het centrum van Sint-Truiden zit, in Zepperen, Brustem of Gelinden — wij kennen de regio en weten hoe lokale consumenten zoeken. 'Loodgieter Sint-Truiden', 'webdesign Sint-Truiden', 'kapper Sint-Truiden' — u wilt bovenaan staan, wij zorgen daarvoor.",
    nearbyTowns: ["Borgloon", "Hasselt", "Tongeren", "Gingelom", "Nieuwerkerken"],
    extraFAQ: [
      {
        q: "Hoe snel kan mijn website in Sint-Truiden ranken op Google?",
        a: "In een stad als Sint-Truiden, waar de online concurrentie in de meeste niches nog laag is, zien we vaak resultaten binnen 60 tot 90 dagen na publicatie. Dat is mede afhankelijk van uw branche en hoe geoptimaliseerd uw Google Bedrijfsprofiel is.",
      },
    ],
  },
  luik: {
    name: "Liège",
    region: "Liège",
    lang: "fr",
    slug: "webdesign-luik",
    geoLat: 50.6326,
    geoLng: 5.5797,
    h1: "Création de site web à Liège — Sites web professionnels pour entreprises liégeoises",
    metaTitle: "Création site web Liège | Agence web Liège | Solyn",
    metaDescription:
      "Solyn crée des sites web professionnels pour PMEs et indépendants à Liège. SEO local, chargement rapide, plus de clients via Google.be. Audit gratuit.",
    intro:
      "Liège est l'un des principaux pôles économiques de Wallonie. Nous concevons des sites rapides et orientés conversion pour les entreprises liégeoises qui veulent dominer Google.be et générer plus de leads qualifiés.",
    nearbyTowns: ["Seraing", "Herstal", "Ans", "Flémalle", "Ougrée"],
  },
  namen: {
    name: "Namur",
    region: "Namur",
    lang: "fr",
    slug: "webdesign-namen",
    geoLat: 50.4654,
    geoLng: 4.8677,
    h1: "Création de site web à Namur — Sites web professionnels pour entreprises namuroises",
    metaTitle: "Création site web Namur | Agence web Namur | Solyn",
    metaDescription:
      "Solyn crée des sites web performants pour PMEs à Namur. SEO local optimisé pour Google.be, design conversion-first, prix fixe. Audit gratuit.",
    intro:
      "Namur, capitale de la Wallonie, est un terrain fertile pour les PMEs ambitieuses. Nous construisons des sites web performants, orientés SEO et conversion, parfaitement adaptés au marché namurois.",
    nearbyTowns: ["Jambes", "Salzinnes", "Bouge", "Temploux", "Wépion"],
  },
  leuven: {
    name: "Leuven",
    region: "Vlaams-Brabant",
    lang: "nl",
    slug: "webdesign-leuven",
    geoLat: 50.8798,
    geoLng: 4.7005,
    h1: "Webdesign Leuven — Professionele websites voor bedrijven in Leuven",
    metaTitle: "Webdesign Leuven | Website Laten Maken Leuven | Solyn",
    metaDescription:
      "Solyn bouwt premium websites voor Leuvense startups en KMO's. Lokale SEO, razendsnelle websites, meer leads via Google.be.",
    intro:
      "Leuven combineert academische innovatie met een sterk ondernemersklimaat. Wij ontwerpen websites voor Leuvense startups en KMO's die snel willen groeien en hoog willen ranken in Google.be.",
    nearbyTowns: ["Heverlee", "Kessel-Lo", "Wijgmaal", "Wilsele", "Rotselaar"],
  },
  mechelen: {
    name: "Mechelen",
    region: "Antwerpen",
    lang: "nl",
    slug: "webdesign-mechelen",
    geoLat: 51.0259,
    geoLng: 4.4776,
    h1: "Webdesign Mechelen — Professionele websites voor bedrijven in Mechelen",
    metaTitle: "Webdesign Mechelen | Website Laten Maken Mechelen | Solyn",
    metaDescription:
      "Solyn bouwt professionele websites voor Mechelse KMO's. SEO-first aanpak, snelle laadtijden, meer klanten via Google.be. Vraag een gratis audit aan.",
    intro:
      "Mechelen is uitgegroeid tot een dynamische hub voor ondernemers tussen Brussel en Antwerpen. Wij bouwen websites die de Mechelse markt aanspreken en zichtbaar maken op Google.be.",
    nearbyTowns: ["Muizen", "Walem", "Heffen", "Leest", "Bonheiden"],
  },
};

const FEATURES_NL = [
  {
    icon: Search,
    title: "Lokale SEO voor Google.be",
    desc: "Geoptimaliseerd om te ranken voor zoekopdrachten in uw stad, gemeente en regio — inclusief Google Bedrijfsprofiel-optimalisatie.",
  },
  {
    icon: Gauge,
    title: "Razendsnelle laadtijden",
    desc: "Sub-1 seconde laadtijd op desktop én mobiel. Snelheid is een directe rankingfactor voor Google en verhoogt uw conversieratio.",
  },
  {
    icon: Sparkles,
    title: "Conversiegericht ontwerp",
    desc: "Elk element heeft één doel: van bezoeker naar offerte-aanvraag. Duidelijke CTA's, vertrouwenssignalen en mobiel-first structuur.",
  },
];
const FEATURES_FR = [
  {
    icon: Search,
    title: "SEO local pour Google.be",
    desc: "Optimisé pour ranker sur les recherches dans votre ville et région — y compris l'optimisation de votre fiche Google Business.",
  },
  {
    icon: Gauge,
    title: "Temps de chargement ultra-rapides",
    desc: "Moins d'une seconde sur desktop et mobile — facteur de classement direct sur Google et levier de conversion prouvé.",
  },
  {
    icon: Sparkles,
    title: "Design orienté conversion",
    desc: "Chaque élément a un objectif : transformer le visiteur en demande de devis. CTAs clairs, signaux de confiance, structure mobile-first.",
  },
];

const FAQ_NL = (city: string) => [
  {
    q: `Werken jullie ook met bedrijven buiten ${city}?`,
    a: `Ja. Wij bedienen klanten in heel België, met extra focus op ${city} en de bredere regio voor lokale SEO-projecten.`,
  },
  {
    q: "Hoe lang duurt een webdesign-project?",
    a: "De meeste websites zijn live in 2 tot 4 weken. MVP's en complexere projecten lopen typisch 4 tot 8 weken. U krijgt altijd een duidelijke planning vooraf.",
  },
  {
    q: `Wat kost een website in ${city}?`,
    a: `We werken met een vast maandbedrag vanaf €300/maand of een eenmalige MVP-build vanaf €3.000. Geen verborgen kosten, geen verrassingen.`,
  },
  {
    q: "Helpen jullie ook met Google Bedrijfsprofiel?",
    a: "Ja. Optimalisatie van uw Google Bedrijfsprofiel is een van de sterkste lokale SEO-signalen. Wij nemen dit mee in elk lokaal SEO-project.",
  },
];
const FAQ_FR = (city: string) => [
  {
    q: `Travaillez-vous avec des entreprises en dehors de ${city} ?`,
    a: `Oui. Nous travaillons avec des clients dans toute la Belgique, avec une expertise locale particulière à ${city} et la région environnante.`,
  },
  {
    q: "Combien de temps prend un projet de site web ?",
    a: "La plupart des sites sont en ligne en 2 à 4 semaines. Les MVPs prennent généralement 4 à 8 semaines. Vous recevez un planning clair dès le départ.",
  },
  {
    q: `Combien coûte un site web à ${city} ?`,
    a: "Nous proposons un forfait mensuel dès 300€/mois ou un build MVP unique dès 3.000€. Pas de frais cachés.",
  },
  {
    q: "Aidez-vous aussi avec Google Business Profile ?",
    a: "Oui. L'optimisation de votre fiche Google Business est l'un des signaux SEO local les plus puissants. Nous l'intégrons dans chaque projet SEO local.",
  },
];

const COPY = {
  nl: {
    badge: (r: string) => r,
    cta1: "Gratis audit aanvragen",
    cta2: "Bekijk Prijzen",
    trust: (c: string) => [
      "SEO-First Webdesign",
      `Actief in ${c} en omgeving`,
      "Resultaten binnen 90 dagen",
      "Geoptimaliseerd voor Google.be",
    ],
    whyHeading: (c: string) => `Waarom Solyn voor uw onderneming in ${c}?`,
    whySub:
      "Lokaal verankerd, technisch sterk, en gericht op meetbaar resultaat in Google.be.",
    nearbyHeading: "Ook actief in de buurgemeenten",
    nearbySub: (c: string) =>
      `Naast ${c} bedienen wij ook ondernemers in de omliggende gemeenten. Lokale SEO werkt het best als we uw hele regio aanpakken.`,
    faqHeading: "Veelgestelde vragen",
    ctaHeading: (c: string) => `Klaar om hoger te ranken in ${c}?`,
    ctaSub:
      "Ontvang een gratis audit van uw huidige site met concrete verbeterpunten voor SEO, snelheid en conversie.",
  },
  fr: {
    badge: (r: string) => r,
    cta1: "Demandez un audit gratuit",
    cta2: "Voir les Tarifs",
    trust: (c: string) => [
      "Webdesign orienté SEO",
      `Actifs à ${c} et environs`,
      "Résultats en 90 jours",
      "Conçu pour ranker sur Google.be",
    ],
    whyHeading: (c: string) => `Pourquoi choisir Solyn pour votre entreprise à ${c} ?`,
    whySub:
      "Ancrés localement, techniquement solides, et focalisés sur des résultats mesurables sur Google.be.",
    nearbyHeading: "Actifs aussi dans les communes voisines",
    nearbySub: (c: string) =>
      `En plus de ${c}, nous accompagnons des entrepreneurs dans les communes environnantes.`,
    faqHeading: "Questions fréquentes",
    ctaHeading: (c: string) => `Prêt à ranker plus haut à ${c} ?`,
    ctaSub:
      "Recevez un audit gratuit de votre site actuel avec des recommandations concrètes pour le SEO, la vitesse et la conversion.",
  },
};

const CityLanding = () => {
  const location = useLocation();
  const rawSlug = location.pathname
    .replace(/^\/webdesign-/, "")
    .replace(/\/$/, "") as CityKey;
  const navigate = useNavigate();
  const data = CITIES[rawSlug];

  if (!data) {
    navigate("/", { replace: true });
    return null;
  }

  const copy = COPY[data.lang];
  const features = data.lang === "fr" ? FEATURES_FR : FEATURES_NL;
  const baseFAQ = data.lang === "fr" ? FAQ_FR(data.name) : FAQ_NL(data.name);
  const faq = data.extraFAQ ? [...baseFAQ, ...data.extraFAQ] : baseFAQ;
  const title = data.metaTitle ?? `${data.h1.split(" — ")[0]} | Solyn Global`;
  const description = data.metaDescription;
  const url = `https://solyn-global.com/${data.slug}`;

  const schemaLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Solyn Global",
    url: "https://solyn-global.com",
    description,
    telephone: "+32-xxx-xx-xx-xx",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bilzen",
      addressLocality: "Bilzen",
      addressRegion: "Limburg",
      postalCode: "3740",
      addressCountry: "BE",
    },
    ...(data.geoLat && data.geoLng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: data.geoLat,
            longitude: data.geoLng,
          },
        }
      : {}),
    areaServed: [
      { "@type": "City", name: data.name },
      ...(data.nearbyTowns?.map((t) => ({ "@type": "City", name: t })) ?? []),
    ],
    serviceType: "Webdesign & Lokale SEO",
    priceRange: "€€",
    sameAs: ["https://solyn-global.com"],
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
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
        name: `Webdesign ${data.name}`,
        item: url,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <html lang={data.lang} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content={`BE-VLI`} />
        <meta name="geo.placename" content={data.name} />
        {data.geoLat && <meta name="geo.position" content={`${data.geoLat};${data.geoLng}`} />}
        <script type="application/ld+json">{JSON.stringify(schemaLocalBusiness)}</script>
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
            {copy.badge(data.region)}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.1]"
          >
            {data.h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-gray-500 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed"
          >
            {data.intro}
          </motion.p>

          {data.localContext && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-gray-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
            >
              {data.localContext}
            </motion.p>
          )}

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
              {copy.cta1}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/pricing")}
              className="rounded-full border-gray-300 text-black hover:bg-gray-50 font-medium px-7 py-6 text-base"
            >
              {copy.cta2}
            </Button>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            {copy.trust(data.name).map((item) => (
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
              {copy.whyHeading(data.name)}
            </h2>
            <p className="text-gray-500 mt-3">{copy.whySub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f, i) => (
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

      {/* Nearby towns */}
      {data.nearbyTowns && data.nearbyTowns.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight mb-3">
              {copy.nearbyHeading}
            </h2>
            <p className="text-gray-500 text-sm mb-8">{copy.nearbySub(data.name)}</p>
            <div className="flex flex-wrap gap-3">
              {data.nearbyTowns.map((town) => (
                <div
                  key={town}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-700 font-medium"
                >
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  {town}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-10">
            {copy.faqHeading}
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

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-black rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {copy.ctaHeading(data.name)}
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">{copy.ctaSub}</p>
          <Button
            onClick={() => navigate("/book")}
            className="mt-8 rounded-full bg-white text-black hover:bg-white/90 font-medium px-7 py-6 text-base gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            {copy.cta1}
          </Button>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default CityLanding;
