"use client";

import HeroCharacter from "@/components/HeroCharacter";

export default function FloatingRobot() {
  return (
    <div className="fixed z-40 hidden sm:block pointer-events-none" style={{ top: "20%", left: "70%" }}>
      <HeroCharacter />
    </div>
  );
}