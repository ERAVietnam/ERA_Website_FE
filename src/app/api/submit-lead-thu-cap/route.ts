import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint nhận lead RIÊNG của trang /tuyen-dung-thu-cap/ (sheet tuyển dụng thứ cấp).
 * Tách biến môi trường riêng LEAD_SCRIPT_URL_THU_CAP để trỏ tới Apps Script
 * đã bind với spreadsheet tuyển dụng thứ cấp — không dùng chung với các landing.
 */
const APPS_SCRIPT_URL = process.env.LEAD_SCRIPT_URL_THU_CAP || "";

export async function POST(req: NextRequest) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json(
      { success: false, error: "Server not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

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
