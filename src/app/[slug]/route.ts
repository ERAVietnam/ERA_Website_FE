import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080").replace(/\/$/, "");

function isExternalReference(value: string) {
  return (
    !value ||
    value.startsWith("#") ||
    value.startsWith("/") ||
    value.startsWith("//") ||
    value.startsWith("data:") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("javascript:") ||
    /^[a-z][a-z\d+.-]*:/i.test(value)
  );
}

function rewriteAssetReferences(html: string, slug: string) {
  const assetEndpoint = `${API_BASE_URL}/mkt-pages/${encodeURIComponent(slug)}/asset?path=`;

  return html.replace(/\b(src|href|poster)\s*=\s*(["'])([^"']+)\2/gi, (full, attribute, quote, value) => {
    if (isExternalReference(value) || value.startsWith("assets/")) {
      if (!value.startsWith("assets/")) return full;
      return `${attribute}=${quote}${assetEndpoint}${encodeURIComponent(value)}${quote}`;
    }
    return full;
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const upstream = await fetch(`${API_BASE_URL}/mkt-pages/${encodeURIComponent(slug)}/html`, {
    cache: "no-store",
  });

  if (!upstream.ok) {
    return new NextResponse("MKT page not found", { status: upstream.status });
  }

  const html = await upstream.text();
  return new NextResponse(rewriteAssetReferences(html, slug), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
