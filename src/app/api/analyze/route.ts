import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt";
import { demoAnalysis } from "@/lib/demo";
import { findInstrument } from "@/lib/instruments";
import type { AnalysisResult, TraderProfile } from "@/lib/types";

export const maxDuration = 120;

const ALLOWED_MEDIA = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

interface AnalyzeBody {
  images: { data: string; mediaType: string }[];
  instrument: string;
  profile: TraderProfile;
  livePrice?: string;
  notes?: string;
  analysisCount?: number;
}

export async function POST(req: NextRequest) {
  let body: AnalyzeBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.images?.length) {
    return NextResponse.json({ error: "At least one chart image is required" }, { status: 400 });
  }
  if (body.images.length > 4) {
    return NextResponse.json({ error: "Maximum 4 images per analysis" }, { status: 400 });
  }
  for (const img of body.images) {
    if (!ALLOWED_MEDIA.has(img.mediaType)) {
      return NextResponse.json({ error: `Unsupported image type: ${img.mediaType}` }, { status: 400 });
    }
  }

  const instrument = findInstrument(body.instrument);
  const code = instrument?.code ?? body.instrument ?? "XAUUSD";
  const label = instrument?.label ?? body.instrument ?? "Gold";

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured: return a realistic demo analysis so the product flow
    // stays fully testable. The UI badges this as demo mode.
    await new Promise((r) => setTimeout(r, 2500));
    return NextResponse.json(demoAnalysis(code, label));
  }

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

  const content: Anthropic.ContentBlockParam[] = body.images.map((img) => ({
    type: "image" as const,
    source: {
      type: "base64" as const,
      media_type: img.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
      data: img.data,
    },
  }));
  content.push({
    type: "text",
    text: buildUserPrompt({
      instrument: code,
      instrumentLabel: label,
      profile: body.profile ?? "dayTrader",
      livePrice: body.livePrice,
      notes: body.notes,
      analysisCount: body.analysisCount ?? 0,
    }),
  });

  try {
    const response = await client.messages.create({
      model,
      max_tokens: 4096,
      system: buildSystemPrompt(),
      messages: [{ role: "user", content }],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    const result = extractJson(text);
    if (!result) {
      return NextResponse.json(
        { error: "The AI returned an unreadable analysis. Please try again." },
        { status: 502 }
      );
    }
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Analysis failed";
    const status = err instanceof Anthropic.APIError ? err.status ?? 502 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}

function extractJson(text: string): AnalysisResult | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1)) as AnalysisResult;
  } catch {
    return null;
  }
}
