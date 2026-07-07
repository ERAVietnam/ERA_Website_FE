"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import { formatDate } from "@/lib/date";
import { getArticleImage } from "@/lib/news";
import type { NewsArticle, NewsCategory } from "@/types/api";

interface NewsCategoryPageProps {
  category: NewsCategory;
  articles: NewsArticle[];
}


export function NewsCategoryPage({ category, articles }: NewsCategoryPageProps) {
  const placeholderImg = "/news/news_placeholder.webp";

  return (
    <main className="min-h-screen bg-gray-50">
      <Section padding="sm" bg="gray">
        <Link
          href={ROUTES.news}
          className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-80 transition-opacity"
          style={{ color: colors.gray[500] }}
        >
          <ArrowLeft size={16} />
          Quay lại Tin tức
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 rounded-full" style={{ backgroundColor: colors.primary.DEFAULT }} />
          <h1
            style={{
              color: colors.primary.DEFAULT,
              fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 40px)",
            }}
          >
            {category.name}
          </h1>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
            <p className="text-lg" style={{ color: colors.gray[500] }}>
              Chưa có bài viết nào trong danh mục này.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((item) => (
              <Link
                key={item.id}
                href={`${ROUTES.news}/${item.slug}`}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <Image
                    src={getArticleImage(item) || placeholderImg}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ objectPosition: "top right" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <span
                    className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md text-white"
                    style={{ backgroundColor: colors.primary.DEFAULT }}
                  >
                    {item.category.name}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-bold leading-snug line-clamp-3 min-h-[4.125rem] group-hover:text-[#C8102E] transition-colors" style={{ color: colors.neutral.foreground, fontSize: "18px" }}>
                    {item.title}
                  </h2>
                  <div className="flex items-center justify-between pt-4 mt-auto">
                    <div className="text-xs space-y-0.5" style={{ color: colors.gray[400] }}>
                      <p className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(item.displayPublishedAt || item.publishedAt || item.createdAt)} • {item.readTime || "1 phút đọc"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
