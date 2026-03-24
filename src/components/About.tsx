"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function Word({ word, progress, start, end }: { word: string, progress: MotionValue<number>, start: number, end: number }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="text-parchment inline-block">
      {word}
    </motion.span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const text = "I am a Software Engineer and Creative Developer based in Nairobi. I build digital experiences that combine robust engineering with unapologetic design. I believe in writing clean code, crafting buttery animations, and delivering systems that perform at scale.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="py-40 px-4 md:px-24 w-full flex items-center justify-center min-h-[80vh] relative z-20 bg-charcoal border-t border-parchment/10">
      <div className="absolute top-8 left-4 md:left-8 text-xs md:text-sm text-parchment/50 font-mono tracking-widest uppercase">
        P. 002
      </div>
      <div className="absolute top-8 right-4 md:right-8 text-xs md:text-sm text-parchment/50 font-mono tracking-widest uppercase">
        Manifesto
      </div>

      <div className="max-w-5xl mx-auto flex flex-wrap gap-x-2 md:gap-x-4 gap-y-1 text-2xl md:text-5xl lg:text-7xl font-heading leading-none uppercase text-justify">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return <Word key={i} word={word} progress={scrollYProgress} start={start} end={end} />;
        })}
      </div>
    </section>
  );
}
