"use client";

import { useState } from "react";
import Image from "next/image";
import { c } from "../theme";
import { units } from "../data";

export function CollectionSection() {
  const [filter, setFilter] = useState("all");
  const filtered = units.filter((u) => filter === "all" || u.category === filter);

  return (
    <section id="bo-suu-tap" className="py-16 md:py-28" style={{ background: c.mist2 }}>
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="reveal text-center max-w-[640px] mx-auto mb-10">
          <div className="w-[46px] h-px mx-auto mb-5" style={{ background: c.gold }} />
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(28px,3.6vw,44px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Bộ sưu tập hữu hạn, dành cho số ít.
          </h2>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-9">
          {[
            { key: "all", label: "Tất cả" },
            { key: "can-ho", label: "Căn hộ" },
            { key: "cao-cap", label: "Dòng cao cấp" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-6 py-2.5 rounded-full text-[13px] font-medium tracking-wide border transition-all duration-300 hover:scale-105 ${
                filter === f.key
                  ? "text-white"
                  : "bg-white hover:bg-[#365b46] hover:text-white hover:border-[#365b46]"
              }`}
              style={{
                borderColor: filter === f.key ? c.green : c.line,
                background: filter === f.key ? c.green : undefined,
                color: filter === f.key ? c.white : undefined,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((u) => (
            <div
              key={u.title}
              className="bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              style={{ borderColor: c.line }}
            >
              <div className="relative aspect-[4/3]" style={{ background: c.mist }}>
                <Image
                  src={u.image}
                  alt={u.title}
                  fill
                  className="object-contain p-5"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-[10.5px] uppercase tracking-[1.2px] font-semibold" style={{ color: c.greenSoft }}>
                  {u.tag}
                </div>
                <h4
                  className="text-2xl font-semibold mt-1.5 mb-0.5"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: c.ink,
                  }}
                >
                  {u.title}
                  {u.qty && (
                    <span
                      className="inline-block ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full align-middle"
                      style={{ color: c.green, background: c.mist }}
                    >
                      {u.qty}
                    </span>
                  )}
                </h4>
                <div className="text-[13.5px] mb-3" style={{ color: c.inkSoft }}>
                  {u.spec}
                </div>
                <div className="mt-auto">
                  <div className="text-[17px] font-semibold" style={{ color: c.greenDeep }}>
                    {u.price}
                  </div>
                  <div className="text-xs" style={{ color: c.inkSoft }}>
                    {u.price === "Liên hệ"
                      ? "Giỏ hàng gửi riêng"
                      : "Giá tham khảo, chưa VAT"}
                  </div>
                </div>
                <a
                  href="#dang-ky"
                  className="mt-4 text-xs font-medium text-center py-2.5 rounded-lg border transition-all duration-500 text-[#365b46] border-[#e4ebe4] hover:bg-[#365b46] hover:text-white hover:border-[#365b46]"
                >
                  Nhận thông tin căn này →
                </a>
              </div>
            </div>
          ))}
        </div>
        <p
          className="reveal text-center text-sm mt-8 italic"
          style={{ color: c.inkSoft, fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Mỗi dòng chỉ có số lượng hữu hạn. Giỏ hàng chi tiết gửi riêng theo yêu cầu.
        </p>
        <div className="reveal text-center mt-7">
          <a
            href="#dang-ky"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-500 border text-[#365b46] border-[#6a917a] hover:bg-[#365b46] hover:text-white hover:border-[#365b46]"
          >
            Nhận giỏ hàng chi tiết
          </a>
        </div>
      </div>
    </section>
  );
}

