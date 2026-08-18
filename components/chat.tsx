"use client";

// components/chat.tsx
//
// Styled with the project's locked Identity Kit:
//   teal #24423F · near-black #14181A · off-white #F7F9FA · sage #7FA39A
//   headings: JetBrains Mono · body: Inter

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, type FormEvent } from "react";

export default function Chat() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pinnedToBottom, setPinnedToBottom] = useState(true);

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = scrollRef.current;
    if (pinnedToBottom && el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, pinnedToBottom]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setPinnedToBottom(distanceFromBottom < 48);
  }

  function jumpToLatest() {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setPinnedToBottom(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    sendMessage({ text });
    setInput("");
    setPinnedToBottom(true);
  }

  return (
    <div
      className="flex flex-col h-dvh w-full max-w-2xl mx-auto"
      style={{ backgroundColor: "#14181A", fontFamily: "Inter, sans-serif" }}
    >
      <div className="px-4 py-3 border-b" style={{ borderColor: "#24423F" }}>
        <h1
          className="text-sm tracking-wide"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#F7F9FA" }}
        >
          sara. / chat
        </h1>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto px-4 py-6 space-y-4"
      >
        {messages.length === 0 && (
          <p className="text-sm opacity-60" style={{ color: "#F7F9FA" }}>
            Say something to start the conversation.
          </p>
        )}

        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap leading-relaxed"
                style={{
                  backgroundColor: isUser ? "#24423F" : "#1E2422",
                  color: "#F7F9FA",
                  borderTopRightRadius: isUser ? 4 : undefined,
                  borderTopLeftRadius: !isUser ? 4 : undefined,
                }}
              >
                {m.parts.map((part, i) =>
                  part.type === "text" ? <span key={i}>{part.text}</span> : null
                )}
              </div>
            </div>
          );
        })}

        {status === "submitted" && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center"
              style={{ backgroundColor: "#1E2422" }}
              aria-live="polite"
              aria-label="Assistant is thinking"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor: "#7FA39A",
                    animationDelay: `${i * 150}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {!pinnedToBottom && (
          <button
            onClick={jumpToLatest}
            className="sticky bottom-2 left-1/2 -translate-x-1/2 block text-xs px-3 py-1.5 rounded-full shadow"
            style={{ backgroundColor: "#7FA39A", color: "#14181A" }}
          >
            Jump to latest ↓
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-3 py-3 border-t flex gap-2 items-end"
        style={{ borderColor: "#24423F" }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as unknown as FormEvent);
            }
          }}
          placeholder="Message..."
          rows={1}
          className="flex-1 resize-none rounded-full px-4 py-2 text-sm outline-none"
          style={{ backgroundColor: "#1E2422", color: "#F7F9FA" }}
        />

        {isBusy ? (
          <button
            type="button"
            onClick={stop}
            className="shrink-0 rounded-full px-4 py-2 text-sm font-medium"
            style={{ backgroundColor: "#7FA39A", color: "#14181A" }}
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="shrink-0 rounded-full px-4 py-2 text-sm font-medium disabled:opacity-40"
            style={{ backgroundColor: "#24423F", color: "#F7F9FA" }}
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
