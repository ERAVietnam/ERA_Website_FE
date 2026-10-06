"use client";

import Image from "next/image";
import { DYHOME_STYLES } from "../data";
import { IMG } from "../theme";
import { Quat, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const DY_PHOTOS = [
  {
    lon: `${IMG}/beachtro-tower-dyhome-phong-khach-dia-trung-hai.webp`,
    src800: `${IMG}/beachtro-tower-dyhome-phong-khach-dia-trung-hai-800.webp`,
    w: 1200, h: 676,
    alt: "Ý tưởng DyHome phong cách Địa Trung Hải: phòng khách trắng xanh, khung kính lớn nhìn ra biển Bãi Sau",
  },
  {
    lon: `${IMG}/beachtro-tower-dyhome-phong-khach-indochine.webp`,
    src800: `${IMG}/beachtro-tower-dyhome-phong-khach-indochine.webp`,
    w: 695, h: 457,
    alt: "Ý tưởng nội thất DyHome phong cách Indochine cho căn hộ Beachtro Tower, cửa kính mở ra ban công view biển",
  },
  {
    lon: `${IMG}/beachtro-tower-dyhome-phong-tam-modern-tropical.webp`,
    src800: `${IMG}/beachtro-tower-dyhome-phong-tam-modern-tropical-800.webp`,
    w: 868, h: 576,
    alt: "Ý tưởng DyHome phong cách Modern Tropical: phòng tắm gạch xanh, bồn tắm nằm nhìn ra biển tại Beachtro Tower",
  },
];

export function DyHomeSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="dyhome">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <Quat />
            <h2>
              Không gian căn hộ DyHome <span className="dong2">Design your home – Define your identity</span>
            </h2>
          </div>
        </Reveal>

        <div className="dy">
          <Reveal>
            <div className="dy-chu">
              <h3>Một không gian, muôn bản sắc</h3>
              <p className="phu">Freedom Living bắt đầu từ chính ngôi nhà của bạn</p>
              <p className="body">
                DyHome là dòng căn hộ độc bản lần đầu xuất hiện tại Blanca City – một phong cách sống
                hoàn toàn mới, nơi chủ nhân được trao trọn đặc quyền kiến tạo, tự do biến “khoảng
                trắng tinh khôi” thành không gian sống mang đậm dấu ấn cá nhân.
              </p>
              <p className="body">
                Một không gian, muôn bản sắc: từ Modern Tropical phóng khoáng, Tân cổ điển sang
                trọng, Indochine hoài cổ đến Địa Trung Hải rực rỡ.
              </p>
              <ul className="phong" aria-label="Phong cách gợi ý">
                {DYHOME_STYLES.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="note" style={{ marginTop: 16 }}>
                Hình ảnh ý tưởng nội thất từ tài liệu chủ đầu tư, mang tính chất minh họa. Căn hộ bàn
                giao theo tiêu chuẩn quy định tại hợp đồng mua bán.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="dy-anh">
              {DY_PHOTOS.map((p, i) => (
                <figure
                  key={p.lon}
                  className={i === 0 ? "lon" : ""}
                  onClick={() => openLightbox(p.lon, p.alt)}
                >
                  <Image
                    src={p.src800}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    decoding="async"
                    alt={p.alt}
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
