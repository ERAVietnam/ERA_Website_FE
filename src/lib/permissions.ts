export const CATEGORY_SLUG_TO_SCOPE: Record<string, string> = {
  "tin-thi-truong": "market",
  "tin-du-an": "project",
  "era-news": "era",
  "thong-cao-bao-chi": "press",
};

export const NEWS_SCOPES = ["market", "project", "era", "press"];

export function getNewsScopeBySlug(slug: string): string | null {
  return CATEGORY_SLUG_TO_SCOPE[slug] ?? null;
}

export function hasNewsArticlePermission(
  hasPermission: (p: string) => boolean,
  action: string,
  scope: string | null,
) {
  if (hasPermission(`news.articles.all.${action}`)) return true;
  if (scope && hasPermission(`news.articles.${scope}.${action}`)) return true;
  return false;
}

export function hasAnyNewsArticleCreatePermission(
  hasPermission: (p: string) => boolean,
) {
  if (hasPermission("news.articles.all.create")) return true;
  return NEWS_SCOPES.some((scope) =>
    hasPermission(`news.articles.${scope}.create`),
  );
}
