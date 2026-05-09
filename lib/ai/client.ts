import type { ChatMessage, AiCallOptions } from "@/types/ai";

type AiProvider = "openai" | "deepseek";

function getProvider(): AiProvider {
  return (process.env.AI_PROVIDER || "openai") as AiProvider;
}

function getApiKey(): string {
  const provider = getProvider();
  if (provider === "deepseek") {
    return process.env.DEEPSEEK_API_KEY ?? "";
  }
  return process.env.OPENAI_API_KEY ?? "";
}

function getBaseUrl(): string {
  if (process.env.AI_BASE_URL) return process.env.AI_BASE_URL;
  if (getProvider() === "deepseek") return "https://api.deepseek.com";
  return "https://api.openai.com/v1";
}

function getApiKeyErrorMessage(): string {
  if (getProvider() === "deepseek") {
    return "DeepSeek API key is not configured. Please set DEEPSEEK_API_KEY in .env.local.";
  }
  return "AI environment variables are not configured. Please set OPENAI_API_KEY in .env.local before using AI generation.";
}

const TEXT_MODEL = process.env.AI_TEXT_MODEL || (process.env.AI_PROVIDER === "deepseek" ? "deepseek-v4-flash" : "gpt-4o");
const VISION_MODEL = process.env.AI_VISION_MODEL || (process.env.AI_PROVIDER === "deepseek" ? "deepseek-v4-flash" : "gpt-4o");
const IMAGE_MODEL = process.env.AI_IMAGE_MODEL || (process.env.AI_PROVIDER === "deepseek" ? "mock" : "dall-e-3");

export function getProviderName(): AiProvider {
  return getProvider();
}

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

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error(getApiKeyErrorMessage());
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

  const res = await fetch(`${getBaseUrl()}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
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

  if (model === "mock") {
    throw new Error("Mock image model — use placeholder instead of calling aiImage()");
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error(getApiKeyErrorMessage());
  }

  const body: Record<string, unknown> = {
    model,
    prompt,
    n: 1,
    quality,
    size,
    response_format: "url",
  };

  const res = await fetch(`${getBaseUrl()}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
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
