"use client";

import Image from "next/image";
import { IMG } from "../theme";

export function FooterSection() {
  return (
    <footer>
      <div className="ft">
        <Image
          src={`${IMG}/era-vietnam-logo-trang.webp`}
          alt="Logo ERA Vietnam"
          width={196}
          height={240}
          loading="lazy"
          decoding="async"
        />
        <div>
          <div className="fb">
            ERA VIETNAM<strong>Tư vấn dự án Celesta Gold</strong>
          </div>
          <p>
            Trang thông tin dự án Celesta Gold do ERA Vietnam tổng hợp, giúp Quý khách hàng tìm
            hiểu dự án cùng chuyên viên tư vấn.
          </p>
        </div>
      </div>
      <p className="ft-legal">
        Chủ đầu tư: Liên danh Keppel (Singapore) – Phú Long (Việt Nam) – Nomura Real Estate Vietnam
        (Nhật Bản). Hình ảnh, tiện ích và thông số trong trang mang tính chất minh họa, có thể được
        điều chỉnh theo quy hoạch được phê duyệt và quyết định của chủ đầu tư. Giá bán, chính sách
        bán hàng và thờI điểm bàn giao căn cứ theo công bố chính thức của chủ đầu tư.
      </p>
    </footer>
  );
}
