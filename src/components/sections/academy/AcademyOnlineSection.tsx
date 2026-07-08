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

  return (
    <Section padding="md" bg="white">
      <h2 className="mb-10 text-center text-3xl font-black leading-tight md:text-4xl" style={{ color: colors.primary.navy.DEFAULT }}>
        CÁC VIDEO <span style={{ color: colors.primary.DEFAULT }}>KHÓA HỌC ONLINE</span>
      </h2>

      <div className="mx-auto grid max-w-5xl items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="relative h-[260px] overflow-hidden rounded-lg bg-gray-100 shadow-sm md:h-[330px]">
          <Image src={mainVideo.image} alt={mainVideo.title} fill className="object-cover" sizes="640px" />
        </div>

        <div className="flex h-full flex-col gap-5">
          {[mainVideo, ...sideVideos].map((video) => (
            <article key={video.title} className="grid flex-1 grid-cols-[132px_1fr] gap-4">
              <div className="relative h-full min-h-20 overflow-hidden rounded-md bg-gray-100">
                <Image src={video.image} alt={video.title} fill className="object-cover" sizes="132px" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="line-clamp-2 text-sm font-bold leading-snug" style={{ color: colors.primary.navy.DEFAULT }}>
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
