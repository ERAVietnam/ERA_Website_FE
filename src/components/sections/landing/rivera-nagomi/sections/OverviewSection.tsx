"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { theme, IMG } from "../theme";
import { SPEC_ROWS } from "../data";
import { useLightbox } from "./Lightbox";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="tong-quan" style={{ scrollMarginTop: 74 }}>
      <div className="wrap">
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="head"
        >
          <h2>Tổng quan dự án Rivera Nagomi</h2>
          <p className="serif-lead">Các thông số theo tài liệu giới thiệu của chủ đầu tư, cập nhật tháng 9/2026.</p>
        </motion.div>

        <div className="ov">
          <motion.div {...fadeUp} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
            <figure className="ov-fig">
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    `${IMG}/rivera-nagomi-vi-tri-trong-waterpoint.webp`,
                    "Vị trí phân khu Rivera Nagomi trong tổng thể khu đô thị Waterpoint"
                  )
                }
                aria-label="Phóng to ảnh vị trí phân khu Rivera Nagomi"
                style={{ display: "block", width: "100%", border: 0, padding: 0, cursor: "zoom-in", background: "none" }}
              >
                <Image
                  src={`${IMG}/rivera-nagomi-vi-tri-trong-waterpoint.webp`}
                  alt="Vị trí phân khu Rivera Nagomi 5,8 ha trên phối cảnh tổng thể khu đô thị Waterpoint 355 ha bên sông Vàm Cỏ Đông"
                  width={1672}
                  height={941}
                  sizes="(max-width: 1024px) 100vw, 980px"
                  className="h-auto w-full"
                />
              </button>
              <figcaption className="fcap">
                Vị trí phân khu Rivera Nagomi (khoanh xanh) trong tổng thể khu đô thị Waterpoint ·
                bấm để phóng to
              </figcaption>
            </figure>
          </motion.div>

          <motion.table
            {...fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="spec"
          >
            <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Thông số tổng quan phân khu Rivera Nagomi
            </caption>
            <tbody>
              {SPEC_ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>
                    {r.bold ? (
                      <b style={{ color: theme.primary }}>{r.value}</b>
                    ) : (
                      r.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>

          <p className="note center" style={{ textAlign: "center", margin: 0 }}>
            Nguồn: tài liệu giới thiệu của chủ đầu tư (9/2026); thông tin ra mắt 158 căn, 4 dòng
            sản phẩm theo{" "}
            <a
              href="https://www.sggp.org.vn/phan-khu-rivera-nagomi-ra-mat-thi-truong-buoc-di-moi-trong-chien-luoc-phat-trien-waterpoint-post873034.html"
              target="_blank"
              rel="noopener"
            >
              báo Sài Gòn Giải Phóng
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
