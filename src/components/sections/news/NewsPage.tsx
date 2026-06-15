import { NewsHeroSection } from "./NewsHeroSection";
import { NewsTabsSection } from "./NewsTabsSection";
import { NewsCategorySection } from "./NewsCategorySection";
import { NewsEMagazineSection } from "./NewsEMagazineSection";
import { newsApi } from "@/api/domains/news";
import type { NewsArticle, NewsCategory } from "@/types/api";

const SECTION_CONFIG: { slug: string; featuredPosition: "left" | "right" }[] = [
  { slug: "tin-thi-truong", featuredPosition: "left" },
  { slug: "tin-du-an", featuredPosition: "right" },
  { slug: "era-news", featuredPosition: "left" },
  { slug: "thong-cao-bao-chi", featuredPosition: "right" },
];

export async function NewsPage() {
  let categories: NewsCategory[] = [];
  let articles: NewsArticle[] = [];

  try {
    [categories, articles] = await Promise.all([
      newsApi.getCategories(),
      newsApi.getPublishedArticles(),
    ]);
  } catch {
    categories = [];
    articles = [];
  }

  const articlesByCategory = (categorySlug: string) =>
    articles
      .filter((a) => a.category.slug === categorySlug)
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt).getTime();
        return dateB - dateA;
      })
      .slice(0, 4);

  return (
    <main>
      <NewsHeroSection />
      <NewsTabsSection categories={categories} />
      {SECTION_CONFIG.map(({ slug, featuredPosition }, index) => {
        const category = categories.find((c) => c.slug === slug);
        const categoryArticles = articlesByCategory(slug);
        if (!category || categoryArticles.length === 0) return null;

        return (
          <section id={slug} key={slug}>
            <NewsCategorySection
              category={category}
              articles={categoryArticles}
              featuredPosition={categoryArticles.length === 1 ? "left" : featuredPosition}
              bg={index % 2 === 0 ? "gray" : "white"}
            />
          </section>
        );
      })}
      <section id="e-magazine">
        <NewsEMagazineSection bg="gray" />
      </section>
    </main>
  );
}
