"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { theme } from "../theme";
import { submitLead } from "../../lib/submit-lead";

// Nút mở form nhận tư vấn ở góc màn hình (desktop)
export function FloatingButtons() {
  const [formOpen, setFormOpen] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    const form = e.currentTarget;
    setStatus("loading");
    try {
      await submitLead({
        formId: "WP_FLOAT",
        hoten: (form.hoten as HTMLInputElement).value,
        sdt: (form.sdt as HTMLInputElement).value,
        sheet: "WATERPOINT",
      });
      setStatus("success");
      window.location.href = "/thank-you-waterpoint";
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="aq-wp-float fixed right-4 bottom-[90px] z-[300] flex flex-col items-end gap-3 md:right-5 md:bottom-5">
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-[296px] rounded-2xl border bg-white p-5"
            style={{
              borderColor: theme.iceMid,
              boxShadow: "0 24px 56px -22px rgba(16,51,59,.4)",
            }}
          >
            <button
              type="button"
              aria-label="Đóng form"
              className="absolute top-2 right-3 text-lg leading-none"
              style={{ color: theme.textMute }}
              onClick={() => setFormOpen(false)}
            >
              ×
            </button>
            <div
              className="mb-1 leading-tight"
              style={{
                fontFamily: "'WP Cormorant Garamond', serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: 30,
                color: theme.primary,
              }}
            >
              Nhận tư vấn riêng
            </div>
            {status === "success" ? (
              <p className="mt-3 mb-1 text-sm font-bold" style={{ color: theme.primary }}>
                Đã gửi thông tin thành công — tư vấn viên sẽ liên hệ trong ngày.
              </p>
            ) : (
              <>
                <div className="mb-3 text-[11.5px]" style={{ color: theme.textSoft }}>
                  Để lại thông tin, chuyên viên gọi lại trong ngày.
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="hoten"
                    required
                    placeholder="Họ và tên"
                    className="mb-2 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none"
                    style={{ borderColor: theme.iceMid }}
                  />
                  <input
                    type="tel"
                    name="sdt"
                    required
                    placeholder="Số điện thoại"
                    pattern="[0-9 ]{9,13}"
                    className="mb-3 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none"
                    style={{ borderColor: theme.iceMid }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition-all duration-300 active:scale-[0.98] disabled:opacity-60"
                    style={{ background: theme.primary }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = theme.primaryLight)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = theme.primary)}
                  >
                    {status === "loading" ? "Đang gửi..." : "Đăng ký ngay"}
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[13px]">
                      →
                    </span>
                  </button>
                </form>
              </>
            )}
            {status === "error" && (
              <p className="mt-2 mb-0 text-xs" style={{ color: "#C8102E" }}>
                Gửi không thành công, vui lòng thử lại.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!formOpen && (
        <motion.button
          type="button"
          title="Nhận tư vấn riêng"
          aria-label="Nhận tư vấn riêng"
          onClick={() => setFormOpen(true)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full text-white shadow-lg"
          style={{ background: theme.primary, boxShadow: "0 6px 18px rgba(16,51,59,.35)" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}
