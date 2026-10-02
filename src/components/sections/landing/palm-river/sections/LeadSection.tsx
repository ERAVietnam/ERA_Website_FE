"use client";

import Image from "next/image";
import { CTA } from "../data";
import { HOTLINE, HOTLINE_TEL, IMG } from "../theme";
import { Reveal } from "../Reveal";
import { submitLeadBeacon } from "../../lib/submit-lead";
import { prFormProduct } from "./form-product";

/* Form đăng ký — gửi về tab "PALM RIVER" của sheet WATERPOINT
   (sendBeacon fire-and-forget + chuyển trang thank-you ngay, không loading nút). */
export function LeadSection() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const can = prFormProduct.current;
    submitLeadBeacon({
      formId: "PR_LEAD",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      email: (f.email as HTMLInputElement).value,
      // Có chọn loại căn: "{căn}-Palm River"; không chọn: "-Palm River"
      sanpham: (can ? `${can}-Palm River` : "-Palm River"),
      sheet: "PALM RIVER",
    });
    window.location.href = "/thank-you-palm-river";
  };

  return (
    <section className="cta" id="dang-ky">
      <Image
        src={`${IMG}/palm-river-ven-song-nen-dang-ky-800.webp`}
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
            <p className="ky">{CTA.ky}</p>
            <h2>{CTA.h2}</h2>
            <p className="lead">{CTA.lead}</p>
            <ul>
              {CTA.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
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
                pattern="[0-9 .+()-]{9,16}"
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
                placeholder="Email"
                aria-label="Email"
              />
              <button className="btn cursor-pointer" type="submit" style={{ padding: 17, fontSize: 15 }}>
                GỬI ĐĂNG KÝ
              </button>
            </form>
            <p className="hot">
              Hoặc gọi ngay{" "}
              <a href={`tel:${HOTLINE_TEL}`}>{HOTLINE}</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
