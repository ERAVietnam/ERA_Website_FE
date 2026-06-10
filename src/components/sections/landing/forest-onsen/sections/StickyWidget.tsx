"use client";

import { useState, useEffect, useRef } from "react";
import { c } from "../theme";
import { submitLead } from "../lib/submit-lead";

export function StickyWidget() {
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setHidden(entries[0].isIntersecting),
      { threshold: 0.12 }
    );
    if (finalRef.current) observer.observe(finalRef.current);
    return () => observer.disconnect();
  }, []);

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
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const ok = await submitLead({
            hoten: (form.hoten as HTMLInputElement).value,
            sdt: (form.sdt as HTMLInputElement).value,
            formId: "FORM1",
          });
          if (ok) setSubmitted(true);
        }}
      >
        <button
          type="button"
          className="absolute top-2 right-3 text-lg leading-none"
          style={{ color: "#c2cabf" }}
          onClick={() => setCollapsed(true)}
        >
          ×
        </button>
        {!submitted ? (
          <>
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
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white transition-all duration-500 bg-[#365b46] hover:bg-[#274434] active:scale-[0.98]"
            >
              Đăng ký ngay{" "}
              <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px]">
                →
              </span>
            </button>
          </>
        ) : (
          <div className="reveal text-center py-4 text-sm" style={{ color: c.greenDeep }}>
            ✓ Đã nhận. Cảm ơn bạn!
          </div>
        )}
      </form>
    </>
  );
}

