"use client";

import Image from "next/image";
import { c, fonts } from "../theme";

export function OverviewSection() {
  return (
    <section
      className="reveal py-[88px] px-5 md:px-6"
      style={{ background: c.mist }}
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center max-w-[940px] mx-auto mb-10 md:mb-11">
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
            Tổng quan dự án
          </span>
          <h2
            className="font-black leading-[1.06] tracking-tight mt-3.5 mb-4"
            style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
          >
            <span className="block mb-[0.6rem]">Tiểu khu trong đại</span>
            <span className="block">
              đô thị <span style={{ color: c.red }}>đã có người ở</span>
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
            Rừng Phượng là tiểu khu thuộc Phân khu Mùa Lễ Hội của đại đô thị Eco Retreat - khu vực được quy hoạch làm trung tâm giải trí, thương mại và sự kiện. Eco Retreat nằm ở Long An, ngay ranh Nam TP.HCM, do đơn vị trong hệ sinh thái Ecopark phát triển.
          </p>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-4" data-stack>
          <div className="group overflow-hidden rounded-[18px] min-h-[340px]">
            <Image
              src="/landing/eco-retreat/02_img/rung-phuong-phoi-canh-tong-toan-canh-dai-do-thi-01.webp"
              alt="Phối cảnh tổng thể đại đô thị Eco Retreat nhìn từ trên cao với hồ trung tâm"
              width={780}
              height={540}
              loading="lazy"
              className="w-full h-full object-cover block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              style={{ willChange: "transform" }}
            />
          </div>
          <div className="group overflow-hidden rounded-[18px] min-h-[340px]">
            <Image
              src="/landing/eco-retreat/02_img/rung-phuong-phoi-canh-sp-biet-thu-song-lap-tren-cao-05.webp"
              alt="Biệt thự song lập Rừng Phượng giữa vườn phượng nhìn từ trên cao"
              width={390}
              height={540}
              loading="lazy"
              className="w-full h-full object-cover block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5"
          data-grid3
        >
          {[
            { label: "Vị trí", value: "Long An, giáp Nam TP.HCM" },
            { label: "Cấp độ", value: "Tiểu khu trong Eco Retreat (hệ sinh thái Ecopark)" },
            { label: "Vai trò", value: "Phân khu Mùa Lễ Hội - trục giải trí, thương mại, sự kiện" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-[14px] px-5 py-5">
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "#999" }}
              >
                {item.label}
              </div>
              <div className="text-[15.5px] font-semibold" style={{ color: c.green }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-5 text-[12.5px] m-0"
          style={{ color: "#999" }}
        >
          Sản phẩm cấp sổ từng căn. Hồ sơ pháp lý chi tiết được đính kèm khi tư vấn trực tiếp.
        </p>
      </div>
    </section>
  );
}
