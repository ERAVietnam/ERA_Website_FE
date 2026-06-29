"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { colors } from "@/lib/theme";
import type { ProjectFaqInput } from "@/types/api";

interface ProjectsFaqSectionProps {
  items: ProjectFaqInput[];
}

export function ProjectsFaqSection({ items }: ProjectsFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <h2
        className="mb-4"
        style={{
          color: colors.neutral.foreground,
          fontWeight: 800,
          fontSize: "18px",
        }}
      >
        Câu hỏi thường gặp
      </h2>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={`${item.question}-${index}`} className="border-b border-gray-100 last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50"
                aria-expanded={isOpen}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: colors.primary.navy.DEFAULT }}
                >
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  style={{ color: colors.primary.DEFAULT }}
                />
              </button>

              {isOpen && (
                <div
                  className="ck-content px-5 pb-4 text-sm leading-7"
                  style={{ color: colors.gray[600] }}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
