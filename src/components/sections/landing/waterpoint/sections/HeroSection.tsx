"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { theme, TOUR360_LINK } from "../theme";
import { submitLead } from "../../lib/submit-lead";

export function HeroSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      await submitLead({ formId: "WP_HERO", hoten: name, sdt: phone, sheet: "WATERPOINT" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(610px, calc(88vh + 10px), 910px)" }}
    >
      {/* Background — desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 hidden bg-cover bg-no-repeat sm:block"
        style={{
          backgroundImage: "url('/landing/waterpoint/waterpoint-hero-flycam-ven-song.webp')",
          backgroundPosition: "50% 100%",
        }}
      />
      {/* Background — mobile (ảnh dọc) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="aq-hero-mb absolute inset-0 block bg-cover bg-no-repeat sm:hidden"
        style={{
          backgroundImage: "url('/landing/waterpoint/hero.webp')",
          backgroundPosition: "50% 100%",
        }}
      />

      {/* Scrim — vùng tối phía trái dưới cho text */}
      <div
        aria-hidden
        className="aq-scrim pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 23% at 30% 54%, rgba(29,88,102,.76) 0%, rgba(29,88,102,.44) 48%, rgba(29,88,102,0) 76%)," +
            "radial-gradient(ellipse 35% 20% at 27% 70%, rgba(29,88,102,.66) 0%, rgba(29,88,102,.36) 50%, rgba(29,88,102,0) 78%)," +
            "radial-gradient(ellipse 25% 16% at 24% 84%, rgba(29,88,102,.54) 0%, rgba(29,88,102,0) 80%)," +
            "linear-gradient(102deg, rgba(29,88,102,.36) 0%, rgba(29,88,102,.14) 32%, rgba(29,88,102,0) 55%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.35) 22%, #000 34%, #000 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.35) 22%, #000 34%, #000 100%)",
        }}
      />

      <div
        className="aq-heroin pointer-events-none absolute inset-0 flex flex-col justify-between px-[22px] pt-7 pb-7 sm:pt-10 sm:pb-12"
        style={{ paddingTop: "clamp(28px, 4vw, 56px)", paddingBottom: "clamp(28px, 3vw, 48px)" }}
      >
        {/* Top row: nút tour 360 bên phải */}
        <div className="mx-auto flex w-full max-w-[1180px] items-start justify-between gap-3.5">
          <span />
          <motion.a
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            href={TOUR360_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto rounded-full bg-white/95 px-5 py-[11px] text-[12.5px] font-bold tracking-[0.1em] backdrop-blur-md transition-colors hover:bg-white"
            style={{
              color: theme.primary,
              backdropFilter: "blur(6px)",
            }}
          >
            XEM TOUR 360°
          </motion.a>
        </div>

        {/* Bottom: badge + headline + form */}
        <div className="mx-auto w-full max-w-[1180px]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block rounded-full px-[15px] py-[7px] text-[11px] font-bold tracking-[0.12em] uppercase sm:text-[13px]"
            style={{ backgroundColor: "rgba(253,243,234,0.94)", color: theme.primary }}
          >
            Khu đô thị nghỉ dưỡng liền kề Sài Gòn
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            className="aq-h1 mt-[clamp(14px,2vw,22px)] max-w-[22ch] text-[clamp(27px,4.4vw,56px)] leading-[1.18] font-medium italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.white,
              textShadow:
                "0 1px 2px rgba(6,30,36,0.55), 0 3px 12px rgba(6,30,36,0.9), 0 12px 48px rgba(6,30,36,0.72)",
            }}
          >
            Giữa hành trình sự nghiệp và quê hương miền Tây thương nhớ,{" "}
            <span style={{ color: "#F5D5A0" }}>có một nơi đưa gia đình lại gần nhau hơn.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="pointer-events-auto mt-[clamp(20px,2.6vw,32px)] max-w-[720px] rounded-[14px] p-3.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            {status === "success" ? (
              <p
                className="px-2 py-3 text-center text-sm font-bold sm:text-base"
                style={{ color: theme.primary }}
              >
                Đã gửi đăng ký thành công — tư vấn viên sẽ liên hệ trong ngày.
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="grid gap-2.5"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên"
                  required
                  className="min-w-0 rounded-[10px] border-[1.5px] px-3.5 py-3.5 text-[15px] outline-none"
                  style={{ backgroundColor: "#FFFFFF", borderColor: theme.iceMid, color: theme.primaryDark }}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại"
                  required
                  className="min-w-0 rounded-[10px] border-[1.5px] px-3.5 py-3.5 text-[15px] outline-none"
                  style={{ backgroundColor: "#FFFFFF", borderColor: theme.iceMid, color: theme.primaryDark }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="cursor-pointer rounded-[10px] bg-[#1D5866] px-5 py-3.5 text-sm font-extrabold tracking-[0.06em] whitespace-nowrap text-white transition-colors hover:bg-[#2E7C8C] disabled:opacity-70"
                  style={{ fontFamily: "'WP Montserrat', sans-serif" }}
                >
                  {status === "loading" ? "ĐANG GỬI..." : "ĐĂNG KÝ THAM QUAN"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2 mb-0 text-center text-xs" style={{ color: "#C8102E" }}>
                Gửi không thành công, vui lòng thử lại.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
