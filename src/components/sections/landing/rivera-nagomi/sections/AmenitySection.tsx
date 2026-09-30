"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ACC_ITEMS, TI_LIST } from "../data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

/* Accordion như mẫu: hover để mở rộng thẻ (mobile tự chuyển thành lưới bằng CSS) */
export function AmenitySection() {
  const [on, setOn] = useState(0);

  return (
    <section className="sec bg-pale" id="tien-ich" style={{ scrollMarginTop: 74 }}>
      <div className="wrap">
        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="head">
          <h2>Tiện ích nội khu</h2>
          <p className="serif-lead">Tiện ích rải đều giữa các dãy nhà — bước ra là tới.</p>
        </motion.div>

        <motion.p {...fadeUp} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="fact">
          Rivera Nagomi có 4 nhóm tiện ích nội khu: hồ bơi và khu vui chơi trẻ em; clubhouse,
          phòng gym, khu BBQ; công viên kênh đào và khu thể thao ngoài trởi; hẻm xanh cảnh quan
          xen giữa các dãy nhà.
        </motion.p>

        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="acc"
          id="acc"
        >
          {ACC_ITEMS.map((it, i) => (
            <figure
              key={it.ten}
              className={on === i ? "on" : ""}
              onMouseEnter={() => setOn(i)}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes={i === 0 ? "(max-width: 760px) 100vw, 700px" : "(max-width: 760px) 50vw, 700px"}
                className="object-cover"
              />
              <figcaption>
                <span className="ten">{it.ten}</span>
                <span className="mo">{it.mo}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>

        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.1 }} className="ti-list">
          {TI_LIST.map((t) => (
            <div className="ti" key={t.h}>
              <h3>{t.h}</h3>
              <p>{t.p}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
