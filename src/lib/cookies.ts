/**
 * Lightweight non-HttpOnly cookie helpers used only for UI state indicators.
 * These cookies NEVER contain tokens or sensitive data.
 */

function cookieFlags(): string {
  const secure = typeof window !== "undefined" && window.isSecureContext ? "; Secure" : "";
  return `path=/; SameSite=Lax${secure}`;
}

export function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; ${cookieFlags()}`;
}

export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
  return undefined;
}

export function deleteCookie(name: string) {
  // To delete a cookie reliably, use the same flags that were used to set it.
  const secure = typeof window !== "undefined" && window.isSecureContext ? "; Secure" : "";
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax${secure}`;
}
