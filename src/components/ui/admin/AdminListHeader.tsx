import { colors } from "@/lib/theme";

type AdminListHeaderCount =
  | { format?: "progress"; shown: number; total: number; noun: string }
  | { format: "total"; total: number; noun: string };

interface AdminListHeaderProps {
  title: string;
  /** Chuỗi subtitle tự do — ưu tiên cao nhất, giữ để tương thích ngược. */
  subtitle?: string;
  /** Tự sinh subtitle đếm số lượng khi không truyền `subtitle`. */
  count?: AdminListHeaderCount;
  children?: React.ReactNode;
}

function buildCountSubtitle(count: AdminListHeaderCount): string {
  if (count.format === "total") {
    return `Tổng cộng ${count.total} ${count.noun}`;
  }
  return count.total > 0
    ? `Hiển thị ${count.shown} / ${count.total} ${count.noun}`
    : `Không có ${count.noun} nào`;
}

export function AdminListHeader({ title, subtitle, count, children }: AdminListHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {subtitle ?? (count ? buildCountSubtitle(count) : null)}
        </p>
      </div>
      {children}
    </div>
  );
}
