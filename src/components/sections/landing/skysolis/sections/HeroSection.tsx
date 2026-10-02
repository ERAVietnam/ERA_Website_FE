"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";

const FACTS = [
  { b: "~55", small: "triệu/m²", span: "Giá trung bình" },
  { b: "Đến 10%", span: "Ưu đãi chiết khấu" },
  { b: "30 tháng", span: "Hỗ trợ lãi vay" },
];

export function HeroSection() {
  return (
    <section className="hero" aria-label="Giới thiệu SkySOLIS">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/skysolis-hero-mobile.webp`} />
        <Image
          src={`${IMG}/skysolis-hero-thap-can-ho-quoc-lo-13-lai-thieu.webp`}
          alt="Phối cảnh SkySOLIS: tháp căn hộ 40 tầng bên Đại lộ Bình Dương (Quốc lộ 13) và tuyến metro trên cao, phường Lái Thiêu"
          width={1600}
          height={896}
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </picture>
      <div className="hero-scrim" aria-hidden="true"></div>
      <div className="hero-in" style={{ paddingLeft: "clamp(80px, 12vw, 216px)" }}>
        <Reveal>
          <div className="hero-box">
            <h1>
              SkySOLIS <em>Khai mở tiềm năng vùng đất di sản</em>
            </h1>
            <p className="hero-sub">
              SkySOLIS là dự án căn hộ cao tầng đầu tiên tại Việt Nam của SkyWorld Development, nhà
              phát triển bất động sản đến từ Malaysia. Dự án nằm tại số 88/10 Đại lộ Bình Dương
              (Quốc lộ 13), phường Lái Thiêu, TP.HCM (trước ngày 1/7/2025 thuộc TP. Thuận An, tỉnh
              Bình Dương).
            </p>
            <ul className="hero-facts">
              {FACTS.map((f) => (
                <li key={f.b}>
                  <b>
                    {f.b}
                    {f.small && <small> {f.small}</small>}
                  </b>
                  <span>{f.span}</span>
                </li>
              ))}
            </ul>
            <p className="hero-note">
              Giá tham khảo; ưu đãi theo Chính sách bán hàng ngày 14/09/2026 của SkyWorld — xem mục
              Chính sách.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
