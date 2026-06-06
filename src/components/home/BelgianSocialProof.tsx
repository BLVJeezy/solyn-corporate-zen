import { motion } from "framer-motion";
import { Quote, MapPin, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Binnen 3 maanden stond onze site op pagina 1 voor 'loodgieter Tongeren'. Wij krijgen nu gemiddeld 4 aanvragen per week via Google — vroeger was dat bijna nul.",
    author: "Loodgietersbedrijf",
    location: "Tongeren, Limburg",
    result: "4× meer aanvragen",
  },
  {
    quote: "Solyn begrijpt wat een lokale onderneming nodig heeft. Geen beloftes, gewoon resultaat. Onze nieuwe website heeft ons meteen meer klanten gebracht in Bilzen en omgeving.",
    author: "Schildersbedrijf",
    location: "Bilzen, Limburg",
    result: "Meer lokale klanten",
  },
  {
    quote: "Als kapsalon in Borgloon dacht ik dat Google niet voor mij was. Nu ranken we #1 voor 'kapper Borgloon' en hebben we elke week nieuwe klanten die ons via Google vinden.",
    author: "Kapsalon",
    location: "Borgloon, Haspengouw",
    result: "#1 in Google.be",
  },
];

const BelgianSocialProof = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-4">Klantresultaten</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
            Wat Limburgse klanten zeggen
          </h2>
          <p className="text-gray-500 mt-3">Echte resultaten van echte ondernemers in uw regio.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-gray-200 mb-3" />
              <p className="text-gray-700 leading-relaxed flex-1 text-sm">"{item.quote}"</p>
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-black">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {item.author}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 ml-5">{item.location}</div>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full text-right shrink-0">
                    {item.result}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BelgianSocialProof;
