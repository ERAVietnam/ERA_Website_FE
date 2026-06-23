import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsSearchPage } from "@/components/sections/news/NewsSearchPage";
import { newsApi } from "@/api/domains/news";

export const revalidate = 300;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}): Promise<Metadata> {
  const { search = "" } = await searchParams;
  const title = search
    ? `Kết quả tìm kiếm "${search}" | Tin tức ERA Vietnam`
    : "Tìm kiếm tin tức | ERA Vietnam";

  return {
    title,
    description: `Tìm kiếm tin tức bất động sản, dự án và xu hướng thị trường tại ERA Vietnam.`,
    openGraph: {
      title,
      type: "website",
    },
  };
}

export default async function NewsSearchRoute({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;
  const query = search.trim();

  if (!query) {
    notFound();
  }

  let articles: Awaited<ReturnType<typeof newsApi.getPublishedArticles>> = [];
  try {
    articles = await newsApi.getPublishedArticles({ search: query, limit: 999 });
  } catch {
    articles = [];
  }

  return <NewsSearchPage search={query} articles={articles} />;
}
