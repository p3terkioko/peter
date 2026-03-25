"use client";

import { useEffect, useState } from "react";

export default function KonamiEasterEgg() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    let inputSequence: string[] = [];
    // Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      inputSequence.push(e.key);
      inputSequence = inputSequence.slice(-konamiCode.length);

      if (inputSequence.join("").toLowerCase() === konamiCode.join("").toLowerCase()) {
        setTriggered((prev) => !prev);
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
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .konami-mode {
          filter: invert(1) hue-rotate(180deg) brightness(1.2) contrast(1.2);
          animation: crtFlicker 0.1s infinite;
        }

        @keyframes crtFlicker {
          0% { opacity: 0.95; }
          50% { opacity: 1; }
          100% { opacity: 0.9; }
        }
      `}} />
    </>
  );
}
