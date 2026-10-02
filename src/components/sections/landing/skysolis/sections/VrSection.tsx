"use client";

import Image from "next/image";
import { IMG, VR360_LINK } from "../theme";
import { Reveal } from "../Reveal";

/* VR360 — mở tour thực tế ảo của chủ đầu tư (trang mới) */
export function VrSection() {
  return (
    <section className="sec" id="vr360">
      <div className="wrap vr">
        <Reveal>
          <a
            className="vr-fig"
            href={VR360_LINK}
            target="_blank"
            rel="noopener"
            aria-label="Mở tour VR360 SkySOLIS (trang mới)"
          >
            <Image
              src={`${IMG}/skysolis-vr360-thap-can-ho-nhin-tu-duong-pho.webp`}
              alt="Tháp căn hộ SkySOLIS nhìn từ đường phố giữa trờI xanh – ảnh mở tour VR360 của dự án"
              width={1040}
              height={781}
              sizes="(max-width: 860px) 100vw, 680px"
              loading="lazy"
            />
            <span className="vr-badge" aria-hidden="true">
              <b>360°</b>
              <span>VR TOUR</span>
            </span>
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="vr-txt">
            <h2>Trải nghiệm không gian VR360</h2>
            <p className="serif-lead">Khám phá dự án dạng 360° ngay trên điện thoạI.</p>
            <p className="body" style={{ marginTop: 14 }}>
              Xoay, phóng to và đi qua từng không gian của SkySOLIS bằng tour thực tế ảo của chủ
              đầu tư.
            </p>
            <a className="btn" href={VR360_LINK} target="_blank" rel="noopener">
              Xem VR360
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
