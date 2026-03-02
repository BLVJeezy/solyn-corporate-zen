import { Code, CheckCircle, Sparkles, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import portfolioImg from "@/assets/mvp-preview.png";
import portfolioImg2 from "@/assets/portfolio-2.png";

const ServicesGrid = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            {t("howWeWork.heading")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
            {t("howWeWork.subtitle")}
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Card 1 — Build */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent backdrop-blur-xl p-8 md:p-10 shadow-[0_0_30px_-5px_rgba(234,179,8,0.15)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <Code className="w-4 h-4 text-foreground" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">Build</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-3">
              {t("howWeWork.build.title")}
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t("howWeWork.build.desc")}
            </p>
            <div className="mt-8 rounded-xl overflow-hidden border border-border bg-background">
              <img
                src={portfolioImg}
                alt="MVP dashboard preview"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Card 2 — Iterate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-400/30 bg-gradient-to-br from-slate-300/10 via-gray-400/5 to-transparent backdrop-blur-xl p-8 md:p-10 shadow-[0_0_30px_-5px_rgba(148,163,184,0.15)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-foreground" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">Iterate</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-3">
              {t("howWeWork.iterate.title")}
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t("howWeWork.iterate.desc")}
            </p>
            {/* Mini task card */}
            <div className="mt-8 flex justify-center">
              <div className="rounded-xl border border-border bg-background p-5 max-w-xs w-full shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    Development
                  </span>
                  <span className="text-muted-foreground text-xs">•••</span>
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">Develop KPI Dashboard</p>
                <p className="text-xs text-muted-foreground mb-3">Design & Develop new dashboard</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "74%" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">74% completed</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — Grow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-foreground" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">Grow</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-3">
              {t("howWeWork.grow.title")}
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-md text-center mx-auto">
              {t("howWeWork.grow.desc")}
            </p>

            {/* Chat mockup */}
            <div className="mt-8 space-y-3 max-w-sm mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0" />
                <div className="rounded-xl bg-background border border-border p-3 text-sm">
                  <p className="font-medium text-foreground text-xs mb-0.5">You <span className="text-muted-foreground font-normal">1:32 PM</span></p>
                  <p className="text-muted-foreground text-xs">{t("howWeWork.grow.chat1")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="rounded-xl bg-background border border-border p-3 text-sm">
                  <p className="font-medium text-foreground text-xs mb-0.5">Solyn <span className="text-muted-foreground font-normal">1:33 PM</span></p>
                  <p className="text-muted-foreground text-xs">{t("howWeWork.grow.chat2")}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
              </div>
            </div>

            <div className="mt-8 text-center">
              <h4 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                {t("howWeWork.grow.collabTitle")}
              </h4>
              <p className="text-muted-foreground mt-2 leading-relaxed max-w-md mx-auto text-sm">
                {t("howWeWork.grow.collabDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
