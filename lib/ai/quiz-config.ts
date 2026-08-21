// lib/ai/quiz-config.ts
//
// Separate from lib/ai/config.ts on purpose — the quiz agent needs a
// different system prompt and a structured-output schema, not a chat prompt.

import { z } from "zod";

export const QUIZ_SYSTEM_PROMPT = `
You are a study-quiz generator for a CS student. Given a topic or raw lecture
notes, produce a multiple-choice quiz that actually tests understanding, not
just recall of exact wording. Write plausible wrong answers (distractors) —
don't make the wrong options obviously silly. Keep explanations short (1-2
sentences) and focused on WHY the correct answer is correct.
`.trim();

export const quizSchema = z.object({
  title: z.string().describe("Short title for the quiz, based on the topic"),
  questions: z
    .array(
      z.object({
        id: z.string().describe("Short unique id, e.g. 'q1'"),
        prompt: z.string(),
        options: z
          .array(
            z.object({
              id: z.string().describe("Short unique id, e.g. 'a'"),
              text: z.string(),
            }),
          )
          .min(3)
          .max(5),
        correctOptionId: z.string().describe("Must match one option's id"),
        explanation: z.string(),
      }),
    )
    .min(1),
});

export type Quiz = z.infer<typeof quizSchema>;