"use client";

import { FAQS } from "../data";
import { AMark, Reveal } from "../Reveal";

export function FaqSection() {
  return (
    <section className="sec bg-cream" id="hoi-dap">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <AMark />
            <h2>Hỏi đáp về The Aspira</h2>
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
