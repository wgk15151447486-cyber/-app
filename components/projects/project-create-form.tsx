"use client";

import { useState } from "react";
import { createProject } from "@/lib/projects/create-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ROOM_TYPES,
  PURPOSES,
  BUDGET_TYPES,
  type RoomType,
  type Purpose,
  type BudgetType,
} from "@/types/project";

const roomTypeLabels: Record<RoomType, string> = {
  bedroom: "Bedroom",
  living_room: "Living Room",
  studio: "Studio",
  entire_home: "Entire Home",
  hotel_room: "Hotel Room",
  other: "Other",
};

const purposeLabels: Record<Purpose, string> = {
  personal_use: "Personal Use",
  long_term_rental: "Long-term Rental",
  short_term_rental: "Short-term Rental",
  hotel_operation: "Hotel Operation",
};

const budgetTypeLabels: Record<BudgetType, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  custom: "Custom",
};

const selectBase =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

export function ProjectCreateForm() {
  const [title, setTitle] = useState("");
  const [roomType, setRoomType] = useState<RoomType>("bedroom");
  const [purpose, setPurpose] = useState<Purpose>("short_term_rental");
  const [budgetType, setBudgetType] = useState<BudgetType>("medium");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [locationCountry, setLocationCountry] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setError(null);

    if (!title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (budgetType === "custom") {
      const min = Number(budgetMin);
      const max = Number(budgetMax);
      if (!budgetMin || !budgetMax || Number.isNaN(min) || Number.isNaN(max)) {
        setError("Please enter both minimum and maximum budget.");
        return;
      }
      if (min >= max) {
        setError("Minimum budget must be less than maximum budget.");
        return;
      }
    }

    setLoading(true);

    createProject({
      title: title.trim(),
      room_type: roomType,
      purpose,
      budget_type: budgetType,
      budget_min: budgetType === "custom" ? Number(budgetMin) : null,
      budget_max: budgetType === "custom" ? Number(budgetMax) : null,
      currency: "USD",
      location_country: locationCountry.trim() || null,
      location_city: locationCity.trim() || null,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Project</CardTitle>
        <CardDescription>
          Tell us about the room you want to furnish and transform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={handleSubmit}
          className="space-y-5"
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              placeholder='e.g. "Guest bedroom makeover"'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <Label htmlFor="room_type">Room Type *</Label>
            <select
              id="room_type"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value as RoomType)}
              className={selectBase}
              required
            >
              {ROOM_TYPES.map((rt) => (
                <option key={rt} value={rt}>
                  {roomTypeLabels[rt]}
                </option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose *</Label>
            <select
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value as Purpose)}
              className={selectBase}
              required
            >
              {PURPOSES.map((p) => (
                <option key={p} value={p}>
                  {purposeLabels[p]}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Type */}
          <div className="space-y-2">
            <Label htmlFor="budget_type">Budget *</Label>
            <select
              id="budget_type"
              value={budgetType}
              onChange={(e) => setBudgetType(e.target.value as BudgetType)}
              className={selectBase}
              required
            >
              {BUDGET_TYPES.map((bt) => (
                <option key={bt} value={bt}>
                  {budgetTypeLabels[bt]}
                </option>
              ))}
            </select>
          </div>

          {/* Custom budget fields */}
          {budgetType === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget_min">Min Budget ($)</Label>
                <Input
                  id="budget_min"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="500"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget_max">Max Budget ($)</Label>
                <Input
                  id="budget_max"
                  type="number"
                  min="0"
                  step="100"
                  placeholder="2000"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location_country">Country</Label>
              <Input
                id="location_country"
                placeholder="United States"
                value={locationCountry}
                onChange={(e) => setLocationCountry(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location_city">City</Label>
              <Input
                id="location_city"
                placeholder="New York"
                value={locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating…" : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
