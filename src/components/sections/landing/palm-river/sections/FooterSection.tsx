"use client";

import Image from "next/image";
import { HOTLINE, HOTLINE_TEL, IMG, ZALO_LINK } from "../theme";

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
            ERA VIETNAM<small>ĐẠI LÝ PHÂN PHỐI CHÍNH THỨC DỰ ÁN PALM RIVER</small>
          </div>
          <p>
            ERA Vietnam vô cùng tự hào khi được đồng hành cùng siêu phẩm Palm River trong vai trò
            Đại lý Phân phối Chính thức. Sự kiện này đánh dấu bước tiến mới, mang đến cho Quý khách
            hàng một lựa chọn an cư và đầu tư sáng giá bậc nhất tại Khu Đông.
          </p>
          <div className="links">
            <a href={`tel:${HOTLINE_TEL}`}>Hotline: {HOTLINE}</a>
            <a href={ZALO_LINK} target="_blank" rel="noopener">
              Zalo tư vấn
            </a>
          </div>
        </div>
      </div>
      <p className="legal">
        ERA Vietnam · Số 22 - 24, Đường số 5, KĐT Sala, Phường An Khánh, TP. Hồ Chí Minh.
        <br />
        Chủ đầu tư: Công ty TNHH Nam Rạch Chiếc · Đơn vị phát triển: Hướng Việt Properties. Hình ảnh
        phối cảnh, nội thất và bố trí công trình mang tính chất minh họa, có thể điều chỉnh. Thông tin
        chính thức được căn cứ trên hợp đồng mua bán.
      </p>
    </footer>
  );
}
