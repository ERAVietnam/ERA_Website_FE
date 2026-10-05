"use client";

import { PRICE_CARDS } from "../data";
import { Reveal } from "../Reveal";

export function PriceSection() {
  const toForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sec gia" id="bang-gia">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <svg className="hoa" viewBox="0 0 32 32" aria-hidden="true">
              <g fill="currentColor">
                <ellipse cx="16" cy="8" rx="2.6" ry="7" />
                <ellipse cx="16" cy="24" rx="2.6" ry="7" />
                <ellipse cx="8" cy="16" rx="7" ry="2.6" />
                <ellipse cx="24" cy="16" rx="7" ry="2.6" />
              </g>
            </svg>
            <h2>
              Bảng giá tham khảo <span className="dong2">Đã gồm ưu đãi theo chính sách bán hàng hiện hành</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <ul className="the-gia">
            {PRICE_CARDS.map((c) => (
              <li key={c.h3} className={c.hl ? "hl" : ""}>
                <em>{c.em}</em>
                <h3>{c.h3}</h3>
                <p className="dt">{c.dt}</p>
                <p className="so">{c.so}</p>
                {c.goc ? <p className="goc">{c.goc}</p> : null}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <p className="gia-note">
            Giá thay đổi theo lộ giới (13 – 32 m), hướng view công viên/hồ bơi và ưu đãi áp dụng.
            Bảng giá chính thức theo từng đợt công bố của chủ đầu tư.
            <br />
            <a className="nut" href="#dang-ky" onClick={toForm}>
              Nhận báo giá theo block{" "}
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
