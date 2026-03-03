import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/book" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQs", href: "#faq" },
];

const HomeFooter = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <footer className="border-t border-white/[0.06] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Subscribe to Solyn</h3>
            <p className="text-white/40 text-sm mb-6">
              The partner for founders building products with AI.
            </p>
            <div className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus-visible:ring-white/20"
              />
              <Button className="rounded-full bg-white text-black hover:bg-white/90 font-medium px-6 flex-shrink-0">
                Sign Up
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end md:items-start">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.href.startsWith("#")) {
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate(link.href);
                  }
                }}
                className="text-white/40 text-sm hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Solyn. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a href="#" className="text-white/25 hover:text-white/50 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="text-white/25 hover:text-white/50 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
