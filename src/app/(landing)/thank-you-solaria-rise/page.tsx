"use client";

import { useEffect, useState } from "react";

export default function ThankYouSolariaRisePage() {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    const redirect = setTimeout(() => { window.location.href = "/"; }, 10000);
    return () => { clearInterval(interval); clearTimeout(redirect); };
  }, []);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center text-white" style={{ backgroundImage: "url('/landing/solaria-rise/assets/img/solaria-rise-hero-toan-canh-dem.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[#126752]/70" />
      <div className="relative z-10 mx-auto max-w-[520px] px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">✓</div>
        <h1 className="mb-4 text-[clamp(32px,5vw,48px)] font-semibold leading-tight">Đăng ký thành công</h1>
        <p className="mb-2 text-[17px] text-white/95 md:text-[19px]">Chuyên viên tư vấn sẽ liên hệ lại với anh/chị.</p>
        <p className="text-[15px] text-white/80">Xin cảm ơn</p>
        <p className="mt-8 text-[13px] text-white/70">Trở về trang chủ sau {seconds} giây</p>
      </div>
    </main>
  );
}
