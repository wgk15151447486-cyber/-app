"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { deleteProjectImage } from "@/lib/storage/delete-project-image";
import { setPrimaryImage } from "@/lib/storage/set-primary-image";
import { Star, Trash2, Loader2 } from "lucide-react";
import type { ProjectImage } from "@/types/image";

interface Props {
  images: ProjectImage[];
  projectId: string;
}

export function UploadedImageGrid({ images, projectId }: Props) {
  const [localImages, setLocalImages] = useState<ProjectImage[]>(images);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [settingPrimaryId, setSettingPrimaryId] = useState<string | null>(null);

  async function handleDelete(image: ProjectImage) {
    setDeletingId(image.id);
    try {
      await deleteProjectImage({
        projectId,
        imageId: image.id,
        storagePath: image.storage_path,
      });
      setLocalImages((prev) => {
        const next = prev.filter((img) => img.id !== image.id);
        // If the deleted image was primary and others remain, the first remaining becomes primary
        if (image.is_primary && next.length > 0) {
          return next.map((img, i) =>
            i === 0 ? { ...img, is_primary: true } : img
          );
        }
        return next;
      });
    } catch {
      // silently fail — the UI is optimistic
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSetPrimary(image: ProjectImage) {
    if (image.is_primary) return;
    setSettingPrimaryId(image.id);
    try {
      await setPrimaryImage({ projectId, imageId: image.id });
      setLocalImages((prev) =>
        prev.map((img) => ({
          ...img,
          is_primary: img.id === image.id,
        }))
      );
    } catch {
      // silently fail
    } finally {
      setSettingPrimaryId(null);
    }
  }

  if (localImages.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">No images uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {localImages.map((image) => (
        <div
          key={image.id}
          className={`group relative overflow-hidden rounded-xl border-2 ${
            image.is_primary ? "border-primary" : "border-transparent"
          }`}
        >
          <img
            src={image.image_url}
            alt="Uploaded room photo"
            className="aspect-[4/3] w-full object-cover"
          />

          {/* Primary badge */}
          {image.is_primary && (
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              <Star className="size-3 fill-current" />
              Primary
            </span>
          )}

          {/* Actions overlay */}
          <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
            {!image.is_primary && (
              <button
                type="button"
                className="flex-1 rounded bg-white/90 px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-white"
                onClick={() => handleSetPrimary(image)}
                disabled={settingPrimaryId === image.id}
              >
                {settingPrimaryId === image.id ? (
                  <Loader2 className="mx-auto size-3 animate-spin" />
                ) : (
                  "Set as primary"
                )}
              </button>
            )}
            <button
              type="button"
              className="flex items-center justify-center rounded bg-destructive/90 px-2 py-1 text-xs font-medium text-destructive-foreground transition-colors hover:bg-destructive"
              onClick={() => handleDelete(image)}
              disabled={deletingId === image.id}
            >
              {deletingId === image.id ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <Trash2 className="size-3" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
