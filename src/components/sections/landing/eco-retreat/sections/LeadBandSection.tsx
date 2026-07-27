"use client";

import { useState } from "react";
import { c, fonts } from "../theme";
import { projectInfo, stats } from "../data";

export function LeadBandSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI-only placeholder: chưa gắn form lead
    setSubmitted(true);
  };

  return (
    <section
      id="dang-ky"
      className="reveal relative py-[72px] px-5 md:px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#EDF4E3,#F7FAF2)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(20,66,30,0.05) 1.4px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />
      <img
        src="/landing/eco-retreat/02_img/hoa-phuong.webp"
        alt=""
        aria-hidden="true"
        className="absolute top-[-30px] right-[-30px] opacity-50 pointer-events-none z-[1]"
        style={{ width: "clamp(260px,34vw,480px)", height: "auto" }}
      />

      <div
        className="relative z-[2] max-w-[1120px] mx-auto grid md:grid-cols-[1.06fr_0.94fr] rounded-[26px] overflow-hidden border shadow-xl"
        data-stack
        style={{ borderColor: "rgba(20,66,30,0.1)", boxShadow: "0 24px 60px rgba(20,66,30,0.14)" }}
      >
        <div
          className="p-6 md:p-[clamp(34px,3.4vw,50px)] border-b md:border-b-0 md:border-r"
          style={{
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(14px)",
            borderColor: "rgba(20,66,30,0.08)",
          }}
        >
          <span
            className="inline-block"
            style={{
              color: c.red,
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: "clamp(28px,2.8vw,42px)",
              lineHeight: 1,
            }}
          >
            Đăng ký ngay
          </span>
          <h2
            className="font-black leading-[1.1] tracking-tight mt-1.5 mb-3.5"
            style={{ color: c.green, fontSize: "clamp(25px,3vw,38px)" }}
          >
            Nhận <span style={{ color: c.orange }}>bảng giá</span> & vị trí căn còn hàng
          </h2>
          <p
            className="m-0 mb-6"
            style={{ color: "#4b5a4e", fontSize: 15.5, lineHeight: 1.65 }}
          >
            Tiểu khu nhà phố & biệt thự cạnh trường liên cấp Edison trong đại đô thị Eco Retreat (Long An, giáp Nam TP.HCM). Con đi bộ đến lớp qua con đường rợp bóng phượng; ba mẹ về trung tâm TP.HCM 30-40 phút.
          </p>

          <div
            className="grid grid-cols-2 gap-px rounded-[14px] overflow-hidden border"
            style={{ background: "rgba(20,66,30,0.1)", borderColor: "rgba(20,66,30,0.1)" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-4 md:p-5">
                <div
                  className="font-black leading-none"
                  style={{ color: c.orange, fontSize: "clamp(24px,2.4vw,30px)" }}
                >
                  {s.value}
                </div>
                <div className="text-xs mt-1 leading-tight" style={{ color: c.text }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2.5">
            <span className="text-sm" style={{ color: "#6a786d" }}>
              Hotline tư vấn
            </span>
            <a
              href={`tel:${projectInfo.phoneLink}`}
              className="font-black text-[23px] transition-opacity hover:opacity-80"
              style={{ color: c.orange }}
            >
              {projectInfo.phone}
            </a>
          </div>
        </div>

        <div
          className="p-6 md:p-[clamp(32px,3vw,44px)] flex flex-col justify-center"
          style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(18px)" }}
        >
          {submitted ? (
            <div className="text-center py-4">
              <div
                className="w-[58px] h-[58px] mx-auto mb-4 rounded-full flex items-center justify-center text-white text-[29px] font-black"
                style={{ background: c.red }}
              >
                ✓
              </div>
              <div
                className="font-extrabold text-[20px] mb-2"
                style={{ color: c.green }}
              >
                Đã nhận thông tin!
              </div>
              <p className="text-[14.5px] leading-relaxed m-0" style={{ color: c.text }}>
                ERA Vietnam sẽ liên hệ gửi bảng giá & sắp lịch tham quan trong thởi gian sớm nhất.
              </p>
            </div>
          ) : (
            <div>
              <div className="font-extrabold text-[20px] mb-1" style={{ color: c.green }}>
                Để lại thông tin
              </div>
              <div className="text-[13.5px] mb-[18px]" style={{ color: "#777" }}>
                Tư vấn viên gọi lại trong ngày · Bảo mật thông tin
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  name="name"
                  required
                  placeholder="Họ và tên"
                  className="w-full rounded-[11px] p-4 text-[15px] outline-none border-[1.5px]"
                  style={{ borderColor: "#E2E2E2" }}
                />
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full rounded-[11px] p-4 text-[15px] outline-none border-[1.5px]"
                  style={{ borderColor: "#E2E2E2" }}
                />
                <select
                  name="product"
                  className="w-full rounded-[11px] p-4 text-[15px] outline-none border-[1.5px] bg-white"
                  style={{ borderColor: "#E2E2E2", color: c.text }}
                >
                  <option>Dòng sản phẩm quan tâm</option>
                  <option>Nhà phố vườn</option>
                  <option>Shophouse đại lộ</option>
                  <option>Biệt thự song lập</option>
                  <option>Biệt thự đơn lập</option>
                </select>
                <button
                  type="submit"
                  className="w-full text-white font-extrabold text-base py-4 rounded-[11px] transition-opacity hover:opacity-90"
                  style={{ background: c.red, boxShadow: "0 10px 26px rgba(229,57,28,0.32)" }}
                >
                  Nhận bảng giá
                </button>
                <div className="text-[11.5px] text-center leading-tight" style={{ color: "#999" }}>
                  Thông tin chỉ dùng để tư vấn dự án, không chia sẻ cho bên thứ ba.
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
