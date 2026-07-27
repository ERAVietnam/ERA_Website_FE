"use client";

import Image from "next/image";
import { c, fonts } from "../theme";

export function ProblemSection() {
  return (
    <section className="reveal max-w-[1180px] mx-auto px-5 md:px-6 py-[88px]">
      <div className="max-w-[960px] mx-auto mb-10 md:mb-12 text-center">
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
          Nơi để con lớn lên
        </span>
        <h2
          className="font-black leading-[1.06] tracking-tight mt-3.5 mb-5"
          style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
        >
          Con lớn lên với 7 tiếng màn hình mỗi ngày - hay với{" "}
          <span style={{ color: c.red }}>cả một khu vườn</span>?
        </h2>
        <p
          className="mx-auto max-w-[800px]"
          style={{
            color: c.text,
            fontSize: "clamp(16px,1.5vw,18.5px)",
            lineHeight: 1.7,
          }}
        >
          Nhiều đứa trẻ thành phố bây giờ chơi ngoài trởi chưa tới 30 phút một ngày, nhưng ngồi trước màn hình thì hàng tiếng. Cái thiếu không nằm ở đồ chơi hay lớp học thêm, mà ở chỗ để con chạy nhảy, tự đi bộ, tự tò mò.
        </p>
      </div>

      <div
        className="group overflow-hidden rounded-[22px] relative"
        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.18)", height: "clamp(280px,42vw,540px)" }}
      >
        <Image
          src="/landing/eco-retreat/02_img/rp-vuon-cay.webp"
          alt="Trẻ em hái cam, chơi trên bãi cỏ trong vườn cây ăn trái cộng đồng Rừng Phượng, cây phượng nở đỏ"
          fill
          loading="lazy"
          className="object-cover block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          style={{ willChange: "transform" }}
          sizes="100vw"
        />
      </div>

      <div
        className="grid md:grid-cols-[1.35fr_1fr] gap-6 md:gap-[30px] items-center mt-10"
        data-stack
      >
        <p
          className="m-0"
          style={{ color: "#444", fontSize: 17, lineHeight: 1.75 }}
        >
          Rừng Phượng được quy hoạch quanh một ý đơn giản: cho đứa trẻ ba thứ nó cần để lớn khỏe -{" "}
          <strong style={{ color: c.green }}>chỗ vận động ngoài trởi</strong>,{" "}
          <strong style={{ color: c.green }}>một cộng đồng để va chạm</strong>, và{" "}
          <strong style={{ color: c.green }}>trường lớp ngay bên cạnh</strong>. Ở đây "môi trường cho con" là thứ có thật để đi xem, không phải một câu quảng cáo.
        </p>
        <div
          className="flex items-center gap-4 md:gap-[18px] rounded-2xl p-5 md:p-6"
          style={{ background: c.mist }}
        >
          <div
            className="font-black leading-[0.9]"
            style={{ fontSize: "clamp(44px,5vw,60px)", color: c.red }}
          >
            55%
          </div>
          <div className="text-[14px] leading-relaxed" style={{ color: c.text }}>
            Trẻ lớn lên gần không gian xanh có nguy cơ gặp vấn đề sức khỏe tâm thần khi trưởng thành{" "}
            <strong>thấp hơn tới 55%</strong>.
            <br />
            <span className="text-xs" style={{ color: "#999" }}>
              Nghiên cứu ĐH Aarhus, Đan Mạch - theo dõi gần 1 triệu trẻ em.
            </span>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[18px] mt-8 md:mt-[34px]"
        data-grid3
      >
        {[
          { title: "Thể chất", text: "Sân chơi, đường chạy, chỗ đạp xe ngoài trởi." },
          { title: "Trí tuệ", text: "Mật độ cây xanh hỗ trợ khả năng tập trung." },
          { title: "Tinh thần", text: "Môi trường sống giảm căng thẳng cho cả nhà." },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white border rounded-2xl p-6"
            style={{ borderColor: c.line }}
          >
            <div className="font-extrabold text-[17px] mb-2" style={{ color: c.red }}>
              {item.title}
            </div>
            <p className="m-0 text-[14.5px] leading-relaxed" style={{ color: c.text }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
