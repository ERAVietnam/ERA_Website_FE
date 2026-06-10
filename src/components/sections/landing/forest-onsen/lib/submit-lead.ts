export interface LeadPayload {
  formId: string;
  hoten: string;
  sdt: string;
  sanpham?: string;
  url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  adclid: string;
  adclida: string;
  mglnd: string;
  ip: string;
  userAgent: string;
}

async function getIP(): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("https://api.ipify.org?format=json", {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const data = await res.json();
    return data.ip || "";
  } catch {
    return "";
  }
}

function getUTMParams(): Pick<
  LeadPayload,
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_term"
  | "utm_content"
  | "adclid"
  | "adclida"
  | "mglnd"
> {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      adclid: "",
      adclida: "",
      mglnd: "",
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    adclid: params.get("adclid") || "",
    adclida: params.get("adclida") || "",
    mglnd: params.get("mgclid") || "", // mgclid – Google Ads click ID
  };
}

export async function submitLead(params: {
  formId: string;
  hoten: string;
  sdt: string;
  sanpham?: string;
}): Promise<boolean> {
  const { formId, hoten, sdt, sanpham } = params;

  const utms = getUTMParams();
  const ip = await getIP();
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}${window.location.search}`
      : "";

  const payload: LeadPayload = {
    formId,
    hoten: hoten.trim(),
    sdt: sdt.trim(),
    ...(sanpham ? { sanpham: sanpham.trim() } : {}),
    url,
    ip,
    userAgent,
    ...utms,
  };

  const res = await fetch("/api/submit-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  const json = (await res.json()) as { success?: boolean; error?: string };
  if (json.success === false) {
    throw new Error(json.error || "Submit failed");
  }

  return true;
}
