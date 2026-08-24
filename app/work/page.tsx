import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import Reveal from "@/components/Reveal";
import ProjectMedia from "@/components/ProjectMedia";

const caseStudies = [
  {
    slug: "carryclicks",
    name: "CarryClicks",
    blurb: "E-commerce — fixed a billing validation bug.",
    video: null,
    poster: null,
    accent: "#7fa39a", // falls back to your default accent
  },
  {
    slug: "melodies",
    name: "Melodies",
    blurb: "Flutter music app — built background audio playback.",
    video: "/videos/melodies-preview.mp4",
    poster: "/images/melodies-poster.jpg",
    accent: "#C837AB",
  },
  {
    slug: "ai-surveillance",
    name: "AI-Powered Surveillance System",
    blurb: "Cut detection lag from 5–10s to under 1s.",
    video: null,
    poster: null,
    accent: "#7fa39a",
  },
  {
    slug: "pbl-management",
    name: "PBL Management System",
    blurb: "ERP — built role-based access control. In progress.",
    video: null,
    poster: null,
    accent: "#7fa39a",
  },
  {
    slug: "keyf",
    name: "Keyf",
    blurb: "WordPress — bottled cold brew coffee.",
    video: "/videos/keyf-preview.mp4",
    poster: "/images/keyf-poster.jpg",
    accent: "#8B5E3C",
  },
];

export default function Work() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16 sm:px-8">
      <Reveal>
        <h1 className="font-mono text-3xl font-bold text-main">Work</h1>
      </Reveal>
      <div className="flex flex-col gap-6">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 80}>
            <TiltCard>
              <Link
                href={`/work/${cs.slug}`}
                className="glass block rounded-lg border border-line p-6 shadow-[0_20px_40px_-28px_rgba(28,51,48,0.5)] transition-colors hover:border-accent"
              >
                <ProjectMedia
                  video={cs.video}
                  poster={cs.poster}
                  accent={cs.accent}
                />
                <h2 className="font-mono text-xl font-bold text-main">
                  {cs.name}
                </h2>
                <p className="mt-2 text-text/80">{cs.blurb}</p>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}