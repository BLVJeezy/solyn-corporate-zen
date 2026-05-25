import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Check } from "lucide-react";

export const Field = ({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-white/85">{label}</label>
    {children}
    {hint && <p className="text-xs text-white/40">{hint}</p>}
  </div>
);

export const GlassInput = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={cn(
      "w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 transition-all",
      "focus:outline-none focus:bg-white/[0.06] focus:border-amber-300/40 focus:ring-2 focus:ring-amber-300/10",
      className
    )}
  />
);

export const GlassTextarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    rows={4}
    className={cn(
      "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 transition-all resize-none",
      "focus:outline-none focus:bg-white/[0.06] focus:border-amber-300/40 focus:ring-2 focus:ring-amber-300/10",
      className
    )}
  />
);

interface ChoiceCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}

export const ChoiceCard = ({ label, description, selected, onClick, multi }: ChoiceCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "w-full text-left p-4 rounded-xl border transition-all group",
      "bg-white/[0.03] hover:bg-white/[0.06]",
      selected
        ? "border-amber-300/60 bg-amber-300/[0.06] shadow-[0_0_30px_-12px_rgba(252,211,77,0.4)]"
        : "border-white/10 hover:border-white/20"
    )}
  >
    <div className="flex items-start gap-3">
      <div
        className={cn(
          "shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center transition-all",
          multi ? "rounded-md" : "rounded-full",
          selected
            ? "bg-gradient-to-br from-amber-300 to-amber-400 border-transparent"
            : "border border-white/20 group-hover:border-white/40"
        )}
      >
        {selected && <Check className="w-3 h-3 text-zinc-900" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className={cn("text-sm font-medium", selected ? "text-white" : "text-white/85")}>{label}</div>
        {description && <p className="text-xs text-white/45 mt-1 leading-relaxed">{description}</p>}
      </div>
    </div>
  </button>
);
