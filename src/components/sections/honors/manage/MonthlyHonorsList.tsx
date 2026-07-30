import { HonorsList } from "@/components/sections/honors/manage/HonorsList";
import type { MonthlyHonorList, PaginationMeta } from "@/types/api";

interface MonthlyHonorsListProps {
  items: MonthlyHonorList[];
  loading: boolean;
  meta: PaginationMeta;
  canManage: boolean;
  deletingId: string | null;
  onEdit: (item: MonthlyHonorList) => void;
  onDelete: (item: MonthlyHonorList) => void;
  onPageChange: (page: number) => void;
}

function formatPeriod(item: MonthlyHonorList) {
  return `Tháng ${String(item.month).padStart(2, "0")}/${item.year}`;
}

export function MonthlyHonorsList(props: MonthlyHonorsListProps) {
  return (
    <HonorsList
      {...props}
      title="Danh sách vinh danh tháng"
      subtitleNoun="list vinh danh tháng"
      emptyMessage='Chưa có list vinh danh tháng nào. Hãy bấm "Tạo list vinh danh mới" để thêm.'
      periodColumnLabel="Thời gian"
      getPeriodLabel={formatPeriod}
      getMobilePeriodLabel={formatPeriod}
      getTitleFallback={(item) => `Vinh danh tháng ${String(item.month).padStart(2, "0")}/${item.year}`}
      getAgentCount={(item) => item.agents.length}
    />
  );
}
