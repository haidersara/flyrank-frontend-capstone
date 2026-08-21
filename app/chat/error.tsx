"use client";

import { useEffect } from "react";

export default function ChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Chat route error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <span className="text-3xl">⚠️</span>
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-400 text-sm max-w-md mb-6">
        {error.message || "Failed to load the chat. Please try again."}
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
      >
        Try again
      </button>
    </div>
  );
}