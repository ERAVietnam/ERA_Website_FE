"use client";

import { useRef, useEffect, useState } from "react";
import { colors, withOpacity } from "@/lib/theme";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Italic,
  Essentials,
  Paragraph,
  Link,
  List,
  Image,
  ImageUpload,
  ImageToolbar,
  ImageCaption,
  ImageTextAlternative,
  Heading,
  FontColor,
  FontBackgroundColor,
  Underline,
  Indent,
  IndentBlock,
  WordCount,
  Undo,
  Alignment,
  Table,
  TableToolbar,
  TableColumnResize,
  TableCellProperties,
  TableProperties,
  GeneralHtmlSupport,
  ButtonView,
  createDropdown,
  addListToDropdown,
  ViewModel,
  Collection,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import type { EditorConfig, PluginConstructor, Editor } from "@ckeditor/ckeditor5-core";
import type { HeadingConfig } from "@ckeditor/ckeditor5-heading";
import type { FileRepository } from "@ckeditor/ckeditor5-upload";
import {
  parseImageGridElement,
  replaceImageGridHtml,
  type ImageGridItem,
  type ImageGridVariant,
} from "./image-grid-layout";
import {
  parseImageCarouselElement,
  replaceImageCarouselHtml,
  type ImageCarouselItem,
} from "./image-carousel-layout";

type FileLoader = Parameters<NonNullable<FileRepository["createUploadAdapter"]>>[0];

class CustomUploadAdapter {
  loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: File | null) =>
        new Promise<{ default: string }>((resolve, reject) => {
          if (!file) {
            reject(new Error("Không tìm thấy file"));
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            resolve({ default: reader.result as string });
          };
          reader.onerror = (err) => {
            reject(err);
          };
          reader.readAsDataURL(file);
        })
    );
  }

  abort() {
    // no-op
  }
}

function CustomUploadAdapterPlugin(editor: Editor) {
  const fileRepo = editor.plugins.get("FileRepository") as FileRepository | undefined;
  if (fileRepo) {
    fileRepo.createUploadAdapter = (loader: FileLoader) => {
      return new CustomUploadAdapter(loader);
    };
  }
}

type ImageGridOpenHandler = (options: {
  mode: "insert" | "edit";
  layoutId?: string;
  count?: number;
  variant?: ImageGridVariant;
  images?: ImageGridItem[];
  insertHtml: (html: string) => void;
  replaceHtml: (layoutId: string, html: string) => void;
}) => void;

type ImageCarouselOpenHandler = (options: {
  mode: "insert" | "edit";
  carouselId?: string;
  items?: ImageCarouselItem[];
  insertHtml: (html: string) => void;
  replaceHtml: (carouselId: string, html: string) => void;
}) => void;

