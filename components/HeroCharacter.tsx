"use client";

import { useEffect, useState } from "react";

type Emotion = "default" | "happy" | "wink" | "excited" | "thinking";

type Line = {
  text: string;
  emotion: Emotion;
};

const LINES: Line[] = [
  { text: "// building things that work", emotion: "default" },
  { text: "hi, I'm Sara's little helper", emotion: "happy" },
  { text: "Melodies — a music app 🎵", emotion: "excited" },
  { text: "PBL — a learning ERP 🎓", emotion: "thinking" },
  { text: "CarryClicks — a bags shop 👜", emotion: "wink" },
  { text: "Keyf — cold brew coffee ☕", emotion: "happy" },
  { text: "status: online", emotion: "default" },
  { text: "scroll down, more below ↓", emotion: "excited" },
];

type HeroCharacterProps = {
  overrideText?: string | null;
  overrideEmotion?: Emotion | null;
};

export default function HeroCharacter({
  overrideText = null,
  overrideEmotion = null,
}: HeroCharacterProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );

  const cyclingEmotion = LINES[lineIndex].emotion;

  useEffect(() => {
    if (overrideText) return;

    const currentLine = LINES[lineIndex].text;

    if (phase === "typing") {
      if (typed.length < currentLine.length) {
        const t = setTimeout(() => {
          setTyped(currentLine.slice(0, typed.length + 1));
        }, 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), 1600);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 900);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (typed.length > 0) {
        const t = setTimeout(() => {
          setTyped(typed.slice(0, -1));
        }, 20);
        return () => clearTimeout(t);
      } else {
        setLineIndex((i) => (i + 1) % LINES.length);
        setPhase("typing");
      }
    }
  }, [typed, phase, lineIndex, overrideText]);

  const displayText = overrideText ?? typed;
  const currentEmotion = overrideText ? overrideEmotion ?? "happy" : cyclingEmotion;

  return (
    <div className="hero-character-wrap">
      <div className="speech-bubble">
        <span className="font-mono">{displayText}</span>
        <span className="speech-cursor">|</span>
      </div>

      <svg
        className="hero-character"
        width="120"
        height="120"
        viewBox="0 0 72 72"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="8" y="16" width="56" height="48" rx="16" fill="var(--color-main)" />
        <rect x="16" y="26" width="40" height="26" rx="8" fill="var(--color-bg)" />

        <circle cx="22" cy="44" r="3" fill="var(--color-accent-warm)" opacity="0.5" />
        <circle cx="50" cy="44" r="3" fill="var(--color-accent-warm)" opacity="0.5" />

        {currentEmotion === "default" && (
          <>
            <circle className="hero-character-eye" cx="28" cy="39" r="4" fill="var(--color-main)" />
            <circle className="hero-character-eye" cx="44" cy="39" r="4" fill="var(--color-main)" />
          </>
        )}

        {currentEmotion === "happy" && (
          <>
            <path d="M24 39 Q28 34 32 39" stroke="var(--color-main)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M40 39 Q44 34 48 39" stroke="var(--color-main)" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        )}

        {currentEmotion === "wink" && (
          <>
            <path d="M24 39 Q28 34 32 39" stroke="var(--color-main)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="44" cy="39" r="4" fill="var(--color-main)" />
          </>
        )}

        {currentEmotion === "excited" && (
          <>
            <circle cx="28" cy="39" r="5" fill="var(--color-main)" />
            <circle cx="44" cy="39" r="5" fill="var(--color-main)" />
            <circle cx="26.5" cy="37.5" r="1.4" fill="var(--color-bg)" />
            <circle cx="42.5" cy="37.5" r="1.4" fill="var(--color-bg)" />
          </>
        )}

        {currentEmotion === "thinking" && (
          <>
            <circle cx="28" cy="40" r="4" fill="var(--color-main)" />
            <circle cx="44" cy="37" r="4" fill="var(--color-main)" />
            <path d="M22 32 Q28 29 34 32" stroke="var(--color-main)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}

        {(currentEmotion === "default" || currentEmotion === "thinking") && (
          <line x1="32" y1="46" x2="40" y2="46" stroke="var(--color-main)" strokeWidth="2.5" strokeLinecap="round" />
        )}
        {(currentEmotion === "happy" || currentEmotion === "wink") && (
          <path d="M30 45 Q36 50 42 45" stroke="var(--color-main)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {currentEmotion === "excited" && (
          <ellipse cx="36" cy="46.5" rx="4" ry="3" fill="var(--color-main)" />
        )}

        <line x1="36" y1="16" x2="36" y2="6" stroke="var(--color-main)" strokeWidth="3" strokeLinecap="round" />
        <circle
          cx="36"
          cy="4"
          r="4"
          fill={currentEmotion === "excited" ? "var(--color-accent)" : "var(--color-accent-warm)"}
        />
      </svg>
    </div>
  );
}
