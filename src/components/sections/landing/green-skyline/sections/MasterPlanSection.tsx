"use client";

import { useState } from "react";
import Image from "next/image";
import { TOWERS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

/* Mặt bằng 4 tháp — tab tháp lồng tab tầng (2 cấp, React state) */
export function MasterPlanSection() {
  const [tower, setTower] = useState("t1");
  const [floors, setFloors] = useState<Record<string, number>>({});
  const openLightbox = useLightbox();
  const curTower = TOWERS.find((t) => t.key === tower)!;
  const curFloorIdx = floors[tower] ?? 2; // mặc định tầng điển hình (9–27 / 9–39)
  const curFloor = curTower.floors[curFloorIdx];

  return (
    <section className="sec" id="mat-bang">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="kick">Mặt bằng</p>
            <h2>
              Mặt bằng tầng điển hình{" "}
              <span className="dong2">4 tháp T1 · T2 · T3A · T3B – mã căn, diện tích tim tường (GFA) và sử dụng (NFA) theo chủ đầu tư</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn tháp">
            {TOWERS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tower === t.key}
                onClick={() => setTower(t.key)}
              >
                {t.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="thap" role="tabpanel">
            <div className="tabs nho" role="tablist" aria-label={`Chọn tầng ${curTower.tab}`}>
              {curTower.floors.map((f, i) => (
                <button
                  key={f.tab}
                  type="button"
                  role="tab"
                  aria-selected={curFloorIdx === i}
                  onClick={() => setFloors((prev) => ({ ...prev, [tower]: i }))}
                >
                  {f.tab}
                </button>
              ))}
            </div>
            <figure className="panel" onClick={() => openLightbox(curFloor.img, curFloor.alt)}>
              <Image
                src={curFloor.img800 ?? curFloor.img}
                width={curFloor.w}
                height={curFloor.h}
                loading="lazy"
                decoding="async"
                alt={curFloor.alt}
              />
            </figure>
          </div>
          <p className="note mb-note">
            Tầng 20 tháp T3A, T3B là tầng tiện ích (sky garden, cầu vọng cảnh). Bấm ảnh để phóng
            to, đọc mã căn và diện tích từng căn.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
