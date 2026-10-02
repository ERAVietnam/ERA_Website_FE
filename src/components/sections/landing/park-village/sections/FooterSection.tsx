"use client";

import { HOTLINE, HOTLINE_TEL, ZALO_LINK } from "../theme";

export function FooterSection() {
  return (
    <footer>
      <div className="fb">
        PARK VILLAGE<small>COMPOUND BIỆT THỰ · KHU ĐÔ THỊ WATERPOINT</small>
      </div>
      <div className="links">
        <a href={`tel:${HOTLINE_TEL}`}>Hotline: {HOTLINE}</a>
        <a href={ZALO_LINK} target="_blank" rel="noopener">
          Zalo tư vấn
        </a>
      </div>
      <p>
        Tư vấn &amp; phân phối: ERA Vietnam · Số 22 - 24, Đường số 5, KĐT Sala, Phường An Khánh,
        TP. Hồ Chí Minh.
        <br />
        Hình ảnh phối cảnh &amp; bố trí công trình mang tính chất minh họa, có thể điều chỉnh.
        Thông tin chính thức được căn cứ trên hợp đồng mua bán.
      </p>
    </footer>
  );
}
