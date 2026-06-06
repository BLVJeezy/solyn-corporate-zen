import { motion } from "framer-motion";
import { Search, Palette, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Gratis SEO-audit",
    subtitle: "Wij analyseren uw website en Google-positie",
    desc: "We kijken naar uw huidige online zichtbaarheid, analyseren wat uw concurrenten doen en identificeren de exacte zoektermen die uw klanten gebruiken. U ontvangt een concreet rapport — gratis, zonder verplichtingen.",
    tags: ["Zoekwoordenonderzoek", "Concurrent analyse", "Google positie check", "Technische audit"],
    accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    icon: Palette,
    number: "02",
    title: "Website & SEO-strategie",
    subtitle: "Wij bouwen uw website met SEO ingebouwd",
    desc: "Geen SEO als laagje bovenop een bestaande site — wij bouwen het er van dag 1 in. Snelle laadtijden, correcte heading-structuur, lokale landingspagina's en een technische basis die Google begrijpt en beloont.",
    tags: ["On-page SEO", "Lokale landingspagina's", "Snelheidsoptimalisatie", "Mobile-first"],
    accent: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Lancering & Google Bedrijfsprofiel",
    subtitle: "Live in 2 tot 4 weken",
    desc: "Zodra uw website live gaat, optimaliseren we ook uw Google Bedrijfsprofiel. Dat is de sleutel tot de lokale kaartresultaten in Google — de eerste drie resultaten die 70% van de lokale zoekopdrachten krijgen.",
    tags: ["Google Bedrijfsprofiel", "Schema markup", "Sitemap + robots.txt", "Search Console"],
    accent: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Groei & Rapportage",
    subtitle: "Meetbaar resultaat, elke maand",
    desc: "Wij leveren maandelijkse rapportages over uw Google-rankings, websiteverkeer en leads. U ziet precies welke zoektermen stijgen, hoeveel bezoekers u krijgt en waar de groeikansen liggen.",
    tags: ["Maandelijkse ranking-rapporten", "Traffic analyse", "Conversie-tracking", "Continue optimalisatie"],
    accent: "bg-orange-50 text-orange-700 border-orange-100",
  },
];

const HomeProcess = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-4">Hoe het werkt</p>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-tight">
            Van onzichtbaar naar{" "}
            <span className="text-gray-400">pagina 1 van Google</span>
          </h2>
          <p className="text-gray-500 mt-4 leading-relaxed">
            Ons bewezen proces zorgt dat uw bedrijf gevonden wordt door klanten die al zoeken naar wat u aanbiedt — in uw gemeente, uw regio, uw markt.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm"
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${step.accent}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-4xl font-bold text-gray-100 select-none">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-1">{step.title}</h3>
              <p className="text-sm text-gray-400 mb-4 font-medium">{step.subtitle}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{step.desc}</p>
              <div className="flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span key={tag} className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProcess;