function ImageLayoutDropdownPlugin(editor: Editor) {
  editor.ui.componentFactory.add("imageLayout", (locale) => {
    const dropdownView = createDropdown(locale);

    dropdownView.buttonView.set({
      label: "Layout ảnh",
      tooltip: true,
      withText: true,
    });

    const items = new Collection<{ type: "button"; model: ViewModel }>();

    items.add({
      type: "button",
      model: new ViewModel({
        label: "Grid ảnh",
        withText: true,
        layout: "grid",
      }),
    });

    items.add({
      type: "button",
      model: new ViewModel({
        label: "List",
        withText: true,
        layout: "list",
      }),
    });

    items.add({
      type: "button",
      model: new ViewModel({
        label: "Carousel",
        withText: true,
        layout: "carousel",
      }),
    });

    addListToDropdown(dropdownView, items);

    dropdownView.on("execute", (eventInfo) => {
      const rawSource = (eventInfo as unknown as { source: unknown }).source;
      const layout =
        rawSource && typeof rawSource === "object" && "layout" in rawSource
          ? String((rawSource as { layout: unknown }).layout)
          : "";

      if (layout === "grid") {
        const open = editor.config.get("eraImageGrid.open" as never) as
          | ImageGridOpenHandler
          | undefined;

        if (!open) return;

        open({
          mode: "insert",
          insertHtml: (html: string) => {
            editor.model.change((writer) => {
              const viewFragment = editor.data.processor.toView(html);
              const gridFragment = editor.data.toModel(viewFragment);
              const fragment = writer.createDocumentFragment();

              writer.append(writer.createElement("paragraph"), fragment);

              for (const child of Array.from(gridFragment.getChildren())) {
                writer.append(child as Parameters<typeof writer.append>[0], fragment);
              }

              writer.append(writer.createElement("paragraph"), fragment);

              editor.model.insertContent(fragment);
            });
            editor.editing.view.focus();
          },
          replaceHtml: (layoutId: string, html: string) => {
            editor.setData(replaceImageGridHtml(editor.getData(), layoutId, html));
            editor.editing.view.focus();
          },
        });
      } else if (layout === "list") {
        // eslint-disable-next-line no-console
        console.log("List layout: chưa triển khai");
      } else if (layout === "carousel") {
        const open = editor.config.get("eraImageCarousel.open" as never) as
          | ImageCarouselOpenHandler
          | undefined;

        if (!open) return;

        open({
          mode: "insert",
          insertHtml: (html: string) => {
            editor.model.change((writer) => {
              const viewFragment = editor.data.processor.toView(html);
              const carouselFragment = editor.data.toModel(viewFragment);
              const fragment = writer.createDocumentFragment();

              writer.append(writer.createElement("paragraph"), fragment);

              for (const child of Array.from(carouselFragment.getChildren())) {
                writer.append(child as Parameters<typeof writer.append>[0], fragment);
              }

              writer.append(writer.createElement("paragraph"), fragment);

              editor.model.insertContent(fragment);
            });
            editor.editing.view.focus();
          },
          replaceHtml: (carouselId: string, html: string) => {
            editor.setData(replaceImageCarouselHtml(editor.getData(), carouselId, html));
            editor.editing.view.focus();
          },
        });
      }
    });

    return dropdownView;
  });
}

const baseFontColorConfig = {
  colors: [
    { color: colors.neutral.black, label: "Đen" },
    { color: colors.gray[500], label: "Xám" },
    { color: colors.primary.DEFAULT, label: "Đỏ" },
    { color: colors.primary.navy.DEFAULT, label: "Navy" },
    { color: colors.secondary.DEFAULT, label: "Xanh dương" },
    { color: colors.tertiary.orange.DEFAULT, label: "Cam" },
    { color: colors.tertiary.purple.DEFAULT, label: "Tím" },
  ],
  columns: 7,
};

const baseHeadingConfig = {
  options: [
    { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
    { model: "heading1", view: "h1", title: "H1", class: "ck-heading_heading1" },
    { model: "heading2", view: "h2", title: "H2", class: "ck-heading_heading2" },
    { model: "heading3", view: "h3", title: "H3", class: "ck-heading_heading3" },
    { model: "heading4", view: "h4", title: "H4", class: "ck-heading_heading4" },
    { model: "heading5", view: "h5", title: "H5", class: "ck-heading_heading5" },
    { model: "heading6", view: "h6", title: "H6", class: "ck-heading_heading6" },
  ],
} satisfies HeadingConfig;

class CustomEditor extends ClassicEditor {
  static builtinPlugins = [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Link,
    List,
    Image,
    ImageUpload,
    ImageToolbar,
    ImageCaption,
    ImageTextAlternative,
    Heading,
    FontColor,
    Indent,
    IndentBlock,
    WordCount,
    Undo,
    Alignment,
    Underline,
    FontBackgroundColor,
    Table,
    TableToolbar,
    TableColumnResize,
    TableCellProperties,
    TableProperties,
    GeneralHtmlSupport,
    ImageLayoutDropdownPlugin,
    CustomUploadAdapterPlugin,
  ] as PluginConstructor[];

  static defaultConfig = {
    licenseKey: "GPL",
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "link",
      "imageUpload",
      "|",
      "bulletedList",
      "numberedList",
      "indent",
      "outdent",
      "|",
      "alignment",
      "|",
      "undo",
      "redo",
    ],
    fontColor: baseFontColorConfig,
    heading: baseHeadingConfig,
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "|",
        "tableCellProperties",
        "tableProperties",
      ],
      columnResize: { unit: "px" },
    },
    htmlSupport: {
      allow: [
        {
          name: /^(p|div|figure|img|span|br)$/,
          attributes: true,
          classes: true,
        },
      ],
    },
  } as EditorConfig;
}

