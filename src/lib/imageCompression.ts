import imageCompression from "browser-image-compression";

export interface CompressImageOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
}

/**
 * Nén/resize ảnh ở client-side trước khi upload.
 * Nếu file đã nhỏ hơn giới hạn hoặc nén thất bại, trả về file gốc.
 */
export async function compressImage(
  file: File,
  options: CompressImageOptions = {}
): Promise<File> {
  const { maxSizeMB = 1.5, maxWidthOrHeight = 1920 } = options;

  // Không cần nén nếu file đã đủ nhỏ
  if (file.size <= maxSizeMB * 1024 * 1024) {
    return file;
  }

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
      fileType: file.type,
      initialQuality: 0.85,
    });

    // Đảm bảo trả về File để tương thích với FormData
    if (compressed instanceof File) {
      return compressed;
    }

    return new File([compressed], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Image compression failed:", error);
    // Fallback về file gốc; backend sẽ reject nếu vẫn vượt quá giới hạn
    return file;
  }
}
