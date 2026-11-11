import { newsApi } from "@/api/domains/news";
import type { NewsArticle } from "@/types/api";

export const revalidate = 3600;

const baseUrl = "https://era.com.vn";
const pageSize = 100;
const newsWindowMs = 48 * 60 * 60 * 1000;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function isRecentPublication(article: NewsArticle, now: number): boolean {
  if (!article.publishedAt) return false;

  const publishedAt = new Date(article.publishedAt).getTime();
  if (!Number.isFinite(publishedAt)) return false;

  return publishedAt <= now && now - publishedAt <= newsWindowMs;
}

async function fetchRecentArticles(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  const now = Date.now();
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const data = await newsApi.getPublishedArticles({ page, limit: pageSize });
    const recentArticles = data.items.filter(
      (article) => article.isIndexed === true && isRecentPublication(article, now),
    );

    articles.push(...recentArticles);
    hasMore = page < data.meta.totalPages;
    page += 1;
  }

  return articles;
}

function buildNewsSitemapXml(articles: NewsArticle[]): string {
  const urls = articles
    .map((article) => {
      const publishedAt = new Date(article.publishedAt as string).toISOString();
      const updatedAt = new Date(article.updatedAt).toISOString();

      return `
  <url>
    <loc>${escapeXml(`${baseUrl}/tin-tuc/${article.slug}/`)}</loc>
    <lastmod>${updatedAt}</lastmod>
    <news:news>
      <news:publication>
        <news:name>ERA Vietnam</news:name>
        <news:language>vi</news:language>
      </news:publication>
      <news:publication_date>${publishedAt}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls}
</urlset>`;
}

export async function GET(): Promise<Response> {
  try {
    const articles = await fetchRecentArticles();

    return new Response(buildNewsSitemapXml(articles), {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Failed to generate news sitemap", error);
    return new Response("Unable to generate news sitemap", { status: 503 });
  }
}
