"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { PRICE_ROWS, PERKS, ZONES } from "../data";
import { usePopup } from "./PopupForm";
import { useLightbox } from "./Lightbox";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

export function PriceSection() {
  const [zone, setZone] = useState(ZONES[0].key);
  const openPopup = usePopup();
  const openLightbox = useLightbox();
  const current = ZONES.find((z) => z.key === zone) ?? ZONES[0];

  return (
    <section className="sec bg-cream" id="gia" style={{ scrollMarginTop: 74 }}>
      <div className="wrap">
        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="head">
          <h2>Giá Rivera Nagomi và chính sách bán hàng</h2>
          <p className="serif-lead">Ba lịch thanh toán — chọn theo dòng tiền của gia đình.</p>
        </motion.div>

        <motion.p {...fadeUp} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="fact">
          Giá tham khảo Rivera Nagomi tháng 9/2026 từ khoảng 5,55 tỷ/căn (nhà phố vườn, lịch
          thanh toán nhanh) đến 11,8 tỷ/căn (biệt thự đơn lập, lịch vay ngân hàng) — chưa phải
          bảng giá chính thức của chủ đầu tư.
        </motion.p>

        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7 }} className="price-box">
          <div className="price-scroll">
            <table className="price">
              <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                Giá tham khảo Rivera Nagomi theo dòng sản phẩm và lịch thanh toán
              </caption>
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: "left" }}>
                    Dòng sản phẩm
                  </th>
                  <th scope="col">
                    Lịch chuẩn<small>PM01</small>
                  </th>
                  <th scope="col">
                    Lịch TT nhanh<small>PM02</small>
                  </th>
                  <th scope="col">
                    Lịch vay NH<small>BS01 · có hỗ trợ lãi suất</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">{r.name}</th>
                    <td data-l="Chuẩn">
                      {r.chuan}
                      <span>tỷ/căn</span>
                    </td>
                    <td className="best" data-l="TT nhanh">
                      {r.nhanh}
                      <span>tỷ/căn</span>
                    </td>
                    <td data-l="Vay NH">
                      {r.vay}
                      <span>tỷ/căn</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="rumor">
            <b>LƯU Ý</b>
            <span>
              Giá tham khảo, <strong>chưa phải bảng giá chính thức của chủ đầu tư</strong>. Giá
              từng căn phụ thuộc vị trí, diện tích và thời điểm; giá đã gồm VAT, chưa gồm phí bảo
              trì 1,5%. Liên hệ để nhận bảng giá chính thức.
            </span>
          </p>

          <div className="perks">
            {PERKS.map((p) => (
              <div className="perk" key={p.span}>
                <b>
                  {p.b}
                  <small>{p.small}</small>
                </b>
                <span>{p.span}</span>
              </div>
            ))}
          </div>

          <motion.div {...fadeUp} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="zone-h">
            <h3>Tiến độ thanh toán theo zone</h3>
            <div className="tabs" role="tablist" aria-label="Chọn zone" style={{ margin: 0 }}>
              {ZONES.map((z) => (
                <button
                  key={z.key}
                  className="tab"
                  role="tab"
                  type="button"
                  aria-selected={zone === z.key}
                  onClick={() => setZone(z.key)}
                >
                  {z.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="pane zone" role="tabpanel" aria-label={`Tiến độ thanh toán ${current.label}`}>
            <div>
              <p className="note" style={{ margin: "0 0 10px" }}>
                {current.note}
              </p>
              <div className="price-scroll">
                <table className="tt">
                  <thead>
                    <tr>
                      <th>Đợt</th>
                      <th style={{ textAlign: "left" }}>Thời gian dự kiến</th>
                      <th>Chuẩn</th>
                      <th>Nhanh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.rows.map((r) => (
                      <tr key={r.dot} className={r.hl ? "hl" : ""}>
                        <td>{r.dot}</td>
                        <td>{r.time}</td>
                        <td>
                          {r.chuan === "—" ? (
                            <span className="dash">—</span>
                          ) : r.hl ? (
                            <b>{r.chuan}</b>
                          ) : (
                            r.chuan
                          )}
                        </td>
                        <td>
                          {r.nhanh === "—" ? (
                            <span className="dash">—</span>
                          ) : r.dot === "2" || r.dot === "7" || r.hl ? (
                            <b>{r.nhanh}</b>
                          ) : (
                            r.nhanh
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td style={{ textAlign: "left" }}>Tổng cộng</td>
                      <td>100%</td>
                      <td>100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="vay">
              <h4>Lịch vay ngân hàng (BS01)</h4>
              <div className="split" aria-label="Khách hàng 30%, ngân hàng 70%">
                <div style={{ flex: 30, background: theme.primaryLight }}>30%</div>
                <div style={{ flex: 70, background: theme.primary }}>70% ngân hàng</div>
              </div>
              <p className="note" style={{ margin: 0 }}>
                {current.vayNote}
              </p>
              <ul>
                {current.vayBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="posters">
                <button
                  type="button"
                  onClick={() => openLightbox(current.poster, `Chính sách bán hàng ${current.label}`)}
                  aria-label={`Xem ảnh chính sách bán hàng ${current.label}`}
                >
                  <Image
                    src={current.poster}
                    alt={current.posterAlt}
                    width={513}
                    height={912}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "50% 30%" }}
                  />
                  <span>XEM ẢNH CSBH</span>
                </button>
              </div>
            </div>
          </div>

          <p className="note" style={{ textAlign: "center", margin: "20px auto 0", maxWidth: 760 }}>
            Theo thông báo chính sách bán hàng của Công ty Cổ phần Southgate năm 2026. Tiến độ chưa
            gồm phí bảo trì 1,5% (thanh toán ở đợt bàn giao). Số đợt mang tính đại diện, chính thức
            theo HĐMB. Các tiến độ có số lượng áp dụng giới hạn. *Áp dụng khi thanh toán đủ và nhận
            bàn giao đúng hạn. Hỗ trợ vay tuỳ thẩm định của ngân hàng.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(22px,2.6vw,32px)" }}>
            <button className="btn" type="button" onClick={() => openPopup()}>
              NHẬN BẢNG GIÁ CHÍNH THỨC &amp; TÍNH DÒNG TIỀN
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
