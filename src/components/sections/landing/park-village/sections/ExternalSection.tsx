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
            <p className="serif-lead">Dùng chung hệ tiện ích của khu đô thị Waterpoint 355 ha.</p>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">
            Cư dân Park Village dùng chung tiện ích của khu đô thị Waterpoint: River Club và bến du
            thuyền, công viên bờ sông, công viên bờ kênh, trường mầm non nội khu và Trường quốc tế
            song ngữ EMASI Plus.
          </p>
        </Reveal>

        <Reveal>
          <div className="nk">
            {NK_CARDS.map((c) => (
              <figure className="nk-card" key={c.b}>
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={c.w}
                  height={c.h}
                  sizes="(max-width: 760px) 100vw, 580px"
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

        <Reveal>
          <p className="nk-note">
            <b>Trường mầm non nội khu</b> cho các bé, gần nhà trong khu đô thị Waterpoint.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
