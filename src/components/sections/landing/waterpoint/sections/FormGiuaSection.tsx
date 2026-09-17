"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { submitLead } from "../../lib/submit-lead";

// Form giữa trang sau section 360°
export function FormGiuaSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      await submitLead({ formId: "WP_FORM_GIUA", hoten: name, sdt: phone, sheet: "WATERPOINT" });
      setStatus("success");
      window.location.href = "/thank-you-waterpoint";
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="aq-form-giua-1"
      className="w-full"
      style={{ background: theme.primary, padding: "clamp(30px,3.6vw,46px) 22px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-[760px] text-center"
      >
        <div className="text-[12.5px] font-extrabold tracking-[0.16em] uppercase" style={{ color: "#9FC4CB" }}>
          Xem tận mắt căn nhà
        </div>
        <p
          className="mt-[9px] mb-0 italic"
          style={{
            fontFamily: "'WP Cormorant Garamond', serif",
            color: theme.white,
            fontSize: "clamp(20px,2.4vw,30px)",
            lineHeight: 1.35,
          }}
        >
          Anh/chị để lại số, em gửi giỏ hàng và hẹn lịch xem nhà thật.
        </p>
        {status === "success" ? (
          <p className="mt-[clamp(18px,2vw,24px)] mb-0 text-sm font-bold text-white">
            Đã gửi đăng ký thành công — tư vấn viên sẽ liên hệ trong ngày.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-[clamp(18px,2vw,24px)] text-left"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10 }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Họ và tên"
              autoComplete="name"
              aria-label="Họ và tên"
              required
              className="min-w-0 rounded-[11px] border-none bg-white px-3.5 py-[15px] text-[15px] outline-none"
              style={{ color: theme.primaryDark }}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại"
              autoComplete="tel"
              inputMode="numeric"
              aria-label="Số điện thoại"
              required
              className="min-w-0 rounded-[11px] border-none bg-white px-3.5 py-[15px] text-[15px] outline-none"
              style={{ color: theme.primaryDark }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="cursor-pointer rounded-[11px] px-[26px] py-[15px] text-sm font-extrabold tracking-[0.05em] whitespace-nowrap transition-all hover:brightness-105 active:scale-[0.98] disabled:opacity-70"
              style={{ background: "#F5B944", color: theme.primaryDark }}
            >
              {status === "loading" ? "ĐANG GỬI..." : "NHẬN GIỎ HÀNG"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 mb-0 text-xs text-white">
            Gửi không thành công, vui lòng thử lại.
          </p>
        )}
        <p className="mt-3 mb-0 text-[12.5px] leading-normal" style={{ color: "#9FC4CB" }}>
          Cam kết bảo mật thông tin · Tư vấn viên gọi lại trong ngày
        </p>
      </motion.div>
    </section>
  );
}