class PlainEditor extends ClassicEditor {
  static builtinPlugins = [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Link,
    List,
    Heading,
    FontColor,
    Indent,
    IndentBlock,
    WordCount,
    Undo,
    Alignment,
    Underline,
    FontBackgroundColor,
  ] as PluginConstructor[];

  static defaultConfig = {
    licenseKey: "GPL",
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "fontColor",
      "|",
      "link",
      "|",
      "bulletedList",
      "numberedList",
      "indent",
      "outdent",
      "|",
      "alignment",
      "|",
      "undo",
      "redo",
    ],
    fontColor: baseFontColorConfig,
    heading: baseHeadingConfig,
  } as EditorConfig;
}

function getImageGridSnapshots(html: string) {
  if (typeof DOMParser === "undefined") return new Map<string, string>();

  const doc = new DOMParser().parseFromString(html, "text/html");
  const snapshots = new Map<string, string>();

  doc.querySelectorAll<HTMLElement>("[data-era-image-grid='true']").forEach((grid) => {
    const layoutId = grid.dataset.eraLayoutId;
    if (layoutId) {
      snapshots.set(layoutId, grid.outerHTML);
    }
  });

  return snapshots;
}

export default function RichEditor({
  value,
  onChange,
  disabled = false,
  disableImage = false,
  disableFontColor = false,
  compact = false,
  onOpenImageGrid,
  onOpenImageCarousel,
  onOpenImageList,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  disableImage?: boolean;
  disableFontColor?: boolean;
  compact?: boolean;
  onOpenImageGrid?: ImageGridOpenHandler;
  onOpenImageCarousel?: ImageCarouselOpenHandler;
  onOpenImageList?: () => void;
}) {
  const wordCountRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);
  const isLocalChangeRef = useRef(false);
  const disabledRef = useRef(disabled);
  const lastSafeDataRef = useRef(value);
  const allowGridMutationRef = useRef(false);
  const [displayData, setDisplayData] = useState(value);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  useEffect(() => {
    const styleId = "ckeditor-custom-height";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .ck-editor__editable_inline {
          min-height: 300px !important;
          height: auto !important;
          overflow-y: visible !important;
        }
        .richtext-editor .ck-editor__editable_inline {
          font-size: 18px !important;
          font-weight: 400 !important;
          line-height: 1.75 !important;
        }
        .richtext-editor .ck-editor__editable_inline h1 {
          font-size: 26px !important;
          font-weight: 800 !important;
          line-height: 1.3 !important;
        }
        .richtext-editor .ck-editor__editable_inline h2 {
          font-size: 24px !important;
          font-weight: 700 !important;
          line-height: 1.35 !important;
        }
        .richtext-editor .ck-editor__editable_inline h3 {
          font-size: 22px !important;
          font-weight: 700 !important;
          line-height: 1.4 !important;
        }
        .richtext-editor .ck-editor__editable_inline h4,
        .richtext-editor .ck-editor__editable_inline h5,
        .richtext-editor .ck-editor__editable_inline h6 {
          font-size: 18px !important;
          font-weight: 600 !important;
          line-height: 1.45 !important;
        }
        .richtext-editor .ck-editor__editable_inline p,
        .richtext-editor .ck-editor__editable_inline ul,
        .richtext-editor .ck-editor__editable_inline ol,
        .richtext-editor .ck-editor__editable_inline blockquote {
          font-size: inherit !important;
          line-height: inherit !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
          margin: 0.75rem 0 !important;
          padding: 0.5rem !important;
          border: 1px dashed #d1d5db !important;
          border-radius: 14px !important;
          background: #f9fafb !important;
          cursor: default;
          user-select: none !important;
          position: relative;
          align-items: start !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="2"] {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="3"],
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="6"] {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="4"] {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="5"] {
          grid-template-columns: repeat(6, minmax(0, 1fr));
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="5"] > .era-image-grid__item {
          grid-column: span 2;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="5"][data-era-grid-variant="two-three"] > .era-image-grid__item:nth-child(-n + 2),
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="5"]:not([data-era-grid-variant]) > .era-image-grid__item:nth-child(-n + 2) {
          grid-column: span 3;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="5"][data-era-grid-variant="three-two"] > .era-image-grid__item:nth-child(n + 4) {
          grid-column: span 3;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid::before {
          content: "Grid hình ảnh - bấm để sửa";
          grid-column: 1 / -1;
          color: #6b7280;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.4;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid__edit,
        .richtext-editor .ck-editor__editable_inline .era-image-grid__delete {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: absolute !important;
          top: 0.5rem !important;
          right: 0.5rem !important;
          z-index: 2 !important;
          border: 0 !important;
          border-radius: 999px !important;
          background: #111827 !important;
          color: #ffffff !important;
          padding: 0.35rem 0.75rem !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          cursor: pointer !important;
          pointer-events: auto !important;
          user-select: none !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid__edit {
          right: 3.75rem !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid__delete {
          right: 0.5rem !important;
          background: #dc2626 !important;
        }
        .richtext-editor--disabled .ck-editor__editable_inline .era-image-grid__edit {
          display: none !important;
        }
        .richtext-editor--disabled .ck-editor__editable_inline .era-image-grid__delete {
          display: none !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid__item {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          align-self: start !important;
          margin: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="2"] > .era-image-grid__item img,
        .richtext-editor .ck-editor__editable_inline .era-image-grid[data-era-image-count="3"] > .era-image-grid__item img {
          aspect-ratio: 16 / 9;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid__item > p {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          line-height: 0 !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid__item img {
          width: 100% !important;
          height: auto !important;
          object-fit: cover;
          object-position: top right;
          margin: 0 !important;
          display: block !important;
          pointer-events: none !important;
          user-select: none !important;
          aspect-ratio: 4 / 3;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid__caption {
          display: block !important;
          width: 100% !important;
          margin-top: 0 !important;
          padding: 0.5rem !important;
          text-align: center !important;
          font-size: 18px !important;
          font-style: italic !important;
          color: #4b5563 !important;
          line-height: 1.4 !important;
          background-color: #f3f4f6 !important;
          box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1) !important;
          clear: both;
        }
        .richtext-editor .ck-editor__editable_inline p.era-image-grid-spacer {
          display: block !important;
          min-height: 1.75em !important;
          line-height: 1.75 !important;
          margin: 0 !important;
          padding: 0 !important;
          cursor: text !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-grid-spacer::before {
          content: "";
          display: inline-block;
          min-width: 1px;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel {
          display: flex !important;
          flex-direction: column !important;
          margin: 0.75rem 0 !important;
          padding: 0.75rem !important;
          border: 1px dashed #d1d5db !important;
          border-radius: 14px !important;
          background: #f9fafb !important;
          cursor: default;
          user-select: none !important;
          position: relative;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          margin-bottom: 0.75rem !important;
          flex-shrink: 0 !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__label {
          color: #6b7280;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.4;
          pointer-events: none;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__actions {
          display: flex !important;
          align-items: center !important;
          gap: 0.25rem !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__edit,
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__delete {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: static !important;
          border: 0 !important;
          border-radius: 999px !important;
          background: #111827 !important;
          color: #ffffff !important;
          padding: 0.35rem 0.75rem !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          cursor: pointer !important;
          pointer-events: auto !important;
          user-select: none !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__delete {
          background: #dc2626 !important;
        }
        .richtext-editor--disabled .ck-editor__editable_inline .era-image-carousel__edit,
        .richtext-editor--disabled .ck-editor__editable_inline .era-image-carousel__delete {
          display: none !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__track {
          display: flex !important;
          gap: 0.5rem !important;
          overflow-x: auto !important;
          align-items: start !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__item {
          flex: 0 0 auto !important;
          width: 280px !important;
          max-width: 280px !important;
          margin: 0 !important;
          padding: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
          overflow: hidden;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__item > p,
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__item figure {
          display: block !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          line-height: 0 !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__item img {
          width: 100% !important;
          height: auto !important;
          object-fit: cover;
          object-position: top right;
          margin: 0 !important;
          display: block !important;
          pointer-events: none !important;
          user-select: none !important;
          aspect-ratio: 4 / 3;
          border-radius: 0 !important;
        }
        .richtext-editor .ck-editor__editable_inline .era-image-carousel__item .era-image-carousel__caption {
          display: block !important;
          width: 100% !important;
          margin: 0 !important;
          margin-top: 0 !important;
          padding: 0.5rem !important;
          text-align: center !important;
          font-size: 18px !important;
          font-weight: 400 !important;
          font-style: italic !important;
          color: #4b5563 !important;
          line-height: 1.4 !important;
          background-color: #f3f4f6 !important;
          box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1) !important;
          clear: both;
        }
        .richtext-editor .ck-editor__editable_inline figure figcaption,
        .richtext-editor .ck-editor__editable_inline .ck-content figure figcaption,
        .richtext-editor .ck-editor__editable_inline .ck-editor__image-caption,
        .richtext-editor .ck-editor__editable_inline .ck-editor__image-caption_focused,
        .richtext-editor .ck-editor__editable_inline figcaption.ck-editor__image-caption_focused {
          display: block !important;
          width: 100% !important;
          margin: 0 !important;
          margin-top: 0 !important;
          padding: 0.5rem !important;
          text-align: center !important;
          font-size: 18px !important;
          font-weight: 400 !important;
          font-style: italic !important;
          color: #4b5563 !important;
          line-height: 1.4 !important;
          background-color: #f3f4f6 !important;
          box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1) !important;
        }
        .faq-rich-editor .ck-editor__editable_inline {
          min-height: calc(4 * 1.5em + 2rem) !important;
          height: auto !important;
          overflow-y: visible !important;
          color: ${colors.gray[500]} !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Tránh CKEditor bị setData trong lúc ngưởi dùng đang gõ gây lỗi
  // model-nodelist-offset-out-of-bounds.
  useEffect(() => {
    if (isLocalChangeRef.current) {
      isLocalChangeRef.current = false;
      return;
    }
    if (!isFocusedRef.current && value !== displayData) {
      setDisplayData(value);
      lastSafeDataRef.current = value;
    }
  }, [value, displayData]);

  const toolbarItems = compact
    ? [
        "bold",
        "italic",
        "underline",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "alignment",
        "|",
        "undo",
        "redo",
      ]
    : [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        ...(disableFontColor ? [] : ["fontColor", "fontBackgroundColor"]),
        "|",
        "link",
        ...(disableImage ? [] : [...(onOpenImageGrid ? ["imageLayout"] : []), "imageUpload"]),
        "|",
        "bulletedList",
        "numberedList",
        "indent",
        "outdent",
        "|",
        "alignment",
        "|",
        "insertTable",
        "|",
        "undo",
        "redo",
      ];

  const handleOpenImageGrid: ImageGridOpenHandler | undefined = onOpenImageGrid
    ? (options) => {
        onOpenImageGrid({
          ...options,
          insertHtml: (html) => {
            allowGridMutationRef.current = true;
            options.insertHtml(html);
          },
          replaceHtml: (layoutId, html) => {
            allowGridMutationRef.current = true;
            options.replaceHtml(layoutId, html);
          },
        });
      }
    : undefined;

  const handleOpenImageCarousel: ImageCarouselOpenHandler | undefined = onOpenImageCarousel
    ? (options) => {
        onOpenImageCarousel({
          ...options,
          insertHtml: (html) => {
            allowGridMutationRef.current = true;
            options.insertHtml(html);
          },
          replaceHtml: (carouselId, html) => {
            allowGridMutationRef.current = true;
            options.replaceHtml(carouselId, html);
          },
        });
      }
    : undefined;

  return (
    <div
      className={`${compact ? "faq-rich-editor" : "richtext-editor"} ${
        disabled ? "richtext-editor--disabled" : ""
      }`}
    >
      <CKEditor
        editor={disableImage ? PlainEditor : CustomEditor}
        data={displayData}
        disabled={disabled}
        config={
          {
            toolbar: toolbarItems,
            eraImageGrid: { open: handleOpenImageGrid },
            eraImageCarousel: { open: handleOpenImageCarousel },
          } as EditorConfig
        }
        onChange={(_event, editor) => {
          const data = editor.getData();
          const previousGridSnapshots = getImageGridSnapshots(lastSafeDataRef.current);
          const nextGridSnapshots = getImageGridSnapshots(data);
          const hasProtectedGridMutation = Array.from(previousGridSnapshots.entries()).some(
            ([layoutId, previousHtml]) =>
              nextGridSnapshots.has(layoutId) && nextGridSnapshots.get(layoutId) !== previousHtml
          );
          const gridMutationWithoutModal =
            previousGridSnapshots.size > 0 &&
            hasProtectedGridMutation &&
            !allowGridMutationRef.current;

          if (gridMutationWithoutModal) {
            editor.setData(lastSafeDataRef.current);
            isLocalChangeRef.current = true;
            setDisplayData(lastSafeDataRef.current);
            onChange(lastSafeDataRef.current);
            return;
          }

          allowGridMutationRef.current = false;
          lastSafeDataRef.current = data;
          isLocalChangeRef.current = true;
          setDisplayData(data);
          onChange(data);
        }}
        onFocus={() => {
          isFocusedRef.current = true;
        }}
        onBlur={() => {
          isFocusedRef.current = false;
        }}
        onReady={(editor) => {
          const editableElement = (editor.ui.view.editable.element ?? null) as HTMLElement | null;

          const placeCaretInSpacer = (element: HTMLElement, prefer: "before" | "after" = "after") => {
            if (!editableElement) return;
            const spacer =
              prefer === "before"
                ? element.previousElementSibling
                : element.nextElementSibling;
            const fallbackSpacer =
              prefer === "before"
                ? element.nextElementSibling
                : element.previousElementSibling;
            const target =
              spacer?.classList.contains("era-image-grid-spacer")
                ? spacer
                : fallbackSpacer?.classList.contains("era-image-grid-spacer")
                ? fallbackSpacer
                : null;

            if (!target) return;

            target.scrollIntoView({ block: "nearest" });
            const range = document.createRange();
            range.selectNodeContents(target);
            range.collapse(false);

            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
            editableElement.focus();
          };

          if (editableElement && handleOpenImageGrid && !disableImage) {
            const isSelectionInsideGrid = () => {
              const selection = window.getSelection();
              const node = selection?.anchorNode;
              const element =
                node instanceof HTMLElement ? node : node?.parentElement ?? null;
              return !!element?.closest("[data-era-image-grid='true']");
            };

            const placeCaretInGridSpacer = (gridElement: HTMLElement, prefer: "before" | "after" = "after") => {
              placeCaretInSpacer(gridElement, prefer);
            };

            let lastGridEditorOpenAt = 0;
            const openGridEditor = (event: Event) => {
              if (disabledRef.current) return;

              const target = event.target as HTMLElement | null;
              const editButton = target?.closest("[data-era-grid-edit='true']") as HTMLElement | null;
              if (!editButton) return;

              const gridElement = editButton.closest("[data-era-image-grid='true']") as HTMLElement | null;
              if (!gridElement) return;

              const parsedGrid = parseImageGridElement(gridElement);
              if (!parsedGrid) return;

              const now = Date.now();
              if (now - lastGridEditorOpenAt < 300) {
                event.preventDefault();
                event.stopPropagation();
                return;
              }
              lastGridEditorOpenAt = now;

              event.preventDefault();
              event.stopPropagation();
              handleOpenImageGrid({
                mode: "edit",
                layoutId: parsedGrid.layoutId,
                count: parsedGrid.count,
                variant: parsedGrid.variant,
                images: parsedGrid.images,
                insertHtml: (html: string) => {
                  const viewFragment = editor.data.processor.toView(html);
                  const modelFragment = editor.data.toModel(viewFragment);
                  editor.model.insertContent(modelFragment);
                  editor.editing.view.focus();
                },
                replaceHtml: (layoutId: string, html: string) => {
                  editor.setData(replaceImageGridHtml(editor.getData(), layoutId, html));
                  editor.editing.view.focus();
                },
              });
            };

            editableElement.addEventListener("pointerdown", openGridEditor, true);
            editableElement.addEventListener("click", openGridEditor, true);

            const deleteGrid = (event: Event) => {
              if (disabledRef.current) return;

              const target = event.target as HTMLElement | null;
              const deleteButton = target?.closest("[data-era-grid-delete='true']") as HTMLElement | null;
              if (!deleteButton) return;

              const gridElement = deleteButton.closest("[data-era-image-grid='true']") as HTMLElement | null;
              const layoutId = gridElement?.dataset.eraLayoutId;
              if (!gridElement || !layoutId) return;

              event.preventDefault();
              event.stopPropagation();

              allowGridMutationRef.current = true;

              const parser = new DOMParser();
              const doc = parser.parseFromString(editor.getData(), "text/html");
              const targetGrid = doc.querySelector(`[data-era-layout-id="${CSS.escape(layoutId)}"]`);

              if (!targetGrid) return;

              const previousSibling = targetGrid.previousElementSibling;
              const nextSibling = targetGrid.nextElementSibling;

              if (previousSibling?.classList.contains("era-image-grid-spacer")) {
                previousSibling.remove();
              }
              if (nextSibling?.classList.contains("era-image-grid-spacer")) {
                nextSibling.remove();
              }
              targetGrid.remove();

              editor.setData(doc.body.innerHTML || "<p><br></p>");
              editor.editing.view.focus();
            };

            editableElement.addEventListener("pointerdown", deleteGrid, true);
            editableElement.addEventListener("click", deleteGrid, true);

            const redirectGridPointerToSpacer = (event: PointerEvent | MouseEvent) => {
              const target = event.target as HTMLElement | null;
              if (
                !target ||
                target.closest("[data-era-grid-edit='true']") ||
                target.closest("[data-era-grid-delete='true']")
              ) {
                return;
              }

              const gridElement = target.closest("[data-era-image-grid='true']") as HTMLElement | null;
              if (!gridElement) return;

              event.preventDefault();
              event.stopPropagation();
              placeCaretInGridSpacer(gridElement, "before");
            };

            editableElement.addEventListener("pointerdown", redirectGridPointerToSpacer, true);
            editableElement.addEventListener("mousedown", redirectGridPointerToSpacer, true);

            const redirectGridSelectionToSpacer = () => {
              if (disabledRef.current) return;
              if (!isFocusedRef.current) return;

              const selection = window.getSelection();
              const node = selection?.anchorNode;
              const element = node instanceof HTMLElement ? node : node?.parentElement ?? null;
              const gridElement = element?.closest("[data-era-image-grid='true']") as HTMLElement | null;
              const editButton = element?.closest("[data-era-grid-edit='true']");

              if (!gridElement || editButton) return;

              placeCaretInGridSpacer(gridElement, "before");
            };

            document.addEventListener("selectionchange", redirectGridSelectionToSpacer);
            editor.on("destroy", () => {
              document.removeEventListener("selectionchange", redirectGridSelectionToSpacer);
            });

            editableElement.addEventListener("keydown", (event) => {
              const target = event.target as HTMLElement | null;
              if (
                (event.key === "Enter" || event.key === " ") &&
                target?.closest("[data-era-grid-edit='true']")
              ) {
                openGridEditor(event);
                return;
              }
              if (
                (event.key === "Enter" || event.key === " ") &&
                target?.closest("[data-era-grid-delete='true']")
              ) {
                deleteGrid(event);
                return;
              }

              if ((event.key === "Backspace" || event.key === "Delete") && isSelectionInsideGrid()) {
                event.preventDefault();
                event.stopPropagation();
              }
            });

            const preventGridDragDrop = (event: DragEvent) => {
              const target = event.target as HTMLElement | null;
              if (!target?.closest("[data-era-image-grid='true']")) return;
              event.preventDefault();
              event.stopPropagation();
            };

            editableElement.addEventListener("dragstart", preventGridDragDrop, true);
            editableElement.addEventListener("dragover", preventGridDragDrop, true);
            editableElement.addEventListener("drop", preventGridDragDrop, true);
          }

          if (editableElement && handleOpenImageCarousel && !disableImage) {
            let lastCarouselEditorOpenAt = 0;

            const openCarouselEditor = (event: Event) => {
              if (disabledRef.current) return;

              const target = event.target as HTMLElement | null;
              const editButton = target?.closest("[data-era-carousel-edit='true']") as HTMLElement | null;
              if (!editButton) return;

              const carouselElement = editButton.closest("[data-era-image-carousel='true']") as HTMLElement | null;
              if (!carouselElement) return;

              const parsedCarousel = parseImageCarouselElement(carouselElement);
              if (!parsedCarousel) return;

              const now = Date.now();
              if (now - lastCarouselEditorOpenAt < 300) {
                event.preventDefault();
                event.stopPropagation();
                return;
              }
              lastCarouselEditorOpenAt = now;

              event.preventDefault();
              event.stopPropagation();
              handleOpenImageCarousel({
                mode: "edit",
                carouselId: parsedCarousel.carouselId,
                items: parsedCarousel.items,
                insertHtml: (html: string) => {
                  const viewFragment = editor.data.processor.toView(html);
                  const modelFragment = editor.data.toModel(viewFragment);
                  editor.model.insertContent(modelFragment);
                  editor.editing.view.focus();
                },
                replaceHtml: (carouselId: string, html: string) => {
                  editor.setData(replaceImageCarouselHtml(editor.getData(), carouselId, html));
                  editor.editing.view.focus();
                },
              });
            };

            editableElement.addEventListener("pointerdown", openCarouselEditor, true);
            editableElement.addEventListener("click", openCarouselEditor, true);

            const deleteCarousel = (event: Event) => {
              if (disabledRef.current) return;

              const target = event.target as HTMLElement | null;
              const deleteButton = target?.closest("[data-era-carousel-delete='true']") as HTMLElement | null;
              if (!deleteButton) return;

              const carouselElement = deleteButton.closest("[data-era-image-carousel='true']") as HTMLElement | null;
              const carouselId = carouselElement?.dataset.eraCarouselId;
              if (!carouselElement || !carouselId) return;

              event.preventDefault();
              event.stopPropagation();

              allowGridMutationRef.current = true;

              const parser = new DOMParser();
              const doc = parser.parseFromString(editor.getData(), "text/html");
              const targetCarousel = doc.querySelector(`[data-era-carousel-id="${CSS.escape(carouselId)}"]`);

              if (!targetCarousel) return;

              const previousSibling = targetCarousel.previousElementSibling;
              const nextSibling = targetCarousel.nextElementSibling;

              if (previousSibling?.classList.contains("era-image-grid-spacer")) {
                previousSibling.remove();
              }
              if (nextSibling?.classList.contains("era-image-grid-spacer")) {
                nextSibling.remove();
              }
              targetCarousel.remove();

              editor.setData(doc.body.innerHTML || "<p><br></p>");
              editor.editing.view.focus();
            };

            editableElement.addEventListener("pointerdown", deleteCarousel, true);
            editableElement.addEventListener("click", deleteCarousel, true);

            const redirectCarouselPointerToSpacer = (event: PointerEvent | MouseEvent) => {
              const target = event.target as HTMLElement | null;
              if (
                !target ||
                target.closest("[data-era-carousel-edit='true']") ||
                target.closest("[data-era-carousel-delete='true']")
              ) {
                return;
              }

              const carouselElement = target.closest("[data-era-image-carousel='true']") as HTMLElement | null;
              if (!carouselElement) return;

              event.preventDefault();
              event.stopPropagation();
              placeCaretInSpacer(carouselElement, "before");
            };

            editableElement.addEventListener("pointerdown", redirectCarouselPointerToSpacer, true);
            editableElement.addEventListener("mousedown", redirectCarouselPointerToSpacer, true);

            editableElement.addEventListener("keydown", (event) => {
              if (
                (event.key === "Enter" || event.key === " ") &&
                (event.target as HTMLElement)?.closest("[data-era-carousel-edit='true']")
              ) {
                openCarouselEditor(event);
                return;
              }
              if (
                (event.key === "Enter" || event.key === " ") &&
                (event.target as HTMLElement)?.closest("[data-era-carousel-delete='true']")
              ) {
                deleteCarousel(event);
                return;
              }
            });
          }

          if (wordCountRef.current) {
            wordCountRef.current.innerHTML = "";
            const wordCountPlugin = editor.plugins.get("WordCount") as WordCount;
            if (wordCountPlugin && wordCountPlugin.wordCountContainer) {
              wordCountRef.current.appendChild(wordCountPlugin.wordCountContainer);
            }
          }
        }}
      />
      {!compact && (
        <div
          ref={wordCountRef}
          className="flex justify-end px-3 py-1.5 text-xs"
          style={{
            color: colors.gray[400],
            borderTop: `1px solid ${colors.gray[100]}`,
            backgroundColor: withOpacity(colors.gray[50], 0.5),
          }}
        />
      )}
    </div>
  );
}
