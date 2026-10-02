"use client";

import Image from "next/image";
import { IMG } from "../theme";

/* Footer — đại lý phân phối chính thức (theo mẫu) */
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
        />
        <div>
          <div className="fb">
            ERA VIETNAM<strong>Đại lý phân phối chính thức dự án SkySOLIS</strong>
          </div>
          <p>
            ERA Vietnam vô cùng tự hào khi được đồng hành cùng siêu phẩm SkySOLIS trong vai trò Đại
            lý Phân phối Chính thức. Sự kiện này đánh dấu bước tiến mới, mang đến cho Quý khách
            hàng một lựa chọn an cư và đầu tư sáng giá bậc nhất tại khu Bắc Sài Gòn.
          </p>
        </div>
      </div>
      <p className="ft-legal">
        Chủ đầu tư: Công ty TNHH MTV Vina An Thuận Phát. Đơn vị phát triển: SkyWorld Development
        (Malaysia) thông qua Công ty TNHH SkyWorld Development (Việt Nam). Đại lý phân phối chính
        thức: ERA Vietnam. Hình ảnh, tiện ích, bản vẽ và thông số trong trang mang tính chất minh
        họa, có thể được điều chỉnh theo quy hoạch được phê duyệt và quyết định của chủ đầu tư.
        Thông tin chính thức căn cứ trên hồ sơ pháp lý và hợp đồng mua bán.
      </p>
    </footer>
  );
}
