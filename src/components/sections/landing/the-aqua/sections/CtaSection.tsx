"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";

const BULLETS = [
  "Xem các dòng Harborfront, Riverfront, Canal và Garden Grand Villa",
  "Đi một vòng Waterpoint: Vịnh Cảng, công viên ven sông, EMASI Plus",
  "Hẹn lịch tham quan cùng chuyên viên ERA đã gửi bạn trang này",
];

/* CTA cuối trang — theo mẫu: không form, không hotline */
export function CtaSection() {
  return (
    <section className="cta" id="tham-quan">
      <Image
        src={`${IMG}/the-aqua-ho-boi-san-vuon-biet-thu.webp`}
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
            <h2>Đăng ký tham quan The Aqua</h2>
            <p className="serif-lead">
              Trực tiếp trải nghiệm Chất riêng bên Vịnh Cảng tại The Aqua – Waterpoint.
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
