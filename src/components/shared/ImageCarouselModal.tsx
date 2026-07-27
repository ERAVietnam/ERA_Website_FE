"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ImageCarouselItem {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
}

interface ImageCarouselModalProps {
  isOpen: boolean;
  initialItems?: ImageCarouselItem[];
  onClose: () => void;
  onSave: (items: ImageCarouselItem[]) => void;
}

const MIN_ITEMS = 3;
const MAX_ITEMS = 10;

function generateId() {
  return `carousel-img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageCarouselModal({
  isOpen,
  initialItems = [],
  onClose,
  onSave,
}: ImageCarouselModalProps) {
  const [items, setItems] = useState<ImageCarouselItem[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setItems(initialItems.length > 0 ? initialItems : []);
    }
  }, [isOpen, initialItems]);

  if (!isOpen) return null;

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const remainingSlots = MAX_ITEMS - items.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    const newItems = await Promise.all(
      filesToAdd.map(async (file) => ({
        id: generateId(),
        src: await fileToDataUrl(file),
        alt: "",
        caption: "",
      }))
    );

    setItems((prev) => [...prev, ...newItems].slice(0, MAX_ITEMS));
  };

  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCaptionChange = (index: number, caption: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], caption };
      return next;
    });
  };

  const handleAltChange = (index: number, alt: string) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], alt };
      return next;
    });
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    setItems((prev) => {
      const next = [...prev];
      const [dragged] = next.splice(draggingIndex, 1);
      next.splice(index, 0, dragged);
      return next;
    });
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const canSave = items.length >= MIN_ITEMS;
  const isFull = items.length >= MAX_ITEMS;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Chèn carousel hình ảnh</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tối thiểu {MIN_ITEMS} ảnh, tối đa {MAX_ITEMS} ảnh. Kéo thả để sắp xếp.
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

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-100"
            >
              <ImagePlus size={40} />
              <span className="text-sm font-medium">Bấm để chọn ảnh</span>
            </button>
          ) : (
            <>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  Đã chọn {items.length}/{MAX_ITEMS} ảnh
                </span>
                {!isFull && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                  >
                    <ImagePlus size={16} />
                    Thêm ảnh
                  </button>
                )}
              </div>

              <div className="relative">
                <div
                  className="flex gap-3 overflow-x-auto rounded-xl border border-gray-100 bg-gray-50 p-3"
                  style={{ scrollSnapType: "x mandatory" }}
                >
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(event) => handleDragOver(event, index)}
                      onDragEnd={handleDragEnd}
                      className={`relative flex-shrink-0 w-[160px] select-none rounded-xl border bg-white p-2 shadow-sm transition-opacity ${
                        draggingIndex === index ? "opacity-50" : "opacity-100"
                      }`}
                      style={{ scrollSnapAlign: "start" }}
                    >
                      <div className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.src}
                          alt={item.alt || ""}
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                        <div className="absolute inset-0 flex items-start justify-between p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="cursor-grab rounded-full bg-black/60 p-1.5 text-white active:cursor-grabbing">
                            <GripVertical size={14} />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="rounded-full bg-red-600 p-1.5 text-white transition-colors hover:bg-red-700"
                            aria-label="Xóa ảnh"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={item.alt || ""}
                        onChange={(event) => handleAltChange(index, event.target.value)}
                        placeholder="Alt text"
                        className="mt-2 w-full rounded-md border border-gray-200 px-2 py-1.5 text-xs text-gray-700 outline-none focus:border-gray-400"
                      />
                      <input
                        type="text"
                        value={item.caption || ""}
                        onChange={(event) => handleCaptionChange(index, event.target.value)}
                        placeholder="Mô tả ảnh"
                        className="mt-1.5 w-full border border-gray-100 bg-gray-100 px-2 py-1.5 text-center text-xs italic text-gray-600 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-300 focus:bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => {
              handleFiles(event.target.files);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
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
            onClick={() => onSave(items)}
            disabled={!canSave}
          >
            Lưu carousel
          </Button>
        </div>
      </div>
    </div>
  );
}
