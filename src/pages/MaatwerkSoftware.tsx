import ServicePage from "./ServicePage";

const MaatwerkSoftware = () => (
  <ServicePage
    slug="maatwerk-software"
    title="Maatwerk Software Laten Maken — Solyn Global"
    metaDescription="Solyn Global ontwikkelt maatwerk software voor KMO's en scale-ups in België. Geen off-the-shelf, maar exact wat uw bedrijf nodig heeft."
    h1="Maatwerk Software Laten Maken in België"
    intro="Wanneer standaard tools uw bedrijfsprocessen niet meer ondersteunen, wordt maatwerk de slimste investering. Wij bouwen software die exact past op uw workflow — schaalbaar, onderhoudbaar en eigendom van u."
    paragraphs={[
      "Off-the-shelf tools zijn geweldig… tot ze het niet meer zijn. Plotseling betaalt u per seat voor features die u niet gebruikt, mist u net die ene integratie, of moet uw team handmatig data overschrijven tussen vijf verschillende systemen. Op dat punt verliest standaard software u meer dan het bespaart.",
      "Onze aanpak begint met een diepgaande discovery: we brengen uw processen in kaart, identificeren waar tijd verloren gaat, en ontwerpen een architectuur die meegroeit. Daarna bouwen we iteratief in sprints van twee weken — u ziet voortgang, geeft feedback, en de software past zich aan terwijl we bouwen. Geen big-bang-lancering, wel gecontroleerde uitrol.",
      "Het eindresultaat: software die uw team graag gebruikt, integreert met uw bestaande tools (CRM, boekhouding, productie), en die u volledig bezit. Geen vendor lock-in, geen verrassingen. Klaar om te verkennen wat maatwerk voor uw bedrijf kan betekenen? Boek een gesprek.",
    ]}
    bullets={[
      "Diepgaande discovery van uw bestaande processen en pijnpunten",
      "Sprints van twee weken met live demo's en directe feedback",
      "Volledige code-eigendom — geen lock-in, exporteerbaar op elk moment",
      "Integraties met de tools die u al gebruikt (CRM, ERP, boekhouding)",
      "Onderhoud en doorontwikkeling via maandelijks retainer",
    ]}
    serviceType="Maatwerk Software Development"
    faq={[
      {
        q: "Voor welke bedrijven is maatwerk software de moeite waard?",
        a: "Typisch voor KMO's en scale-ups met 10+ werknemers waar bestaande tools tegen hun limieten lopen. Als u meer dan 5 uur per week verliest aan handmatige processen, betaalt maatwerk zich vaak binnen een jaar terug.",
      },
      {
        q: "Hoe lang duurt een maatwerk-traject?",
        a: "Een eerste werkende versie staat meestal binnen 6 tot 12 weken live. Daarna bouwen we iteratief verder in sprints van twee weken op basis van prioriteit en feedback.",
      },
      {
        q: "Wat gebeurt er als ik later wil overstappen naar een ander bureau?",
        a: "U bent eigenaar van de volledige code en infrastructuur. We documenteren grondig en gebruiken standaard open-source technologieën, zodat elk competent team het kan overnemen.",
      },
    ]}
  />
);

export default MaatwerkSoftware;
