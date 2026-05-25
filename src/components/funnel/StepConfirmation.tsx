import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Apple } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  scheduledAt: string;
  timezone: string;
  email: string;
  name: string;
}

function pad(n: number) { return String(n).padStart(2, "0"); }
function toICSDate(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

const StepConfirmation = ({ scheduledAt, timezone, email, name }: Props) => {
  const start = new Date(scheduledAt);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const title = "Solyn Global — Strategy Session";
  const description = `Strategy call with Solyn Global for ${name}.`;
  const location = "Online (link will be sent shortly)";

  const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${toICSDate(start)}/${toICSDate(end)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Solyn Global//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@solyn-global.com`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const icsUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

  const niceDate = start.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const niceTime = start.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 18 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-400 flex items-center justify-center mx-auto mb-7 shadow-[0_0_50px_-10px_rgba(252,211,77,0.5)]"
      >
        <CheckCircle2 className="w-8 h-8 text-zinc-900" strokeWidth={2.5} />
      </motion.div>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.15] mb-3 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
        Your strategy session is booked
      </h1>
      <p className="text-white/55 text-base leading-relaxed max-w-lg mx-auto mb-8">
        Thank you for booking with Solyn Global. We've sent a confirmation to{" "}
        <span className="text-white/85">{email}</span>. The meeting link will follow shortly.
      </p>

      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 mb-7 text-left max-w-md mx-auto">
        <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Date</p>
        <p className="text-base font-medium mb-4">{niceDate}</p>
        <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Time</p>
        <p className="text-base font-medium mb-1">{niceTime}</p>
        <p className="text-xs text-white/40">{timezone}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <a href={googleUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.05] border border-white/10 text-white/85 hover:bg-white/[0.08] text-sm transition-all">
          <Calendar className="w-3.5 h-3.5" /> Google
        </a>
        <a href={outlookUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.05] border border-white/10 text-white/85 hover:bg-white/[0.08] text-sm transition-all">
          <Calendar className="w-3.5 h-3.5" /> Outlook
        </a>
        <a href={icsUrl} download="solyn-strategy-session.ics" className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.05] border border-white/10 text-white/85 hover:bg-white/[0.08] text-sm transition-all">
          <Apple className="w-3.5 h-3.5" /> Apple / .ics
        </a>
      </div>

      <Link to="/" className="text-sm text-white/50 hover:text-white/80 transition-colors">
        ← Back to home
      </Link>
    </motion.div>
  );
};

export default StepConfirmation;
