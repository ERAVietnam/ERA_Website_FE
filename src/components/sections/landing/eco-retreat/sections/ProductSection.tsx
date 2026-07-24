"use client";

import Image from "next/image";
import { c, fonts } from "../theme";
import { productLines, productTable } from "../data";

export function ProductSection() {
  return (
    <section id="san-pham" className="reveal max-w-[1180px] mx-auto px-5 md:px-6 py-[88px]">
      <div className="max-w-[960px] mx-auto mb-8 md:mb-9 text-center">
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
          Cơ cấu sản phẩm
        </span>
        <h2
          className="font-black leading-[1.06] tracking-tight mt-3.5 mb-4"
          style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
        >
          <span style={{ color: c.red }}>325 căn</span>, bốn dòng sản phẩm, chọn theo cách sống của gia đình
        </h2>
        <p
          className="mx-auto max-w-[820px]"
          style={{
            color: c.text,
            fontSize: "clamp(16px,1.5vw,18.5px)",
            lineHeight: 1.7,
          }}
        >
          Cả tiểu khu chỉ 325 căn. Con số giới hạn này chia cho bốn dòng sản phẩm, mỗi dòng hợp với một kiểu gia đình khác nhau. Giá bán theo từng đợt do chủ đầu tư công bố.
        </p>
      </div>

      <div
        className="grid md:grid-cols-[0.9fr_1.1fr] rounded-[20px] overflow-hidden border mb-9 md:mb-11 shadow-lg"
        data-stack
        style={{ background: c.mist, borderColor: "#E1E8D6", boxShadow: "0 16px 40px rgba(20,66,30,0.1)" }}
      >
        <div
          className="p-6 md:p-10 flex flex-col justify-center gap-3.5"
          style={{ background: "linear-gradient(150deg,#E7F1DA,#D6E7C4)" }}
        >
          <div
            className="leading-[0.95]"
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: "clamp(46px,5vw,68px)",
              color: c.red,
            }}
          >
            Rừng Phượng
          </div>
          <div
            className="text-[15px] leading-relaxed max-w-[320px]"
            style={{ color: "#4b5a4e" }}
          >
            Cả tiểu khu giới hạn <strong style={{ color: c.green }}>325 căn</strong>, chia cho bốn dòng sản phẩm - mỗi dòng một kiểu gia đình.
          </div>
          <div className="mt-1.5 inline-flex items-baseline gap-2">
            <span
              className="font-black leading-none"
              style={{ fontSize: "clamp(40px,5vw,60px)", color: c.green }}
            >
              325
            </span>
            <span className="font-bold text-lg" style={{ color: c.red }}>
              căn
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-2.5 justify-center">
          {[
            { name: "Biệt thự Đơn lập", count: "6 căn" },
            { name: "Biệt thự Song lập", count: "52 căn" },
            { name: "Nhà phố Đại lộ", count: "85 căn" },
            { name: "Nhà phố Vườn", count: "182 căn" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="flex-1 rounded-[10px] px-4 py-3 text-[15px] font-semibold"
                style={{ background: c.white, color: c.green }}
              >
                {item.name}
              </div>
              <div
                className="w-[110px] text-center rounded-[10px] px-0 py-3 text-[15px] font-bold"
                style={{ background: "#E4EFD3", color: c.green }}
              >
                {item.count}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 mt-0.5">
            <div
              className="flex-1 rounded-[10px] px-4 py-3 text-[15px] font-black"
              style={{ background: c.lime, color: c.green }}
            >
              TỔNG
            </div>
            <div
              className="w-[110px] text-center rounded-[10px] px-0 py-3 text-[15px] font-black"
              style={{ background: c.lime, color: c.green }}
            >
              325 căn
            </div>
          </div>
        </div>
      </div>

      <div
        className="overflow-x-auto rounded-2xl border mb-10 md:mb-11"
        style={{ borderColor: c.line }}
      >
        <table
          className="w-full border-collapse min-w-[720px] text-sm"
        >
          <thead>
            <tr style={{ background: c.green, color: c.white, textAlign: "left" }}>
              <th className="px-4 py-3.5 font-bold">Dòng sản phẩm</th>
              <th className="px-4 py-3.5 font-bold">Số căn</th>
              <th className="px-4 py-3.5 font-bold">Diện tích lô</th>
              <th className="px-4 py-3.5 font-bold">Kích thước điển hình</th>
              <th className="px-4 py-3.5 font-bold">Kết cấu</th>
              <th className="px-4 py-3.5 font-bold">DT sàn xây dựng</th>
            </tr>
          </thead>
          <tbody>
            {productTable.map((row, idx) => (
              <tr
                key={row.line}
                className="border-t"
                style={{
                  borderColor: c.line,
                  background: idx % 2 === 1 ? "#FAFAFA" : c.white,
                }}
              >
                <td className="px-4 py-3.5 font-semibold" style={{ color: c.green }}>
                  {row.line}
                </td>
                <td className="px-4 py-3.5">{row.count}</td>
                <td className="px-4 py-3.5">{row.area}</td>
                <td className="px-4 py-3.5">{row.size}</td>
                <td className="px-4 py-3.5">{row.structure}</td>
                <td className="px-4 py-3.5">{row.floorArea}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-[22px]"
        data-grid4
      >
        {productLines.map((item) => (
          <div
            key={item.name}
            className="border rounded-[18px] overflow-hidden flex flex-col"
            style={{ borderColor: c.line }}
          >
            <div className="relative overflow-hidden group h-[250px]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                loading="lazy"
                className="object-cover block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                style={{ willChange: "transform" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span
                className="absolute top-3.5 left-3.5 text-white font-bold text-xs px-3 py-1.5 rounded-full"
                style={{ background: item.badgeColor }}
              >
                {item.badge}
              </span>
            </div>
            <div className="p-5 md:p-6 flex flex-col flex-1">
              <div className="font-extrabold text-[19px] mb-2" style={{ color: c.green }}>
                {item.name}
              </div>
              <p
                className="m-0 mb-4 text-[14.5px] leading-relaxed flex-1"
                style={{ color: c.text }}
              >
                {item.description}
              </p>
              <a
                href="#dang-ky"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector("#dang-ky");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="self-start font-bold text-[14.5px] transition-opacity hover:opacity-75"
                style={{ color: c.red }}
              >
                Xem chi tiết & nhận giá →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
