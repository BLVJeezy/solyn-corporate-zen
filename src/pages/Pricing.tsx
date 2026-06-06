import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ArrowRight, Search, Globe, TrendingUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import { useTrackPageView } from "@/hooks/useTrackPageView";

type Tab = "seo" | "website" | "bundle";

const TABS: { key: Tab; icon: React.ElementType; label: string; sub: string }[] = [
  { key: "seo", icon: Search, label: "Lokale SEO", sub: "Hoger in Google" },
  { key: "website", icon: Globe, label: "Webdesign", sub: "Nieuwe website" },
  { key: "bundle", icon: TrendingUp, label: "Alles-in-1", sub: "Website + SEO" },
];

const PLANS: Record<Tab, { name: string; tagline: string; price: string; period: string; badge?: string; features: string[]; cta: string; dark?: boolean }[]> = {
  seo: [
    {
      name: "SEO Starter",
      tagline: "Voor zelfstandigen & kleine KMO's",
      price: "€300", period: "/maand",
      cta: "Start met SEO",
      features: ["Google Bedrijfsprofiel optimalisatie", "Zoekwoordenonderzoek voor uw gemeente", "On-page SEO (titels, meta, structuur)", "Maandelijks rankingrapport", "1 lokale landingspagina/maand", "Maandelijks opzegbaar"],
    },
    {
      name: "SEO Business",
      tagline: "Voor groeiende KMO's in de regio",
      price: "€600", period: "/maand",
      badge: "Meest gekozen",
      dark: true,
      cta: "Start Business SEO",
      features: ["Alles van Starter", "Technische SEO-audit & implementatie", "Contentcreatie (2 pagina's/maand)", "Linkbuilding & lokale vermeldingen", "Concurrent monitoring", "Google Search Console & Analytics", "WhatsApp support (prioriteit)", "Maandelijks opzegbaar"],
    },
  ],
  website: [
    {
      name: "Starter website",
      tagline: "Professionele website met SEO-basis",
      price: "Vaste prijs", period: "eenmalig",
      cta: "Offerte aanvragen",
      features: ["Tot 5 pagina's op maat", "Mobile-first design", "SEO-basis ingebouwd", "Contactformulier", "Google Analytics koppeling", "Oplevering in 2 weken", "1 maand gratis support"],
    },
    {
      name: "Business website",
      tagline: "Volledige website met premium design",
      price: "Vaste prijs", period: "eenmalig",
      badge: "Beste investering",
      dark: true,
      cta: "Offerte aanvragen",
      features: ["Onbeperkt pagina's", "Premium design op maat", "Volledige SEO-optimalisatie", "Lokale landingspagina's", "Offerte- of boekingssysteem", "Google Search Console setup", "1 maand gratis support", "WhatsApp support"],
    },
  ],
  bundle: [
    {
      name: "Website + SEO Starter",
      tagline: "Website bouwen & laten groeien",
      price: "€300", period: "/maand na build",
      cta: "Pakket bespreken",
      features: ["Business website (eenmalige build)", "Maandelijkse SEO-optimalisatie", "Google Bedrijfsprofiel beheer", "Maandelijks rankingrapport", "Proactieve bugfixes & updates", "WhatsApp support", "Maandelijks opzegbaar"],
    },
    {
      name: "SEO Dominantie",
      tagline: "Dominer uw regio online volledig",
      price: "Op maat", period: "intake nodig",
      badge: "Volledig pakket",
      dark: true,
      cta: "Gratis intake plannen",
      features: ["Premium website met custom design", "Volledige lokale SEO-strategie", "Regionale landingspagina's per gemeente", "Maandelijkse content & linkbuilding", "Competitor tracking", "WhatsApp VIP support (< 2u reactie)", "Maandelijks strategiegesprek", "Maandelijks opzegbaar"],
    },
  ],
};

const FAQ = [
  { q: "Zijn er langdurige contracten?", a: "Nee. Alle maandelijkse pakketten zijn maandelijks opzegbaar. Wij verdienen ons mandaat door resultaten te leveren, niet door u vast te houden." },
  { q: "Wat is inbegrepen in de gratis audit?", a: "De gratis audit omvat een analyse van uw huidige Google-positie, uw concurrenten, de zoektermen die uw klanten gebruiken en concrete verbeterpunten voor uw website. U ontvangt dit als rapport, zonder verplichtingen." },
  { q: "Hoe snel zie ik resultaat van SEO?", a: "In kleinere gemeenten zoals Hoeselt of Borgloon zien we vaak al verbetering binnen 30 tot 60 dagen. In Tongeren of Sint-Truiden duurt het typisch 60 tot 90 dagen. Webdesign-projecten zijn live in 2 tot 4 weken." },
  { q: "Kan ik later upgraden naar een hoger pakket?", a: "Ja, altijd. U kunt op elk moment upgraden naar een uitgebreider pakket. Wij passen uw pakket aan op uw groei." },
];

