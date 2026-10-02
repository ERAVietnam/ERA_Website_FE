"use client";

import { useState } from "react";
import Image from "next/image";
import { IMG } from "../theme";
import { LEGEND, MB_STATS, STACK, TOWER_TABS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function MasterPlanSection() {
  const [tower, setTower] = useState(TOWER_TABS[0].key);
  const openLightbox = useLightbox();
  const current = TOWER_TABS.find((t) => t.key === tower) ?? TOWER_TABS[0];

  return (
    <section className="sec bg-cream" id="mat-bang">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Mặt bằng Nam Mekong Grand Plaza</h2>
            <p className="body" style={{ marginTop: 18 }}>
              Tại Nam Mekong Grand Plaza, ngôn ngữ kiến trúc không chỉ dừng lại ở sự tráng lệ bề
              ngoài mà còn thể hiện qua sự tỉ mỉ, khoa học trong từng nét vẽ quy hoạch mặt bằng.
              Lấy cảm hứng từ phong cách sống hiện đại và tư duy thiết kế sinh thái, chủ đầu tư Nam
              Mê Kông đã kiến tạo nên một không gian sống nơi con ngườI và thiên nhiên giao hòa
              trọn vẹn, đồng thờI tối ưu hoá tối đa công năng sử dụng.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="stats">
            {MB_STATS.map((s) => (
              <div key={s.span}>
                <b>{s.b}</b>
                <span>{s.span}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <figure
            className="mb-fig"
            onClick={() =>
              openLightbox(
                `${IMG}/nam-mekong-grand-plaza-mat-bang-tong-the-tien-ich-3000.webp`,
                "Mặt bằng tổng thể & tiện ích Nam Mekong Grand Plaza"
              )
            }
          >
            <Image
              src={`${IMG}/nam-mekong-grand-plaza-mat-bang-tong-the-tien-ich.webp`}
              alt="Mặt bằng tổng thể Nam Mekong Grand Plaza: hai tháp so le, quảng trường đài phun nước, vườn cảnh quan và tiện ích tầng 1"
              width={1400}
              height={810}
              sizes="(max-width: 1224px) 100vw, 1180px"
              loading="lazy"
            />
            <figcaption className="fcap">
              Mặt bằng tổng thể &amp; tiện ích · bấm để phóng to, xem số thứ tự từng tiện ích
            </figcaption>
          </figure>
        </Reveal>

        <div className="mb2">
          <Reveal>
            <div>
              <p className="body">
                <b>Bố trí hai tòa tháp tối ưu:</b> dự án gồm 2 tòa tháp (Tháp A: 905 căn, Tháp B:
                717 căn) cao 30 tầng được thiết kế lệch nhau. Kiến trúc so le giúp hạn chế góc
                khuất, luân chuyển luồng gió tự nhiên xuyên suốt và mở tầm nhìn về hướng trung tâm
                Thành phố mới Bình Dương.
              </p>
              <p className="body">
                Hệ thống các tầng tại Nam Mekong Grand Plaza được phân tách rõ ràng, phục vụ tiêu
                chuẩn sống “All-in-one”:
              </p>
              <ol className="stack" aria-label="Phân tầng công năng">
                {STACK.map((s) => (
                  <li key={s.b} className={`${s.hl ? "hl " : ""}${s.ham ? "ham" : ""}`.trim()}>
                    <b>{s.b}</b>
                    <span>{s.span}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <figure
              className="mb-fig"
              style={{ boxShadow: "none" }}
              onClick={() =>
                openLightbox(
                  `${IMG}/nam-mekong-grand-plaza-hai-thap-so-le-30-tang.webp`,
                  "Hai tháp so le 30 tầng — cầu nối kỹ thuật tại tầng 20"
                )
              }
            >
              <Image
                src={`${IMG}/nam-mekong-grand-plaza-hai-thap-so-le-30-tang.webp`}
                alt="Hai tháp so le 30 tầng của Nam Mekong Grand Plaza với cầu nối kỹ thuật và gian lánh nạn tại tầng 20"
                width={1000}
                height={562}
                sizes="(max-width: 900px) 100vw, 570px"
                loading="lazy"
              />
              <figcaption className="fcap">Cầu nối kỹ thuật giữa hai tháp tại tầng 20</figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="dh">
          <Reveal>
            <div className="head" style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: "clamp(20px,2.2vw,28px)" }}>Mặt bằng tầng điển hình</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="tabs" role="tablist" aria-label="Chọn tháp">
              {TOWER_TABS.map((t) => (
                <button
                  key={t.key}
                  className="tab"
                  role="tab"
                  type="button"
                  aria-selected={tower === t.key}
                  onClick={() => setTower(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <figure
              className="pane mb-fig"
              role="tabpanel"
              aria-label={current.label}
              onClick={() => openLightbox(`${current.src.replace(".webp", "-3000.webp")}`, current.cap)}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={current.w}
                height={current.h}
                sizes="(max-width: 1224px) 100vw, 1180px"
                loading="lazy"
              />
              <figcaption className="fcap">{current.cap}</figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <dl className="loai-can" aria-label="Chú thích màu loại căn">
              {LEGEND.map((l) => (
                <div key={l.label}>
                  <dt style={{ background: l.color }}></dt>
                  <dd>{l.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
