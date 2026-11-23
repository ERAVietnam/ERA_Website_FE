"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AutoHeightIframe from "@/components/landing/AutoHeightIframe";
import SunwahPearlSitePlan from "./SunwahPearlSitePlan";
import SunwahPearlUnitPlan from "./SunwahPearlUnitPlan";

const LayoutLightbox = dynamic(() => import("./SunwahPearlLayoutLightbox"), { ssr: false });
const floorPlans = [
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-site-plan-clean.webp", width: 1437, height: 874, alt: "Mặt bằng tổng thể Sunwah Pearl" },
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-white-house.webp", width: 1432, height: 874, alt: "WHITE HOUSE – mặt bằng tầng điển hình" },
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-silver-house.webp", width: 1439, height: 874, alt: "SILVER HOUSE – mặt bằng tầng điển hình" },
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-golden-house.webp", width: 1440, height: 874, alt: "GOLDEN HOUSE – mặt bằng tầng điển hình" },
];
const mobileFloorPlans = [
  floorPlans[0],
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-golden-house-mobile.webp", width: 319, height: 526, alt: floorPlans[3].alt },
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-white-house-mobile.webp", width: 320, height: 527, alt: floorPlans[1].alt },
  { src: "/landing/sunwah-pearl/assets/sunwah-pearl-silver-house-mobile.webp", width: 319, height: 528, alt: floorPlans[2].alt },
];

export function SunwahPearlResidentialLanding() {
  const [activePlan, setActivePlan] = useState(-1);
  const [lightboxPlans, setLightboxPlans] = useState(floorPlans);
  const openPlan = (index: number, mobileIndex = index) => {
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    setLightboxPlans(isMobile ? mobileFloorPlans : floorPlans);
    setActivePlan(isMobile ? mobileIndex : index);
  };

  return (
    <main className="bg-[#f8f3e4] text-[#500347]">
      <section id="gioi-thieu" aria-label="Sunwah Pearl – Nâng tầm chất lượng cuộc sống">
        <AutoHeightIframe
          observeContentSize
          contentBottomSelector=".overview"
          frameId="sunwah-residential-overview"
          title="Sunwah Pearl – Không gian sống, kết nối và tiện ích"
          src="/landing/sunwah-pearl-mua-o/overview.html?v=20261118-8"
        />
      </section>
      <section id="mat-bang" aria-label="Mặt bằng tổng thể và các tòa nhà Sunwah Pearl">
        <SunwahPearlSitePlan imageSrc={floorPlans[0].src} onOpenPlan={openPlan} />
        {floorPlans.slice(1).map((plan, index) => (
          <div key={plan.src}>
            <div className="hidden min-[641px]:block"><SunwahPearlUnitPlan house={index === 0 ? "white" : index === 1 ? "silver" : "golden"} onOpenPlan={() => openPlan(index + 1)} /></div>
            {index !== 1 && <div className="min-[641px]:hidden"><SunwahPearlUnitPlan house={index === 0 ? "golden" : "silver"} mobile onOpenPlan={() => openPlan(index + 1)} /></div>}
            {index === 1 && <button type="button" onClick={() => openPlan(index + 1)} aria-label="Phóng lớn mặt bằng Sunwah Pearl" aria-haspopup="dialog" className="block w-full cursor-zoom-in focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#500347] min-[641px]:hidden">
              <picture>
                <source media="(max-width: 640px)" srcSet={mobileFloorPlans[index + 1].src} width={mobileFloorPlans[index + 1].width} height={mobileFloorPlans[index + 1].height} />
                <img {...plan} alt="Mặt bằng tầng điển hình Sunwah Pearl" loading="lazy" decoding="async" className="block h-auto w-full" />
              </picture>
            </button>}
          </div>
        ))}
      </section>
      {activePlan >= 0 && <LayoutLightbox index={activePlan} slides={lightboxPlans} close={() => setActivePlan(-1)} render={{
        slide: ({ slide, rect }) => {
          if (slide.src === floorPlans[0].src) return <SunwahPearlSitePlan imageSrc={slide.src} width={Math.min(rect.width, rect.height * 1437 / 874, 1437)} />;
          const house = slide.src.includes("/sunwah-pearl-white-house") ? "white" : slide.src.includes("/sunwah-pearl-silver-house") ? "silver" : slide.src.includes("/sunwah-pearl-golden-house") ? "golden" : null;
          const mobile = slide.src.endsWith("-mobile.webp");
          if (house && !(house === "white" && mobile)) {
            const width = slide.width!;
            const height = slide.height!;
            return <SunwahPearlUnitPlan key={slide.src} house={house} mobile={mobile} width={Math.min(rect.width, rect.height * width / height, width)} />;
          }
          return undefined;
        },
      }} />}
      <section id="trai-nghiem-thuc-te" aria-label="Trải nghiệm thực tế cùng đội ngũ ERA Real Estate">
        <AutoHeightIframe
          observeContentSize
          contentBottomSelector=".consultation"
          frameId="sunwah-residential-consultation"
          title="Sunwah Pearl – Trải nghiệm thực tế cùng ERA"
          src="/landing/sunwah-pearl-mua-o/consultation.html?v=20261118-1"
        />
      </section>
      <section id="dang-ky-tu-van" aria-label="Đăng ký tư vấn căn hộ Sunwah Pearl mua ở">
        <AutoHeightIframe
          observeContentSize
          contentBottomSelector=".registration"
          frameId="sunwah-residential-registration"
          title="Sunwah Pearl – Đăng ký tư vấn mua ở"
          src="/landing/sunwah-pearl-mua-o/registration.html?v=20261118-1"
        />
      </section>
    </main>
  );
}
