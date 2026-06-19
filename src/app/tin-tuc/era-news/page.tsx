import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsCategoryPage } from "@/components/sections/news/NewsCategoryPage";
import { getCategoryPageData } from "@/lib/newsCategoryServer";

const CATEGORY_SLUG = "era-news";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCategoryPageData(CATEGORY_SLUG);

  if (!data) {
    return { title: "Không tìm thấy danh mục | ERA Vietnam" };
  }

  const { category } = data;
  const title = `${category.name} | Tin tức ERA Vietnam`;
  const description =
    category.metaDescription || `Tin tức ${category.name} mới nhất từ ERA Vietnam`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export const revalidate = 300;

export default async function EraNewsPage() {
  const data = await getCategoryPageData(CATEGORY_SLUG);

  if (!data) {
    notFound();
  }

  return <NewsCategoryPage category={data.category} articles={data.articles} />;
}
