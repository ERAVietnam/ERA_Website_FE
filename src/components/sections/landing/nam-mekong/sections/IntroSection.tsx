"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const MOSAIC = [
  {
    cls: "m1",
    src: `${IMG}/nam-mekong-grand-plaza-hai-thap-canh-ga-central-station.webp`,
    w: 1400, h: 788,
    alt: "Hai tháp Nam Mekong Grand Plaza cạnh nhà ga Central Station, tuyến metro trên cao và vòng xoay WTC lúc hoàng hôn",
    zoom: `${IMG}/nam-mekong-grand-plaza-hai-thap-canh-ga-central-station.webp`,
  },
  {
    cls: "m2",
    src: `${IMG}/nam-mekong-grand-plaza-quang-truong-noi-khu-dai-phun-nuoc-800.webp`,
    w: 800, h: 450,
    alt: "Quảng trường nội khu Nam Mekong Grand Plaza với đài phun nước và dãy shophouse thương mại ở khối đế",
    zoom: `${IMG}/nam-mekong-grand-plaza-quang-truong-noi-khu-dai-phun-nuoc.webp`,
  },
  {
    cls: "m3",
    src: `${IMG}/nam-mekong-grand-plaza-mat-tien-khoi-de-thuong-mai-800.webp`,
    w: 800, h: 450,
    alt: "Mặt tiền khối đế thương mại Nam Mekong Grand Plaza về đêm, phía xa là nhà ga metro trung tâm WTC",
    zoom: `${IMG}/nam-mekong-grand-plaza-mat-tien-khoi-de-thuong-mai.webp`,
  },
];

export function IntroSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-lav" id="gioi-thieu">
      <div className="wrap gt">
        <Reveal>
          <h2>
            Tâm điểm giao thương quốc tế{" "}
            <span className="dong2">giữa lòng Thành phố mới Bình Dương</span>
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Vượt trên cả một không gian sống, Nam Mekong Grand Plaza là biểu tượng của chuẩn sống
            thượng lưu tại trung tâm kinh tế năng động nhất Bình Dương.
          </p>
          <p className="body">
            Tọa lạc tại vị trí “vàng” kết nối ngàn tiện ích, dự án mang đến sự giao thoa hoàn hảo
            giữa kiến trúc Bold Modern tinh tế và không gian sinh thái bền vững. Đây chính là nơi hội
            tụ của cộng đồng cư dân tinh hoa, nơi mỗi ngày đều là một trải nghiệm nghỉ dưỡng đẳng cấp
            ngay tại tâm điểm giao thương quốc tế.
          </p>
          <p className="body">
            Dự án do Công ty Cổ phần Tập đoàn Nam Mê Kông (Mekong Group, mã chứng khoán VC3) phát
            triển trên Lô đất A4 ngay vòng xoay WTC, Thành phố mới Bình Dương, theo mô hình đô thị
            gắn với giao thông công cộng (TOD).
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mosaic">
            {MOSAIC.map((m) => (
              <figure
                key={m.cls}
                className={m.cls}
                onClick={() => openLightbox(m.zoom, m.alt)}
              >
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
    </section>
  );
}
