"use client";

import Image from "next/image";
import { c } from "../theme";

export function LookbookSection() {
  return (
    <section id="khong-gian" className="py-16 md:py-28 bg-white">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="reveal text-center max-w-[660px] mx-auto mb-12">
          <div className="text-xs font-medium tracking-[2.5px] uppercase" style={{ color: c.greenSoft }}>
            Không gian sống
          </div>
          <div className="w-[46px] h-px mx-auto mt-5 mb-5" style={{ background: c.gold }} />
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(28px,3.6vw,44px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Mỗi khung cửa, một bức tranh.
          </h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: c.inkSoft }}>
            Thiết kế xoay lệch trục đón trọn ánh sáng và tầm nhìn Hồ Thiên Nga -
            không một căn nào bị chắn.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 grid-rows-[150px_150px] md:grid-rows-[165px_165px] gap-3.5">
          <figure className="relative overflow-hidden rounded-2xl md:col-span-3 md:row-span-2 group min-h-[150px]">
            <Image
              src="/landing/forest-onsen/02_img/canh/forest-onsen-phong-khach-thong-tang.jpg"
              alt="Phòng khách thông tầng"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <figcaption
              className="absolute left-4 bottom-3 text-white text-lg font-semibold z-10"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: "0 1px 10px rgba(0,0,0,.6)" }}
            >
              Phòng khách thông tầng
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-2xl md:col-span-3 md:row-span-2 group min-h-[150px]">
            <Image
              src="/landing/forest-onsen/02_img/canh/forest-onsen-ban-cong-nam-view-ho-thien-nga.jpg"
              alt="Ban công view Hồ Thiên Nga"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <figcaption
              className="absolute left-4 bottom-3 text-white text-lg font-semibold z-10"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: "0 1px 10px rgba(0,0,0,.6)" }}
            >
              Ban công view Hồ Thiên Nga
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-2xl md:col-span-2 group min-h-[150px]">
            <Image
              src="/landing/forest-onsen/02_img/canh/forest-onsen-phong-ngu-view-ho.jpg"
              alt="Phòng ngủ master"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <figcaption
              className="absolute left-4 bottom-3 text-white text-lg font-semibold z-10"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: "0 1px 10px rgba(0,0,0,.6)" }}
            >
              Phòng ngủ master
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-2xl md:col-span-2 group min-h-[150px]">
            <Image
              src="/landing/forest-onsen/02_img/canh/forest-onsen-phong-tam-bon-view-ho.jpg"
              alt="Phòng tắm view hồ"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <figcaption
              className="absolute left-4 bottom-3 text-white text-lg font-semibold z-10"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: "0 1px 10px rgba(0,0,0,.6)" }}
            >
              Phòng tắm view hồ
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden rounded-2xl md:col-span-2 group min-h-[150px]">
            <Image
              src="/landing/forest-onsen/02_img/canh/forest-onsen-goc-thu-gian-view-ho.jpg"
              alt="Góc thư giãn"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <figcaption
              className="absolute left-4 bottom-3 text-white text-lg font-semibold z-10"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: "0 1px 10px rgba(0,0,0,.6)" }}
            >
              Góc thư giãn
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

