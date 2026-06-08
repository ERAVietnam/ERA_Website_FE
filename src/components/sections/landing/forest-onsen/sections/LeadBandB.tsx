"use client";

import { useState } from "react";
import { c } from "../theme";

export function LeadBandB() {
  const [submitted, setSubmitted] = useState(false);
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
        <div>
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
        <div className="bg-white/97 rounded-2xl p-8" style={{ color: c.ink }}>
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <h3 className="text-[17px] font-semibold">Tải file báo giá</h3>
              <p className="text-[13px] mt-1 mb-5" style={{ color: c.inkSoft }}>
                Nhập thông tin, file gửi ngay tới bạn.
              </p>
              <div className="mb-3">
                <label className="block text-xs font-medium mb-1 tracking-wide" style={{ color: c.inkSoft }}>
                  Họ và tên
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-3 rounded-lg border text-[15px] transition-all focus:outline-none focus:ring-2"
                  style={{ borderColor: c.line }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium mb-1 tracking-wide" style={{ color: c.inkSoft }}>
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  required
                  placeholder="09xx xxx xxx"
                  pattern="[0-9 ]{9,13}"
                  className="w-full px-4 py-3 rounded-lg border text-[15px] transition-all focus:outline-none focus:ring-2"
                  style={{ borderColor: c.line }}
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white transition-all"
                style={{ background: c.green }}
              >
                Nhận file báo giá{" "}
                <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px]">
                  →
                </span>
              </button>
              <p className="text-[11px] mt-3 leading-relaxed" style={{ color: c.inkSoft }}>
                Cam kết bảo mật. Chỉ dùng để gửi tài liệu và tư vấn theo yêu cầu.
              </p>
            </form>
          ) : (
            <div className="text-center py-6" style={{ color: c.greenDeep }}>
              <div className="text-2xl mb-2">✓</div>
              <p className="text-sm">
                Đã ghi nhận. File báo giá sẽ được gửi tới bạn ngay.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Policy ─── */
