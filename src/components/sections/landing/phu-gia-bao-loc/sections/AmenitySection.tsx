"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function AmenityImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}

function LeafDivider() {
  return (
    <motion.div
      className="mt-10 flex items-center justify-center sm:mt-14"
      initial={{ opacity: 0, scaleX: 0.8 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="h-px max-w-md flex-1 sm:max-w-lg"
        style={{
          background: "linear-gradient(90deg, rgba(75,213,150,0), #4BD596 20%, #276F4E 70%, rgba(199,154,107,0.1))",
        }}
      />
      <Image
        src="/landing/phu-gia-bao-loc/images/overview_leaf.svg"
        alt="leaf"
        width={48}
        height={48}
        className="mx-4 h-8 w-auto sm:h-10"
      />
      <div
        className="h-px max-w-md flex-1 sm:max-w-lg"
        style={{
          background: "linear-gradient(90deg, rgba(199,154,107,0.1), #276F4E 30%, #4BD596 80%, rgba(75,213,150,0))",
        }}
      />
    </motion.div>
  );
}

function MobileCarousel({
  images,
  aspectClassName = "aspect-[4/3]",
}: {
  images: { src: string; alt: string }[];
  aspectClassName?: string;
}) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el) {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActive(idx);
    }
  };

  const goTo = (idx: number) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full shrink-0 snap-center px-4">
            <div className={`relative w-full overflow-hidden rounded-2xl ${aspectClassName}`}>
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="100vw" />
            </div>
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${active === idx ? "bg-[#174C25]" : "bg-[#D1D5DB]"}`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const mobileParts = [
  {
    title: "Công viên cảnh quan",
    subtitle: "Cupid - Vườn mê Cung - Fern - Rose - Japanese Garden",
    images: [
      { src: "/landing/phu-gia-bao-loc/images/amenity_01.png", alt: "Cảnh quan 1" },
      { src: "/landing/phu-gia-bao-loc/images/amenity_02.png", alt: "Cảnh quan 2" },
      { src: "/landing/phu-gia-bao-loc/images/amenity_03.png", alt: "Cảnh quan 3" },
      { src: "/landing/phu-gia-bao-loc/images/amenity_04.png", alt: "Cảnh quan 4" },
      { src: "/landing/phu-gia-bao-loc/images/amenity_gardent.png", alt: "Công viên cảnh quan" },
    ],
  },
  {
    title: "Thể thao & vận động",
    subtitle: "Sân Pickleball · Sân bóng rổ",
    images: [
      { src: "/landing/phu-gia-bao-loc/images/amenity_05.png", alt: "Sân Pickleball" },
      { src: "/landing/phu-gia-bao-loc/images/amenity_09.png", alt: "Sân bóng rổ" },
    ],
  },
  {
    title: "Gia đình & Cộng đồng",
    subtitle: "Khu BBQ & picnic ngoài trờ - Sân chơi trẻ em - Lối đi bộ và không gian xanh",
    images: [
      { src: "/landing/phu-gia-bao-loc/images/amenity_06.png", alt: "Sân chơi trẻ em" },
      { src: "/landing/phu-gia-bao-loc/images/amenity_10.png", alt: "Lối đi cư dân" },
    ],
  },
  {
    title: "Tuyệt tác kiến trúc Indochine vượt thởi gian",
    subtitle:
      "Nơi nét hoài cổ, quyến rũ của họa tiết Á Đông giao hòa hoàn hảo cùng vẻ phóng khoáng, hiện đại của kiến trúc Pháp. Tất cả tạo nên một không gian sống kiêu hãnh, vừa sang trọng tinh tế, vừa chạm mở bình yên giữa lòng thiên nhiên cao nguyên.",
    images: [
      { src: "/landing/phu-gia-bao-loc/images/amenity_07.png", alt: "Kiến trúc Indochine 1" },
      { src: "/landing/phu-gia-bao-loc/images/amenity_08.png", alt: "Kiến trúc Indochine 2" },
    ],
  },
];

export function AmenitySection() {
  return (
    <section id="amenity" className="relative w-full bg-[#FBF7EF] py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <motion.div
          className="hidden sm:block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src="/landing/phu-gia-bao-loc/images/amenity_title.png"
            alt="Tiện Ích All-In-One Dành Cho Cư Dân"
            width={1121}
            height={106}
            className="mx-auto h-12 w-auto sm:h-16"
          />
        </motion.div>

        {/* Park collage - desktop */}
        <motion.div
          className="mt-10 hidden h-[400px] grid-cols-3 gap-4 sm:grid lg:h-[500px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Column 1: top = 1/2 bottom */}
          <motion.div className="flex h-full flex-col gap-4" variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_01.png" alt="Cảnh quan 1" className="flex-[1]" />
            <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_02.png" alt="Cảnh quan 2" className="flex-[2]" />
          </motion.div>

          {/* Column 2: top = 2× bottom */}
          <motion.div className="flex h-full flex-col gap-4" variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_03.png" alt="Cảnh quan 3" className="flex-[2]" />
            <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_04.png" alt="Cảnh quan 4" className="flex-[1]" />
          </motion.div>

          {/* Column 3: text + big image */}
          <motion.div className="flex h-full flex-col gap-4" variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <div>
              <h3 className="text-3xl font-bold text-[#B25B3E]">Công viên cảnh quan</h3>
              <p className="mt-1 text-sm font-normal leading-relaxed text-[#555555]">
                Cupid - Vườn mê Cung - Fern - Rose - Japanese Garden
              </p>
            </div>
            <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_gardent.png" alt="Công viên cảnh quan" className="flex-1" />
          </motion.div>
        </motion.div>

        {/* Mobile layout */}
        <div className="-mx-6 mt-6 block space-y-10 px-6 sm:hidden">
          <div>
            <h2 className="text-center text-3xl font-semibold text-[#327400]">
              Đa tiện ích &
              <br />
              chỉ dành cho Tinh Hoa
            </h2>
            <p className="mt-3 text-center text-sm leading-relaxed text-[#555555]">
              Điểm khác biệt không nằm ở việc có bao nhiêu tiện ích, mà ở chỗ chúng nằm sau một cánh cổng. Không có xe lạ, không có khách vãng lai, không phải xếp hàng. Sân bóng lúc 5 giờ chiều là sân bóng của hàng xóm bạn.
            </p>
          </div>

          {mobileParts.map((part, idx) => (
            <div key={idx}>
              <h3 className="text-center text-3xl font-semibold text-[#B25B3E]">{part.title}</h3>
              <p className="mt-1 text-center text-sm font-normal leading-relaxed text-[#555555]">{part.subtitle}</p>
              <div className="mt-4">
                <MobileCarousel images={part.images} aspectClassName={idx === 3 ? "aspect-[3/4]" : "aspect-[4/3]"} />
              </div>
            </div>
          ))}

        </div>

        {/* Sports & family collage - desktop (left column first) */}
        <motion.div
          className="mt-4 hidden grid-cols-[3fr_2fr] gap-4 sm:grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Left column */}
          <motion.div
            className="flex h-[920px] flex-col gap-4 lg:h-[1160px]"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_05.png" alt="Sân Pickleball" className="flex-[2]" />
            <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_06.png" alt="Sân chơi trẻ em" className="flex-[1]" />
            <div>
              <h3 className="text-3xl font-bold text-[#B25B3E]">Gia đình & cộng đồng</h3>
              <p className="mt-1 text-sm font-normal leading-relaxed text-[#555555]">
                Khu BBQ & picnic ngoài trờ - Sân chơi trẻ em - Lối đi bộ và không gian xanh
              </p>
            </div>
            <div className="flex flex-1 gap-4">
              <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_07.png" alt="Kiến trúc Indochine 1" className="flex-1" />
              <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_08.png" alt="Kiến trúc Indochine 2" className="flex-1" />
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="flex h-[920px] flex-col gap-4 lg:h-[1160px]"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_09.png" alt="Sân bóng rổ" className="flex-[1]" />
            <div>
              <h3 className="text-3xl font-bold text-[#B25B3E]">Thể thao & vận động</h3>
              <p className="mt-1 text-sm font-normal leading-relaxed text-[#555555]">Sân Pickleball - Sân bóng rổ</p>
            </div>
            <AmenityImage src="/landing/phu-gia-bao-loc/images/amenity_10.png" alt="Lối đi cư dân" className="flex-[3]" />
            <div>
              <h3 className="text-3xl font-bold text-[#B25B3E]">Tuyệt tác kiến trúc Indochine vượt thời gian</h3>
              <p className="mt-1 text-sm font-normal leading-relaxed text-[#555555]">
                Nơi nét hoài cổ, quyến rũ của họa tiết Á Đông giao hòa hoàn hảo cùng vẻ phóng khoáng, hiện đại của kiến trúc Pháp. Tất cả tạo nên một không gian sống kiêu hãnh, vừa sang trọng tinh tế, vừa chạm mở bình yên giữa lòng thiên nhiên cao nguyên.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <LeafDivider />
      </div>
    </section>
  );
}
