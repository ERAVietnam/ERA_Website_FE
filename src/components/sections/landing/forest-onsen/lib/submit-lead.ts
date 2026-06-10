"use client";

const APPS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_LEAD_SCRIPT_URL || "";

export type LeadPayload = {
  hoten: string;
  sdt: string;
  sanpham?: string;
  formId: string;
};

async function getIP(): Promise<string> {
  try {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 3000);
    const res = await fetch("https://api.ipify.org?format=json", {
      signal: ctrl.signal,
    });
    const data = await res.json();
    return data.ip || "";
  } catch {
    return "";
  }
}

function getUTMParams(): Record<string, string> {
  const url = new URL(window.location.href);
  const params: Record<string, string> = {};
  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "adclid",
    "adclida",
    "mglnd",
  ].forEach((k) => {
    params[k] = url.searchParams.get(k) || "";
  });
  return params;
}

export async function submitLead(payload: LeadPayload): Promise<boolean> {
  if (!APPS_SCRIPT_URL) {
    console.warn("APPS_SCRIPT_URL chưa được cấu hình");
    return false;
  }

  const utm = getUTMParams();
  const ip = await getIP();

  const body = {
    timestamp: new Date().toISOString(),
    hoten: payload.hoten,
    sdt: payload.sdt,
    sanpham: payload.sanpham || "",
    url: window.location.href,
    ...utm,
    ip,
    formId: payload.formId,
    userAgent: navigator.userAgent,
  };

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Submit lead failed:", err);
    return false;
  }
}
