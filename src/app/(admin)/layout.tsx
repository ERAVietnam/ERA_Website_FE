import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AuthGuard } from "@/components/guards/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <main className="flex-1 ml-0 md:ml-64 min-w-0">{children}</main>
      </div>
    </AuthGuard>
  );
}
