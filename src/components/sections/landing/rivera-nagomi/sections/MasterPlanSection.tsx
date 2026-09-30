"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMG } from "../theme";
import { LEGEND_TIEN_ICH, LEGEND_LOAI_HINH } from "../data";
import { useLightbox } from "./Lightbox";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

export function MasterPlanSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-mist" id="mat-bang" style={{ scrollMarginTop: 74 }}>
      <div className="wrap">
        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="head">
          <h2>Mặt bằng tổng thể</h2>
          <p className="serif-lead">Bốn dòng sản phẩm bao quanh kênh nội khu, một mặt giáp sông Vàm Cỏ Đông.</p>
        </motion.div>

        <motion.p {...fadeUp} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="fact">
          Mặt bằng Rivera Nagomi bố trí 158 căn thuộc 4 dòng sản phẩm quanh kênh nội khu, một mặt
          giáp sông Vàm Cỏ Đông, cùng 8 điểm tiện ích đánh số từ River Club đến Trường EMASI Plus.
        </motion.p>

        <div className="mb">
          <motion.figure {...fadeUp} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mb-fig">
            <button
              type="button"
              onClick={() =>
                openLightbox(
                  `${IMG}/rivera-nagomi-mat-bang-tong-the.webp`,
                  "Mặt bằng tổng thể Rivera Nagomi — 158 căn, 8 tiện ích"
                )
              }
              aria-label="Phóng to mặt bằng tổng thể"
              style={{ display: "block", width: "100%", border: 0, padding: 0, cursor: "zoom-in", background: "none" }}
            >
              <Image
                src={`${IMG}/rivera-nagomi-mat-bang-tong-the.webp`}
                alt="Mặt bằng tổng thể Rivera Nagomi: 158 căn shophouse, nhà phố vườn, biệt thự và 8 tiện ích ven sông Vàm Cỏ Đông"
                width={1000}
                height={691}
                className="h-auto w-full"
              />
            </button>
            <figcaption className="fcap">
              Mặt bằng tổng thể – 158 căn, 8 tiện ích đánh số · bấm để phóng to
            </figcaption>
          </motion.figure>

          <motion.aside
            {...fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="legend"
            aria-label="Chú thích mặt bằng"
          >
            <div>
              <h3>Hệ tiện ích</h3>
              <ol>
                {LEGEND_TIEN_ICH.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
            <div className="sep"></div>
            <div>
              <h3>Loại hình</h3>
              <ul>
                {LEGEND_LOAI_HINH.map((l) => (
                  <li key={l.label}>
                    <i style={{ background: l.color }}></i>
                    {l.label}
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
