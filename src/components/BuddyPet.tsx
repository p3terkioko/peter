"use client";
import { useState, useEffect, useRef } from "react";

type PetState = "sleep" | "idle" | "busy" | "attention" | "celebrate" | "heart";

// ASCII frames extracted directly from cat.cpp
const FRAMES: Record<PetState, string[][]> = {
  sleep: [
    ["            ", "            ", "   .-..-.   ", "  ( -.- )   ", "  `------`~ "],
    ["            ", "            ", "   .-..-.   ", "  ( -.- )_  ", " `~------'~ "],
    ["            ", "            ", "   .-..-.   ", "  ( -.- )   ", "  `------`~ "],
    ["            ", "            ", "   .-..-.   ", "  ( u.u )   ", " `~------'~ "],
    ["            ", "            ", "   .-/\\.    ", "  (  ..  )) ", "  `~~~~~~`  "],
    ["            ", "            ", "   .-/\\.    ", "  (  ..  )) ", "  `~~~~~~`~ "],
  ],
  idle: [
    ["            ", "   /\\_/\\    ", "  ( o   o ) ", "  (  w   )  ", "  (\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  (o    o ) ", "  (  w   )  ", "  (\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  ( o   o ) ", "  (  w   )  ", "  (\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  ( -   - ) ", "  (  w   )  ", "  (\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  ( o   o ) ", "  (  w   )  ", "  (\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  ( o    o) ", "  (  w   )  ", "  (\")_(\")   "],
    ["            ", "   /\\-/\\    ", "  ( _   _ ) ", "  (  w   )  ", "  (\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  ( ^   ^ ) ", "  (  P   )  ", "  (\")_(\")   "],
  ],
  busy: [
    ["            ", "   /\\_/\\    ", "  ( O   O ) ", "  (  w   )  ", "  (\")_(\")   "],
    ["      .     ", "   /\\_/\\    ", "  ( o   o ) ", "  (  w   )/ ", "  (\")_(\")   "],
    ["    .       ", "   /\\_/\\    ", "  ( o   o ) ", "  (  w   )_ ", "  (\")_(\")   "],
    ["      .     ", "   /\\_/\\    ", "  ( o   o ) ", "  (  w   )/ ", "  (\")_(\")   "],
    ["    o       ", "   /\\_/\\    ", "  ( o   o ) ", "  ( -w   )  ", "  (\")_(\")   "],
    ["  o         ", "   /\\_/\\    ", "  ( o   o ) ", "  (-w    )  ", "  (\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  ( -   - ) ", "  (  w   )  ", "  (\")_(\")   "],
  ],
  attention: [
    ["            ", "   /^_^\\    ", "  ( O   O ) ", "  (  v   )  ", "  (\")_(\")   "],
    ["            ", "   /^_^\\    ", "  (O    O ) ", "  (  v   )  ", "  (\")_(\")   "],
    ["            ", "   /^_^\\    ", "  ( O   O ) ", "  (  v   )  ", "  (\")_(\")   "],
    ["            ", "   /^_^\\    ", "  ( O    O) ", "  (  v   )  ", "  (\")_(\")   "],
    ["            ", "   /^_^\\    ", " /( O   O )\\", " (   v    ) ", " /(\")+(\")\\  "],
    ["            ", "   /^_^\\    ", "  ( O   O ) ", "  (  >   )  ", "  (\")_(\")   "],
  ],
  celebrate: [
    ["            ", "   /\\_/\\    ", "  ( ^   ^ ) ", "  (  W   )  ", " /(\")_(\")\\  "],
    ["  \\^   ^/   ", "    /\\_/\\   ", "  ( ^   ^ ) ", "  (  W   )  ", "  (\")_(\")   "],
    ["  \\^   ^/   ", "    /\\_/\\   ", "  ( * * * ) ", "  (  W   )  ", "  (\")_(\")~  "],
    ["  \\^   ^/   ", "    /\\_/\\   ", "  ( ^   ^ ) ", "  (  W   )  ", "  (\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  ( <   < ) ", "  (  W   ) /", " ~(\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  ( >   > ) ", " \\(  W   )  ", "  (\")_(\")~  "],
    ["    \\o/     ", "   /\\_/\\    ", "  ( ^   ^ ) ", " /(  W   )\\ ", "  (\")_(\")   "],
  ],
  heart: [
    ["            ", "   /\\_/\\    ", "  ( ^   ^ ) ", "  (  u   )  ", "  (\")_(\")~  "],
    ["            ", "   /\\_/\\    ", "  (#^   ^#) ", "  (  u   )  ", "  (\")_(\")   "],
    ["            ", "   /\\_/\\    ", "  ( <3 <3 ) ", "  (  u   )  ", "  (\")_(\")~  "],
    ["            ", "   /\\-/\\    ", "  ( ~   ~ ) ", "  (  u   )  ", " ~(\")_(\")~  "],
    ["            ", "   /\\_/\\    ", "  ( ^   - ) ", "  (  u   )  ", "  (\")_(\")   "],
  ],
};

