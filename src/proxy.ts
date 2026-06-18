import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/quan-ly", "/ho-so-ca-nhan"];

const NEWS_CATEGORY_SLUGS = new Set([
  "tin-thi-truong",
  "tin-du-an",
  "era-news",
  "thong-cao-bao-chi",
]);

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old category URLs (/tin-tuc/<category>) to new category URLs (/tin-tuc/danh-muc/<category>)
  const categoryMatch = pathname.match(/^\/tin-tuc\/([^/]+)\/?$/);
  if (categoryMatch && NEWS_CATEGORY_SLUGS.has(categoryMatch[1])) {
    return NextResponse.redirect(
      new URL(`/tin-tuc/danh-muc/${categoryMatch[1]}/`, request.url),
      308
    );
  }

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // This is a UI-state cookie only (no token). The real auth check still happens in the API.
  const authState = request.cookies.get("era_auth_state")?.value;

  if (!authState) {
    return NextResponse.redirect(new URL("/dang-nhap", request.url));
  }

  // Prevent bfcache from restoring stale protected pages after logout.
  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
