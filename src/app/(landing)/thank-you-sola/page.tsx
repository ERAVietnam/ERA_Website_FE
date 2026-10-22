"use client";

import { useEffect, useState } from "react";

export default function ThankYouSolaPage() {
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((value) => (value <= 1 ? 0 : value - 1)), 1000);
    const redirect = setTimeout(() => { window.location.href = "/"; }, 10000);
    return () => { clearInterval(interval); clearTimeout(redirect); };
  }, []);
  return <main className="relative flex min-h-screen w-full items-center justify-center text-white" style={{ backgroundImage: "url('/landing/sola/assets/img/sola-the-global-city-ban-dao-sola-ba-mat-song-hoang-hon.webp')", backgroundSize: "cover", backgroundPosition: "center" }}><div className="absolute inset-0 bg-slate-950/70" /><div className="relative z-10 px-6 text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20"><span className="text-3xl">✓</span></div><h1 className="mb-4 text-4xl font-semibold">Đăng ký thành công</h1><p className="text-lg text-white/90">Chuyên viên tư vấn sẽ liên hệ lại sớm.</p><p className="mt-8 text-sm text-white/70">Trở về trang chủ sau {seconds} giây</p></div></main>;
}
