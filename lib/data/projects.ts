// lib/data/projects.ts
//
// Structured source of truth for the portfolio's case studies. This is the
// "database" the searchProjects tool (lib/ai/tools.ts) queries — kept as a
// typed in-memory module for the capstone instead of a real DB/CMS, but
// shaped the way a real query layer would be (id, tags, status, metrics).

export type ProjectStatus = "shipped" | "in-progress";

export type Project = {
  slug: string;
  name: string;
  category: string;
  status: ProjectStatus;
  /** Searchable keywords: tech, domain, theme. */
  tags: string[];
  /** One-line summary, same as shown on /work. */
  summary: string;
  /** The problem that was actually solved. */
  problem: string;
  /** What was actually done, concretely. */
  action: string;
  /** What came of it — the honest outcome. */
  outcome: string;
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "melodies",
    name: "Melodies",
    category: "Flutter mobile app",
    status: "shipped",
    tags: ["flutter", "mobile", "audio", "music", "dart", "background playback"],
    summary: "Flutter music app — built background audio playback.",
    problem:
      "Audio playback stopped whenever the user navigated away from the now-playing screen, breaking the core listening experience.",
    action:
      "Rebuilt playback around a persistent audio service so state survives navigation, and wired the mini-player to stay in sync across the Search, Album, and Home routes.",
    outcome:
      "Playback now persists across every screen — the primary proof point for the 'I build functional, working Flutter mobile apps' claim.",
    stack: ["Flutter", "Dart"],
  },
  {
    slug: "carryclicks",
    name: "CarryClicks",
    category: "E-commerce",
    status: "shipped",
    tags: ["ecommerce", "billing", "checkout", "payments", "bug fix", "foreign key"],
    summary: "E-commerce — fixed a billing validation bug.",
    problem:
      "A foreign-key mismatch in the checkout payload meant some orders failed billing validation right before payment confirmation.",
    action:
      "Traced the bug to a mismatched key in the order payload, corrected the relation, and re-verified the full listing → detail → order-success flow end to end.",
    outcome:
      "Checkout now completes reliably from listing to order confirmation, with the fix verified against the live flow rather than assumed.",
    stack: ["React", "Node.js"],
  },
  {
    slug: "ai-surveillance",
    name: "AI-Powered Surveillance System",
    category: "Computer vision",
    status: "shipped",
    tags: ["computer vision", "surveillance", "latency", "detection", "ai", "cv"],
    summary: "Cut detection lag from 5–10s to under 1s.",
    problem:
      "Object detection lagged 5–10 seconds behind the live feed, too slow to be useful in a monitoring context.",
    action:
      "Profiled the detection pipeline, removed redundant processing steps, and optimized the inference path.",
    outcome: "Detection lag dropped from 5–10 seconds to under 1 second.",
    stack: ["Python", "OpenCV"],
  },
  {
    slug: "pbl-management",
    name: "PBL Management System",
    category: "ERP",
    status: "in-progress",
    tags: ["erp", "access control", "roles", "permissions", "dashboard"],
    summary: "ERP — built role-based access control. In progress.",
    problem:
      "The system needed role-based views so a 'PBL Manager' sees a different dashboard and permission set than other roles.",
    action:
      "Built the role-based access control layer and a manager-facing dashboard view.",
    outcome:
      "Access-control isolation between roles works for the manager view; honestly framed as still partly in progress, not a finished system.",
    stack: ["React", "Express"],
  },
];
