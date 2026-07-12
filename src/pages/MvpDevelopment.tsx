import ServicePage from "./ServicePage";

const MvpDevelopment = () => (
  <ServicePage
    slug="mvp-development"
    title="MVP Development België — Solyn Global"
    metaDescription="Solyn Global bouwt MVPs voor startups in België. Van idee naar werkend product in 4 tot 8 weken."
    h1="MVP Development voor startups in België"
    intro="Bewijs uw idee zonder uw budget op te branden. Wij bouwen werkende MVPs die u kunt testen, demonstreren aan investeerders en in handen van echte gebruikers krijgen — in weken, niet maanden."
    paragraphs={[
      "Startups hebben snelheid nodig. Wachten op een 'perfect' product van 6 maanden is een doodvonnis: u verbrandt runway, mist marktfeedback en geeft concurrenten een voorsprong. De realiteit is dat 90% van de features die teams plannen nooit gebruikt worden. Een MVP forceert focus op wat écht telt.",
      "Onze aanpak is bewust gestructureerd: één week discovery om de kern te isoleren, één tot twee weken design en architectuur, en twee tot vijf weken build met wekelijkse demo's. U krijgt een live product met echte gebruikersaccounts, betalingen indien nodig, en hosting — alles voor een vaste prijs vooraf afgesproken. Geen scope creep, geen verrassingen.",
      "Na lancering staan we klaar om iteraties te begeleiden op basis van wat gebruikers werkelijk doen. Veel klanten kiezen voor een doorlopend retainermodel waarin we wekelijks features shippen. Klaar om uw idee te valideren? Plan een vrijblijvend strategiegesprek.",
    ]}
    bullets={[
      "Vaste prijs vooraf, geen uurtarieven die uit de hand lopen",
      "Live MVP in 4 tot 8 weken — typisch 6 weken",
      "Wekelijkse demo's, async communicatie via Slack of Linear",
      "Moderne stack (React, TypeScript, Supabase) klaar om te schalen",
      "Optioneel doorgaan met retainer voor wekelijkse feature-sprints",
    ]}
    serviceType="MVP Development"
    faq={[
      {
        q: "Wat kost een MVP bij Solyn?",
        a: "Onze MVP-builds worden geprijsd op basis van scope en complexiteit. U weet de prijs vooraf, na een kort gesprek — geen verrassingen op de eindfactuur.",
      },
      {
        q: "Hoe lang duurt het echt?",
        a: "De meeste MVPs zijn live binnen 4 tot 8 weken na de discovery-week. Sommige eenvoudige producten halen we in 3 weken, complexere in 10. We zeggen tijdens discovery exact wat te verwachten.",
      },
      {
        q: "Wat als ik na de lancering wijzigingen wil?",
        a: "Dat verwachten we. Marktfeedback verandert altijd het plan. We bieden flexibele post-launch retainers waarbij we wekelijks features shippen op basis van wat uw gebruikers echt nodig hebben.",
      },
    ]}
  />
);

export default MvpDevelopment;
