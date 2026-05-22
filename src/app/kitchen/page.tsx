"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";
import { recipes } from "@/lib/recipes";

const KitchenScene = dynamic(() => import("@/components/KitchenScene"), {
  ssr: false,
});

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
};

export default function Kitchen() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hold until client knows device — avoids hydration mismatch
  if (!mounted) return <div className="w-screen h-screen bg-charcoal" />;

  // ── Mobile ──────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <SmoothScrolling>
          <CustomCursor />
          <main className="min-h-screen w-full bg-charcoal text-parchment flex flex-col px-4 pb-32">

            <div className="fixed top-8 left-4 z-50">
              <Link
                href="/"
                className="font-mono text-xs tracking-widest text-parchment/60 hover:text-neonAccent transition-colors uppercase"
              >
                ← Return
              </Link>
            </div>
            <div className="fixed top-8 right-4 z-50 font-mono text-xs tracking-widest text-parchment/40 uppercase">
              Open Kitchen
            </div>

            {/* Hero */}
            <div className="pt-28 pb-10 border-b border-parchment/10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/30 mb-4"
              >
                {recipes.length} Dishes &mdash; All From Scratch
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                className="font-heading text-[28vw] uppercase leading-none text-neonAccent"
              >
                Kitchen.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
                className="font-mono text-xs text-parchment/50 uppercase tracking-widest mt-5 max-w-xs leading-relaxed"
              >
                I cook the same way I build — with precision and without apology.
              </motion.p>
            </div>

            {/* Recipe list */}
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
                    className="group flex items-end justify-between w-full py-7 border-b border-parchment/10 active:bg-parchment/[0.03] transition-colors hover-target"
                  >
                    <div className="flex flex-col gap-1.5 pr-3">
                      <h2 className="font-heading text-[13vw] uppercase leading-none group-hover:text-neonAccent transition-colors duration-200">
                        {recipe.title}
                      </h2>
                      <p className="font-mono text-[9px] tracking-wide uppercase text-parchment/40 leading-relaxed">
                        {recipe.note.length > 55 ? recipe.note.slice(0, 55) + "…" : recipe.note}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="font-mono text-[9px] tracking-widest uppercase text-parchment/40">
                        {recipe.category}
                      </span>
                      <span className="font-mono text-[9px] text-parchment/25">
                        {recipe.time}
                      </span>
                      <span className="font-mono text-base text-neonAccent group-hover:translate-x-1.5 transition-transform duration-200 mt-1">
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

  // ── Desktop: 3D scene ───────────────────────────────────────────────────
  return (
    <>
      <CustomCursor />
      <div className="relative w-screen h-screen bg-charcoal overflow-hidden">

        <div className="fixed top-8 left-8 z-50">
          <Link
            href="/"
            className="font-mono text-xs md:text-sm tracking-widest text-parchment/60 hover:text-neonAccent transition-colors uppercase"
          >
            ← Return
          </Link>
        </div>
        <div className="fixed top-8 right-8 z-50 font-mono text-xs md:text-sm tracking-widest text-parchment/40 uppercase">
          Open Kitchen
        </div>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-parchment/20 whitespace-nowrap">
            Move mouse to explore &nbsp;&bull;&nbsp; Click a dish to open recipe
          </p>
        </div>

        <div className="w-full h-full">
          <KitchenScene />
        </div>

      </div>
    </>
  );
}
