import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getDesignVariant } from "@/lib/design/get-design-variant";
import { getProject } from "@/lib/projects/get-project";
import { getEditCount } from "@/lib/edit/get-edit-requests";
import {
  mockEditSummary,
  buildMockPrompt,
} from "@/lib/edit/mock-edit-variant";

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

  // Build mock prompt
  const promptUsed = buildMockPrompt(
    variant.design_summary ?? "",
    instruction.trim()
  );

  // Create edit_request
  const { data: editRequest, error: insertError } = await supabase
    .from("edit_requests")
    .insert({
      project_id: variant.project_id,
      design_variant_id: variantId,
      user_id: user.id,
      instruction: instruction.trim(),
      prompt_used: promptUsed,
      ai_model: "mock",
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

  // Generate mock edited summary
  const updatedSummary = mockEditSummary(
    variant.design_summary ?? "",
    instruction.trim()
  );

  // Update variant design_summary
  await supabase
    .from("design_variants")
    .update({
      design_summary: updatedSummary,
      updated_at: new Date().toISOString(),
    })
    .eq("id", variantId)
    .eq("user_id", user.id);

  // Mark edit_request as completed
  await supabase
    .from("edit_requests")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", editRequest.id);

  return NextResponse.json({
    success: true,
    editRequestId: editRequest.id,
    updatedSummary,
    remainingEdits: maxEdits - (editCount + 1),
  });
}
