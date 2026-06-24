import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsDetailPage } from "@/components/sections/projects";
import { projectsApi } from "@/api/domains/projects";
import type { Project } from "@/types/api";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const data = await projectsApi.getPublishedProjects({ limit: 100 });
    return data.items.map((project: Project) => ({
      slug: project.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const project = await projectsApi.getProjectBySlug(slug);

    const title = project.name?.trim() || "ERA Vietnam";
    const description = project.content
      ? project.content.replace(/<[^>]+>/g, "").slice(0, 160)
      : undefined;
    const imageUrl = project.imageMedia?.url || undefined;
    const siteUrl = "https://era.com.vn";
    const currentUrl = `${siteUrl}/du-an/${slug}/`;
    const canonicalUrl = project.canonicalUrl?.trim() || null;

    return {
      title: `${title} | ERA Vietnam`,
      description,
      robots: {
        index: project.isIndexed === true,
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
  } catch {
    return {
      title: "Không tìm thấy dự án | ERA Vietnam",
    };
  }
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;

  try {
    const project = await projectsApi.getProjectBySlug(slug);

    const relatedData = await projectsApi
      .getPublishedProjects({
        type: project.type,
        limit: 4,
      })
      .catch(() => ({ items: [] as Project[], meta: { total: 0, page: 1, limit: 4, totalPages: 1 } }));

    const relatedProjects = relatedData.items.filter((p) => p.id !== project.id).slice(0, 3);

    return <ProjectsDetailPage project={project} relatedProjects={relatedProjects} />;
  } catch {
    notFound();
  }
}
