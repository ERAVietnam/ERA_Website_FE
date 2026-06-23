interface AdminFiltersProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AdminFilters({ children, footer }: AdminFiltersProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {children}
      {footer && (
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          {footer}
        </div>
      )}
    </div>
  );
}
