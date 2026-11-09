"use client";

import { useEffect, useState } from "react";

export default function ThankYouIzumiCityPage() {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => Math.max(value - 1, 0)), 1000);
    const redirect = window.setTimeout(() => { window.location.href = "/"; }, 10000);
    return () => { window.clearInterval(timer); window.clearTimeout(redirect); };
  }, []);

  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#143980] px-6 py-20 text-white"><div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/landing/izumi-city/assets/img/izumi-city-phoi-canh-dem.webp')" }} /><div className="absolute inset-0 bg-[#0b253c]/55" /><section className="relative z-10 max-w-xl text-center animate-[fade-in-up_.7s_ease-out_both]"><img src="/landing/izumi-city/assets/img/izumi-city-logo.webp" alt="Izumi City" className="mx-auto mb-10 w-64" /><h1 className="text-3xl font-semibold md:text-5xl">Đăng ký thành công</h1><p className="mt-5 text-lg leading-8 text-white/90">ERA Vietnam đã nhận được thông tin. Chuyên viên sẽ liên hệ để hỗ trợ anh/chị về Izumi City.</p><p className="mt-8 text-sm text-white/75">Tự động trở về trang chủ sau {seconds} giây.</p></section><style jsx global>{`@keyframes fade-in-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}`}</style></main>;
}
