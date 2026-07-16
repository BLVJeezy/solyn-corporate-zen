import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio1b from "@/assets/portfolio-1b.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio2b from "@/assets/portfolio-2b.png";
import portfolio3 from "@/assets/portfolio-3.png";
import portfolio3b from "@/assets/portfolio-3b.png";
import portfolioSheff from "@/assets/portfolio-shefftrades.png";
import portfolioSheff2 from "@/assets/portfolio-shefftrades-2.png";
import portfolioLeplana from "@/assets/portfolio-leplana.png";
import portfolioLeplana2 from "@/assets/portfolio-leplana-2.png";
import portfolioRW from "@/assets/portfolio-rw-academy.png";
import portfolioRW2 from "@/assets/portfolio-rw-academy-2.png";
import portfolioMomentum from "@/assets/portfolio-momentumos-1.png";
import portfolioMomentum2 from "@/assets/portfolio-momentumos-2.png";
import portfolioWedding from "@/assets/portfolio-wedding-app.png";
import portfolioDaroumi from "@/assets/portfolio-daroumi-1.png";
import portfolioDaroumi2 from "@/assets/portfolio-daroumi-2.png";
import portfolioPilates from "@/assets/portfolio-poortpilates-1.png";
import portfolioPilates2 from "@/assets/portfolio-poortpilates-2.png";
import portfolioLux from "@/assets/portfolio-luxfitness-1.png";
import portfolioLux2 from "@/assets/portfolio-luxfitness-2.png";
import portfolioRiory from "@/assets/portfolio-riory-1.png";
import portfolioRiory2 from "@/assets/portfolio-riory-2.png";
import portfolioMemorial from "@/assets/portfolio-memorial-1.png";
import portfolioMemorial2 from "@/assets/portfolio-memorial-2.png";
import portfolioGigi1Json from "@/assets/portfolio-gigi-1.png.asset.json";
import portfolioGigi2Json from "@/assets/portfolio-gigi-2.png.asset.json";
const portfolioGigi1 = portfolioGigi1Json.url;
const portfolioGigi2 = portfolioGigi2Json.url;
import portfolioHorse1Json from "@/assets/portfolio-horsevally-1.png.asset.json";
import portfolioHorse2Json from "@/assets/portfolio-horsevally-2.png.asset.json";
const portfolioHorse1 = portfolioHorse1Json.url;
const portfolioHorse2 = portfolioHorse2Json.url;

type ProjectCategory = "all" | "websites" | "apps";

interface ProjectImage {
  src: string;
  label: string;
}

interface Project {
  images: ProjectImage[];
  title: string;
  descKey: string;
  category: "websites" | "apps";
  brandColor?: string; // bg color matching the app/website branding
}

const ProjectCard = ({ project, index, t, onOpenImage }: {project: Project;index: number;t: (key: string) => string;onOpenImage: (src: string, alt: string) => void;}) => {
  const imgBtnClass = "block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 rounded-lg";
  const renderImg = (img: ProjectImage, extraClass: string) => (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onOpenImage(img.src, `${project.title} - ${img.label}`); }}
      className={`${imgBtnClass} ${extraClass.includes('h-[55%]') || extraClass.includes('h-[45%]') ? extraClass.match(/h-\[[^\]]+\]/)?.[0] ?? '' : 'h-full'}`}
      aria-label={`Open ${project.title} - ${img.label}`}
    >
      <img
        src={img.src}
        alt={`${project.title} - ${img.label}`}
        className={`w-full h-full object-cover object-top rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-[1.02] ${extraClass}`}
        loading="lazy"
        decoding="async"
      />
    </button>
  );

  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group">
      
      {/* Card container */}
      <div
        className="relative rounded-2xl border border-border/40 aspect-[4/3] p-4 transition-shadow duration-500 group-hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.12)] overflow-hidden"
        style={{ background: project.brandColor || 'linear-gradient(to bottom right, #f0eeeb, #e8e5e0)' }}>
        {project.images.length === 1 ? (
        /* Single image - clean full view */
        <button
          type="button"
          onClick={() => onOpenImage(project.images[0].src, project.title)}
          className={`${imgBtnClass} h-full`}
          aria-label={`Open ${project.title}`}
        >
          <img
            src={project.images[0].src}
            alt={project.title}
            className="w-full h-full object-cover object-top rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async" />
        </button>) : (

        /* Multi-image layout */
        <div className={`relative w-full h-full ${project.images.length === 2 ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-2'} p-1`}>
            {renderImg(project.images[0], project.images.length === 2 ? 'h-[55%]' : '')}
            {renderImg(project.images[1], project.images.length === 2 ? 'h-[45%]' : '')}
            {project.images[2] && renderImg(project.images[2], '')}
            {project.images[3] && renderImg(project.images[3], '')}
          </div>)
        }
      </div>


      {/* Project info below card */}
      <div className="mt-5 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-foreground/[0.06] border border-border/40 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold text-foreground">{project.title.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-foreground leading-tight">{project.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t(project.descKey)}</p>
        </div>
      </div>
    </motion.div>);

};

