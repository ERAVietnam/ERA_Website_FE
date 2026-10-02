"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { CTA_BULLETS } from "../data";
import { Reveal } from "../Reveal";

/* CTA cuối trang — theo mẫu: không form (landing SALE) */
export function CtaSection() {
  return (
    <section className="cta" id="dang-ky">
      <Image
        src={`${IMG}/skysolis-toan-canh-lai-thieu-ve-dem.webp`}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="cta-shade" aria-hidden="true"></div>
      <div className="cta-in">
        <Reveal>
          <div className="cta-box">
            <h2>Tài chính thảnh thơi – An tâm sống một đờI đáng giá</h2>
            <p className="serif-lead">
              Nhận trọn bộ hồ sơ dự án: pháp lý, chính sách ưu đãi, brochure – kèm tư vấn 1:1 từ
              chuyên viên ERA Vietnam.
            </p>
            <ul>
              {CTA_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="nha-mau">
              Văn phòng kinh doanh &amp; nhà mẫu SkySOLIS: 179 Lý Chính Thắng, phường Xuân Hòa,
              TP.HCM
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
