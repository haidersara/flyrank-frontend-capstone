"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Emotion = "default" | "happy" | "wink" | "excited" | "thinking";

type RobotContextType = {
  overrideText: string | null;
  overrideEmotion: Emotion | null;
  setRobotMessage: (text: string, emotion?: Emotion) => void;
  clearRobotMessage: () => void;
};

const RobotContext = createContext<RobotContextType | undefined>(undefined);

export function RobotProvider({ children }: { children: ReactNode }) {
  const [overrideText, setOverrideText] = useState<string | null>(null);
  const [overrideEmotion, setOverrideEmotion] = useState<Emotion | null>(null);

  const setRobotMessage = (text: string, emotion: Emotion = "happy") => {
    setOverrideText(text);
    setOverrideEmotion(emotion);
  };

  const clearRobotMessage = () => {
    setOverrideText(null);
    setOverrideEmotion(null);
  };

  return (
    <RobotContext.Provider
      value={{ overrideText, overrideEmotion, setRobotMessage, clearRobotMessage }}
    >
      {children}
    </RobotContext.Provider>
  );
}

export function useRobot() {
  const ctx = useContext(RobotContext);
  if (!ctx) {
    throw new Error("useRobot must be used within a RobotProvider");
  }
  return ctx;
}
