"use client";

import { useState } from "react";
import { c } from "../theme";
import { faqList } from "../data";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="py-16 md:py-28" style={{ background: c.mist2 }}>
      <div className="max-w-[800px] mx-auto px-7">
        <div className="text-center mb-10">
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(27px,3.4vw,42px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Hỏi nhanh, đáp thẳng.
          </h2>
        </div>
        <div>
          {faqList.map((f, i) => (
            <div key={i} className="border-t" style={{ borderColor: c.line }}>
              <button
                className="w-full text-left py-6 flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span
                  className="text-xl font-semibold"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: c.ink,
                  }}
                >
                  {f.question}
                </span>
                <span
                  className="text-[22px] font-light flex-shrink-0 transition-transform duration-500"
                  style={{ color: c.greenSoft, transform: openIdx === i ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-500"
                style={{ maxHeight: openIdx === i ? 300 : 0 }}
              >
                <p className="pb-6 text-[15.5px]" style={{ color: c.inkSoft }}>
                  {f.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
