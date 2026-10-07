"use client";

import Image from "next/image";
import { INTRO } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function IntroSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="gioi-thieu">
      <div className="wrap gtt">
        <Reveal>
          <div>
            <div className="head">
              <p className="kick">{INTRO.kick}</p>
              <h2>{INTRO.h2}</h2>
            </div>
            <div className="body">
              {INTRO.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <a
              className="nut"
              href="#dang-ky"
              style={{ marginTop: 12 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Đăng ký tham quan căn hộ mẫu{" "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <figure onClick={() => openLightbox(INTRO.fig.src, "4 tháp Green Skyline đã cất nóc")}>
            <Image
              src={INTRO.fig.src}
              width={INTRO.fig.w}
              height={INTRO.fig.h}
              loading="lazy"
              decoding="async"
              alt={INTRO.fig.alt}
            />
            <figcaption className="fcap">
              <span className="that">Ảnh thực tế</span> 4 tháp Green Skyline đã cất nóc · tháng
              03/2026 · bấm để phóng to
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
