"use client";

import Image from "next/image";
import { IMG, theme } from "../theme";
import { Reveal } from "../Reveal";
import { submitLeadBeacon } from "../../lib/submit-lead";

const BULLETS = [
  "Xem clubhouse, vườn Âu và mẫu biệt thự Grand Villa",
  "Nhận bảng giá và chính sách ngay khi chủ đầu tư công bố",
  "Đi một vòng Waterpoint: River Club, bến du thuyền, EMASI Plus",
];

const PRODUCTS = ["Garden Grand Villa", "Park Grand Villa", "Canal Grand Villa", "Chưa xác định"];
const VISITS = ["Cuối tuần này", "Tuần tới", "Chưa xác định"];

const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 10,
  padding: 14,
  fontSize: 15,
  outline: "none",
  background: "#FFFFFF",
  color: theme.ink,
  boxSizing: "border-box",
};

/* Form đăng ký tham quan — gửi về sheet WATERPOINT theo cách của các landing
   (sendBeacon + chuyển trang thank-you ngay). Cột "Sản phẩm" gắn hậu tố "-Park Village". */
export function LeadSection() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const product = (f.product as HTMLSelectElement).value;
    const visit = (f.visit as HTMLSelectElement).value;
    submitLeadBeacon({
      formId: "PV_LEAD",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      // Có chọn sản phẩm: "{sản phẩm}-Park Village"; không chọn: "-Park Village"
      sanpham:
        (product ? `${product}-Park Village` : "-Park Village") +
        (visit ? ` — Tham quan: ${visit}` : ""),
      sheet: "WATERPOINT",
    });
    window.location.href = "/thank-you-waterpoint";
  };

  return (
    <section className="cta" id="dang-ky">
      <Image
        src={`${IMG}/park-village-biet-thu-ven-kenh-dao.webp`}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="cta-shade" aria-hidden="true"></div>
      <div className="cta-in">
        <Reveal>
          <div>
            <h2>Đăng ký tham quan Park Village</h2>
            <p className="serif-lead">
              Trực tiếp trải nghiệm không gian sống Châu Âu, hệ tiện ích và giá trị khác biệt tại
              Park Village – Waterpoint.
            </p>
            <ul>
              {BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="form-card">
            <div className="t">Đăng ký tham quan Park Village</div>
            <div className="s">Tư vấn viên gọi lại trong ngày · Bảo mật thông tin</div>
            <form onSubmit={onSubmit}>
              <input
                className="field"
                name="hoten"
                autoComplete="name"
                required
                placeholder="Họ và tên"
                aria-label="Họ và tên"
                style={fieldStyle}
              />
              <input
                className="field"
                name="sdt"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                required
                pattern="[0-9 .+()-]{9,16}"
                title="Số di động 10 chữ số, bắt đầu bằng 03/05/07/08/09"
                placeholder="Số điện thoại"
                aria-label="Số điện thoại"
                style={fieldStyle}
              />
              <select className="field" name="product" aria-label="Dòng sản phẩm quan tâm" style={fieldStyle} defaultValue="">
                <option value="">Dòng sản phẩm quan tâm</option>
                {PRODUCTS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <select className="field" name="visit" aria-label="Thời điểm muốn tham quan" style={fieldStyle} defaultValue="">
                <option value="">Thời điểm muốn tham quan</option>
                {VISITS.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <button className="btn-sq cursor-pointer" type="submit" style={{ padding: 17, fontSize: 15 }}>
                GỬI ĐĂNG KÝ
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
