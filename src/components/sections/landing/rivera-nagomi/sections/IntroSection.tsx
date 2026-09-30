"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMG } from "../theme";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

export function IntroSection() {
  return (
    <section className="sec bg-mist" id="gioi-thieu" style={{ scrollMarginTop: 74 }}>
      <div className="wrap">
        <div className="intro">
          <motion.div
            {...fadeUp}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="intro-t"
          >
            <h2>Phân khu thấp tầng ven sông trong đô thị Waterpoint</h2>
            <div className="body">
              <p>
                Rivera Nagomi là phân khu thấp tầng nằm trong khu đô thị Waterpoint, có mặt tiền
                đường ĐT.830, thuộc xã Bến Lức, tỉnh Tây Ninh. Phân khu do Công ty Cổ phần Đầu tư
                Nam Long phát triển cùng đối tác Nhật Bản Nishi-Nippon Railroad.
              </p>
              <p>
                Rivera Nagomi có tổng diện tích 5,8 ha, trong đó phần mặt nước chiếm khoảng 3 ha,
                gồm 158 căn thuộc bốn dòng sản phẩm: shophouse, nhà phố vườn, biệt thự song lập và
                biệt thự đơn lập.
              </p>
            </div>
            <p className="intro-q">
              “Nagomi” trong tiếng Nhật là trạng thái hài hoà, cân bằng. Tinh thần ấy nằm trong
              cảnh quan: sân vườn, đường dạo và mảng nước xen giữa các dãy nhà, thay vì gom tiện
              ích về một góc riêng.
            </p>
          </motion.div>
          <motion.figure
            {...fadeUp}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="intro-fig"
          >
            <Image
              src={`${IMG}/rivera-nagomi-toan-canh-tu-tren-cao.webp`}
              alt="Phối cảnh Rivera Nagomi nhìn từ trên cao: ranh phân khu ven sông, dãy nhà phố, biệt thự, hồ bơi và sân thể thao"
              fill
              sizes="(max-width: 820px) 100vw, 520px"
              className="object-cover"
            />
            <figcaption>TOÀN CẢNH PHÂN KHU TỪ TRÊN CAO · PHỐI CẢNH MINH HOẠ</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
