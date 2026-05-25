import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface FunnelLayoutProps {
  step: number;
  totalSteps: number;
  children: ReactNode;
  hideProgress?: boolean;
}

const FunnelLayout = ({ step, totalSteps, children, hideProgress }: FunnelLayoutProps) => {
  const pct = Math.round((step / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-500/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-zinc-400/10 to-transparent blur-3xl" />

      {/* Top bar */}
      <header className="relative z-10 px-6 lg:px-10 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/solyn-logo-192.png"
            alt="Solyn Global"
            className="w-8 h-8 rounded-lg object-cover shadow-lg shadow-amber-500/20"
          />
          <span className="text-sm font-semibold tracking-tight">Solyn Global</span>
        </Link>
        {!hideProgress && (
          <span className="text-xs text-white/40 font-medium tabular-nums">
            Step {step} of {totalSteps}
          </span>
        )}
      </header>

      {/* Progress bar */}
      {!hideProgress && (
        <div className="relative z-10 px-6 lg:px-10">
          <div className="max-w-2xl mx-auto h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-300 via-amber-400 to-zinc-300"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <main className="relative z-10 px-6 lg:px-10 py-12 lg:py-16">
        <div className="max-w-2xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default FunnelLayout;
