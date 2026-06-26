import type { MetadataRoute } from "next";
import { projectsApi } from "@/api/domains/projects";
import { newsApi } from "@/api/domains/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://era.com.vn";

  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/lien-he/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/ve-chung-toi/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/ve-chung-toi/compass/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/ve-chung-toi/apac/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/ve-chung-toi/era-real-estate/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/ve-chung-toi/ve-era-viet-nam/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tin-tuc/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/du-an/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/gia-nhap/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/academy/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tuyen-dung/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tuyen-dung/chi-tiet-cong-viec/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/chinh-sach-bao-mat/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/dieu-khoan-su-dung/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const data = await projectsApi.getPublishedProjects({ limit: 100 });
    const projectRoutes: MetadataRoute.Sitemap = data.items
      .filter((project) => project.isIndexed === true)
      .map((project) => ({
        url: `${baseUrl}/du-an/${project.slug}/`,
        lastModified: new Date(project.updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    routes.push(...projectRoutes);
  } catch {
    // Ignore project sitemap errors
  }

  try {
    const articles = await newsApi.getPublishedArticles({ limit: 100 });
    const articleRoutes: MetadataRoute.Sitemap = articles
      .filter((article) => article.isIndexed === true)
      .map((article) => ({
        url: `${baseUrl}/tin-tuc/${article.slug}/`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    routes.push(...articleRoutes);
  } catch {
    // Ignore article sitemap errors
  }

  return routes;
}
