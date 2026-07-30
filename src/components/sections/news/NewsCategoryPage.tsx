"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import { NewsArticleCard } from "./NewsArticleCard";
import type { NewsArticle, NewsCategory } from "@/types/api";

interface NewsCategoryPageProps {
  category: NewsCategory;
  articles: NewsArticle[];
}


export function NewsCategoryPage({ category, articles }: NewsCategoryPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Section padding="sm" bg="gray">
        <Link
          href={ROUTES.news}
          className="inline-flex items-center gap-2 text-sm font-medium mb-6 pt-8 md:pt-0 hover:opacity-80 transition-opacity"
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
              <NewsArticleCard
                key={item.id}
                article={item}
                imageHeight="h-56"
                titleLines="line-clamp-3 min-h-[4.125rem]"
              />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
