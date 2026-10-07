"use client";

import { FAQS } from "../data";
import { Reveal } from "../Reveal";

export function FaqSection() {
  return (
    <section className="sec bg-paper" id="hoi-dap">
      <div className="wrap">
        <Reveal>
          <div className="head c">
            <p className="kick">Hỏi đáp</p>
            <h2>
              Câu hỏi thường gặp về <span className="nw">Green Skyline</span>
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
