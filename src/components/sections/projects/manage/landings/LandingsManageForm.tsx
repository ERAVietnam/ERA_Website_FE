"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/admin/ImageUploadField";
import { compressAndUploadImage } from "@/lib/uploadImage";
import { Plus, Minus, Save, X } from "lucide-react";
import type { Media } from "@/types/api";

export interface LandingFormData {
  id?: string;
  title: string;
  location: string;
  tags: string[];
  url: string;
  imageMediaId?: string | null;
  imageMedia?: Media | null;
}

interface Props {
  initialData: LandingFormData | null;
  saving?: boolean;
  onSave: (data: LandingFormData) => void;
  onCancel: () => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-red-400 focus:ring-1 focus:ring-red-200";

export function LandingsManageForm({ initialData, saving, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [tags, setTags] = useState<string[]>(
    initialData?.tags?.length ? initialData.tags : [""]
  );
  const [url, setUrl] = useState(initialData?.url ?? "");
  const [imageMediaId, setImageMediaId] = useState<string | null>(
    initialData?.imageMediaId ?? null
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageMedia?.url ?? null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const setTag = (index: number, value: string) => {
    setTags((prev) => prev.map((t, i) => (i === index ? value : t)));
  };
  const addTag = () => setTags((prev) => [...prev, ""]);
  const removeTag = (index: number) =>
    setTags((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : [""]));

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const errors: Record<string, string> = {};
    if (!title.trim()) errors.title = "Tiêu đề không được để trống";
    if (!location.trim()) errors.location = "Vị trí không được để trống";
    if (!url.trim()) errors.url = "URL không được để trống";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    let finalImageMediaId = imageMediaId;
    if (imageFile) {
      setIsUploadingImage(true);
      try {
        const upload = await compressAndUploadImage(imageFile, "landings", {
          maxSizeMB: 1.5,
          maxWidthOrHeight: 1920,
        });
        finalImageMediaId = upload.id;
      } finally {
        setIsUploadingImage(false);
      }
    }

    onSave({
      id: initialData?.id,
      title: title.trim(),
      location: location.trim(),
      tags: tags.map((t) => t.trim()).filter(Boolean),
      url: url.trim(),
      imageMediaId: finalImageMediaId,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          {initialData?.id ? "Chỉnh sửa landing" : "Tạo landing mới"}
        </h2>
        <Button variant="ghost" size="sm" onClick={onCancel} className="gap-1">
          <X size={16} /> Quay lại
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột trái: thông tin */}
        <div className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Phú Gia Bảo Lộc - Gated Community phong cách Mỹ"
            />
            {fieldErrors.title && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.title}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Vị trí <span className="text-red-500">*</span>
            </label>
            <input
              className={inputClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="VD: Thành phố Bảo Lộc"
            />
            {fieldErrors.location && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.location}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">Các tag</label>
            <p className="mb-2 text-xs text-gray-400">Mỗi tag một dòng — dùng nút + / − để thêm bớt.</p>
            <div className="space-y-2">
              {tags.map((tag, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className={inputClass}
                    value={tag}
                    onChange={(e) => setTag(i, e.target.value)}
                    placeholder={`Tag ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    title="Thêm dòng"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    title="Bớt dòng"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                  >
                    <Minus size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              URL dẫn đến <span className="text-red-500">*</span>
            </label>
            <input
              className={inputClass}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="VD: /du-an-phu-gia-bao-loc"
            />
            {fieldErrors.url && <p className="mt-1 text-xs text-red-500">{fieldErrors.url}</p>}
            <p className="mt-1 text-xs text-gray-400">
              Khi bấm vào card ở trang /du-an sẽ dẫn đến link này.
            </p>
          </div>
        </div>

        {/* Cột phải: ảnh bìa */}
        <div className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
          <ImageUploadField
            label="Ảnh bìa landing"
            preview={imagePreview ?? undefined}
            previewAlt={title || "Ảnh bìa landing"}
            onFileSelect={handleImageSelect}
            onClear={() => {
              setImageFile(null);
              setImagePreview(null);
              setImageMediaId(null);
            }}
            isUploading={isUploadingImage}
            previewMaxWidth={360}
            dropzoneSize="md"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Hủy
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSubmit}
          isLoading={saving || isUploadingImage}
          className="gap-2"
        >
          <Save size={16} />
          {initialData?.id ? "Lưu thay đổi" : "Tạo landing"}
        </Button>
      </div>
    </div>
  );
}
