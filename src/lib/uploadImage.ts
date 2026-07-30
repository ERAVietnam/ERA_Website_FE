import { mediaApi, type UploadMediaResponse } from "@/api/domains/media";
import { compressImage } from "@/lib/imageCompression";

export interface CompressAndUploadImageOptions {
  /** Giới hạn dung lượng sau nén (MB). Mặc định theo compressImage (1.5MB). */
  maxSizeMB?: number;
  /** Giới hạn kích thước cạnh dài nhất sau nén (px). Mặc định theo compressImage (1920). */
  maxWidthOrHeight?: number;
  /** Tên file gốc (không extension) gửi kèm khi upload. */
  filenameBase?: string;
}

/**
 * Nén ảnh ở client-side rồi upload lên media storage.
 * Trả về thông tin media đã upload ({ id, url, folder }) để call site
 * dùng theo nhu cầu (lưu media id hoặc url).
 */
export async function compressAndUploadImage(
  file: File,
  folder: Parameters<typeof mediaApi.uploadImage>[1],
  options: CompressAndUploadImageOptions = {}
): Promise<UploadMediaResponse> {
  const { maxSizeMB, maxWidthOrHeight, filenameBase } = options;
  const compressedFile = await compressImage(file, { maxSizeMB, maxWidthOrHeight });
  return mediaApi.uploadImage(
    compressedFile,
    folder,
    filenameBase ? { filenameBase } : undefined
  );
}
