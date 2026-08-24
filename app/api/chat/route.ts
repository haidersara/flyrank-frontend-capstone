import { NextRequest } from "next/server";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60000 }); // 1 minute window
    return { allowed: true, remaining: 9 };
  }

  if (limit.count >= 10) {
    return { allowed: false, remaining: 0 };
  }

  limit.count++;
  return { allowed: true, remaining: 10 - limit.count };
}

export const maxDuration = 30; // 30 seconds max

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

  // ... rest of your chat handler code
  // (keep your existing Claude API logic here)

  // Add rate limit headers to successful responses
  return new Response(
    JSON.stringify(response),
    {
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": remaining.toString()
      }
    }
  );
}