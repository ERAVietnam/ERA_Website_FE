"use client";

import { memo } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

const magazines = [
  {
    id: 1,
    title: "Project Ebook",
    date: "THÁNG 6.2026",
    summary: "Hơn 30 dự án đang booking và sắp mở bán trong tháng 6 năm 2026.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400",
    pdfUrl: "/e-magazine/project-ebook-thang-06-2026.pdf",
  },
  {
    id: 2,
    title: "ERA Market Watch",
    date: "THÁNG 3.2026",
    summary: "Tổng quan thị trường bất động sản quý I/2026 với những con số ấn tượng về thanh khoản và dòng vốn FDI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Investment Guide",
    date: "THÁNG 2.2026",
    summary: "Cẩm nang đầu tư bất động sản 2026 dành cho nhà đầu tư mới, với những lợi ích và rủi ro cần lưu ý.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    title: "Agent Handbook",
    date: "THÁNG 1.2026",
    summary: "Hướng dẫn toàn diện cho Agent ERA về kỹ năng bán hàng, chăm sóc khách hàng và ứng dụng công nghệ.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
  },
];

interface NewsEMagazineSectionProps {
  bg?: "white" | "gray";
}

export const NewsEMagazineSection = memo(function NewsEMagazineSection({
  bg = "gray",
}: NewsEMagazineSectionProps) {
  return (
    <Section padding="sm" bg={bg}>
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: colors.primary.DEFAULT }}
          />
          <h2
            style={{
              color: colors.primary.DEFAULT,
              fontWeight: 700,
              fontSize: '24px',
            }}
          >
            E-Magazine
          </h2>
        </div>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {magazines.map((mag) => (
            <article
              key={mag.id}
              onClick={() => {
                if (mag.pdfUrl) {
                  window.open(mag.pdfUrl, "_blank", "noopener,noreferrer");
                }
              }}
              className={`relative bg-white rounded-2xl p-4 shadow-sm flex gap-4 overflow-hidden transition-all duration-200 ${
                mag.pdfUrl
                  ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5"
                  : "cursor-default"
              }`}
            >
              {/* Blue corner */}
              <div
                className="absolute top-0 right-0 w-10 h-10 rounded-bl-2xl"
                style={{ backgroundColor: colors.secondary.DEFAULT }}
              />

              {/* Magazine Cover */}
              <div className="relative w-32 sm:w-40 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={mag.image}
                  alt={mag.title}
                  fill
                  className="object-cover"
                  sizes="160px"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col min-w-0 pt-1">
                <h3
                  className="mb-1"
                  style={{
                    color: colors.neutral.foreground,
                    fontWeight: 700,
                    fontSize: '18px',
                  }}
                >
                  {mag.title}
                </h3>
                <p
                  className="text-xs mb-3"
                  style={{
                    color: colors.gray[400],
                    fontWeight: 500,
                  }}
                >
                  {mag.date}
                </p>

                {/* Summary with red left border */}
                <div className="border-l-2 border-primary pl-3 mb-3">
                  <p
                    className="text-[10px] font-bold uppercase mb-1"
                    style={{
                      color: colors.primary.DEFAULT,
                    }}
                  >
                    Tóm tắt bởi AI
                  </p>
                  <p
                    className="text-sm line-clamp-3"
                    style={{
                      color: colors.gray[600],
                      fontWeight: 400,
                      lineHeight: 1.5,
                    }}
                  >
                    {mag.summary}
                  </p>
                </div>

                <div className="mt-auto">
                  {mag.pdfUrl ? (
                    <Button
                      variant="primary"
                      size="sm"
                      className="gap-2 whitespace-nowrap"
                      asChild
                    >
                      <a
                        href={mag.pdfUrl}
                        download
                        rel="noopener noreferrer"
                        className="whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        DOWNLOAD
                      </a>
                    </Button>
                  ) : (
                    <Button variant="primary" size="sm" className="gap-2 whitespace-nowrap" disabled>
                      <svg className="flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      SẮP RA MẮT
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
    </Section>
  );
});
