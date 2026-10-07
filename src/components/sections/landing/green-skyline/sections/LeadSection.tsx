"use client";

import Image from "next/image";
import { CTA, PRODUCT_TYPES } from "../data";
import { HOTLINE, HOTLINE_TEL } from "../theme";
import { Reveal } from "../Reveal";
import { submitLeadBeacon } from "../../lib/submit-lead";
import { gsFormProduct } from "./form-product";

/* Form đăng ký tham quan — gửi về tab "GREEN SKYLINE" của sheet WATERPOINT
   (sendBeacon fire-and-forget + chuyển trang thank-you ngay, không loading nút). */
export function LeadSection() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const loai = gsFormProduct.current || (f.product as HTMLSelectElement).value;
    submitLeadBeacon({
      formId: "GS_LEAD",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      // Có chọn loại căn: "{loại}-Green Skyline"; không chọn: "-Green Skyline"
      sanpham: (loai ? `${loai}-Green Skyline` : "-Green Skyline"),
      sheet: "GREEN SKYLINE",
    });
    window.location.href = "/thank-you-green-skyline";
  };

  return (
    <section className="cta" id="dang-ky">
      <Image
        src={CTA.ctaBg}
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
            <p className="kick">{CTA.kick}</p>
            <h2>{CTA.h2}</h2>
            <p className="lead">{CTA.lead}</p>
            <ul>
              {CTA.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <ul className="loai" aria-label="Loại căn hộ">
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
              <select
                className="field"
                name="product"
                aria-label="Loại căn quan tâm"
                defaultValue=""
                onChange={(event) => {
                  gsFormProduct.current = event.currentTarget.value;
                }}
              >
                <option value="">Loại căn quan tâm</option>
                {PRODUCT_TYPES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <button className="nut cursor-pointer" type="submit" style={{ width: "100%" }}>
                ĐĂNG KÝ THAM QUAN
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
