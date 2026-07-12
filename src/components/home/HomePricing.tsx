import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Search, Globe, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "seo" | "website" | "bundle";

const PLANS: Record<Tab, {
  icon: React.ElementType;
  name: string;
  tagline: string;
  price?: string;
  period?: string;
  badge?: string;
  cta: string;
  features: string[];
  dark?: boolean;
}[]> = {
  seo: [
    {
      icon: Search,
      name: "Lokale SEO Starter",
      tagline: "Voor zelfstandigen & kleine KMO's",
      cta: "Start met SEO",
      features: [
        "Google Bedrijfsprofiel optimalisatie",
        "Keyword research voor uw gemeente",
        "On-page SEO (titels, meta, structuur)",
        "Maandelijks ranking-rapport",
        "1 lokale landingspagina per maand",
        "Maandelijks opzegbaar",
      ],
    },
    {
      icon: TrendingUp,
      name: "Lokale SEO Business",
      tagline: "Voor groeiende KMO's in de regio",
      badge: "Meest gekozen",
      cta: "Start Business SEO",
      dark: true,
      features: [
        "Alles van Starter",
        "Technische SEO-audit & implementatie",
        "Contentcreatie (2 SEO-pagina's/maand)",
        "Linkbuilding & lokale vermeldingen",
        "Concurrent monitoring",
        "Google Search Console & Analytics",
        "Prioriteit WhatsApp support",
        "Maandelijks opzegbaar",
      ],
    },
  ],
  website: [
    {
      icon: Globe,
      name: "Website Laten Maken",
      tagline: "Professionele website met SEO-basis",
      cta: "Gratis offerte aanvragen",
      features: [
        "Design op maat — geen templates",
        "Mobile-first & razendsnelle laadtijd",
        "SEO-basis ingebouwd vanaf dag 1",
        "Google Search Console gekoppeld",
        "Contact- & offerteformulier",
        "Opgeleverd in 2 tot 4 weken",
        "1 maand gratis support na lancering",
      ],
    },
    {
      icon: TrendingUp,
      name: "Website + SEO Onderhoud",
      tagline: "Website bouwen én laten groeien",
      badge: "Beste investering",
      dark: true,
      cta: "Bekijk dit pakket",
      features: [
        "Professionele website op maat",
        "Maandelijkse SEO-optimalisatie",
        "Google Bedrijfsprofiel beheer",
        "Nieuwe content & landingspagina's",
        "Maandelijks SEO & traffic rapport",
        "Proactieve bugfixes & updates",
        "WhatsApp support",
        "Maandelijks opzegbaar",
      ],
    },
  ],
  bundle: [
    {
      icon: TrendingUp,
      name: "SEO Dominantie Pakket",
      tagline: "Voor bedrijven die hun regio willen beheersen",
      badge: "Volledig pakket",
      dark: true,
      cta: "Bespreek uw situatie",
      features: [
        "Nieuwe website met premium design",
        "Volledige lokale SEO-strategie",
        "Google Bedrijfsprofiel top-optimalisatie",
        "Regionale landingspagina's per gemeente",
        "Maandelijkse content & linkbuilding",
        "Competitor-analyse & tracking",
        "WhatsApp VIP support (< 2u reactie)",
        "Maandelijks strategiegesprek",
        "Maandelijks opzegbaar",
      ],
    },
  ],
};

const TAB_LABELS: { key: Tab; label: string; desc: string }[] = [
  { key: "seo", label: "Lokale SEO", desc: "Hoger in Google" },
  { key: "website", label: "Webdesign", desc: "Professionele website" },
  { key: "bundle", label: "Alles-in-1", desc: "Website + SEO" },
];

const HomePricing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("seo");
  const plans = PLANS[activeTab];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-4">Diensten Op Maat</p>
          <h2 className="text-3xl text-black tracking-tight leading-tight font-bold md:text-4xl">
            Geen vaste pakketten.{" "}
            <span className="text-gray-400">Een voorstel op maat van uw project.</span>
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">Maandelijks opzegbaar. Geen jaarcontracten. Geen verborgen kosten.</p>
        </motion.div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl bg-gray-100 p-1.5 border border-gray-200 gap-1">
            {TAB_LABELS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center gap-0.5 ${
                  activeTab === tab.key
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-normal ${activeTab === tab.key ? "text-white/60" : "text-gray-400"}`}>{tab.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className={`grid gap-6 ${plans.length === 1 ? "max-w-md mx-auto" : "md:grid-cols-2"}`}>
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl p-7 md:p-8 flex flex-col relative overflow-hidden ${
                    plan.dark
                      ? "bg-black text-white"
                      : "border border-gray-200 bg-white"
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full ${plan.dark ? "bg-white/10 text-white/70" : "bg-black text-white"}`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-5">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.dark ? "bg-white/10" : "bg-gray-100"}`}>
                      <plan.icon className={`w-5 h-5 ${plan.dark ? "text-white" : "text-black"}`} />
                    </span>
                    <div>
                      <h3 className={`text-lg font-bold ${plan.dark ? "text-white" : "text-black"}`}>{plan.name}</h3>
                      <p className={`text-xs ${plan.dark ? "text-white/50" : "text-gray-400"}`}>{plan.tagline}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className={`text-sm font-medium ${plan.dark ? "text-white/70" : "text-gray-500"}`}>
                      Prijs op maat na een kort kennismakingsgesprek
                    </span>
                  </div>

                  <Button
                    onClick={() => navigate("/book")}
                    className={`w-full font-medium rounded-full mb-6 gap-1 ${
                      plan.dark
                        ? "bg-white text-black hover:bg-white/90"
                        : "border border-gray-200 bg-white text-black hover:bg-gray-50"
                    }`}
                    variant={plan.dark ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>

                  <div className={`text-xs font-semibold mb-3 ${plan.dark ? "text-white/50" : "text-gray-400"}`}>
                    Wat is inbegrepen:
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.dark ? "text-white/40" : "text-emerald-500"}`} />
                        <span className={plan.dark ? "text-white/70" : "text-gray-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Reassurance */}
            <p className="text-center text-gray-400 text-xs mt-8">
              Niet zeker welk pakket past? Boek een gratis gesprek — wij adviseren eerlijk op basis van uw situatie.{" "}
              <button onClick={() => navigate("/book")} className="text-black underline underline-offset-2 hover:no-underline">
                Gratis intake plannen →
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HomePricing;
