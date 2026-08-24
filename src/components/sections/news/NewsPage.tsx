import { NewsHeroSection } from "./NewsHeroSection";
import { NewsTabsSection } from "./NewsTabsSection";
import { NewsCategorySection } from "./NewsCategorySection";
import { NewsEMagazineSection } from "./NewsEMagazineSection";
import { newsApi } from "@/api/domains/news";
import type { NewsArticle, NewsCategory } from "@/types/api";

const SECTION_CONFIG: { slug: string; featuredPosition: "left" | "right" }[] = [
  { slug: "tin-du-an", featuredPosition: "left" },
  { slug: "tin-thi-truong", featuredPosition: "right" },
  { slug: "era-news", featuredPosition: "left" },
  { slug: "thong-cao-bao-chi", featuredPosition: "right" },
];

export async function NewsPage() {
  let categories: NewsCategory[] = [];
  let articles: NewsArticle[] = [];

  try {
    const [categoriesData, articlesData] = await Promise.all([
      newsApi.getCategories(),
      newsApi.getPublishedArticles(),
    ]);
    categories = categoriesData;
    articles = articlesData.items;
  } catch {
    categories = [];
    articles = [];
  }

  const articlesByCategory = (categorySlug: string) =>
    articles
      .filter((a) => a.category.slug === categorySlug)
      .sort((a, b) => {
        // Bài tiêu điểm lên đầu (mỗi danh mục chỉ có 1)
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        // Các bài còn lại sắp xếp theo ngày đăng hiển thị gần nhất
        const dateA = new Date(a.displayPublishedAt || a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.displayPublishedAt || b.publishedAt || b.createdAt).getTime();
        return dateB - dateA;
      });

  const categoryTotalCount = (categorySlug: string) =>
    articles.filter((a) => a.category.slug === categorySlug).length;

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
              articles={categoryArticles.slice(0, 4)}
              totalCount={categoryTotalCount(slug)}
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
