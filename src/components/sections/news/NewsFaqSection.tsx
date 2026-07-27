"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { colors } from "@/lib/theme";
import { RichTextContent } from "@/components/shared/RichTextContent";
import type { NewsFaqInput } from "@/types/api";

interface NewsFaqSectionProps {
  items: NewsFaqInput[];
}

function trimTrailingEmptyParagraphs(html: string) {
  return html.replace(/(?:<p>(?:\s|&nbsp;|&#160;|<br\s*\/?>)*<\/p>\s*)+$/gi, "");
}

export function NewsFaqSection({ items }: NewsFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <h2
        className="mb-4"
        style={{
          color: colors.neutral.foreground,
          fontWeight: 700,
          fontSize: "22px",
          lineHeight: 1.35,
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
                  className="font-semibold"
                  style={{
                    color: colors.primary.navy.DEFAULT,
                    fontSize: "16px",
                    lineHeight: 1.5,
                  }}
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
                <RichTextContent
                  html={trimTrailingEmptyParagraphs(item.answer)}
                  className="ck-content faq-richtext-content faq-answer-content px-5 pb-3"
                  style={{ color: colors.gray[600] }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
