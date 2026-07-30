"use client";

import { c } from "../theme";
import { LeadForm } from "./LeadForm";

export function LeadBandB() {
  return (
    <section className="relative text-white overflow-hidden py-16 md:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/landing/forest-onsen/02_img/canh/forest-onsen-ban-cong-view-ho-binh-minh.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg,rgba(28,40,32,.84),rgba(28,40,32,.4))",
        }}
      />
      <div className="relative z-10 max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.05fr_.95fr] gap-8 md:gap-12 items-center">
        <div className="reveal">
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(26px,3.2vw,38px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            Tải file báo giá &
            <br />chính sách ưu đãi.
          </h2>
          <p className="text-[15.5px] mt-4 text-white/85 max-w-[420px]">
            Bảng giá từng dòng sản phẩm, chính sách thanh toán và ưu đãi, cập nhật
            mới nhất.
          </p>
        </div>
        <div className="reveal bg-white/97 rounded-2xl p-8" style={{ color: c.ink }}>
          <LeadForm
            formId="FORM3"
            title="Tải file báo giá"
            subtitle="Nhập thông tin, file gửi ngay tới bạn."
            submitText="Nhận file báo giá"
            footnote="Cam kết bảo mật. Chỉ dùng để gửi tài liệu và tư vấn theo yêu cầu."
          />
        </div>
      </div>
    </section>
  );
}
