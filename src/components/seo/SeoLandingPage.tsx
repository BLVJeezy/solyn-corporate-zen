import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Check, Sparkles, Zap, Shield, Code2, Rocket,
  Search, ShoppingBag, Palette, MousePointerClick, Wrench, Star, ChevronRight,
} from "lucide-react";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import { Button } from "@/components/ui/button";
import { SeoLandingContent } from "@/content/seoLandingContent";
import SeoPortfolioScroll from "@/components/seo/SeoPortfolioScroll";

const serviceIcons = [Sparkles, ShoppingBag, Palette, Search, MousePointerClick, Wrench];
const whyIcons = [Rocket, Check, Search, Shield];

const SeoLandingPage = ({ content }: { content: SeoLandingContent }) => {
  const navigate = useNavigate();
  const fullUrl = `https://solynglobal.be${content.path}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Solyn Global",
    url: fullUrl,
    description: content.metaDescription,
    image: "https://solynglobal.be/solyn-logo-192.png",
    priceRange: "€€",
    areaServed: ["BE", "NL", "FR", "EU"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
    },
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Helmet>
        <html lang={content.hreflang} />
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.keywords} />
        <link rel="canonical" href={fullUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:locale" content={content.hreflang.replace("-", "_")} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.metaTitle} />
        <meta name="twitter:description" content={content.metaDescription} />
        <link rel="alternate" hrefLang="nl-BE" href="https://solynglobal.be/website-laten-maken" />
        <link rel="alternate" hrefLang="fr-BE" href="https://solynglobal.be/creation-site-web" />
        <link rel="alternate" hrefLang="en" href="https://solynglobal.be/web-development-company" />
        <link rel="alternate" hrefLang="x-default" href="https://solynglobal.be/web-development-company" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <HomeNav />

      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-6 overflow-hidden">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Soft gold glow */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm mb-8 text-xs font-medium text-gray-700">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {content.eyebrow}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight mb-8 max-w-5xl mx-auto">
              {content.h1.split(content.h1Highlight)[0]}
              <span className="bg-gradient-to-r from-[#c9a84c] via-[#e8c87a] to-[#8a7a3d] bg-clip-text text-transparent">
                {content.h1Highlight}
              </span>
              {content.h1.split(content.h1Highlight)[1] ?? ""}
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
              {content.subHeadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Button size="lg" onClick={() => navigate("/apply")}
                className="rounded-full bg-black text-white hover:bg-black/90 px-7 h-12 text-sm font-medium">
                {content.ctaPrimary}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/portfolio")}
                className="rounded-full border-gray-300 hover:bg-gray-50 px-7 h-12 text-sm font-medium">
                {content.ctaSecondary}
              </Button>
            </div>

            <p className="text-xs text-gray-500 mb-6">{content.trustLine}</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {content.trustBadges.map((b) => (
                <span key={b} className="text-[11px] px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-3xl overflow-hidden border border-gray-200">
          {content.stats.map((s) => (
            <div key={s.label} className="bg-white p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-medium text-black mb-1 tracking-tight">{s.value}</div>
              <div className="text-xs md:text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO INFINITE SCROLL */}
      <SeoPortfolioScroll hreflang={content.hreflang} />


      {/* SERVICES */}
      <section className="px-6 py-20 md:py-28 bg-[hsl(0_0%_98%)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">{content.servicesTitle}</h2>
            <p className="text-gray-600">{content.servicesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.services.map((svc, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
                  className="group p-7 rounded-3xl bg-white border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all"
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#fbf3d9] to-[#f0e0a8] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#8a6f1e]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{svc.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{svc.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.keywords.map((k) => (
                      <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {k}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-14 text-center max-w-3xl mx-auto">
            {content.whyTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {content.whyItems.map((item, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5 p-7 rounded-3xl bg-[hsl(0_0%_7%)] text-white"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c9a84c] to-[#8a7a3d] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-20 md:py-28 bg-[hsl(0_0%_98%)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">{content.processTitle}</h2>
            <p className="text-gray-600">{content.processSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
                className="relative p-7 rounded-3xl bg-white border border-gray-100"
              >
                <div className="text-5xl font-medium text-transparent bg-gradient-to-br from-[#c9a84c] to-[#8a7a3d] bg-clip-text mb-4">
                  {step.step}
                </div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">{content.industriesTitle}</h2>
            <p className="text-gray-600">{content.industriesSubtitle}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {content.industries.map((ind) => (
              <span key={ind} className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700 hover:border-gray-400 transition-colors">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-14 text-center">{content.testimonialsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {content.testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
                className="p-7 rounded-3xl bg-white border border-gray-100"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-3.5 h-3.5 fill-[#c9a84c] text-[#c9a84c]" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5">"{t.quote}"</p>
                <div>
                  <div className="text-sm font-semibold">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 md:py-28 bg-[hsl(0_0%_98%)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">{content.faqTitle}</h2>
            <p className="text-gray-600">{content.faqSubtitle}</p>
          </div>
          <div className="space-y-3">
            {content.faq.map((item, i) => (
              <details
                key={i}
                className="group p-6 rounded-2xl bg-white border border-gray-100 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-base font-semibold pr-4">{item.q}</h3>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-sm text-gray-600 leading-relaxed mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* LONG-FORM SEO BODY */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8">{content.longFormTitle}</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed text-[15px]">
            {content.longFormParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-[hsl(0_0%_7%)] text-white p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle at 30% 20%, rgba(201,168,76,0.25), transparent 60%)" }} />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">{content.finalTitle}</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">{content.finalSub}</p>
            <Button
              size="lg" onClick={() => navigate("/apply")}
              className="rounded-full bg-white text-black hover:bg-white/90 px-8 h-12 text-sm font-medium"
            >
              {content.finalCta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default SeoLandingPage;
