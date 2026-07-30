"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import { NewsSearchBox } from "./NewsTabsSection";
import { NewsArticleCard } from "./NewsArticleCard";
import type { NewsArticle } from "@/types/api";

interface NewsSearchPageProps {
  search: string;
  articles: NewsArticle[];
}

export function NewsSearchPage({ search, articles }: NewsSearchPageProps) {
  const [query, setQuery] = useState(search);

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/tin-tuc/tim-kiem?search=${encodeURIComponent(query.trim())}`;
    }
  };

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

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <div className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: colors.primary.DEFAULT }} />
          <h1
            style={{
              color: colors.primary.DEFAULT,
              fontWeight: 800,
              fontSize: "clamp(24px, 4vw, 36px)",
            }}
          >
            Kết quả tìm kiếm
          </h1>
        </div>

        <div className="mb-6">
          <NewsSearchBox
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
          />
        </div>

        <div
          className="flex items-center gap-2 mb-6 px-4 py-3 bg-white rounded-xl border border-gray-200"
        >
          <Search size={18} style={{ color: colors.primary.DEFAULT }} />
          <span className="text-sm text-gray-500">Từ khóa:</span>
          <span className="text-sm font-semibold" style={{ color: colors.neutral.foreground }}>
            {search}
          </span>
          <span className="text-sm text-gray-400 ml-auto">
            {articles.length} kết quả
          </span>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
            <p className="text-lg" style={{ color: colors.gray[500] }}>
              Không tìm thấy bài viết nào cho từ khóa &quot;{search}&quot;.
            </p>
            <Link
              href={ROUTES.news}
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: colors.primary.DEFAULT }}
            >
              <ArrowLeft size={16} />
              Quay lại trang Tin tức
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((item) => (
              <NewsArticleCard
                key={item.id}
                article={item}
                imageHeight="h-44"
                titleLines="line-clamp-2 min-h-[2.75rem]"
              />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
