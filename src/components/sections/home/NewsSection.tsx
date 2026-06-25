import { newsApi } from "@/api/domains/news";
import { NewsSectionClient } from "./NewsSectionClient";

export async function NewsSection() {
  try {
    const articles = await newsApi.getPublishedArticles({ limit: 6 });
    return <NewsSectionClient articles={articles} />;
  } catch {
    return null;
  }
}
