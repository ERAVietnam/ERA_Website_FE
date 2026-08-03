"use client";

import { useState } from "react";
import { c, fonts } from "../theme";
import { projectInfo } from "../data";
import { submitLead } from "../../lib/submit-lead";

const SHEET = "ECO RETREAT - RỪNG PHƯỢNG";

export function FloatingButtons() {
  const [formOpen, setFormOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.currentTarget;
      await submitLead({
        hoten: (form.hoten as HTMLInputElement).value,
        sdt: (form.sdt as HTMLInputElement).value,
        formId: "RP_FORM2",
        sheet: SHEET,
      });
      window.location.href = "/thank-you-eco-retreat";
    } catch {
      alert("Gửi thất bại, vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed right-4 bottom-[90px] md:right-5 md:bottom-5 z-[300] flex flex-col items-end gap-3">
      {/* 2 nút Gọi / Zalo */}
      <div
        className="flex flex-col gap-3"
        style={{ animation: "rpFloat 4s ease-in-out infinite" }}
      >
        <a
          href={`tel:${projectInfo.phoneLink}`}
          title="Gọi ngay"
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: c.red,
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            animation: "rpPulse 2s infinite",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <a
          href={`https://zalo.me/${projectInfo.zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat Zalo"
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg text-white font-extrabold text-sm"
          style={{ background: c.blue, boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}
        >
          Zalo
        </a>
      </div>

      {/* Form popup (mặc định mở) hoặc nút mở form */}
      {formOpen ? (
        <div
          className="relative w-[296px] bg-white rounded-2xl border p-5 transition-all duration-500"
          style={{
            borderColor: c.lineGreen,
            boxShadow: "0 24px 56px -22px rgba(20,66,30,.35)",
          }}
        >
          <button
            type="button"
            aria-label="Đóng form"
            className="absolute top-2 right-3 text-lg leading-none"
            style={{ color: "#c2cabf" }}
            onClick={() => setFormOpen(false)}
          >
            ×
          </button>
          <>
            <div
                className="leading-tight mb-1"
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: "30px",
                  color: c.red,
                }}
              >
                Nhận tư vấn riêng
              </div>
              <div className="text-[11.5px] mb-3" style={{ color: c.textSoft }}>
                Để lại thông tin, chuyên viên gọi lại trong 24h.
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="hoten"
                  required
                  placeholder="Họ và tên"
                  className="w-full px-3 py-2.5 rounded-lg border text-sm mb-2 focus:outline-none"
                  style={{ borderColor: c.lineGreen }}
                />
                <input
                  type="tel"
                  name="sdt"
                  required
                  placeholder="Số điện thoại"
                  pattern="[0-9 ]{9,13}"
                  className="w-full px-3 py-2.5 rounded-lg border text-sm mb-3 focus:outline-none"
                  style={{ borderColor: c.lineGreen }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-60"
                  style={{ background: c.red }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = c.redHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = c.red)}
                >
                  {isLoading ? "Đang gửi..." : "Đăng ký ngay"}{" "}
                  <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px]">
                    →
                  </span>
                </button>
              </form>
          </>
        </div>
      ) : (
        <button
          type="button"
          title="Nhận tư vấn riêng"
          aria-label="Nhận tư vấn riêng"
          onClick={() => setFormOpen(true)}
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg text-white text-xl"
          style={{ background: c.red, boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}
        >
          ✉
        </button>
      )}
    </div>
  );
}
