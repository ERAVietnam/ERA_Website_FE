"use client";

import Image from "next/image";
import { c, fonts } from "../theme";

export function MasterPlanSection() {
  return (
    <section
      className="reveal py-[88px] px-5 md:px-6"
      style={{ background: c.mist }}
    >
      <div className="max-w-[1180px] mx-auto text-center">
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
          Mặt bằng phân khu
        </span>
        <h2
          className="font-black leading-[1.06] tracking-tight mt-3.5 mb-4"
          style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
        >
          Mặt bằng tổng thể tiểu khu
        </h2>
        <p
          className="mx-auto max-w-[840px] mb-7 md:mb-8"
          style={{
            color: c.text,
            fontSize: "clamp(16px,1.5vw,18.5px)",
            lineHeight: 1.7,
          }}
        >
          Tiểu khu chia thành các dãy Hoa Phượng 1-8, trường liên cấp Edison và mầm non nằm giữa, Đại lộ Quảng trường chạy xuyên qua, một mặt giáp sông Bến Lức.
        </p>

        <div
          className="bg-white rounded-[18px] p-4 shadow-lg"
          style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.1)" }}
        >
          <div className="group overflow-hidden rounded-[10px]">
            <Image
              src="/landing/eco-retreat/02_img/rung-phuong-mat-bang-phan-khu-tong-the-01.webp"
              alt="Mặt bằng tổng thể tiểu khu Rừng Phượng - các dãy Hoa Phượng, trường Edison, mầm non và sông Bến Lức"
              width={1140}
              height={800}
              loading="lazy"
              className="w-full block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>

        <a
          href="#dang-ky"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector("#dang-ky");
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-block mt-7 text-white font-bold text-base px-7 py-4 rounded-full transition-opacity hover:opacity-90"
          style={{ background: c.red, boxShadow: "0 10px 26px rgba(229,57,28,0.3)" }}
        >
          Nhận mặt bằng chi tiết + vị trí căn còn hàng
        </a>
      </div>
    </section>
  );
}
