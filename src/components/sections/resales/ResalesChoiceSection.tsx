"use client";

import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { rc } from "./palette";

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

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {CHOICES.map((c) => (
          <div
            key={c.no}
            className="rounded-2xl p-6"
            style={{
              backgroundColor: c.highlight ? colors.primary.DEFAULT : colors.gray[100],
              color: c.highlight ? colors.neutral.white : rc.navy,
              boxShadow: c.highlight ? "0 16px 40px rgba(200,16,46,.25)" : undefined,
            }}
          >
            <div
              className="text-xs font-extrabold tracking-[0.14em]"
              style={{ color: c.highlight ? colors.neutral.white : colors.muted.DEFAULT, opacity: c.highlight ? 0.85 : 1 }}
            >
              {c.no}
            </div>
            <h3 className="mt-2 text-xl font-extrabold leading-snug">{c.title}</h3>
            <p
              className="mt-3 text-[15px] leading-relaxed"
              style={{ opacity: c.highlight ? 0.95 : 0.85 }}
            >
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
