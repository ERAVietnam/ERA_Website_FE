"use client";

import Image from "next/image";
import { HOTLINE, HOTLINE_TEL, IMG, ZALO_LINK } from "../theme";

export function FooterSection() {
  return (
    <footer>
      <div className="ft">
        <Image
          className="era"
          src={`${IMG}/era-vietnam-logo-trang.webp`}
          alt="Logo ERA Vietnam"
          width={196}
          height={240}
          loading="lazy"
          decoding="async"
        />
        <div>
          <div className="fb">
            <span>ERA VIETNAM</span>
            <strong>Đại lý phân phối chính thức dự án The Westique Residences</strong>
          </div>
          <p>
            Trang thông tin dự án The Westique Residences do ERA Vietnam tổng hợp từ tài liệu chủ
            đầu tư, giúp Quý khách hàng tìm hiểu dự án cùng chuyên viên tư vấn.
          </p>
        </div>
        <Image
          className="wq-logo"
          src={`${IMG}/the-westique-residences-logo-sang.webp`}
          alt="Logo The Westique Residences"
          width={628}
          height={200}
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="ft-legal">
        Chủ đầu tư: Công ty Cổ phần Bất động sản Bản Việt (VCRE). Hình ảnh, tiện ích và thông số
        trong trang mang tính chất minh họa, có thể được điều chỉnh theo quy hoạch được phê duyệt
        và quyết định của chủ đầu tư. Giá bán, chính sách bán hàng và thờI điểm bàn giao căn cứ
        theo công bố chính thức của chủ đầu tư và hợp đồng mua bán.
      </p>
      <p className="ft-dc">ERA Vietnam · Số 22 - 24, Đường số 5, KĐT Sala, Phường An Khánh, TP. Hồ Chí Minh.</p>
      <div className="links">
        <a href={`tel:${HOTLINE_TEL}`}>Hotline: {HOTLINE}</a>
        <a href={ZALO_LINK} target="_blank" rel="noopener">
          Zalo tư vấn
        </a>
      </div>
    </footer>
  );
}
