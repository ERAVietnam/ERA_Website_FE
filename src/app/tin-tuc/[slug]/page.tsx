import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsDetailPage } from "@/components/sections/news";
import { newsApi } from "@/api/domains/news";
import type { NewsArticle } from "@/types/api";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const articles = await newsApi.getPublishedArticles();
    return articles.map((article: NewsArticle) => ({
      slug: article.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    console.log(`[news:metadata] slug=${slug}`);
    const article = await newsApi.getArticleBySlug(slug);

    const title = article.metaTitle?.trim() || article.title?.trim() || "ERA Vietnam";
    const description = article.metaDescription?.trim() || article.summary?.trim() || undefined;
    const imageUrl = article.featuredImage?.url || undefined;
    const siteUrl = "https://era.com.vn";
    const currentUrl = `${siteUrl}/tin-tuc/${slug}/`;
    const canonicalUrl = article.canonicalUrl?.trim() || null;

    return {
      title,
      description,
      robots: {
        index: article.isIndexed === true,
      },
      alternates: {
        canonical: canonicalUrl,
      },
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
  } catch (error) {
    console.error(`[news:metadata] error for slug=${params}`, error);
    return {
      title: "Không tìm thấy bài viết | ERA Vietnam",
    };
  }
}

function isArticleVisible(article: NewsArticle): boolean {
  const now = new Date();
  if (article.displayPublishedAt) {
    return new Date(article.displayPublishedAt) <= now;
  }
  if (article.publishedAt) {
    return new Date(article.publishedAt) <= now;
  }
  return true;
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  console.log(`[news:detail] slug=${slug}`);

  let article: NewsArticle | null = null;
  try {
    article = await newsApi.getArticleBySlug(slug);
    console.log(`[news:detail] found article id=${article?.id ?? 'null'}, status=${(article as NewsArticle & { status?: string })?.status ?? 'unknown'}`);
  } catch (error) {
    console.error(`[news:detail] error fetching slug=${slug}`, error);
    article = null;
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bài viết</h1>
          <p className="text-gray-600">Bài viết bạn tìm không tồn tại hoặc chưa được xuất bản.</p>
        </div>
      </main>
    );
  }

  if (!isArticleVisible(article)) {
    notFound();
  }

  let relatedArticles: NewsArticle[] = [];
  try {
    relatedArticles = await newsApi
      .getPublishedArticles({
        categorySlug: article.category.slug,
        excludeId: article.id,
        limit: 3,
      })
      .catch(() => [] as NewsArticle[]);
  } catch {
    relatedArticles = [];
  }

  const filteredRelated = relatedArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return <NewsDetailPage article={article} relatedArticles={filteredRelated} />;
}
