import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthorProfilePage } from "@/components/sections/author/AuthorProfilePage";
import { authorsApi } from "@/api/domains/authors";
import type { AuthorPublicArticle, PaginatedResponse } from "@/types/api";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd, profilePageJsonLd } from "@/lib/jsonLd";

export const revalidate = 3600;

const SITE_URL = "https://era.com.vn";
const ARTICLES_PAGE_LIMIT = 6;

interface Props {
  params: Promise<{ slug: string }>;
}

const EMPTY_ARTICLES: PaginatedResponse<AuthorPublicArticle> = {
  items: [],
  meta: { page: 1, limit: ARTICLES_PAGE_LIMIT, total: 0, totalPages: 0 },
};

export async function generateStaticParams() {
  try {
    const authors = await authorsApi.getPublicList();
    return authors.map((author) => ({ slug: author.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const author = await authorsApi.getPublicBySlug(slug);

    const title = `${author.fullName}${author.jobTitle ? ` — ${author.jobTitle} tại ERA Vietnam` : ""} | Hồ sơ chuyên gia BĐS`;
    const description =
      `${author.fullName}${author.jobTitle ? `, ${author.jobTitle}` : ""} — ${author.bio.slice(0, 140)}...`;
    const imageUrl = author.avatar || undefined;

    return {
      title,
      description,
      robots: {
        index: author.isIndexed === true,
      },
      alternates: {
        canonical: `${SITE_URL}/tac-gia/${slug}/`,
      },
      openGraph: {
        title,
        description,
        images: imageUrl ? [{ url: imageUrl }] : undefined,
        type: "profile",
      },
      twitter: {
        card: "summary",
        title,
        description,
        images: imageUrl ? [imageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: "Không tìm thấy tác giả | ERA Vietnam",
    };
  }
}

export default async function AuthorDetailPage({ params }: Props) {
  const { slug } = await params;

  let author;
  try {
    author = await authorsApi.getPublicBySlug(slug);
  } catch {
    redirect("/");
  }

  const [written, reviewed] = await Promise.all([
    authorsApi
      .getPublicArticles(slug, { type: "written", page: 1, limit: ARTICLES_PAGE_LIMIT })
      .catch(() => EMPTY_ARTICLES),
    authorsApi
      .getPublicArticles(slug, { type: "reviewed", page: 1, limit: ARTICLES_PAGE_LIMIT })
      .catch(() => EMPTY_ARTICLES),
  ]);

  const breadcrumbItems = [
    { name: "Trang chủ", url: `${SITE_URL}/` },
    { name: "Tác giả", url: `${SITE_URL}/tac-gia/${slug}/` },
    { name: author.fullName, url: `${SITE_URL}/tac-gia/${slug}/` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={profilePageJsonLd(author)} />
      <AuthorProfilePage author={author} written={written} reviewed={reviewed} />
    </>
  );
}
