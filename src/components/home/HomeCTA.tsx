import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Phone, Search } from "lucide-react";
import { motion } from "framer-motion";

const HomeCTA = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Urgency strip */}
      <section className="py-16 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-gray-100 bg-gray-50 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Gratis, geen verplichtingen
            </div>
            <h3 className="text-2xl font-bold text-black">Hoe scoort uw website vandaag in Google?</h3>
            <p className="text-gray-400 text-sm mt-2">Vraag een gratis SEO-audit aan en ontdek waar u kansen laat liggen — met concrete verbeterpunten.</p>
          </div>
          <Button
            onClick={() => navigate("/book")}
            className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-8 gap-1 shrink-0"
          >
            <Search className="w-4 h-4" />
            Gratis audit aanvragen
          </Button>
        </motion.div>
      </section>

      {/* Big final CTA */}
      <section className="py-24 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tight leading-[1.08]">
            Meer klanten starten met{" "}
            <span className="text-gray-400">gevonden worden.</span>
          </h2>
          <p className="text-gray-500 mt-6 text-lg max-w-xl mx-auto">
            Boek een gratis gesprek van 15 minuten. Wij analyseren uw situatie en leggen u uit wat er nodig is om hoger te ranken in Google.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => navigate("/book")}
              className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-10 py-6 text-base gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              Gratis gesprek boeken
            </Button>
            <a
              href="mailto:info@solyn-global.com"
              className="text-gray-500 text-sm hover:text-black transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              info@solyn-global.com
            </a>
          </div>
          <p className="text-gray-300 text-xs mt-6">Geen verplichtingen. Geen sales pitch. Gewoon eerlijk advies.</p>
        </motion.div>
      </section>
    </>
  );
};

export default HomeCTA;
