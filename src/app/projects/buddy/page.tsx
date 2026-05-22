"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";
import BuddyPet from "@/components/BuddyPet";

const TTGOViewer = dynamic(() => import("@/components/TTGOViewer"), { ssr: false });

const TECH = [
  { label: "ESP32", note: "TTGO T-Display (240×135 TFT)" },
  { label: "C++ / Arduino", note: "PlatformIO build chain" },
  { label: "BLE NUS", note: "Nordic UART Service over GATT" },
  { label: "Claude API", note: "claude-3-5-haiku via BLE proxy" },
  { label: "TFT_eSPI", note: "Sprite-based rendering engine" },
];

const FEATURES = [
  "Six animated states — SLEEP, IDLE, BUSY, ATTENTION, CELEBRATE, HEART — each with multi-frame ASCII sequences extracted from a custom C animation engine.",
  "BLE Nordic UART Service bridges Claude Desktop to the device over GATT; no Wi-Fi required.",
  "Conversation-aware: the buddy reacts to Claude's state in real time — typing triggers BUSY, a completed response triggers CELEBRATE, long idle snaps to SLEEP.",
  "Sprite-based TFT rendering on a 240×135 display. Double-buffered frames prevent flicker at fast animation speeds.",
  "Button A/B on the device cycle states manually; long-press A triggers a heart animation.",
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function BuddyPage() {
  return (
    <>
      <CustomCursor />
      <SmoothScrolling>
        <main className="min-h-screen bg-charcoal text-parchment">

          {/* Nav */}
          <div className="fixed top-6 left-4 md:top-8 md:left-8 z-50">
            <Link
              href="/"
              className="font-mono text-xs tracking-widest text-parchment/60 hover:text-neonAccent transition-colors uppercase"
            >
              ← Return
            </Link>
          </div>
          <div className="fixed top-6 right-4 md:top-8 md:right-8 z-50 font-mono text-xs tracking-widest text-parchment/40 uppercase">
            2026
          </div>

          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="px-4 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20 border-b border-parchment/10">
            <motion.p
              variants={fade}
              initial="hidden"
              animate="show"
              className="font-mono text-[10px] tracking-[0.35em] uppercase text-parchment/30 mb-4 md:mb-6"
            >
              Hardware &mdash; AI &mdash; Embedded Systems
            </motion.p>

            <motion.h1
              variants={fade}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.08 }}
              className="font-heading text-[22vw] md:text-[12vw] uppercase leading-none text-neonAccent"
            >
              Buddy.
            </motion.h1>

            <motion.p
              variants={fade}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.18 }}
              className="font-mono text-[11px] md:text-sm text-parchment/55 uppercase tracking-widest mt-4 md:mt-6 max-w-xl leading-relaxed"
            >
              A physical AI companion that sits on your desk and reacts to Claude in real time.
              Built on a TTGO T-Display ESP32 — because software should have a heartbeat.
            </motion.p>

            {/* Image + 3D viewer side by side */}
            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.24 }}
              className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl"
            >
              {/* Photo */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-parchment/25 mb-2">
                  Device Photo
                </p>
                <div className="border border-parchment/10 overflow-hidden">
                  <Image
                    src="/image.png"
                    alt="Claude Desktop Buddy — TTGO T-Display device on desk"
                    width={480}
                    height={360}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>

              {/* 3D viewer */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-parchment/25 mb-2">
                  3D Model — Interactive
                </p>
                <div
                  className="border border-parchment/10"
                  style={{ height: "240px", background: "#060606" }}
                >
                  <TTGOViewer />
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fade}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.34 }}
              className="mt-8"
            >
              <a
                href="https://github.com/p3terkioko/buddy"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-widest uppercase border border-parchment/20 px-5 py-2.5 md:px-6 md:py-3 text-parchment/60 hover:border-neonAccent hover:text-neonAccent transition-colors hover-target inline-block"
              >
                View on GitHub ↗
              </a>
            </motion.div>
          </section>

          {/* ── ASCII Demo + Tech Stack ───────────────────────────────────── */}
          <section className="px-4 md:px-12 py-14 md:py-20 border-b border-parchment/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">

              {/* Left — interactive demo */}
              <motion.div
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/30 mb-6 md:mb-8">
                  Live Demo — Interactive
                </p>
                <BuddyPet />
                <p className="font-mono text-[9px] tracking-widest uppercase text-parchment/25 mt-4 md:mt-6 text-center">
                  Use A / B buttons or the pills to cycle states
                </p>
              </motion.div>

              {/* Right — description + tech */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col gap-8 md:gap-10"
              >
                <motion.div variants={fade}>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/30 mb-3 md:mb-4">
                    What it is
                  </p>
                  <p className="font-mono text-xs md:text-sm text-parchment/70 leading-relaxed">
                    Claude Desktop Buddy is a hardware extension for Claude Desktop. It runs as a
                    companion app on your computer and streams Claude&apos;s conversation state —
                    typing, thinking, idle, celebrating — to an ESP32 microcontroller over Bluetooth
                    Low Energy using the Nordic UART Service protocol.
                  </p>
                  <p className="font-mono text-xs md:text-sm text-parchment/70 leading-relaxed mt-3 md:mt-4">
                    The device renders an ASCII cat on a 240×135 TFT screen, cycling through
                    animated states in sync with what Claude is doing. It&apos;s tactile proof that
                    your AI is alive.
                  </p>
                </motion.div>

                <motion.div variants={fade}>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/30 mb-3 md:mb-4">
                    Tech Stack
                  </p>
                  <div className="flex flex-col gap-2 md:gap-3">
                    {TECH.map((t) => (
                      <div
                        key={t.label}
                        className="flex items-baseline justify-between border-b border-parchment/[0.08] pb-2 md:pb-3"
                      >
                        <span className="font-mono text-xs uppercase tracking-widest text-parchment/80">
                          {t.label}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-parchment/35">
                          {t.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ── Features ─────────────────────────────────────────────────── */}
          <section className="px-4 md:px-12 py-14 md:py-20 border-b border-parchment/10">
            <motion.p
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/30 mb-10 md:mb-12"
            >
              Features
            </motion.p>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  variants={fade}
                  className="flex gap-5 md:gap-8 items-start border-b border-parchment/10 py-6 md:py-8"
                >
                  <span className="font-mono text-[10px] text-parchment/25 pt-0.5 shrink-0">
                    0{i + 1}
                  </span>
                  <p className="font-mono text-xs md:text-sm text-parchment/65 leading-relaxed">
                    {f}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── Footer nav ───────────────────────────────────────────────── */}
          <section className="px-4 md:px-12 py-14 md:py-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-parchment/25 mb-2 md:mb-3">
                  Back to
                </p>
                <Link
                  href="/"
                  className="font-heading text-4xl md:text-6xl uppercase text-parchment hover:text-neonAccent transition-colors hover-target"
                >
                  Works ↗
                </Link>
              </div>
              <p className="font-mono text-[9px] tracking-widest uppercase text-parchment/20">
                Peter Kioko &mdash; 2026
              </p>
            </div>
          </section>

        </main>
      </SmoothScrolling>
    </>
  );
}
