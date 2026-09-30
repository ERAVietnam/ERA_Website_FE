"use client";

import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { rc } from "./palette";

const STATS = [
  { value: "1971", label: "Thương hiệu ERA Real Estate ra đờI tại Mỹ" },
  { value: "39", label: "Có mặt tại hơn 39 Quốc gia và vùng lãnh thổ" },
  { value: "2.700+", label: "Số lượng Agent - Chuyên viên tư vấn tại ERA Vietnam" },
  { value: "APAC", label: "Cổ đông lớn APAC Realty (Singapore)" },
  { value: "2026", label: "Best Global Real Estate Consultancies – Dot Property" },
  { value: "3 THÀNH PHỐ", label: "Có văn phòng tại TP.HCM, Hà Nội, Đà Nẵng" },
];

/* Section: band nền đỏ với các con số nổi bật */
export function ResalesStatsSection() {
  return (
    <Section bg="none" padding="none" noContainer>
      <div style={{ backgroundColor: rc.redBand }}>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2
            className="font-black"
            style={{ color: colors.neutral.white, fontSize: "clamp(22px, 3vw, 36px)" }}
          >
            NHỮNG CON SỐ NỔI BẬT VỀ ERA VIETNAM
          </h2>

          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="font-black"
                  style={{ color: colors.neutral.white, fontSize: "clamp(30px, 3.4vw, 44px)", lineHeight: 1.1 }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-2 max-w-[26ch] font-semibold"
                  style={{ color: colors.neutral.white, fontSize: 15, lineHeight: 1.5, opacity: 0.92 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
