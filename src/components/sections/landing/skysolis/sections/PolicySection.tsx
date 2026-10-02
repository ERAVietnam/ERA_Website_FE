"use client";

import { useState } from "react";
import { CS_NOTE, PAY_TABLES, UU_DAI } from "../data";
import { Reveal } from "../Reveal";

/* Chính sách: tab Ưu đãi + 3 phương thức thanh toán */
export function PolicySection() {
  const [tab, setTab] = useState("ud");
  const current = PAY_TABLES.find((t) => t.key === tab);

  return (
    <section className="sec bg-cream" id="chinh-sach">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>
              Chính sách bán hàng{" "}
              <span className="dong2">Áp dụng từ 14/09/2026 đến khi có thông báo mới</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn nội dung chính sách">
            <button className="tab" role="tab" type="button" aria-selected={tab === "ud"} onClick={() => setTab("ud")}>
              Ưu đãi
            </button>
            {PAY_TABLES.map((t) => (
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
          </div>
        </Reveal>

        {tab === "ud" ? (
          <Reveal>
            <div className="pane" role="tabpanel" aria-label="Ưu đãi">
              <ul className="ud">
                {UU_DAI.map((u) => (
                  <li key={u.strong}>
                    <b>{u.b}</b>
                    <strong>{u.strong}</strong>
                    <span>{u.span}</span>
                  </li>
                ))}
              </ul>
              <p className="cs-note">
                <b>Lưu ý:</b> {CS_NOTE.replace("Lưu ý: ", "")}
              </p>
            </div>
          </Reveal>
        ) : (
          current && (
            <Reveal>
              <div className="pane" role="tabpanel" aria-label={current.label}>
                <div className="tt-wrap">
                  <table className="tt">
                    <caption>{current.caption}</caption>
                    <thead>
                      <tr>
                        {current.columns.map((c) => (
                          <th scope="col" key={c}>
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {current.rows.map((r) => (
                        <tr key={r.dot}>
                          <th scope="row">{r.dot}</th>
                          <td>{r.time}</td>
                          {r.cells.map((c, i) => (
                            <td key={i}>{c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {current.banks && (
                  <div className="nh">
                    {current.banks.map((b) => (
                      <span key={b}>{b}</span>
                    ))}
                  </div>
                )}
                {current.note && <p className="cs-note">{current.note}</p>}
              </div>
            </Reveal>
          )
        )}

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            Tóm tắt theo Thông báo chính sách bán hàng số 03-2026/SW-SS ngày 14/09/2026 của Công ty
            TNHH SkyWorld Development (Việt Nam). Điều kiện đầy đủ theo văn bản chính thức của chủ
            đầu tư.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
