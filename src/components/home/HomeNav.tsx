import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
];

const HomeNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-6">
        {/* Brand */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          className="flex items-center gap-2 text-black font-bold text-xl tracking-tight"
        >
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          Solyn
        </a>

        {/* Center pill nav */}
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-0.5 rounded-full px-1.5 py-1 border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                className="text-sm text-gray-600 hover:text-black transition-colors px-4 py-1.5 rounded-full"
              >
                {link.label}
              </a>
            ))}
            <Button
              size="sm"
              onClick={() => navigate("/book")}
              className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-5 text-sm"
            >
              Book a Call
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="text-black p-2">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-gray-100 w-80">
              <div className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      navigate(link.href);
                    }}
                    className="text-lg text-gray-600 hover:text-black transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  onClick={() => { setMobileOpen(false); navigate("/book"); }}
                  className="rounded-full bg-black text-white hover:bg-black/90 font-medium mt-4"
                >
                  Book a Call
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default HomeNav;
