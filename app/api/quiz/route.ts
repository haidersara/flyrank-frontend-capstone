// app/api/quiz/route.ts
//
// Non-streaming on purpose: this returns one structured JSON object (the
// whole quiz), not a chat message stream, so a plain request/response is
// the right shape here rather than useChat/streamText.

import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { MODEL_ID } from "@/lib/ai/config";
import { QUIZ_SYSTEM_PROMPT, quizSchema } from "@/lib/ai/quiz-config";

export async function POST(req: Request) {
  const { topic, questionCount } = await req.json();

  if (!topic || typeof topic !== "string" || !topic.trim()) {
    return Response.json({ error: "Missing topic or notes" }, { status: 400 });
  }

  const count = Math.min(Math.max(Number(questionCount) || 5, 1), 10);

  try {
    const { output } = await generateText({
      model: google(MODEL_ID),
      system: QUIZ_SYSTEM_PROMPT,
      prompt: `Create a ${count}-question multiple-choice quiz based on the following topic or notes:\n\n${topic}`,
      output: Output.object({ schema: quizSchema }),
    });

    return Response.json(output);
  } catch (err) {
    console.error("Quiz generation failed:", err);
    return Response.json(
      { error: "Failed to generate quiz. Try again." },
      { status: 500 },
    );
  }
}