"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { c } from "../theme";

export function BenefitsSection() {
  const benefits = [
    { n: "01", title: "Làn da thanh xuân", desc: "Khoáng chất và hơi nước giúp da sạch sâu, mềm mại và rạng rỡ tự nhiên hơn." },
    { n: "02", title: "Giấc ngủ sâu", desc: "Thân nhiệt hạ dần sau khi ngâm khoáng giúp dễ vào giấc và ngủ trọn đêm." },
    { n: "03", title: "Giải tỏa căng thẳng", desc: "Không gian Zen, tiếng nước và nhịp thở chậm kéo bạn ra khỏi guồng quay đô thị." },
    { n: "04", title: "Dẻo dai xương khớp", desc: "Ngâm khoáng nóng làm dịu căng cơ, hỗ trợ khớp linh hoạt - lý tưởng sau yoga." },
    { n: "05", title: "Thanh lọc cơ thể", desc: "Nhiệt khoáng kích thích tuần hoàn và bài tiết qua da, cơ thể nhẹ nhõm hơn." },
    { n: "06", title: "Năng lượng tái tạo", desc: "Mỗi khoảnh khắc nuông chiều bản thân, để sáng mai lại đầy năng lượng." },
  ];
  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="reveal text-center max-w-[680px] mx-auto mb-14">
          <div className="text-xs font-medium tracking-[2.5px] uppercase" style={{ color: c.greenSoft }}>
            Cho cơ thể, mỗi ngày
          </div>
          <div className="w-[46px] h-px mx-auto mt-5 mb-5" style={{ background: c.gold }} />
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(28px,3.6vw,44px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Khoáng nóng làm gì cho{" "}
            <em style={{ color: c.green, fontStyle: "italic" }}>người mình thương?</em>
          </h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: c.inkSoft }}>
            Không chỉ là thư giãn. Là một liệu trình chăm sóc sức khỏe và sắc đẹp,
            lặp lại mỗi ngày ngay tại nhà.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => (
            <div
              key={b.n}
              className="p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:bg-[#eef3ee]"
              style={{ background: c.mist2, borderColor: c.line }}
            >
              <div
                className="text-[27px] font-semibold"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: c.greenSoft,
                  fontStyle: "italic",
                }}
              >
                {b.n}
              </div>
              <h4
                className="text-[22px] font-semibold mt-2 mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: c.ink,
                }}
              >
                {b.title}
              </h4>
              <p className="text-[14.5px]" style={{ color: c.inkSoft }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


