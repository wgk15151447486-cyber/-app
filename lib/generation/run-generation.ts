import { createClient } from "@/lib/supabase/server";
import { getProject } from "@/lib/projects/get-project";
import { analyzeRoom } from "@/lib/ai/analyze-room";
import { generateDesignVariants } from "@/lib/ai/generate-design-variants";
import { getTextModel, getVisionModel } from "@/lib/ai/client";
import type { SupabaseClient } from "@supabase/supabase-js";

interface RunContext {
  supabase: SupabaseClient;
  projectId: string;
  userId: string;
  jobId: string;
}

export async function runGeneration(ctx: RunContext) {
  const { supabase, projectId, userId, jobId } = ctx;

  // Remove old generation data
  await supabase.from("shopping_items").delete().eq("project_id", projectId);
  await supabase.from("design_variants").delete().eq("project_id", projectId);
  await supabase.from("room_analyses").delete().eq("project_id", projectId);

  // Update job to processing
  await supabase
    .from("generation_jobs")
    .update({ status: "processing", progress: 10, started_at: new Date().toISOString() })
    .eq("id", jobId);

  // Fetch project and requirements
  const project = await getProject(projectId);

  const supabase2 = await createClient();
  const { data: requirements } = await supabase2
    .from("design_requirements")
    .select("*")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .maybeSingle();

  const aiModel = getTextModel();
  const visionModel = getVisionModel();

  // --- Step 1: Room Analysis ---
  await supabase
    .from("generation_jobs")
    .update({ progress: 20 })
    .eq("id", jobId);

  const analysis = await analyzeRoom(project, requirements);

  const { data: analysisRecord } = await supabase
    .from("room_analyses")
    .insert({
      project_id: projectId,
      user_id: userId,
      room_summary: analysis.room_summary,
      detected_room_type: analysis.detected_room_type,
      detected_existing_items: analysis.detected_existing_items,
      detected_problems: analysis.detected_problems,
      lighting_analysis: analysis.lighting_analysis,
      color_analysis: analysis.color_analysis,
      layout_analysis: analysis.layout_analysis,
      improvement_opportunities: analysis.improvement_opportunities,
      raw_ai_response: analysis as unknown as Record<string, unknown>,
    })
    .select("id")
    .single();

  // --- Step 2: Design Variants ---
  await supabase
    .from("generation_jobs")
    .update({ progress: 50 })
    .eq("id", jobId);

  const aiResponse = await generateDesignVariants(project, requirements, analysis);

  const variantIds: string[] = [];
  let totalItems = 0;

  for (const variant of aiResponse.variants) {
    const { data: created } = await supabase
      .from("design_variants")
      .insert({
        project_id: projectId,
        user_id: userId,
        variant_type: variant.variant_type,
        title: variant.title,
        subtitle: variant.subtitle,
        design_summary: variant.design_summary,
        why_it_works: variant.why_it_works || null,
        style_tags: variant.style_tags,
        estimated_budget_min: variant.estimated_budget_min,
        estimated_budget_max: variant.estimated_budget_max,
        currency: variant.currency,
        difficulty_level: variant.difficulty_level,
        maintenance_level: variant.maintenance_level || null,
        best_for: variant.best_for,
        image_url: "https://placehold.co/600x400/1a1a2e/e0e0e0?text=" + encodeURIComponent(variant.title),
        prompt_used: JSON.stringify(variant),
        ai_model: aiModel,
        generation_status: "completed",
        is_locked: true,
      })
      .select("id")
      .single();

    if (!created) continue;
    variantIds.push(created.id);

    // Insert shopping items
    const items = variant.shopping_items.map((item) => ({
      design_variant_id: created.id,
      project_id: projectId,
      user_id: userId,
      category: item.category,
      name: item.name,
      description: item.description || null,
      reason: item.reason || null,
      recommended_size: item.recommended_size || null,
      recommended_color: item.recommended_color || null,
      material: item.material || null,
      quantity: item.quantity,
      price_min: item.price_min,
      price_max: item.price_max,
      currency: variant.currency,
      priority: item.priority,
      is_locked: true,
    }));

    if (items.length > 0) {
      await supabase.from("shopping_items").insert(items);
      totalItems += items.length;
    }
  }

  // --- Step 3: Mark complete ---
  await supabase
    .from("projects")
    .update({ status: "completed", updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .eq("user_id", userId);

  await supabase
    .from("generation_jobs")
    .update({
      status: "completed",
      progress: 100,
      completed_at: new Date().toISOString(),
      output_payload: {
        room_analysis_id: analysisRecord?.id,
        variant_count: variantIds.length,
        variant_ids: variantIds,
        total_shopping_items: totalItems,
        ai_model: aiModel,
        vision_model: visionModel,
      },
    })
    .eq("id", jobId);

  return { variantIds, analysisId: analysisRecord?.id };
}
