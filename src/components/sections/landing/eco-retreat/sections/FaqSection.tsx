"use client";

import { c, fonts } from "../theme";
import { faqItems } from "../data";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="reveal max-w-[900px] mx-auto px-5 md:px-6 py-[88px]"
    >
      <div className="text-center mb-9 md:mb-10">
        <span
          className="inline-block mb-0.5"
          style={{
            color: c.red,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: "clamp(24px,2.5vw,34px)",
            lineHeight: 1.05,
          }}
        >
          Câu hỏi thường gặp
        </span>
        <h2
          className="font-black leading-[1.06] tracking-tight mt-3.5"
          style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
        >
          Câu hỏi thường gặp về Rừng Phượng
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {faqItems.map((item) => (
          <details
            key={item.question}
            className="border rounded-[14px] overflow-hidden bg-white group"
            style={{ borderColor: c.line }}
          >
            <summary
              className="cursor-pointer px-5 py-4 font-bold text-base list-none flex items-center justify-between"
              style={{ color: c.green }}
            >
              {item.question}
              <span className="text-xl transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div
              className="px-5 pb-5 text-[15px] leading-relaxed"
              style={{ color: c.text }}
            >
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
