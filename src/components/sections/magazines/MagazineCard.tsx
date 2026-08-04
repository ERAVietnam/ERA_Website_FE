"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import type { EMagazine } from "@/types/api";
import { formatMonthYear } from "@/lib/date";

interface Props {
  magazine: EMagazine;
}

function handleDownload(pdfUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = filename;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function MagazineCard({ magazine }: Props) {
  const pdfUrl = magazine.pdfMedia?.url;
  const coverUrl = magazine.coverImageMedia?.url;
  const dateLabel = formatMonthYear(magazine.publishedDate);
  const downloadFilename = `${magazine.title}.pdf`;

  const cardContent = (
    <>
      {/* Blue corner */}
      <div
        className="absolute top-0 right-0 w-10 h-10 rounded-bl-2xl"
        style={{ backgroundColor: colors.secondary.DEFAULT }}
      />

      {/* Magazine Cover */}
      <div className="relative w-56 sm:w-72 aspect-[16/9] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={magazine.title}
            fill
            className="object-cover object-right-top"
            sizes="(min-width: 640px) 288px, 224px"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-1">
            <FileText size={32} strokeWidth={1.5} />
            <span className="text-[10px]">PDF</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 pt-1">
        <h3
          className="mb-1 line-clamp-2"
          style={{
            color: colors.neutral.foreground,
            fontWeight: 700,
            fontSize: "18px",
          }}
        >
          {magazine.title}
        </h3>
        {dateLabel && (
          <p
            className="text-xs mb-3"
            style={{
              color: colors.gray[400],
              fontWeight: 500,
            }}
          >
            {dateLabel}
          </p>
        )}

        {/* Summary with red left border */}
        {magazine.description && (
          <div className="border-l-2 border-primary pl-3 mb-3">
            <p
              className="text-sm line-clamp-2"
              style={{
                color: colors.gray[600],
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              {magazine.description}
            </p>
          </div>
        )}

        <div className="mt-auto">
          {pdfUrl ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="gap-2 whitespace-nowrap"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDownload(pdfUrl, downloadFilename);
              }}
            >
              <svg
                className="flex-shrink-0"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              DOWNLOAD
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );

  if (!pdfUrl) {
    return (
      <article className="relative bg-white rounded-2xl p-4 shadow-sm flex gap-4 overflow-hidden cursor-default">
        {cardContent}
      </article>
    );
  }

  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative bg-white rounded-2xl p-4 shadow-sm flex gap-4 overflow-hidden transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5"
    >
      {cardContent}
    </a>
  );
}
