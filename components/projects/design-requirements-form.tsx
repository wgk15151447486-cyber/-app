"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertRequirements } from "@/lib/requirements/upsert-requirements";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChipSelector } from "@/components/projects/chip-selector";
import { TagInput } from "@/components/projects/tag-input";
import {
  STYLE_OPTIONS,
  GOAL_OPTIONS,
  CONSTRAINT_OPTIONS,
  PERMISSION_TOGGLES,
} from "@/types/requirements";
import type { DesignRequirements } from "@/types/requirements";

interface Props {
  projectId: string;
  existing: DesignRequirements | null;
}

export function DesignRequirementsForm({ projectId, existing }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const [preferredStyles, setPreferredStyles] = useState<string[]>(
    existing?.preferred_styles ?? []
  );
  const [targetGoals, setTargetGoals] = useState<string[]>(
    existing?.target_goals ?? []
  );
  const [constraints, setConstraints] = useState<string[]>(
    existing?.constraints ?? []
  );
  const [keepItems, setKeepItems] = useState<string[]>(
    existing?.keep_items ?? []
  );
  const [avoidItems, setAvoidItems] = useState<string[]>(
    existing?.avoid_items ?? []
  );
  const [freeText, setFreeText] = useState(existing?.free_text ?? "");

  const [allowWallPaint, setAllowWallPaint] = useState(
    existing?.allow_wall_paint ?? false
  );
  const [allowDrilling, setAllowDrilling] = useState(
    existing?.allow_drilling ?? false
  );
  const [allowFloorChange, setAllowFloorChange] = useState(
    existing?.allow_floor_change ?? false
  );
  const [petFriendly, setPetFriendly] = useState(
    existing?.pet_friendly ?? false
  );
  const [childFriendly, setChildFriendly] = useState(
    existing?.child_friendly ?? false
  );
  const [easyToClean, setEasyToClean] = useState(
    existing?.easy_to_clean ?? false
  );

  const toggleMap: Record<string, [boolean, (v: boolean) => void]> = {
    allow_wall_paint: [allowWallPaint, setAllowWallPaint],
    allow_drilling: [allowDrilling, setAllowDrilling],
    allow_floor_change: [allowFloorChange, setAllowFloorChange],
    pet_friendly: [petFriendly, setPetFriendly],
    child_friendly: [childFriendly, setChildFriendly],
    easy_to_clean: [easyToClean, setEasyToClean],
  };

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      try {
        await upsertRequirements({
          projectId,
          preferredStyles,
          targetGoals,
          constraints,
          keepItems,
          avoidItems,
          freeText: freeText.trim() || null,
          allowWallPaint,
          allowDrilling,
          allowFloorChange,
          petFriendly,
          childFriendly,
          easyToClean,
        });
        setSaved(true);
        router.refresh();
      } catch {
        // error handled by error boundary
      }
    });
  }

  return (
    <div className="space-y-8">
      {/* Preferred Styles */}
      <div className="space-y-2">
        <Label>Preferred Styles</Label>
        <ChipSelector
          options={STYLE_OPTIONS}
          selected={preferredStyles}
          onChange={setPreferredStyles}
        />
      </div>

      {/* Target Goals */}
      <div className="space-y-2">
        <Label>Target Goals</Label>
        <ChipSelector
          options={GOAL_OPTIONS}
          selected={targetGoals}
          onChange={setTargetGoals}
        />
      </div>

      {/* Constraints */}
      <div className="space-y-2">
        <Label>Constraints</Label>
        <ChipSelector
          options={CONSTRAINT_OPTIONS}
          selected={constraints}
          onChange={setConstraints}
        />
      </div>

      {/* Keep Items */}
      <div className="space-y-2">
        <Label>Items to Keep</Label>
        <TagInput
          value={keepItems}
          onChange={setKeepItems}
          placeholder="Add furniture to keep…"
        />
      </div>

      {/* Avoid Items */}
      <div className="space-y-2">
        <Label>Items to Avoid</Label>
        <TagInput
          value={avoidItems}
          onChange={setAvoidItems}
          placeholder="Add items to avoid…"
        />
      </div>

      {/* Free Text */}
      <div className="space-y-2">
        <Label htmlFor="free-text">Additional Notes</Label>
        <textarea
          id="free-text"
          className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          placeholder="Any other preferences or notes about the room…"
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
        />
      </div>

      {/* Permission Toggles */}
      <div className="space-y-3">
        <Label>Permissions</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PERMISSION_TOGGLES.map(({ key, label }) => {
            const [checked, setChecked] = toggleMap[key];
            return (
              <label
                key={key}
                className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50 has-checked:border-primary/50 has-checked:bg-primary/5"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="size-4 accent-primary"
                />
                {label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          type="button"
          className="w-full"
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending ? "Saving…" : saved ? "Saved ✓" : "Save Requirements"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => router.push(`/projects/${projectId}/generating`)}
        >
          Generate design variants &rarr;
        </Button>
      </div>
    </div>
  );
}