const Pricing = () => {
  useTrackPageView("/pricing");
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("seo");
  const plans = PLANS[tab];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <html lang="nl" />
        <title>Prijzen SEO & Webdesign | Transparante Pakketten | Solyn</title>
        <meta name="description" content="Transparante prijzen voor SEO en webdesign in Limburg. Lokale SEO vanaf €300/maand, professionele websites op vaste prijs. Maandelijks opzegbaar, geen verborgen kosten." />
        <link rel="canonical" href="https://solyn-global.com/pricing" />
      </Helmet>

      <HomeNav />

      <section className="pt-32 md:pt-44 pb-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6"
          >
            Transparante Prijzen
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-black tracking-tight"
          >
            Vaste prijzen.{" "}
            <span className="text-gray-400">Geen verrassingen.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-500 mt-4 max-w-lg mx-auto"
          >
            Maandelijks opzegbaar. Geen jaarcontracten. Geen verborgen kosten. U weet altijd exact wat u betaalt.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Tab selector */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-2xl bg-gray-100 p-1.5 border border-gray-200 gap-1">
              {TABS.map((t) => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${tab === t.key ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-black"}`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <div className={`grid gap-5 ${plans.length === 1 ? "max-w-md mx-auto" : "md:grid-cols-2"}`}>
                {plans.map((p, i) => (
                  <div key={p.name} className={`rounded-2xl p-7 md:p-8 flex flex-col relative overflow-hidden ${p.dark ? "bg-black" : "border border-gray-200 bg-white"}`}>
                    {p.badge && <div className={`absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full ${p.dark ? "bg-white/15 text-white/70" : "bg-black text-white"}`}>{p.badge}</div>}
                    <div className="mb-5">
                      <h3 className={`text-xl font-bold ${p.dark ? "text-white" : "text-black"}`}>{p.name}</h3>
                      <p className={`text-xs mt-1 ${p.dark ? "text-white/50" : "text-gray-400"}`}>{p.tagline}</p>
                    </div>
                    <div className="mb-6">
                      <span className={`text-3xl font-bold ${p.dark ? "text-white" : "text-black"}`}>{p.price}</span>
                      <span className={`text-sm ml-1.5 ${p.dark ? "text-white/50" : "text-gray-400"}`}>{p.period}</span>
                    </div>
                    <Button onClick={() => navigate("/book")} className={`w-full rounded-full mb-6 gap-1 ${p.dark ? "bg-white text-black hover:bg-white/90" : "border border-gray-200 bg-white text-black hover:bg-gray-50"}`} variant={p.dark ? "default" : "outline"}>
                      {p.cta} <ArrowRight className="w-4 h-4" />
                    </Button>
                    <div className={`text-xs font-semibold mb-3 ${p.dark ? "text-white/40" : "text-gray-400"}`}>Wat is inbegrepen:</div>
                    <ul className="space-y-2.5 flex-1">
                      {p.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.dark ? "text-white/40" : "text-emerald-500"}`} />
                          <span className={p.dark ? "text-white/70" : "text-gray-600"}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-center text-gray-400 text-xs mt-8">
                Niet zeker welk pakket past?{" "}
                <button onClick={() => navigate("/book")} className="text-black underline underline-offset-2 hover:no-underline">
                  Boek een gratis gesprek →
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-black tracking-tight mb-10">Veelgestelde vragen over prijzen</h2>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white">
                <h3 className="font-semibold text-black">{f.q}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-black rounded-3xl p-12 md:p-16 text-center">
          <MessageCircle className="w-10 h-10 text-white/30 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Weet u niet zeker welk pakket past?</h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">Boek een gratis gesprek van 15 minuten. Wij adviseren u eerlijk — zonder commercieel eigenbelang.</p>
          <Button onClick={() => navigate("/book")} className="mt-8 rounded-full bg-white text-black hover:bg-white/90 font-medium px-7 py-6 text-base gap-1">
            <ChevronRight className="w-4 h-4" /> Gratis gesprek boeken
          </Button>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default Pricing;
