"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Archive, ExternalLink, FileArchive, Plus, Trash2, Upload, X } from "lucide-react";
import JSZip from "jszip";
import { AdminDialog } from "@/components/ui/admin/AdminDialog";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Section } from "@/components/ui/Section";
import { mktPagesApi, type MktPageUploadMetadata } from "@/api/domains/mkt-pages";
import type { MktPage } from "@/types/api";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";

const MKT_PAGE_PERMISSION = "mkt.pages.manage";

export function MktPageManagePage() {
  const { hasPermission } = useAuth();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSourceName, setSelectedSourceName] = useState("");
  const folderInputRef = useRef<HTMLInputElement>(null);
  const selectedFile = selectedFiles[0] ?? null;
  const setSelectedFile = (file: File | null) => chooseSource(file ? [file] : []);
  const [metadata, setMetadata] = useState<MktPageUploadMetadata>({ operation: "create", slug: "", title: "", indexable: false, form: null });
  const [pages, setPages] = useState<MktPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, slug: "" });
  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, setShowNetworkError, handleApiError } = useApiErrorHandler(showError);
  const canManage = hasPermission(MKT_PAGE_PERMISSION);

  const loadPages = useCallback(async () => {
    setLoading(true);
    try {
      setPages(await mktPagesApi.list());
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  useEffect(() => {
    if (canManage) void loadPages();
  }, [canManage, loadPages]);

  useEffect(() => {
    folderInputRef.current?.setAttribute("webkitdirectory", "");
    folderInputRef.current?.setAttribute("directory", "");
  }, []);

  const chooseSource = (files: File[]) => {
    setSelectedFiles(files);
    setSelectedSourceName(files.length === 1 ? files[0].name : `${files.length} file trong thư mục`);
  };

  const updateMetadata = <K extends keyof MktPageUploadMetadata>(key: K, value: MktPageUploadMetadata[K]) => {
    setMetadata((current) => ({ ...current, [key]: value }));
  };

  const buildUploadPackage = async () => {
    if (!selectedFiles.length) throw new Error("Chưa chọn file hoặc thư mục landing.");

    const sourceIsZip = selectedFiles.length === 1 && selectedFiles[0].name.toLowerCase().endsWith(".zip");
    const sourceZip = sourceIsZip ? await JSZip.loadAsync(selectedFiles[0]) : null;
    const sourceEntries = sourceZip
      ? Object.entries(sourceZip.files).filter(([, entry]) => !entry.dir)
      : selectedFiles.map((file) => [file.webkitRelativePath || file.name, file] as const);
    const pageJsonEntry = sourceEntries.find(([path]) => path.toLowerCase().endsWith("page.json"));
    if (!pageJsonEntry) throw new Error("Không tìm thấy page.json trong file hoặc thư mục đã chọn.");

    const pageJsonText = sourceZip
      ? await (pageJsonEntry[1] as JSZip.JSZipObject).async("text")
      : await (pageJsonEntry[1] as File).text();
    let parsedMetadata: MktPageUploadMetadata;
    try {
      parsedMetadata = JSON.parse(pageJsonText) as MktPageUploadMetadata;
    } catch {
      throw new Error("page.json không đúng định dạng JSON.");
    }

    const indexEntry = sourceEntries.find(([path]) => path.toLowerCase().endsWith("index.html"));
    if (!indexEntry) throw new Error("Không tìm thấy index.html trong file hoặc thư mục đã chọn.");
    const indexPath = indexEntry[0].replaceAll("\\", "/");
    const basePath = indexPath.slice(0, indexPath.lastIndexOf("/") + 1);
    const uploadZip = new JSZip();
    for (const [rawPath, entry] of sourceEntries) {
      const path = rawPath.replaceAll("\\", "/");
      if (!path.startsWith(basePath) || path.toLowerCase().endsWith("page.json")) continue;
      const relativePath = path.slice(basePath.length);
      if (!relativePath || relativePath.includes("..")) continue;
      const content = sourceZip
        ? await (entry as JSZip.JSZipObject).async("uint8array")
        : entry as File;
      uploadZip.file(relativePath, content);
    }

    if (!uploadZip.file("index.html")) throw new Error("Không tìm thấy index.html ở thư mục gốc của landing.");
    const blob = await uploadZip.generateAsync({ type: "blob", compression: "DEFLATE" });
    return {
      file: new File([blob], `${parsedMetadata.slug || "mkt-page"}.zip`, { type: "application/zip" }),
      metadata: { ...parsedMetadata, operation: parsedMetadata.operation || "create" },
    };
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const prepared = await buildUploadPackage();
      await mktPagesApi.upload(prepared.file, prepared.metadata);
      showSuccess("Đăng trang MKT thành công!");
      setIsUploadOpen(false);
      setSelectedFiles([]);
      setSelectedSourceName("");
      await loadPages();
    } catch (error) {
      if (error instanceof Error && (error.message.includes("page.json") || error.message.includes("index.html") || error.message.includes("Chưa chọn"))) {
        showError(error.message);
      } else {
        handleApiError(error, { useNetworkPopup: false });
      }
    } finally {
      setUploading(false);
    }
  };

  const handleConfirmDelete = async () => {
    const { slug } = deleteConfirm;
    setDeleteConfirm({ show: false, slug: "" });
    if (!slug) return;
    setDeletingSlug(slug);
    try {
      await mktPagesApi.remove(slug);
      showSuccess("Đã xóa trang MKT.");
      await loadPages();
    } catch (error) {
      handleApiError(error, { useNetworkPopup: false });
    } finally {
      setDeletingSlug(null);
    }
  };

  if (!canManage) {
    return <Section padding="md" bg="gray"><div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500 shadow-sm">Bạn không có quyền truy cập khu vực này.</div></Section>;
  }

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
      <AdminListHeader title="Danh sách trang MKT" count={{ format: "total", total: 0, noun: "trang MKT" }}>
        <Button type="button" variant="primary" size="sm" className="gap-2" onClick={() => setIsUploadOpen(true)}><Plus size={16} /> Tạo trang MKT</Button>
      </AdminListHeader>
      {showNetworkError && <NetworkErrorPopup onRetry={() => { setShowNetworkError(false); void loadPages(); }} />}
      {popup.show && <PopupNotification type={popup.type} message={popup.message} onClose={closePopup} autoClose />}

      <AdminTable>
        <thead><tr className="border-b border-gray-100 bg-gray-50/50"><th className="px-5 py-3.5 text-left font-semibold text-gray-600">Tên trang</th><th className="px-5 py-3.5 text-left font-semibold text-gray-600">URL</th><th className="px-5 py-3.5 text-left font-semibold text-gray-600">Trạng thái</th><th className="px-5 py-3.5 text-left font-semibold text-gray-600">Cập nhật lần cuối</th><th className="px-5 py-3.5 text-right font-semibold text-gray-600">Thao tác</th></tr></thead>
        <tbody className="divide-y divide-gray-50">
          {loading ? <tr><td colSpan={5}><AdminLoading /></td></tr> : pages.length === 0 ? <tr><td colSpan={5} className="px-5 py-12"><AdminEmptyState message="Chưa có trang MKT nào." /></td></tr> : pages.map((page) => <tr key={page.id} className="transition-colors hover:bg-gray-50/40"><td className="px-5 py-4 font-semibold text-gray-900">{page.title}</td><td className="px-5 py-4 text-gray-600">/{page.slug}/</td><td className="px-5 py-4"><span className="inline-flex rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">{page.status === "active" ? "Đang hoạt động" : page.status}</span></td><td className="px-5 py-4 text-gray-500">{new Date(page.updatedAt).toLocaleString("vi-VN")}</td><td className="px-5 py-4"><div className="flex justify-end gap-1"><Button type="button" variant="ghost" isIconOnly size="md" onClick={() => window.open(`/${page.slug}/`, "_blank", "noopener,noreferrer")} title="Mở trang"><ExternalLink size={16} className="text-gray-500" /></Button><Button type="button" variant="ghost" isIconOnly size="md" onClick={() => setDeleteConfirm({ show: true, slug: page.slug })} disabled={deletingSlug === page.slug} title="Xóa" className="hover:!bg-red-50"><Trash2 size={16} className="text-red-500" /></Button></div></td></tr>)}
        </tbody>
      </AdminTable>
      <AdminDialog isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} maxWidth="max-w-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4"><div><h3 className="text-lg font-bold text-gray-900">Tạo trang MKT mới</h3><p className="mt-1 text-sm text-gray-500">Chọn file ZIP chứa landing HTML và toàn bộ assets.</p></div><button type="button" onClick={() => setIsUploadOpen(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="Đóng"><X size={20} /></button></div>
        <div className="space-y-5 overflow-y-auto p-5">
          <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            Chọn file ZIP hoặc cả thư mục landing. Trong gói cần có <code>page.json</code> và <code>index.html</code>; metadata sẽ được đọc tự động từ <code>page.json</code>.
           </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition-colors hover:border-gray-400 hover:bg-gray-100">
              <input type="file" accept=".zip,application/zip,application/x-zip-compressed" className="sr-only" onChange={(event) => chooseSource(event.target.files ? Array.from(event.target.files) : [])} />
              <FileArchive size={30} className="mb-2 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Chọn file ZIP</span>
              <span className="mt-1 text-xs text-gray-500">Có page.json và index.html</span>
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition-colors hover:border-gray-400 hover:bg-gray-100">
              <input ref={folderInputRef} type="file" className="sr-only" onClick={(event) => { event.currentTarget.setAttribute("webkitdirectory", ""); event.currentTarget.setAttribute("directory", ""); }} onChange={(event) => chooseSource(event.target.files ? Array.from(event.target.files) : [])} />
              <Archive size={30} className="mb-2 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Chọn thư mục</span>
              <span className="mt-1 text-xs text-gray-500">Tự đóng gói trước khi gửi</span>
            </label>
          </div>
          {selectedSourceName && <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700"><span className="font-semibold">Đã chọn:</span> {selectedSourceName}</div>}
          <div className="hidden">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">Slug / URL<input value={metadata.slug} onChange={(event) => updateMetadata("slug", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" placeholder="myera-guest-test" /></label>
            <label className="text-sm font-medium text-gray-700">Tên trang<input value={metadata.title} onChange={(event) => updateMetadata("title", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" placeholder="Giới thiệu MyERA" /></label>
          </div>
          <label className="block text-sm font-medium text-gray-700">Mô tả SEO<textarea value={metadata.description ?? ""} onChange={(event) => updateMetadata("description", event.target.value)} className="mt-1 min-h-20 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" /></label>
          <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium text-gray-700">Tag Manager ID<input value={metadata.tagManagerId ?? ""} onChange={(event) => updateMetadata("tagManagerId", event.target.value || null)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" /></label><label className="text-sm font-medium text-gray-700">Meta Pixel ID<input value={metadata.metaPixelId ?? ""} onChange={(event) => updateMetadata("metaPixelId", event.target.value || null)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" /></label></div>
          <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={metadata.indexable} onChange={(event) => updateMetadata("indexable", event.target.checked)} className="h-4 w-4 rounded border-gray-300" /> Cho phép Google lập chỉ mục</label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition-colors hover:border-gray-400 hover:bg-gray-100"><input type="file" accept=".zip,application/zip,application/x-zip-compressed" className="sr-only" onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)} />{selectedFile ? <FileArchive size={34} className="mb-3 text-gray-700" /> : <Archive size={34} className="mb-3 text-gray-400" />}<span className="text-sm font-semibold text-gray-700">{selectedFile ? selectedFile.name : "Chọn file ZIP"}</span><span className="mt-1 text-xs text-gray-500">Gồm index.html và thư mục assets</span></label>
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-4"><Button type="button" variant="outline" size="sm" onClick={() => setIsUploadOpen(false)}>Hủy</Button><Button type="button" variant="primary" size="sm" className="gap-2" disabled={!selectedFile || uploading} isLoading={uploading} onClick={() => void handleUpload()}><Upload size={16} /> Upload</Button></div>
        </div>
      </AdminDialog>
      <ConfirmDialog
        isOpen={deleteConfirm.show}
        title="Xóa trang MKT"
        message={`Bạn có chắc muốn xóa /${deleteConfirm.slug}/ và toàn bộ file đã upload không?`}
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={() => void handleConfirmDelete()}
        onCancel={() => setDeleteConfirm({ show: false, slug: "" })}
      />
      </div>
    </Section>
  );
}
