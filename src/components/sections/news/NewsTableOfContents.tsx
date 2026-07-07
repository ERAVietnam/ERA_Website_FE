"use client";

import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import type { TocHeading } from "@/lib/toc";

interface NewsTableOfContentsProps {
  headings: TocHeading[];
}

export function NewsTableOfContents({ headings }: NewsTableOfContentsProps) {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 bg-gray-50 px-4 py-2.5 text-left text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
      >
        <Menu size={16} className="shrink-0" />
        Mục lục
        <ChevronDown
          size={16}
          className={`ml-auto shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-gray-200 bg-white max-h-64 overflow-y-auto">
          {headings.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => scrollTo(h.id)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
              style={{ paddingLeft: `${12 + (h.level - 1) * 16}px` }}
            >
              {h.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
