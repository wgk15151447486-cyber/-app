export interface DetectedItem {
  name: string;
  category: string;
  confidence: number;
  position?: string;
  condition?: string;
}

export interface DetectedProblem {
  issue: string;
  severity: "low" | "medium" | "high";
  description: string;
}

export interface ImprovementOpportunity {
  area: string;
  suggestion: string;
  impact: "low" | "medium" | "high";
}

export interface RoomAnalysis {
  id: string;
  project_id: string;
  user_id: string;
  room_summary: string | null;
  detected_room_type: string | null;
  detected_existing_items: DetectedItem[];
  detected_problems: DetectedProblem[];
  lighting_analysis: string | null;
  color_analysis: string | null;
  layout_analysis: string | null;
  improvement_opportunities: ImprovementOpportunity[];
  raw_ai_response: Record<string, unknown> | null;
  created_at: string;
}

export interface RoomAnalysisInsert {
  project_id: string;
  user_id: string;
  room_summary?: string | null;
  detected_room_type?: string | null;
  detected_existing_items?: DetectedItem[];
  detected_problems?: DetectedProblem[];
  lighting_analysis?: string | null;
  color_analysis?: string | null;
  layout_analysis?: string | null;
  improvement_opportunities?: ImprovementOpportunity[];
  raw_ai_response?: Record<string, unknown> | null;
}
