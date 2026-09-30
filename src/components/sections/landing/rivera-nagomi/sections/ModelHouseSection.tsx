"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MODELS } from "../data";
import { usePopup } from "./PopupForm";
import { useLightbox } from "./Lightbox";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

export function ModelHouseSection() {
  const [tab, setTab] = useState(MODELS[0].key);
  const openPopup = usePopup();
  const openLightbox = useLightbox();
  const current = MODELS.find((m) => m.key === tab) ?? MODELS[0];

  return (
    <section className="sec" id="nha-mau" style={{ scrollMarginTop: 74 }}>
      <div className="wrap">
        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="head">
          <h2>Các sản phẩm nhà mẫu</h2>
          <p className="serif-lead">Bốn mẫu tiêu biểu cho bốn dòng sản phẩm — mỗi căn đều có sân vườn riêng.</p>
        </motion.div>

        <motion.p {...fadeUp} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="fact">
          Rivera Nagomi có 4 mẫu nhà tiêu biểu: nhà phố vườn NP1 6×15 m (đất 90 m²), shophouse
          TM6a 8×17 m (đất 136 m²), biệt thự song lập SL4 14×15 m (đất 202 m²) và biệt thự đơn lập
          VA3 19×15 m (đất 277 m²).
        </motion.p>

        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="tabs" role="tablist" aria-label="Chọn mẫu nhà">
          {MODELS.map((m) => (
            <button
              key={m.key}
              className="tab"
              role="tab"
              type="button"
              aria-selected={tab === m.key}
              onClick={() => setTab(m.key)}
            >
              {m.tab}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pane mau-card"
          role="tabpanel"
          aria-label={current.name}
        >
          <figure>
            <button
              type="button"
              onClick={() => openLightbox(current.img, current.name)}
              aria-label={`Phóng to ảnh mẫu ${current.code}`}
              style={{ display: "block", width: "100%", border: 0, padding: 0, cursor: "zoom-in", background: "none" }}
            >
              <Image
                src={current.img}
                alt={current.alt}
                width={1000}
                height={560}
                sizes="(max-width: 900px) 100vw, 700px"
                className="h-auto w-full"
              />
            </button>
          </figure>
          <div className="mau-info">
            <div className="code">
              {current.code}
              <small>{current.codeSub}</small>
            </div>
            <h3>{current.name}</h3>
            <dl>
              {current.specs.map((s) => (
                <div key={s.k} style={{ display: "contents" }}>
                  <dt>{s.k}</dt>
                  <dd>{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="fine">Mẫu tiêu biểu. Thông tin chính thức căn cứ theo hợp đồng mua bán.</p>
            <button className="btn" type="button" onClick={() => openPopup(current.popupTitle, current.popupNote)}>
              {current.btn}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
