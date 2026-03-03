import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_DATA } from "./placeholders";

const HomeFAQ = () => (
  <section className="py-24 px-6">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Questions? Answers.
        </h2>
      </motion.div>

      <div className="space-y-10">
        {FAQ_DATA.map((group, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.1 }}
          >
            <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">{group.category}</p>
            <Accordion type="single" collapsible className="space-y-2">
              {group.items.map((item, qi) => (
                <AccordionItem
                  key={qi}
                  value={`${gi}-${qi}`}
                  className="border border-white/[0.06] rounded-xl bg-white/[0.02] px-5 data-[state=open]:bg-white/[0.04] transition-colors"
                >
                  <AccordionTrigger className="text-white/80 text-sm font-medium hover:text-white hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/40 text-sm leading-relaxed pb-4">
                    {item.a}
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

export default HomeFAQ;
