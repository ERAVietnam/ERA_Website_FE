"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { OVERVIEW_FACT, OVERVIEW_STATS, SPEC_ROWS } from "../data";
import { useLightbox } from "./Lightbox";

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="tong-quan">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Tổng quan dự án SkySOLIS</h2>
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
          {/* motion.figure truc tiep = grid item -> sticky an chac (anh bam dinh khi cuon,
              bang ben phai cao hon se luot qua, khong co thanh cuon noi bo - dung mau) */}
          <motion.figure
            className="ov-fig"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={() =>
              openLightbox(
                `${IMG}/skysolis-tong-quan-3-thap-alba-helio-lyra-hoang-hon.webp`,
                "3 tháp Alba · Helio · Lyra trên khối đế thương mại"
              )
            }
          >
            <Image
              src={`${IMG}/skysolis-tong-quan-3-thap-alba-helio-lyra-hoang-hon.webp`}
              alt="Phối cảnh SkySOLIS lúc hoàng hôn: 3 tháp Alba, Helio, Lyra cao 40 tầng trên khối đế thương mại, cạnh tuyến metro"
              width={1080}
              height={844}
              sizes="(max-width: 900px) 100vw, 540px"
              loading="lazy"
            />
            <figcaption className="fcap">
              3 tháp Alba · Helio · Lyra trên khối đế thương mại · bấm để phóng to
            </figcaption>
          </motion.figure>

          <Reveal delay={0.1}>
            <table className="spec">
              <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                Thông số tổng quan SkySOLIS
              </caption>
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
