"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import { formatDateShort } from "@/lib/date";
import { getArticleImage } from "@/lib/news";
import type { NewsArticle } from "@/types/api";

interface NewsSectionClientProps {
  articles: NewsArticle[];
}


export function NewsSectionClient({ articles }: NewsSectionClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (articles.length === 0) {
    return null;
  }

  return (
    <Section padding="xl" bg="white">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <Link href={ROUTES.news}>
          <h2
            className="text-[28px] lg:text-[36px]"
            style={{
              fontWeight: 800,
            }}
          >
            <span
              className="lg:hidden"
              style={{ color: colors.primary.navy.DEFAULT }}
            >
              TIN TỨC & SỰ KIỆN
            </span>
            <span
              className="hidden lg:inline"
              style={{ color: colors.primary.navy.DEFAULT }}
            >
              TIN TỨC & SỰ KIỆN
            </span>
          </h2>
        </Link>
        <Link
          href={ROUTES.news}
          className="hidden lg:flex items-center gap-2 transition-colors duration-200 hover:text-primary-dark"
          style={{ color: colors.primary.DEFAULT }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: '16px',
            }}
          >
            Xem tất cả
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Desktop Grid - 3 columns */}
      <div className="hidden lg:grid grid-cols-3 gap-8">
        {articles.map((item) => (
          <Link
            key={item.id}
            href={`${ROUTES.news}/${item.slug}/`}
            className="group cursor-pointer block"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
              <Image
                src={getArticleImage(item) || "/home/home_news_placeholder.webp"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <p
              className="mb-2"
              style={{
                color: colors.gray[400],
                fontWeight: 400,
                fontSize: '12px',
              }}
            >
              {formatDateShort(item.displayPublishedAt || item.publishedAt || item.createdAt)}
            </p>
            <h3
              className="mb-2 line-clamp-2 transition-colors group-hover:text-primary"
              style={{
                color: colors.neutral.foreground,
                fontWeight: 600,
                fontSize: '18px',
              }}
            >
              {item.title}
            </h3>
            <p
              className="line-clamp-2"
              style={{
                color: colors.gray[500],
                fontWeight: 400,
                fontSize: '14px',
              }}
            >
              {item.summary || ""}
            </p>
          </Link>
        ))}
      </div>

      {/* Mobile List */}
      <div className="lg:hidden">
        <div className="flex flex-col gap-6">
          {articles.map((item, index) => (
            <Link
              key={item.id}
              href={`${ROUTES.news}/${item.slug}/`}
              className="flex gap-4 cursor-pointer"
            >
              {/* Thumbnail */}
              <div
                className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden"
              >
                <Image
                  src={getArticleImage(item) || "/home/home_news_placeholder.webp"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                {/* Category - red uppercase */}
                <p
                  className="mb-1"
                  style={{
                    color: colors.primary.DEFAULT,
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.category?.name || "Tin tức"}
                </p>
                {/* Title */}
                <h3
                  className="mb-1 line-clamp-2"
                  style={{
                    color: colors.neutral.foreground,
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </h3>
                {/* Date */}
                <p
                  style={{
                    color: colors.gray[400],
                    fontWeight: 400,
                    fontSize: '12px',
                  }}
                >
                  {formatDateShort(item.displayPublishedAt || item.publishedAt || item.createdAt).toUpperCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <Link
          href={ROUTES.news}
          className="mt-8 w-full py-4 rounded-xl text-white text-center block transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          style={{
            backgroundColor: colors.primary.DEFAULT,
            fontWeight: 600,
            fontSize: '16px',
            textTransform: 'uppercase',
          }}
        >
          Xem tất cả tin tức
        </Link>
      </div>
    </Section>
  );
}
