"use client";

const SUGGESTIONS = [
  "保留原来的床",
  "换成更便宜的方案",
  "改成奶油风",
  "减少装饰品",
  "增加拍照感",
  "更容易清洁",
  "更适合情侣入住",
  "更适合商务出差",
];

interface Props {
  onSelect: (instruction: string) => void;
  disabled: boolean;
}

export function EditSuggestionButtons({ onSelect, disabled }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Quick Suggestions</p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSelect(suggestion)}
            disabled={disabled}
            className="inline-flex h-8 items-center rounded-full border border-input bg-background px-3 text-xs font-medium transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
