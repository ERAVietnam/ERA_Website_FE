"use client";

import { useState } from "react";
import { c } from "../theme";
import { submitLead } from "../lib/submit-lead";

export function LeadBandB() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.currentTarget;
      await submitLead({
        hoten: (form.hoten as HTMLInputElement).value,
        sdt: (form.sdt as HTMLInputElement).value,
        formId: "FORM3",
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
      }, 2500);
    } catch {
      alert("Gửi thất bại, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

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
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-10 px-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: "#e8f5e9" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: c.greenDeep }}>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-[17px] font-medium" style={{ color: c.greenDeep }}>
                Đã gửi yêu cầu
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
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
                  name="hoten"
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
                  name="sdt"
                  required
                  placeholder="09xx xxx xxx"
                  pattern="[0-9 ]{9,13}"
                  className="w-full px-4 py-3 rounded-lg border text-[15px] transition-all focus:outline-none focus:ring-2"
                  style={{ borderColor: c.line }}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white transition-all duration-500 bg-[#365b46] hover:bg-[#274434] active:scale-[0.98] group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    Nhận file báo giá{" "}
                    <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px] transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </>
                )}
              </button>
              <p className="text-[11px] mt-3 leading-relaxed" style={{ color: c.inkSoft }}>
                Cam kết bảo mật. Chỉ dùng để gửi tài liệu và tư vấn theo yêu cầu.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
