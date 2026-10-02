"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { CDT_STATS, DA_BG } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function InvestorSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-sand" id="chu-dau-tu">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>
              Nhà phát triển SkyWorld Development{" "}
              <span className="dong2">Cam kết chất lượng QLASSIC</span>
            </h2>
          </div>
        </Reveal>

        <div className="cdt">
          <Reveal>
            <div>
              <div className="cdt-logo">
                <Image
                  src={`${IMG}/skysolis-chu-dau-tu-skyworld-logo.webp`}
                  alt="Logo SkyWorld Development – nhà phát triển dự án SkySOLIS"
                  width={480}
                  height={117}
                  loading="lazy"
                />
              </div>
              <p className="body">
                SkyWorld Development: nhà phát triển BĐS Malaysia, hơn 20 năm kinh nghiệm, phát
                triển đô thị thông minh và thân thiện môi trường. SkySOLIS là dự án đầu tiên tại
                Việt Nam.
              </p>
              <div className="so-lieu">
                {CDT_STATS.map((s) => (
                  <div key={s.span}>
                    <b>{s.b}</b>
                    <span>{s.span}</span>
                  </div>
                ))}
              </div>
              <div className="ql">
                <Image
                  src={`${IMG}/skysolis-skyworld-chung-nhan-qlassic-cidb-malaysia.webp`}
                  alt="Logo hệ thống đánh giá chất lượng xây dựng QLASSIC và Cơ quan Phát triển Ngành Xây dựng CIDB Malaysia"
                  width={420}
                  height={428}
                  loading="lazy"
                />
                <p>
                  <b>Cam kết chất lượng QLASSIC:</b> QLASSIC (Quality Assessment System in
                  Construction) là hệ thống chấm điểm chất lượng thi công – hoàn thiện do CIDB (Cơ
                  quan Phát triển Ngành Xây dựng Malaysia) ban hành, giúp đánh giá chất lượng bàn
                  giao một cách độc lập.
                </p>
              </div>
              <p className="note" style={{ margin: "0 0 10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Dự án đã bàn giao tại Malaysia
              </p>
              <ul className="da-bg">
                {DA_BG.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <figure
              className="map-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/skysolis-skyworld-du-an-da-ban-giao-malaysia-diem-qlassic-1990.webp`,
                  "Dự án SkyWorld tại Malaysia và điểm QLASSIC"
                )
              }
            >
              <Image
                src={`${IMG}/skysolis-skyworld-du-an-da-ban-giao-malaysia-diem-qlassic.webp`}
                alt="Các dự án SkyWorld đã bàn giao tại Malaysia kèm điểm QLASSIC: The Valley, Curvo, EdgeWood Residence, SkyLuxe, SkyVogue"
                width={1000}
                height={1344}
                sizes="(max-width: 900px) 100vw, 560px"
                loading="lazy"
              />
              <figcaption className="fcap">
                Dự án SkyWorld tại Malaysia và điểm QLASSIC · bấm để phóng to
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
