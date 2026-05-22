"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";
import { recipes } from "@/lib/recipes";

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.55 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } },
};

export default function Kitchen() {
  return (
    <>
      <SmoothScrolling>
        <CustomCursor />
        <main className="min-h-screen w-full bg-charcoal text-parchment flex flex-col px-4 md:px-12 lg:px-24 pb-32">

          <div className="fixed top-8 left-4 md:left-8 z-50">
            <Link
              href="/"
              className="font-mono text-xs md:text-sm tracking-widest text-parchment/60 hover:text-neonAccent transition-colors uppercase"
            >
              ← Return
            </Link>
          </div>
          <div className="fixed top-8 right-4 md:right-8 z-50 font-mono text-xs md:text-sm tracking-widest text-parchment/40 uppercase">
            Open Kitchen
          </div>

          {/* Hero */}
          <div className="pt-28 md:pt-36 pb-12 md:pb-16 border-b border-parchment/10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/30 mb-5"
            >
              {recipes.length} Dishes &mdash; All From Scratch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              className="font-heading text-[22vw] md:text-[16vw] uppercase leading-none text-neonAccent"
            >
              Kitchen.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.28 }}
              className="font-mono text-xs md:text-sm text-parchment/50 uppercase tracking-widest mt-6 max-w-md leading-relaxed"
            >
              I cook the same way I build — with precision and without apology.
              <br className="hidden md:block" /> Pull up a chair.
            </motion.p>
          </div>

          {/* Dish list */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            {recipes.map((recipe, i) => (
              <motion.div key={recipe.slug} variants={rowVariants}>
                <Link
                  href={`/kitchen/${recipe.slug}`}
                  className="group flex items-end justify-between w-full py-8 md:py-10 border-b border-parchment/10 hover:bg-parchment/[0.025] transition-colors duration-300 hover-target"
                >
                  <div className="flex items-end gap-4 md:gap-8">
                    <span className="font-mono text-xs text-parchment/20 group-hover:text-neonAccent transition-colors duration-300 mb-1.5 hidden md:block w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[6vw] uppercase leading-none group-hover:text-neonAccent transition-colors duration-200">
                        {recipe.title}
                      </h2>
                      {/* Note previews on hover */}
                      <p className="font-mono text-xs text-parchment/0 group-hover:text-parchment/40 transition-colors duration-300 uppercase tracking-wide max-w-xs md:max-w-sm leading-relaxed hidden md:block">
                        {recipe.note}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0 ml-6">
                    <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-parchment/0 group-hover:text-parchment/40 transition-colors duration-300">
                      {recipe.category}
                    </span>
                    <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-parchment/0 group-hover:text-parchment/25 transition-colors duration-300">
                      {recipe.time}
                    </span>
                    <span className="font-mono text-base text-neonAccent group-hover:translate-x-2 transition-transform duration-300 mt-1">
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

        </main>
      </SmoothScrolling>
    </>
  );
}
