"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { rc } from "./palette";
import { Reveal } from "./Reveal";
import { submitLeadBeacon } from "../landing/lib/submit-lead";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 10,
  padding: "14px 16px",
  fontSize: 15,
  outline: "none",
  background: colors.neutral.white,
  color: colors.neutral.foreground,
};

const radioCard: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  border: "1.5px solid transparent",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  background: colors.neutral.white,
  color: colors.neutral.foreground,
};

const labelStyle: React.CSSProperties = {
  color: colors.neutral.white,
};

/* Section CTA cuối trang: form đăng ký tư vấn (không card, nằm trực tiếp trên nền navy) + quote.
   TODO(config form): nối nơi nhận lead — hiện chỉ dựng layout theo mẫu. */
export function ResalesCtaSection() {
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");
  const [sent, setSent] = useState(false);

  /* Gửi lead về tab "Landing I Tuyển dụng" (sendBeacon — gửi ngầm, ở lại trang) */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    submitLeadBeacon({
      formId: "RS_THU_CAP",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      email: (f.email as HTMLInputElement).value,
      sheet: "Landing I Tuyển dụng",
      endpoint: "/api/submit-lead-thu-cap",
      // Mỗi trường 1 cột riêng trong sheet
      extra: {
        dang_lam: role,
        kinh_nghiem: exp,
      },
    });
    setSent(true);
  };

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: rc.navy }}>
      {/* Background ảnh full section (navy giữ lại làm màu nền phía dưới ảnh) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/resale/faq_background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container className="relative z-10 py-16 md:py-24">
          <Reveal>
        <h2
          className="mx-auto max-w-3xl text-center font-black"
          style={{ color: colors.neutral.white, fontSize: "clamp(24px, 3.4vw, 42px)", lineHeight: 1.25 }}
        >
          BẠN ĐÃ SẴN SÀNG GIA NHẬP ĐỘI NGŨ MÔI GIỚI CỦA ERA VIETNAM?
        </h2>

        {/* Form trực tiếp trên nền navy (không card trắng) */}
        <div className="mx-auto mt-10 max-w-2xl">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.tertiary.orange.DEFAULT }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-4 font-extrabold" style={{ color: colors.neutral.white, fontSize: 17 }}>
                Đăng ký thành công!
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed" style={{ color: colors.neutral.white, opacity: 0.85 }}>
                Phòng Thứ Cấp ERA Vietnam đã nhận được thông tin, trong 24h sẽ có ngườI liên hệ với
                bạn (không tính ngày nghỉ lễ và các ngày cuối tuần)
              </p>
              <p className="mt-2 text-sm" style={{ color: colors.neutral.white, opacity: 0.85 }}>
                Mọi thắc mắc cần hỗ trợ bạn có thể liên hệ Hotline:{" "}
                <a href="tel:0909163139" className="font-bold" style={{ color: colors.tertiary.orange.DEFAULT }}>
                  090 9163139
                </a>
              </p>
            </div>
          ) : (
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider" style={labelStyle}>
                HỌ VÀ TÊN*
              </label>
              <input type="text" name="hoten" required placeholder="Nguyễn Văn A" style={inputStyle} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider" style={labelStyle}>
                SỐ ĐIỆN THOẠI (ZALO)*
              </label>
              <input type="tel" name="sdt" required inputMode="numeric" placeholder="0912 345 678" style={inputStyle} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider" style={labelStyle}>
                EMAIL
              </label>
              <input type="email" name="email" placeholder="Nguyenvana@gmail.com" style={inputStyle} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider" style={labelStyle}>
                HIỆN ANH/CHỊ ĐANG
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {["Môi giới tự do", "Môi giới ở công ty khác"].map((v) => (
                  <label
                    key={v}
                    style={{
                      ...radioCard,
                      borderColor: role === v ? rc.navy : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="cta-role"
                      checked={role === v}
                      onChange={() => setRole(v)}
                      style={{ accentColor: rc.navy }}
                    />
                    {v}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold tracking-wider" style={labelStyle}>
                ANH/CHỊ CÓ
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {["Chưa có kinh nghiệm", "Dưới 1 năm kinh nghiệm", "1-3 năm kinh nghiệm", "Trên 3 năm kinh nghiệm"].map(
                  (v) => (
                    <label
                      key={v}
                      style={{
                        ...radioCard,
                        borderColor: exp === v ? rc.navy : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="cta-exp"
                        checked={exp === v}
                        onChange={() => setExp(v)}
                        style={{ accentColor: rc.navy }}
                      />
                      {v}
                    </label>
                  )
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 w-full cursor-pointer rounded-lg py-4 text-base font-extrabold tracking-wider text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: colors.tertiary.orange.DEFAULT }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.tertiary.orange.dark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.tertiary.orange.DEFAULT;
              }}
            >
              ĐĂNG KÝ TƯ VẤN
            </button>
          </form>
          )}
        </div>
          </Reveal>
      </Container>
    </section>
  );
}
