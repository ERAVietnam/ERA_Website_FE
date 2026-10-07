"use client";

import { EXTRA_PERKS, PAYMENT_METHODS, PAYMENT_SCHEDULE, POLICY_NOTE, POLICY_OPTIONS } from "../data";
import { Reveal } from "../Reveal";

const PERK_ICONS = [
  (<g key="u1"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>),
  <path key="u2" d="M3 21V9l9-6 9 6v12M9 21v-7h6v7" />,
];

export function PolicySection() {
  const toForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sec" id="chinh-sach">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="kick">Chính sách bán hàng</p>
            <h2>
              Chính sách bán hàng{" "}
              <span className="dong2">Thông báo 133/2026/CSBH-TB · áp dụng từ 15/09/2026 đến khi có thông báo mới</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="sub-h" style={{ marginBottom: 18 }}>
            Ưu đãi “ngập tràn, rộn ràng tân gia” – chọn 1 theo loại căn
          </h3>
          <ul className="uu" aria-label="Ưu đãi chương trình bán hàng">
            {POLICY_OPTIONS.map((p) => (
              <li key={p.em} className={p.hl ? "hl" : ""}>
                <em>{p.em}</em>
                <p className="so">{p.so}</p>
                <p>{p.p}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <ul className="them" aria-label="Ưu đãi cộng thêm">
            {EXTRA_PERKS.map((t, i) => (
              <li key={t.b}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {PERK_ICONS[i]}
                </svg>
                <div>
                  <b>{t.b}</b>
                  <span>{t.span}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h3 className="sub-h pa-h">6 phương thức thanh toán</h3>
          <ul className="pa" aria-label="6 phương thức thanh toán">
            {PAYMENT_METHODS.map((p) => (
              <li key={p.em} className={p.hl ? "hl" : ""}>
                <em>{p.em}</em>
                <h3>{p.h3}</h3>
                <p className="so">{p.so}</p>
                <p>{p.p}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="td">
            <h3>Lịch thanh toán chuẩn 16 tháng</h3>
            <p>Phương thức 1 · mốc tính theo thông báo chính sách của chủ đầu tư</p>
            <ol className="moc">
              {PAYMENT_SCHEDULE.map((m, i) => (
                <li key={i} className={m.nha ? "nha" : ""}>
                  <b>{m.b}</b>
                  <span>{m.span}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal>
          <p className="cs-note">{POLICY_NOTE}</p>
          <a className="nut cs-cta" href="#dang-ky" onClick={toForm}>
            Nhận bảng giá &amp; bảng tính dòng tiền{" "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
