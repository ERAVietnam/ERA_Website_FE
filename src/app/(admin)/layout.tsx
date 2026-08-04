import { AdminShell } from "@/components/layout/AdminShell";
import { AuthGuard } from "@/components/guards/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  );
}
