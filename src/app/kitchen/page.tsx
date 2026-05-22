"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";

const KitchenScene = dynamic(() => import("@/components/KitchenScene"), {
  ssr: false,
});

export default function Kitchen() {
  return (
    <>
      <CustomCursor />
      <div className="relative w-screen h-screen bg-charcoal overflow-hidden">

        {/* Nav */}
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

        {/* Bottom hint */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none text-center">
          <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-parchment/20">
            Move mouse to explore &nbsp;&bull;&nbsp; Click a dish to open recipe
          </p>
        </div>

        {/* 3D scene — fills the whole viewport */}
        <div className="w-full h-full">
          <KitchenScene />
        </div>

      </div>
    </>
  );
}
