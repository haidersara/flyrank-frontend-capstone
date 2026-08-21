// components/ProjectResults.tsx
//
// Renders the searchProjects tool's output-available result as a findings
// list of case-study cards (real component, not a JSON dump).

import Link from "next/link";
import type { SearchProjectsOutput } from "@/lib/ai/tools";

const STATUS_LABEL: Record<string, string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
};

export default function ProjectResults({
  result,
}: {
  result: SearchProjectsOutput;
}) {
  if (result.kind === "empty") {
    return (
      <div
        className="rounded-xl px-4 py-3 text-sm"
        style={{ backgroundColor: "#1E2422", color: "#F7F9FA" }}
      >
        <p className="opacity-70">
          No case studies matched &ldquo;{result.query}&rdquo;. Try a
          technology (Flutter, React) or a theme (ecommerce, access control).
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#1E2422" }}
    >
      <div
        className="px-4 pt-3 pb-2 text-xs uppercase tracking-wide opacity-60"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#F7F9FA" }}
      >
        {result.matches.length} case {result.matches.length === 1 ? "study" : "studies"} for
        &ldquo;{result.query}&rdquo;
      </div>

      <ul className="divide-y" style={{ borderColor: "#24423F" }}>
        {result.matches.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="flex flex-col gap-1 px-4 py-3 transition-colors hover:opacity-80"
              style={{ borderColor: "#24423F" }}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-sm font-semibold"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "#F7F9FA" }}
                >
                  {project.name}
                </span>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide"
                  style={{
                    backgroundColor:
                      project.status === "shipped" ? "#24423F" : "#3A2E1A",
                    color: project.status === "shipped" ? "#7FA39A" : "#E0B168",
                  }}
                >
                  {STATUS_LABEL[project.status]}
                </span>
              </div>
              <p className="text-xs opacity-70" style={{ color: "#F7F9FA" }}>
                {project.category} · {project.summary}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-2 py-0.5 text-[10px]"
                    style={{ backgroundColor: "#14181A", color: "#7FA39A" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
