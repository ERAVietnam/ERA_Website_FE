"use client";

import Image from "next/image";
import { PARTNERS } from "../data";
import { AMark, Reveal } from "../Reveal";

export function PartnersSection() {
  return (
    <section className="sec" id="doi-tac">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <AMark />
            <h2>
              Đối tác phát triển <span className="nw">The Aspira</span>{" "}
              <span className="dong2">Chủ đầu tư, đơn vị phát triển và các đối tác thiết kế – thi công</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="ben">
            <article>
              <i>Chủ đầu tư</i>
              <h3>Công ty TNHH Đầu tư Bất động sản Phúc An Gia</h3>
              <p>
                Phúc An Gia phát triển The Aspira với định hướng sản phẩm chỉn chu về chất lượng,
                pháp lý minh bạch và giá trị sống bền vững cho khách hàng.
              </p>
            </article>
            <article>
              <i>Đơn vị phát triển</i>
              <h3>Công ty Cổ phần Đầu tư Sài Gòn High Rise</h3>
              <p>
                Sài Gòn High Rise là đơn vị phát triển dự án The Aspira, cùng các đối tác thiết kế,
                thi công và ngân hàng triển khai dự án theo tiến độ cam kết.
              </p>
            </article>
          </div>
        </Reveal>

        <Reveal>
          <ul className="dt-logo">
            {PARTNERS.map((p) => (
              <li key={p.b} className={p.textLogo ? "chu" : ""}>
                <span className="lg">
                  {p.logo ? (
                    <Image
                      src={p.logo.src}
                      width={p.logo.w}
                      height={p.logo.h}
                      loading="lazy"
                      decoding="async"
                      alt={p.logo.alt}
                    />
                  ) : (
                    p.textLogo
                  )}
                </span>
                <i>{p.i}</i>
                <b>{p.b}</b>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
