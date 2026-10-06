"use client";

import { POLICY_CARDS } from "../data";
import { AMark, Reveal } from "../Reveal";

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
            <AMark />
            <h2>
              Chính sách bán hàng The Aspira{" "}
              <span className="dong2">Chương trình “6 năm không áp lực tài chính”</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="gia-box">
            <i>Giá tham khảo</i>
            <b>
              từ ~37,9<small> triệu/m²</small>
            </b>
            <span>Bảng giá từng căn theo công bố của chủ đầu tư tại thờI điểm giao dịch.</span>
          </div>
        </Reveal>

        <Reveal>
          <p className="cs-h">Tài chính linh hoạt</p>
          <p className="cs-p">Theo thông tin báo chí tháng 4/2026</p>
        </Reveal>

        <Reveal>
          <ul className="the-cs">
            {POLICY_CARDS.map((c) => (
              <li key={c.span}>
                <b>{c.b}</b>
                <span>{c.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <p className="cs-note">
            Chính sách tổng hợp theo thông tin báo chí tháng 4/2026, áp dụng theo công bố chính
            thức của chủ đầu tư từng thờI điểm. Lãi suất, hạn mức vay theo thẩm định của ngân hàng.
          </p>
          <p className="ct">
            <a className="nut" href="#dang-ky" onClick={toForm}>
              Nhận bảng tính dòng tiền{" "}
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
