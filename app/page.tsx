"use client";

import Link from "next/link";
import LiveClock from "@/components/LiveClock";
import { RobotProvider } from "@/components/RobotContext";
import FloatingRobot from "@/components/FloatingRobot";
import { useState, useRef, useEffect } from "react";

const videos = [
  { 
    src: "/videos/melodies-preview.mp4", 
    title: "Melodies", 
    tag: "Flutter Music App",
  },
  { 
    src: "/videos/carryclicks-preview.mp4", 
    title: "CarryClicks", 
    tag: "E-Commerce Platform",
  },
  { 
    src: "/videos/keyf-preview.mp4", 
    title: "Keyf", 
    tag: "Coffee Brand Website",
  },
  { 
    src: "/videos/PBL-preview.mp4", 
    title: "PBL Management", 
    tag: "ERP System",
  },
  { 
    src: "/videos/racing-game-preview.mp4", 
    title: "Car Racing Game", 
    tag: "x86 Assembly",
  },
];

export default function HomePage() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideo]);

  return (
    <RobotProvider>
      <div className="relative w-full min-h-screen bg-[#F7F9FA] overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #E4E7E6 1px, transparent 1px), linear-gradient(to bottom, #E4E7E6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-8 pb-12 sm:px-8 md:pt-14">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
            {/* Left Content - 2/5 */}
            <div className="lg:col-span-2">
              <p className="font-mono text-xs uppercase tracking-widest text-[#7FA39A]">
                Flutter Mobile Developer
              </p>

              <h1 className="mt-2 text-3xl font-bold leading-tight text-[#14181A] md:text-4xl lg:text-5xl">
                I build functional,
                <br />
                working software.
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-[#14181A]/50 max-w-md">
                Flutter, React, Python — frontend, backend, and everything between.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/work"
                  className="rounded-lg bg-[#24423F] px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-[#1a312e]"
                >
                  See the work
                </Link>
                <a
                  href="/Sara Haider CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[#24423F] px-6 py-2.5 text-sm font-medium text-[#24423F] transition-all hover:scale-105 hover:bg-[#24423F]/5"
                >
                  Download CV
                </a>
              </div>

              <div className="mt-6 font-mono text-xs text-[#14181A]/40">
                <LiveClock />
                <span className="block mt-0.5">Based in Lahore, PK</span>
              </div>
            </div>

            {/* Right: Computer Screen + Robot Fixed */}
            <div className="lg:col-span-3 flex flex-col items-center">
              <div className="relative w-full max-w-2xl">
                {/* Robot FIXED in one place - top right of screen */}
                <div className="absolute -top-10 -right-4 z-20">
                  <div className="scale-75">
                    <FloatingRobot />
                  </div>
                  {/* Small "hi" label under robot */}
                  <p className="text-center text-[8px] font-mono text-[#14181A]/30 mt-1">
                    👋 hi, I'm Sara's helper!
                  </p>
                </div>

                {/* COMPUTER SCREEN */}
                <div className="relative w-full aspect-[16/10] rounded-xl bg-[#14181A] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/20">
                  <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
                    <video
                      ref={videoRef}
                      src={videos[currentVideo].src}
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    
                    {/* Top Bar */}
                    <div className="absolute top-2 left-4 flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-500/80" />
                        <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                        <span className="h-2 w-2 rounded-full bg-green-500/80" />
                      </div>
                      <span className="ml-2 text-[8px] text-white/40 font-mono tracking-widest">
                        {videos[currentVideo].title.toUpperCase()} · {videos[currentVideo].tag}
                      </span>
                    </div>

                    {/* Video Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-white drop-shadow-lg">
                          {videos[currentVideo].title}
                        </span>
                        <span className="ml-2 text-xs text-white/60 drop-shadow-lg">
                          {videos[currentVideo].tag}
                        </span>
                      </div>
                      <span className="text-xs text-white/40 font-mono">
                        {currentVideo + 1}/{videos.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Screen Stand */}
                <div className="mx-auto mt-1 h-2 w-24 rounded-b-md bg-[#1a1a1a]" />
                <div className="mx-auto h-1 w-32 rounded-full bg-[#1a1a1a]/50" />
              </div>

              {/* Video Controls */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={prevVideo}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#24423F] text-white transition-all hover:scale-110 hover:bg-[#1a312e] shadow-lg"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <span className="text-xs font-mono text-[#14181A]/40 min-w-[80px] text-center">
                  {videos[currentVideo].title}
                </span>

                <button
                  onClick={nextVideo}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7FA39A] text-white transition-all hover:scale-110 hover:bg-[#6B8B82] shadow-lg"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Progress Dots */}
              <div className="mt-3 flex items-center justify-center gap-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideo(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentVideo
                        ? "w-6 bg-[#7FA39A]"
                        : "w-1.5 bg-[#14181A]/20 hover:bg-[#14181A]/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RobotProvider>
  );
}