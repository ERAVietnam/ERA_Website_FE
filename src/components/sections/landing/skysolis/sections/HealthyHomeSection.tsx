"use client";

import Image from "next/image";
import { GALLERY, HH_ITEMS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function HealthyHomeSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="healthy-home">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Healthy Home – Nâng tầm phong cách sống</h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">Không gian sống được thiết kế quanh 4 yếu tố nuôi dưỡng sức khỏe:</p>
        </Reveal>

        <Reveal>
          <ol className="hh">
            {HH_ITEMS.map((it) => (
              <li key={it.i}>
                <figure>
                  <Image src={it.src} alt={it.alt} width={it.w} height={it.h} loading="lazy" />
                </figure>
                <div className="in">
                  <i>{it.i}</i>
                  <b>{it.b}</b>
                  <p>{it.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <div className="kien-truc">
            <b>Mặt đứng gợn sóng – giải pháp khí hậu</b>
            <p>
              Hệ mặt đứng hướng Đông – Tây với những đường cắt không vuông góc giúp hạn chế nắng
              Tây chiếu thẳng vào căn hộ, giảm hấp thụ nhiệt qua tường để căn hộ mát hơn. Hành lang
              thông gió tự nhiên.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="gal-h">Thư viện căn hộ mẫu</h3>
        </Reveal>
        <Reveal>
          <div className="gal">
            {GALLERY.map((g) => (
              <figure key={g.cap} onClick={() => openLightbox(g.src, g.cap)}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={g.w}
                  height={g.h}
                  sizes="(max-width: 760px) 50vw, 390px"
                  loading="lazy"
                />
                <figcaption>{g.cap}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 14 }}>
            Nội thất định hướng thiết kế trên layout thực tế, mang tính chất minh họa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
