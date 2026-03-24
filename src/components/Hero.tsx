"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const name = "PETER KIOKO";
  const letters = name.split("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="h-[100svh] w-full flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-12">
      <div className="absolute top-8 left-4 md:left-8 text-xs md:text-sm text-parchment/50 font-mono tracking-widest uppercase">
        P. 001
      </div>
      <div className="absolute top-8 right-4 md:right-8 text-xs md:text-sm text-parchment/50 font-mono tracking-widest uppercase">
        Nairobi, Kenya
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="text-[15vw] leading-[0.85] font-heading text-center flex overflow-hidden uppercase text-parchment"
      >
        {letters.map((letter, index) => (
          <motion.span 
            key={index} 
            variants={item}
            className={letter === " " ? "w-[4vw]" : "inline-block"}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        className="mt-12 font-mono text-xs md:text-sm text-neonAccent tracking-[0.3em] uppercase text-center"
      >
        Junior Software Developer &middot; Creative
      </motion.div>
    </section>
  );
}
