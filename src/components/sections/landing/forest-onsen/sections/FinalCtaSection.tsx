"use client";

import { useState } from "react";
import { projectInfo } from "../data";
import { c } from "../theme";

export function FinalCtaSection() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="dang-ky" className="relative text-white overflow-hidden py-16 md:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/landing/forest-onsen/02_img/canh/forest-onsen-vuon-onsen-kieu-nhat.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg,rgba(28,40,32,.86),rgba(28,40,32,.45))",
        }}
      />
      <div className="relative z-10 max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1fr_440px] gap-8 md:gap-14 items-center">
        <div>
          <div className="text-xs font-medium tracking-[2.5px] uppercase text-white/85">
            Đặc quyền sở hữu
          </div>
          <h2
            className="font-medium mt-4 leading-[1.08] tracking-wide"
            style={{
              fontSize: "clamp(28px,3.6vw,46px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            Bắt đầu hành trình
            <br />
            sống chuẩn Onsen.
          </h2>
          <p className="text-[15.5px] mt-4 text-white/86 max-w-[430px]">
            Bộ tài liệu đặc quyền gồm phối cảnh, mặt bằng dòng sản phẩm giới hạn,
            bảng giá và chính sách.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {[
              "Phối cảnh & mặt bằng chi tiết từng dòng căn",
              "Bảng giá và chính sách thanh toán cập nhật",
              "Đặt lịch trải nghiệm Onsen & tham quan riêng tư",
            ].map((p) => (
              <div key={p} className="flex items-center gap-3 text-[14.5px] text-white/92">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.gold }} />
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-8 md:p-9" style={{ color: c.ink, boxShadow: "0 40px 90px -40px rgba(0,0,0,.55)" }}>
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <h3
                className="text-[26px] font-semibold mb-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Gửi yêu cầu nhận tài liệu
              </h3>
              <p className="text-[13.5px] mb-5" style={{ color: c.inkSoft }}>
                Chuyên viên cấp cao ERA Vietnam liên hệ trong 24h.
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
              <div className="mb-3">
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
              <div className="mb-4">
                <label className="block text-xs font-medium mb-1 tracking-wide" style={{ color: c.inkSoft }}>
                  Dòng sản phẩm quan tâm
                </label>
                <select
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-lg border text-[15px] transition-all focus:outline-none focus:ring-2"
                  style={{ borderColor: c.line }}
                >
                  <option value="" disabled>
                    Chọn dòng sản phẩm
                  </option>
                  <option>3PN trực diện Hồ Thiên Nga</option>
                  <option>Garden Villa</option>
                  <option>Duplex / Mezza</option>
                  <option>Penthouse</option>
                  <option>Căn hộ 1PN - 2PN</option>
                  <option>Chưa xác định</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white transition-all"
                style={{ background: c.green }}
              >
                Gửi yêu cầu nhận tài liệu{" "}
                <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px]">
                  →
                </span>
              </button>
              <p className="text-center text-[13px] mt-4" style={{ color: c.inkSoft }}>
                Hoặc{" "}
                <a href={`tel:${projectInfo.phone.replace(/\./g, "")}`} className="font-medium" style={{ color: c.green }}>
                  đặt lịch tham quan riêng tư
                </a>
                .
              </p>
            </form>
          ) : (
            <div className="text-center py-8" style={{ color: c.greenDeep }}>
              <div className="text-3xl mb-3">✓</div>
              <p className="text-base">
                Cảm ơn bạn. Bộ tài liệu đặc quyền sẽ được gửi sớm nhất.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Sticky Widget ─── */
