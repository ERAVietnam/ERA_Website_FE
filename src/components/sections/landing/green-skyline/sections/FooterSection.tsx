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
              Đại lý chính thức phân phối dự án <span className="nw">Green Skyline</span>
            </strong>
          </div>
          <p>
            ERA Vietnam tự hào đồng hành cùng Green Skyline trong vai trò đại lý phân phối, mang
            đến cho Quý khách hàng một lựa chọn an cư và đầu tư dựa trên những giá trị thật tại khu
            đô thị Green Square.
          </p>
        </div>
        <div className="lg">
          <Image
            className="gs-logo"
            src={`${IMG}/green-skyline-logo-ngang-trang.svg`}
            alt="Logo Green Skyline"
            width={796}
            height={171}
            loading="lazy"
            decoding="async"
          />
          <Image
            className="tb"
            src={`${IMG}/tbs-land-logo-trang.webp`}
            alt="Logo TBS Land"
            width={351}
            height={81}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <p className="ft-legal">
        Chủ đầu tư: Công ty Cổ phần Đầu tư Thái Bình – TBS Land, thành viên TBS Group. Quản lý vận
        hành: Savills. Mọi hình ảnh và thông tin trong trang chỉ mang tính chất tham khảo, hình ảnh
        phối cảnh mang tính chất minh họa; thông số bản vẽ chỉ là tương đối, thông số chính thức
        được quy định tại văn bản ký kết với khách hàng. Giá bán, chính sách bán hàng và thờI điểm
        bàn giao căn cứ theo công bố chính thức của chủ đầu tư và hợp đồng mua bán.
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
