import { motion } from "framer-motion";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import jasonFounder from "@/assets/jason-founder.png.asset.json";

const HomeFounder = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="shrink-0"
        >
          <PhotoPlaceholder
            src={jasonFounder.url}
            alt="Jason, oprichter Solyn Global"
            caption="Foto van Jason"
            rounded="2xl"
            className="w-48 h-56 md:w-56 md:h-64"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3">Wie zit hierachter?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight mb-4">
            Geen callcenter. Geen accountmanager die u nooit ziet.
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Solyn Global is geen groot bureau met wisselende contactpersonen. U spreekt rechtstreeks met
            mij, Jason — van het eerste gesprek tot elk maandelijks rapport. Gevestigd in Limburg, werkend
            voor Limburgse ondernemers die weten wat ze willen: resultaat, geen jargon.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFounder;
