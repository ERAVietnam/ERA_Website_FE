"use client";

import Image from "next/image";
import { OPERATOR, PARTNERS_IMG, TBS_STATS } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function InvestorSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-paper" id="chu-dau-tu">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="kick">Vận hành &amp; phát triển</p>
            <h2>Vận hành bởi Savills – Phát triển bởi TBS Land</h2>
          </div>
        </Reveal>

        <div className="cdt">
          <Reveal>
            <div className="sv">
              <figure onClick={() => openLightbox(OPERATOR.fig.src, "TBS Land và Savills hợp tác vận hành")}>
                <Image
                  src={OPERATOR.fig.src}
                  width={OPERATOR.fig.w}
                  height={OPERATOR.fig.h}
                  loading="lazy"
                  decoding="async"
                  alt={OPERATOR.fig.alt}
                />
              </figure>
              <div className="nd">
                <h3>{OPERATOR.h3}</h3>
                {OPERATOR.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="tbs">
              <svg className="hoa" viewBox="0 0 560 560" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M0 140H560M0 280H560M140 0V560M280 0V560M420 0V560" />
                <path d="M280 0A280 280 0 0 0 560 280M140 140A140 140 0 0 1 280 280M420 280A140 140 0 0 0 560 420" />
              </svg>
              <Image
                className="logo"
                src={`${IMG}/tbs-land-logo-vang.webp`}
                width={480}
                height={114}
                loading="lazy"
                decoding="async"
                alt="Logo TBS Land"
              />
              <h3>TBS Land – thành viên TBS Group</h3>
              <p>
                Khởi nguồn từ Thái Bình, TBS Group lớn mạnh thành tập đoàn sản xuất đa ngành, xuất
                khẩu đến 70 quốc gia. TBS Land kế thừa nền tảng R&amp;D và năng lực vận hành của
                tập đoàn để phát triển bất động sản bền vững.
              </p>
              <ul className="tbs-so" aria-label="TBS Group qua những con số">
                {TBS_STATS.map((t) => (
                  <li key={t.span}>
                    <b>{t.b}</b>
                    <span>{t.span}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <figure className="dt" onClick={() => openLightbox(PARTNERS_IMG.src, "Đối tác Green Skyline")}>
            <Image
              src={PARTNERS_IMG.src800 ?? PARTNERS_IMG.src}
              width={PARTNERS_IMG.w}
              height={PARTNERS_IMG.h}
              loading="lazy"
              decoding="async"
              alt={PARTNERS_IMG.alt}
            />
            <figcaption className="fcap">Bảo chứng chất lượng cùng các đối tác uy tín</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
