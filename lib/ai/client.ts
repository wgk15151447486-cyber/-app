import type { ChatMessage, AiCallOptions } from "@/types/ai";

const BASE_URL =
  process.env.AI_BASE_URL || "https://api.openai.com/v1";

const API_KEY = process.env.OPENAI_API_KEY ?? "";

const TEXT_MODEL = process.env.AI_TEXT_MODEL || "gpt-4o";
const VISION_MODEL = process.env.AI_VISION_MODEL || "gpt-4o";

export function getTextModel() {
  return TEXT_MODEL;
}

export function getVisionModel() {
  return VISION_MODEL;
}

export async function aiChat(
  messages: ChatMessage[],
  options: AiCallOptions = {}
): Promise<string> {
  const {
    model = TEXT_MODEL,
    temperature = 0.7,
    maxTokens = 4096,
    jsonMode = false,
  } = options;

  const body: Record<string, unknown> = {
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
  };

  if (jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `AI API error ${res.status}: ${text.slice(0, 300)}`
    );
  }

  const data = await res.json();

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("AI returned empty response");
  }

  return content;
}

export async function aiChatJson<T>(
  messages: ChatMessage[],
  options: AiCallOptions = {}
): Promise<T> {
  const text = await aiChat(messages, { ...options, jsonMode: true });
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      `Failed to parse AI JSON response: ${text.slice(0, 300)}`
    );
  }
}
