"use client";

import Image from "next/image";
import { NK_CARDS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function ExternalSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="ngoai-khu">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>
              Hưởng lợi tuyệt đối từ tiện ích ngoại khu{" "}
              <span className="dong2">“Một bước chân – Ngàn điểm đến”</span>
            </h2>
            <p className="body" style={{ marginTop: 18 }}>
              Bên cạnh tiện ích nội khu đỉnh cao, nhờ tọa lạc tại “tọa độ vàng” Lô A4 vòng xoay
              WTC, cư dân Nam Mekong Grand Plaza được tận hưởng mạng lưới tiện ích vĩ mô biểu
              tượng của khu vực.
            </p>
          </div>
        </Reveal>

        <div className="nk">
          {NK_CARDS.map((c) => (
            <Reveal key={c.b}>
              <figure className="nk-card">
                <div className="ph" onClick={() => openLightbox(c.zoom, c.b)}>
                  <Image src={c.src} alt={c.alt} width={c.w} height={c.h} loading="lazy" />
                </div>
                <figcaption>
                  <b>{c.b}</b>
                  <p>{c.p}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="nk-ket">
          <Reveal>
            <div className="box bg-lav">
              <p className="body">
                Hệ thống tiện ích Nam Mekong Grand Plaza không đơn thuần là những hạng mục vật lý,
                mà là một bản giao hưởng hoàn hảo giữa kiến trúc hiện đại và nhịp sống phồn hoa.
                Lựa chọn an cư tại đây đồng nghĩa với việc bạn đang nắm giữ đặc quyền bước vào cộng
                đồng tinh hoa bậc nhất Bình Dương, nơi mỗi ngày trôi qua đều là một trải nghiệm
                sống đẳng cấp, an toàn và trọn vẹn.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="box bg-lav">
              <h3 className="card-h">Trong bán kính 2–4 km</h3>
              <p className="body" style={{ marginTop: 10, fontSize: 15.5 }}>
                7 khu công nghiệp và 1 cụm công nghiệp: KCN Đại Đăng, Sóng Thần 3, Kim Huy, VSIP
                2, Đồng An 2, Phú Tân, KCN công nghệ cao Mapletree Việt Nam và cụm công nghiệp Phú
                Chánh — nguồn cư dân chuyên gia và nhu cầu thuê ổn định.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
