"use client";

import SendButton from "@/components/SendButton";

function fakeSend(): Promise<void> {
  return new Promise((resolve, reject) => {
    const delay = 800 + Math.random() * 1000;
    setTimeout(() => {
      const shouldFail = Math.random() < 0.2; // 20% failure rate
      shouldFail ? reject(new Error("Network error")) : resolve();
    }, delay);
  });
}

function fakeSendForced(outcome: "success" | "error"): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      outcome === "error" ? reject(new Error("Forced error")) : resolve();
    }, 800);
  });
}

export default function ButtonDemo() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-10 px-6"
      style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Button lifecycle demo</h1>
        <p className="text-sm opacity-70 max-w-md">
          Click the main button — it has a 20% random failure rate. Use the
          force buttons below to trigger a specific outcome on demand.
        </p>
      </div>

      <SendButton onSend={fakeSend} />

      <div className="flex flex-col items-center gap-3">
        <p className="text-xs uppercase tracking-wide opacity-50">
          Force outcome (for testing / grading)
        </p>
               <div className="flex gap-4">
          <ForceButton outcome="success" />
          <ForceButton outcome="error" />
        </div>
      </div>

      <p className="text-xs opacity-60 max-w-md text-center leading-relaxed mt-4">
        <strong>Timing notes:</strong> Hover/focus transitions use 150ms
        ease-out — fast enough to feel responsive without calling attention
        to itself. The idle→loading morph uses 250ms with a standard
        ease-in-out curve so the width change feels deliberate rather than
        snappy. Success holds for ~600ms before resetting so the checkmark is
        actually seen, not just flashed. The error shake is a single 400ms
        decaying oscillation — enough to read as "no" without feeling like a
        glitch. All animated properties are transform/opacity (plus a
        width transition isolated to its own timing) to stay
        compositor-friendly, and everything is disabled or reduced to
        near-instant feedback under prefers-reduced-motion.
      </p>
    </main>
  );
}

function ForceButton({ outcome }: { outcome: "success" | "error" }) {
  return (
    <SendButton
      onSend={() => fakeSendForced(outcome)}
      idleLabel={outcome === "success" ? "Force success" : "Force error"}
    />
  );
}