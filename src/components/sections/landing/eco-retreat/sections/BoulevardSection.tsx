"use client";

import Image from "next/image";
import { c, fonts } from "../theme";
import { boulevardStats } from "../data";

export function BoulevardSection() {
  return (
    <section
      className="reveal py-[88px] px-5 md:px-6"
      style={{ background: c.mist }}
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
            Đại lộ Quảng trường 40m
          </span>
          <h2
            className="font-black leading-[1.06] tracking-tight mt-3.5 mb-4"
            style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
          >
            Một con đường đủ rộng để thành{" "}
            <span style={{ color: c.red }}>cả một khu phố</span>
          </h2>
          <p
            className="mx-auto max-w-[840px]"
            style={{
              color: c.text,
              fontSize: "clamp(16px,1.5vw,18.5px)",
              lineHeight: 1.7,
            }}
          >
            Đại lộ Quảng trường rộng 40m là trục xương sống của tiểu khu: lòng đường 11m mỗi bên, vỉa hè 6m mỗi bên, dải cỏ đỗ xe 2m. Chiều rộng đó cho phép tổ chức lễ hội đường phố, chợ phiên và phố đi bộ - biến mặt tiền shophouse thành nơi buôn bán có sẵn dòng người.
          </p>
        </div>

        <div className="group overflow-hidden rounded-[22px]" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}>
          <Image
            src="/landing/eco-retreat/02_img/rp-dai-lo-canhquan.png"
            alt="Phối cảnh trên cao Đại lộ Quảng trường 40m Rừng Phượng khoanh tuyến, chạy giữa nhà phố ven sông tới cụm tháp cao tầng"
            width={1180}
            height={580}
            loading="lazy"
            className="w-full object-cover block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            style={{ height: "clamp(300px,44vw,580px)", willChange: "transform" }}
          />
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-7">
          {boulevardStats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl px-6 py-4 text-center min-w-[120px]"
            >
              <div className="font-black text-[26px]" style={{ color: c.red }}>
                {s.value}
              </div>
              <div className="text-[12.5px] mt-0.5" style={{ color: "#777" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-[18px] p-4">
          <div className="group overflow-hidden rounded-[10px]">
            <Image
              src="/landing/eco-retreat/02_img/rung-phuong-ha-tang-mat-cat-dai-lo-01.png"
              alt="Mặt cắt ngang Đại lộ Quảng trường 40m với làn xe, cây xanh và vỉa hè"
              width={1140}
              height={400}
              loading="lazy"
              className="w-full block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
