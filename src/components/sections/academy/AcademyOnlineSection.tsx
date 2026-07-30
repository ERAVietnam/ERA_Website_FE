"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";

const videos = [
  {
    image: "/academy/c0cde12778c4e8d5604cbf01b366c91d501c2469.webp",
    title: "Làm Chủ Bộ Công Cụ AI Thực Chiến Dành Cho Môi Giới BĐS",
    trainer: "Team Marketing",
  },
  {
    image: "/academy/88fc2a8a825b380ea0fee15942997aea10b4db33.webp",
    title: "Series Thực Hành Pháp Lý - Dành Cho Môi Giới BĐS",
    trainer: "Tracy Võ",
  },
  {
    image: "/academy/2ad7b67fc64c16951c92974f2a53aa83025877a2.webp",
    title: 'Kỹ Năng Tìm Kiếm Khách Hàng "0 Đồng"',
    trainer: "Oanh Vũ",
  },
];

export function AcademyOnlineSection() {
  const [mainVideo, ...sideVideos] = videos;
  const mobileVideos = videos.slice(-3);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + mobileVideos.length) % mobileVideos.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % mobileVideos.length);
  };

  useEffect(() => {
    const intervalId = window.setInterval(goNext, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    touchStartXRef.current = null;
  };

  return (
    <Section padding="md" bg="white">
      <h2 className="mb-10 text-center text-3xl font-black leading-tight md:text-4xl" style={{ color: colors.primary.navy.DEFAULT }}>
        <span className="block md:inline">CÁC VIDEO</span>
        <span className="block md:inline md:ml-2" style={{ color: colors.primary.DEFAULT }}>
          KHÓA HỌC ONLINE
        </span>
      </h2>

      <div className="mx-auto max-w-4xl md:hidden">
        <div
          className="overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {mobileVideos.map((video) => (
              <article key={video.title} className="min-w-full">
                <div className="relative h-[220px] overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                  <Image src={video.image} alt={video.title} fill className="object-cover" sizes="100vw" />
                </div>
                <h3
                  className="mt-4 text-center text-base font-semibold leading-snug"
                  style={{ color: colors.primary.navy.DEFAULT }}
                >
                  {video.title}
                </h3>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {mobileVideos.map((video, index) => (
            <button
              type="button"
              key={video.title}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-7 bg-academy-red" : "w-2.5 bg-gray-300"
              }`}
              aria-label={`Xem video ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto hidden max-w-5xl items-stretch gap-6 md:grid lg:grid-cols-[1.35fr_1fr]">
        <div className="group relative h-[260px] overflow-hidden rounded-lg bg-gray-100 shadow-sm md:h-[330px]">
          <Image src={mainVideo.image} alt={mainVideo.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="640px" />
        </div>

        <div className="flex h-full flex-col gap-5">
          {[mainVideo, ...sideVideos].map((video) => (
            <article key={video.title} className="group grid flex-1 grid-cols-[132px_1fr] gap-4">
              <div className="relative h-full min-h-20 overflow-hidden rounded-md bg-gray-100">
                <Image src={video.image} alt={video.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" sizes="132px" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="line-clamp-2 text-sm font-bold leading-snug transition-all duration-300 group-hover:font-black" style={{ color: colors.primary.navy.DEFAULT }}>
                  {video.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">Trainer: {video.trainer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
