"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    year: "2024",
    title: "Melodies",
    subtitle: "Flutter Music App",
    description: "A Flutter music app with real background audio playback. Full write-up lives in Work.",
    image: "/videos/melodies-preview.mp4",
    color: "#7FA39A",
    tags: ["Flutter", "Dart", "Audio"],
    isVideo: true,
  },
  {
    id: 2,
    year: "2024",
    title: "CarryClicks",
    subtitle: "E-Commerce Platform",
    description: "Full-stack e-commerce platform with real-time inventory and payment processing.",
    image: "/videos/carryclicks-preview.mp4",
    color: "#24423F",
    tags: ["React", "Node.js", "PostgreSQL"],
    isVideo: true,
  },
  {
    id: 3,
    year: "2024",
    title: "AI Surveillance",
    subtitle: "AI-Powered Surveillance System",
    description: "Real-time AI surveillance system with object detection and alerting.",
    image: "/images/keyf-poster.jpg",
    color: "#14181A",
    tags: ["Python", "AI", "Computer Vision"],
    isVideo: false,
  },
  {
    id: 4,
    year: "2023",
    title: "PBL Management",
    subtitle: "ERP System",
    description: "Project-Based Learning management system for educational institutions.",
    image: "/videos/PBL-preview.mp4",  // ← PBL video added!
    color: "#F7F9FA",
    tags: ["Next.js", "Tailwind", "Prisma"],
    isVideo: true,  // ← Now a video!
  },
  {
    id: 5,
    year: "2024",
    title: "Keyf",
    subtitle: "Bottled Cold Coffee Brew",
    description: "A custom coffee brand website with smooth animations, product descriptions, and a seamless user experience.",
    image: "/videos/keyf-preview.mp4",
    color: "#6B4F3A",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    isVideo: true,
  },
];

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const index = Math.min(
        Math.floor(value * projects.length),
        projects.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#14181A] py-24 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#14181A] via-[#1A2F2B] to-[#14181A] opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-mono font-bold text-[#F7F9FA]">
            My Work
            <span className="text-[#7FA39A]">.</span>
          </h2>
          <p className="text-[#7FA39A] text-xl md:text-2xl mt-4 max-w-3xl mx-auto">
            Scroll through my projects — each one tells a story
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    x: isActive ? 0 : -20,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.7 }}
                  className={`p-8 rounded-2xl border-2 transition-all duration-700 cursor-pointer ${
                    isActive
                      ? `border-[${project.color}] bg-[${project.color}]/15 shadow-2xl`
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-4xl md:text-5xl font-mono font-bold text-[#7FA39A]">
                        {project.year}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#F7F9FA] mt-2">
                        {project.title}
                      </h3>
                      <p className="text-[#7FA39A] text-base md:text-lg">
                        {project.subtitle}
                      </p>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 rounded-full bg-[#7FA39A]"
                      />
                    )}
                  </div>

                  <p className="text-[#F7F9FA]/70 text-base md:text-lg mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 text-sm font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="sticky top-24">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#24423F]/30 border border-[#7FA39A]/20 shadow-2xl"
            >
              {projects[activeIndex]?.isVideo ? (
                <video
                  src={projects[activeIndex].image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  key={activeIndex}
                />
              ) : projects[activeIndex]?.image ? (
                <Image
                  src={projects[activeIndex].image}
                  alt={projects[activeIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#7FA39A] text-3xl font-mono">
                  {projects[activeIndex]?.title}
                </div>
              )}

              {!projects[activeIndex]?.isVideo && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#14181A] via-transparent to-transparent opacity-40" />
              )}

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#14181A] to-transparent">
                <h3 className="text-3xl md:text-4xl font-bold text-[#F7F9FA]">
                  {projects[activeIndex]?.title}
                </h3>
                <p className="text-[#7FA39A] text-base md:text-lg">
                  {projects[activeIndex]?.subtitle}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center gap-3 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? "w-10 bg-[#7FA39A]"
                      : "w-2.5 bg-[#7FA39A]/30 hover:bg-[#7FA39A]/50"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}