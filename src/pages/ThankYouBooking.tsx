import { motion } from "framer-motion";
import { CheckCircle2, Calendar, TrendingUp, Search, Users, Star } from "lucide-react";
import showcaseBelgomed from "@/assets/showcase-belgomed.png";
import showcaseAtelier9 from "@/assets/showcase-atelier9.png";
import portfolioRiory from "@/assets/portfolio-riory-1.png";
import rioryAnalytics from "@/assets/riory-analytics.png";

const cases = [
  {
    img: portfolioRiory,
    name: "Riory",
    tagline: "Rioleringsbedrijf",
    metric: "40+",
    metricLabel: "Afspraken geboekt in 20 dagen",
    icon: Calendar,
    description:
      "We bouwden Riory een conversie-gerichte website gekoppeld aan een gestroomlijnde funnel. Binnen 20 dagen na lancering werden er meer dan 40 gekwalificeerde afspraken geboekt — volledig automatisch, via organische vindbaarheid.",
    highlights: [
      "Conversie-funnel met booking flow",
      "Lead-nurturing via automatische e-mails",
      "SEO-geoptimaliseerd voor mobiel verkeer",
    ],
  },
  {
    img: rioryAnalytics,
    name: "Riory — SEO",
    tagline: "Rioleringsbedrijf",
    metric: "#1",
    metricLabel: "Top Google rankings op kerntermen",
    icon: Search,
    description:
      "We legden een sterke SEO-fundering voor Riory. Hij ranked nu op de eerste pagina van Google voor de belangrijkste zoekwoorden in zijn niche, wat zorgt voor een constante stroom gratis, hoogwaardige leads.",
    highlights: [
      "Technische SEO & site-snelheid optimalisatie",
      "Strategische keyword targeting",
      "Continue stroom organische leads",
    ],
  },
  {
    img: showcaseBelgomed,
    name: "Belgomed",
    tagline: "Farmaceutische groothandel",
    metric: "1 week",
    metricLabel: "Volledige ROI na lancering",
    icon: TrendingUp,
    description:
      "Voor Belgomed bouwden we een snelle, vertrouwenwekkende online presence. Hun volledige investering werd al in de eerste week na lancering terugverdiend. Vandaag draait de site winstgevend zonder dat het team handmatig moet ingrijpen.",
    highlights: [
      "Platform geoptimaliseerd voor conversie",
      "Investering terugverdiend in week 1",
      "Schaalbare basis voor verdere groei",
    ],
  },
  {
    img: showcaseAtelier9,
    name: "L'Atelier 9",
    tagline: "Beauty Salon",
    metric: "10+",
    metricLabel: "Vaste terugkerende klanten",
    icon: Users,
    description:
      "We hielpen L'Atelier 9 hun service positioneren als premium aanbod. Resultaat: meer dan 10 vaste klanten die maandelijks terugkomen. Voorspelbare omzet en een wachtlijst — zonder dat er nog actief moet worden geprospecteerd.",
    highlights: [
      "Premium branding & positionering",
      "Retentie-systeem voor terugkerende klanten",
      "Voorspelbare maandelijkse omzet",
    ],
  },
];

const ThankYouBooking = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero confirmation */}
      <section className="relative pt-20 md:pt-28 pb-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 border border-green-100 mb-6"
          >
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Afspraak bevestigd
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.1]"
          >
            Bedankt — je gesprek staat <span className="bg-gradient-to-r from-[hsl(40_48%_56%)] to-[hsl(210_15%_70%)] bg-clip-text text-transparent">vast</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Je ontvangt zo dadelijk een bevestigingsmail met de details van je call. In afwachting — hier zie je concreet wat we al voor andere ondernemers hebben gerealiseerd.
          </motion.p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl bg-[hsl(0_0%_7%)] p-6 md:p-8"
          >
            {[
              { value: "40+", label: "Afspraken in 20 dagen" },
              { value: "#1", label: "Google rankings" },
              { value: "1 week", label: "ROI Belgomed" },
              { value: "10+", label: "Vaste klanten Atelier" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-[hsl(40_48%_56%)] to-[hsl(210_15%_70%)] bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
              <Star className="w-3.5 h-3.5" />
              Bewezen resultaten
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
              Wat we voor anderen hebben gebouwd.
            </h2>
          </motion.div>

          <div className="space-y-12 md:space-y-20">
            {cases.map((c, i) => {
              const Icon = c.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
                    <img src={c.img} alt={c.name} className="w-full h-auto object-cover" loading="lazy" />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
                      <Icon className="w-3.5 h-3.5" />
                      {c.tagline}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight mb-2">{c.name}</h3>
                    <div className="flex items-baseline gap-3 mb-5">
                      <div className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-[hsl(40_48%_56%)] to-[hsl(210_15%_70%)] bg-clip-text text-transparent">
                        {c.metric}
                      </div>
                      <div className="text-sm text-gray-500">{c.metricLabel}</div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-5">{c.description}</p>
                    <ul className="space-y-2">
                      {c.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing message (no outbound links) */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-[hsl(0_0%_7%)] p-8 md:p-14 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Tot binnenkort op onze <span className="bg-gradient-to-r from-[hsl(40_48%_56%)] to-[hsl(210_15%_70%)] bg-clip-text text-transparent">call</span>.
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
              Check je inbox voor de bevestiging en de agenda-uitnodiging. We bereiden ons voor en zien je graag op het afgesproken moment.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ThankYouBooking;
