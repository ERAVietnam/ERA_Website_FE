"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NK_CARDS, NK_LIST } from "../data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

export function ExternalAmenitySection() {
  return (
    <section className="sec" id="ngoai-khu">
      <div className="wrap">
        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="head">
          <h2>Tiện ích ngoại khu</h2>
          <p className="serif-lead">Dùng chung hệ tiện ích của đô thị Waterpoint 355 ha.</p>
        </motion.div>

        <motion.p {...fadeUp} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="fact">
          Cư dân Rivera Nagomi dùng chung tiện ích của khu đô thị Waterpoint 355 ha: River Club,
          bến du thuyền, công viên bờ sông, công viên bờ kênh, trường mầm non và Trường quốc tế
          song ngữ EMASI Plus.
        </motion.p>

        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="nk">
          {NK_CARDS.map((c) => (
            <figure className="nk-card" key={c.b}>
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(max-width: 860px) 100vw, 580px"
                className="object-cover"
              />
              <figcaption>
                <b>{c.b}</b>
                <span>{c.span}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>

        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }} className="nk-list">
          {NK_LIST.map((n) => (
            <div key={n.b}>
              <b>{n.b}</b>
              <span>{n.span}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
