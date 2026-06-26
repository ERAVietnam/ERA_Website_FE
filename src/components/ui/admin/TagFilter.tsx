"use client";

import { colors } from "@/lib/theme";

interface TagFilterProps {
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export function TagFilter({
  options,
  selected,
  onChange,
  placeholder = "Chọn tags...",
}: TagFilterProps) {
  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  if (options.length === 0) return null;

  return (
    <div className="w-full">
      {placeholder && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {placeholder}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((tag) => {
          const isSelected = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                isSelected
                  ? "text-white border-transparent"
                  : "text-gray-600 border-gray-200 hover:border-gray-400 bg-white"
              }`}
              style={
                isSelected
                  ? { backgroundColor: colors.primary.DEFAULT }
                  : undefined
              }
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
