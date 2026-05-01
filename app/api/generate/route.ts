import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProject } from "@/lib/projects/get-project";
import { runGeneration } from "@/lib/generation/run-generation";
import { createRateLimiter } from "@/lib/security/rate-limit";
import { createLogger } from "@/lib/logging/logger";

const logger = createLogger("api:generate");
const rateLimit = createRateLimiter(60 * 60 * 1000, 10); // 10 per hour

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rl = rateLimit(user.id);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429 }
    );
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
      status: "queued",
      progress: 0,
      input_payload: { mock: false },
    })
    .select("id")
    .single();

  if (jobError || !job) {
    return NextResponse.json(
      { error: "Failed to create generation job" },
      { status: 500 }
    );
  }

  // Run real AI generation
  try {
    const result = await runGeneration({
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
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error";

    logger.error("AI generation failed", {
      userId: user.id,
      projectId,
      jobId: job.id,
      error: errorMessage,
    });

    // Mark job as failed
    await supabase
      .from("generation_jobs")
      .update({
        status: "failed",
        error_message: errorMessage,
        completed_at: new Date().toISOString(),
      })
      .eq("id", job.id);

    // Mark project as failed
    await supabase
      .from("projects")
      .update({
        status: "failed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .eq("user_id", user.id);

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
