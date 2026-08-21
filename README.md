# FlyRank Frontend Capstone

Frontend capstone project for FlyRank, built with Next.js, React, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Setup

```bash
git clone https://github.com/<your-org>/flyrank-frontend-capstone.git
cd flyrank-frontend-capstone
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Conventions

See [rules.md](./rules.md) for stack details, component patterns, and commit guidelines.

## Tool contract: `searchProjects`

The chat at `/chat` (`components/chat.tsx` → `app/api/chat/route.ts`) gives the
model one server-side tool, defined in `lib/ai/tools.ts` and registered on
`streamText({ tools: chatTools })`. It queries the case-study data in
`lib/data/projects.ts` — the same records shown on `/work`.

| | |
|---|---|
| **Name** | `searchProjects` |
| **When the model calls it** | The user asks about a specific project, technology, or theme (e.g. "the flutter app", "ecommerce work", "what's still in progress"). |
| **Input schema** | `z.object({ query: z.string().min(1).max(100) })` — a project name, technology, or theme to search for. |
| **Return shape (success)** | `{ kind: "results", query: string, matches: ProjectMatch[] }` where each `ProjectMatch` is `{ slug, name, category, status: "shipped" \| "in-progress", summary, stack: string[] }`, or `{ kind: "empty", query }` when nothing matches. |
| **Return shape (error)** | Throws `Error("Case study records don't include financial or client-identifying details…")` for queries about revenue, pricing, budget, or client identity — the case studies genuinely don't track that data, so this is a real failure mode, not a random simulated one. The AI SDK surfaces this to the client as the tool part's `output-error` state with `errorText`. |

### Tool lifecycle states

`components/SearchProjectsTool.tsx` renders each of the four typed tool-part
states from `part.state` with a distinct visual, not a JSON dump:

1. **`input-streaming`** — a skeleton pill + "composing query…", while the
   model is still generating the tool call input.
2. **`input-available`** — a spinner + "Searching case studies for
   &lsquo;{query}&rsquo;…", once the input is complete and `execute` is running.
3. **`output-available`** — `components/ProjectResults.tsx`: a real list of
   case-study cards (name, status pill, category, stack chips, link to the
   full case study), or a plain-language empty state if `kind === "empty"`.
4. **`output-error`** — a red-bordered alert card with the thrown error's
   message, so a failed tool call degrades gracefully instead of crashing
   the chat.

To see the error state yourself, ask the chat something like *"what was
CarryClicks' revenue?"*.

## Weekly Reports

Submission write-ups for the FlyRank AI Internship, Front-end AI Engineering track.

- [Week 1 — Environment and AI Toolchain](docs/weekly-reports/Week-1-Environment-and-Toolchain.pdf)
- [Week 2 — Prompting Fundamentals on Real Tasks](docs/weekly-reports/Week-2-Prompting-Fundamentals.pdf)
- [Week 3 — React App and Capstone Skeleton](docs/weekly-reports/Week-3-React-App-and-Capstone-Skeleton.pdf)