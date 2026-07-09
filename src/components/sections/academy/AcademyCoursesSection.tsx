"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const filters = [
  "Tất cả khóa học",
  "Agent Mới",
  "Môi giới sơ cấp",
  "Môi giới Thứ cấp",
  "Đào tạo cơ bản",
  "Đào tạo chuyên sâu",
  "Đào tạo nâng cao",
  "Kỹ năng bán hàng",
  "Công cụ Marketing",
  "Xây dựng hệ thống",
  "Quản lý dự án",
];

const courses = [
  {
    image: "/academy/c0cde12778c4e8d5604cbf01b366c91d501c2469.webp",
    eyebrow: "Đào tạo cơ bản / Agent Mới / Công cụ Marketing",
    title: "Làm chủ bộ công cụ AI thực chiến dành cho Môi giới BĐS",
    bullets: [
      "Nhận diện tư duy làm việc cùng AI",
      "Hiểu và tối ưu các prompt môi giới sử dụng AI",
      "Hướng dẫn cấu trúc workflow trong công việc hằng ngày",
      "Phục vụ cho công việc hằng ngày của Agent",
    ],
  },
  {
    image: "/academy/88fc2a8a825b380ea0fee15942997aea10b4db33.webp",
    eyebrow: "Đào tạo cơ bản / Agent Mới",
    title: "Series Thực hành Pháp lý - Dành cho Môi giới BĐS",
    bullets: [
      "Nắm các nền tảng pháp lý cần thiết khi tư vấn",
      "Hiểu quy trình pháp lý trong giao dịch thực tế",
      "Các loại giấy tờ trong giao dịch cho, tặng, thừa kế, ủy quyền",
      "Những trường hợp được miễn thuế CN BĐS",
    ],
  },
  {
    image: "/academy/2ad7b67fc64c16951c92974f2a53aa83025877a2.webp",
    eyebrow: "Đào tạo nâng cao",
    title: 'Kỹ năng tìm kiếm khách hàng "0 đồng"',
    bullets: [
      "Tăng tỷ lệ kết nối khách hàng tiềm năng",
      "Làm chủ kênh Social cá nhân Facebook, TikTok",
      "Tối ưu hóa nội dung giới thiệu hình ảnh cá nhân",
      "Đo lường và tối ưu hiệu suất, biết cách xác nhận dòng lead đang mang lại hiệu quả",
    ],
  },
];

export function AcademyCoursesSection() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Section padding="sm" bg="white" className="pt-24 md:pt-28">
      <div className="text-center">
        <h2 className="text-3xl font-black leading-tight md:text-4xl" style={{ color: colors.primary.navy.DEFAULT }}>
          <span className="block md:inline" style={{ color: colors.primary.DEFAULT }}>
            ERA ACADEMY
          </span>
          <span className="block md:inline md:ml-2">PHÙ HỢP VỚI AI ?</span>
        </h2>
        <p className="mt-3 text-sm" style={{ color: colors.primary.navy.DEFAULT }}>
          Bắt đầu đúng cách từ việc chọn đúng khóa học
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[180px_1fr]">
        <aside className="h-fit rounded-xl lg:bg-white lg:p-5 lg:shadow-[0_8px_28px_rgba(15,23,42,0.08)]">
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="mb-0 flex w-full items-center justify-between rounded-lg bg-[#C8102E] px-4 py-3 text-left text-xs font-black uppercase text-white lg:pointer-events-none lg:mb-4 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0 lg:text-[#C8102E]"
          >
            Chọn khóa học
            <ChevronDown
              size={16}
              className={`transition-transform lg:hidden ${isFilterOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div className={`${isFilterOpen ? "mt-4 block" : "hidden"} space-y-3 lg:mt-0 lg:block`}>
            {filters.map((filter, index) => (
              <label key={filter} className="flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-600">
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-sm border ${
                    index === 0 ? "border-[#D4112D] bg-[#D4112D]" : "border-gray-300 bg-white"
                  }`}
                >
                  {index === 0 && <span className="h-1.5 w-1.5 rounded-sm bg-white" />}
                </span>
                {filter}
              </label>
            ))}
          </div>
        </aside>

        <div className="space-y-8">
          {courses.map((course) => (
            <article
              key={course.title}
              className="group grid gap-6 rounded-xl bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.08)] md:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)]"
            >
              <div className="relative min-h-[210px] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 768px) 520px, 100vw"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="mb-2 text-xs font-medium text-gray-500">{course.eyebrow}</p>
                <h3 className="text-xl font-bold leading-snug transition-all duration-300 group-hover:font-black" style={{ color: colors.primary.DEFAULT }}>
                  {course.title}
                </h3>
                <ol className="mt-4 list-decimal space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600">
                  {course.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ol>
                <p className="mt-4 text-xs italic text-gray-500">
                  Nhấp mở dự kiến: <span className="font-semibold text-[#F97316]">COMING SOON</span>
                </p>
                <Button variant="primary" size="sm" className="mt-4 w-full rounded-lg">
                  ĐĂNG KÝ NGAY
                </Button>
              </div>
            </article>
          ))}

          <div className="flex items-center justify-center gap-3">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-400 shadow-md">
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`h-9 w-9 rounded-lg text-sm font-bold shadow-md ${
                  page === 1 ? "bg-[#D4112D] text-white" : "bg-white text-gray-500"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-sm text-gray-400">...</span>
            <button className="h-9 w-9 rounded-lg bg-white text-sm font-bold text-gray-500 shadow-md">12</button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-400 shadow-md">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
