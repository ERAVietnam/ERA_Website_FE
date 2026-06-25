export interface TocHeading {
  /** Unique ID for scroll target: toc-heading-0, toc-heading-1, ... */
  id: string;
  /** Plain text of the heading (HTML tags stripped, entities decoded) */
  text: string;
  /** Heading level: 2 = h2, 3 = h3, 4 = h4 */
  level: number;
}

/**
 * Decode all HTML entities using the browser's DOM parser.
 * Handles &nbsp;, &amp;nbsp; (double-encoded), &#160;, etc.
 */
function decodeEntities(text: string): string {
  if (typeof document === "undefined") return text;
  const el = document.createElement("span");
  el.innerHTML = text;
  return el.textContent || "";
}

/**
 * Parse HTML content from CKEditor, find all h2/h3/h4 headings,
 * inject id attributes for scroll targets, and return the modified
 * HTML along with the extracted heading list.
 */
export function extractHeadings(html: string): {
  html: string;
  headings: TocHeading[];
} {
  const headings: TocHeading[] = [];
  let counter = 0;

  const newHtml = html.replace(
    /<h([2-4])(\s[^>]*)?>(.+?)<\/h\1>/gi,
    (_match, level: string, attrs: string | undefined, inner: string) => {
      const id = `toc-heading-${counter++}`;
      const cleanText = decodeEntities(
        inner.replace(/<[^>]+>/g, "")
      ).trim();
      if (cleanText) {
        headings.push({
          id,
          text: cleanText,
          level: parseInt(level, 10),
        });
      }
      const attrStr = attrs ? attrs.trimEnd() : "";
      return `<h${level}${attrStr} id="${id}">${inner}</h${level}>`;
    }
  );

  return { html: newHtml, headings };
}
