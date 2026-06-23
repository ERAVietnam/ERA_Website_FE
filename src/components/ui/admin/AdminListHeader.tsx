import { colors } from "@/lib/theme";

interface AdminListHeaderProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function AdminListHeader({ title, subtitle, children }: AdminListHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
