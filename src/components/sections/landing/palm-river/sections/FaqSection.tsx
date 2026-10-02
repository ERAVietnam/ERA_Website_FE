"use client";

import { FAQS } from "../data";
import { Reveal } from "../Reveal";

export function FaqSection() {
  return (
    <section className="sec bg-pale" id="hoi-dap">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Hỏi đáp về Palm River</h2>
            <svg className="song" aria-hidden="true">
              <use href="#song" />
            </svg>
          </div>
        </Reveal>
        <Reveal>
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q}>
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
