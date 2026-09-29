"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitLead } from "../../lib/submit-lead";

// Nút mở form nhận tư vấn ở góc màn hình (desktop) — UI theo bản 29/09
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
    <div className="aq-wp-float fixed right-5 bottom-5 z-[300] flex flex-col items-end gap-3">
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="w-[296px] max-w-[calc(100vw-40px)] rounded-2xl bg-white"
            style={{
              boxShadow: "0 18px 46px rgba(16,51,59,.26)",
              padding: "16px 16px 15px",
            }}
          >
            {/* Đầu: tiêu đề + nút đóng */}
            <div className="flex items-start justify-between gap-2">
              <p
                className="m-0 italic"
                style={{
                  fontFamily: "'WP Cormorant Garamond', serif",
                  color: "#1D5866",
                  fontSize: 22,
                  lineHeight: 1.2,
                }}
              >
                Nhận tư vấn riêng
              </p>
              <button
                type="button"
                aria-label="Đóng khung tư vấn"
                onClick={() => setFormOpen(false)}
                className="shrink-0 cursor-pointer border-none"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: "#EEF4F5",
                  color: "#3D5C63",
                  fontSize: 14,
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ✕
              </button>
            </div>

            {status === "success" ? (
              <p className="mt-3 mb-1 text-sm font-bold" style={{ color: "#1D5866" }}>
                Đã gửi thông tin thành công — tư vấn viên sẽ liên hệ trong ngày.
              </p>
            ) : (
              <>
                <p className="m-0" style={{ fontSize: 12.5, color: "#48696F", lineHeight: 1.5, margin: "5px 0 12px" }}>
                  Để lại thông tin, tư vấn viên gọi lại trong ngày.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="hoten"
                    required
                    placeholder="Họ và tên"
                    className="w-full rounded-[10px] outline-none focus:border-[#2E7C8C]"
                    style={{
                      border: "1.5px solid #DCE9EB",
                      padding: "12px 12px",
                      fontSize: 14.5,
                      color: "#10333B",
                      background: "#FFFFFF",
                      boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="tel"
                    name="sdt"
                    required
                    placeholder="Số điện thoại"
                    pattern="[0-9 ]{9,13}"
                    className="w-full rounded-[10px] outline-none focus:border-[#2E7C8C]"
                    style={{
                      border: "1.5px solid #DCE9EB",
                      padding: "12px 12px",
                      fontSize: 14.5,
                      color: "#10333B",
                      background: "#FFFFFF",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="aq-nut-gold cursor-pointer border-none rounded-full font-extrabold disabled:opacity-70"
                    style={{
                      padding: 13,
                      background: "#E9A94B",
                      color: "#10333B",
                      fontSize: 14,
                      letterSpacing: "0.04em",
                      marginTop: 2,
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 10px 24px rgba(233,169,75,.38)",
                      transition: "transform .18s ease, box-shadow .18s ease, background .18s ease",
                    }}
                  >
                    {status === "loading" ? "Đang gửi..." : "ĐĂNG KÝ NGAY"}
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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26 }}
          className="cursor-pointer border-none text-white"
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            background: "#1D5866",
            fontSize: 21,
            lineHeight: 1,
            boxShadow: "0 12px 30px rgba(16,51,59,.3)",
            padding: 0,
          }}
        >
          ✉
        </motion.button>
      )}
    </div>
  );
}
