"use client";

import Image from "next/image";
import { c } from "../theme";

export function UspSection() {
  const usps = [
    {
      n: "01",
      title: "Onsen khoáng nóng chuẩn Nhật",
      desc: "Tổ hợp Onsen cao tầng đầu tiên Miền Nam, công nghệ ion hóa và micro bubble.",
      img: "/landing/forest-onsen/02_img/canh/forest-onsen-vuon-onsen-kieu-nhat.jpg",
    },
    {
      n: "02",
      title: "Trực diện Hồ Thiên Nga 12ha",
      desc: "Vi khí hậu riêng, không khí trong lành, tầm nhìn không bị chắn.",
      img: "/landing/forest-onsen/02_img/canh/forest-onsen-ban-cong-nam-view-ho-thien-nga.jpg",
    },
    {
      n: "03",
      title: "Wellness chỉ một nút bấm",
      desc: "Chu trình 20 - 45 - 90 phút, ngay dưới thềm nhà, vừa mọi quỹ thời gian.",
      img: "/landing/forest-onsen/02_img/canh/forest-onsen-be-boi-vo-cuc-hoang-hon.jpg",
    },
    {
      n: "04",
      title: "Bảo chứng kép, an tâm tuyệt đối",
      desc: "Ecopark hơn 20 năm và KTS Tadakatsu Honda, người sau Mori Onsen Hưng Yên.",
      img: "/landing/forest-onsen/02_img/canh/forest-onsen-sanh-le-tan-onsen.jpg",
    },
  ];
  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <div className="text-xs font-medium tracking-[2.5px] uppercase" style={{ color: c.greenSoft }}>
            Bốn đặc quyền
          </div>
          <div className="w-[46px] h-px mx-auto mt-5 mb-5" style={{ background: c.gold }} />
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(30px,4vw,48px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Lý do của một quyết định xứng tầm.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {usps.map((u) => (
            <div
              key={u.n}
              className="relative rounded-2xl overflow-hidden min-h-[340px] flex items-end text-white group"
              style={{ boxShadow: "0 20px 50px -28px rgba(39,68,52,.4)" }}
            >
              <Image
                src={u.img}
                alt={u.title}
                fill
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(28,40,32,0) 35%,rgba(28,40,32,.82))",
                }}
              />
              <div className="relative z-10 p-8">
                <div
                  className="text-[17px] text-white/75"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                  }}
                >
                  {u.n}
                </div>
                <h3
                  className="font-medium mt-1 mb-2"
                  style={{
                    fontSize: "clamp(23px,2.4vw,30px)",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  {u.title}
                </h3>
                <p className="text-[15px] text-white/90 max-w-[380px]">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Onsen Feature ─── */
