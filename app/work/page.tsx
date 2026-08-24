"use client";

import Link from "next/link";
import { useRobot } from "@/components/RobotContext";

const projects = [
  {
    id: 1,
    title: "Melodies",
    category: "Flutter Music App",
    description: "Built background audio playback. Full write-up lives in Work.",
    video: "/videos/melodies-preview.mp4",
    tags: ["Flutter", "Dart", "Audio"],
    link: "/work/melodies",
    robotMessage: "Learned Flutter in Android Studio — my mobile app, with real background audio playback!",
    robotEmotion: "excited" as const,
  },
  {
    id: 2,
    title: "CarryClicks",
    category: "E-Commerce Platform",
    description: "Fixed a billing validation bug. Full-stack e-commerce with real-time inventory.",
    video: "/videos/carryclicks-preview.mp4",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "/work/carryclicks",
    robotMessage: "My first web dev course project — a bags shop site called CarryClicks.",
    robotEmotion: "happy" as const,
  },
  {
    id: 3,
    title: "Keyf",
    category: "Coffee Brand Website",
    description: "Custom coffee brand website with smooth animations and product showcase.",
    video: "/videos/keyf-preview.mp4",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "/work/keyf",
    robotMessage: "A WordPress coffee shop site — tested SEO on this one too.",
    robotEmotion: "wink" as const,
  },
  {
    id: 4,
    title: "PBL Management System",
    category: "ERP System",
    description: "Built role-based access control. In progress.",
    video: "/videos/PBL-preview.mp4",
    tags: ["Next.js", "Tailwind", "Prisma"],
    link: "/work/pbl-management",
    robotMessage: "The ERP I'm currently building — a learning management system for my internship.",
    robotEmotion: "thinking" as const,
  },
];

export default function WorkPage() {
  const { setRobotMessage, clearRobotMessage } = useRobot();

  return (
    <main className="min-h-screen bg-[#14181A] px-4 py-12 md:px-8 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-[#F7F9FA]">
            Work<span className="text-[#7FA39A]">.</span>
          </h1>
          <p className="text-[#7FA39A] text-lg md:text-xl mt-4 max-w-2xl">
            A selection of projects I've built — each one solving a real problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              onMouseEnter={() => setRobotMessage(project.robotMessage, project.robotEmotion)}
              onMouseLeave={() => clearRobotMessage()}
              className="group block bg-[#1A2F2B] rounded-2xl overflow-hidden border border-[#7FA39A]/10 hover:border-[#7FA39A]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#7FA39A]/5 hover:-translate-y-1"
            >
              <div className="relative aspect-video bg-[#0D1A17] overflow-hidden">
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14181A] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#F7F9FA] group-hover:text-[#7FA39A] transition-colors">
                  {project.title}
                </h2>
                <p className="text-[#F7F9FA]/60 text-sm mt-1 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/10 text-[#7FA39A] border border-[#7FA39A]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center text-[#7FA39A]/40 text-sm">
          <p>More projects coming soon.</p>
        </div>
      </div>
    </main>
  );
}
