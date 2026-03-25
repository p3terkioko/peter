"use client";
import { motion } from "framer-motion";
import LocalTime from "./LocalTime";
import SpotifyPlayer from "./SpotifyPlayer";
import KineticText from "./KineticText";

export default function Hero() {
  return (
    <section className="relative w-full h-[100svh] flex flex-col items-center justify-center bg-charcoal text-parchment overflow-hidden z-10 pt-16">
      <div className="absolute top-8 left-4 md:left-8 font-mono tracking-widest text-xs md:text-sm text-parchment/50 uppercase">
        P. 001
      </div>

      <div className="flex flex-col items-center justify-center px-4 w-full">
        <h1 className="flex text-[15vw] md:text-[14vw] font-heading leading-[0.85] overflow-hidden justify-center hover-target cursor-default">
          <KineticText text="PETER KIOKO" delayStart={2.5} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.3 }} 
          className="mt-6 md:mt-8 font-mono text-sm md:text-base text-parchment/60 tracking-widest uppercase text-center max-w-sm md:max-w-md"
        >
          Creative Developer & Software Engineer
        </motion.p>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 right-4 md:right-8 flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-4 md:gap-0 z-50 pointer-events-none">
        <div className="pointer-events-auto opacity-80 md:opacity-100 pb-2 md:pb-0">
          <LocalTime />
        </div>
        <div className="pointer-events-auto self-end md:self-auto">
          <SpotifyPlayer />
        </div>
      </div>
    </section>
  );
}
