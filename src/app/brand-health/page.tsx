"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, Loader2, Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { brandHealthApi } from "@/api/domains/brand-health";
import { API_CONFIG } from "@/api/config";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { SelectField } from "@/components/ui/admin/SelectField";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import type { BrandHealthReport } from "@/types/api";

const typeLabels: Record<string, string> = {
  daily: "Hằng ngày",
  weekly: "Hằng tuần",
  monthly: "Hằng tháng",
  special: "Đặc biệt",
};

const typeOptions = [
  { value: "daily", label: "Hằng ngày" },
  { value: "weekly", label: "Hằng tuần" },
  { value: "monthly", label: "Hằng tháng" },
  { value: "special", label: "Đặc biệt" },
];

const alertOptions = [
  { value: "red", label: "Có cảnh báo đỏ" },
  { value: "yellow", label: "Có cảnh báo vàng" },
  { value: "any", label: "Có cảnh báo đỏ hoặc vàng" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

function prepareReportHtml(content: string, baseUrl: string) {
  const withoutScripts = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  return withoutScripts.replace(/<head>/i, `<head><base href="${baseUrl}" target="_blank">`);
}

export default function BrandHealthPage() {
  const [reports, setReports] = useState<BrandHealthReport[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [alertFilter, setAlertFilter] = useState("");
  const [selected, setSelected] = useState<BrandHealthReport | null>(null);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingHtml, setLoadingHtml] = useState(false);
  const [error, setError] = useState("");
  const reportFrameRef = useRef<HTMLIFrameElement>(null);
  const [reportHeight, setReportHeight] = useState<number | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const openReport = useCallback(async (report: BrandHealthReport) => {
    setSelected(report);
    setHtml("");
    setIsMobileSidebarOpen(false);
    setLoadingHtml(true);
    setReportHeight(null);
    setError("");
    try {
      const content = await brandHealthApi.html(report.reportNo);
      const baseUrl = `${API_CONFIG.BASE_URL}/brand-health/bao-cao/${report.reportNo}/page/`;
      setHtml(prepareReportHtml(content, baseUrl));
    } catch {
      setError("Không thể tải nội dung báo cáo.");
    } finally {
      setLoadingHtml(false);
    }
  }, []);

  useEffect(() => {
    brandHealthApi.list()
      .then((items) => {
        setReports(items);
        if (items[0]) void openReport(items[0]);
      })
      .catch(() => setError("Không thể tải danh sách báo cáo."))
      .finally(() => setLoading(false));
  }, [openReport]);

  useEffect(() => {
    if (!isMobileSidebarOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [isMobileSidebarOpen]);

  const filteredReports = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesType = !typeFilter || report.type === typeFilter;
      const matchesAlert = !alertFilter
        || (alertFilter === "red" && report.alertsRed > 0)
        || (alertFilter === "yellow" && report.alertsYellow > 0)
        || (alertFilter === "any" && (report.alertsRed > 0 || report.alertsYellow > 0));
      const matchesSearch = !keyword || [
        report.reportNo,
        report.headline ?? "",
        report.date,
        formatDate(report.date),
      ].some((value) => value.toLowerCase().includes(keyword));
      return matchesType && matchesAlert && matchesSearch;
    });
  }, [reports, search, typeFilter, alertFilter]);

  const downloadPdf = async (report: BrandHealthReport) => {
    const blob = await brandHealthApi.pdf(report.reportNo);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `brand-health-${report.reportNo}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {error && !selected && (
          <div className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 md:mx-8">{error}</div>
        )}

        {loading ? <AdminLoading /> : (
          <>
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
              <span className="font-semibold text-gray-900">Báo cáo Brand Health</span>
              <button
                type="button"
                aria-label="Mở menu báo cáo"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              >
                <Menu size={21} />
              </button>
            </div>

            <div className={`grid min-h-[calc(100vh-4rem)] grid-cols-1 gap-0 ${isSidebarCollapsed ? "lg:grid-cols-[72px_minmax(0,1fr)]" : "lg:grid-cols-[300px_minmax(0,1fr)]"}`}>
              {isMobileSidebarOpen && (
                <button
                  type="button"
                  aria-label="Đóng menu báo cáo"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                />
              )}

            <aside className={`min-h-0 flex-col overflow-hidden border-b border-gray-200 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:border-b-0 lg:border-r ${isMobileSidebarOpen ? "fixed inset-y-0 left-0 z-50 flex w-[min(88vw,320px)]" : "hidden"}`}>
              <div className={`border-b border-gray-100 p-4 ${isSidebarCollapsed ? "lg:p-3" : ""}`}>
                <div className="flex items-center justify-between gap-2">
                  <h2 className={`font-semibold text-gray-900 ${isSidebarCollapsed ? "lg:hidden" : ""}`}>Báo cáo Brand Health</h2>
                  <div className="ml-auto flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Đóng menu báo cáo"
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                    >
                      <X size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label={isSidebarCollapsed ? "Mở rộng menu báo cáo" : "Thu gọn menu báo cáo"}
                      onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
                      className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:inline-flex"
                    >
                      {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                    </button>
                  </div>
                </div>
                <div className={`mt-3 space-y-2 ${isSidebarCollapsed ? "lg:hidden" : ""}`}>
                  <SearchInput value={search} onChange={setSearch} placeholder="Tìm mã hoặc ngày..." />
                  <SelectField
                    value={typeFilter}
                    onChange={setTypeFilter}
                    options={typeOptions}
                    placeholder="Tất cả loại báo cáo"
                    className="w-full"
                  />
                  <SelectField
                    value={alertFilter}
                    onChange={setAlertFilter}
                    options={alertOptions}
                    placeholder="Tất cả cảnh báo"
                    className="w-full"
                  />
                  {(search || typeFilter || alertFilter) && (
                    <button
                      type="button"
                      onClick={() => { setSearch(""); setTypeFilter(""); setAlertFilter(""); }}
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      Xóa bộ lọc
                    </button>
                  )}
                </div>
              </div>

              <div className={`min-h-0 flex-1 overflow-y-auto p-2 ${isSidebarCollapsed ? "lg:hidden" : ""}`}>
                {filteredReports.length === 0 ? (
                  <AdminEmptyState message="Không tìm thấy báo cáo phù hợp." />
                ) : (
                  <div className="space-y-1">
                    {filteredReports.map((report) => {
                      const isSelected = selected?.reportNo === report.reportNo;
                      return (
                        <div
                          key={`${report.reportNo}-${report.version}`}
                          className={`flex w-full items-center gap-2 rounded-lg border px-2 py-2 transition-colors ${isSelected ? "border-blue-200 bg-blue-50" : "border-transparent hover:bg-gray-50"}`}
                        >
                          <button
                            type="button"
                            aria-current={isSelected ? "true" : undefined}
                            onClick={() => void openReport(report)}
                            className="min-w-0 flex-1 px-1 py-1 text-left"
                          >
                            <div className={`truncate font-semibold ${isSelected ? "text-blue-800" : "text-gray-900"}`}>
                              #{report.reportNo}
                            </div>
                            <div className="mt-1 text-xs text-gray-500">{formatDate(report.date)}</div>
                            <div className="mt-1 text-xs text-gray-400">{typeLabels[report.type] ?? report.type}</div>
                          </button>
                          <button
                            type="button"
                            aria-label={`Tải PDF báo cáo ${report.reportNo}`}
                            onClick={() => void downloadPdf(report)}
                            className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-white hover:text-gray-900"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>

            <section className="m-4 flex min-h-[70vh] min-w-0 flex-col overflow-visible bg-white shadow-sm md:m-8">
              {selected ? (
                <>
                  <div className="border-b border-gray-100 px-4 py-3 md:px-5">
                    <div>
                      <h2 className="font-semibold text-gray-900">Báo cáo #{selected.reportNo}</h2>
                      <p className="mt-1 text-xs text-gray-500">{formatDate(selected.date)}</p>
                    </div>
                  </div>
                  {loadingHtml ? (
                    <div className="flex flex-1 items-center justify-center">
                      <Loader2 className="animate-spin text-gray-500" />
                    </div>
                  ) : error ? (
                    <div className="p-6 text-red-700">{error}</div>
                  ) : (
                    <iframe
                      ref={reportFrameRef}
                      title={`Báo cáo ${selected.reportNo}`}
                      srcDoc={html}
                      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                      scrolling="no"
                      onLoad={() => {
                        const frameDocument = reportFrameRef.current?.contentDocument;
                        if (frameDocument) {
                          setReportHeight(Math.max(frameDocument.documentElement.scrollHeight, frameDocument.body.scrollHeight));
                          window.setTimeout(() => {
                            const updatedDocument = reportFrameRef.current?.contentDocument;
                            if (updatedDocument) {
                              setReportHeight(Math.max(updatedDocument.documentElement.scrollHeight, updatedDocument.body.scrollHeight));
                            }
                          }, 150);
                        }
                      }}
                      style={{ height: reportHeight ? `${reportHeight}px` : "70vh" }}
                      className="w-full border-0 bg-white"
                    />
                  )}
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center p-8 text-gray-500">
                  Chọn một báo cáo để xem nội dung.
                </div>
              )}
            </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
