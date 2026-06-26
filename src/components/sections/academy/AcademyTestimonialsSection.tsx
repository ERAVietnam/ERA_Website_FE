"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { colors, withOpacity } from "@/lib/theme";

const testimonials = [
  {
    id: 1,
    quote: "Những khóa học tại ERA Academy thực sự đã thay đổi hoàn toàn cách tôi làm việc. Từ một ngườI mới vào nghề, tôi đã tự tin hơn trong việc tư vấn và chốt những giao dịch triệu đô.",
    name: "Nguyễn Phương Linh",
    role: "Elite Agent - ERA Vietnam",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: 2,
    quote: "Lộ trình Pro Coaching là bước ngoặt lớn nhất sự nghiệp của tôi. Sự dẫn dắt tận tâm từ các Trainer giúp tôi nắm vững kiến thức thực tế chỉ sau 3 tháng.",
    name: "Lê Minh Hoàng",
    role: "Senior Consultant - ERA Vietnam",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
  },
];

export function AcademyTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const visible = testimonials.slice(activeIndex, activeIndex + 2);
  const display =
    visible.length < 2
      ? [...visible, ...testimonials.slice(0, 2 - visible.length)]
      : visible;

  return (
    <Section padding="md" bg="gray">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2
          style={{
            color: colors.primary.navy.DEFAULT,
            fontWeight: 800,
            fontSize: 'clamp(24px, 3vw, 32px)',
            lineHeight: 1.2,
          }}
        >
          Học viên nói gì về ERA Academy
        </h2>

        <div className="flex gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-white"
            style={{ borderColor: colors.border.dark }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-white"
            style={{ borderColor: colors.border.dark }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {display.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl p-6 md:p-8 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            style={{ backgroundColor: colors.primary.navy.DEFAULT }}
          >
            {/* Quote mark */}
            <div
              className="mb-4 text-4xl leading-none"
              style={{ color: colors.tertiary.orange.DEFAULT, fontWeight: 900 }}
            >
              &quot;
            </div>

            {/* Quote text */}
            <p
              className="mb-6 italic"
              style={{
                color: withOpacity(colors.neutral.white, 0.9),
                fontSize: '14px',
                lineHeight: 1.7,
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-auto">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                  loading="lazy"
                />
              </div>
              <div>
                <p
                  style={{
                    color: colors.neutral.white,
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    color: withOpacity(colors.neutral.white, 0.7),
                    fontSize: '13px',
                  }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
