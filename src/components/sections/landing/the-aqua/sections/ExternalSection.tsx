"use client";

import Image from "next/image";
import { NK_CARDS } from "../data";
import { Reveal } from "../Reveal";

export function ExternalSection() {
  return (
    <section className="sec" id="ngoai-khu">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Tiện ích ngoại khu</h2>
            <p className="serif-lead">Dùng chung hệ tiện ích của khu đô thị Waterpoint 355 ha</p>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">
            Cư dân The Aqua dùng chung tiện ích của khu đô thị Waterpoint: công viên bờ sông, công
            viên bờ kênh, trường mầm non nội khu, Trường quốc tế song ngữ EMASI Plus cùng clubhouse
            và bến thuyền ven sông.
          </p>
        </Reveal>

        <Reveal>
          <div className="nk">
            {NK_CARDS.map((c) => (
              <figure className={`nk-card${c.rong ? " rong" : ""}`} key={c.b}>
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={c.w}
                  height={c.h}
                  sizes={c.rong ? "(max-width: 760px) 100vw, 1180px" : "(max-width: 760px) 100vw, 580px"}
                  loading="lazy"
                />
                <figcaption>
                  <b>{c.b}</b>
                  <span>{c.span}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
