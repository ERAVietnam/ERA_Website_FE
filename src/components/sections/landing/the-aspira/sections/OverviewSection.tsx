"use client";

import Image from "next/image";
import { INTRO, OVERVIEW_STATS, SPEC_ROWS } from "../data";
import { IMG } from "../theme";
import { AMark, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="tong-quan">
      <div className="wrap">
        <Reveal>
          <div className="gt-in">
            <figure
              className="gt-fig"
              onClick={() =>
                openLightbox(`${IMG}/the-aspira-phoi-canh-2-thap-ve-dem.webp`, "Phối cảnh 2 tháp The Aspira về đêm")
              }
            >
              <Image
                src={`${IMG}/the-aspira-phoi-canh-2-thap-ve-dem-800.webp`}
                width={1000}
                height={884}
                loading="lazy"
                decoding="async"
                alt="Phối cảnh 2 tháp The Aspira về đêm: mặt đứng sáng đèn, khối đế thương mại và lối vào rợp cây"
              />
            </figure>
            <div className="gt-txt">
              <p className="kick-s">{INTRO.kick}</p>
              <h2 className="gt-h">{INTRO.h2}</h2>
              <p className="body">{INTRO.body1}</p>
              <p className="body">{INTRO.body2}</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="head">
            <AMark />
            <h2>
              Tổng quan dự án <span className="nw">The Aspira</span>{" "}
              <span className="dong2">2 tháp · 30 tầng · 1.212 sản phẩm trên khu đất 9.372 m²</span>
            </h2>
          </div>
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
            className="ov-fig"
            onClick={() =>
              openLightbox(
                `${IMG}/the-aspira-phoi-canh-toan-khu-ho-boi-noi-khu.webp`,
                "Phối cảnh toàn khu The Aspira"
              )
            }
          >
            <Image
              src={`${IMG}/the-aspira-phoi-canh-toan-khu-ho-boi-noi-khu.webp`}
              width={1200}
              height={674}
              loading="lazy"
              decoding="async"
              alt="Phối cảnh toàn khu The Aspira nhìn từ trên cao: 2 tháp căn hộ, hồ bơi nội khu và mảng xanh tầng trệt"
            />
            <figcaption className="fcap">Phối cảnh toàn khu The Aspira · bấm để phóng to</figcaption>
          </figure>
          <Reveal delay={0.1}>
            <table className="spec">
              <caption className="sr">Thông số tổng quan The Aspira</caption>
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
      </div>
    </section>
  );
}
