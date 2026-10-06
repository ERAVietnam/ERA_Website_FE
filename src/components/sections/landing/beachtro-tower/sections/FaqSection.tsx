"use client";

import { FAQS } from "../data";
import { Quat, Reveal } from "../Reveal";

export function FaqSection() {
  return (
    <section className="sec" id="hoi-dap">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <Quat />
            <h2>
              Câu hỏi thường gặp về <span className="nw">Beachtro Tower</span>
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="faq">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
