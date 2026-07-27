export interface ImageCarouselItem {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function createImageCarouselId() {
  return `carousel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function buildImageCarouselHtml(
  items: ImageCarouselItem[],
  carouselId = createImageCarouselId()
) {
  const figures = items
    .map((item, index) => {
      const alt = item.alt?.trim() ?? "";
      const caption = item.caption?.trim();
      return `
        <figure class="era-image-carousel__item" contenteditable="false">
          <img src="${escapeAttribute(item.src)}" alt="${escapeAttribute(alt)}" draggable="false" />
          ${caption ? `<div class="era-image-carousel__caption">${caption}</div>` : ""}
        </figure>`;
    })
    .join("");

  return `
    <div class="era-image-carousel" data-era-image-carousel="true" data-era-carousel-id="${escapeAttribute(carouselId)}" contenteditable="false">
      <div class="era-image-carousel__header" contenteditable="false">
        <span class="era-image-carousel__label">Carousel hình ảnh - bấm để sửa</span>
        <div class="era-image-carousel__actions" contenteditable="false">
          <span role="button" tabindex="0" class="era-image-carousel__edit" data-era-carousel-edit="true" contenteditable="false">Sửa</span>
          <span role="button" tabindex="0" class="era-image-carousel__delete" data-era-carousel-delete="true" contenteditable="false">Xóa</span>
        </div>
      </div>
      <div class="era-image-carousel__track" contenteditable="false">
        ${figures}
      </div>
    </div>`;
}

export function parseImageCarouselElement(element: HTMLElement): {
  carouselId: string;
  items: ImageCarouselItem[];
} | null {
  if (!element.matches("[data-era-image-carousel='true']")) return null;

  const carouselId = element.dataset.eraCarouselId || createImageCarouselId();
  const track = element.querySelector<HTMLElement>(".era-image-carousel__track");
  const figures = Array.from(track?.querySelectorAll<HTMLElement>("figure") ?? []);
  const items = figures
    .map((figure) => {
      const img = figure.querySelector("img");
      const caption = figure.querySelector(".era-image-carousel__caption");
      return {
        id: `carousel-item-${Math.random().toString(36).slice(2, 8)}`,
        src: img?.getAttribute("src") || "",
        alt: img?.getAttribute("alt") || "",
        caption: caption?.textContent || "",
      };
    })
    .filter((item) => item.src);

  return { carouselId, items };
}

export function replaceImageCarouselHtml(content: string, carouselId: string, nextHtml: string) {
  if (typeof DOMParser === "undefined") return `${content || ""}\n${nextHtml}`;

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const target = doc.querySelector(`[data-era-carousel-id="${CSS.escape(carouselId)}"]`);

  if (!target) return `${content || ""}\n${nextHtml}`;

  const template = document.createElement("template");
  template.innerHTML = nextHtml.trim();
  const replacement = template.content.querySelector("[data-era-image-carousel='true']");

  if (!replacement) return content;

  target.replaceWith(replacement);
  return doc.body.innerHTML;
}
