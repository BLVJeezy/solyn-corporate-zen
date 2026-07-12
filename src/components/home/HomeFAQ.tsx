import { motion } from "framer-motion";
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
        a: "In kleinere gemeenten zoals Bilzen, Borgloon of Riemst zien we vaak al resultaten binnen 30 tot 60 dagen. In grotere steden zoals Tongeren of Sint-Truiden duurt het typisch 60 tot 90 dagen. SEO is een investering die zich versneld terugbetaalt — eens u hoog rankt, blijft dat organic verkeer komen.",
      },
      {
        q: "Wat is lokale SEO en waarom heb ik het nodig?",
        a: "Lokale SEO zorgt dat uw bedrijf bovenaan verschijnt wanneer mensen in uw regio zoeken op Google. Denk aan: 'elektricien Tongeren', 'kapper Bilzen' of 'boekhoudkantoor omgeving Borgloon'. Dit zijn mensen die al klaar zijn om te kopen — u hoeft ze alleen nog te bereiken. Zonder lokale SEO mist u dagelijks potentiële klanten.",
      },
      {
        q: "Helpen jullie ook met Google Bedrijfsprofiel (Google Maps)?",
        a: "Absoluut. Google Bedrijfsprofiel optimalisatie is een van de krachtigste lokale SEO-tools. Wij optimaliseren uw profiel volledig: correcte categorieën, foto's, openingstijden, beantwoording van reviews en maandelijkse updates. Dit verhoogt drastisch uw zichtbaarheid in de lokale kaartresultaten.",
      },
      {
        q: "Werken jullie ook voor sectoren zoals horeca, bouw of vrije beroepen?",
        a: "Ja. Wij hebben ervaring met websites en SEO voor loodgieters, aannemers, kappers, tandartsen, advocaten, restaurants, notarissen en veel meer. Elke sector heeft zijn eigen zoekgedrag — wij passen onze strategie aan op uw specifieke markt en regio.",
      },
    ],
  },
  {
    category: "Webdesign & prijzen",
    items: [
      {
        q: "Wat kost een professionele website laten maken?",
        a: "Wij werken met vaste, transparante prijzen. Een professionele website met SEO-basis start vanaf een eenmalige build, daarna optioneel maandelijks onderhoud voor een vast bedrag. U betaalt nooit meer dan afgesproken. Geen verborgen kosten, geen jaarcontracten die u vastzetten.",
      },
      {
        q: "Hoe lang duurt het bouwen van een website?",
        a: "De meeste websites zijn live binnen 2 tot 4 weken na de kick-off. Complexere projecten met webshop of meerdere talen duren 4 tot 6 weken. U krijgt altijd een concrete planning vooraf.",
      },
      {
        q: "Kan ik mijn bestaande website laten optimaliseren in plaats van helemaal opnieuw beginnen?",
        a: "Zeker. Wij doen eerst een technische SEO-audit van uw huidige site. Soms is een grondige optimalisatie voldoende, soms is een nieuwe website de slimste investering op lange termijn. Wij geven u eerlijk advies — zonder commercieel eigenbelang.",
      },
      {
        q: "Zijn jullie ook bereikbaar als er iets mis gaat na de lancering?",
        a: "Ja. Alle klanten met een onderhoudspakket hebben directe WhatsApp-toegang tot ons team. We reageren binnen 24 uur op werkdagen. Voor urgente zaken zijn we sneller. U zit nooit alleen met een probleem.",
      },
    ],
  },
];

const HomeFAQ = () => {
  return (
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
  );
};

export default HomeFAQ;
