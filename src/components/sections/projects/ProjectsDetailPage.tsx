import { colors } from "@/lib/theme";
import { ProjectsHeroSection } from "./ProjectsHeroSection";
import { ProjectsDetailContentSection } from "./ProjectsDetailContentSection";
import { ProjectsRelatedSection } from "./ProjectsRelatedSection";
import type { Project } from "@/types/api";

interface ProjectsDetailPageProps {
  project: Project;
  relatedProjects: Project[];
}

export function ProjectsDetailPage({ project, relatedProjects }: ProjectsDetailPageProps) {
  return (
    <main style={{ backgroundColor: colors.neutral.white }}>
      <ProjectsHeroSection />
      <ProjectsDetailContentSection project={project} />
      <ProjectsRelatedSection projects={relatedProjects} />
    </main>
  );
}
