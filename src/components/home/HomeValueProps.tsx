import { motion } from "framer-motion";
import { Palette, XCircle, Check } from "lucide-react";
import solynIcon from "@/assets/solyn-icon.svg";
import { useLanguage } from "@/i18n/LanguageContext";

const HomeValueProps = () => {
  const { t } = useLanguage();

  const freedomItems = [
    "homeValue.freedom.item1",
    "homeValue.freedom.item2",
    "homeValue.freedom.item3",
    "homeValue.freedom.item4",
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-black tracking-tight leading-tight max-w-3xl mx-auto text-center md:text-4xl">
            {t("homeValue.heading")}{" "}
            <span className="text-gray-400">
              {t("homeValue.headingGray")}
            </span>
          </h2>
        </motion.div>

        {/* Row 1: AI Native + Async collaboration */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* AI Native */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400 via-pink-400 to-blue-500 opacity-30 blur-xl scale-125" />
                <div className="relative w-24 h-24 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                  <img src={solynIcon} alt="Solyn" className="w-14 h-14" />
                </div>
              </div>
            </div>
            <h3 className="text-black font-bold text-xl mb-3">{t("homeValue.aiNative.title")}</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
              {t("homeValue.aiNative.desc")}
            </p>
          </motion.div>

          {/* Clear async collaboration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-center"
          >
            {/* Chat mockup */}
            <div className="mb-8 flex flex-col items-center gap-3 max-w-xs mx-auto">
              <div className="self-start bg-white rounded-2xl rounded-tl-md px-4 py-3 border border-gray-100 shadow-sm text-sm text-gray-600">
                {t("homeValue.collab.chat1")}
              </div>
              <div className="self-end bg-gray-900 rounded-2xl rounded-tr-md px-4 py-3 text-sm text-white">
                {t("homeValue.collab.chat2")}
              </div>
              <div className="self-start bg-white rounded-2xl rounded-tl-md px-4 py-3 border border-gray-100 shadow-sm text-sm text-gray-600">
                {t("homeValue.collab.chat3")}
              </div>
            </div>
            <h3 className="text-black font-bold text-xl mb-3">{t("homeValue.collab.title")}</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
              {t("homeValue.collab.desc")}
            </p>
          </motion.div>
        </div>

        {/* Row 2: Design matters + Operate with freedom */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Design matters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-sm rounded-xl bg-white border border-gray-100 shadow-lg p-5 space-y-4">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-5 w-28 bg-gray-100 rounded-full" />
                  <div className="w-5" />
                </div>
                {/* Nav mockup */}
                <div className="flex items-center gap-3 px-1">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500" />
                  <div className="flex gap-2">
                    <div className="h-2 w-10 bg-gray-200 rounded-full" />
                    <div className="h-2 w-8 bg-gray-100 rounded-full" />
                    <div className="h-2 w-12 bg-gray-100 rounded-full" />
                  </div>
                </div>
                {/* Hero mockup */}
                <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-4 space-y-3">
                  <div className="h-3 w-3/4 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full" />
                  <div className="h-2 w-full bg-gray-200/70 rounded-full" />
                  <div className="h-2 w-2/3 bg-gray-200/50 rounded-full" />
                  <div className="flex gap-2 mt-3">
                    <div className="h-6 w-16 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
                    <div className="h-6 w-16 rounded-full border border-gray-200" />
                  </div>
                </div>
                {/* Cards mockup */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-gray-50 border border-gray-100 p-2 space-y-1.5">
                    <div className="w-5 h-5 rounded-md bg-violet-100" />
                    <div className="h-1.5 w-full bg-gray-200 rounded-full" />
                    <div className="h-1.5 w-2/3 bg-gray-100 rounded-full" />
                  </div>
                  <div className="rounded-lg bg-gray-50 border border-gray-100 p-2 space-y-1.5">
                    <div className="w-5 h-5 rounded-md bg-pink-100" />
                    <div className="h-1.5 w-full bg-gray-200 rounded-full" />
                    <div className="h-1.5 w-2/3 bg-gray-100 rounded-full" />
                  </div>
                  <div className="rounded-lg bg-gray-50 border border-gray-100 p-2 space-y-1.5">
                    <div className="w-5 h-5 rounded-md bg-blue-100" />
                    <div className="h-1.5 w-full bg-gray-200 rounded-full" />
                    <div className="h-1.5 w-2/3 bg-gray-100 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-black font-bold text-xl mb-3">{t("homeValue.design.title")}</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
              {t("homeValue.design.desc")}
            </p>
          </motion.div>

          {/* Operate with freedom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8"
          >
            <div className="mb-8">
              <div className="w-full rounded-xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
                {/* Comparison header */}
                <div className="grid grid-cols-[1fr_auto_auto] gap-3 items-center pb-2 border-b border-gray-100">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider"></span>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider w-16 text-center">Others</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider w-16 text-center">Solyn</span>
                </div>
                {/* Rows */}
                {freedomItems.map((itemKey, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center">
                    <span className="text-sm text-gray-600">{t(itemKey)}</span>
                    <div className="w-16 flex justify-center">
                      <XCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="w-16 flex justify-center">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-black font-bold text-xl mb-3 text-center">{t("homeValue.freedom.title")}</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto text-center">
              {t("homeValue.freedom.desc")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeValueProps;
