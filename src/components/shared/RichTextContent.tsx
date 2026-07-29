"use client";

import { forwardRef, useRef, useImperativeHandle, useState, useCallback } from "react";
import parse, {
  type Element as HtmlElement,
  type HTMLReactParserOptions,
} from "html-react-parser";
import Lightbox from "yet-another-react-lightbox";
import { ImageCarousel } from "./ImageCarousel";
import type { ImageCarouselItem } from "./image-carousel-layout";
import "yet-another-react-lightbox/styles.css";

interface RichTextContentProps {
  html: string;
  className?: string;
  style?: React.CSSProperties;
}

function isHtmlElement(node: unknown): node is HtmlElement {
  return (
    typeof node === "object" &&
    node !== null &&
    (node as HtmlElement).type === "tag"
  );
}

function sanitizeHtml(html: string) {
  // Loại bỏ contenteditable attribute để tránh React cảnh báo
  // khi render HTML từ CKEditor dưới dạng React elements.
  return html
    .replace(/\scontenteditable=["'][^"']*["']/gi, "")
    .replace(/\scontenteditable(?=[\s>])/gi, "");
}

function extractTextContent(node: HtmlElement): string {
  return node.children
    .map((child) => {
      if (typeof child === "string") return child;
      if ((child as { type?: string }).type === "text") {
        return (child as { data?: string }).data || "";
      }
      if (isHtmlElement(child)) {
        return extractTextContent(child);
      }
      return "";
    })
    .join("");
}

function extractCarouselItems(node: HtmlElement): ImageCarouselItem[] {
  const figures: HtmlElement[] = [];

  function collectFigures(n: HtmlElement) {
    for (const child of n.children) {
      if (!isHtmlElement(child)) continue;
      if (child.name === "figure") {
        figures.push(child);
      } else {
        collectFigures(child);
      }
    }
  }
  collectFigures(node);

  return figures
    .map((figure) => {
      let img: HtmlElement | undefined;
      let captionEl: HtmlElement | undefined;

      function findElements(n: HtmlElement) {
        for (const child of n.children) {
          if (!isHtmlElement(child)) continue;
          if (child.name === "img" && !img) img = child;
          if (
            child.attribs.class?.includes("era-image-carousel__caption") &&
            !captionEl
          ) {
            captionEl = child;
          }
          findElements(child);
        }
      }
      findElements(figure);

      return {
        id: `carousel-item-${Math.random().toString(36).slice(2, 8)}`,
        src: img?.attribs.src || "",
        alt: img?.attribs.alt || "",
        caption: captionEl ? extractTextContent(captionEl) : "",
      };
    })
    .filter((item) => item.src);
}

interface ClickableImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

function ClickableImage({ src, alt, className, style, onClick }: ClickableImageProps) {
  return (
    <img
      src={src}
      alt={alt || ""}
      className={className}
      style={{ ...style, cursor: "zoom-in" }}
      onClick={onClick}
    />
  );
}

export const RichTextContent = forwardRef<HTMLDivElement, RichTextContentProps>(
  function RichTextContent({ html, className, style }, forwardedRef) {
    const innerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(forwardedRef, () => innerRef.current as HTMLDivElement);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxSlide, setLightboxSlide] = useState<{ src: string; alt: string }>({
      src: "",
      alt: "",
    });

    const openLightbox = useCallback((src: string, alt: string) => {
      setLightboxSlide({ src, alt });
      setLightboxOpen(true);
    }, []);

    const parserOptions: HTMLReactParserOptions = {
      replace: (node) => {
        if (
          isHtmlElement(node) &&
          node.attribs["data-era-image-carousel"] === "true"
        ) {
          const items = extractCarouselItems(node);
          if (items.length === 0) return;
          return <ImageCarousel items={items} />;
        }

        if (isHtmlElement(node) && node.name === "img") {
          const { src, alt, class: classNameAttr, style: styleAttr } = node.attribs;
          if (!src) return;

          const parsedStyle = styleAttr
            ? styleAttr.split(";").reduce<React.CSSProperties>((acc, declaration) => {
                const [property, value] = declaration.split(":").map((s) => s.trim());
                if (property && value) {
                  const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                  (acc as Record<string, string>)[camelProperty] = value;
                }
                return acc;
              }, {})
            : undefined;

          return (
            <ClickableImage
              src={src}
              alt={alt}
              className={classNameAttr}
              style={parsedStyle}
              onClick={() => openLightbox(src, alt || "")}
            />
          );
        }
      },
    };

    const sanitizedHtml = sanitizeHtml(html);
    const content = parse(sanitizedHtml, parserOptions);

    return (
      <>
        <div ref={innerRef} className={className} style={style}>
          {content}
        </div>
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[{ src: lightboxSlide.src, alt: lightboxSlide.alt }]}
          controller={{ closeOnBackdropClick: true, disableSwipeNavigation: true }}
          carousel={{ finite: true, preload: 0 }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      </>
    );
  }
);
