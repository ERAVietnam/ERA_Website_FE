"use client";

import { useEffect, useState } from "react";
import { Download, FileBarChart, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { brandHealthApi } from "@/api/domains/brand-health";
import { API_CONFIG } from "@/api/config";
import type { BrandHealthReport } from "@/types/api";

export default function BrandHealthReportPage() {
  const router = useRouter();
  const params = useParams<{ reportNo: string }>();
  const reportNo = params.reportNo;
  const [report, setReport] = useState<BrandHealthReport | null>(null);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([brandHealthApi.detail(reportNo), brandHealthApi.html(reportNo)])
      .then(([metadata, content]) => {
        setReport(metadata);
        const baseUrl = `${API_CONFIG.BASE_URL}/brand-health/bao-cao/${reportNo}/page/`;
        setHtml(content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<head>/i, `<head><base href="${baseUrl}" target="_blank">`));
      })
      .catch(() => setError("Không thể tải báo cáo."))
      .finally(() => setLoading(false));
  }, [reportNo]);

  const downloadPdf = async () => {
    if (!report) return;
    const blob = await brandHealthApi.pdf(report.reportNo);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `brand-health-${report.reportNo}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return <div className="min-h-screen bg-gray-50 p-4 md:p-8"><div className="mx-auto flex h-[calc(100vh-4rem)] max-w-7xl flex-col gap-4">
    <header className="flex flex-wrap items-center justify-between gap-3"><div><button className="text-sm text-blue-700 hover:underline" onClick={() => router.push("/brand-health")}>← Danh sách báo cáo</button><h1 className="mt-2 flex items-center gap-2 text-2xl font-bold text-gray-900"><FileBarChart size={26} /> Báo cáo #{reportNo}</h1></div>{report && <button className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50" onClick={downloadPdf}><Download size={16} /> Tải PDF</button>}</header>
    <div className="min-h-0 flex-1 overflow-hidden rounded-xl border bg-white shadow-sm">{loading ? <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-gray-500" /></div> : error ? <div className="p-6 text-red-700">{error}</div> : <iframe title={`Báo cáo ${reportNo}`} srcDoc={html} sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox" className="h-full w-full border-0" />}</div>
  </div></div>;
}
