import { getFirstImageFromContent } from "./news";
import type { Project } from "@/types/api";

export function getProjectImage(project: Project): string | null {
  return project.imageMedia?.url || null;
}

export function getProjectCardImage(project: Project): string | null {
  return project.imageMedia?.url || getFirstImageFromContent(project.content || "") || null;
}
