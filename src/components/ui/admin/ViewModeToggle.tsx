import { LayoutGrid, Table as TableIcon } from "lucide-react";

interface ViewModeToggleProps {
  value: "table" | "card";
  onChange: (value: "table" | "card") => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => onChange("table")}
        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
          value === "table"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
        title="Dạng bảng"
      >
        <TableIcon size={16} />
        <span className="hidden sm:inline">Bảng</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("card")}
        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
          value === "card"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
        title="Dạng thẻ"
      >
        <LayoutGrid size={16} />
        <span className="hidden sm:inline">Thẻ</span>
      </button>
    </div>
  );
}
