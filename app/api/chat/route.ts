// app/api/chat/route.ts
import {
  streamText,
  convertToModelMessages,
  stepCountIs,
  type UIMessage,
} from "ai";
import { google } from "@ai-sdk/google";
import { MODEL_ID, SYSTEM_PROMPT, MAX_OUTPUT_TOKENS } from "@/lib/ai/config";
import { chatTools } from "@/lib/ai/tools";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google(MODEL_ID),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    tools: chatTools,
    // Allow the model to call a tool and then use the result in its reply
    // (tool call -> tool result -> final text), capped so a stuck loop
    // can't run away.
    stopWhen: stepCountIs(4),
  });

  return result.toUIMessageStreamResponse();
}
