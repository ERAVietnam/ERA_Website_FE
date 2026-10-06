"use client";

import { PAYMENT_PLANS, PAYMENT_SCHEDULE, PRIVILEGES } from "../data";
import { Quat, Reveal } from "../Reveal";

const PRIV_ICONS = [
  (<g key="p1"><circle cx="8" cy="14" r="4" /><path d="M11 11l9-9M16 6l3 3M14 8l2 2" /></g>),
  (<g key="p2"><path d="M12 3v18M16 7H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H8" /></g>),
  <path key="p3" d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z" />,
  <path key="p4" d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3Z" />,
  <path key="p5" d="M4 20h16M6 20V9l6-5 6 5v11M10 14h4" />,
  <path key="p6" d="M4 5h16v14H4zM4 10h16M9 15h6" />,
];

export function PolicySection() {
  const toForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sec cs" id="chinh-sach">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <Quat />
            <h2>
              Chính sách bán hàng &amp; lịch thanh toán{" "}
              <span className="dong2">CSBH02.2 · áp dụng từ 28/09/2026</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">
            5 phương án thanh toán dành cho khách hàng đăng ký nguyện vọng căn hộ Beachtro Tower.
            Chiết khấu trừ trực tiếp vào giá trị căn hộ chưa gồm thuế GTGT và kinh phí bảo trì.
          </p>
        </Reveal>

        <Reveal>
          <ul className="pa" aria-label="5 phương án thanh toán">
            {PAYMENT_PLANS.map((p) => (
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
            <h3>Lịch thanh toán tiến độ chuẩn (phương án 1)</h3>
            <p>Mốc tính từ ngày ký Hợp đồng thực hiện nguyện vọng (HĐTHNV)</p>
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
          <ul className="dq" aria-label="Đặc quyền đi kèm">
            {PRIVILEGES.map((t, i) => (
              <li key={t.b}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {PRIV_ICONS[i]}
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
          <p className="cs-note">
            Chính sách CSBH02.2/B-BC/SPG/09-2026 do chủ đầu tư ban hành, áp dụng đến khi có chính
            sách mới thay thế; chủ đầu tư giữ quyền thay đổi mà không cần báo trước. Các ưu đãi thanh
            toán sớm không áp dụng đồng thờI với nhau và với gói hỗ trợ lãi suất. Bảng tính giá chi
            tiết theo từng căn do chuyên viên ERA cung cấp.
            <br />
            <a className="nut" href="#dang-ky" onClick={toForm}>
              Nhận bảng tính giá theo căn{" "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
