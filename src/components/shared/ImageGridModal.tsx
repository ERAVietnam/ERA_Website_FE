"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, PencilLine, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import {
  buildImageGridHtml,
  createImageGridId,
  getDefaultImageGridVariant,
  IMAGE_GRID_MAX_ITEMS,
  IMAGE_GRID_MIN_ITEMS,
  type ImageGridItem,
  type ImageGridVariant,
} from "./image-grid-layout";

interface ImageGridModalProps {
  isOpen: boolean;
  initialImages?: ImageGridItem[];
  initialLayoutId?: string;
  initialCount?: number;
  initialVariant?: ImageGridVariant;
  onClose: () => void;
  onSave: (html: string, layoutId: string) => void;
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function clampImageCount(count: number) {
  return Math.min(IMAGE_GRID_MAX_ITEMS, Math.max(IMAGE_GRID_MIN_ITEMS, count));
}

export function ImageGridModal({
  isOpen,
  initialImages = [],
  initialLayoutId,
  initialCount,
  initialVariant,
  onClose,
  onSave,
}: ImageGridModalProps) {
  const [layoutId, setLayoutId] = useState(initialLayoutId || createImageGridId());
  const [imageCount, setImageCount] = useState(IMAGE_GRID_MIN_ITEMS);
  const [variant, setVariant] = useState<ImageGridVariant>("default");
  const [images, setImages] = useState<ImageGridItem[]>([]);
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);
  const [editingAltIndex, setEditingAltIndex] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const nextCount = clampImageCount(initialCount || initialImages.length || IMAGE_GRID_MIN_ITEMS);
    setLayoutId(initialLayoutId || createImageGridId());
    setImageCount(nextCount);
    setVariant(initialVariant || getDefaultImageGridVariant(nextCount));
    setImages(
      Array.from({ length: nextCount }, (_, index) => initialImages[index] || { src: "", alt: "", description: "" })
    );
    setActiveSlotIndex(0);
  }, [isOpen, initialImages, initialLayoutId, initialCount, initialVariant]);

  if (!isOpen) return null;

  const layoutOptions: Array<{ value: ImageGridVariant; label: string }> =
    imageCount === 5
      ? [
          { value: "three-two", label: "Layout 1: trên 3, dưới 2" },
          { value: "two-three", label: "Layout 2: trên 2, dưới 3" },
        ]
      : [{ value: "default", label: "Layout mặc định" }];

  const gridTemplateColumns =
    imageCount === 3 || imageCount === 6
      ? "repeat(3, minmax(0, 1fr))"
      : imageCount === 5
      ? "repeat(6, minmax(0, 1fr))"
      : "repeat(2, minmax(0, 1fr))";

  const getSlotStyle = (index: number): React.CSSProperties => {
    if (imageCount !== 5) return {};
    if (variant === "three-two") {
      return index < 3 ? { gridColumn: "span 2" } : { gridColumn: "span 3" };
    }
    return index < 2 ? { gridColumn: "span 3" } : { gridColumn: "span 2" };
  };

  const handleCountChange = (nextCount: number) => {
    const safeCount = clampImageCount(nextCount);
    setImageCount(safeCount);
    setVariant(getDefaultImageGridVariant(safeCount));
    setImages((prev) =>
      Array.from({ length: safeCount }, (_, index) => prev[index] || { src: "", alt: "", description: "" })
    );
    setActiveSlotIndex(0);
  };

  const handleVariantChange = (nextVariant: ImageGridVariant) => {
    setVariant(imageCount === 5 ? nextVariant : "default");
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const selectedFile = Array.from(files).find((file) => file.type.startsWith("image/"));
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const nextImage = {
        src: await fileToDataUrl(selectedFile),
        alt: selectedFile.name.replace(/\.[^.]+$/, ""),
        description: "",
      };
      setImages((prev) => {
        const next = [...prev];
        next[activeSlotIndex] = nextImage;
        return next;
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (images.some((image) => !image.src)) return;
    onSave(buildImageGridHtml(images, layoutId, variant), layoutId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Chèn grid hình ảnh</h3>
            <p className="mt-1 text-sm text-gray-500">
              Chọn số lượng ảnh, kiểu layout, rồi bấm từng ô để chọn hoặc đổi ảnh.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Số lượng ảnh</span>
              <select
                value={imageCount}
                onChange={(event) => handleCountChange(Number(event.target.value))}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-colors focus:border-gray-400"
              >
                {Array.from(
                  { length: IMAGE_GRID_MAX_ITEMS - IMAGE_GRID_MIN_ITEMS + 1 },
                  (_, index) => IMAGE_GRID_MIN_ITEMS + index
                ).map((count) => (
                  <option key={count} value={count}>
                    {count} ảnh
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Kiểu layout</span>
              <select
                value={variant}
                onChange={(event) => handleVariantChange(event.target.value as ImageGridVariant)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-colors focus:border-gray-400"
              >
                {layoutOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden border border-gray-200 bg-gray-50"
                style={getSlotStyle(index)}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (image.src) {
                      setEditingAltIndex(index);
                    } else {
                      setActiveSlotIndex(index);
                      fileInputRef.current?.click();
                    }
                  }}
                  disabled={isProcessing}
                  className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gray-50 text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {image.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image.src} alt={image.alt || ""} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      {isProcessing && activeSlotIndex === index ? (
                        <Loader2 size={24} className="animate-spin" />
                      ) : (
                        <ImagePlus size={28} />
                      )}
                      <span className="text-sm font-medium">Ảnh {index + 1}</span>
                      <span className="text-xs">Bấm để chọn</span>
                    </div>
                  )}
                </button>

                {image.src && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setImages((prev) => {
                        const next = [...prev];
                        next[index] = { src: "", alt: "", description: "" };
                        return next;
                      });
                    }}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                    aria-label={`Xóa ảnh ${index + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                {image.src && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveSlotIndex(index);
                      fileInputRef.current?.click();
                    }}
                    className="absolute bottom-2 right-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                    aria-label={`Đổi ảnh ${index + 1}`}
                  >
                    <PencilLine size={14} />
                  </button>
                )}

                {image.src && (
                  <input
                    type="text"
                    value={image.description || ""}
                    onChange={(event) => {
                      const next = [...images];
                      next[index] = { ...next[index], description: event.target.value };
                      setImages(next);
                    }}
                    placeholder="Mô tả ảnh"
                    className="w-full border-t border-gray-200 px-3 py-2 text-xs text-gray-600 outline-none focus:border-gray-300"
                  />
                )}

                {image.src && editingAltIndex === index && (
                  <input
                    type="text"
                    value={image.alt || ""}
                    onChange={(event) => {
                      const next = [...images];
                      next[index] = { ...next[index], alt: event.target.value };
                      setImages(next);
                    }}
                    onBlur={() => setEditingAltIndex(null)}
                    placeholder="Alt text"
                    className="w-full border-t border-gray-200 px-3 py-2 text-xs text-gray-600 outline-none focus:border-gray-300"
                    autoFocus
                  />
                )}
              </div>
            ))}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleFiles(event.target.files)}
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <Button type="button" variant="outline" className="bg-white" onClick={onClose}>
            Hủy
          </Button>
          <button
            type="button"
            onClick={handleSave}
            disabled={images.some((image) => !image.src) || isProcessing}
            className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: colors.primary.DEFAULT }}
          >
            Lưu grid
          </button>
        </div>
      </div>
    </div>
  );
}
