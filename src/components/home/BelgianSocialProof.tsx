import { motion } from "framer-motion";
import { Quote, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const data = {
  NL: {
    heading: "Wat Belgische Klanten Zeggen",
    subtitle: "Bedrijven uit heel België vertrouwen op ons om hun online groei te versnellen.",
    items: [
      { quote: "De nieuwe site staat binnen 3 maanden op pagina 1 voor onze belangrijkste zoektermen.", author: "KMO uit Antwerpen", sector: "Bouw & Renovatie" },
      { quote: "Solyn begreep precies wat een lokale onderneming nodig heeft. Aanvragen verdubbeld.", author: "Startup uit Brussel", sector: "Tech & SaaS" },
      { quote: "Snel, strak en bovenal: het rankt. Wij raden Solyn aan elke ondernemer aan.", author: "KMO uit Gent", sector: "E-commerce" },
    ],
  },
  FR: {
    heading: "Ce que disent nos clients belges",
    subtitle: "Des entreprises de toute la Belgique nous font confiance pour accélérer leur croissance en ligne.",
    items: [
      { quote: "Notre nouveau site est en première page Google en 3 mois sur nos mots-clés principaux.", author: "PME à Bruxelles", sector: "Construction" },
      { quote: "Solyn a compris exactement ce qu'il faut pour une entreprise locale. Demandes doublées.", author: "Startup à Liège", sector: "Tech & SaaS" },
      { quote: "Rapide, élégant et surtout : ça ranke. Nous recommandons Solyn à tous les entrepreneurs.", author: "PME à Namur", sector: "E-commerce" },
    ],
  },
  EN: {
    heading: "What Belgian Clients Say",
    subtitle: "Companies across Belgium trust us to accelerate their online growth.",
    items: [
      { quote: "Our new site hit page 1 of Google within 3 months on our main keywords.", author: "SME from Antwerp", sector: "Construction" },
      { quote: "Solyn understood exactly what a local business needs. Leads doubled.", author: "Startup from Brussels", sector: "Tech & SaaS" },
      { quote: "Fast, sharp, and it ranks. We recommend Solyn to every entrepreneur.", author: "SME from Ghent", sector: "E-commerce" },
    ],
  },
};

const BelgianSocialProof = () => {
  const { lang } = useLanguage();
  const content = data[lang];

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
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">{content.heading}</h2>
          <p className="text-gray-500 mt-3">{content.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {content.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm flex flex-col"
            >
              <Quote className="w-6 h-6 text-gray-300 mb-4" />
              <p className="text-gray-800 leading-relaxed flex-1">"{item.quote}"</p>
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-black">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {item.author}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{item.sector}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BelgianSocialProof;
