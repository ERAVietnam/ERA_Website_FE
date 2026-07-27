"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";
import parse, {
  type Element as HtmlElement,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { ImageCarousel } from "./ImageCarousel";
import type { ImageCarouselItem } from "./image-carousel-layout";

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
  },
};

export const RichTextContent = forwardRef<HTMLDivElement, RichTextContentProps>(
  function RichTextContent({ html, className, style }, forwardedRef) {
    const innerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(forwardedRef, () => innerRef.current as HTMLDivElement);

    const sanitizedHtml = sanitizeHtml(html);
    const content = parse(sanitizedHtml, parserOptions);

    return (
      <div ref={innerRef} className={className} style={style}>
        {content}
      </div>
    );
  }
);
