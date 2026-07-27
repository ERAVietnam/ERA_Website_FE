"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { ProjectsSidebar } from "@/components/sections/projects/ProjectsSidebar";
import { CountryFlag } from "@/components/shared/CountryFlag";
import { formatDate } from "@/lib/date";
import { getArticleImage } from "@/lib/news";
import { extractHeadings } from "@/lib/toc";
import { NewsTableOfContents } from "./NewsTableOfContents";
import { FileText } from "lucide-react";
import { NewsFaqSection } from "./NewsFaqSection";
import { RichTextContent } from "@/components/shared/RichTextContent";
import type { NewsArticle } from "@/types/api";

interface NewsDetailPageProps {
  article: NewsArticle;
  relatedArticles?: NewsArticle[];
  isPreview?: boolean;
}


export const NewsDetailPage = memo(function NewsDetailPage({
  article,
  relatedArticles = [],
  isPreview = false,
}: NewsDetailPageProps) {
  const { html: processedContent, headings } = useMemo(
    () => extractHeadings(article.content),
    [article.content]
  );

  const pageUrl = `https://era.com.vn/tin-tuc/${article.slug}/`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(article.title);

  const isPressRelease = article.category.slug === "thong-cao-bao-chi";

  const shareLinks =[
    { name: "Facebook", src: "/shared/fb_icon.svg", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: "Twitter", src: "/shared/x_icon.svg", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: "LinkedIn", src: "/shared/linkedin_icon.svg", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
  ];

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: pageUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(pageUrl).catch(() => {});
    }
  };

  return (
    <main style={{ backgroundColor: colors.gray[50] }}>
      <Container size="full" className="max-w-[1200px]">
        <div
          className={`grid gap-8 lg:gap-12 ${
            isPreview || isPressRelease
              ? "grid-cols-1 max-w-[800px] mx-auto"
              : "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]"
          }`}
        >
          <article className={`pt-20 md:pt-16 pb-12 ${isPreview || isPressRelease ? "" : "lg:pl-0"}`}>
          {!isPreview && (
            /* Breadcrumb */
            <div className="mb-4 flex items-center gap-2">
              <Link
                href={ROUTES.news}
                style={{ color: colors.gray[500], fontSize: "14px" }}
                className="hover:text-primary transition-colors flex-shrink-0"
              >
                Tin tức
              </Link>
              <span
                className="flex-shrink-0"
                style={{ color: colors.gray[400] }}
              >
                /
              </span>
              <span
                className="truncate"
                style={{
                  color: colors.primary.DEFAULT,
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                {article.category.name}
              </span>
              {article.category.slug === "era-news" && article.countryCode && (
                <CountryFlag
                  code={article.countryCode}
                  width={20}
                  className="ml-2 flex-shrink-0"
                />
              )}
            </div>
          )}

          {/* Title */}
          <h1
            className="mb-4 pt-10"
            style={{
              color: colors.primary.DEFAULT,
              fontWeight: 800,
              fontSize: "26px",
              lineHeight: 1.3,
            }}
          >
            {article.title}
          </h1>

          {/* Table of Contents */}
          <NewsTableOfContents headings={headings} />

          {/* Body Content */}
          <RichTextContent
            html={processedContent}
            className="mb-12 ck-content richtext-content"
            style={{
              color: colors.neutral.foreground,
            }}
          />

          <NewsFaqSection items={article.faqs ?? []} />

          {article.pdfMedia && (
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p
                className="mb-3 text-sm font-semibold uppercase tracking-wide"
                style={{ color: colors.primary.navy.DEFAULT }}
              >
                Tệp đính kèm
              </p>
              <a
                href={article.pdfMedia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 transition-colors hover:bg-red-100"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#C8102E] shadow-sm">
                  <FileText size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {article.pdfMedia.filename}
                  </p>
                  <p className="text-xs text-gray-500">Mở hoặc tải file PDF</p>
                </div>
              </a>
            </div>
          )}

          {/* Source + Date row */}
          <div className={`flex items-center mb-10 ${article.source ? "justify-between" : "justify-end"}`}>
            {article.source ? (
              <p
                style={{
                  color: colors.gray[500],
                  fontSize: "14px",
                }}
              >
                Trích nguồn: {article.source}
              </p>
            ) : null}
            <p
              style={{
                color: colors.gray[500],
                fontSize: "14px",
              }}
            >
              {formatDate(article.displayPublishedAt || article.publishedAt || article.createdAt)}
            </p>
          </div>

          {!isPreview && (
            <>
              {/* Share Section */}
              <div className="mb-10">
                <h4
                  className="mb-3"
                  style={{
                    color: colors.neutral.foreground,
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  Chia sẻ
                </h4>
                <div className="flex items-center gap-3">
                  {shareLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="flex items-center justify-center transition-opacity hover:opacity-80"
                    >
                      <Image
                        src={link.src}
                        alt={link.name}
                        width={36}
                        height={36}
                        className="w-9 h-9"
                      />
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    aria-label="Chia sẻ"
                    className="flex items-center justify-center transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/news/news_share_icon.svg"
                      alt="Chia sẻ"
                      width={36}
                      height={36}
                      className="w-9 h-9"
                    />
                  </button>
                </div>
              </div>
            </>
          )}
          </article>

          {!isPreview && !isPressRelease && (
            <aside className="hidden lg:block pt-24 md:pt-20">
              <div className="sticky top-24">
                <ProjectsSidebar />
              </div>
            </aside>
          )}
        </div>
      </Container>

      {!isPreview && relatedArticles.length > 0 && (
        <Container size="full" className="max-w-[1200px]">
          <div className="pb-12">
            <h3
              className="mb-6"
              style={{
                color: colors.primary.navy.DEFAULT,
                fontWeight: 900,
                fontSize: "28px",
              }}
            >
              Tin tức liên quan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/tin-tuc/${item.slug}/`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer group hover:shadow-md transition-transform duration-300 hover:scale-[1.02] block"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {getArticleImage(item) ? (
                      <Image
                        src={getArticleImage(item)!}
                        alt={item.title}
                        fill
                        className="object-cover"
                        style={{ objectPosition: "top right", transition: "transform 0.3s ease" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm">
                        Không có ảnh
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p
                      className="text-xs mb-2"
                      style={{
                        color: colors.gray[400],
                      }}
                    >
                      {formatDate(item.displayPublishedAt || item.publishedAt || item.createdAt)}
                    </p>
                    <h4
                      className="mb-2 line-clamp-2 group-hover:text-primary transition-colors"
                      style={{
                        color: colors.neutral.foreground,
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      )}
    </main>
  );
});
