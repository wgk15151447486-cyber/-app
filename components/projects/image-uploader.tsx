"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadProjectImage } from "@/lib/storage/upload-project-image";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, MAX_IMAGES_PER_PROJECT } from "@/types/image";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import type { ProjectImage } from "@/types/image";

interface Props {
  projectId: string;
  userId: string;
  existingCount: number;
  onUploaded: (image: ProjectImage) => void;
}

export function ImageUploader({ projectId, userId, existingCount, onUploaded }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const remaining = MAX_IMAGES_PER_PROJECT - existingCount;

  const handleSelect = useCallback(
    (selected: FileList | null) => {
      setError(null);
      if (!selected || selected.length === 0) return;

      const fileArr = Array.from(selected);

      // Validate count
      if (fileArr.length + existingCount + files.length > MAX_IMAGES_PER_PROJECT) {
        setError(`You can only upload up to ${MAX_IMAGES_PER_PROJECT} images total.`);
        return;
      }

      // Validate types and sizes
      for (const f of fileArr) {
        if (!ALLOWED_MIME_TYPES.includes(f.type as (typeof ALLOWED_MIME_TYPES)[number])) {
          setError(`"${f.name}" is not a supported format (JPEG, PNG, WebP only).`);
          return;
        }
        if (f.size > MAX_FILE_SIZE) {
          setError(`"${f.name}" exceeds the 10 MB limit.`);
          return;
        }
      }

      const newPreviews = fileArr.map((f) => URL.createObjectURL(f));
      setFiles((prev) => [...prev, ...fileArr]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
    [existingCount, files.length]
  );

  function removeFile(index: number) {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleUpload() {
    if (files.length === 0) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop() ?? "jpg";
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const storagePath = `users/${userId}/projects/${projectId}/room-images/${fileName}`;

      // Upload directly to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(storagePath, file, { upsert: false });

      if (uploadError) {
        setError(`Failed to upload "${file.name}": ${uploadError.message}`);
        continue;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(storagePath);

      const imageUrl = urlData.publicUrl;

      // Insert DB record via server action
      try {
        const record = await uploadProjectImage({
          projectId,
          storagePath,
          imageUrl,
          mimeType: file.type,
          fileSize: file.size,
        });
        onUploaded(record);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Failed to save image record."
        );
        // Clean up the uploaded file
        await supabase.storage.from("project-images").remove([storagePath]);
      }
    }

    setFiles([]);
    setPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p));
      return [];
    });
    setUploading(false);
  }

  const canSelect = remaining > 0 && files.length < remaining;

  return (
    <div className="space-y-4">
      {/* Drop zone / file input */}
      {canSelect && (
        <div
          className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 transition-colors hover:border-primary/50"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleSelect(e.dataTransfer.files);
          }}
        >
          <Upload className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag & drop or click to select images
          </p>
          <p className="text-xs text-muted-foreground">
            JPEG, PNG, WebP &middot; Max 10 MB each &middot; {remaining} slot
            {remaining !== 1 ? "s" : ""} remaining
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => handleSelect(e.target.files)}
          />
        </div>
      )}

      {/* Preview strip */}
      {previews.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            {previews.map((src, i) => (
              <div key={i} className="relative size-20 overflow-hidden rounded-lg border">
                <img
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  className="absolute right-0.5 top-0.5 rounded-full bg-background/80 p-0.5 hover:bg-background"
                  onClick={() => removeFile(i)}
                  disabled={uploading}
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Uploading…
              </>
            ) : (
              `Upload ${files.length} image${files.length !== 1 ? "s" : ""}`
            )}
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
