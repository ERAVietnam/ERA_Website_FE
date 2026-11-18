"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AutoHeightIframe from "@/components/landing/AutoHeightIframe";

const LayoutLightbox = dynamic(() => import("./SunwahPearlLayoutLightbox"), { ssr: false });
const floorPlans = [
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-site-plan.webp", width: 1437, height: 874, alt: "Mặt bằng tổng thể Sunwah Pearl với vị trí ba tòa White House, Silver House và Golden House" },
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-white-house.webp", width: 1432, height: 874, alt: "WHITE HOUSE – mặt bằng tầng điển hình và bố trí các căn hộ" },
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-silver-house.webp", width: 1439, height: 874, alt: "SILVER HOUSE – mặt bằng tầng điển hình và bố trí các căn hộ" },
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-golden-house.webp", width: 1440, height: 874, alt: "GOLDEN HOUSE – mặt bằng tầng điển hình và bố trí các căn hộ" },
];

export function SunwahPearlLanding() {
  const [activePlan, setActivePlan] = useState(-1);

  return (
    <main className="overflow-hidden bg-[#f8f1df] text-[#4b174e]">
      <section id="hero" aria-label="Giới thiệu Sunwah Pearl" className="bg-[#52004c]">
        <AutoHeightIframe
          observeContentSize
          contentBottomSelector=".hero"
          frameId="sunwah-pearl-hero"
          title="Sunwah Pearl – Giải pháp tích sản tại vị trí trung tâm"
          src="/landing/sunwah-pearl/hero.html?v=20261118-5"
        />
      </section>

      <section id="ty-le-lap-day" aria-label="Tỷ lệ lấp đầy Sunwah Pearl" className="bg-[#f5f0df]">
        <AutoHeightIframe
          observeContentSize
          contentBottomSelector=".occupancy"
          frameId="sunwah-pearl-occupancy"
          title="Sunwah Pearl – Tỷ lệ lấp đầy"
          src="/landing/sunwah-pearl/occupancy.html?v=20261118-2"
        />
      </section>

      <section id="dong-luc-bao-ton" aria-label="3 động lực bảo tồn và tăng trưởng tài sản" className="bg-[#500547]">
        <AutoHeightIframe
          observeContentSize
          contentBottomSelector=".drivers"
          frameId="sunwah-pearl-drivers"
          title="Sunwah Pearl – 3 động lực bảo tồn và tăng trưởng tài sản"
          src="/landing/sunwah-pearl/drivers.html?v=20261118-2"
        />
      </section>

      <section id="so-sanh-dau-tu" aria-label="So sánh hiệu quả đầu tư Sunwah Pearl" className="bg-[#f5efde]">
        <AutoHeightIframe
          observeContentSize
          contentBottomSelector=".comparison"
          frameId="sunwah-pearl-comparison"
          title="Sunwah Pearl – So sánh hiệu quả đầu tư"
          src="/landing/sunwah-pearl/comparison.html?v=20261118-2"
        />
      </section>

      <section id="mat-bang-tong-the" aria-label="Mặt bằng tổng thể Sunwah Pearl" className="bg-[#f4f3f0]">
        {/* These panels already include the reference's titles and backgrounds. */}
        <button type="button" onClick={() => setActivePlan(0)} aria-label="Phóng lớn mặt bằng tổng thể Sunwah Pearl" aria-haspopup="dialog" className="block w-full cursor-zoom-in focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#500347]">
          {/* eslint-disable-next-line @next/next/no-img-element -- Serve pre-optimized lossless panels without another image transform. */}
          <img {...floorPlans[0]} alt={floorPlans[0].alt} loading="lazy" decoding="async" className="block h-auto w-full" />
        </button>
      </section>

      <section id="mat-bang-tang" aria-label="Mặt bằng tầng White House, Silver House và Golden House" className="bg-[#f4f3f0]">
        {floorPlans.slice(1).map((plan, index) => (
          <button type="button" key={plan.src} onClick={() => setActivePlan(index + 1)} aria-label={`Phóng lớn ${plan.alt}`} aria-haspopup="dialog" className="block w-full cursor-zoom-in focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#500347]">
            {/* eslint-disable-next-line @next/next/no-img-element -- Serve pre-optimized lossless panels without another image transform. */}
            <img {...plan} alt={plan.alt} loading="lazy" decoding="async" className="block h-auto w-full" />
          </button>
        ))}
      </section>

      {activePlan >= 0 && <LayoutLightbox index={activePlan} slides={floorPlans} close={() => setActivePlan(-1)} />}

      <section id="tu-van-tai-san" aria-label="Tư vấn quản lý tài sản cùng ERA Real Estate" className="bg-[#f5efde]">
        <AutoHeightIframe
          observeContentSize
          contentBottomSelector=".consultation"
          frameId="sunwah-pearl-consultation"
          title="Sunwah Pearl – Tư vấn quản lý tài sản cùng ERA Real Estate"
          src="/landing/sunwah-pearl/consultation.html?v=20261118-3"
        />
      </section>

      <section id="dang-ky-tu-van" aria-label="Đăng ký tư vấn Sunwah Pearl" className="bg-[#f8f3e4]">
        <AutoHeightIframe
          observeContentSize
          contentBottomSelector=".registration"
          frameId="sunwah-pearl-registration"
          title="Sunwah Pearl – Đăng ký tư vấn"
          src="/landing/sunwah-pearl/registration.html?v=20261118-6"
        />
      </section>
    </main>
  );
}
