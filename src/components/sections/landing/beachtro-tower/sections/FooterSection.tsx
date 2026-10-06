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
            <strong>
              Đại lý phân phối dự án <span className="nw">Beachtro Tower</span> –{" "}
              <span className="nw">Blanca City</span>
            </strong>
          </div>
          <p>
            ERA Vietnam đồng hành cùng Beachtro Tower trong vai trò đại lý phân phối, mang đến cho
            Quý khách hàng lựa chọn an cư và khai thác lưu trú bên biển Bãi Sau, Vũng Tàu.
          </p>
        </div>
        <div className="lg">
          <Image
            className="bt-logo"
            src={`${IMG}/beachtro-tower-logo-trang.webp`}
            alt="Logo Beachtro Tower"
            width={436}
            height={198}
            loading="lazy"
            decoding="async"
          />
          <Image
            className="bc"
            src={`${IMG}/blanca-city-logo-trang.webp`}
            alt="Logo Blanca City by Sun Group"
            width={293}
            height={80}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <p className="ft-legal">
        Chủ đầu tư: Tập đoàn Sun Group. Đơn vị phát triển: Sun Property – thành viên Tập đoàn Sun
        Group. Mọi hình ảnh và thông tin trong trang chỉ mang tính chất tham khảo, hình ảnh mang
        tính chất minh họa; thông số bản vẽ chỉ là tương đối, thông số chính thức được quy định tại
        văn bản ký kết với khách hàng. Giá bán, chính sách bán hàng và thờI điểm bàn giao căn cứ
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
