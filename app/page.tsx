"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Timeline from "@/components/Timeline";
import { useEffect, useState } from "react";

const ShaderHero = dynamic(() => import("@/components/ShaderHero"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#14181A] flex items-center justify-center">
      <div className="text-[#7FA39A] text-xl">Loading...</div>
    </div>
  ),
});

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 6000); // ← Longer duration (6 seconds)
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Fullscreen Intro Animation */}
      {showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#14181A] overflow-hidden"
        >
          {/* Background Glow Effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-[#7FA39A] blur-3xl opacity-20"
          />

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  y: [null, -100, -200],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
                className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#7FA39A]"
              />
            ))}
          </div>

          {/* Main Name with Spring Effect */}
          <motion.h1
            initial={{ y: -300, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: 0.2,
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold text-[#F7F9FA] tracking-wider relative z-10"
          >
            <span className="text-[#7FA39A]">S</span>
            <span className="text-[#F7F9FA]">A</span>
            <span className="text-[#7FA39A]">R</span>
            <span className="text-[#F7F9FA]">A</span>
            <span className="text-[#7FA39A]"> </span>
            <span className="text-[#F7F9FA]">H</span>
            <span className="text-[#7FA39A]">A</span>
            <span className="text-[#F7F9FA]">I</span>
            <span className="text-[#7FA39A]">D</span>
            <span className="text-[#F7F9FA]">E</span>
            <span className="text-[#7FA39A]">R</span>
            <span className="text-[#7FA39A]">.</span>
          </motion.h1>

          {/* Subtitle with Typewriter Effect */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 text-lg md:text-2xl text-[#7FA39A] font-light tracking-widest relative z-10"
          >
            I build functional, working Flutter mobile apps.
          </motion.p>

          {/* Tagline with Fade In */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-2 text-sm md:text-base text-[#F7F9FA]/40 font-light tracking-wider relative z-10"
          >
            Flutter Developer · Problem Solver · Creative Thinker
          </motion.p>

          {/* Bouncing Arrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.2,
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-16 text-[#7FA39A] text-5xl md:text-6xl z-10"
          >
            ↓
          </motion.div>

          {/* Subtle "scroll" text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="absolute bottom-8 text-[#7FA39A] text-xs tracking-[0.3em] uppercase z-10"
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      )}

      {/* Main Content */}
      <ShaderHero />
      <Timeline />
    </>
  );
}