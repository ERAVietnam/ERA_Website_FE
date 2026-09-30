"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { rc } from "./palette";
import { submitLeadBeacon } from "../landing/lib/submit-lead";

const INFO = [
  { value: "09:00", label: "Thứ 7 ngày 24/10/2026" },
  { value: "300 chỗ giới hạn", label: "Văn phòng ERA Vietnam" },
  { value: "20/10", label: "Hạn đăng ký" },
];

/* 3 phiên bản tiêu đề xoay vòng mỗi 5 giây:
   - small: cỡ chữ thường · big: cỡ lớn hơn · cyan: màu xanh */
const HEADLINES: {
  key: string;
  lines: { text: string; cyan: boolean; size: "small" | "big" }[];
}[] = [
  {
    key: "quy-dinh",
    lines: [
      { text: "QUY ĐỊNH ĐÃ SIẾT", cyan: false, size: "small" },
      { text: "MÔI GIỚI TỰ DO", cyan: false, size: "small" },
      { text: "SẼ ĐI VỀ ĐÂU?", cyan: true, size: "big" },
    ],
  },
  {
    key: "nguoi-ban",
    lines: [
      { text: "NGƯỜI BÁN NHIỀU", cyan: false, size: "small" },
      { text: "HƠN NGƯỜI MUA", cyan: false, size: "small" },
      { text: "MÔI GIỚI THỨ CẤP", cyan: true, size: "small" },
      { text: "CẦN LÀM GÌ?", cyan: false, size: "small" },
    ],
  },
  {
    key: "ban-mai",
    lines: [
      { text: "BÁN MÃI 1-2 DỰ ÁN", cyan: false, size: "small" },
      { text: "BÃO HÒA RỒI", cyan: true, size: "big" },
      { text: "BÁN GÌ?", cyan: false, size: "small" },
    ],
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 10,
  padding: "13px 16px",
  fontSize: 15,
  outline: "none",
  background: colors.gray[100],
  color: colors.neutral.foreground,
};

const radioCard: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  border: "1.5px solid transparent",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 13.5,
  fontWeight: 600,
  cursor: "pointer",
  background: colors.gray[200],
  color: colors.neutral.foreground,
};

/* Hero: giới thiệu workshop + form đặt lịch tham dự.
   TODO(config form): nối nơi nhận lead — hiện chỉ dựng layout theo mẫu. */
