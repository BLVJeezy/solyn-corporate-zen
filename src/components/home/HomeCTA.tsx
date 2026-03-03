import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const HomeCTA = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mini book-a-call strip */}
      <section className="py-16 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-gray-100 bg-gray-50 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-bold text-black">Book a call</h3>
            <p className="text-gray-400 text-sm mt-2">Book a 15-minute free call with our team</p>
          </div>
          <Button
            onClick={() => navigate("/book")}
            className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-8 gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            Book a Call
          </Button>
        </motion.div>
      </section>

      {/* Big final CTA */}
      <section className="py-24 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tight">
            Start your project with us today!
          </h2>
          <div className="mt-8">
            <Button
              onClick={() => navigate("/book")}
              className="rounded-full bg-black text-white hover:bg-black/90 font-medium px-10 py-6 text-base gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              Start a Project
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HomeCTA;
