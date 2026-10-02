"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const THO = [
  "Có một Châu Âu luôn là nguồn cảm hứng bất tận trên hành trình kiến tạo.",
  "Bên dòng kênh đào dài 3,2 km, giữa tâm điểm xanh của Thành phố bên sông Waterpoint.",
  "Một Họa phẩm Châu Âu được chắp bút bởi những thương hiệu quốc tế hàng đầu thế giới.",
  "Là miền Âu đáng sống dành riêng cho những chủ nhân danh giá mang tên Park Village.",
];

const MOSAIC = [
  {
    cls: "m1",
    src: `${IMG}/park-village-biet-thu-ven-kenh-dao.webp`,
    w: 1400, h: 803,
    alt: "Dãy biệt thự Grand Villa tân cổ điển bên kênh đào dài 3,2 km tại Park Village, Waterpoint",
  },
  {
    cls: "m2",
    src: `${IMG}/park-village-vuon-au-dai-phun-nuoc-800.webp`,
    w: 800, h: 533,
    alt: "Vườn cảnh quan châu Âu trong Park Village với đài phun nước, hàng cây cắt tỉa và clubhouse phía sau",
  },
  {
    cls: "m3",
    src: `${IMG}/park-village-phong-cach-song-chau-au-800.webp`,
    w: 800, h: 635,
    alt: "Cư dân đọc báo buổi sáng bên bàn trà trong sân vườn biệt thự Park Village phong cách châu Âu",
  },
  {
    cls: "m4",
    src: `${IMG}/park-village-tuong-dieu-khac-vuon-au.webp`,
    w: 398, h: 625,
    alt: "Tượng điêu khắc và bàn trà ngoài trờI trong vườn nội khu Park Village",
  },
];

export function IntroSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-mist" id="gioi-thieu">
      <div className="wrap">
        <div className="ch">
          <Reveal>
            <div>
              <h2>Cảm hứng</h2>
              <div className="tho">
                {THO.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              <p className="body">
                Park Village là compound 96 biệt thự Grand Villa trong khu đô thị Waterpoint, mặt
                tiền ĐT.830, xã Bến Lức, tỉnh Tây Ninh, do Nam Long phát triển cùng đối tác Nhật Bản
                Nishi Nippon Railroad. Kiến trúc tân cổ điển châu Âu do TwoG Architecture thiết kế,
                cảnh quan do Lascal thực hiện.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mosaic">
              {MOSAIC.map((m) => (
                <figure key={m.cls} className={m.cls} onClick={() => openLightbox(m.src, m.alt)}>
                  <Image
                    src={m.src}
                    alt={m.alt}
                    width={m.w}
                    height={m.h}
                    sizes="(max-width: 900px) 100vw, 620px"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
