"use client";

import { useEffect, useState } from "react";

export default function ThankYouHanoiSignaturePage() {
  const [seconds, setSeconds] = useState(10);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { queueMicrotask(() => setMounted(true)); }, []);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((value) => (value <= 1 ? 0 : value - 1)), 1000);
    const redirect = setTimeout(() => { window.location.href = "/"; }, 10000);
    return () => { clearInterval(interval); clearTimeout(redirect); };
  }, []);
  const fade = (delay: string) => `transition-all duration-700 ease-out ${delay} ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`;
  return <main className="relative flex min-h-screen w-full items-center justify-center text-white" style={{ backgroundImage: "url('/landing/hanoi-signature/assets/img/hanoi-signature-toa-nha-nhin-tu-ho-nghia-tan.webp')", backgroundSize: "cover", backgroundPosition: "50% 50%" }}>
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,39,50,.84), rgba(18,39,50,.62))" }} />
    <div className="relative z-10 mx-auto max-w-[520px] px-6 text-center">
      <div className={`mb-6 ${fade("delay-100")}`}><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"><svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div></div>
      <h1 className={`mb-4 whitespace-nowrap text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] ${fade("delay-200")}`}>Đăng ký thành công</h1>
      <p className={`mb-2 text-[17px] text-white/95 md:text-[19px] ${fade("delay-300")}`}>Chuyên viên tư vấn sẽ liên hệ lại ngay!</p>
      <p className={`text-[15px] text-white/80 ${fade("delay-400")}`}>Xin cảm ơn</p>
      <p className={`mt-8 text-[13px] text-white/60 ${fade("delay-500")}`}>Trở về trang chủ sau {seconds} giây</p>
    </div>
  </main>;
}
