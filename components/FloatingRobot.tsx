"use client";

import { motion } from "framer-motion";
import HeroCharacter from "@/components/HeroCharacter";
import { useRobot } from "@/components/RobotContext";

export default function FloatingRobot() {
  const { overrideText, overrideEmotion } = useRobot();

  return (
    <motion.div
      className="fixed z-40 hidden sm:block pointer-events-none"
      initial={{ top: "20%", left: "70%" }}
      animate={
        overrideText
          ? { top: "20%", left: "70%" }
          : {
              top: ["20%", "45%", "15%", "35%", "20%"],
              left: ["70%", "78%", "60%", "72%", "70%"],
            }
      }
      transition={{
        duration: 20,
        repeat: overrideText ? 0 : Infinity,
        ease: "easeInOut",
      }}
    >
      <HeroCharacter overrideText={overrideText} overrideEmotion={overrideEmotion} />
    </motion.div>
  );
}
