import { mediaApi } from "@/api/domains/media";
import { compressImage } from "@/lib/imageCompression";

export function base64ToFile(base64: string, baseFilename: string): File {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const ext = mime.split("/")[1] || "png";
  const filename = `${baseFilename}.${ext}`;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

type UploadFolder = "news" | "magazine" | "recruitment" | "projects" | "agents" | "monthly-honors" | "academy" | "general";

/**
 * Tìm các ảnh base64 nhúng trong rich-text HTML, nén + upload rồi thay src
 * bằng URL đã upload. Trả về HTML sau khi xử lý.
 *
 * @param content HTML cần xử lý
 * @param folder  Thư mục upload trên media service (vd: "news", "projects")
 * @param filePrefix Prefix tên file tạm (mặc định "content-img")
 */
export async function processContentImages(
  content: string,
  folder: UploadFolder,
  filePrefix = "content-img"
): Promise<string> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const images = Array.from(doc.querySelectorAll('img[src^="data:image"]'));

  if (images.length === 0) return content;

  await Promise.all(
    images.map(async (img, i) => {
      const base64 = img.getAttribute("src")!;
      const file = base64ToFile(base64, `${filePrefix}-${Date.now()}-${i}`);

      // Ảnh đầu tiên giữ nguyên định dạng gốc (thường dùng làm featured fallback)
      // Ảnh GIF cũng giữ nguyên để không mất animation
      const isFirstImage = i === 0;
      const isGif = file.type === "image/gif";
      const shouldConvertToWebP = !isFirstImage && !isGif;

      const compressedFile = shouldConvertToWebP
        ? await compressImage(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1600,
            fileType: "image/webp",
          })
        : file;

      const upload = await mediaApi.uploadImage(compressedFile, folder);
      img.setAttribute("src", upload.url);
    })
  );

  return doc.body.innerHTML;
}
