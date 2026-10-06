"use client";

import Image from "next/image";
import { CTA, PRODUCT_TYPES } from "../data";
import { HOTLINE, HOTLINE_TEL, IMG } from "../theme";
import { Reveal } from "../Reveal";
import { submitLeadBeacon } from "../../lib/submit-lead";
import { aspFormProduct } from "./form-product";

/* Form nhận báo giá — gửi về tab "THE ASPIRA" của sheet WATERPOINT
   (sendBeacon fire-and-forget + chuyển trang thank-you ngay, không loading nút). */
export function LeadSection() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const loai = aspFormProduct.current || (f.product as HTMLSelectElement).value;
    submitLeadBeacon({
      formId: "AS_LEAD",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      // Có chọn loại căn: "{loại}-The Aspira"; không chọn: "-The Aspira"
      sanpham: (loai ? `${loai}-The Aspira` : "-The Aspira"),
      sheet: "THE ASPIRA",
    });
    window.location.href = "/thank-you-the-aspira";
  };

  return (
    <section className="cta" id="dang-ky">
      <Image
        src={`${IMG}/the-aspira-dang-ky-nen-2-thap.webp`}
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
              Đăng ký nhận báo giá &amp; bảng tính dòng tiền <span className="nw">The Aspira</span>
            </h2>
            <p className="lead">{CTA.lead}</p>
            <ul>
              {CTA.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <ul className="loai" aria-label="Loại căn">
              {CTA.loaiChips.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="ket">{CTA.ket}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="form-card">
            <div className="t">{CTA.formTitle}</div>
            <div className="s">{CTA.formSub}</div>
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
              <select className="field" name="product" aria-label="Loại căn quan tâm" defaultValue="">
                <option value="">Loại căn quan tâm</option>
                {PRODUCT_TYPES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <button className="nut cursor-pointer" type="submit" style={{ width: "100%" }}>
                NHẬN BÁO GIÁ
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
