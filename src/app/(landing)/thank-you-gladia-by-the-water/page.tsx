"use client";

import { useEffect, useState } from "react";

export default function ThankYouGladiaByTheWaterPage() {
  const [seconds, setSeconds] = useState(10);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setSeconds((value) => Math.max(value - 1, 0)), 1000);
    const redirect = setTimeout(() => { window.location.href = "/"; }, 10000);
    return () => { clearInterval(interval); clearTimeout(redirect); };
  }, []);

  const animation = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center text-white" style={{ backgroundImage: "url(/landing/gladia-by-the-water/assets/img/gladia-by-the-water-toan-canh-hoang-hon.webp)", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[#103545]/75" />
      <div className="relative z-10 mx-auto max-w-[520px] px-6 text-center">
        <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 ${animation("delay-100")}`}>✓</div>
        <h1 className={`mb-4 text-[clamp(32px,5vw,48px)] font-semibold ${animation("delay-200")}`}>Đăng ký thành công</h1>
        <p className={`mb-2 text-[17px] text-white/95 ${animation("delay-300")}`}>Chuyên viên ERA sẽ liên hệ lại trong thời gian sớm nhất.</p>
        <p className={`text-[15px] text-white/80 ${animation("delay-400")}`}>Cảm ơn anh/chị đã quan tâm GLADIA BY THE WATER.</p>
        <p className={`mt-8 text-[13px] text-white/70 ${animation("delay-500")}`}>Trở về trang chủ sau {seconds} giây</p>
      </div>
    </main>
  );
}
