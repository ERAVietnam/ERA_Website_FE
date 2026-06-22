import imageCompression from "browser-image-compression";

export interface CompressImageOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  fileType?: string;
}

/**
 * Nén/resize ảnh ở client-side trước khi upload.
 * Nếu file đã nhỏ hơn giới hạn hoặc nén thất bại, trả về file gốc.
 *
 * Lưu ý: Luôn giữ đúng MIME type và extension của output đã nén,
 * tránh trường hợp bytes là JPEG nhưng header bị ghi nhầm PNG.
 */
export async function compressImage(
  file: File,
  options: CompressImageOptions = {}
): Promise<File> {
  const { maxSizeMB = 1.5, maxWidthOrHeight = 1920, fileType = file.type } = options;

  const shouldConvertFormat = fileType !== file.type;

  // Chỉ skip nén nếu không đổi định dạng và file đã đủ nhỏ
  if (!shouldConvertFormat && file.size <= maxSizeMB * 1024 * 1024) {
    return file;
  }

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
      fileType,
      initialQuality: 0.85,
    });

    const outputType = compressed.type || fileType;
    const ext = outputType.split("/")[1] || "jpeg";
    const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
    const outputName = `${baseName}.${ext}`;

    return new File([compressed], outputName, {
      type: outputType,
      lastModified: Date.now(),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Image compression failed:", error);
    // Fallback về file gốc; backend sẽ reject nếu vẫn vượt quá giới hạn
    return file;
  }
}
