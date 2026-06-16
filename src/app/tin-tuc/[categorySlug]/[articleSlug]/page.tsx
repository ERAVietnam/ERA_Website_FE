import type { Metadata } from "next";
import { NewsDetailPage } from "@/components/sections/news";
import { newsApi } from "@/api/domains/news";
import type { NewsArticle } from "@/types/api";

interface Props {
  params: Promise<{ categorySlug: string; articleSlug: string }>;
}

export async function generateStaticParams() {
  try {
    const articles = await newsApi.getPublishedArticles();
    return articles.map((article: NewsArticle) => ({
      categorySlug: article.category.slug,
      articleSlug: article.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { categorySlug, articleSlug } = await params;
    const article = await newsApi.getArticleBySlug(categorySlug, articleSlug);

    const title = article.metaTitle?.trim() || article.title?.trim() || "ERA Vietnam";
    const description = article.metaDescription?.trim() || article.summary?.trim() || undefined;
    const imageUrl = article.featuredImage?.url || undefined;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: imageUrl ? [{ url: imageUrl }] : undefined,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: "Không tìm thấy bài viết | ERA Vietnam",
    };
  }
}

export default async function NewsDetail({ params }: Props) {
  const { categorySlug, articleSlug } = await params;

  try {
    const article = await newsApi.getArticleBySlug(categorySlug, articleSlug);
    return <NewsDetailPage article={article} />;
  } catch {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bài viết</h1>
          <p className="text-gray-600">Bài viết bạn tìm không tồn tại hoặc chưa được xuất bản.</p>
        </div>
      </main>
    );
  }
}
