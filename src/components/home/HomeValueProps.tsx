import { motion } from "framer-motion";
import { Cpu, MessagesSquare, Palette, XCircle } from "lucide-react";
import solynIcon from "@/assets/solyn-icon.svg";

const HomeValueProps = () =>
<section className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16">
      
        <h2 className="text-3xl font-bold text-black tracking-tight leading-tight max-w-3xl mx-auto text-center md:text-4xl">
          Why subscribe?{" "}
          <span className="text-gray-400">
            By the end you'll have a full working product ready to launch to the world.
          </span>
        </h2>
      </motion.div>

      {/* Row 1: AI Native + Async collaboration */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* AI Native */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-center">
        
          <div className="flex justify-center mb-8">
            <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center">
              {/* Gradient glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400 via-pink-400 to-blue-500 opacity-30 blur-xl scale-125" />
              <div className="relative w-24 h-24 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                <img src={solynIcon} alt="Solyn" className="w-14 h-14" />
              </div>
            </div>
          </div>
          <h3 className="text-black font-bold text-xl mb-3">AI Native</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            AI isn't just a tool — it's a multiplier. We use it to remove friction, accelerate creation, and free you to focus on vision, not code.
          </p>
        </motion.div>

        {/* Clear async collaboration */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-center">
        
          {/* Chat mockup */}
          <div className="mb-8 flex flex-col items-center gap-3 max-w-xs mx-auto">
            <div className="self-start bg-white rounded-2xl rounded-tl-md px-4 py-3 border border-gray-100 shadow-sm text-sm text-gray-600">
              Hey! What can we do for you today?
            </div>
            <div className="self-end bg-gray-900 rounded-2xl rounded-tr-md px-4 py-3 text-sm text-white">
              I would like to request a design for a landing page
            </div>
            <div className="self-start bg-white rounded-2xl rounded-tl-md px-4 py-3 border border-gray-100 shadow-sm text-sm text-gray-600">
              Sure! We will get back to you by the end of tomorrow 😉
            </div>
          </div>
          <h3 className="text-black font-bold text-xl mb-3">Clear, async collaboration</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            Stay in sync through weekly calls and async updates. No endless meetings, no micromanagement — just progress.
          </p>
        </motion.div>
      </div>

      {/* Row 2: Design matters + Operate with freedom */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Design matters */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-center">
        
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-sm rounded-xl bg-white border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Your Project</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded-full w-full" />
                <div className="h-2 bg-gray-100 rounded-full w-3/4" />
                <div className="h-2 bg-gray-100 rounded-full w-1/2" />
              </div>
            </div>
          </div>
          <h3 className="text-black font-bold text-xl mb-3">Design matters</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            In a world filled with AI clones, user experience matters more than ever. Design is what makes technology feel human — and that's where we obsess.
          </p>
        </motion.div>

        {/* Operate with freedom */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8">
        
          <div className="mb-8">
            <p className="font-bold text-black text-lg mb-5">Say no more to</p>
            <ul className="space-y-3">
              {["Long meetings", "High cost hiring full-time", "Micromanagement", "Long contracts"].map((item, i) =>
            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  {item}
                </li>
            )}
            </ul>
          </div>
          <h3 className="text-black font-bold text-xl mb-3 text-center">Operate with freedom</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto text-center">
            No rigid contracts. Just an open, flexible process that adapts to how you work — not the other way around.
          </p>
        </motion.div>
      </div>
    </div>
  </section>;


export default HomeValueProps;