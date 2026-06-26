import { newsApi } from "@/api/domains/news";
import type { NewsArticle } from "@/types/api";
import { NewsSectionClient } from "./NewsSectionClient";

export async function NewsSection() {
  let articles: NewsArticle[] = [];
  try {
    articles = await newsApi.getPublishedArticles({ limit: 6 });
  } catch {
    return null;
  }

  return <NewsSectionClient articles={articles} />;
}
