import { NextResponse } from "next/server";

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/co-hoi-nghe-nghiep/", request.url), 301);
}
