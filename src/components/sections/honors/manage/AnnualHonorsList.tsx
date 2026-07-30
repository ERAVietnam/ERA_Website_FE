import { HonorsList } from "@/components/sections/honors/manage/HonorsList";
import type { AnnualHonorList, PaginationMeta } from "@/types/api";

interface AnnualHonorsListProps {
  items: AnnualHonorList[];
  loading: boolean;
  meta: PaginationMeta;
  canManage: boolean;
  deletingId: string | null;
  onEdit: (item: AnnualHonorList) => void;
  onDelete: (item: AnnualHonorList) => void;
  onPageChange: (page: number) => void;
}

function countAgents(item: AnnualHonorList) {
  return item.categories.reduce(
    (total, category) => total + category.agents.length,
    0,
  );
}

export function AnnualHonorsList(props: AnnualHonorsListProps) {
  return (
    <HonorsList
      {...props}
      title="Danh sách vinh danh thường niên"
      subtitleNoun="list vinh danh thường niên"
      emptyMessage='Chưa có list vinh danh thường niên nào. Hãy bấm "Tạo list năm mới" để thêm.'
      periodColumnLabel="Năm"
      getPeriodLabel={(item) => String(item.year)}
      getMobilePeriodLabel={(item) => `Năm ${item.year}`}
      getTitleFallback={(item) => `ERA Awards ${item.year}`}
      getAgentCount={countAgents}
    />
  );
}
