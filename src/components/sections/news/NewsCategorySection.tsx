"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { colors, withOpacity } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import { CountryFlag } from "@/components/shared/CountryFlag";
import { formatDate } from "@/lib/date";
import { getArticleImage } from "@/lib/news";
import type { NewsArticle, NewsCategory } from "@/types/api";

interface NewsCategorySectionProps {
  category: NewsCategory;
  articles: NewsArticle[];
  totalCount: number;
  featuredPosition?: "left" | "right";
  bg?: "white" | "gray";
}


export const NewsCategorySection = memo(function NewsCategorySection({
  category,
  articles,
  totalCount,
  featuredPosition = "left",
  bg = "gray",
}: NewsCategorySectionProps) {
  if (articles.length === 0) return null;

  const featuredIndex = articles.findIndex((a) => a.isFeatured);
  const featuredArticle = articles[featuredIndex >= 0 ? featuredIndex : 0];
  const sideArticles = articles.filter((_, i) => i !== (featuredIndex >= 0 ? featuredIndex : 0)).slice(0, 3);

  const featuredCard = (
    <div className="lg:col-span-3">
      <Link
        href={`${ROUTES.news}/${featuredArticle.slug}`}
        className="block"
      >
        <div className="relative h-[220px] sm:h-[280px] lg:h-[380px] rounded-2xl overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.01]">
          {getArticleImage(featuredArticle) ? (
            <Image
              src={getArticleImage(featuredArticle)!}
              alt={featuredArticle.title}
              fill
              className="object-cover"
              style={{ objectPosition: "top right" }}
              sizes="100vw"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0" style={{ backgroundColor: colors.gray[300] }} />
          )}

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${withOpacity(colors.neutral.black, 0.85)} 0%, ${withOpacity(colors.neutral.black, 0.4)} 40%, ${withOpacity(colors.neutral.black, 0.1)} 100%)`,
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div
              className="inline-flex px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white mb-2 sm:mb-3"
              style={{ backgroundColor: colors.primary.DEFAULT }}
            >
              TIÊU ĐIỂM
            </div>
            <h3
              className="text-white mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3 text-xl sm:text-2xl lg:text-[30px]"
              style={{
                fontWeight: 700,
                lineHeight: 1.4,
              }}
            >
              {featuredArticle.title}
            </h3>
            <div className="flex items-end justify-between gap-4">
              <p
                className="text-white/80 line-clamp-1 sm:line-clamp-2 flex-1 text-sm sm:text-base"
                style={{
                  fontWeight: 400,
                }}
              >
                {featuredArticle.summary}
              </p>
              {category.slug === "era-news" && featuredArticle.countryCode && (
                <CountryFlag code={featuredArticle.countryCode} width={20} className="flex-shrink-0 sm:w-6" />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  const sideList = (
    <div className="lg:col-span-2 flex flex-col gap-4 h-full">
      {sideArticles.map((item) => (
        <Link
          key={item.id}
          href={`${ROUTES.news}/${item.slug}`}
          className="block"
        >
          <article className="flex gap-4 cursor-pointer group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex-1">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              {getArticleImage(item) ? (
                <Image
                  src={getArticleImage(item)!}
                  alt={item.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "top right" }}
                  sizes="96px"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0" style={{ backgroundColor: colors.gray[200] }} />
              )}
            </div>
            <div className="flex-1 py-1 flex flex-col">
              <h3
                className="mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-primary transition-colors text-sm sm:text-base"
                style={{
                  color: colors.neutral.foreground,
                  fontWeight: 700,
                }}
              >
                {item.title}
              </h3>
              <p
                className="mt-auto text-xs sm:text-sm"
                style={{
                  color: colors.gray[400],
                  fontWeight: 400,
                }}
              >
                {formatDate(item.displayPublishedAt || item.publishedAt || item.createdAt)} • {item.readTime || "1 phút đọc"}
              </p>
              {category.slug === "era-news" && item.countryCode && (
                <div className="mt-1">
                  <CountryFlag code={item.countryCode} width={20} />
                </div>
              )}
            </div>
          </article>
        </Link>
      ))}
    </div>
  );

  return (
    <Section padding="sm" bg={bg}>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colors.primary.DEFAULT }} />
        <h2
          style={{
            color: colors.primary.DEFAULT,
            fontWeight: 700,
            fontSize: "30px",
          }}
        >
          {category.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {featuredPosition === "left" ? (
          <>
            {featuredCard}
            {sideList}
          </>
        ) : (
          <>
            {sideList}
            {featuredCard}
          </>
        )}
      </div>

      {totalCount > 4 && (
        <div className="mt-6 text-right">
          <Link
            href={`${ROUTES.newsCategory}/${category.slug}`}
            className="inline-flex items-center text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: colors.primary.DEFAULT }}
          >
            Xem thêm →
          </Link>
        </div>
      )}
    </Section>
  );
});
