"use client";

import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { rc } from "./palette";
import { Reveal } from "./Reveal";

const CHOICES = [
  {
    no: "CON ĐƯỜNG 1",
    title: "Tiếp tục làm một mình",
    desc: "Tiếp tục làm một mình là điều không thể và không còn hợp pháp. Bạn bắt buộc phải có CCHNMG và phải khai báo dưới một công ty duy nhất.",
    highlight: false,
  },
  {
    no: "CON ĐƯỜNG 2",
    title: "Về một công ty nhỏ lẻ",
    desc: "Khu vực giới hạn, rổ hàng giới hạn và liệu các công ty đó có thể đồng hành cùng bạn trên con đường dài bạn để thích nghi với sự thay đổi và siết chặt lên tục của thị trường.",
    highlight: false,
  },
  {
    no: "CON ĐƯỜNG 3",
    title: "Về một hệ thống lớn, minh bạch",
    desc: "Đúng luật, minh bạch, có rổ hàng lớn và đội ngũ phía sau kết hợp cùng công nghệ tối ưu. Làm chủ thời gian, tận hưởng thu nhập, làm chủ sự nghiệp của chính bạn.",
    highlight: true,
  },
];

/* Section: 3 con đường lựa chọn */
export function ResalesChoiceSection() {
  return (
    <Section bg="white" padding="none" className="py-10 md:py-14">
      <Reveal>
      <div className="text-xs font-extrabold tracking-[0.16em]" style={{ color: colors.primary.DEFAULT }}>
        ĐÃ ĐẾN LÚC PHẢI LỰA CHỌN
      </div>
      <h2
        className="mt-3 max-w-5xl font-black"
        style={{
          color: rc.navy,
          fontSize: "clamp(22px, 3vw, 38px)",
          lineHeight: 1.25,
        }}
      >
        LUẬT ĐÃ CHỌN THAY ANH/CHỊ MỘT NỬA. NỬA CÒN LẠI LÀ CHỌN NƠI LÀM NGHỀ
      </h2>

      <div className="rc-choices mt-10 grid gap-8 md:grid-cols-3">
        {CHOICES.map((c) => (
          <div
            key={c.no}
            className={`rc-choice rounded-2xl p-6${c.highlight ? " hl" : ""}`}
          >
            <div className="no text-xs font-extrabold tracking-[0.14em]">{c.no}</div>
            <h3 className="mt-2 text-xl font-extrabold leading-snug">{c.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed opacity-90">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Hover: card được chỉ -> đỏ + nâng lên; card 3 mặc định đỏ, tự về xám khi card khác được chỉ */}
      <style>{`
        .rc-choice {
          background: ${colors.gray[100]};
          color: ${rc.navy};
          transition: transform .25s ease, box-shadow .25s ease, background-color .25s ease, color .25s ease;
        }
        .rc-choice .no { color: ${colors.muted.DEFAULT}; }
        .rc-choice.hl {
          background: ${colors.primary.DEFAULT};
          color: ${colors.neutral.white};
          box-shadow: 0 16px 40px rgba(200,16,46,.22);
        }
        .rc-choice.hl .no { color: rgba(255,255,255,.85); }
        .rc-choice:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 44px rgba(200,16,46,.28);
        }
        .rc-choice:not(.hl):hover {
          background: ${colors.primary.DEFAULT};
          color: ${colors.neutral.white};
        }
        .rc-choice:not(.hl):hover .no { color: rgba(255,255,255,.85); }
        .rc-choices:has(.rc-choice:not(.hl):hover) .rc-choice.hl {
          background: ${colors.gray[100]};
          color: ${rc.navy};
          box-shadow: none;
        }
        .rc-choices:has(.rc-choice:not(.hl):hover) .rc-choice.hl .no { color: ${colors.muted.DEFAULT}; }
      `}</style>
      </Reveal>

    </Section>
  );
}
