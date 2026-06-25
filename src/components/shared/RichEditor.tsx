"use client";

import { useRef, useEffect } from "react";
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
  Indent,
  IndentBlock,
  WordCount,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

class CustomUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise<{ default: string }>((resolve, reject) => {
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

function CustomUploadAdapterPlugin(editor: any) {
  const fileRepo = editor.plugins.get("FileRepository");
  if (fileRepo) {
    fileRepo.createUploadAdapter = (loader: any) => {
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
  ] as any,
};

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
    CustomUploadAdapterPlugin,
  ] as any;

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
      "imageUpload",
      "|",
      "bulletedList",
      "numberedList",
      "indent",
      "outdent",
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
  } as any;
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
  ] as any;

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
      "undo",
      "redo",
    ],
    fontColor: baseFontColorConfig,
    heading: baseHeadingConfig,
  } as any;
}

export default function RichEditor({
  value,
  onChange,
  disabled = false,
  disableImage = false,
  disableFontColor = false,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  disableImage?: boolean;
  disableFontColor?: boolean;
}) {
  const wordCountRef = useRef<HTMLDivElement>(null);

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
      `;
      document.head.appendChild(style);
    }
  }, []);

  const toolbarItems = [
    "heading",
    "|",
    "bold",
    "italic",
    ...(disableFontColor ? [] : ["fontColor"]),
    "|",
    "link",
    ...(disableImage ? [] : ["imageUpload"]),
    "|",
    "bulletedList",
    "numberedList",
    "indent",
    "outdent",
    "|",
    "undo",
    "redo",
  ];

  return (
    <div>
      <CKEditor
        editor={(disableImage ? PlainEditor : CustomEditor) as never}
        data={value}
        disabled={disabled}
        config={{ toolbar: toolbarItems }}
        onChange={(_event, editor) => {
          onChange(editor.getData());
        }}
        onReady={(editor) => {
          if (wordCountRef.current) {
            wordCountRef.current.innerHTML = "";
            const wordCountPlugin = (editor as any).plugins.get("WordCount");
            if (wordCountPlugin && wordCountPlugin.wordCountContainer) {
              wordCountRef.current.appendChild(wordCountPlugin.wordCountContainer);
            }
          }
        }}
      />
      <div
        ref={wordCountRef}
        className="flex justify-end px-3 py-1.5 text-xs"
        style={{
          color: colors.gray[400],
          borderTop: `1px solid ${colors.gray[100]}`,
          backgroundColor: withOpacity(colors.gray[50], 0.5),
        }}
      />
    </div>
  );
}
