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
    offset: ["start start", "end end"],
  });

  const text = "I am a Software Engineer and Creative Developer based in Nairobi. I build digital experiences that combine robust engineering with unapologetic design. I believe in writing clean code, crafting buttery animations, and delivering systems that perform at scale.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="w-full relative z-20 bg-charcoal" style={{ height: "200svh" }}>
      <div className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-center px-4 md:px-24 border-t border-parchment/10 overflow-hidden">
        
        <div className="absolute top-8 left-4 md:left-8 text-xs md:text-sm text-parchment/50 font-mono tracking-widest uppercase">
          P. 002
        </div>
        <div className="absolute top-8 right-4 md:right-8 text-xs md:text-sm text-parchment/50 font-mono tracking-widest uppercase">
          Manifesto
        </div>

        <div className="max-w-5xl mx-auto flex flex-wrap gap-x-2 md:gap-x-4 gap-y-1 text-2xl md:text-5xl lg:text-7xl font-heading leading-none uppercase">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return <Word key={i} word={word} progress={scrollYProgress} start={start} end={end} />;
          })}
        </div>

      </div>
    </section>
  );
}
