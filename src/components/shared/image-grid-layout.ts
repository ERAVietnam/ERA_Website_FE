export interface ImageGridItem {
  src: string;
  alt?: string;
  description?: string;
}

export type ImageGridVariant = "default" | "two-three" | "three-two" | "left-large" | "right-large";

export const IMAGE_GRID_MAX_ITEMS = 6;
export const IMAGE_GRID_MIN_ITEMS = 2;

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function createImageGridId() {
  return `grid-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getDefaultImageGridVariant(count: number): ImageGridVariant {
  return count === 5 ? "two-three" : "default";
}

export function buildImageGridHtml(
  images: ImageGridItem[],
  layoutId = createImageGridId(),
  variant: ImageGridVariant = getDefaultImageGridVariant(images.length),
) {
  const safeImages = images
    .filter((image) => image.src)
    .slice(0, IMAGE_GRID_MAX_ITEMS);
  const safeVariant =
    safeImages.length === 3 || safeImages.length === 5 ? variant : "default";

  const items = safeImages
    .map((image, index) => {
      const alt = image.alt?.trim() || `Ảnh ${index + 1}`;
      const description = image.description?.trim();
      return `
        <figure class="era-image-grid__item" contenteditable="false">
          <img src="${escapeAttribute(image.src)}" alt="${escapeAttribute(alt)}" draggable="false" />
          ${description ? `<div class="era-image-grid__caption">${description}</div>` : ""}
        </figure>`;
    })
    .join("");

  return `
    <div class="era-image-grid" data-era-image-grid="true" data-era-layout-id="${escapeAttribute(layoutId)}" data-era-image-count="${safeImages.length}" data-era-grid-variant="${escapeAttribute(safeVariant)}" contenteditable="false">
      ${items}
      <span role="button" tabindex="0" class="era-image-grid__edit" data-era-grid-edit="true" contenteditable="false">Sửa</span>
      <span role="button" tabindex="0" class="era-image-grid__delete" data-era-grid-delete="true" contenteditable="false">Xóa</span>
    </div>`;
}

export function parseImageGridElement(element: HTMLElement): {
  layoutId: string;
  images: ImageGridItem[];
  count: number;
  variant: ImageGridVariant;
} | null {
  if (!element.matches("[data-era-image-grid='true']")) return null;

  const layoutId = element.dataset.eraLayoutId || createImageGridId();
  const figures = Array.from(element.querySelectorAll<HTMLElement>("figure"));
  const images = figures
    .map((figure) => {
      const img = figure.querySelector("img");
      const caption = figure.querySelector(".era-image-grid__caption");
      return {
        src: img?.getAttribute("src") || "",
        alt: img?.getAttribute("alt") || "",
        description: caption?.textContent || "",
      };
    })
    .filter((image) => image.src)
    .slice(0, IMAGE_GRID_MAX_ITEMS);
  const count = Number(element.dataset.eraImageCount) || images.length;
  const rawVariant = element.dataset.eraGridVariant;
  const variant: ImageGridVariant =
    rawVariant === "three-two" ||
    rawVariant === "two-three" ||
    rawVariant === "left-large" ||
    rawVariant === "right-large"
      ? rawVariant
      : getDefaultImageGridVariant(count);

  return { layoutId, images, count, variant };
}

export function replaceImageGridHtml(content: string, layoutId: string, nextHtml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const target = doc.querySelector(`[data-era-layout-id="${CSS.escape(layoutId)}"]`);

  if (!target) return `${content || ""}\n${nextHtml}`;

  const template = document.createElement("template");
  template.innerHTML = nextHtml.trim();
  const replacement = template.content.querySelector("[data-era-image-grid='true']");

  if (!replacement) return content;

  target.replaceWith(replacement);
  return doc.body.innerHTML;
}
