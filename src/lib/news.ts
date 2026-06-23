export function getFirstImageFromContent(content: string): string | null {
  const match = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? null;
}

interface ArticleWithFeaturedImage {
  featuredImage?: { url?: string } | null;
  content: string;
}

export function getArticleImage(article: ArticleWithFeaturedImage): string | null {
  return article.featuredImage?.url || getFirstImageFromContent(article.content);
}
