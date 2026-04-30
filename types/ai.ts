export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | ChatContentPart[];
}

export interface ChatContentPart {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string; detail?: "low" | "high" | "auto" };
}

export interface AiCallOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

export interface AiRoomAnalysisOutput {
  room_summary: string;
  detected_room_type: string;
  detected_existing_items: {
    name: string;
    category: string;
    confidence: number;
    position?: string;
    condition?: string;
  }[];
  detected_problems: {
    issue: string;
    severity: "low" | "medium" | "high";
    description: string;
  }[];
  lighting_analysis: string;
  color_analysis: string;
  layout_analysis: string;
  improvement_opportunities: {
    area: string;
    suggestion: string;
    impact: "low" | "medium" | "high";
  }[];
}

export interface AiShoppingItemOutput {
  category: string;
  name: string;
  description: string;
  reason: string;
  recommended_size: string;
  recommended_color: string;
  material: string;
  quantity: number;
  price_min: number;
  price_max: number;
  priority: "essential" | "recommended" | "optional";
}

export interface AiDesignVariantOutput {
  variant_type: "low_budget_refresh" | "photo_friendly_airbnb" | "cozy_premium" | "durable_easy_clean";
  title: string;
  subtitle: string;
  design_summary: string;
  why_it_works: string;
  style_tags: string[];
  estimated_budget_min: number;
  estimated_budget_max: number;
  currency: string;
  difficulty_level: "easy" | "medium" | "hard";
  maintenance_level: string;
  best_for: string[];
  shopping_items: AiShoppingItemOutput[];
}

export interface AiDesignVariantsOutput {
  variants: AiDesignVariantOutput[];
}
