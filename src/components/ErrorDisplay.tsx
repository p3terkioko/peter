"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ErrorDisplayProps {
  code: string | number;
  message: string;
  quote?: string;
}

const defaultQuotes: Record<string, string> = {
  "400": "Did you type with your elbows? That request made no sense.",
  "401": "Jedi mind tricks don't work here. Show me your credentials.",
  "403": "I'm sorry Dave, I'm afraid I can't do that. You don't have permission.",
  "404": "Congratulations, you've found the void. Nothing to see here.",
  "500": "Our servers are currently on strike demanding better working conditions. We'll be back after negotiations.",
  "502": "The gateway is acting up again. It's probably just a phase.",
  "503": "We're currently taking a coffee break. The machines need rest too.",
  "504": "We waited and waited, but the upstream server left us on read.",
  "default": "Something went horribly right... wait, no, horribly wrong.",
};

export default function ErrorDisplay({ code, message, quote }: ErrorDisplayProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const displayQuote = quote || defaultQuotes[code.toString()] || defaultQuotes["default"];
  const codeString = code.toString().split("");

  return (
    <section className="relative w-full h-[100svh] flex flex-col items-center justify-center bg-charcoal text-parchment overflow-hidden z-10">
      <div className="absolute top-8 left-4 md:left-8 font-mono tracking-widest text-xs md:text-sm text-parchment/50 uppercase">
        SYS. ERR // {code}
      </div>

      <div className="flex flex-col items-center justify-center px-4 w-full relative z-20">
        <motion.h1 
          className="flex text-[25vw] md:text-[20vw] font-heading leading-[0.85] overflow-hidden justify-center hover-target cursor-default selection:bg-neonAccent selection:text-white"
          animate={{ x: mousePosition.x, y: mousePosition.y }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          {codeString.map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: index * 0.1, 
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }} 
          className="mt-4 md:mt-8 flex flex-col items-center"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold uppercase tracking-widest text-white mb-2 text-center">
            {message}
          </h2>
          <p className="font-mono text-sm md:text-base text-parchment/60 tracking-widest text-center max-w-sm md:max-w-md italic mb-12">
            "{displayQuote}"
          </p>

          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-parchment/20 rounded-full font-mono text-xs md:text-sm uppercase tracking-widest hover:bg-neonAccent hover:text-white hover:border-transparent transition-colors duration-300"
            >
              Return to Base
            </motion.div>
          </Link>
        </motion.div>
      </div>
      
      {/* Background static noise effect (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </section>
  );
}
