"use client";

import Image from "next/image";
import { CTA_BULLETS } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";

/* Khối CTA cuối trang — landing cho SALE: KHÔNG form, KHÔNG hotline.
   Khách nhận tài liệu qua chuyên viên ERA đã gửi trang. */
export function CtaSection() {
  return (
    <section className="cta" id="dang-ky">
      <Image
        src={`${IMG}/the-westique-residences-phoi-canh-ve-dem-800.webp`}
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
            <h2>
              Nhận trọn bộ tài liệu <span className="nw">The Westique Residences</span>
            </h2>
            <p className="lead">
              Sống có chất, ở có gu – chọn căn đẹp trong 99 sản phẩm giới hạn cùng chuyên viên ERA
              Vietnam.
            </p>
            <ul>
              {CTA_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="ket">
              Liên hệ chuyên viên ERA đã gửi bạn trang này để nhận tài liệu và hẹn lịch tham quan.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
