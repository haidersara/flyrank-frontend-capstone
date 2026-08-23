"use client";

import { useEffect, useRef, useState } from "react";

type BtnState = "idle" | "loading" | "success" | "error";

interface SendButtonProps {
  onSend?: () => Promise<void>;
  onClick?: () => void;
  state?: BtnState; // if provided, component becomes "controlled" — parent owns state
  disabled?: boolean;
  idleLabel?: string;
  retryLabel?: string;
}

export default function SendButton({
  onSend,
  onClick,
  state: controlledState,
  disabled = false,
  idleLabel = "Send",
  retryLabel = "Retry",
}: SendButtonProps) {
  const [internalState, setInternalState] = useState<BtnState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isControlled = controlledState !== undefined;
  const state = isControlled ? controlledState : internalState;

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  async function handleClick() {
    if (state === "loading" || disabled) return; // interruption guard

    if (isControlled) {
      onClick?.();
      return;
    }

    if (!onSend) return;
    setInternalState("loading");
    try {
      await onSend();
      setInternalState("success");
      resetTimer.current = setTimeout(() => setInternalState("idle"), 900);
    } catch {
      setInternalState("error");
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
      className="send-btn px-6 py-2 rounded-lg font-medium min-w-[130px] h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
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
      disabled={state === "loading" || disabled}
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