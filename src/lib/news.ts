export const NEWS_PLACEHOLDER = "/news/news_placeholder.webp";

export function getFirstImageFromContent(content: string): string | null {
  const match = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? null;
}

export const NEWS_FAQ_MAX_ITEMS = 5;

function hasRichTextContent(value: string) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .trim().length > 0;
}

export function validateNewsFaqs(faqs: { question: string; answer: string }[]): string | null {
  if (faqs.length > NEWS_FAQ_MAX_ITEMS) {
    return `Bài viết chỉ được có tối đa ${NEWS_FAQ_MAX_ITEMS} câu hỏi thường gặp.`;
  }
  if (faqs.some((faq) => !faq.question.trim() || !hasRichTextContent(faq.answer))) {
    return 'Vui lòng nhập đầy đủ câu hỏi và câu trả lờ.';
  }
  return null;
}

interface ArticleWithFeaturedImage {
  featuredImage?: { url?: string } | null;
  content: string;
}

export function getArticleImage(article: ArticleWithFeaturedImage): string | null {
  return article.featuredImage?.url || getFirstImageFromContent(article.content);
}
