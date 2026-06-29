"use client";

import { useState, useRef, useEffect, useId } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
  emptyClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
  error?: boolean;
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder = "Chọn...",
  className = "",
  buttonClassName = "",
  buttonStyle,
  emptyClassName = "",
  iconClassName = "text-gray-400",
  disabled,
  error,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);
  const isEmpty = !selectedOption;
  const selectedLabel = selectedOption?.label ?? placeholder;

  const baseButtonClass =
    "w-full flex items-center justify-between rounded-lg border bg-white px-4 py-2.5 pr-9 text-sm text-left outline-none transition-colors";
  const stateClass = error
    ? "border-red-300 bg-red-50/30 text-gray-800 focus:border-red-400"
    : "border-gray-200 text-gray-800 focus:border-gray-400";
  const disabledClass = disabled ? "cursor-not-allowed bg-gray-50 text-gray-400" : "";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        className={`${baseButtonClass} ${stateClass} ${disabledClass} ${buttonClassName}`}
        style={buttonStyle}
      >
        <span className={`truncate ${isEmpty ? emptyClassName : ""}`}>{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform ${iconClassName} ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && !disabled && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
          {value !== "" && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-50"
            >
              {placeholder}
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                value === opt.value
                  ? "bg-gray-50 font-medium text-gray-900"
                  : "text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
