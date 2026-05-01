const SENSITIVE_PATTERNS = [
  /sk-[a-zA-Z0-9]{20,}/g,
  /whsec_[a-zA-Z0-9]{20,}/g,
  /sbp_[a-zA-Z0-9]{20,}/g,
  /eyJ[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}/g,
];

const SENSITIVE_KEYS = [
  "OPENAI_API_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

function redact(value: unknown): unknown {
  if (typeof value === "string") {
    let redacted = value;
    for (const pattern of SENSITIVE_PATTERNS) {
      redacted = redacted.replace(pattern, "[REDACTED]");
    }
    return redacted;
  }
  if (Array.isArray(value)) {
    return value.map(redact);
  }
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (SENSITIVE_KEYS.includes(key.toUpperCase())) {
        result[key] = "[REDACTED]";
      } else {
        result[key] = redact(val);
      }
    }
    return result;
  }
  return value;
}

function formatLog(level: string, name: string, message: string, data?: unknown) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}] [${name}]`;
  if (data !== undefined) {
    const safe = redact(data);
    return `${prefix} ${message} ${JSON.stringify(safe)}`;
  }
  return `${prefix} ${message}`;
}

export function createLogger(name: string) {
  return {
    info(message: string, data?: unknown) {
      console.log(formatLog("INFO", name, message, data));
    },
    warn(message: string, data?: unknown) {
      console.warn(formatLog("WARN", name, message, data));
    },
    error(message: string, data?: unknown) {
      console.error(formatLog("ERROR", name, message, data));
    },
  };
}
