import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getDesignVariant } from "@/lib/design/get-design-variant";
import { getProject } from "@/lib/projects/get-project";
import { getEditCount } from "@/lib/edit/get-edit-requests";
import { editDesignVariant } from "@/lib/ai/edit-design-variant";

const MAX_FREE_EDITS = 1;
const MAX_PAID_EDITS = 5;

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { variantId?: string; instruction?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { variantId, instruction } = body;
  if (!variantId || typeof variantId !== "string") {
    return NextResponse.json(
      { error: "variantId is required" },
      { status: 400 }
    );
  }
  if (!instruction || typeof instruction !== "string" || !instruction.trim()) {
    return NextResponse.json(
      { error: "instruction is required" },
      { status: 400 }
    );
  }

  // Verify variant ownership
  let variant;
  try {
    variant = await getDesignVariant(variantId);
  } catch {
    return NextResponse.json(
      { error: "Variant not found" },
      { status: 404 }
    );
  }

  // Get project for is_paid check
  const project = await getProject(variant.project_id);

  // Check edit limits
  const editCount = await getEditCount(variantId);
  const maxEdits = project.is_paid ? MAX_PAID_EDITS : MAX_FREE_EDITS;

  if (editCount >= maxEdits) {
    return NextResponse.json(
      {
        error: `Edit limit reached. You have used ${editCount} of ${maxEdits} allowed edits.`,
      },
      { status: 403 }
    );
  }

  // Create edit_request as processing
  const { data: editRequest, error: insertError } = await supabase
    .from("edit_requests")
    .insert({
      project_id: variant.project_id,
      design_variant_id: variantId,
      user_id: user.id,
      instruction: instruction.trim(),
      status: "processing",
    })
    .select("id")
    .single();

  if (insertError || !editRequest) {
    return NextResponse.json(
      { error: "Failed to create edit request" },
      { status: 500 }
    );
  }

  // Call real AI
  try {
    const result = await editDesignVariant({
      variant,
      project: { room_type: project.room_type },
      instruction: instruction.trim(),
    });

    // Update edit_request with results — non-destructive, variant is untouched
    await supabase
      .from("edit_requests")
      .update({
        updated_design_summary: result.updatedDesignSummary,
        image_edit_instruction: result.imageEditInstruction,
        prompt_used: result.promptUsed,
        ai_model: result.aiModel,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", editRequest.id);

    return NextResponse.json({
      success: true,
      editRequestId: editRequest.id,
      updatedSummary: result.updatedDesignSummary,
      imageEditInstruction: result.imageEditInstruction,
      remainingEdits: maxEdits - (editCount + 1),
    });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error";

    // Mark edit_request as failed — variant is untouched
    await supabase
      .from("edit_requests")
      .update({
        status: "failed",
        prompt_used: errorMessage,
        completed_at: new Date().toISOString(),
      })
      .eq("id", editRequest.id);

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
