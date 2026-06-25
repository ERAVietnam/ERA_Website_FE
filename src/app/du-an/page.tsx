import { ProjectsPageClient } from "@/components/sections/projects/ProjectsPageClient";
import { projectsApi } from "@/api/domains/projects";

const LIMIT = 12;

interface ProjectsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { search: rawSearch } = await searchParams;
  const search = rawSearch?.trim() ?? "";
  let initialProjects: Awaited<ReturnType<typeof projectsApi.getPublishedProjects>> | null = null;

  try {
    initialProjects = await projectsApi.getPublishedProjects({
      search: search || undefined,
      page: 1,
      limit: LIMIT,
    });
  } catch {
    initialProjects = { items: [], meta: { total: 0, page: 1, limit: LIMIT, totalPages: 1 } };
  }

  return (
    <ProjectsPageClient
      initialProjects={initialProjects.items}
      initialMeta={initialProjects.meta}
      initialSearch={search}
    />
  );
}
