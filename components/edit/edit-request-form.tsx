"use client";

import { useState } from "react";
import { EditSuggestionButtons } from "@/components/edit/edit-suggestion-buttons";

interface Props {
  variantId: string;
  remainingEdits: number;
}

export function EditRequestForm({
  variantId,
  remainingEdits,
}: Props) {
  const [instruction, setInstruction] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [imageEditInstruction, setImageEditInstruction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    instruction.trim().length > 0 && remainingEdits > 0 && !isSubmitting;

  async function handleSubmit() {
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError(null);
    setResult(null);
    setImageEditInstruction(null);

    try {
      const res = await fetch("/api/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, instruction: instruction.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Edit request failed. Please try again.");
        return;
      }

      setResult(data.updatedSummary ?? null);
      setImageEditInstruction(data.imageEditInstruction ?? null);
      setInstruction("");
    } catch {
      setError("Edit request failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick suggestions */}
      {remainingEdits > 0 && (
        <EditSuggestionButtons
          onSelect={setInstruction}
          disabled={isSubmitting}
        />
      )}

      {/* Textarea */}
      <div className="space-y-2">
        <label
          htmlFor="edit-instruction"
          className="text-sm font-medium"
        >
          Your Edit Request
        </label>
        <textarea
          id="edit-instruction"
          className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          placeholder={
            remainingEdits > 0
              ? "Describe how you want to modify this design… e.g. \"Make it more colorful\""
              : "You have reached the edit limit for this variant."
          }
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          disabled={remainingEdits === 0 || isSubmitting}
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {instruction.length} characters
          </span>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting…" : "Submit Edit Request"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Result: updated summary */}
      {result && (
        <div className="space-y-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
            <p className="mb-2 text-sm font-medium text-green-800 dark:text-green-200">
              Updated Design Summary
            </p>
            <p className="text-sm leading-relaxed text-green-700 dark:text-green-300">
              {result}
            </p>
          </div>
          {imageEditInstruction && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
              <p className="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
                Image Edit Instruction
              </p>
              <p className="text-sm leading-relaxed text-blue-700 dark:text-blue-300">
                {imageEditInstruction}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
