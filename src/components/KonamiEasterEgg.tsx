"use client";

import { useEffect, useState, useRef } from "react";

export default function KonamiEasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let inputSequence: string[] = [];
    
    // Classic Konami Code for Visual Effect
    const konamiCode = [
      "arrowup", "arrowup", "arrowdown", "arrowdown",
      "arrowleft", "arrowright", "arrowleft", "arrowright",
      "b", "a"
    ];
    
    // Fahhh sequence for Audio Effect
    const fahhhCode = ["f", "a", "h", "h", "h"];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent triggering while user is typing in forms
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;

      inputSequence.push(e.key.toLowerCase());
      
      // Limit memory keeping only the max length sequence needed
      if (inputSequence.length > 20) {
        inputSequence.shift();
      }

      const seqStr = inputSequence.join("");

      // Trigger Visual Effect
      if (seqStr.endsWith(konamiCode.join(""))) {
        setTriggered((prev) => !prev);
        inputSequence = [];
      }

      // Trigger Audio Effect
      if (seqStr.endsWith(fahhhCode.join(""))) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => console.error("Audio play failed:", err));
        }
        inputSequence = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (triggered) {
      document.body.classList.add("konami-mode");
    } else {
      document.body.classList.remove("konami-mode");
    }
  }, [triggered]);

  return (
    <audio ref={audioRef} src="/fahhh.mp3" preload="auto" />
  );
}
