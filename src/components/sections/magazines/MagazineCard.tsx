"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import type { EMagazine } from "@/types/api";

interface Props {
  magazine: EMagazine;
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("vi-VN", {
    month: "short",
    year: "numeric",
  }).toUpperCase();
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
  const coverUrl = magazine.coverImageMedia?.url ?? "/images/placeholder-magazine.png";
  const dateLabel = formatDate(magazine.publishedDate);
  const downloadFilename = `${magazine.title}.pdf`;

  const cardContent = (
    <>
      {/* Blue corner */}
      <div
        className="absolute top-0 right-0 w-10 h-10 rounded-bl-2xl"
        style={{ backgroundColor: colors.secondary.DEFAULT }}
      />

      {/* Magazine Cover */}
      <div className="relative w-32 sm:w-40 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        <Image
          src={coverUrl}
          alt={magazine.title}
          fill
          className="object-cover"
          sizes="160px"
          loading="lazy"
        />
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
              className="text-sm line-clamp-3"
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
