// lib/ai/tools.ts
//
// Server-side tool(s) for the capstone chat. See README.md "Tool contract"
// for the documented name/schema/return shape.

import { tool } from "ai";
import { z } from "zod";
import { PROJECTS, type Project } from "@/lib/data/projects";

// Terms the case-study records genuinely don't track. Asking about any of
// these is a real, expected failure mode for a portfolio data source (not a
// crash) — it's what a "designed error state" is for.
const UNTRACKED_TERMS = [
  "revenue",
  "budget",
  "salary",
  "client name",
  "client's name",
  "pricing",
  "price",
  "cost",
  "paid",
  "payment amount",
  "invoice",
  "profit",
];

export type ProjectMatch = Pick<
  Project,
  "slug" | "name" | "category" | "status" | "summary" | "stack"
>;

export type SearchProjectsOutput =
  | { kind: "results"; query: string; matches: ProjectMatch[] }
  | { kind: "empty"; query: string };

function scoreProject(project: Project, terms: string[]): number {
  const haystack = [
    project.name,
    project.slug,
    project.category,
    project.summary,
    project.problem,
    project.action,
    project.outcome,
    ...project.tags,
    ...project.stack,
  ]
    .join(" ")
    .toLowerCase();

  return terms.reduce(
    (score, term) => score + (haystack.includes(term) ? 1 : 0),
    0,
  );
}

export const searchProjectsTool = tool({
  description:
    "Search Sara's portfolio case studies (the projects listed on the Work page). " +
    "Use this whenever the user asks about a specific project, technology, or theme " +
    "(e.g. 'the flutter app', 'ecommerce work', 'the surveillance project', 'what's still in progress'). " +
    "Do not use this for financial, pricing, or client-identifying questions — that data isn't tracked; " +
    "answer from the tool's error instead of guessing.",
  inputSchema: z.object({
    query: z
      .string()
      .min(1)
      .max(100)
      .describe(
        "A project name, technology, or theme to search for, e.g. 'flutter', 'ecommerce', 'billing bug', 'in progress'.",
      ),
  }),
  execute: async ({ query }): Promise<SearchProjectsOutput> => {
    const normalized = query.trim().toLowerCase();

    if (UNTRACKED_TERMS.some((term) => normalized.includes(term))) {
      throw new Error(
        "Case study records don't include financial or client-identifying details — only the technical problem, what was done, and the outcome.",
      );
    }

    const terms = normalized.split(/\s+/).filter(Boolean);
    const scored = PROJECTS.map((project) => ({
      project,
      score: scoreProject(project, terms),
    }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
      return { kind: "empty", query };
    }

    const matches: ProjectMatch[] = scored.map(({ project }) => ({
      slug: project.slug,
      name: project.name,
      category: project.category,
      status: project.status,
      summary: project.summary,
      stack: project.stack,
    }));

    return { kind: "results", query, matches };
  },
});

export const chatTools = {
  searchProjects: searchProjectsTool,
};
