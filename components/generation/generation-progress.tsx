"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GenerationJob } from "@/types/generation";

interface Props {
  projectId: string;
  job: GenerationJob | null;
}

export function GenerationProgress({ projectId, job: initialJob }: Props) {
  const router = useRouter();
  const [job] = useState<GenerationJob | null>(initialJob);
  const [countdown, setCountdown] = useState(3);

  // Auto-redirect when job is completed
  useEffect(() => {
    if (!job || job.status !== "completed") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(`/projects/${projectId}/variants`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [job, projectId, router]);

  // No job yet — user navigated here without clicking generate
  if (!job) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:py-32">
        <Loader2 className="mx-auto size-8 animate-spin text-muted-foreground" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          No Generation in Progress
        </h1>
        <p className="mt-2 text-muted-foreground">
          Click the generate button from the design requirements page to start.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() =>
            router.push(`/projects/${projectId}/requirements`)
          }
        >
          &larr; Back to Requirements
        </Button>
      </div>
    );
  }

  // Failed
  if (job.status === "failed") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:py-32">
        <XCircle className="mx-auto size-8 text-destructive" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Generation Failed
        </h1>
        <p className="mt-2 text-muted-foreground">
          {job.error_message ?? "An unexpected error occurred during generation."}
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() =>
            router.push(`/projects/${projectId}/requirements`)
          }
        >
          &larr; Back to Requirements
        </Button>
      </div>
    );
  }

  // Processing or queued
  if (job.status === "processing" || job.status === "queued") {
    const progress = job.progress ?? 0;
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:py-32">
        <Loader2 className="mx-auto size-8 animate-spin text-primary" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Generating Design Variants
        </h1>
        <p className="mt-2 text-muted-foreground">
          Our AI is analyzing your room and creating design options…
        </p>
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${Math.max(progress, 10)}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{progress}%</p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() =>
            router.push(`/projects/${projectId}/requirements`)
          }
        >
          &larr; Back to Requirements
        </Button>
      </div>
    );
  }

  // Completed
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:py-32">
      <CheckCircle2 className="mx-auto size-8 text-green-500" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        Generation Complete
      </h1>
      <p className="mt-2 text-muted-foreground">
        Your 4 design variants are ready. Redirecting in {countdown}…
      </p>
      <Button
        className="mt-6"
        onClick={() => router.push(`/projects/${projectId}/variants`)}
      >
        View Design Variants
      </Button>
    </div>
  );
}