export function ResalesHeroSection() {
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");
  const [headline, setHeadline] = useState(0);
  const [sent, setSent] = useState(false);

  /* Xoay vòng tiêu đề mỗi 6 giây */
  useEffect(() => {
    const t = setInterval(() => {
      setHeadline((i) => (i + 1) % HEADLINES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const h = HEADLINES[headline];

  /* Gửi lead về tab "DS đăng ký tham dự WS 24/10" (sendBeacon — gửi ngầm, ở lại trang) */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    submitLeadBeacon({
      formId: "RS_WS_2410",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      sheet: "DS đăng ký tham dự WS 24/10",
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
      {/* Hình trang trí góc (đã tách nền) */}
      <div
        className="pointer-events-none absolute top-0 right-0 z-0"
        style={{ width: "clamp(240px, 32vw, 560px)", aspectRatio: "679/253" }}
      >
        <Image
          src="/resale/top_right.png"
          alt=""
          fill
          sizes="(max-width: 768px) 240px, 560px"
          className="object-contain object-top-right"
        />
      </div>

      <Container className="relative z-10 py-14 md:py-20">
        <div className="text-xl italic" style={{ color: colors.neutral.white }}>
          Workshop
        </div>

        {/* Phần trên: trái chữ — phải form. Form bắt đầu ngang pill "BẢN ĐỒ SỰ NGHIỆP MÔI GIỚI",
            kết thúc ngang divider cuối cột trái (grid stretch + mt-auto) */}
        <div className="mt-3 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Trái */}
          <div className="flex flex-col">
            <div
              className="inline-block self-start rounded-full px-5 py-2 text-lg font-extrabold tracking-[0.06em]"
              style={{ backgroundColor: colors.primary.DEFAULT, color: colors.neutral.white }}
            >
              BẢN ĐỒ SỰ NGHIỆP MÔI GIỚI
            </div>
            {/* minHeight = chừa sẵn chỗ cho phiên bản 4 dòng (cao nhất) để text phía dưới không bị đẩy xuống khi đổi title */}
            <h1
              className="mt-6 font-black"
              style={{ color: colors.neutral.white, minHeight: "clamp(172px, 20.5vw, 264px)" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={h.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {h.lines.map((l, i) => (
                    /* Hiệu ứng trống quay (pachinko): từng dòng lăn dọc từ dưới lên, lệch nhịp */
                    /* paddingTop để dấu mũ/dấu sắc (Ế, Ể...) vươn lên không bị khung overflow:hidden cắt */
                    <div key={l.text} style={{ overflow: "hidden", paddingTop: "0.16em", paddingBottom: "0.06em" }}>
                      <motion.span
                        className="block"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-110%" }}
                        transition={{ duration: 0.5, delay: i * 0.09, ease: [0.3, 0.9, 0.3, 1] }}
                        style={{
                          color: l.cyan ? colors.secondary.DEFAULT : colors.neutral.white,
                          fontSize:
                            l.size === "big" ? "clamp(34px, 4.8vw, 60px)" : "clamp(26px, 3.2vw, 40px)",
                          lineHeight: l.size === "big" ? 1.15 : 1.3,
                          marginTop: i > 0 ? (l.size === "big" ? 12 : 4) : 0,
                        }}
                      >
                        {l.text}
                      </motion.span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </h1>

            {/* Vùng giữa: đoạn mô tả luôn nằm giữa khoảng trống (flex-1 + căn giữa) */}
            <div className="flex flex-1 items-center pb-6">
              <p
                className="max-w-xl italic"
                style={{ color: colors.neutral.white, fontSize: 16, lineHeight: 1.7, opacity: 0.92 }}
              >
                Luật siết chặt cùng các quy định mới trong ngành BĐS tác động làm cho thị trường
                thay đổi nhanh chóng. Để thay đổi bản thân, thích nghi với thị trường, bạn buộc phải
                chọn một nơi để làm nghề
              </p>
            </div>

            {/* Bottom: câu hỏi ngay trên divider */}
            <p
              className="max-w-xl font-bold"
              style={{ color: colors.neutral.white, fontSize: 16, lineHeight: 1.6 }}
            >
              Câu hỏi đặt ra là: Vậy bạn sẽ chọn nơi nào để giúp mình thích nghi với thị trường sắp
              tới?
            </p>

            {/* Divider — chỉ kéo dài hết cột trái */}
            <div
              className="mt-6 border-t"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            />
          </div>

          {/* Phải: form đặt lịch — kéo dài từ pill tới divider */}
          <div
            className="flex h-full flex-col rounded-2xl bg-white p-6 md:p-8"
            style={{ boxShadow: "0 24px 60px rgba(0,0,0,.35)" }}
          >
            <h2
              className="text-center font-black"
              style={{ color: colors.primary.DEFAULT, fontSize: 24, letterSpacing: "0.02em" }}
            >
              ĐẶT LỊCH THAM DỰ
            </h2>

            {sent ? (
              <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: rc.navy }}
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
                <p className="mt-4 font-extrabold" style={{ color: rc.navy, fontSize: 17 }}>
                  Đăng ký thành công!
                </p>
              </div>
            ) : (
            <form className="mt-5 flex flex-1 flex-col gap-4" onSubmit={onSubmit}>
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold tracking-wider"
                  style={{ color: rc.navy }}
                >
                  HỌ VÀ TÊN*
                </label>
                <input type="text" name="hoten" required placeholder="Nguyễn Văn A" style={inputStyle} />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold tracking-wider"
                  style={{ color: rc.navy }}
                >
                  SỐ ĐIỆN THOẠI (ZALO)*
                </label>
                <input
                  type="tel"
                  name="sdt"
                  required
                  inputMode="numeric"
                  placeholder="0912 345 678"
                  style={inputStyle}
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-bold tracking-wider"
                  style={{ color: rc.navy }}
                >
                  HIỆN ANH/CHỊ ĐANG*
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {["Môi giới tự do", "Môi giới ở công ty khác"].map((v) => (
                    <label
                      key={v}
                      style={{
                        ...radioCard,
                        borderColor: role === v ? rc.navy : "transparent",
                        background: role === v ? rc.navyS20 : colors.gray[200],
                      }}
                    >
                      <input
                        type="radio"
                        name="role"
                        required
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
                <label
                  className="mb-1.5 block text-xs font-bold tracking-wider"
                  style={{ color: rc.navy }}
                >
                  KINH NGHIỆM BĐS*
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {["Đã từng làm BĐS", "Chưa có kinh nghiệm"].map((v) => (
                    <label
                      key={v}
                      style={{
                        ...radioCard,
                        borderColor: exp === v ? rc.navy : "transparent",
                        background: exp === v ? rc.navyS20 : colors.gray[200],
                      }}
                    >
                      <input
                        type="radio"
                        name="exp"
                        required
                        checked={exp === v}
                        onChange={() => setExp(v)}
                        style={{ accentColor: rc.navy }}
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
              <Button type="submit" className="mt-auto w-full font-extrabold tracking-wide">
                ĐĂNG KÝ NGAY! →
              </Button>
            </form>
            )}
          </div>
        </div>

        {/* Dưới: thờI gian - địa điểm workshop (full width) */}
        <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
          {INFO.map((it) => (
            <div key={it.label}>
              <div
                className="font-extrabold"
                style={{ color: colors.neutral.white, fontSize: "clamp(26px, 2.8vw, 36px)" }}
              >
                {it.value}
              </div>
              <div
                className="mt-1.5"
                style={{ color: colors.neutral.white, fontSize: 15, opacity: 0.85 }}
              >
                {it.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
