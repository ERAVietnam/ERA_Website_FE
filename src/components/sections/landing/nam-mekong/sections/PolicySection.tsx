"use client";

import { useState } from "react";
import Image from "next/image";
import { PAYMENTS, UUDAI, VAY } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function PolicySection() {
  const [tab, setTab] = useState(PAYMENTS[0].key);
  const openLightbox = useLightbox();
  const current = PAYMENTS.find((p) => p.key === tab) ?? PAYMENTS[0];

  return (
    <section className="sec bg-lav" id="chinh-sach">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Phương thức thanh toán linh hoạt và tối ưu dòng tiền</h2>
            <p className="body" style={{ marginTop: 18 }}>
              Nam Mekong Grand Plaza hiện có nhiều phương thức thanh toán linh hoạt, phù hợp với
              từng nhóm khách hàng khác nhau. Với khách hàng muốn dòng tiền nhẹ và chia nhỏ theo
              tiến độ, lịch thanh toán cơ bản là lựa chọn an toàn. Với khách hàng muốn giảm áp lực
              tài chính trong giai đoạn đầu, phương án 0 đồng trong 24 tháng hỗ trợ giãn dòng tiền
              và có thể kết hợp vay ngân hàng. Phương án thanh toán nhanh 70% / 95% dành cho khách
              hàng muốn nhận mức chiết khấu tốt hơn.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn phương thức thanh toán">
            {PAYMENTS.map((p) => (
              <button
                key={p.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={tab === p.key}
                onClick={() => setTab(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="pane pt" role="tabpanel" aria-label={current.label}>
            <div className="pt-h">
              <div>
                <h3>{current.title}</h3>
                <p>{current.desc}</p>
              </div>
              {current.ck && <span className="ck">{current.ck}</span>}
            </div>
            <figure className="pt-anh" onClick={() => openLightbox(current.img, current.title)}>
              <span className="cuon">
                <Image
                  src={current.img}
                  alt={current.alt}
                  width={current.w}
                  height={current.h}
                  sizes="(max-width: 640px) 760px, (max-width: 1224px) 100vw, 1100px"
                  loading="lazy"
                />
              </span>
              <figcaption className="fcap">
                Bảng của chủ đầu tư · trên điện thoạI vuốt ngang để xem hết, bấm vào ảnh để phóng
                to
              </figcaption>
            </figure>
            <div className="pt-f">
              <p>{current.foot}</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="vay">
            {VAY.map((v) => (
              <div key={v.b}>
                <b>{v.b}</b>
                <span>{v.span}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="head" style={{ margin: "clamp(34px,4vw,52px) auto 0" }}>
            <h2 style={{ fontSize: "clamp(20px,2.2vw,28px)" }}>Chính sách dành cho khách hàng</h2>
          </div>
        </Reveal>
        <div className="ud">
          {UUDAI.map((u) => (
            <Reveal key={u.title}>
              <article className="ud-card">
                <figure onClick={() => openLightbox(u.zoom, u.title)}>
                  <Image src={u.src} alt={u.alt} width={u.w} height={u.h} loading="lazy" />
                </figure>
                <div className="nd">
                  <h3>{u.title}</h3>
                  <p>{u.p}</p>
                  {u.list && (
                    <ul>
                      {u.list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="note pl">
            Chính sách bán hàng áp dụng từ ngày phát hành đến hết 30/11/2026 cho khách hàng ký hợp
            đồng mua bán căn hộ tại dự án. Giá xe là giá dự kiến theo chính sách của chủ đầu tư.
            Chính sách có thể thay đổi theo từng giai đoạn — thông tin chính thức căn cứ văn bản
            của chủ đầu tư và hợp đồng mua bán.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
