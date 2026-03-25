"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#0123456789";

interface KineticTextProps {
  text: string;
  delayStart?: number;
}

export default function KineticText({ text, delayStart = 0 }: KineticTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerEnter={() => setIsHovered(true)} // for touch/pen support
      onPointerLeave={() => setIsHovered(false)}
    >
      {text.split("").map((char, index) => (
        <KineticChar
          key={index}
          char={char}
          index={index}
          isHovered={isHovered}
          delayStart={delayStart}
        />
      ))}
    </span>
  );
}

function KineticChar({
  char,
  index,
  isHovered,
  delayStart,
}: {
  char: string;
  index: number;
  isHovered: boolean;
  delayStart: number;
}) {
  const [displayChar, setDisplayChar] = useState(char);
  const isSpace = char === " ";

  useEffect(() => {
    if (isSpace) return;

    let interval: NodeJS.Timeout;

    if (isHovered) {
      // Scramble during hover
      interval = setInterval(() => {
        setDisplayChar(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
      }, 50);
    } else {
      // Decode sequence when hover ends
      let iterations = 0;
      interval = setInterval(() => {
        if (iterations >= 4) { // Brief decode sequence
          setDisplayChar(char);
          clearInterval(interval);
        } else {
          setDisplayChar(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        }
        iterations++;
      }, 40);
    }

    return () => clearInterval(interval);
  }, [isHovered, char, isSpace]);

  return (
    <motion.span
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: index * 0.05 + delayStart,
      }}
      className="inline-block"
    >
      {isSpace ? "\u00A0" : displayChar}
    </motion.span>
  );
}