const PortfolioSection = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<ProjectCategory>("websites");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const projects: Project[] = [
  { images: [{ src: portfolio1, label: "Homepage" }, { src: portfolio1b, label: "Diensten" }], title: "Belgomed BV", descKey: "portfolio.p1.desc", category: "websites", brandColor: "#0a2622" },
  { images: [{ src: portfolio2, label: "Homepage" }, { src: portfolio2b, label: "Gallery" }], title: "Shinelab Detailing", descKey: "portfolio.p2.desc", category: "websites", brandColor: "#1a1a2e" },
  { images: [{ src: portfolio3, label: "Homepage" }, { src: portfolio3b, label: "Resultaten" }], title: "L'atelier 9", descKey: "portfolio.p3.desc", category: "websites", brandColor: "#f0eeeb" },
  { images: [{ src: portfolioLeplana, label: "Homepage" }, { src: portfolioLeplana2, label: "Dashboard" }], title: "Le Plan A", descKey: "portfolio.p5.desc", category: "websites", brandColor: "#1a1a1a" },
  { images: [{ src: portfolioSheff, label: "Dashboard" }, { src: portfolioSheff2, label: "Leaderboard" }], title: "Sheff Trades", descKey: "portfolio.p4.desc", category: "apps", brandColor: "#1a1400" },
  { images: [{ src: portfolioRW, label: "Dashboard" }, { src: portfolioRW2, label: "Workspace" }], title: "RW Academy", descKey: "portfolio.p6.desc", category: "apps", brandColor: "#0a1628" },
  { images: [{ src: portfolioMomentum, label: "Intelligence" }, { src: portfolioMomentum2, label: "Growth Strategy" }], title: "MomentumOS", descKey: "portfolio.p7.desc", category: "apps", brandColor: "#0d1117" },
  { images: [{ src: portfolioWedding, label: "Homepage" }], title: "Wedding App", descKey: "portfolio.p8.desc", category: "apps", brandColor: "#f5f0e8" },
  { images: [{ src: portfolioDaroumi, label: "Homepage" }, { src: portfolioDaroumi2, label: "Menu" }], title: "Dar Oumi", descKey: "portfolio.p9.desc", category: "websites", brandColor: "#3d3226" },
  { images: [{ src: portfolioPilates, label: "Homepage" }, { src: portfolioPilates2, label: "Lessen" }], title: "Poort Pilates", descKey: "portfolio.p10.desc", category: "websites", brandColor: "#c8a55a" },
  { images: [{ src: portfolioLux, label: "Homepage" }, { src: portfolioLux2, label: "Reserveringen" }], title: "Lux Fitness", descKey: "portfolio.p11.desc", category: "websites", brandColor: "#d4a843" },
  { images: [{ src: portfolioRiory, label: "Homepage" }, { src: portfolioRiory2, label: "Referenties" }], title: "Riory BV", descKey: "portfolio.p12.desc", category: "websites", brandColor: "#0a0a0a" },
  { images: [{ src: portfolioMemorial, label: "Memorial" }, { src: portfolioMemorial2, label: "Tributes" }], title: "In Loving Memory", descKey: "portfolio.p13.desc", category: "apps", brandColor: "#f5efe6" },
  { images: [{ src: portfolioGigi1, label: "Homepage" }, { src: portfolioGigi2, label: "Over" }], title: "GiGi L Coiffure", descKey: "portfolio.p14.desc", category: "websites", brandColor: "#1a1613" }];


  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const pillFilters: {key: "websites" | "apps";labelKey: string;}[] = [
  { key: "websites", labelKey: "portfolio.filter.websites" },
  { key: "apps", labelKey: "portfolio.filter.apps" }];


  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="px-6 lg:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center">
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
            {t("portfolio.heading")}
          </h2>
          <p className="text-muted-foreground mt-4 text-base md:text-lg max-w-2xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        {/* Pill toggle */}
        <div className="flex justify-center mb-14">
          <div className="relative inline-flex rounded-full bg-muted/50 p-1 border border-border/40">
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-foreground shadow-sm"
              initial={false}
              animate={{
                left: filter === "websites" || filter === "all" ? "4px" : "50%",
                right: filter === "apps" ? "4px" : "50%"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            
            {pillFilters.map((f) =>
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`relative z-10 px-7 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              filter === f.key ?
              "text-background" :
              "text-muted-foreground hover:text-foreground"}`
              }>
              
                {t(f.labelKey)}
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-14">
            
            {filtered.map((project, index) =>
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              t={t}
              onOpenImage={(src, alt) => setLightbox({ src, alt })}
            />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl p-0 bg-transparent border-none shadow-none">
          {lightbox && (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>);

};

export default PortfolioSection;