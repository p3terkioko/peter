"use client";
import { motion } from "framer-motion";

const marqueeText = "LET'S TALK  •  LET'S TALK  •  LET'S TALK  •  LET'S TALK  •  ";

export default function Contact() {
  return (
    <section className="w-full min-h-[80vh] bg-[#FF2D00] text-charcoal flex flex-col justify-between pt-4 md:pt-12 px-4 md:px-12 pb-4 md:pb-12 relative z-10 overflow-hidden">
      <div className="flex justify-between items-start w-full">
        <div className="font-mono text-xs md:text-sm tracking-widest uppercase opacity-80 font-bold">
          Open to New Opportunities
        </div>
        <div className="font-mono text-xs md:text-sm tracking-widest uppercase opacity-80 font-bold">
          P. 005
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 overflow-hidden">
        <a href="mailto:peterkioko64@gmail.com" className="hover-target block w-full overflow-hidden group">
          <motion.div
            className="flex whitespace-nowrap font-heading text-[18vw] md:text-[15vw] leading-[0.85] uppercase group-hover:opacity-70 transition-opacity"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 12, repeat: Infinity }}
          >
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </motion.div>
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center font-mono text-xs md:text-sm tracking-widest uppercase border-t border-charcoal/20 pt-8 mt-12 w-full font-bold">
        <span>© 2026 PETER KIOKO</span>
        <span className="opacity-50 hidden md:block">LAT -1.2921 / LNG 36.8219</span>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="https://github.com/p3terkioko" target="_blank" rel="noopener noreferrer" className="hover:underline hover-target">GitHub</a>
          <a href="https://www.linkedin.com/in/peter-kioko-94294723b/" target="_blank" rel="noopener noreferrer" className="hover:underline hover-target">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