const SPEEDS: Record<PetState, number> = {
  sleep: 700,
  idle: 500,
  busy: 280,
  attention: 320,
  celebrate: 220,
  heart: 500,
};

const STATE_LABELS: Record<PetState, string> = {
  sleep:     "SLEEP",
  idle:      "IDLE",
  busy:      "BUSY",
  attention: "ATTENTION",
  celebrate: "CELEBRATE",
  heart:     "HEART",
};

const STATE_COLORS: Record<PetState, string> = {
  sleep:     "#555",
  idle:      "#F0EBE0",
  busy:      "#FF8C00",
  attention: "#FF2D00",
  celebrate: "#FFD700",
  heart:     "#FF4D6D",
};

const STATES: PetState[] = ["sleep", "idle", "busy", "attention", "celebrate", "heart"];

export default function BuddyPet() {
  const [state, setState] = useState<PetState>("idle");
  const [frame, setFrame] = useState(0);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFrame(0);
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES[state].length);
    }, SPEEDS[state]);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [state]);

  const current = FRAMES[state][frame % FRAMES[state].length];
  const color = STATE_COLORS[state];

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Device frame */}
      <div
        style={{
          background: "#000",
          border: "1px solid rgba(240,235,224,0.12)",
          padding: "24px 20px 20px",
          width: "100%",
          maxWidth: "320px",
          position: "relative",
        }}
      >
        {/* Status LED */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px ${color}`,
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        />

        {/* Screen label */}
        <div
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "8px",
            letterSpacing: "0.25em",
            color: "rgba(240,235,224,0.25)",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          TTGO T-DISPLAY &mdash; {STATE_LABELS[state]}
        </div>

        {/* ASCII display */}
        <div
          style={{
            background: "#050505",
            border: "1px solid rgba(240,235,224,0.06)",
            padding: "16px",
            fontFamily: "monospace",
            fontSize: "clamp(13px, 3.5vw, 16px)",
            lineHeight: 1.55,
            whiteSpace: "pre",
            color,
            transition: "color 0.3s",
            minHeight: "108px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {current.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Buttons A / B */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
          <button
            onClick={() => {
              const idx = STATES.indexOf(state);
              setState(STATES[(idx - 1 + STATES.length) % STATES.length]);
            }}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "rgba(240,235,224,0.4)",
              background: "rgba(240,235,224,0.05)",
              border: "1px solid rgba(240,235,224,0.12)",
              padding: "5px 12px",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            ← B
          </button>
          <button
            onClick={() => {
              const idx = STATES.indexOf(state);
              setState(STATES[(idx + 1) % STATES.length]);
            }}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "rgba(240,235,224,0.4)",
              background: "rgba(240,235,224,0.05)",
              border: "1px solid rgba(240,235,224,0.12)",
              padding: "5px 12px",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            A →
          </button>
        </div>
      </div>

      {/* State selector pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {STATES.map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "5px 12px",
              border: `1px solid ${s === state ? STATE_COLORS[s] : "rgba(240,235,224,0.15)"}`,
              background: s === state ? `${STATE_COLORS[s]}18` : "transparent",
              color: s === state ? STATE_COLORS[s] : "rgba(240,235,224,0.4)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {STATE_LABELS[s]}
          </button>
        ))}
      </div>
    </div>
  );
}
