"use client";

import Image from "next/image";
import { HOTLINE, HOTLINE_TEL, IMG } from "../theme";
import { Reveal } from "../Reveal";
import { submitLeadBeacon } from "../../lib/submit-lead";

const BULLETS = [
  "Nhà mẫu căn 2 phòng ngủ (65 m²) và 3 phòng ngủ (85 m²) đã sẵn sàng đón khách",
  "Văn phòng bán hàng trên đường Lê Hoàn, Thành phố mới Bình Dương",
  "Hẹn lịch tham quan cùng chuyên viên ERA đã gửi bạn trang này",
];

/* CTA cuối trang — form đăng ký tham quan (cấu trúc theo form Palm River,
   đổi màu theo theme tím Mekong). Gửi về tab "MEKONG" của sheet WATERPOINT
   (sendBeacon fire-and-forget + chuyển trang thank-you ngay, không loading nút). */
export function CtaSection() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    submitLeadBeacon({
      formId: "NMG_LEAD",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      email: (f.email as HTMLInputElement).value,
      sanpham: "-Nam Mekong",
      sheet: "MEKONG",
    });
    window.location.href = "/thank-you-nam-mekong";
  };

  return (
    <section className="cta" id="tham-quan">
      <Image
        src={`${IMG}/nam-mekong-grand-plaza-hai-thap-ve-dem-tu-tren-cao.webp`}
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
            <h2>Đăng ký tham quan Nam Mekong Grand Plaza</h2>
            <p className="lead">
              Trải nghiệm chất sống all-in-one của sản phẩm căn hộ cao cấp giữa tâm điểm giao
              thương WTC sầm uất.
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
            <div className="t">Đăng ký tham quan</div>
            <div className="s">Chuyên viên ERA gọi lại xác nhận lịch trong ngày · Bảo mật thông tin</div>
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
              <input
                className="field"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Email (không bắt buộc)"
                aria-label="Email"
              />
              <button className="nut cursor-pointer" type="submit" style={{ width: "100%" }}>
                GỬI ĐĂNG KÝ
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
