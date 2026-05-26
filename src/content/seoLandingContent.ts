// SEO landing page content per locale.
// Hyper-keyword-dense copy targeting "website laten maken", "web development company", etc.

export type SeoLandingContent = {
  locale: "nl" | "fr" | "en";
  path: string;
  hreflang: string;
  // Meta
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  // Hero
  eyebrow: string;
  h1: string;
  h1Highlight: string;
  subHeadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustLine: string;
  trustBadges: string[];
  // Stats strip
  stats: { value: string; label: string }[];
  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  services: { title: string; desc: string; keywords: string[] }[];
  // Why us
  whyTitle: string;
  whyItems: { title: string; desc: string }[];
  // Process
  processTitle: string;
  processSubtitle: string;
  processSteps: { step: string; title: string; desc: string }[];
  // Industries
  industriesTitle: string;
  industriesSubtitle: string;
  industries: string[];
  // Testimonials
  testimonialsTitle: string;
  testimonials: { quote: string; author: string; role: string }[];
  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faq: { q: string; a: string }[];
  // Final CTA
  finalTitle: string;
  finalSub: string;
  finalCta: string;
  // SEO body (long-form keyword-rich paragraph for ranking)
  longFormTitle: string;
  longFormParagraphs: string[];
};

export const seoLandingContent: Record<"nl" | "fr" | "en", SeoLandingContent> = {
  nl: {
    locale: "nl",
    path: "/website-laten-maken",
    hreflang: "nl-BE",
    metaTitle: "Website Laten Maken | Webdevelopment Bedrijf Solyn — Vanaf €3.000",
    metaDescription:
      "Een professionele website laten maken? Solyn is hét webdevelopment bedrijf voor ondernemers, KMO's en startups. Snelle, SEO-vriendelijke websites op maat. Vraag gratis offerte.",
    keywords:
      "website laten maken, webdevelopment bedrijf, website bouwen, webdesign, website op maat, webdevelopment Belgïe, professionele website, website kopen, webbureau, web design Antwerpen, website maken prijs",
    eyebrow: "Webdevelopment bedrijf · België & EU",
    h1: "Website laten maken die écht klanten oplevert",
    h1Highlight: "klanten oplevert",
    subHeadline:
      "Solyn is het webdevelopment bedrijf voor ondernemers die een professionele website willen laten maken — snel, SEO-geoptimaliseerd en volledig op maat. Van €3.000, opgeleverd in 7 tot 14 dagen.",
    ctaPrimary: "Vraag gratis offerte aan",
    ctaSecondary: "Bekijk onze projecten",
    trustLine: "Vertrouwd door 200+ ondernemers in België, Nederland en daarbuiten",
    trustBadges: ["Lovable Gold Partner", "GDPR-conform", "4.9★ klantbeoordeling", "Geleverd in 14 dagen"],
    stats: [
      { value: "200+", label: "Websites gebouwd" },
      { value: "14 dagen", label: "Gem. opleverduur" },
      { value: "€3K", label: "Startprijs op maat" },
      { value: "98%", label: "Klanttevredenheid" },
    ],
    servicesTitle: "Wat we voor u bouwen",
    servicesSubtitle:
      "Alles wat u nodig heeft om online te groeien — van een eenvoudige bedrijfswebsite tot een volledig maatwerk platform.",
    services: [
      {
        title: "Bedrijfswebsite laten maken",
        desc: "Een professionele bedrijfswebsite die uw merk uitstraalt, vertrouwen wekt en leads converteert. Mobielvriendelijk, snel en SEO-klaar.",
        keywords: ["Bedrijfswebsite", "Corporate site", "KMO website"],
      },
      {
        title: "Webshop & e-commerce",
        desc: "Een webshop laten maken met veilige betalingen, voorraadbeheer en SEO-geoptimaliseerde productpagina's die ranken in Google.",
        keywords: ["Webshop bouwen", "E-commerce", "Online winkel"],
      },
      {
        title: "Webdesign op maat",
        desc: "Volledig op maat ontworpen webdesign — geen templates. Uniek, gepolijst en gebouwd rond uw doelgroep en conversiedoelen.",
        keywords: ["Custom webdesign", "UI/UX", "Branding"],
      },
      {
        title: "SEO-website & content",
        desc: "Een website die niet alleen mooi is, maar ook gevonden wordt. Technische SEO, snelle Core Web Vitals en SEO-copy ingebouwd.",
        keywords: ["SEO website", "Google ranking", "Core Web Vitals"],
      },
      {
        title: "Landingspagina's & campagnes",
        desc: "Hoog-converterende landingspagina's voor Google Ads, Meta Ads of e-mailcampagnes. Klaar voor A/B-tests en analytics.",
        keywords: ["Landing page", "Conversie", "Performance marketing"],
      },
      {
        title: "Onderhoud & hosting",
        desc: "Maandelijks onderhoud, hosting, updates en kleine aanpassingen. Uw website blijft snel, veilig en up-to-date.",
        keywords: ["Website onderhoud", "Hosting", "Support"],
      },
    ],
    whyTitle: "Waarom kiezen ondernemers voor Solyn?",
    whyItems: [
      {
        title: "Snel opgeleverd (7–14 dagen)",
        desc: "Geen maandenlange trajecten. We werken in sprints en zetten uw website live binnen twee weken — zonder kwaliteitsverlies.",
      },
      {
        title: "Vaste prijs vanaf €3.000",
        desc: "Transparante prijzen, geen verborgen kosten. U weet vooraf exact wat u betaalt en wat u krijgt.",
      },
      {
        title: "SEO standaard inbegrepen",
        desc: "Technische SEO, gestructureerde data, snelle laadtijden en zoekwoordoptimalisatie zitten standaard in elk pakket.",
      },
      {
        title: "Eigenaar van uw code",
        desc: "U bent volledig eigenaar van uw website, code en domein. Geen vendor lock-in, geen verrassingen.",
      },
    ],
    processTitle: "Zo laat u uw website maken bij Solyn",
    processSubtitle: "Een helder proces in 4 stappen — van idee tot live website.",
    processSteps: [
      { step: "01", title: "Strategiegesprek (gratis)", desc: "We luisteren naar uw doelen, doelgroep en concurrentie. U krijgt een concreet voorstel en een vaste prijs." },
      { step: "02", title: "Design & wireframes", desc: "Uniek webdesign op maat van uw merk. We delen ontwerpen ter goedkeuring vóór er één regel code geschreven wordt." },
      { step: "03", title: "Development & SEO", desc: "We bouwen uw website met moderne technologie (React, Next.js), schrijven SEO-copy en optimaliseren snelheid." },
      { step: "04", title: "Lancering & groei", desc: "Live binnen 14 dagen. Daarna optioneel maandelijks onderhoud, content en doorlopende SEO-groei." },
    ],
    industriesTitle: "Voor wie wij websites bouwen",
    industriesSubtitle: "We werken met ondernemers in elke sector — van lokale dienstverleners tot tech-startups.",
    industries: [
      "Horeca & restaurants", "Bouw & aannemers", "Medische sector", "Advocaten & notarissen",
      "Coaches & consultants", "Vastgoed & makelaars", "Beauty & wellness", "Automotive",
      "E-commerce & retail", "B2B & SaaS startups", "Fitness & sport", "Creatieve sector",
    ],
    testimonialsTitle: "Wat klanten zeggen",
    testimonials: [
      { quote: "Binnen 12 dagen stond onze nieuwe website online. We krijgen nu 3× meer aanvragen via Google.", author: "Sara D.", role: "Eigenaar, Beauty Studio Antwerpen" },
      { quote: "Solyn voelt aan als ons eigen tech-team. Snel, transparant en oog voor detail.", author: "Mathias V.", role: "Founder, B2B SaaS startup" },
      { quote: "Eindelijk een webbureau dat SEO écht begrijpt. We staan top-3 op onze kernzoektermen.", author: "Karim B.", role: "Manager, Bouwbedrijf Limburg" },
    ],
    faqTitle: "Veelgestelde vragen over een website laten maken",
    faqSubtitle: "Alles wat u moet weten voor u uw website bij Solyn laat bouwen.",
    faq: [
      {
        q: "Wat kost het om een website te laten maken in 2026?",
        a: "Een professionele website laten maken kost bij Solyn vanaf €3.000 voor een Starter Website tot €9.500+ voor een volledig maatwerk platform of webshop. De exacte prijs hangt af van het aantal pagina's, integraties en SEO-strategie.",
      },
      {
        q: "Hoe lang duurt het om een website te bouwen?",
        a: "Onze Starter Website wordt opgeleverd binnen 7 dagen, een Business Website binnen 14 dagen. Voor maatwerkprojecten rekenen we op 4 tot 8 weken, afhankelijk van de scope.",
      },
      {
        q: "Is SEO inbegrepen wanneer ik een website laat maken?",
        a: "Ja. Elke website die we bouwen bevat technische SEO, snelle laadtijden, mobiele optimalisatie, gestructureerde data en zoekwoordoptimalisatie. Doorlopende SEO-content kunt u optioneel maandelijks bij ons afnemen.",
      },
      {
        q: "Ben ik eigenaar van mijn website en domein?",
        a: "U bent 100% eigenaar van uw code, design en domeinnaam. Solyn hanteert geen vendor lock-in — u kunt op elk moment migreren.",
      },
      {
        q: "Werken jullie ook met bedrijven buiten België?",
        a: "Ja. We bouwen websites voor klanten in heel België, Nederland, Frankrijk en internationaal. Alle communicatie verloopt in het Nederlands, Frans of Engels.",
      },
      {
        q: "Bieden jullie ook onderhoud en hosting?",
        a: "Ja. Voor €300/maand verzorgen we hosting, updates, security, kleine aanpassingen en doorlopende SEO-content. U kunt maandelijks opzeggen.",
      },
    ],
    finalTitle: "Klaar om uw website te laten maken?",
    finalSub: "Plan een gratis strategiegesprek van 30 minuten. We bekijken uw project, geven advies en sturen binnen 48 uur een vaste prijs.",
    finalCta: "Plan gratis gesprek",
    longFormTitle: "Een website laten maken bij een gespecialiseerd webdevelopment bedrijf",
    longFormParagraphs: [
      "Een website laten maken is in 2026 geen luxe meer — het is de basis van elk professioneel bedrijf. Of u nu een lokale dienstverlener bent, een KMO, een startup of een gevestigde merknaam: uw website is meestal het eerste contactmoment met een potentiële klant. Daarom is het cruciaal om niet zomaar 'een website' te laten bouwen, maar te kiezen voor een webdevelopment bedrijf dat snelheid, design én SEO op het hoogste niveau combineert.",
      "Bij Solyn bouwen we websites op maat voor ondernemers die meer willen dan een online visitekaartje. We combineren strakke webdesign, technische optimalisatie en SEO-copywriting in één traject. Het resultaat: een website die er prachtig uitziet, razendsnel laadt, hoog scoort in Google en — vooral — daadwerkelijk leads en klanten oplevert. Onze klanten zien gemiddeld 3× meer aanvragen binnen drie maanden na lancering.",
      "Wat ons onderscheidt als webdevelopment bedrijf is onze focus op transparantie en snelheid. We werken in sprints van één tot twee weken, hanteren vaste prijzen vanaf €3.000 en leveren uw website op binnen 14 dagen. U weet vooraf exact wat u krijgt, wat het kost en wanneer het live staat. Geen verrassingen, geen eindeloze offertes, geen verborgen kosten.",
      "Wilt u een professionele website laten maken die past bij uw merk, doelgroep en groeidoelen? Vraag vrijblijvend een offerte aan of plan een gratis strategiegesprek. Binnen 48 uur ontvangt u een concreet voorstel met een vaste prijs en planning.",
    ],
  },

  fr: {
    locale: "fr",
    path: "/creation-site-web",
    hreflang: "fr-BE",
    metaTitle: "Création Site Web | Agence Web Solyn — À partir de 3.000€",
    metaDescription:
      "Faire créer un site web professionnel ? Solyn est l'agence web pour entrepreneurs, PME et startups. Sites rapides, SEO-friendly et sur mesure. Devis gratuit.",
    keywords:
      "création site web, agence web, faire un site internet, développement web, site internet professionnel, agence web Belgique, création site internet, refonte site web, site vitrine, site e-commerce",
    eyebrow: "Agence de développement web · Belgique & UE",
    h1: "Création de site web qui génère vraiment des clients",
    h1Highlight: "génère vraiment des clients",
    subHeadline:
      "Solyn est l'agence web pour les entrepreneurs qui veulent faire créer un site internet professionnel — rapide, optimisé SEO et entièrement sur mesure. À partir de 3.000€, livré en 7 à 14 jours.",
    ctaPrimary: "Demander un devis gratuit",
    ctaSecondary: "Voir nos projets",
    trustLine: "Choisi par plus de 200 entrepreneurs en Belgique, France et au-delà",
    trustBadges: ["Lovable Gold Partner", "Conforme RGPD", "4,9★ avis clients", "Livré en 14 jours"],
    stats: [
      { value: "200+", label: "Sites livrés" },
      { value: "14 jours", label: "Délai moyen" },
      { value: "3K€", label: "Prix de départ" },
      { value: "98%", label: "Satisfaction client" },
    ],
    servicesTitle: "Ce que nous créons pour vous",
    servicesSubtitle:
      "Tout ce dont vous avez besoin pour vous développer en ligne — du site vitrine à la plateforme sur mesure.",
    services: [
      { title: "Site vitrine d'entreprise", desc: "Un site web professionnel qui valorise votre marque, inspire confiance et convertit. Responsive, rapide, prêt pour le SEO.", keywords: ["Site vitrine", "Site corporate", "PME"] },
      { title: "Boutique e-commerce", desc: "Faire créer une boutique en ligne avec paiements sécurisés, gestion des stocks et fiches produits optimisées Google.", keywords: ["E-commerce", "Boutique en ligne", "Shopify"] },
      { title: "Web design sur mesure", desc: "Un design unique — pas de templates. Conçu autour de votre marque, de votre audience et de vos objectifs de conversion.", keywords: ["Design sur mesure", "UI/UX", "Branding"] },
      { title: "Site SEO & contenu", desc: "Un site qui n'est pas seulement beau, mais aussi visible. SEO technique, Core Web Vitals et copywriting SEO inclus.", keywords: ["SEO", "Référencement Google", "Core Web Vitals"] },
      { title: "Landing pages & campagnes", desc: "Landing pages à forte conversion pour Google Ads, Meta Ads ou emailing. Prêtes pour les tests A/B et l'analytics.", keywords: ["Landing page", "Conversion", "Ads"] },
      { title: "Maintenance & hébergement", desc: "Maintenance mensuelle, hébergement, mises à jour et petites modifications. Votre site reste rapide, sécurisé et à jour.", keywords: ["Maintenance", "Hébergement", "Support"] },
    ],
    whyTitle: "Pourquoi les entrepreneurs choisissent Solyn ?",
    whyItems: [
      { title: "Livré rapidement (7–14 jours)", desc: "Pas de projets qui s'éternisent. Nous travaillons en sprints et livrons votre site en deux semaines — sans compromis sur la qualité." },
      { title: "Prix fixe à partir de 3.000€", desc: "Tarifs transparents, aucun coût caché. Vous savez à l'avance ce que vous payez et ce que vous obtenez." },
      { title: "SEO inclus de série", desc: "SEO technique, données structurées, vitesse de chargement et optimisation des mots-clés inclus dans chaque pack." },
      { title: "Vous possédez votre code", desc: "Vous êtes propriétaire à 100% de votre site, code et domaine. Aucun vendor lock-in, aucune mauvaise surprise." },
    ],
    processTitle: "Comment se déroule la création de votre site",
    processSubtitle: "Un processus clair en 4 étapes — de l'idée au site en ligne.",
    processSteps: [
      { step: "01", title: "Appel stratégique (gratuit)", desc: "Nous écoutons vos objectifs, audience et concurrents. Vous recevez une proposition concrète et un prix fixe." },
      { step: "02", title: "Design & wireframes", desc: "Design unique sur mesure de votre marque. Vous validez les maquettes avant la moindre ligne de code." },
      { step: "03", title: "Développement & SEO", desc: "Nous développons avec des technologies modernes (React, Next.js), rédigeons le contenu SEO et optimisons la vitesse." },
      { step: "04", title: "Lancement & croissance", desc: "En ligne en 14 jours. Ensuite, maintenance mensuelle optionnelle, contenu et SEO continu." },
    ],
    industriesTitle: "Pour qui nous créons des sites",
    industriesSubtitle: "Nous travaillons avec des entrepreneurs de tous secteurs — du local à la startup tech.",
    industries: [
      "Restauration & HoReCa", "Construction & artisans", "Secteur médical", "Avocats & notaires",
      "Coachs & consultants", "Immobilier", "Beauté & bien-être", "Automobile",
      "E-commerce & retail", "B2B & SaaS startups", "Fitness & sport", "Industries créatives",
    ],
    testimonialsTitle: "Ce que disent nos clients",
    testimonials: [
      { quote: "Notre nouveau site était en ligne en 12 jours. Nous recevons maintenant 3× plus de demandes via Google.", author: "Sara D.", role: "Propriétaire, Beauty Studio Anvers" },
      { quote: "Solyn agit comme notre propre équipe tech. Rapide, transparent, soigné.", author: "Mathias V.", role: "Fondateur, startup SaaS B2B" },
      { quote: "Enfin une agence qui comprend vraiment le SEO. Nous sommes top-3 sur nos mots-clés.", author: "Karim B.", role: "Manager, BTP Limbourg" },
    ],
    faqTitle: "Questions fréquentes sur la création d'un site web",
    faqSubtitle: "Tout ce qu'il faut savoir avant de faire créer votre site chez Solyn.",
    faq: [
      { q: "Combien coûte la création d'un site web en 2026 ?", a: "Faire créer un site web chez Solyn coûte à partir de 3.000€ pour un site Starter jusqu'à 9.500€+ pour une plateforme sur mesure ou e-commerce. Le prix dépend du nombre de pages, des intégrations et de la stratégie SEO." },
      { q: "Combien de temps pour créer un site web ?", a: "Notre site Starter est livré en 7 jours, le site Business en 14 jours. Pour les projets sur mesure, prévoyez 4 à 8 semaines selon la portée." },
      { q: "Le SEO est-il inclus ?", a: "Oui. Chaque site que nous créons inclut le SEO technique, la vitesse de chargement, l'optimisation mobile, les données structurées et l'optimisation des mots-clés. Le contenu SEO continu est optionnel en mensuel." },
      { q: "Suis-je propriétaire de mon site et domaine ?", a: "Vous êtes propriétaire à 100% de votre code, design et nom de domaine. Aucun vendor lock-in — vous pouvez migrer à tout moment." },
      { q: "Travaillez-vous avec des clients hors Belgique ?", a: "Oui. Nous créons des sites pour des clients en Belgique, France, Pays-Bas et à l'international. Communication en français, néerlandais ou anglais." },
      { q: "Proposez-vous maintenance et hébergement ?", a: "Oui. Pour 300€/mois, nous gérons l'hébergement, les mises à jour, la sécurité, les petites modifications et le contenu SEO continu. Résiliable mensuellement." },
    ],
    finalTitle: "Prêt à faire créer votre site web ?",
    finalSub: "Réservez un appel stratégique gratuit de 30 minutes. Nous analysons votre projet, conseillons et envoyons un prix fixe sous 48 h.",
    finalCta: "Planifier un appel gratuit",
    longFormTitle: "Faire créer son site web par une agence web spécialisée",
    longFormParagraphs: [
      "En 2026, faire créer un site web n'est plus un luxe — c'est la base de toute entreprise professionnelle. Que vous soyez un prestataire local, une PME, une startup ou une marque établie : votre site est souvent le premier point de contact avec un client potentiel. Il est donc crucial de ne pas simplement « faire un site », mais de choisir une agence web qui combine rapidité, design et SEO au plus haut niveau.",
      "Chez Solyn, nous créons des sites web sur mesure pour les entrepreneurs qui veulent plus qu'une carte de visite en ligne. Nous combinons design web soigné, optimisation technique et copywriting SEO dans un seul parcours. Le résultat : un site magnifique, ultra-rapide, bien référencé sur Google et — surtout — qui génère réellement des leads. Nos clients voient en moyenne 3× plus de demandes dans les trois mois suivant le lancement.",
      "Ce qui nous distingue comme agence web, c'est notre obsession de la transparence et de la rapidité. Nous travaillons en sprints d'une à deux semaines, avec des prix fixes à partir de 3.000€, et livrons votre site en 14 jours. Vous savez à l'avance ce que vous obtenez, combien cela coûte et quand cela sera en ligne.",
      "Vous voulez faire créer un site web professionnel adapté à votre marque ? Demandez un devis gratuit ou planifiez un appel stratégique. Vous recevrez une proposition concrète sous 48 heures.",
    ],
  },

  en: {
    locale: "en",
    path: "/web-development-company",
    hreflang: "en",
    metaTitle: "Web Development Company | Build a Website with Solyn — From €3,000",
    metaDescription:
      "Looking for a web development company to build your website? Solyn designs and builds fast, SEO-optimised websites for founders, SMEs and startups. Get a free quote.",
    keywords:
      "web development company, website development, build a website, hire web developer, custom website design, SEO website, web design agency, ecommerce development, professional website, web agency Europe",
    eyebrow: "Web development company · Europe-wide",
    h1: "The web development company that actually wins you customers",
    h1Highlight: "actually wins you customers",
    subHeadline:
      "Solyn is the web development company for founders who want a professional website built — fast, SEO-optimised and fully custom. From €3,000, delivered in 7 to 14 days.",
    ctaPrimary: "Get a free quote",
    ctaSecondary: "See our work",
    trustLine: "Trusted by 200+ founders across Europe and beyond",
    trustBadges: ["Lovable Gold Partner", "GDPR-compliant", "4.9★ client rating", "Shipped in 14 days"],
    stats: [
      { value: "200+", label: "Websites shipped" },
      { value: "14 days", label: "Avg. delivery" },
      { value: "€3K", label: "Starting price" },
      { value: "98%", label: "Client satisfaction" },
    ],
    servicesTitle: "What we build for you",
    servicesSubtitle:
      "Everything you need to grow online — from a simple business website to a fully custom platform.",
    services: [
      { title: "Business website development", desc: "A professional business website that elevates your brand, builds trust and converts. Mobile-first, fast and SEO-ready.", keywords: ["Business site", "Corporate website", "SME"] },
      { title: "E-commerce development", desc: "Build a webshop with secure payments, inventory management and SEO-optimised product pages that rank on Google.", keywords: ["E-commerce", "Online store", "Shopify"] },
      { title: "Custom web design", desc: "Fully custom web design — no templates. Built around your brand, audience and conversion goals.", keywords: ["Custom design", "UI/UX", "Branding"] },
      { title: "SEO websites & content", desc: "Websites that aren't just beautiful — they get found. Technical SEO, Core Web Vitals and on-page SEO baked in.", keywords: ["SEO", "Google ranking", "Core Web Vitals"] },
      { title: "Landing pages & campaigns", desc: "High-converting landing pages for Google Ads, Meta Ads or email campaigns. A/B-test and analytics-ready.", keywords: ["Landing page", "Conversion", "Performance"] },
      { title: "Maintenance & hosting", desc: "Monthly maintenance, hosting, updates and small tweaks. Your website stays fast, secure and up-to-date.", keywords: ["Maintenance", "Hosting", "Support"] },
    ],
    whyTitle: "Why founders choose Solyn",
    whyItems: [
      { title: "Shipped fast (7–14 days)", desc: "No multi-month projects. We work in sprints and launch your website within two weeks — no quality compromise." },
      { title: "Fixed price from €3,000", desc: "Transparent pricing, no hidden fees. You know exactly what you pay and what you get." },
      { title: "SEO included by default", desc: "Technical SEO, structured data, fast loading and on-page optimisation come standard in every package." },
      { title: "You own your code", desc: "You own your code, design and domain 100%. No vendor lock-in, no surprises." },
    ],
    processTitle: "How we build your website",
    processSubtitle: "A clear 4-step process — from idea to live website.",
    processSteps: [
      { step: "01", title: "Strategy call (free)", desc: "We listen to your goals, audience and competitors. You get a concrete proposal and a fixed price." },
      { step: "02", title: "Design & wireframes", desc: "Custom web design tailored to your brand. You approve mockups before a single line of code is written." },
      { step: "03", title: "Development & SEO", desc: "We build with modern tech (React, Next.js), write SEO copy and optimise for speed." },
      { step: "04", title: "Launch & grow", desc: "Live in 14 days. Then optional monthly maintenance, content and ongoing SEO growth." },
    ],
    industriesTitle: "Industries we build for",
    industriesSubtitle: "We work with founders across every industry — from local services to tech startups.",
    industries: [
      "Hospitality & restaurants", "Construction & trades", "Healthcare & medical", "Legal & professional services",
      "Coaches & consultants", "Real estate", "Beauty & wellness", "Automotive",
      "E-commerce & retail", "B2B & SaaS startups", "Fitness & sports", "Creative industries",
    ],
    testimonialsTitle: "What clients say",
    testimonials: [
      { quote: "Our new website was live in 12 days. We now get 3× more inbound leads via Google.", author: "Sara D.", role: "Owner, Beauty Studio Antwerp" },
      { quote: "Solyn feels like our own in-house tech team. Fast, transparent, detail-obsessed.", author: "Mathias V.", role: "Founder, B2B SaaS startup" },
      { quote: "Finally a web agency that truly understands SEO. We rank top-3 on our core terms.", author: "Karim B.", role: "Manager, Construction firm" },
    ],
    faqTitle: "Frequently asked questions about web development",
    faqSubtitle: "Everything you need to know before hiring Solyn as your web development company.",
    faq: [
      { q: "How much does a website cost in 2026?", a: "At Solyn, having a professional website built starts at €3,000 for a Starter Website and goes up to €9,500+ for a fully custom platform or webshop. The exact price depends on pages, integrations and SEO strategy." },
      { q: "How long does it take to build a website?", a: "Our Starter Website ships within 7 days, the Business Website within 14 days. Custom projects typically take 4 to 8 weeks depending on scope." },
      { q: "Is SEO included when you build my website?", a: "Yes. Every website we build includes technical SEO, fast loading, mobile optimisation, structured data and on-page keyword optimisation. Ongoing SEO content is available as an optional monthly add-on." },
      { q: "Do I own my website and domain?", a: "You own your code, design and domain 100%. Solyn never uses vendor lock-in — you can migrate at any time." },
      { q: "Do you work with clients outside Europe?", a: "Yes. We work with founders across Europe, the UK and internationally. All communication is in English, Dutch or French." },
      { q: "Do you offer maintenance and hosting?", a: "Yes. For €300/month we handle hosting, updates, security, small tweaks and ongoing SEO content. Cancel any time." },
    ],
    finalTitle: "Ready to build your website?",
    finalSub: "Book a free 30-minute strategy call. We'll review your project, give advice and send a fixed quote within 48 hours.",
    finalCta: "Book free call",
    longFormTitle: "Hiring a specialised web development company",
    longFormParagraphs: [
      "In 2026, having a website built is no longer a luxury — it's the foundation of any serious business. Whether you're a local service provider, an SME, a startup or an established brand, your website is usually the first touchpoint with a potential customer. That's why it's critical to choose a web development company that combines speed, design and SEO at the highest level — not just 'a website'.",
      "At Solyn, we build websites for founders who want more than an online business card. We combine sharp web design, technical optimisation and SEO copywriting into a single sprint. The result: a website that looks beautiful, loads in under a second, ranks on Google and — most importantly — actually drives leads and customers. Our clients see on average 3× more inbound inquiries within three months of launch.",
      "What sets us apart as a web development company is our obsession with transparency and speed. We work in one- to two-week sprints, with fixed prices starting at €3,000, and ship your website within 14 days. You know upfront exactly what you'll get, what it'll cost and when it'll go live. No surprises, no endless quotes, no hidden fees.",
      "Want a professional website built that matches your brand, audience and growth goals? Request a free quote or book a strategy call. You'll get a concrete proposal with a fixed price and timeline within 48 hours.",
    ],
  },
};
