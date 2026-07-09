"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Trần Mỹ Trinh",
    role: "Agent ERA Vietnam",
    color: "#38BDF8",
    quote:
      "Tiêu chuẩn đào tạo quốc tế của ERA Academy chính là chìa khóa giúp tôi nâng cấp bản thân. Tôi học được cách xây dựng hình ảnh cá nhân chuyên nghiệp, tác phong chuẩn mực để tự tin làm việc với các nhà đầu tư lớn và khách hàng nước ngoài.",
  },
  {
    name: "Phạm Thùy Dương",
    role: "Agent ERA Vietnam",
    color: "#F97316",
    quote:
      "Điều tôi thích nhất ở ERA Academy là sự thực chiến. Các giảng viên không chỉ dạy lý thuyết suông mà còn cho chúng tôi đóng vai roleplay, xử lý các tình huống thực tế khó nhằn.",
  },
  {
    name: "Trần Mỹ Trinh",
    role: "Agent ERA Vietnam",
    color: colors.primary.DEFAULT,
    quote:
      "Ở ERA Academy, bạn không bao giờ bị bỏ lại phía trước. Hệ thống mentor, coach hướng dẫn theo sát từng bước giúp những người mới như tôi định hình được phong cách bán hàng riêng và xây dựng tệp khách hàng từ con số 0.",
  },
];

export function AcademyTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    touchStartXRef.current = null;
  };

  return (
    <Section padding="md" bg="gray">
      <h2 className="mb-10 text-center text-3xl font-black leading-tight md:text-4xl" style={{ color: colors.primary.navy.DEFAULT }}>
        <span className="block md:inline">AGENT NÓI GÌ VỀ</span>
        <span className="block md:inline md:ml-2" style={{ color: colors.primary.DEFAULT }}>
          "ERA ACADEMY"
        </span>
      </h2>

      <div className="relative mx-auto max-w-6xl md:px-12">
        <div
          className="mx-auto max-w-[300px] overflow-hidden sm:max-w-sm md:max-w-4xl md:overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex items-stretch transition-transform duration-500 ease-out md:grid md:grid-cols-3 md:gap-8 md:[transform:none!important]"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
          {testimonials.map((item, index) => (
            <article key={`${item.name}-${index}`} className="flex min-w-full px-3 py-6 md:min-w-0 md:px-0 md:py-0">
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:scale-[1.02]">
                <span className="absolute right-0 top-0 h-9 w-9 rounded-bl-xl" style={{ backgroundColor: item.color }} />
                <div className="mx-auto h-[120px] w-[120px] overflow-hidden rounded-full shadow-lg">
                  <Image
                    src="/academy/360e4806bcd6e858d5cafd68d9a2293177ad649b.webp"
                    alt={item.name}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-bold" style={{ color: colors.primary.navy.DEFAULT }}>{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.role}</p>
                  <div className="mt-2 flex justify-center gap-0.5 text-[#F97316]">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-gray-600">"{item.quote}"</p>
              </div>
            </article>
          ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 md:hidden">
          {testimonials.map((item, index) => (
            <button
              type="button"
              key={`${item.name}-${index}-dot`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-7 bg-[#D4112D]" : "w-2.5 bg-gray-300"
              }`}
              aria-label={`Xem đánh giá ${index + 1}`}
            />
          ))}
        </div>

        <button className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#D4112D] shadow md:flex">
          <ChevronLeft size={18} />
        </button>
        <button className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#D4112D] shadow md:flex">
          <ChevronRight size={18} />
        </button>
      </div>
    </Section>
  );
}
