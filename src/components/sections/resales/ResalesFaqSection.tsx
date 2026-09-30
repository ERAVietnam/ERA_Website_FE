"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { rc } from "./palette";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "“Tôi quen làm tự do, về công ty có bị gò bó?”",
    a: "Cộng tác viên ERA không bị ràng buộc thờI gian hay chỉ tiêu. Anh/chị vẫn chủ động, chỉ có thêm hệ thống phía sau.",
  },
  {
    q: "“Nghe nói ERA chỉ mạnh sơ cấp?”",
    a: "Với thế mạnh sơ cấp, ERA Vietnam có thể tận dụng giúp anh/chị phát triển thứ cấp nhờ rỗ hàng lớn và mạng lưới kết nối agent 2.700+.",
  },
  {
    q: "“Tham gia có mất phí gì không?”",
    a: "Không. Workshop miễn phí, gia nhập cộng tác viên cũng không mất phí.",
  },
  {
    q: "“Chứng chỉ hành nghề thì sao?”",
    a: "Chứng chỉ do anh/chị thi theo quy định. ERA đào tạo hành nghề bài bản để anh/chị làm nghề chuyên nghiệp.",
  },
  {
    q: "“Chưa có kinh nghiệm có đi được không?”",
    a: "Được, ERA Vietnam có lộ trình đào tạo cho ngườI mới bắt đầu và ngườI có kinh nghiệm.",
  },
  {
    q: "“Hoa hồng chia thế nào?”",
    a: "Cơ chế hoa hồng của ERA rõ ràng và được giới thiệu chi tiết tại workshop.",
  },
];

/* Section: FAQ 2 cột */
export function ResalesFaqSection() {
  return (
    <Section
      bg="white"
      padding="md"
      noContainer
      className="relative overflow-hidden pt-20 md:pt-28"
    >
      {/* Hình trang trí góc (đã tách nền) */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-0"
        style={{ width: "clamp(220px, 28vw, 480px)", aspectRatio: "679/253" }}
      >
        <Image
          src="/resale/top_left.png"
          alt=""
          fill
          sizes="(max-width: 768px) 220px, 480px"
          className="object-contain object-top-left"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-0"
        style={{ width: "clamp(220px, 28vw, 480px)", aspectRatio: "679/253" }}
      >
        <Image
          src="/resale/bottom_right.png"
          alt=""
          fill
          sizes="(max-width: 768px) 220px, 480px"
          className="object-contain object-bottom-right"
        />
      </div>

      <Container className="relative z-10">
        <Reveal>
        <h2
        className="font-black"
        style={{
          color: rc.navy,
          fontSize: "clamp(22px, 3vw, 38px)",
          lineHeight: 1.25,
        }}
      >
        ANH/CHỊ CÓ THỂ ĐANG THẮC MẮC
      </h2>

      <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {FAQS.map((f, i) => (
          <div
            key={f.q}
            className={i < FAQS.length - 2 ? "border-b pb-6" : "pb-2"}
            style={{ borderColor: colors.border.DEFAULT }}
          >
            <h3 className="text-base font-extrabold" style={{ color: rc.navy }}>
              {f.q}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed" style={{ color: colors.gray[700] }}>
              {f.a}
            </p>
          </div>
        ))}
        </div>
        </Reveal>
      </Container>
    </Section>
  );
}
