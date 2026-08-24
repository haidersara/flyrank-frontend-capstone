"use client";

import Link from "next/link";
import LiveClock from "@/components/LiveClock";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#F7F9FA] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #E4E7E6 1px, transparent 1px), linear-gradient(to bottom, #E4E7E6 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-24 sm:px-8 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-sm uppercase tracking-widest text-[#7FA39A]">
              Flutter Mobile Developer
            </p>
            <h1 className="text-4xl font-bold leading-tight text-[#14181A] md:text-5xl">
              I build functional, working software — frontend, backend, and everything between.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#14181A]/70 md:text-lg">
              Placeholder intro — proof is Melodies, a Flutter music app
              with real background audio playback. Full write-up lives in
              Work.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/work"
                className="rounded-lg bg-[#24423F] px-8 py-3 font-medium text-white transition-all hover:scale-105 hover:bg-[#1a312e]"
              >
                See the work
              </Link>
              <a
                href="#"
                className="rounded-lg border border-[#24423F] px-8 py-3 font-medium text-[#24423F] transition-all hover:scale-105 hover:bg-[#24423F]/5"
              >
                Download CV
              </a>
            </div>

            <div className="mt-12 font-mono text-sm text-[#14181A]/50">
              <LiveClock />
              <span className="block mt-1">Based in Lahore, PK</span>
            </div>
          </div>

          <div className="relative flex h-[320px] items-center justify-center sm:h-[380px] md:h-[420px]">
            <div className="absolute h-56 w-36 -rotate-12 rounded-3xl bg-[#1a312e] shadow-xl sm:h-64 sm:w-40" />
            <div className="absolute h-60 w-38 rounded-3xl bg-[#7FA39A] shadow-xl sm:h-72 sm:w-44">
              <div className="mt-8 space-y-2 px-4">
                <div className="h-2 w-3/4 rounded bg-white/50" />
                <div className="h-2 w-1/2 rounded bg-white/50" />
              </div>
              <div className="absolute bottom-6 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-white/60" />
            </div>
            <div className="absolute h-56 w-36 translate-x-16 rotate-12 rounded-3xl bg-[#C9A876] shadow-xl sm:h-64 sm:w-40 sm:translate-x-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
