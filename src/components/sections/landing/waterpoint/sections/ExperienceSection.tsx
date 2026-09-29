"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { experienceImages } from "../data";

const ALTS: Record<string, string> = {
  "duong-dao-ven-kenh": "Đường dạo ven kênh buổi sáng trong Waterpoint",
  "cong-vien-trung-tam": "Công viên trung tâm với hồ nước và hàng cọ",
  "san-choi-tre-em": "Sân chơi trẻ em trong khu",
  "ho-boi-ngoai-troi": "Hồ bơi ngoài trờI",
  "san-pickleball-mai-che": "Sân pickleball có mái che",
  "country-club-the-thao": "Country Club với hồ bơi, sân tennis và công viên cây xanh",
  "san-vuon-canh-quan-biet-thu": "Sân vườn cảnh quan trước biệt thự",
  "bo-ke-hoa-mat-nuoc": "Bờ kè hoa chạy dọc mặt nước",
  "gia-dinh-cam-trai-ven-song": "Gia đình cắm trại ven sông cuối tuần",
  "hoang-hon-ben-song": "Hoàng hôn bên sông Waterpoint",
};

export function ExperienceSection() {
  const track = [...experienceImages, ...experienceImages];

  // Hiệu ứng 3D: xoay/đẩy ảnh theo khoảng cách tới tâm khung nhìn
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const box = document.querySelector(".aq-day-3d");
      if (box) {
        const r = box.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const half = r.width / 2 || 1;
        const items = box.querySelectorAll<HTMLElement>(".aq-day-it");
        for (let i = 0; i < items.length; i++) {
          const it = items[i];
          const ir = it.getBoundingClientRect();
          if (ir.right < r.left - 260 || ir.left > r.right + 260) {
            it.style.opacity = "0";
            continue;
          }
          let d = (ir.left + ir.width / 2 - cx) / half;
          if (d > 1.25) d = 1.25;
          if (d < -1.25) d = -1.25;
          const ad = d < 0 ? -d : d;
          it.style.transform =
            "translateZ(" + -210 * ad + "px) rotateY(" + -27 * d + "deg) scale(" + (1 - 0.2 * ad) + ")";
          it.style.opacity = String(Math.max(0.16, 1 - 0.75 * ad));
          it.style.zIndex = String(100 - Math.round(ad * 100));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="w-full" style={{ background: theme.iceMid, padding: "clamp(58px,6vw,96px) 22px" }}>
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-[34px] max-w-[880px] text-center"
        >
          <span className="text-sm font-bold tracking-[0.17em]" style={{ color: theme.textSoft }}>
            TRẢI NGHIỆM SỐNG
          </span>
          <h2
            className="mt-3 font-extrabold"
            style={{ color: theme.primary, fontSize: "clamp(22px,3.1vw,40px)", lineHeight: 1.15 }}
          >
            CUỐI TUẦN Ở WATERPOINT
          </h2>
          <p
            className="mt-3 italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.primary,
              fontSize: "clamp(18px,2vw,25px)",
              lineHeight: 1.4,
            }}
          >
            Cắm trại, thả diều, đón gió sông — ngay trước cửa nhà.
          </p>
        </motion.div>
      </div>

      {/* 3D carousel full-width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="aq-day-3d w-full"
      >
        <div className="aq-day-track">
          {track.map((img, i) => (
            <div key={`${img}-${i}`} className="aq-day-it">
              <Image
                src={`/landing/waterpoint/waterpoint-${img}.webp`}
                alt={ALTS[img] || "Một ngày tại Waterpoint"}
                width={660}
                height={495}
                loading="lazy"
                className="block h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[1180px] space-y-5 text-center"
        >
          <p
            className="mx-auto mt-[clamp(26px,2.8vw,38px)] mb-0"
            style={{ color: theme.text, fontSize: 18, lineHeight: 1.75, maxWidth: 860 }}
          >
            Sáng thứ Bảy, cả nhà xách lều ra bãi cỏ Harbour ven sông, đi bộ vài phút là tới. NgườI lớn trải bạt ngồi hóng gió, bọn trẻ chạy theo con diều đến trưa.
          </p>
          <p className="mx-auto mb-0" style={{ color: theme.text, fontSize: 18, lineHeight: 1.75, maxWidth: 860 }}>
            Chiều xuống, gió sông mát dần, cả nhà dạo bờ kè hoa ngắm hoàng hôn trên mặt nước. Không phải chất đồ lên xe, không phải chạy hàng giờ đi tìm chỗ cắm trại.
          </p>
          <p className="mx-auto mt-[clamp(26px,2.8vw,38px)] mb-0" style={{ color: theme.primarySoft, fontSize: 18, lineHeight: 1.7, maxWidth: 860 }}>
            Và câu hỏi không còn là &ldquo;Cuối tuần này đi đâu?&rdquo; mà là
          </p>
          <p
            className="mx-auto mt-3 mb-0 text-center italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.primary,
              fontSize: "clamp(26px,4vw,52px)",
              lineHeight: 1.25,
              maxWidth: 860,
            }}
          >
            &ldquo;Chiều nay, cả nhà ra sông thả diều nhé.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
