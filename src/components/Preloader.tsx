"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState("INITIALIZING PHYSICS...");

  useEffect(() => {
    // Lock scroll while preloading
    document.body.style.overflow = "hidden";
    
    const duration = 2000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(currentProgress);
      
      if (currentProgress > 30 && currentProgress < 70) setPhase("COMPILING ASSETS...");
      if (currentProgress >= 70) setPhase("READY.");

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = ""; // Re-enable scroll
        }, 500); 
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] text-parchment overflow-hidden"
        >
          <div className="flex flex-col items-center gap-4">
             <div className="text-[25vw] md:text-[12vw] font-heading leading-none">
               {progress}%
             </div>
             <div className="font-mono text-xs md:text-sm tracking-widest text-parchment/50 animate-pulse">
               {phase}
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
