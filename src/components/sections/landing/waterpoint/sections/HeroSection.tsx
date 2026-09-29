"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { theme, TOUR360_LINK } from "../theme";
import { hero } from "../data";
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
      window.location.href = "/thank-you-waterpoint";
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(600px, 90vh, 950px)" }}
    >
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/landing/waterpoint/waterpoint-hero-club-house-ben-thuyen-ven-song.webp')",
          backgroundPosition: "50% 100%",
        }}
      />

      {/* Scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
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
        className="aq-heroin pointer-events-none absolute inset-0 flex flex-col justify-between px-[22px]"
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

        {/* Panel kính: trái content — phải form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="aq-hero-panel pointer-events-auto relative z-10 mx-auto w-full"
          style={{ maxWidth: 1180 }}
        >
          <span
            className="aq-hero-badge inline-block rounded-full px-[15px] py-[7px] text-[11px] font-bold tracking-[0.12em] uppercase"
            style={{ backgroundColor: "rgba(253,243,234,0.94)", color: theme.primary }}
          >
            {hero.badge}
          </span>

          <h1
            className="aq-h1 font-bold tracking-[-0.01em]"
            style={{
              fontFamily: "'WP Montserrat', sans-serif",
              color: theme.white,
              fontSize: "clamp(24px,4.4vw,50px)",
              lineHeight: 1.18,
              margin: "clamp(14px,2vw,22px) 0 0",
              maxWidth: "22ch",
              textShadow:
                "0 1px 2px rgba(6,30,36,0.55), 0 3px 12px rgba(6,30,36,0.9), 0 12px 48px rgba(6,30,36,0.72)",
            }}
          >
            {hero.titleA}
            <span style={{ color: "#F5D5A0" }}>{hero.titleB}</span>
          </h1>

          <p
            className="aq-herosub font-medium"
            style={{
              color: "#F4EEE3",
              fontSize: "clamp(15px,1.35vw,18px)",
              lineHeight: 1.55,
              margin: "clamp(10px,1.2vw,14px) 0 0",
              maxWidth: 560,
              textShadow: "0 1px 2px rgba(6,30,36,0.6), 0 2px 12px rgba(6,30,36,0.85)",
            }}
          >
            {hero.sub}
          </p>

          <ul
            className="aq-herofacts m-0 flex list-none gap-0 p-0"
            style={{ marginTop: "clamp(16px,1.8vw,24px)" }}
          >
            {hero.facts.map((f, i) => (
              <li
                key={f.b}
                className="flex flex-col gap-[3px]"
                style={{
                  padding: "0 clamp(14px,1.8vw,26px)",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,.3)",
                  paddingLeft: i === 0 ? 0 : undefined,
                }}
              >
                <b
                  className="whitespace-nowrap"
                  style={{
                    color: "#F5D5A0",
                    fontFamily: "'WP Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: "clamp(20px,1.9vw,27px)",
                    lineHeight: 1.1,
                    textShadow: "0 1px 10px rgba(6,30,36,.6)",
                  }}
                >
                  {f.b}
                </b>
                {f.span && (
                  <span
                    className="uppercase"
                    style={{
                      color: "rgba(255,255,255,.8)",
                      fontSize: 11.5,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                    }}
                  >
                    {f.span}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div
            className="aq-heroform"
            style={{
              marginTop: "clamp(16px,1.8vw,24px)",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
              borderRadius: 14,
              padding: 14,
            }}
          >
            {status === "success" ? (
              <p
                className="m-0 px-2 py-3 text-center text-sm font-bold sm:text-base"
                style={{ color: theme.primary }}
              >
                Đã gửi đăng ký thành công — tư vấn viên sẽ liên hệ trong ngày.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-2.5">
                <p
                  className="aq-heroform-t m-0 mb-1.5 font-bold"
                  style={{ color: theme.primary, fontSize: 15, letterSpacing: "0.02em" }}
                >
                  {hero.formTitle}
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên"
                  required
                  className="min-w-0 rounded-[10px] px-3.5 py-3.5 text-[15px] outline-none"
                  style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #DCE9EB", color: theme.primaryDark }}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại"
                  required
                  className="min-w-0 rounded-[10px] px-3.5 py-3.5 text-[15px] outline-none"
                  style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #DCE9EB", color: theme.primaryDark }}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="aq-heroform-btn cursor-pointer rounded-[10px] px-5 py-3.5 text-sm font-extrabold tracking-[0.06em] whitespace-nowrap text-white disabled:opacity-70"
                  style={{
                    background: "#8B1A2B",
                    boxShadow: "0 10px 24px rgba(139,26,43,.35)",
                    fontFamily: "'WP Montserrat', sans-serif",
                    transition: "background 0.2s ease",
                  }}
                >
                  {status === "loading" ? "ĐANG GỬI..." : "ĐĂNG KÝ NHẬN BẢNG GIÁ"}
                </button>
                <p
                  className="aq-heroform-note m-0 mt-0.5 text-center"
                  style={{ color: "#5A7C84", fontSize: 12.5 }}
                >
                  {hero.formNote}
                </p>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2 mb-0 text-center text-xs" style={{ color: "#C8102E" }}>
                Gửi không thành công, vui lòng thử lại.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
