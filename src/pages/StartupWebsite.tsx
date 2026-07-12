import ServicePage from "./ServicePage";

const StartupWebsite = () => (
  <ServicePage
    slug="startup-website"
    title="Website Laten Maken voor Startups — Solyn Global"
    metaDescription="Solyn Global bouwt premium websites voor startups in België. Snel online, conversiegericht en schaalbaar."
    h1="Website Laten Maken voor Startups in België"
    intro="Uw eerste website is geen brochure — het is uw belangrijkste verkoopkanaal, pitch deck en geloofwaardigheidstest tegelijk. Wij bouwen startup-websites die investeerders overtuigen én klanten converteren."
    paragraphs={[
      "Een startup-website is fundamenteel anders dan een corporate site. U heeft geen 10 productlijnen om te tonen — u heeft één scherp verhaal te vertellen aan een specifieke doelgroep. Elke seconde laadtijd, elk woord op de hero, elke CTA moet werken. Een trage of generieke site kost u investeerders, talent en eerste klanten.",
      "Wij vertrekken vanuit uw waardepropositie en doelgroep, niet vanuit een template. In één week leveren we een eerste live versie op met de essentiële pagina's: hero, productuitleg, social proof, pricing en contact. Daarna iteratief bijschaven op basis van bezoekersgedrag en feedback van uw eerste demo's.",
      "Technisch bouwen we op een moderne stack (React, TypeScript) die mee schaalt naarmate u groeit: van landingspagina vandaag, naar dashboard en klantportaal morgen. Klaar om uw startup online te zetten? Plan een gesprek en u bent binnen 2 weken live.",
    ]}
    bullets={[
      "Live binnen 2 weken — typisch 7 tot 10 werkdagen",
      "Conversiegerichte structuur op basis van bewezen startup-frameworks",
      "Geoptimaliseerd voor laadtijd (<1s) en SEO vanaf dag 1",
      "Schaalbaar naar dashboard, klantportaal of webapp zonder rebuild",
      "Abonnement of eenmalige build — een vast voorstel na een kort kennismakingsgesprek",
    ]}
    serviceType="Startup Website Development"
    faq={[
      {
        q: "Heb ik écht een aparte 'startup-aanpak' nodig?",
        a: "Ja. Startup-websites moeten in weken live zijn, niet maanden. Ze moeten één scherp verhaal vertellen, niet een corporate brochure zijn. En ze moeten technisch klaar zijn om uit te breiden naar een product. Dat vraagt een andere manier van bouwen.",
      },
      {
        q: "Wat als mijn product nog niet helemaal vast staat?",
        a: "Geen probleem — sterker, dat is normaal. We bouwen flexibel zodat u snel kunt itereren op messaging, pricing en doelgroep terwijl u valideert. De site groeit mee met uw inzichten.",
      },
      {
        q: "Kunnen jullie ook helpen met de eerste leads?",
        a: "We bouwen conversiegerichte structuur in, integreren met uw analytics en kunnen optioneel een eerste SEO-traject of paid-ads landingspagina opzetten. We zijn echter geen marketingbureau — we maken uw website klaar om te converteren.",
      },
    ]}
  />
);

export default StartupWebsite;
