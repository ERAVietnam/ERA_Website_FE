"use client";

import { useState } from "react";
import { c } from "../theme";
import { submitLead } from "../lib/submit-lead";

export function LeadBandA() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.currentTarget;
      await submitLead({
        hoten: (form.hoten as HTMLInputElement).value,
        sdt: (form.sdt as HTMLInputElement).value,
        formId: "FORM2",
      });
      window.location.href = "/thank-you-eco-retreat";
    } catch {
      alert("Gửi thất bại, vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  return (
    <section className="relative text-white overflow-hidden py-16 md:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/landing/forest-onsen/02_img/canh/forest-onsen-ban-cong-hoang-hon-thu-gian.jpg')",
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
            Nhận bộ tài liệu &
            <br />bảng giá đặc quyền.
          </h2>
          <p className="text-[15.5px] mt-4 text-white/85 max-w-[420px]">
            Phối cảnh, mặt bằng các dòng sản phẩm giới hạn và chính sách thanh toán,
            gửi riêng tới bạn.
          </p>
        </div>
        <div className="reveal bg-white/97 rounded-2xl p-8" style={{ color: c.ink }}>
          <form onSubmit={handleSubmit}>
            <h3 className="text-[17px] font-semibold">Đăng ký nhận tài liệu</h3>
            <p className="text-[13px] mt-1 mb-5" style={{ color: c.inkSoft }}>
              Chuyên viên cấp cao ERA Vietnam liên hệ riêng.
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
                  Gửi yêu cầu{" "}
                  <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px] transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </>
              )}
            </button>
            <p className="text-[11px] mt-3 leading-relaxed" style={{ color: c.inkSoft }}>
              Thông tin được bảo mật tuyệt đối. Chỉ một chuyên viên phụ trách liên
              hệ.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
