"use client";

import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { rc } from "./palette";
import { Reveal } from "./Reveal";
import { ShoppingBag, LockKeyhole, Link, UserMinus } from "lucide-react";

const PAINS = [
  {
    icon: ShoppingBag,
    title: "Rỗ hàng đơn lẻ",
    desc: "Chỉ bán được 1-2 dự án. Dự án bão hoà lại phải tự đi tìm đường mới.",
    bg: colors.tertiary.orange.DEFAULT,
  },
  {
    icon: LockKeyhole,
    title: "Quy định siết chặt",
    desc: "Thuế phí phải minh bạch, hợp đồng lớn cần công ký đứng sau và đóng mộc.",
    bg: colors.tertiary.purple.DEFAULT,
  },
  {
    icon: Link,
    title: "Liên kết sale hạn hẹp",
    desc: "Chỉ ra hàng trong vòng ngườI quen, khó cạnh tranh với các đội lớn.",
    bg: colors.secondary.DEFAULT,
  },
  {
    icon: UserMinus,
    title: "Đơn độc, dễ mất động lực",
    desc: "Không chỗ ngồi, không đội nhóm, không ai cập nhật xu hướng và kỹ thuật mới.",
    bg: rc.redBand,
  },
];

/* Section: 4 điểm đau khi làm thứ cấp một mình */
export function ResalesPainSection() {
  return (
    <Section bg="white" padding="none" className="py-10 md:py-14">
      <Reveal>
      <div className="text-xs font-extrabold tracking-[0.16em]" style={{ color: colors.primary.DEFAULT }}>
        BẠN KHAO KHÁT ĐIỀU GÌ?
      </div>
      <h2
        className="mt-3 max-w-5xl font-black"
        style={{
          color: rc.navy,
          fontSize: "clamp(22px, 3vw, 38px)",
          lineHeight: 1.25,
        }}
      >
        LÀM THỨ CẤP MỘT MÌNH, BẠN CÓ ĐANG GẶP NHỮNG ĐIỀU NÀY?
      </h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {PAINS.map((p) => (
          <div
            key={p.title}
            className="rc-pain rounded-2xl p-6 text-white"
            style={{ backgroundColor: p.bg, minHeight: 210 }}
          >
            <p.icon size={34} strokeWidth={1.8} />
            <h3 className="mt-4 text-lg font-extrabold leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ opacity: 0.92 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Hover: card nâng lên + đổ bóng */}
      <style>{`
        .rc-pain {
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .rc-pain:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(0,0,0,.22);
        }
      `}</style>      </Reveal>

    </Section>
  );
}
