"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-target")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-parchment/60 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center bg-transparent"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(255, 45, 0, 1)" : "transparent",
        borderColor: isHovering ? "transparent" : "rgba(240, 235, 224, 0.6)",
      }}
      transition={{
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 35,
      }}
    />
  );
}
