"use client";

import Image from "next/image";
import { CTA_BULLETS } from "../data";
import { HOTLINE, HOTLINE_TEL, IMG } from "../theme";
import { Reveal } from "../Reveal";
import { submitLeadBeacon } from "../../lib/submit-lead";
import { wqFormProduct } from "./form-product";

const PRODUCT_TYPES = ["Studio", "1 phòng ngủ", "2 phòng ngủ", "3 phòng ngủ", "Shophouse"];

/* Khối CTA cuối trang — bổ sung form đăng ký (cấu trúc theo form Thanh Phú,
   đổi màu theo palette The Westique). Gửi về tab "WESTIQUE" của sheet WATERPOINT
   (sendBeacon fire-and-forget + chuyển trang thank-you ngay, không loading nút). */
export function CtaSection() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const loai = wqFormProduct.current || (f.product as HTMLSelectElement).value;
    submitLeadBeacon({
      formId: "WS_LEAD",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      // Có chọn loại căn: "{loại}-Westique"; không chọn: "-Westique"
      sanpham: (loai ? `${loai}-Westique` : "-Westique"),
      sheet: "WESTIQUE",
    });
    window.location.href = "/thank-you-westique";
  };

  return (
    <section className="cta" id="dang-ky">
      <Image
        src={`${IMG}/the-westique-residences-phoi-canh-ve-dem-800.webp`}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="cta-shade" aria-hidden="true"></div>
      <div className="cta-in co-form">
        <Reveal>
          <div className="cta-box">
            <h2>
              Nhận trọn bộ tài liệu <span className="nw">The Westique Residences</span>
            </h2>
            <p className="lead">
              Sống có chất, ở có gu – chọn căn đẹp trong 99 sản phẩm giới hạn cùng chuyên viên ERA
              Vietnam.
            </p>
            <ul>
              {CTA_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="ket">
              Chuyên viên ERA gọi lại gửi tài liệu và hẹn lịch tham quan nhà mẫu cùng anh/chị.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="form-card">
            <div className="t">Đăng ký nhận tài liệu</div>
            <div className="s">Bảng giá từng căn, mặt bằng, chính sách mới nhất và lịch tham quan nhà mẫu · Bảo mật thông tin</div>
            <form onSubmit={onSubmit}>
              <input
                className="field"
                name="hoten"
                autoComplete="name"
                required
                placeholder="Họ tên (*)"
                aria-label="Họ tên"
              />
              <input
                className="field"
                name="sdt"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                required
                pattern="[0-9 .+\-()]{9,16}"
                title="Số di động 10 chữ số, bắt đầu bằng 03/05/07/08/09"
                placeholder="Số điện thoại (*)"
                aria-label="Số điện thoại"
              />
              <select className="field" name="product" aria-label="Loại sản phẩm quan tâm" defaultValue="">
                <option value="">Loại sản phẩm quan tâm</option>
                {PRODUCT_TYPES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <button className="nut cursor-pointer" type="submit">
                NHẬN TÀI LIỆU
              </button>
            </form>
            <p className="hot">
              Hoặc gọi ngay <a href={`tel:${HOTLINE_TEL}`}>{HOTLINE}</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
