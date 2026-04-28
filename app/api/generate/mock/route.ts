import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProject } from "@/lib/projects/get-project";
import { mockGenerateDesigns } from "@/lib/generation/mock-generate-designs";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { projectId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { projectId } = body;
  if (!projectId || typeof projectId !== "string") {
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 }
    );
  }

  // Verify project exists and is owned by this user
  try {
    await getProject(projectId);
  } catch {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  // Create the generation job
  const { data: job, error: jobError } = await supabase
    .from("generation_jobs")
    .insert({
      project_id: projectId,
      user_id: user.id,
      job_type: "design_variant",
      status: "processing",
      progress: 0,
      input_payload: { mock: true },
    })
    .select("id")
    .single();

  if (jobError || !job) {
    return NextResponse.json(
      { error: "Failed to create generation job" },
      { status: 500 }
    );
  }

  // Run mock generation
  try {
    const result = await mockGenerateDesigns({
      supabase,
      projectId,
      userId: user.id,
      jobId: job.id,
    });

    return NextResponse.json({
      success: true,
      jobId: job.id,
      ...result,
    });
  } catch (e) {
    // Mark job as failed
    await supabase
      .from("generation_jobs")
      .update({
        status: "failed",
        error_message: e instanceof Error ? e.message : "Unknown error",
        completed_at: new Date().toISOString(),
      })
      .eq("id", job.id);

    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
