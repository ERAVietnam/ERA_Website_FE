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
        src={`${IMG}/celesta-gold-khu-do-thi-celesta-hoang-hon-800.webp`}
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
              Đăng ký nhận thông tin tư vấn dự án <span className="nw">Celesta Gold</span>
            </h2>
            <p className="lead">
              Nhận bảng giá, bảng tính dòng tiền theo từng loại căn và tư vấn suất ưu tiên từ ERA
              Vietnam.
            </p>
            <ul>
              {CTA_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="ket">
              Liên hệ chuyên viên ERA đã gửi bạn trang này để nhận tài liệu và hẹn lịch tư vấn.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
