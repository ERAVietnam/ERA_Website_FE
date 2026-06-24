import { ProjectsPageClient } from "@/components/sections/projects/ProjectsPageClient";
import { projectsApi } from "@/api/domains/projects";

const LIMIT = 12;

export default async function ProjectsPage() {
  let initialProjects: Awaited<ReturnType<typeof projectsApi.getPublishedProjects>> | null = null;

  try {
    initialProjects = await projectsApi.getPublishedProjects({
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
    />
  );
}
