"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMG } from "../theme";
import { LOCATION_TABS, KCN } from "../data";
import { useLightbox } from "./Lightbox";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

export function LocationSection() {
  const [tab, setTab] = useState("bo");
  const openLightbox = useLightbox();
  const current = LOCATION_TABS.find((t) => t.key === tab) ?? LOCATION_TABS[0];

  return (
    <section className="sec bg-cream" id="vi-tri" style={{ scrollMarginTop: 74 }}>
      <div className="wrap">
        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="head">
          <h2>Vị trí Rivera Nagomi</h2>
          <p className="serif-lead">Giữa trục đường bộ lên TP.HCM và hệ sông ngòi về miền Tây.</p>
        </motion.div>

        <motion.p
          {...fadeUp}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="body center"
          style={{ maxWidth: 880, marginTop: 0, marginBottom: "clamp(24px,2.6vw,34px)", textAlign: "center" }}
        >
          Rivera Nagomi nằm trong khu đô thị Waterpoint, khu vực Bắc Bến Lức, nơi tiếp giáp cả
          trục giao thông đường bộ lẫn hệ thống sông ngòi phía Nam. Từ phân khu, cư dân kết nối
          cao tốc TP.HCM – Trung Lương và Quốc lộ 1 để về TP.HCM hoặc đi các tỉnh Đồng bằng sông
          Cửu Long.
        </motion.p>

        <motion.figure
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="map-fig"
        >
          <button
            type="button"
            onClick={() =>
              openLightbox(
                `${IMG}/waterpoint-ban-do-vi-tri-vanh-dai.webp`,
                "Bản đồ vị trí khu đô thị Waterpoint tại Bến Lức"
              )
            }
            aria-label="Phóng to bản đồ vị trí"
            style={{ display: "block", width: "100%", border: 0, padding: 0, cursor: "zoom-in", background: "none" }}
          >
            <Image
              src={`${IMG}/waterpoint-ban-do-vi-tri-vanh-dai.webp`}
              alt="Bản đồ vị trí Waterpoint tại Bến Lức, kết nối Vành đai 3, Vành đai 4, cao tốc TP.HCM – Trung Lương và sân bay Long Thành"
              width={1920}
              height={1104}
              sizes="(max-width: 1144px) 100vw, 1100px"
              className="h-auto w-full"
            />
          </button>
          <figcaption className="fcap">
            Bản đồ vị trí khu đô thị Waterpoint tại Bến Lức, giữa Vành đai 3 và Vành đai 4, cạnh
            cao tốc TP.HCM – Trung Lương
          </figcaption>
        </motion.figure>

        <div style={{ marginTop: "clamp(30px,3.4vw,46px)" }}>
          <motion.div {...fadeUp} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="tabs" role="tablist" aria-label="Chọn hình thức kết nối">
            {LOCATION_TABS.map((t) => (
              <button
                key={t.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </motion.div>

          <div className="pane route" role="tabpanel" aria-label={current.title}>
            <figure className="route-fig">
              <button
                type="button"
                onClick={() => openLightbox(current.fig, current.title)}
                aria-label={`Phóng to sơ đồ ${current.title}`}
                style={{ display: "block", width: "100%", height: "100%", border: 0, padding: 0, cursor: "zoom-in", background: "none" }}
              >
                <Image
                  src={current.fig}
                  alt={current.figAlt}
                  width={1742}
                  height={980}
                  sizes="(max-width: 860px) 100vw, 700px"
                  className="h-full w-full object-cover"
                />
              </button>
            </figure>
            <div className="route-card">
              <h3>{current.title}</h3>
              <p className="body" style={{ fontSize: 15, margin: "10px 0 0" }}>
                {current.desc}
              </p>
              {current.routes.map((r) => (
                <div className="rt" key={r.t + r.label}>
                  <b>{r.t}</b>
                  <span>{r.label}</span>
                </div>
              ))}
              {current.groups.map((g) => (
                <div key={g.sub}>
                  <div className="sub">{g.sub}</div>
                  {g.items.map((it) => (
                    <div className="rt" key={it.t}>
                      <b className="alt">{it.t}</b>
                      <span>{it.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.p
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="body center"
          style={{ maxWidth: 860, margin: "clamp(26px,3vw,38px) auto 0", textAlign: "center" }}
        >
          Khu vực này cũng gần các khu công nghiệp Thuận Đạo, Vĩnh Lộc 2 và Phúc Long — nguồn cầu
          nhà ở của chuyên gia và người lao động tại chỗ.
        </motion.p>
        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="kcn">
          {KCN.map((k) => (
            <div key={k.name}>
              <b>{k.name}</b>
              <span>{k.place}</span>
            </div>
          ))}
        </motion.div>
        <p className="note center" style={{ textAlign: "center", marginTop: 16 }}>
          Thời gian di chuyển theo tài liệu của chủ đầu tư, mang tính tham khảo và phụ thuộc điều
          kiện giao thông thực tế. Tuyến metro đang ở dạng dự kiến.
        </p>
      </div>
    </section>
  );
}
