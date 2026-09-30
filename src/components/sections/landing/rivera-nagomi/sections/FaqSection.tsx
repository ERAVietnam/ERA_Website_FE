"use client";

import { motion } from "framer-motion";
import { FAQS } from "../data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

export function FaqSection() {
  return (
    <section className="sec" id="hoi-dap">
      <div className="wrap">
        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="head">
          <h2>Câu hỏi thường gặp về Rivera Nagomi</h2>
        </motion.div>

        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="faq">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
