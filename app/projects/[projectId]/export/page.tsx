import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/get-current-user";
import { ExportButton } from "@/components/export/export-button";
import { PdfPreview } from "@/components/export/pdf-preview";
import { Card, CardContent } from "@/components/ui/card";
import { LockKeyhole, FileText } from "lucide-react";
import type { Export } from "@/types/export";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ExportPage({ params }: Props) {
  const { projectId } = await params;
  const user = await requireUser();
  const project = await getProject(projectId);

  // Fetch existing exports
  const supabase = await createClient();
  const { data: exports } = await supabase
    .from("exports")
    .select("*")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Export PDF</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Project: {project.title}
        </p>
        <Link
          href={`/projects/${projectId}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          &larr; Back to project
        </Link>
      </div>

      {!project.is_paid ? (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
            <LockKeyhole className="size-8 text-yellow-600 dark:text-yellow-400" />
            <p className="font-medium text-yellow-800 dark:text-yellow-200">
              Unlock project to export
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              PDF export is available for paid projects only. Unlock this
              project to download your complete furnishing plan.
            </p>
            <Link
              href={`/projects/${projectId}/checkout`}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-yellow-600 px-4 text-sm font-medium text-white transition-colors hover:bg-yellow-700"
            >
              Unlock for $4.99
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <PdfPreview />
          <ExportButton projectId={projectId} />
        </div>
      )}

      {/* Previous exports */}
      {exports && exports.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            Previous Exports
          </h2>
          <div className="space-y-2">
            {(exports as Export[]).map((exp) => (
              <Card key={exp.id}>
                <CardContent className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="size-4 text-muted-foreground" />
                    <span>
                      {new Date(exp.created_at).toLocaleDateString()} —{" "}
                      <span
                        className={
                          exp.status === "completed"
                            ? "text-green-600"
                            : exp.status === "failed"
                              ? "text-destructive"
                              : "text-muted-foreground"
                        }
                      >
                        {exp.status}
                      </span>
                    </span>
                  </div>
                  {exp.file_url && (
                    <a
                      href={exp.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Download
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
