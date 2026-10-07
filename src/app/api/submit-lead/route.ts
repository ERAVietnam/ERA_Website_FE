import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL = process.env.LEAD_SCRIPT_URL || "";

export async function POST(req: NextRequest) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json(
      { success: false, error: "Server not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    // Bổ sung IP server-side khi frontend gửi bằng sendBeacon và không thể gọi API IP riêng.
    if (!body.ip) {
      const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
      const realIp =
        req.headers.get("x-real-ip") ||
        req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-vercel-forwarded-for") ||
        req.headers.get("x-client-ip");
      body.ip = forwarded || realIp || "";
    }

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    // Apps Script returns plain text or JSON depending on setup
    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return NextResponse.json({ success: res.ok, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
