"use client";
import { motion } from "framer-motion";

const skills = [
  "TYPESCRIPT", "NODE.JS", "EXPRESS.JS", "PYTHON", "FASTAPI",
  "ELIXIR", "PHOENIX LIVEVIEW", "POSTGRESQL", "PGVECTOR", "MONGODB",
  "REACT", "NEXT.JS", "TAILWIND", "DOCKER", "GITHUB ACTIONS",
  "NGINX", "DIGITALOCEAN", "LINUX", "FIGMA"
];
// Append the separator smoothly
const marqueeText = skills.join("  •  ") + "  •  ";

export default function Marquee() {
  return (
    <section className="w-full bg-neonAccent text-charcoal py-4 md:py-6 overflow-hidden flex whitespace-nowrap relative z-20">
      <motion.div
        className="flex font-heading text-4xl md:text-6xl uppercase tracking-widest leading-none pointer-events-none"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        <span className="pr-12">{marqueeText}</span>
        <span className="pr-12" aria-hidden="true">{marqueeText}</span>
      </motion.div>
    </section>
  );
}
