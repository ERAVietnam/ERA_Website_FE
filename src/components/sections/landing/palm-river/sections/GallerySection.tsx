"use client";

import { useState } from "react";
import { GALLERY } from "../data";
import { Reveal } from "../Reveal";
import { Slider } from "./Slider";

export function GallerySection() {
  const [group, setGroup] = useState(GALLERY[0].key);
  const cur = GALLERY.find((g) => g.key === group)!;

  return (
    <section className="sec bg-pale tv" id="hinh-anh">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Thư viện hình ảnh</h2>
            <svg className="song" aria-hidden="true">
              <use href="#song" />
            </svg>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn nhóm hình">
            {GALLERY.map((g) => (
              <button
                key={g.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={group === g.key}
                onClick={() => setGroup(g.key)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <Slider slides={cur.slides} ariaLabel={`Thư viện hình ảnh: ${cur.label}`} />
        </Reveal>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            Phối cảnh và nội thất căn hộ mẫu theo brochure chủ đầu tư, mang tính chất minh họa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
