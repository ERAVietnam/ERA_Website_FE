"use client";

import { useState, useRef } from "react";
import { c } from "../theme";
import { submitLead } from "../../lib/submit-lead";
import { useInView } from "@/hooks/useInView";

export function StickyWidget() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const finalRef = useRef<HTMLDivElement>(null);
  const hidden = useInView(finalRef, { threshold: 0.12 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.currentTarget;
      await submitLead({
        hoten: (form.hoten as HTMLInputElement).value,
        sdt: (form.sdt as HTMLInputElement).value,
        formId: "FORM1",
        sheet: "ECO RETREAT - FOREST ONSEN",
      });
      window.location.href = "/thank-you-eco-retreat";
    } catch {
      alert("Gửi thất bại, vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div ref={finalRef} />
      {/* Collapsed bubble */}
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className={`fixed right-5 bottom-5 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-lg transition-all duration-500 ${
          hidden || !collapsed
            ? "translate-y-[170%] opacity-0 pointer-events-none"
            : ""
        }`}
        style={{ background: c.green }}
      >
        ✉
      </button>
      {/* Expanded form */}
      <form
        className={`fixed right-5 bottom-5 z-40 w-[296px] bg-white rounded-2xl border p-5 transition-all duration-500 ${
          hidden || collapsed
            ? "translate-y-[170%] opacity-0 pointer-events-none"
            : ""
        }`}
        style={{ borderColor: c.line, boxShadow: "0 24px 56px -22px rgba(39,68,52,.35)" }}
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="absolute top-2 right-3 text-lg leading-none"
          style={{ color: "#c2cabf" }}
          onClick={() => setCollapsed(true)}
        >
          ×
        </button>
        <div
          className="text-[19px] font-semibold leading-tight mb-1"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: c.ink }}
        >
          Nhận tư vấn riêng
        </div>
        <div className="text-[11.5px] mb-3" style={{ color: c.inkSoft }}>
          Để lại thông tin, chuyên viên gọi lại trong 24h.
        </div>
        <input
          type="text"
          name="hoten"
          required
          placeholder="Họ và tên"
          className="w-full px-3 py-2.5 rounded-lg border text-sm mb-2 focus:outline-none"
          style={{ borderColor: c.line }}
        />
        <input
          type="tel"
          name="sdt"
          required
          placeholder="Số điện thoại"
          pattern="[0-9 ]{9,13}"
          className="w-full px-3 py-2.5 rounded-lg border text-sm mb-3 focus:outline-none"
          style={{ borderColor: c.line }}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white transition-all duration-500 bg-[#365b46] hover:bg-[#274434] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              Đăng ký ngay{" "}
              <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px]">
                →
              </span>
            </>
          )}
        </button>
      </form>
    </>
  );
}
