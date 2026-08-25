import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60000 });
    return { allowed: true, remaining: 9 };
  }

  if (limit.count >= 10) {
    return { allowed: false, remaining: 0 };
  }

  limit.count++;
  return { allowed: true, remaining: 10 - limit.count };
}

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return new Response(
      JSON.stringify({ 
        error: "Rate limit exceeded. Please wait a moment and try again." 
      }),
      { 
        status: 429, 
        headers: { 
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": "0"
        } 
      }
    );
  }

  try {
    const { messages } = await req.json();

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
    });

    const result = await streamText({
      model: google("gemini-1.5-pro"),
      messages,
      system: `You are a helpful assistant for Sara Haider's portfolio. 
               Answer questions about Sara's Flutter development work, projects, and skills.
               Be concise, professional, and friendly.`,
    });

    // ✅ FIXED: Use toTextStreamResponse
    return result.toTextStreamResponse({
      headers: {
        "X-RateLimit-Remaining": remaining.toString(),
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Something went wrong. Please try again." 
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
}