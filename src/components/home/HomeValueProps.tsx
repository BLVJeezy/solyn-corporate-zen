import { motion } from "framer-motion";
import { MapPin, Zap, TrendingUp, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: MapPin,
    title: "Lokale SEO die écht werkt",
    desc: "Wij richten ons op de zoektermen die uw lokale klanten gebruiken. 'Loodgieter Tongeren', 'kapper Bilzen', 'boekhoudkantoor Borgloon' — u staat bovenaan, uw concurrent niet.",
    visual: (
      <div className="w-full max-w-xs mx-auto rounded-xl bg-white border border-gray-100 shadow-lg p-4 space-y-2.5">
        {["#1 — website laten maken bilzen", "#2 — webdesign tongeren", "#3 — seo bureau limburg"].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i === 0 ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"}`}>
              {i + 1}
            </div>
            <div className="flex-1 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center px-2">
              <span className="text-[10px] text-gray-600 truncate font-medium">{item}</span>
            </div>
          </div>
        ))}
        <div className="pt-1.5 border-t border-gray-100 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-600 font-semibold">Solyn Global — positie 1</span>
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    title: "Websites die laden in minder dan 1 seconde",
    desc: "Laadtijd is een directe Google-rankingfactor. Elke seconde vertraging kost u 7% conversie. Wij bouwen sites die razendsnel zijn — op mobiel én desktop.",
    visual: (
      <div className="w-full max-w-xs mx-auto rounded-xl bg-white border border-gray-100 shadow-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Performance Score</span>
          <span className="text-[10px] text-emerald-600 font-bold">Uitstekend</span>
        </div>
        {[
          { label: "Laadtijd", value: "0.8s", bar: 92, color: "bg-emerald-400" },
          { label: "SEO Score", value: "98/100", bar: 98, color: "bg-emerald-500" },
          { label: "Mobiel", value: "100/100", bar: 100, color: "bg-emerald-600" },
        ].map((row, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-[10px] text-gray-500">{row.label}</span>
              <span className="text-[10px] font-bold text-black">{row.value}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.bar}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Geen verborgen kosten. Vaste prijs.",
    desc: "U weet altijd wat u betaalt. Geen verassingen achteraf, geen langdurige contracten die u vastzetten. Maandelijks opzegbaar. Transparant van dag 1.",
    visual: (
      <div className="w-full max-w-xs mx-auto rounded-xl bg-white border border-gray-100 shadow-lg p-4 space-y-2">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Prijsvergelijking</div>
        {[
          { label: "Traditioneel bureau", price: "€5.000–15.000", bad: true },
          { label: "Freelancer (onzeker)", price: "€1.000–8.000", bad: true },
          { label: "Solyn Global", price: "Vaste, eerlijke prijs", bad: false },
        ].map((row, i) => (
          <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg border ${row.bad ? "border-red-50 bg-red-50/50" : "border-emerald-100 bg-emerald-50"}`}>
            <span className={`text-[10px] font-medium ${row.bad ? "text-gray-400" : "text-emerald-700"}`}>{row.label}</span>
            <span className={`text-[10px] font-bold ${row.bad ? "text-red-400 line-through" : "text-emerald-600"}`}>{row.price}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const HomeValueProps = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-black tracking-tight leading-tight max-w-3xl mx-auto md:text-4xl">
            Waarom Solyn?{" "}
            <span className="text-gray-400">Omdat resultaat telt, niet beloftes.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 flex flex-col"
            >
              <div className="mb-8 w-full flex-1 flex items-center">
                {card.visual}
              </div>
              <div className="text-center mt-auto">
                <h3 className="text-black font-bold text-lg mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeValueProps;
