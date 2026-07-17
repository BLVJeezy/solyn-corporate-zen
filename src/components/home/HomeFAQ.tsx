import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqGroups = [
  {
    category: "SEO & Google rankings",
    items: [
      {
        q: "Hoe snel kan mijn bedrijf hoger ranken in Google?",
        a: "Dat hangt af van hoe sterk uw concurrenten online staan. Voor een loodgieter in Bilzen zagen we de eerste beweging na 3 weken, na 30 dagen stonden 14 van de 15 zoekwoorden hoger. In Hasselt, waar de concurrentie groter is, duurt het langer. We geven u bij de start een eerlijke inschatting per stad, geen generieke belofte.",
      },
      {
        q: "Wat is lokale SEO en waarom heb ik het nodig?",
        a: "Lokale SEO zorgt ervoor dat u verschijnt wanneer iemand in uw gemeente zoekt naar wat u doet. \"Loodgieter Tongeren\", \"elektricien Bilzen\", \"kapper Hasselt\". Zonder dat wordt u simpelweg niet gevonden, ook al bent u de beste in uw vak. Het verschil met gewone SEO is dat we focussen op uw regio, niet op heel België.",
      },
      {
        q: "Helpen jullie ook met Google Bedrijfsprofiel (Google Maps)?",
        a: "Ja, en voor de meeste lokale bedrijven is dat zelfs prioriteit nummer één. Google Maps is het eerste wat mensen zien als ze op hun telefoon zoeken. We vullen uw profiel volledig in, plaatsen wekelijks nieuwe foto's en posts, en zorgen dat uw gegevens overal online kloppen. Van Apple Maps tot TomTom.",
      },
      {
        q: "Werken jullie ook voor sectoren zoals horeca, bouw of vrije beroepen?",
        a: "Ja. We werken voor loodgieters, HVAC-installateurs, kapsalons, medische groothandel en autodetailing. Elk met een eigen aanpak. Wat we niet doen is dezelfde sjabloon voor iedereen gebruiken. Een kapper heeft andere zoekwoorden nodig dan een aannemer, en dat zien we ook zo.",
      },
    ],
  },
  {
    category: "Webdesign & prijzen",
    items: [
      {
        q: "Wat kost een professionele website laten maken?",
        a: "Dat is moeilijk te zeggen zonder uw situatie te kennen. Een eenvoudige website voor een zelfstandige kost anders dan een meertalige site met meerdere servicepagina's en lokale SEO. We werken altijd met een vaste prijs die vooraf is afgesproken, geen verrassingen achteraf. Na een kort gesprek van 15 minuten weet u exact wat het kost voor uw specifieke geval.",
      },
      {
        q: "Hoe lang duurt het bouwen van een website?",
        a: "De meeste websites leveren we op in 7 tot 14 dagen na de kickoff. Dat klinkt snel, en dat is het ook. We werken efficiënt en vragen u alleen wat we echt nodig hebben. De grootste vertraging is altijd het aanleveren van foto's en teksten. Als u dat snel doet, doen wij dat ook.",
      },
      {
        q: "Kan ik mijn bestaande website laten optimaliseren in plaats van helemaal opnieuw beginnen?",
        a: "Ja, dat kan. We bekijken eerst wat er al staat en of het de moeite is te optimaliseren of beter opnieuw te beginnen. Soms is een technische SEO-fix voldoende. Soms is de structuur zo zwak dat een nieuwe site sneller rendement geeft. We zeggen u eerlijk welke kant we aanraden.",
      },
      {
        q: "Zijn jullie ook bereikbaar als er iets mis gaat na de lancering?",
        a: "Ja. U heeft rechtstreeks contact met mij, niet met een helpdesk of een wisselend team. Als er iets fout loopt, stuur een WhatsApp en ik kijk er dezelfde dag naar. Dat is het voordeel van werken met een klein bureau: u valt nooit tussen de plooien.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqGroups.flatMap(g =>
    g.items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    }))
  ),
};

const HomeFAQ = () => {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
              Vragen?{" "}
              <span className="text-gray-400">Antwoorden.</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">Alles wat u wil weten over SEO en webdesign in België.</p>
          </motion.div>

          <div className="space-y-10">
            {faqGroups.map((group, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.1 }}
              >
                <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-4 font-semibold">{group.category}</p>
                <Accordion type="single" collapsible className="space-y-2">
                  {group.items.map((item, qi) => (
                    <AccordionItem
                      key={qi}
                      value={`${gi}-${qi}`}
                      className="border border-gray-100 rounded-xl bg-white px-5 data-[state=open]:bg-gray-50 transition-colors"
                    >
                      <AccordionTrigger className="text-black text-sm font-medium hover:no-underline py-4 text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-500 text-sm leading-relaxed pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeFAQ;

