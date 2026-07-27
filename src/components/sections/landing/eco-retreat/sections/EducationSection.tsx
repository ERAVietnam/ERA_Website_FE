"use client";

import Image from "next/image";
import { c, fonts } from "../theme";

const highlights = [
  {
    title: "Edison Schools 22.088 m²",
    text: "Liên cấp, triết lý \"Innovation For Life\".",
  },
  {
    title: "Mầm non nội khu 7.000 m²",
    text: "Ngay cạnh nhà, tiện đưa đón trẻ nhỏ.",
  },
  {
    title: "Con đường học trò khép kín",
    text: "Con tự đến trường an toàn dưới tán cây.",
  },
];

export function EducationSection() {
  return (
    <section
      id="giao-duc"
      className="reveal py-[90px] px-5 md:px-6"
      style={{ background: "linear-gradient(180deg,#FBFAF6,#F1F6EC)" }}
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="max-w-[940px] mx-auto mb-10 md:mb-11 text-center">
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
            Hệ sinh thái giáo dục · Điểm nhấn
          </span>
          <h2
            className="font-black leading-[1.06] tracking-tight mt-3.5 mb-4"
            style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
          >
            <span className="block mb-[0.6rem]">Trường liên cấp ngay trong</span>
            <span className="block">
              khu, <span style={{ color: c.red }}>con tự đi bộ đến lớp</span>
            </span>
          </h2>
          <p
            className="mx-auto max-w-[820px]"
            style={{
              color: c.text,
              fontSize: "clamp(16px,1.5vw,18.5px)",
              lineHeight: 1.7,
            }}
          >
            Với nhiều gia đình, chọn nhà thực ra là chọn trường cho con. Ở Rừng Phượng, trường nằm ngay trong tiểu khu chứ không phải "gần khu vực".
          </p>
        </div>

        <div className="group overflow-hidden rounded-[22px]" style={{ boxShadow: "0 20px 48px rgba(20,66,30,0.16)" }}>
          <Image
            src="/landing/eco-retreat/02_img/rp-edison-toancanh.webp"
            alt="Toàn cảnh trường Phổ thông Liên cấp Edison 22.088m² nhìn từ trên cao - sân bóng đá cỏ tự nhiên, đường chạy điền kinh, bể bơi, ven sông"
            width={1180}
            height={600}
            loading="lazy"
            className="w-full object-cover block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            style={{ height: "clamp(300px,44vw,600px)", willChange: "transform" }}
          />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[18px] mt-[18px]"
          data-imgrow
        >
          {[
            {
              image: "/landing/eco-retreat/02_img/rp-con-duong-hoc-tro.webp",
              alt: "Con đường học trò Rừng Phượng - mẹ mặc áo dài dắt con đi học dưới hàng phượng nở đỏ, xe bus trường học, học sinh đạp xe",
              title: "Con đường học trò",
              text: "Tuyến đi bộ khép kín, rợp bóng cây, đủ an toàn để con tự đến lớp.",
            },
            {
              image: "/landing/eco-retreat/02_img/rp-mam-non.webp",
              alt: "Trường mầm non nội khu Rừng Phượng 7.000m² giữa cây xanh, trẻ nhỏ vui chơi ngoài sân",
              title: "Mầm non nội khu 7.000 m²",
              text: "Ngay cạnh nhà, thuận tiện đưa đón trẻ nhỏ mỗi ngày.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="relative rounded-[18px] overflow-hidden group"
              style={{ height: "clamp(220px,26vw,340px)" }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                loading="lazy"
                className="object-cover block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                style={{ willChange: "transform" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute left-0 right-0 bottom-0 px-5 pb-4 pt-10 text-white"
                style={{
                  background: "linear-gradient(0deg,rgba(0,0,0,0.72),transparent)",
                }}
              >
                <div className="font-extrabold text-[17px]">{item.title}</div>
                <div className="text-[13.5px] text-white/85 mt-0.5">
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className="mx-auto max-w-[960px] text-center mt-8 md:mt-[34px]"
          style={{ color: c.text, fontSize: 16.5, lineHeight: 1.75 }}
        >
          Trường Phổ thông Liên cấp Edison rộng{" "}
          <strong style={{ color: c.green }}>22.088 m²</strong>, có khối phòng học, nhà hiệu bộ, sân bóng đá cỏ tự nhiên, sân bóng rổ và đường chạy điền kinh. Bên cạnh là trường mầm non nội khu{" "}
          <strong style={{ color: c.green }}>7.000 m²</strong>. Nối nhà với trường là con đường học trò - tuyến đi bộ khép kín, rợp bóng cây.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[18px] mt-8 md:mt-[34px]"
          data-grid3
        >
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-white border rounded-2xl p-6 shadow-sm"
              style={{ borderColor: "#E6E9E1", boxShadow: "0 8px 22px rgba(20,66,30,0.05)" }}
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
      </div>
    </section>
  );
}
