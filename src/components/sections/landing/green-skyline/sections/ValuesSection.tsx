"use client";

import Image from "next/image";
import { VALUES } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function ValuesSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-paper" id="gia-tri">
      <div className="wrap">
        <Reveal>
          <div className="head c">
            <p className="kick">3 giá trị cốt lõi</p>
            <h2>
              Sản phẩm thật – Trải nghiệm thật – <span className="nw">Giá trị thật</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <ul className="gtri" aria-label="3 giá trị thật của Green Skyline">
            {VALUES.map((v) => (
              <li key={v.so}>
                <figure onClick={() => openLightbox(v.img, v.h3)}>
                  <Image
                    src={v.img}
                    width={v.w}
                    height={v.h}
                    loading="lazy"
                    decoding="async"
                    alt={v.alt}
                  />
                  <span className="that">Ảnh thực tế</span>
                </figure>
                <div className="nd">
                  <span className="so">{v.so}</span>
                  <h3>{v.h3}</h3>
                  <p>{v.p}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
