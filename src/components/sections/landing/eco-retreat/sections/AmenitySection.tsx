"use client";

import Image from "next/image";
import { c, fonts } from "../theme";

const gallery = [
  {
    image: "/landing/eco-retreat/02_img/rp-san-choi.png",
    alt: "Sân chơi vận động ngoài trởi Rừng Phượng với hố cát, đồ chơi gỗ, trẻ em vui đùa dưới tán phượng",
    title: "Sân chơi vận động",
  },
  {
    image: "/landing/eco-retreat/02_img/rp-tram-doc-sach.png",
    alt: "Trạm đọc sách thông minh ngoài trởi và ô nhảy lò cò trên tuyến phố nội khu Rừng Phượng",
    title: "Trạm đọc thông minh",
  },
  {
    image: "/landing/eco-retreat/02_img/rp-vuon-cay.png",
    alt: "Vườn cây ăn quả cộng đồng Rừng Phượng - xoài, cam, mít, trẻ em hái quả trên bãi cỏ",
    title: "Vườn cây ăn quả",
  },
  {
    image: "/landing/eco-retreat/02_img/rp-tha-dieu.png",
    alt: "Bãi cỏ thả diều và hồ cảnh quan Rừng Phượng nhìn từ trên cao, lễ hội diều nhiều màu",
    title: "Hồ cảnh quan & bãi thả diều",
  },
];

const leftList = [
  "Trạm đọc thông minh ngoài trởi (tủ sách cộng đồng, bàn cờ, ô nhảy lò cò)",
  "Công viên âm nhạc tương tác (mộc cầm, trống gõ ngoài trởi)",
  "Sân chơi vận động (hố cát, bập bênh gỗ, đồi cỏ)",
  "Khung trưng bày tranh của trẻ ngoài trởi",
  "Vườn cây ăn quả cộng đồng (xoài, mít, cam)",
];

const rightList = [
  "Đại lộ Quảng trường 40m - trục lễ hội đường phố, chợ phiên, phố đi bộ",
  "Công viên hồ cảnh quan và bãi cỏ thả diều",
  "Vườn công cộng nội khu (~930 m²)",
];

export function AmenitySection() {
  return (
    <section className="reveal max-w-[1180px] mx-auto px-5 md:px-6 py-[88px]">
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
          Tiện ích & cảnh quan "Vitamin G"
        </span>
        <h2
          className="font-black leading-[1.06] tracking-tight mt-3.5 mb-4"
          style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
        >
          Cả tiểu khu là{" "}
          <span style={{ color: c.red }}>một lớp học ngoài trởi</span>
        </h2>
        <p
          className="mx-auto max-w-[820px]"
          style={{
            color: c.text,
            fontSize: "clamp(16px,1.5vw,18.5px)",
            lineHeight: 1.7,
          }}
        >
          Thay vì gom trẻ vào một khu vui chơi rồi thôi, Rừng Phượng rải các điểm học và chơi khắp tiểu khu. Con đi qua đâu cũng có chỗ để dừng lại, đọc, nghịch, quan sát.
        </p>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        data-imgrow
      >
        {gallery.map((item) => (
          <div
            key={item.title}
            className="relative rounded-[18px] overflow-hidden group"
            style={{ height: "clamp(260px,30vw,360px)" }}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              loading="lazy"
              className="object-cover block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              style={{ willChange: "transform" }}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div
              className="absolute left-0 right-0 bottom-0 px-4 pb-3.5 pt-10 text-white font-bold text-[15.5px]"
              style={{ background: "linear-gradient(0deg,rgba(0,0,0,0.7),transparent)" }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <div
        className="grid md:grid-cols-2 gap-5 md:gap-[22px] mt-8 md:mt-[34px]"
        data-stack
      >
        <div className="rounded-2xl p-6 md:p-7" style={{ background: c.mist }}>
          <div className="font-extrabold text-[17px] mb-3.5" style={{ color: c.red }}>
            Công viên giáo dục & giác quan ngoài trởi
          </div>
          <ul
            className="m-0 pl-[18px] text-[14.5px] leading-[1.9]"
            style={{ color: "#444" }}
          >
            {leftList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl p-6 md:p-7" style={{ background: c.mist }}>
          <div className="font-extrabold text-[17px] mb-3.5" style={{ color: c.red }}>
            Cảnh quan chữa lành
          </div>
          <ul
            className="m-0 pl-[18px] text-[14.5px] leading-[1.9]"
            style={{ color: "#444" }}
          >
            {rightList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
