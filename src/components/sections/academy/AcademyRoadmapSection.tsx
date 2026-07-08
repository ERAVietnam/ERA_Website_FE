import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { ArrowRight } from "lucide-react";

const tracks = [
  {
    image: "/academy/c22f7bc6b0feb8910dc28767f1ca9a399478b568.webp",
    title: "DÀNH CHO NGƯỜI MỚI",
    titleLines: ["DÀNH CHO", "NGƯỜI MỚI"],
    color: "#38BDF8",
    button: "ĐĂNG KÝ TƯ VẤN",
    bullets: [
      "Chưa phải là môi giới tại Era Vietnam",
      "Tham khảo khóa học phù hợp và lịch đào tạo sắp tới",
    ],
  },
  {
    image: "/academy/09c0f7380f27e8c9a2ad689340af5ebcd18fdb7d.webp",
    title: "DÀNH CHO NGƯỜI CÓ KINH NGHIỆM",
    titleLines: ["DÀNH CHO NGƯỜI", "CÓ KINH NGHIỆM"],
    color: "#F97316",
    button: "ĐĂNG KÝ TƯ VẤN",
    bullets: [
      "Tôi muốn gia nhập ERA Vietnam",
      "Tìm hiểu cơ hội sự nghiệp và lộ trình đào tạo khi gia nhập ERA Vietnam",
    ],
  },
  {
    image: "/academy/3d6da0ea19e2fdbf7dd9dc84de60f732d2ec0ca6.webp",
    title: "DÀNH CHO AGENT TẠI ERA VIETNAM",
    titleLines: ["DÀNH CHO AGENT", "TẠI ERA VIETNAM"],
    color: colors.primary.DEFAULT,
    button: "TRUY CẬP MY ERA",
    bullets: [
      "Tôi là Agent của ERA Vietnam",
      "Khám phá khóa học liệu online siêu đa dạng & lịch đào tạo mới nhất cùng App My ERA",
    ],
  },
];

export function AcademyRoadmapSection() {
  return (
    <Section padding="md" bg="gray">
      <div className="text-center">
        <p className="mb-2 text-sm" style={{ color: colors.primary.navy.DEFAULT }}>
          Bắt đầu ngay hôm nay
        </p>
        <h2 className="text-3xl font-black leading-tight md:text-4xl" style={{ color: colors.primary.navy.DEFAULT }}>
          CHỌN LỘ TRÌNH <span style={{ color: colors.primary.DEFAULT }}>PHÙ HỢP VỚI BẠN</span>
        </h2>
        <p className="mt-3 text-sm text-gray-600">
          Dù bạn đang ở đâu trong sự nghiệp, ERA Academy có đúng chương trình dành cho bạn.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {tracks.map((track, index) => (
          <div key={track.title} className="contents">
            <article className="rounded-xl bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.12)]">
                <div className="relative h-56 overflow-hidden rounded-lg bg-gray-100">
                  <Image src={track.image} alt={track.title} fill className="object-cover" sizes="360px" />
                </div>
                <h3 className="mt-6 min-h-[48px] text-center text-lg font-black leading-tight" style={{ color: track.color }}>
                  {track.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <ul className="mt-5 min-h-[96px] list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
                  {track.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-6 w-full rounded-lg"
                  style={{ backgroundColor: track.color }}
                >
                  {track.button}
                </Button>
              </article>
              {index < tracks.length - 1 && (
                <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-white text-[#D4112D] shadow-md md:flex">
                  <ArrowRight size={24} strokeWidth={2.5} />
                </div>
              )}
          </div>
        ))}
      </div>
    </Section>
  );
}
