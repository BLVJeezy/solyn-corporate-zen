import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/i18n/LanguageContext";

const HomeFAQ = () => {
  const { t } = useLanguage();

  const faqData = [
    {
      categoryKey: "homeFAQ.general",
      items: [
        { qKey: "homeFAQ.general.q1", aKey: "homeFAQ.general.a1" },
        { qKey: "homeFAQ.general.q2", aKey: "homeFAQ.general.a2" },
      ],
    },
    {
      categoryKey: "homeFAQ.services",
      items: [
        { qKey: "homeFAQ.services.q1", aKey: "homeFAQ.services.a1" },
        { qKey: "homeFAQ.services.q2", aKey: "homeFAQ.services.a2" },
      ],
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
            {t("homeFAQ.heading")}{" "}
            <span className="text-gray-400">{t("homeFAQ.headingGray")}</span>
          </h2>
        </motion.div>

        <div className="space-y-10">
          {faqData.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
            >
              <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-4">{t(group.categoryKey)}</p>
              <Accordion type="single" collapsible className="space-y-2">
                {group.items.map((item, qi) => (
                  <AccordionItem
                    key={qi}
                    value={`${gi}-${qi}`}
                    className="border border-gray-100 rounded-xl bg-white px-5 data-[state=open]:bg-gray-50 transition-colors"
                  >
                    <AccordionTrigger className="text-black text-sm font-medium hover:no-underline py-4">
                      {t(item.qKey)}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-sm leading-relaxed pb-4">
                      {t(item.aKey)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
