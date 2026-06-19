import { cache } from "react";
import { newsApi } from "@/api/domains/news";
import type { NewsArticle, NewsCategory } from "@/types/api";

export const getCategoryPageData = cache(async (categorySlug: string) => {
  try {
    const [categories, articles] = await Promise.all([
      newsApi.getCategories(),
      newsApi.getPublishedArticles({ categorySlug }),
    ]);

    const category = categories.find(
      (c: NewsCategory) => c.slug === categorySlug && c.isActive
    );

    if (!category) {
      return null;
    }

    const sortedArticles = articles
      .filter((article: NewsArticle) => article.category.slug === categorySlug)
      .sort((a: NewsArticle, b: NewsArticle) => {
        const dateA = new Date(a.displayPublishedAt || a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.displayPublishedAt || b.publishedAt || b.createdAt).getTime();
        return dateB - dateA;
      });

    return { category, articles: sortedArticles };
  } catch {
    return null;
  }
});
