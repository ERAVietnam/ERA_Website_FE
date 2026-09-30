"use client";

import { HOTLINE, HOTLINE_TEL, ZALO_LINK } from "../theme";

export function FooterSection() {
  return (
    <footer>
      <div className="fb">
        RIVERA NAGOMI<small>PHÂN KHU THẤP TẦNG · KHU ĐÔ THỊ WATERPOINT</small>
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
        Hình ảnh phối cảnh và mẫu nhà mang tính minh hoạ. Giá trên trang là giá tham khảo, chưa
        phải bảng giá chính thức của chủ đầu tư; giá, chính sách và tiến độ có thể thay đổi theo
        từng thời điểm, thông tin chính thức căn cứ theo hợp đồng mua bán.
      </p>
    </footer>
  );
}
