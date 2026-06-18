import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsCategoryPage } from "@/components/sections/news/NewsCategoryPage";
import { newsApi } from "@/api/domains/news";
import type { NewsArticle, NewsCategory } from "@/types/api";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  try {
    const categories = await newsApi.getCategories();
    return categories
      .filter((category: NewsCategory) => category.isActive)
      .map((category: NewsCategory) => ({
        categorySlug: category.slug,
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { categorySlug } = await params;
    const categories = await newsApi.getCategories();
    const category = categories.find((c: NewsCategory) => c.slug === categorySlug);

    if (!category) {
      return { title: "Không tìm thấy danh mục | ERA Vietnam" };
    }

    const title = `${category.name} | Tin tức ERA Vietnam`;
    const description = category.metaDescription || `Tin tức ${category.name} mới nhất từ ERA Vietnam`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
    };
  } catch {
    return { title: "Không tìm thấy danh mục | ERA Vietnam" };
  }
}

export const revalidate = 300;

export default async function NewsCategoryDetail({ params }: Props) {
  const { categorySlug } = await params;

  try {
    const [categories, articles] = await Promise.all([
      newsApi.getCategories(),
      newsApi.getPublishedArticles({ categorySlug }),
    ]);

    const category = categories.find((c: NewsCategory) => c.slug === categorySlug && c.isActive);

    if (!category) {
      notFound();
    }

    const sortedArticles = articles
      .filter((article: NewsArticle) => article.category.slug === categorySlug)
      .sort((a: NewsArticle, b: NewsArticle) => {
        const dateA = new Date(a.publishedAt || a.createdAt).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt).getTime();
        return dateB - dateA;
      });

    return <NewsCategoryPage category={category} articles={sortedArticles} />;
  } catch {
    notFound();
  }
}
