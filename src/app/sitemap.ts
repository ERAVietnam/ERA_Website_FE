import type { MetadataRoute } from "next";
import { projectsApi } from "@/api/domains/projects";
import { newsApi } from "@/api/domains/news";
import { authorsApi } from "@/api/domains/authors";
import type { NewsArticle, Project } from "@/types/api";

export const revalidate = 3600;

const baseUrl = "https://era.com.vn";
const SITEMAP_LIMIT = 100;

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${baseUrl}/lien-he/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/ve-chung-toi/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/ve-chung-toi/compass/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/ve-chung-toi/apac/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/ve-chung-toi/era-real-estate/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/ve-chung-toi/ve-era-viet-nam/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/tin-tuc/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/tin-tuc/era-news/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${baseUrl}/tin-tuc/tin-thi-truong/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${baseUrl}/tin-tuc/tin-du-an/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${baseUrl}/tin-tuc/thong-cao-bao-chi/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${baseUrl}/tin-tuc/tap-chi/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${baseUrl}/du-an/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/gia-nhap/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/academy/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/tuyen-dung/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${baseUrl}/chinh-sach-bao-mat/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${baseUrl}/dieu-khoan-su-dung/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
];

async function fetchAllProjectRoutes(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const data = await projectsApi.getPublishedProjects({ page, limit: SITEMAP_LIMIT });
      const items = data.items.filter((project: Project) => project.isIndexed === true);

      routes.push(
        ...items.map((project: Project) => ({
          url: `${baseUrl}/du-an/${project.slug}/`,
          lastModified: new Date(project.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      );

      hasMore = page < data.meta.totalPages;
      page += 1;
    } catch {
      hasMore = false;
    }
  }

  return routes;
}

async function fetchAllArticleRoutes(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const data = await newsApi.getPublishedArticles({ page, limit: SITEMAP_LIMIT });
      const items = data.items.filter((article: NewsArticle) => article.isIndexed === true);

      routes.push(
        ...items.map((article: NewsArticle) => ({
          url: `${baseUrl}/tin-tuc/${article.slug}/`,
          lastModified: new Date(article.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      );

      hasMore = page < data.meta.totalPages;
      page += 1;
    } catch {
      hasMore = false;
    }
  }

  return routes;
}

async function fetchAllAuthorRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const authors = await authorsApi.getPublicList();
    return authors
      .filter((author) => author.isIndexed === true)
      .map((author) => ({
        url: `${baseUrl}/tac-gia/${author.slug}/`,
        lastModified: new Date(author.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectRoutes, articleRoutes, authorRoutes] = await Promise.all([
    fetchAllProjectRoutes(),
    fetchAllArticleRoutes(),
    fetchAllAuthorRoutes(),
  ]);

  return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...authorRoutes];
}
