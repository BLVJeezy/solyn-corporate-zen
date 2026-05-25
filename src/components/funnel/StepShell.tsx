import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface StepShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  loading?: boolean;
}

const StepShell = ({
  eyebrow,
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextDisabled,
  nextLabel = "Continue",
  loading,
}: StepShellProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
  >
    {eyebrow && (
      <p className="text-[11px] uppercase tracking-[0.18em] text-amber-300/80 font-medium mb-4">
        {eyebrow}
      </p>
    )}
    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] mb-3 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
      {title}
    </h1>
    {subtitle && (
      <p className="text-white/55 text-base leading-relaxed mb-10 max-w-xl">{subtitle}</p>
    )}

    <div className="space-y-5">{children}</div>

    <div className="flex items-center justify-between gap-3 mt-10 pt-8 border-t border-white/5">
      {onBack ? (
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white/60 hover:text-white hover:bg-white/5 rounded-full gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      ) : (
        <div />
      )}
      <Button
        onClick={onNext}
        disabled={nextDisabled || loading}
        className="bg-white text-zinc-900 hover:bg-white/90 rounded-full px-6 gap-2 font-medium disabled:opacity-40"
      >
        {loading ? "Saving…" : nextLabel}
        {!loading && <ArrowRight className="w-4 h-4" />}
      </Button>
    </div>
  </motion.div>
);

export default StepShell;
