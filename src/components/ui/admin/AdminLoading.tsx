import { Loader2 } from "lucide-react";

export function AdminLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 size={32} className="animate-spin text-gray-400" />
    </div>
  );
}
