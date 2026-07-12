import { Camera } from "lucide-react";

interface PhotoPlaceholderProps {
  /** Once you have the real photo, import it and pass it here — the placeholder disappears automatically */
  src?: string;
  alt: string;
  /** Short description shown in the placeholder so you remember what photo belongs here */
  caption: string;
  className?: string;
  rounded?: "full" | "2xl" | "xl";
}

const PhotoPlaceholder = ({ src, alt, caption, className = "", rounded = "2xl" }: PhotoPlaceholderProps) => {
  const roundedClass = rounded === "full" ? "rounded-full" : rounded === "xl" ? "rounded-xl" : "rounded-2xl";

  if (src) {
    return <img src={src} alt={alt} className={`${roundedClass} object-cover ${className}`} />;
  }

  return (
    <div
      className={`${roundedClass} ${className} border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-2 text-center p-4`}
    >
      <Camera className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
      <span className="text-xs text-gray-400 leading-snug max-w-[180px]">{caption}</span>
    </div>
  );
};

export default PhotoPlaceholder;
