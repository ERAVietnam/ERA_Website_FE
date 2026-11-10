"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, FileBarChart, Loader2, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { brandHealthApi } from "@/api/domains/brand-health";
import { API_CONFIG } from "@/api/config";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { AdminFilters } from "@/components/ui/admin/AdminFilters";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { SelectField } from "@/components/ui/admin/SelectField";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { Pagination } from "@/components/ui/Pagination";
import type { BrandHealthReport } from "@/types/api";

const PAGE_SIZE = 10;

const typeLabels: Record<string, string> = {
  daily: "Hằng ngày",
  weekly: "Hằng tuần",
  monthly: "Hằng tháng",
  special: "Đặc biệt",
};

const typeOptions = [
  { value: "", label: "Tất cả loại báo cáo" },
  { value: "daily", label: "Hằng ngày" },
  { value: "weekly", label: "Hằng tuần" },
  { value: "monthly", label: "Hằng tháng" },
  { value: "special", label: "Đặc biệt" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

export default function BrandHealthPage() {
  const { hasPermission } = useAuth();
  const canView = hasPermission("brand-health.view");
  const [reports, setReports] = useState<BrandHealthReport[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<BrandHealthReport | null>(null);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingHtml, setLoadingHtml] = useState(false);
  const [error, setError] = useState("");

  const openReport = useCallback(async (report: BrandHealthReport) => {
    setSelected(report);
    setHtml("");
    setLoadingHtml(true);
    setError("");
    try {
      const content = await brandHealthApi.html(report.reportNo);
      const baseUrl = `${API_CONFIG.BASE_URL}/brand-health/bao-cao/${report.reportNo}/page/`;
      setHtml(content.replace(/<head>/i, `<head><base href="${baseUrl}">`));
    } catch {
      setError("Không thể tải nội dung báo cáo.");
    } finally {
      setLoadingHtml(false);
    }
  }, []);

  useEffect(() => {
    if (!canView) return;
    brandHealthApi.list()
      .then((items) => {
        setReports(items);
        if (items[0]) void openReport(items[0]);
      })
      .catch(() => setError("Không thể tải danh sách báo cáo."))
      .finally(() => setLoading(false));
  }, [canView, openReport]);

  const filteredReports = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return reports.filter((report) => {
      const matchesType = !typeFilter || report.type === typeFilter;
      const matchesSearch = !keyword || [
        report.reportNo,
        report.headline ?? "",
        report.date,
        formatDate(report.date),
      ].some((value) => value.toLowerCase().includes(keyword));
      return matchesType && matchesSearch;
    });
  }, [reports, search, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const pagedReports = filteredReports.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
        <AdminListHeader
          title="Danh sách báo cáo Brand Health"
          count={{ format: "progress", shown: pagedReports.length, total: filteredReports.length, noun: "báo cáo" }}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500"><FileBarChart size={18} /> Báo cáo nội bộ</div>
        </AdminListHeader>

        {error && !selected && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <AdminFilters>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <SearchInput value={search} onChange={(value) => { setSearch(value); setPage(1); }} placeholder="Tìm theo mã, ngày hoặc tiêu đề..." className="w-full md:max-w-md" />
            <SelectField
              value={typeFilter}
              onChange={(value) => { setTypeFilter(value); setPage(1); }}
              options={typeOptions.slice(1)}
              placeholder="Tất cả loại báo cáo"
              className="w-full md:min-w-[190px]"
            />
            {(search || typeFilter) && <button type="button" onClick={() => { setSearch(""); setTypeFilter(""); setPage(1); }} className="text-sm text-gray-500 hover:text-gray-900">Xóa bộ lọc</button>}
          </div>
        </AdminFilters>

        {loading ? <AdminLoading /> : (
          <AdminTable>
            <thead><tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Báo cáo</th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Ngày</th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Loại</th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Đề cập mới</th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Cảnh báo</th>
              <th className="px-5 py-3.5 text-right font-semibold text-gray-600">Thao tác</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {pagedReports.map((report) => <tr key={`${report.reportNo}-${report.version}`} className="cursor-pointer transition-colors hover:bg-gray-50/40" onClick={() => void openReport(report)}>
                <td className="max-w-md px-5 py-4"><button type="button" className="font-semibold text-blue-700 hover:underline">#{report.reportNo}</button>{report.headline && <p className="mt-1 truncate text-gray-500">{report.headline}</p>}</td>
                <td className="whitespace-nowrap px-5 py-4 text-gray-600">{formatDate(report.date)}</td>
                <td className="px-5 py-4 text-gray-600">{typeLabels[report.type] ?? report.type}</td>
                <td className="px-5 py-4 font-medium">{report.mentionsNew.toLocaleString("vi-VN")}</td>
                <td className="px-5 py-4"><span className="text-red-600">{report.alertsRed}</span><span className="mx-1 text-gray-400">/</span><span className="text-amber-600">{report.alertsYellow}</span></td>
                <td className="px-5 py-4 text-right" onClick={(event) => event.stopPropagation()}><button type="button" className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-gray-700 hover:bg-gray-50" onClick={() => void downloadPdf(report)}><Download size={15} /> PDF</button></td>
              </tr>)}
              {pagedReports.length === 0 && <tr><td colSpan={6}><AdminEmptyState message="Không tìm thấy báo cáo phù hợp." /></td></tr>}
            </tbody>
          </AdminTable>
        )}

        <Pagination currentPage={Math.min(page, totalPages)} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 md:p-8"><div className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b px-4 py-3"><div><h2 className="font-semibold">Báo cáo #{selected.reportNo}</h2><p className="text-xs text-gray-500">{formatDate(selected.date)}</p></div><button className="rounded-lg p-2 hover:bg-gray-100" onClick={() => setSelected(null)} aria-label="Đóng"><X size={20} /></button></div>{loadingHtml ? <div className="flex flex-1 items-center justify-center"><Loader2 className="animate-spin text-gray-500" /></div> : error ? <div className="p-6 text-red-700">{error}</div> : <iframe title={`Báo cáo ${selected.reportNo}`} srcDoc={html} sandbox="allow-same-origin" className="min-h-0 flex-1 border-0 bg-white" />}</div></div>}
    </div>
  );
}
