"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
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
    setDraggingIndex(null);
  }, [isOpen, initialImages, initialLayoutId, initialCount, initialVariant]);

  const startUploadForSlot = (index: number) => {
    setActiveSlotIndex(index);
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  const layoutOptions: Array<{ value: ImageGridVariant; label: string }> =
    imageCount === 3
      ? [
          { value: "default", label: "Layout mặc định: 1 hàng ngang" },
          { value: "left-large", label: "Layout 2: trái lớn, phải 2 nhỏ" },
          { value: "right-large", label: "Layout 3: phải lớn, trái 2 nhỏ" },
        ]
      : imageCount === 5
      ? [
          { value: "three-two", label: "Layout 1: trên 3, dưới 2" },
          { value: "two-three", label: "Layout 2: trên 2, dưới 3" },
        ]
      : [{ value: "default", label: "Layout mặc định" }];

  const gridTemplateColumns =
    imageCount === 3 && variant === "left-large"
      ? "1.5fr 1fr"
      : imageCount === 3 && variant === "right-large"
      ? "1fr 1.5fr"
      : imageCount === 3 || imageCount === 6
      ? "repeat(3, minmax(0, 1fr))"
      : imageCount === 5
      ? "repeat(6, minmax(0, 1fr))"
      : "repeat(2, minmax(0, 1fr))";

  const gridTemplateRows =
    imageCount === 3 && (variant === "left-large" || variant === "right-large")
      ? "repeat(2, minmax(0, 1fr))"
      : undefined;

  const getSlotStyle = (index: number): React.CSSProperties => {
    if (imageCount === 3 && variant === "left-large") {
      return index === 0 ? { gridRow: "span 2" } : {};
    }
    if (imageCount === 3 && variant === "right-large") {
      if (index === 0) return { gridColumn: "2", gridRow: "span 2" };
      if (index === 1) return { gridColumn: "1", gridRow: "1" };
      return { gridColumn: "1", gridRow: "2" };
    }
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
    setVariant(imageCount === 3 || imageCount === 5 ? nextVariant : "default");
  };

  const fillSlots = (
    prev: ImageGridItem[],
    newImages: ImageGridItem[],
    startIndex: number
  ): ImageGridItem[] => {
    const next = [...prev];
    let fileIndex = 0;

    // Fill từ ô đang chọn đến cuối
    let slot = startIndex;
    while (slot < next.length && fileIndex < newImages.length) {
      if (!next[slot].src) {
        next[slot] = newImages[fileIndex];
        fileIndex++;
      }
      slot++;
    }

    // Nếu còn ảnh, fill các ô trống từ đầu
    slot = 0;
    while (fileIndex < newImages.length && slot < next.length) {
      if (!next[slot].src) {
        next[slot] = newImages[fileIndex];
        fileIndex++;
      }
      slot++;
    }

    // Nếu vẫn còn ảnh, ghi đè từ ô đang chọn trở đi
    slot = startIndex;
    while (fileIndex < newImages.length && slot < next.length) {
      next[slot] = newImages[fileIndex];
      fileIndex++;
      slot++;
    }

    return next;
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    setIsProcessing(true);
    try {
      const newImages = await Promise.all(
        imageFiles.map(async (file) => ({
          src: await fileToDataUrl(file),
          alt: "",
          description: "",
        }))
      );

      setImages((prev) => fillSlots(prev, newImages, activeSlotIndex));
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = { src: "", alt: "", description: "" };
      return next;
    });
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    if (draggingIndex === null || draggingIndex === targetIndex) return;
    setImages((prev) => {
      const next = [...prev];
      [next[draggingIndex], next[targetIndex]] = [next[targetIndex], next[draggingIndex]];
      return next;
    });
    setDraggingIndex(null);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
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
              Chọn số lượng ảnh, kiểu layout, bấm từng ô để chọn ảnh. Có thể chọn nhiều ảnh cùng lúc và kéo thả để sắp xếp.
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
              gridTemplateRows,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                draggable={!!image.src}
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
                className={`group relative overflow-hidden border border-gray-200 bg-gray-50 transition-opacity ${
                  imageCount === 3 && (variant === "left-large" || variant === "right-large")
                    ? "flex flex-col min-h-0"
                    : ""
                } ${draggingIndex === index ? "opacity-50" : "opacity-100"}`}
                style={getSlotStyle(index)}
              >
                {image.src && (
                  <div className="absolute left-2 top-2 z-10 cursor-grab rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/80 active:cursor-grabbing group-hover:opacity-100">
                    <GripVertical size={14} />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => startUploadForSlot(index)}
                  disabled={isProcessing}
                  className={`flex w-full items-center justify-center overflow-hidden bg-gray-50 text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 ${
                    imageCount === 3 && (variant === "left-large" || variant === "right-large")
                      ? "flex-1 min-h-0"
                      : "aspect-[4/3]"
                  }`}
                >
                  {image.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.src}
                      alt={image.alt || ""}
                      className={`h-full w-full object-cover ${
                        imageCount === 3 && (variant === "left-large" || variant === "right-large")
                          ? "min-h-0"
                          : ""
                      }`}
                      draggable={false}
                    />
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
                      handleRemove(index);
                    }}
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition-colors hover:bg-red-700 group-hover:opacity-100"
                    aria-label={`Xóa ảnh ${index + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                {image.src && (
                  <input
                    type="text"
                    value={image.alt || ""}
                    onChange={(event) => {
                      const next = [...images];
                      next[index] = { ...next[index], alt: event.target.value };
                      setImages(next);
                    }}
                    placeholder="Alt text"
                    className="w-full border-t border-gray-200 px-3 py-2 text-xs text-gray-700 outline-none focus:border-gray-300"
                  />
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
                    className="w-full border-t border-gray-200 bg-gray-100 px-3 py-2 text-center text-xs italic text-gray-600 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-300 focus:bg-white"
                  />
                )}
              </div>
            ))}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => handleFiles(event.target.files)}
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <Button type="button" variant="outline" size="sm" className="bg-white" onClick={onClose}>
            Hủy
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={images.some((image) => !image.src) || isProcessing}
          >
            Lưu grid
          </Button>
        </div>
      </div>
    </div>
  );
}
