"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { VALUES_ROWS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function ValuesSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec gt-sec" id="diem-nhan">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="ky">Kiến tạo chuẩn sống Palm River</p>
            <h2>
              <span className="gt-06">06</span> Giá trị
            </h2>
            <svg className="song" aria-hidden="true">
              <use href="#song" />
            </svg>
          </div>
        </Reveal>

        {VALUES_ROWS.map((row) => (
          <div key={row.img} className={`gt-hang${row.dao ? " dao" : ""}`}>
            {/* ol/figure phải là grid item trực tiếp của .gt-hang để .dao order:2 ăn — không bọc div ngoài */}
            <motion.ol
              className="gt-ds"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {row.items.map((it) => (
                <li key={it.so}>
                  <span className="so" aria-hidden="true">
                    {it.so}
                  </span>
                  <h3>{it.h}</h3>
                  <p>{it.p}</p>
                </li>
              ))}
            </motion.ol>
            <motion.figure
              className="gt-anh zoomable"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              onClick={() => openLightbox(row.img, row.alt)}
            >
              <Image
                src={row.img800 ?? row.img}
                width={row.w}
                height={row.h}
                loading="lazy"
                decoding="async"
                alt={row.alt}
              />
            </motion.figure>
          </div>
        ))}

        <Reveal>
          <p className="note gt-note">Hình ảnh chỉ mang tính chất minh họa.</p>
        </Reveal>
      </div>
    </section>
  );
}
