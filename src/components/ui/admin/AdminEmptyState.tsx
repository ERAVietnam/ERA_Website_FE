interface AdminEmptyStateProps {
  message: string;
  className?: string;
}

export function AdminEmptyState({ message, className = "py-12" }: AdminEmptyStateProps) {
  return (
    <div className={`text-center text-gray-400 ${className}`}>
      {message}
    </div>
  );
}
