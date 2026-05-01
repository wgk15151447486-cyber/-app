"use client";

import { useState } from "react";
import type { Export } from "@/types/export";

interface Props {
  projectId: string;
}

export function ExportButton({ projectId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Export | null>(null);

  async function handleExport() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Export failed");
        return;
      }

      setResult(data.export);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {!result ? (
        <button
          type="button"
          onClick={handleExport}
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Generating PDF..." : "Export PDF"}
        </button>
      ) : (
        <a
          href={result.file_url!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-green-600 px-6 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          Download PDF
        </a>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
