import type { ChatMessage, AiCallOptions } from "@/types/ai";

const BASE_URL =
  process.env.AI_BASE_URL || "https://api.openai.com/v1";

const API_KEY = process.env.OPENAI_API_KEY ?? "";

const TEXT_MODEL = process.env.AI_TEXT_MODEL || "gpt-4o";
const VISION_MODEL = process.env.AI_VISION_MODEL || "gpt-4o";
const IMAGE_MODEL = process.env.AI_IMAGE_MODEL || "dall-e-3";

export function getTextModel() {
  return TEXT_MODEL;
}

export function getVisionModel() {
  return VISION_MODEL;
}

export function getImageModel() {
  return IMAGE_MODEL;
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

  if (!API_KEY) {
    throw new Error(
      "AI environment variables are not configured. Please set OPENAI_API_KEY in .env.local before using AI generation."
    );
  }

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

export interface AiImageOptions {
  model?: string;
  quality?: string;
  size?: string;
}

export async function aiImage(
  prompt: string,
  options: AiImageOptions = {}
): Promise<string> {
  const {
    model = IMAGE_MODEL,
    quality = process.env.IMAGE_GENERATION_QUALITY || "standard",
    size = process.env.IMAGE_GENERATION_SIZE || "1024x1024",
  } = options;

  if (!API_KEY) {
    throw new Error(
      "Missing OPENAI_API_KEY environment variable. Set it in .env.local to generate images."
    );
  }

  const body: Record<string, unknown> = {
    model,
    prompt,
    n: 1,
    quality,
    size,
    response_format: "url",
  };

  const res = await fetch(`${BASE_URL}/images/generations`, {
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
      `Image generation API error ${res.status}: ${text.slice(0, 300)}`
    );
  }

  const data = await res.json();
  const url = data.data?.[0]?.url;
  if (!url) {
    throw new Error("Image generation API returned no image URL");
  }

  return url;
}
