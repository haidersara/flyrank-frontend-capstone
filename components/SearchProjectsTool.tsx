// components/SearchProjectsTool.tsx
//
// Renders the four typed tool-part states for the searchProjects tool:
// input-streaming, input-available, output-available, output-error.
// Each state answers a different question, with its own visual treatment,
// and a 200ms crossfade between states instead of a layout jump.

import ProjectResults from "@/components/ProjectResults";
import type { SearchProjectsOutput } from "@/lib/ai/tools";

type SearchProjectsPart = {
  type: "tool-searchProjects";
  toolCallId: string;
  state: "input-streaming" | "input-available" | "output-available" | "output-error";
  input?: { query?: string };
  output?: SearchProjectsOutput;
  errorText?: string;
};

const shellStyle = {
  backgroundColor: "#1E2422",
  color: "#F7F9FA",
};

export default function SearchProjectsTool({ part }: { part: SearchProjectsPart }) {
  return (
    <div className="max-w-[85%] transition-opacity duration-200 ease-out">
      {part.state === "input-streaming" && (
        <div
          className="rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-xs"
          style={shellStyle}
          aria-live="polite"
        >
          <span className="opacity-50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            searchProjects
          </span>
          <span
            className="inline-block h-3 min-w-[3rem] rounded"
            style={{ backgroundColor: "#24423F" }}
          />
          <span className="opacity-50">composing query…</span>
        </div>
      )}

      {part.state === "input-available" && (
        <div
          className="rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-3 text-sm"
          style={shellStyle}
          aria-live="polite"
          aria-label={`Searching case studies for ${part.input?.query ?? ""}`}
        >
          <span
            className="h-3.5 w-3.5 shrink-0 rounded-full border-2 animate-spin"
            style={{ borderColor: "#7FA39A", borderTopColor: "transparent" }}
          />
          <span>
            Searching case studies for{" "}
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              &ldquo;{part.input?.query ?? "…"}&rdquo;
            </span>
          </span>
        </div>
      )}

      {part.state === "output-available" && part.output && (
        <ProjectResults result={part.output} />
      )}

      {part.state === "output-error" && (
        <div
          className="rounded-xl rounded-tl-sm px-4 py-3 text-sm flex gap-2"
          style={{ backgroundColor: "#2E1A1A", color: "#F7F9FA" }}
          role="alert"
        >
          <span aria-hidden style={{ color: "#D97A6C" }}>
            ⚠
          </span>
          <div>
            <p className="font-medium" style={{ color: "#D97A6C" }}>
              Couldn&rsquo;t search case studies
            </p>
            <p className="opacity-70 text-xs mt-0.5">
              {part.errorText ?? "Unknown error."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
