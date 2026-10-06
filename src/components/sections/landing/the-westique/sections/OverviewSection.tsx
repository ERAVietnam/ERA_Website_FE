"use client";

import Image from "next/image";
import { OVERVIEW_FACT, OVERVIEW_STATS, SONG_STATS, SPEC_ROWS } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="tong-quan">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <img className="ky" src={`${IMG}/the-westique-residences-chu-ky-chat.svg`} width={159} height={68} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <h2>
              Tổng quan dự án <span className="nw">The Westique Residences</span>{" "}
              <span className="dong2">Tinh tuyển bởi sự giới hạn</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">{OVERVIEW_FACT}</p>
        </Reveal>

        <Reveal>
          <div className="stats">
            {OVERVIEW_STATS.map((s) => (
              <div key={s.span}>
                <b>{s.b}</b>
                <span>{s.span}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="ov">
          {/* figure phải là grid item trực tiếp của .ov để sticky ăn — không bọc Reveal */}
          <figure
            className="ov-fig ov-tach"
            onClick={() =>
              openLightbox(
                `${IMG}/the-westique-residences-phoi-canh-thap-15-tang-ban-ngay-phong-to.webp`,
                "Phối cảnh ban ngày The Westique Residences: tháp 15 tầng trên mặt tiền Kinh Dương Vương"
              )
            }
          >
            <Image
              src={`${IMG}/the-westique-residences-thap-15-tang-ban-ngay-kinh-duong-vuong.webp`}
              width={810}
              height={1520}
              loading="lazy"
              decoding="async"
              alt="Phối cảnh ban ngày The Westique Residences: tháp 15 tầng mặt kính, khối đế shophouse và hàng cây dọc Kinh Dương Vương"
            />
            <figcaption className="fcap">Tháp 15 tầng trên mặt tiền Kinh Dương Vương · bấm để phóng to</figcaption>
          </figure>
          <Reveal delay={0.1}>
            <table className="spec">
              <caption className="sr">Thông số tổng quan The Westique Residences</caption>
              <tbody>
                {SPEC_ROWS.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

        <Reveal>
          <ul className="song">
            {SONG_STATS.map((s) => (
              <li key={s.i}>
                <i>{s.i}</i>
                <b>{s.b}</b>
                <span>{s.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
