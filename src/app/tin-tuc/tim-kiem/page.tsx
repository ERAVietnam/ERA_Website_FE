import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsSearchPage } from "@/components/sections/news/NewsSearchPage";
import { newsApi } from "@/api/domains/news";
import type { NewsArticle, NewsCategory } from "@/types/api";

export const revalidate = 3600;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; categorySlug?: string }>;
}): Promise<Metadata> {
  const { search = "", categorySlug = "" } = await searchParams;
  const title = search
    ? `Kết quả tìm kiếm "${search}" | Tin tức ERA Vietnam`
    : "Tìm kiếm tin tức | ERA Vietnam";

  return {
    title,
    description: `Tìm kiếm tin tức bất động sản, dự án và xu hướng thị trường tại ERA Vietnam.${categorySlug ? ` Danh mục: ${categorySlug}.` : ""}`,
    openGraph: {
      title,
      type: "website",
    },
  };
}

export default async function NewsSearchRoute({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; categorySlug?: string }>;
}) {
  const { search = "", categorySlug = "" } = await searchParams;
  const query = search.trim();
  const categorySlugTrim = categorySlug.trim();

  if (!query) {
    notFound();
  }

  let articles: NewsArticle[] = [];
  try {
    const filters: { search: string; limit: number; categorySlug?: string } = {
      search: query,
      limit: 999,
    };
    if (categorySlugTrim) {
      filters.categorySlug = categorySlugTrim;
    }
    const data = await newsApi.getPublishedArticles(filters);
    articles = data.items;
  } catch {
    articles = [];
  }

  let category: NewsCategory | undefined;
  if (categorySlugTrim) {
    try {
      const categories = await newsApi.getCategories();
      category = categories.find((c) => c.slug === categorySlugTrim);
    } catch {
      category = undefined;
    }
  }

  return (
    <NewsSearchPage
      search={query}
      articles={articles}
      categorySlug={categorySlugTrim}
      categoryName={category?.name}
    />
  );
}
