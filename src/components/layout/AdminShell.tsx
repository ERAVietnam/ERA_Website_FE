"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
      />
      <main
        className={`flex-1 ml-0 min-w-0 transition-[margin] duration-200 ${
          collapsed ? "md:ml-14" : "md:ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
