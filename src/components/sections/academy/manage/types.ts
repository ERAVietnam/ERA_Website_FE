import type { AcademyCourse } from "@/types/api";

export const DEFAULT_LIMIT = 10;

export interface CourseFormState {
  title: string;
  description: string;
  registrationUrl: string;
  openingDate: string;
  isActive: boolean;
  imageMediaId: string | null;
  imageUrl: string;
  tagIds: string[];
}

export function toDateInputValue(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export function courseToFormState(course?: AcademyCourse | null): CourseFormState {
  return {
    title: course?.title ?? "",
    description: course?.description ?? "",
    registrationUrl: course?.registrationUrl ?? "",
    openingDate: toDateInputValue(course?.openingDate),
    isActive: course?.isActive ?? true,
    imageMediaId: course?.imageMediaId ?? null,
    imageUrl: course?.imageMedia?.url ?? "",
    tagIds: course?.tags?.map((tag) => tag.id) ?? [],
  };
}

export function stripHtml(html: string) {
  if (typeof window === "undefined") return html;
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
