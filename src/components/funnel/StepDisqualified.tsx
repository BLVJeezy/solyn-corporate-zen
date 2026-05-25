import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const StepDisqualified = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7, ease: [1, 0.3, 1] }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300/20 to-amber-400/5 border border-amber-300/20 flex items-center justify-center mx-auto mb-8 overflow-hidden"
      >
        <img
          src="/solyn-logo-192.png"
          alt="Solyn"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] mb-5 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent max-w-xl mx-auto">
        {t("funnel.dq.title")}
      </h1>
      <p className="text-white/55 text-base leading-relaxed max-w-lg mx-auto mb-10">
        {t("funnel.dq.body")}
      </p>

      <Link
        to="/"
        className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white/[0.05] border border-white/10 text-white/80 hover:bg-white/[0.08] hover:text-white text-sm font-medium transition-all"
      >
        {t("funnel.dq.back")}
      </Link>
    </motion.div>
  );
};

export default StepDisqualified;
