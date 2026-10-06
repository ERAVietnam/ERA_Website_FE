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
            <span>ERA Vietnam</span>
            <strong>
              Đại lý phân phối chính thức dự án <span className="nw">The Aspira</span>
            </strong>
          </div>
          <p>
            ERA Vietnam tự hào đồng hành cùng The Aspira trong vai trò Đại lý Phân phối Chính thức,
            mang đến cho Quý khách hàng một lựa chọn an cư và đầu tư tại vùng Tân Đông Hiệp,
            TP.HCM.
          </p>
        </div>
        <Image
          className="asp-logo"
          src={`${IMG}/the-aspira-logo-trang.svg`}
          alt="Logo The Aspira"
          width={107}
          height={97}
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="ft-legal">
        Chủ đầu tư: Công ty TNHH Đầu tư Bất động sản Phúc An Gia. Đơn vị phát triển: Công ty Cổ
        phần Đầu tư Sài Gòn High Rise. Hình ảnh, tiện ích và thông số trong trang mang tính chất
        minh họa, có thể được điều chỉnh theo thiết kế được phê duyệt và quyết định của chủ đầu tư.
        Giá bán, chính sách bán hàng và thờI điểm bàn giao căn cứ theo công bố chính thức của chủ
        đầu tư và hợp đồng mua bán.
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
