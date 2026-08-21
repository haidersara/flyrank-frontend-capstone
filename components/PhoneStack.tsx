"use client";

import { useRef, useState } from "react";

type Phone = {
  x: number; // offset px
  y: number;
  rotate: number; // resting rotation deg
  depth: number; // parallax multiplier
  from: string; // gradient start
  to: string; // gradient end
  bars: number[]; // fake UI content widths (%)
};

const phones: Phone[] = [
  {
    x: -78,
    y: 18,
    rotate: -10,
    depth: 10,
    from: "#1c3330",
    to: "#2c4b46",
    bars: [70, 45, 60],
  },
  {
    x: 0,
    y: -12,
    rotate: 0,
    depth: 18,
    from: "#7fa39a",
    to: "#4f7a70",
    bars: [55, 80, 40, 65],
  },
  {
    x: 82,
    y: 24,
    rotate: 11,
    depth: 8,
    from: "#d8ab68",
    to: "#b9863f",
    bars: [50, 70],
  },
];

export default function PhoneStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -14, ry: px * 16 });
  }

  function handleLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="perspective relative mx-auto flex h-[320px] w-full max-w-sm items-center justify-center sm:h-[380px]"
    >
      <div
        className="relative h-full w-full transition-transform duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {phones.map((p, i) => (
          <div
            key={i}
            className="phone-float absolute left-1/2 top-1/2 h-64 w-32 rounded-[1.6rem] border border-white/25 shadow-2xl sm:h-72 sm:w-36"
            style={{
              marginLeft: p.x - 64,
              marginTop: p.y - 128,
              background: `linear-gradient(155deg, ${p.from}, ${p.to})`,
              transform: `translateZ(${p.depth}px) rotate(${p.rotate}deg)`,
              animationDelay: `${i * 0.6}s`,
              boxShadow:
                "0 30px 60px -20px rgba(16,32,29,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            <div className="absolute inset-2 flex flex-col gap-2 rounded-[1.2rem] bg-white/10 p-3">
              <div className="h-1.5 w-8 rounded-full bg-white/40" />
              <div className="mt-2 flex flex-col gap-1.5">
                {p.bars.map((w, bi) => (
                  <div
                    key={bi}
                    className="h-2 rounded-full bg-white/35"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <div className="mt-auto h-8 w-8 rounded-full bg-white/30" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes phoneFloat {
          0%, 100% { translate: 0 0px; }
          50% { translate: 0 -8px; }
        }
        .phone-float {
          animation: phoneFloat 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .phone-float { animation: none; }
        }
      `}</style>
    </div>
  );
}
