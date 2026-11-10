"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, FileBarChart, Loader2, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { brandHealthApi } from "@/api/domains/brand-health";
import { API_CONFIG } from "@/api/config";
import type { BrandHealthReport } from "@/types/api";

const typeLabels: Record<string, string> = {
  daily: "Hằng ngày",
  weekly: "Hằng tuần",
  monthly: "Hằng tháng",
  special: "Đặc biệt",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

export default function BrandHealthPage() {
  const { hasPermission } = useAuth();
  const [reports, setReports] = useState<BrandHealthReport[]>([]);
  const [selected, setSelected] = useState<BrandHealthReport | null>(null);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingHtml, setLoadingHtml] = useState(false);
  const [error, setError] = useState("");

  const canView = hasPermission("brand-health.view");
  const latest = useMemo(() => reports[0], [reports]);

  useEffect(() => {
    if (!canView) {
      return;
    }
    brandHealthApi.list()
      .then(setReports)
      .catch(() => setError("Không thể tải danh sách báo cáo."))
      .finally(() => setLoading(false));
  }, [canView]);

  const openReport = async (report: BrandHealthReport) => {
    setSelected(report);
    setHtml("");
    setLoadingHtml(true);
    try {
      const content = await brandHealthApi.html(report.reportNo);
      const baseUrl = `${API_CONFIG.BASE_URL}/brand-health/bao-cao/${report.reportNo}/page/`;
      setHtml(content.replace(/<head>/i, `<head><base href="${baseUrl}">`));
    } catch {
      setError("Không thể tải nội dung báo cáo.");
    } finally {
      setLoadingHtml(false);
    }
  };

  const downloadPdf = async (report: BrandHealthReport) => {
    const blob = await brandHealthApi.pdf(report.date.slice(0, 10));
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `brand-health-${report.reportNo}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!canView) {
    return <div className="p-6"><div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">Bạn không có quyền xem báo cáo.</div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Báo cáo nội bộ</p>
            <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold text-gray-900"><FileBarChart size={26} /> Brand Health</h1>
          </div>
          {latest && <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">Mới nhất: #{latest.reportNo}</span>}
        </header>

        {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-500" /></div> : reports.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-12 text-center text-gray-500">Chưa có báo cáo nào.</div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-5 py-3">Báo cáo</th><th className="px-5 py-3">Ngày</th><th className="px-5 py-3">Loại</th><th className="px-5 py-3">Đề cập mới</th><th className="px-5 py-3">Cảnh báo</th><th className="px-5 py-3 text-right">Thao tác</th></tr></thead>
                <tbody className="divide-y">
                  {reports.map((report) => <tr key={`${report.reportNo}-${report.version}`} className="hover:bg-gray-50">
                    <td className="px-5 py-4"><button className="font-semibold text-blue-700 hover:underline" onClick={() => openReport(report)}>Báo cáo #{report.reportNo}</button>{report.headline && <p className="mt-1 max-w-md truncate text-gray-500">{report.headline}</p>}</td>
                    <td className="px-5 py-4 text-gray-600">{formatDate(report.date)}</td>
                    <td className="px-5 py-4 text-gray-600">{typeLabels[report.type] ?? report.type}</td>
                    <td className="px-5 py-4 font-medium">{report.mentionsNew.toLocaleString("vi-VN")}</td>
                    <td className="px-5 py-4"><span className="text-red-600">{report.alertsRed}</span><span className="mx-1 text-gray-400">/</span><span className="text-amber-600">{report.alertsYellow}</span></td>
                    <td className="px-5 py-4 text-right"><button className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-gray-700 hover:bg-gray-50" onClick={() => downloadPdf(report)}><Download size={15} /> PDF</button></td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 md:p-8"><div className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b px-4 py-3"><div><h2 className="font-semibold">Báo cáo #{selected.reportNo}</h2><p className="text-xs text-gray-500">{formatDate(selected.date)}</p></div><button className="rounded-lg p-2 hover:bg-gray-100" onClick={() => setSelected(null)} aria-label="Đóng"><X size={20} /></button></div>{loadingHtml ? <div className="flex flex-1 items-center justify-center"><Loader2 className="animate-spin text-gray-500" /></div> : <iframe title={`Báo cáo ${selected.reportNo}`} srcDoc={html} sandbox="allow-same-origin" className="min-h-0 flex-1 border-0 bg-white" />}</div></div>}
    </div>
  );
}
