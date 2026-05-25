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

        {/* Row 1: Async collaboration */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Clear async collaboration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-center"
          >
            {/* Chat mockup */}
            <div className="mb-8 w-full max-w-xs mx-auto">
              <div className="rounded-xl bg-white border border-gray-100 shadow-lg p-3 space-y-2">
                {/* Chat header */}
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                    <span className="text-[9px] text-white font-bold">S</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-700 block leading-tight">Solyn</span>
                    <span className="text-[9px] text-emerald-400">online</span>
                  </div>
                </div>
                {/* Messages */}
                <div className="space-y-2 py-1">
                  {/* Incoming */}
                  <div className="flex items-end gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gray-200 shrink-0 flex items-center justify-center">
                      <span className="text-[6px] font-bold text-gray-500">S</span>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 py-2 max-w-[85%]">
                        <p className="text-[11px] text-gray-700">{t("homeValue.collab.chat1")}</p>
                      </div>
                      <p className="text-[8px] text-gray-300 mt-0.5 ml-1">09:00</p>
                    </div>
                  </div>
                  {/* Outgoing */}
                  <div className="flex justify-end">
                    <div>
                      <div className="bg-gray-900 rounded-2xl rounded-br-md px-3 py-2 max-w-[85%]">
                        <p className="text-[11px] text-white">{t("homeValue.collab.chat2")}</p>
                      </div>
                      <p className="text-[8px] text-gray-300 mt-0.5 text-right mr-1">14:30</p>
                    </div>
                  </div>
                  {/* Incoming */}
                  <div className="flex items-end gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gray-200 shrink-0 flex items-center justify-center">
                      <span className="text-[6px] font-bold text-gray-500">S</span>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 py-2 max-w-[85%]">
                        <p className="text-[11px] text-gray-700">{t("homeValue.collab.chat3")}</p>
                      </div>
                      <p className="text-[8px] text-gray-300 mt-0.5 ml-1">18:00</p>
                    </div>
                  </div>
                </div>
                {/* Input bar */}
                <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                  <div className="flex-1 h-6 bg-gray-50 rounded-full border border-gray-100 px-3 flex items-center">
                    <span className="text-[9px] text-gray-300">Type a message...</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-black font-bold text-xl mb-3">
              {t("homeValue.collab.title")}
            </h3>
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
            className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 flex flex-col"
          >
            <div className="flex justify-center flex-1 items-center mb-6">
              <div className="w-full max-w-xs rounded-xl bg-white border border-gray-100 shadow-lg p-4 space-y-3">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="h-4 w-24 bg-gray-100 rounded-full" />
                  <div className="w-4" />
                </div>
                {/* Nav mockup */}
                <div className="flex items-center gap-2 px-0.5">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-pink-500" />
                  <div className="flex gap-1.5">
                    <div className="h-1.5 w-8 bg-gray-200 rounded-full" />
                    <div className="h-1.5 w-6 bg-gray-100 rounded-full" />
                    <div className="h-1.5 w-10 bg-gray-100 rounded-full" />
                  </div>
                </div>
                {/* Hero mockup */}
                <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-3 space-y-2">
                  <div className="h-2.5 w-3/4 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full" />
                  <div className="h-1.5 w-full bg-gray-200/70 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-gray-200/50 rounded-full" />
                  <div className="flex gap-2 mt-2">
                    <div className="h-5 w-14 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
                    <div className="h-5 w-14 rounded-full border border-gray-200" />
                  </div>
                </div>
                {/* Cards mockup */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[{ color: "bg-violet-100" }, { color: "bg-pink-100" }, { color: "bg-blue-100" }].map((card, i) => (
                    <div key={i} className="rounded-md bg-gray-50 border border-gray-100 p-1.5 space-y-1">
                      <div className={`w-4 h-4 rounded ${card.color}`} />
                      <div className="h-1 w-full bg-gray-200 rounded-full" />
                      <div className="h-1 w-2/3 bg-gray-100 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center mt-auto">
              <h3 className="text-black font-bold text-xl mb-3">
                {t("homeValue.design.title")}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                {t("homeValue.design.desc")}
              </p>
            </div>
          </motion.div>

          {/* Operate with freedom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 flex flex-col"
          >
            <div className="flex justify-center flex-1 items-center mb-6">
              <div className="w-full max-w-xs rounded-xl bg-white border border-gray-100 shadow-lg p-4 space-y-3">
                {/* Comparison header */}
                <div className="grid grid-cols-[1fr_auto] gap-3 items-center pb-2 border-b border-gray-100">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider"></span>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider w-14 text-center">Others</span>
                </div>
                {/* Rows */}
                {freedomItems.map((itemKey, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-3 items-center py-1.5">
                    <span className="text-sm text-gray-600">{t(itemKey)}</span>
                    <div className="w-14 flex justify-center">
                      <XCircle className="w-4 h-4 text-red-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-auto">
              <h3 className="text-black font-bold text-xl mb-3">
                {t("homeValue.freedom.title")}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                {t("homeValue.freedom.desc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeValueProps;
