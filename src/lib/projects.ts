import { getFirstImageFromContent } from "./news";
import { colors } from "@/lib/theme";
import type { Project, ProjectFaqInput, ProjectPublicationStatus } from "@/types/api";

/** Status config for projects (labels + colors) — intentionally different from news/magazine. */
export const projectStatusConfig: Record<ProjectPublicationStatus, { label: string; color: string; bg: string }> = {
  draft: { label: "Bản nháp", color: colors.gray[600], bg: colors.gray[100] },
  pending: { label: "Chờ duyệt", color: colors.tertiary.orange.dark || "#B45309", bg: "#FEF3C7" },
  published: { label: "Đã đăng", color: "#16A34A", bg: "#F0FDF4" },
};

export const PROJECT_FAQ_MIN_ITEMS = 2;
export const PROJECT_FAQ_MAX_ITEMS = 5;

export const VIETNAM_PROVINCES: readonly string[] = [
  "Thành phố Hà Nội",
  "Thành phố Hải Phòng",
  "Thành phố Huế",
  "Thành phố Đà Nẵng",
  "Thành phố Hồ Chí Minh",
  "Thành phố Cần Thơ",
  "Tỉnh An Giang",
  "Tỉnh Bắc Ninh",
  "Tỉnh Cà Mau",
  "Tỉnh Cao Bằng",
  "Tỉnh Đắk Lắk",
  "Tỉnh Điện Biên",
  "Tỉnh Đồng Nai",
  "Tỉnh Đồng Tháp",
  "Tỉnh Gia Lai",
  "Tỉnh Hà Tĩnh",
  "Tỉnh Hưng Yên",
  "Tỉnh Khánh Hòa",
  "Tỉnh Lai Châu",
  "Tỉnh Lâm Đồng",
  "Tỉnh Lạng Sơn",
  "Tỉnh Lào Cai",
  "Tỉnh Nghệ An",
  "Tỉnh Ninh Bình",
  "Tỉnh Phú Thọ",
  "Tỉnh Quảng Ngãi",
  "Tỉnh Quảng Ninh",
  "Tỉnh Quảng Trị",
  "Tỉnh Sơn La",
  "Tỉnh Tây Ninh",
  "Tỉnh Thái Nguyên",
  "Tỉnh Thanh Hóa",
  "Tỉnh Tuyên Quang",
  "Tỉnh Vĩnh Long",
];

function hasRichTextContent(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .trim().length > 0;
}

export function validateProjectFaqs(faqs: ProjectFaqInput[]): string | null {
  if (faqs.length < PROJECT_FAQ_MIN_ITEMS || faqs.length > PROJECT_FAQ_MAX_ITEMS) {
    return `Dự án phải có từ ${PROJECT_FAQ_MIN_ITEMS} đến ${PROJECT_FAQ_MAX_ITEMS} câu hỏi thường gặp.`;
  }
  if (
    faqs.some(
      (faq) => !faq.question.trim() || !hasRichTextContent(faq.answer),
    )
  ) {
    return "Vui lòng nhập đầy đủ câu hỏi và câu trả lời.";
  }
  return null;
}

/** Allowed tags for projects (used in filter + form multi-select) */
export const PROJECT_TAGS = [
  "căn hộ",
  "nhà phố",
  "biệt thự",
  "đất nền",
  "shophouse",
  "dự án mới",
  "nhận booking",
  "đang mở bán",
  "đã bàn giao",
  "sắp mở bán",
] as const;

export function getProjectImage(project: Project): string | null {
  return project.imageMedia?.url || null;
}

export function getProjectCardImage(project: Project): string | null {
  return project.imageMedia?.url || getFirstImageFromContent(project.content || "") || null;
}
