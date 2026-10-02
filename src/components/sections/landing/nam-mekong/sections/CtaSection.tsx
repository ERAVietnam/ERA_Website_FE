"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";

const BULLETS = [
  "Nhà mẫu căn 2 phòng ngủ (65 m²) và 3 phòng ngủ (85 m²) đã sẵn sàng đón khách",
  "Văn phòng bán hàng trên đường Lê Hoàn, Thành phố mới Bình Dương",
  "Hẹn lịch tham quan cùng chuyên viên ERA đã gửi bạn trang này",
];

/* CTA cuối trang — theo mẫu: KHÔNG form, KHÔNG hotline (landing SALE) */
export function CtaSection() {
  return (
    <section className="cta" id="tham-quan">
      <Image
        src={`${IMG}/nam-mekong-grand-plaza-hai-thap-ve-dem-tu-tren-cao.webp`}
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
            <h2>Đăng ký tham quan Nam Mekong Grand Plaza</h2>
            <p className="lead">
              Trải nghiệm chất sống all-in-one của sản phẩm căn hộ cao cấp giữa tâm điểm giao
              thương WTC sầm uất.
            </p>
            <ul>
              {BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
