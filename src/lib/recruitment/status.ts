import type { JobStatus } from "@/types/api";

export const recruitmentStatusConfig: Record<JobStatus, { label: string; color: string; bg: string }> = {
  draft: { label: "Bản nháp", color: "#6B7280", bg: "#F3F4F6" },
  open: { label: "Đang tuyển", color: "#059669", bg: "#D1FAE5" },
  closed: { label: "Đã đóng", color: "#DC2626", bg: "#FEE2E2" },
};
