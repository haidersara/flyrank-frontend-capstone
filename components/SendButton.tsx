"use client";

import { useEffect, useRef, useState } from "react";

type BtnState = "idle" | "loading" | "success" | "error";

interface SendButtonProps {
  onSend: () => Promise<void>;
  idleLabel?: string;
  retryLabel?: string;
}

export default function SendButton({
  onSend,
  idleLabel = "Send",
  retryLabel = "Retry",
}: SendButtonProps) {
  const [state, setState] = useState<BtnState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  async function handleClick() {
    if (state === "loading") return; // interruption guard: ignore clicks mid-flight

    setState("loading");
    try {
      await onSend();
      setState("success");
      resetTimer.current = setTimeout(() => setState("idle"), 900);
    } catch {
      setState("error");
    }
  }

  const label =
    state === "loading"
      ? "Sending…"
      : state === "success"
      ? "Sent"
      : state === "error"
      ? retryLabel
      : idleLabel;

  return (
    <button
      type="button"
      className="send-btn px-6 py-2 rounded-lg font-medium min-w-[130px] h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        backgroundColor:
          state === "error"
            ? "#b45454"
            : state === "success"
            ? "var(--color-accent)"
            : "var(--color-main)",
        color: "var(--color-white)",
        outlineColor: "var(--color-accent-warm)",
      }}
      data-state={state}
      aria-busy={state === "loading"}
      onClick={handleClick}
      disabled={state === "loading"}
    >
      <span className="sr-only" aria-live="polite">
        {state === "loading" && "Sending message"}
        {state === "success" && "Message sent"}
        {state === "error" && "Send failed, retry available"}
      </span>

      <span
        className="send-btn__layer send-btn__label"
        style={{
          opacity: state === "idle" || state === "error" ? 1 : 0,
          transform:
            state === "idle" || state === "error"
              ? "translateY(0)"
              : "translateY(-6px)",
        }}
      >
        {label}
      </span>

      <span
        className="send-btn__layer send-btn__spinner"
        style={{ opacity: state === "loading" ? 1 : 0 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="42 100"
            opacity="0.9"
          />
        </svg>
      </span>

      <span
        className="send-btn__layer send-btn__icon"
        style={{ opacity: state === "success" ? 1 : 0 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}