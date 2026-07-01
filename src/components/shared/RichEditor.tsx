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
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import type { EditorConfig, PluginConstructor, Editor } from "@ckeditor/ckeditor5-core";
import type { HeadingConfig } from "@ckeditor/ckeditor5-heading";
import type { FileRepository } from "@ckeditor/ckeditor5-upload";

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

export default function RichEditor({
  value,
  onChange,
  disabled = false,
  disableImage = false,
  disableFontColor = false,
  compact = false,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  disableImage?: boolean;
  disableFontColor?: boolean;
  compact?: boolean;
}) {
  const wordCountRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);
  const isLocalChangeRef = useRef(false);
  const [displayData, setDisplayData] = useState(value);

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
        .faq-rich-editor .ck-editor__editable_inline {
          min-height: calc(4 * 1.5em + 2rem) !important;
          height: auto !important;
          overflow-y: visible !important;
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
        ...(disableImage ? [] : ["imageUpload"]),
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

  return (
    <div className={compact ? "faq-rich-editor" : undefined}>
      <CKEditor
        editor={disableImage ? PlainEditor : CustomEditor}
        data={displayData}
        disabled={disabled}
        config={{ toolbar: toolbarItems }}
        onChange={(_event, editor) => {
          const data = editor.getData();
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
