// app/api/chat/route.ts
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { MODEL_ID, SYSTEM_PROMPT, MAX_OUTPUT_TOKENS } from "@/lib/ai/config";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google(MODEL_ID),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error("chat stream error:", error);
        return "The assistant hit a snag generating a response. Please try again.";
      },
    });
  } catch (error) {
    console.error("chat route error:", error);
    return Response.json(
      { error: "Something went wrong reaching the assistant. Please try again." },
      { status: 500 },
    );
  }
}
