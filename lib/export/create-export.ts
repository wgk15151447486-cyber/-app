import { createClient } from "@/lib/supabase/server";
import { generateProjectPdf } from "@/lib/pdf/generate-project-pdf";
import { getDesignVariants } from "@/lib/design/get-design-variants";
import { getShoppingItemsForVariant } from "@/lib/shopping/get-shopping-items-for-variant";
import type { Project } from "@/types/project";
import type { Export } from "@/types/export";

export async function createExport(
  project: Project,
  userId: string
): Promise<Export> {
  if (!project.is_paid) {
    throw new Error("Only paid projects can be exported.");
  }

  const supabase = await createClient();

  // Get all variants for this project
  const variants = await getDesignVariants(project.id);

  // Collect shopping items from all variants
  const shoppingItems = (
    await Promise.all(
      variants.map((v) => getShoppingItemsForVariant(v.id))
    )
  ).flat();

  // Generate PDF
  const pdfBuffer = await generateProjectPdf({
    project,
    variants,
    shoppingItems,
  });

  // Insert export record
  const { data: exp, error: insertError } = await supabase
    .from("exports")
    .insert({
      project_id: project.id,
      user_id: userId,
      export_type: "project_pdf",
      status: "processing",
    })
    .select("*")
    .single();

  if (insertError || !exp) {
    throw new Error("Failed to create export record.");
  }

  const storagePath = `users/${userId}/projects/${project.id}/exports/${exp.id}.pdf`;

  // Upload to Storage
  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(storagePath, pdfBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    // Mark as failed
    await supabase
      .from("exports")
      .update({ status: "failed", completed_at: new Date().toISOString() })
      .eq("id", exp.id);
    throw new Error(
      `Failed to upload PDF to storage: ${uploadError.message}`
    );
  }

  const { data: urlData } = supabase.storage
    .from("project-images")
    .getPublicUrl(storagePath);

  const now = new Date().toISOString();

  // Update with success
  const { data: updated, error: updateError } = await supabase
    .from("exports")
    .update({
      file_url: urlData.publicUrl,
      storage_path: storagePath,
      status: "completed",
      completed_at: now,
    })
    .eq("id", exp.id)
    .select("*")
    .single();

  if (updateError || !updated) {
    throw new Error("Failed to update export record.");
  }

  return updated as Export;
}
