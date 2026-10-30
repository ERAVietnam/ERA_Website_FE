"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ToTopButton } from "./ToTopButton";

type LayoutConfig = {
  header?: boolean;
  footer?: boolean;
  toTop?: boolean;
  contentPadding?: boolean;
};

const defaultLayout: Required<LayoutConfig> = {
  header: true,
  footer: true,
  toTop: true,
  contentPadding: true,
};

const landingFaviconByRoute: Record<string, string> = {
  "/du-an-arcadia-at-lavila": "/landing/arcadia/assets/img/arcadia-official-favicon.png",
  "/du-an-artisan-park": "/landing/artisan-park/assets/img/artisan-park-official-favicon.png",
  "/pk-beachtro-tower-du-an-blanca-city": "/landing/beachtro-tower-static/assets/img/beachtro-tower-static-official-favicon.png",
  "/du-an-capital-square": "/landing/capital-square/assets/img/capital-square-official-favicon.png",
  "/du-an-celesta-gold": "/landing/celesta-gold-static/assets/img/celesta-gold-static-official-favicon.png",
  "/du-an-diamond-sky": "/landing/diamond-sky/assets/img/diamond-sky-mark.svg",
  "/du-an-elyse-island": "/landing/elyse-island/assets/img/elyse-island-official-favicon.png",
  "/duan-canho-forest-onsen": "/landing/eco-retreat/assets/img/eco-retreat-official-favicon.png",
  "/du-an-ga-thu-thiem": "/landing/ga-thu-thiem/assets/img/ga-thu-thiem-favicon.svg",
  "/du-an-gem-park": "/landing/gem-park/assets/img/gem-park-official-favicon.ico",
  "/du-an-gladia-by-the-water": "/landing/gladia-by-the-water/assets/img/gladia-by-the-water-official-favicon.jpg",
  "/du-an-gladia-heights": "/logo_short.svg",
  "/du-an-grand-marina-saigon": "/landing/grand-marina-saigon/assets/img/grand-marina-saigon-official-favicon.png",
  "/du-an-green-skyline": "/landing/green-skyline-static/assets/img/green-skyline-mark.svg",
  "/du-an-hanoi-signature": "/landing/hanoi-signature/assets/img/hanoi-signature-official-favicon.png",
  "/du-an-hoiana-residences": "/landing/hoiana-residences/assets/img/hoiana-residences-official-favicon.jpg",
  "/du-an-imperia-sensa-park": "/landing/imperia-sensa-park/assets/img/imperia-sensa-park-official-favicon.png",
  "/du-an-la-home": "/landing/la-home/assets/img/la-home-official-favicon.png",
  "/du-an-m-landmark-residences": "/landing/m-landmark-residences/assets/img/m-landmark-residences-official-favicon.png",
  "/du-an-maia-ho-tram": "/landing/maia-ho-tram/assets/img/maia-ho-tram-bieu-tuong.svg",
  "/du-an-masteri-cosmo-central": "/landing/masteri-cosmo-central/assets/img/masteri-cosmo-central-official-favicon.png",
  "/du-an-nam-mekong-grand-plaza": "/landing/nam-mekong-static/assets/img/nam-mekong-static-official-favicon.png",
  "/du-an-newtown-legend": "/landing/newtown-legend/assets/img/newtown-legend-official-favicon.png",
  "/du-an-nobu-da-nang": "/landing/nobu-da-nang/assets/img/nobu-da-nang-official-favicon.webp",
  "/du-an-norton-park": "/landing/norton-park/assets/img/norton-park-official-favicon.jpg",
  "/du-an-palm-river": "/landing/palm-river-static/assets/img/palm-river-static-official-favicon.png",
  "/pk-park-village-du-an-waterpoint": "/landing/park-village-static/assets/img/park-village-static-official-favicon.png",
  "/du-an-phu-gia-bao-loc": "/landing/phu-gia-bao-loc/assets/img/phu-gia-bao-loc-official-favicon.jpg",
  "/pk-nagomi-du-an-waterpoint": "/landing/rivera-nagomi-static/assets/img/rivera-nagomi-static-official-favicon.png",
  "/du-an-salacia-villas": "/landing/salacia-villas/assets/img/salacia-villas-official-favicon.jpg",
  "/du-an-setia-edenia": "/landing/setia-edenia/assets/img/setia-edenia-official-favicon.png",
  "/du-an-skysolis": "/landing/skysolis-static/assets/img/skysolis-static-official-favicon.png",
  "/pk-soho-du-an-the-global-city": "/landing/soho/assets/img/masterise-homes-official-favicon.png",
  "/du-an-ban-dao-sola": "/landing/sola/assets/img/sola-official-favicon.png",
  "/du-an-thanh-phu-centre-point": "/landing/thanh-phu-static/assets/img/thanh-phu-static-official-favicon.png",
  "/pk-the-aqua-du-an-waterpoint": "/landing/the-aqua-static/assets/img/the-aqua-static-official-favicon.png",
  "/du-an-the-aspira": "/landing/the-aspira-static/assets/img/the-aspira-static-official-favicon.png",
  "/du-an-the-berkley": "/landing/the-berkley/assets/img/the-berkley-official-favicon.png",
  "/du-an-the-legend-da-nang": "/landing/the-legend-da-nang/assets/img/the-legend-da-nang-official-favicon.png",
  "/du-an-the-nest": "/landing/the-nest/assets/img/the-nest-official-favicon.png",
  "/du-an-the-rivus": "/landing/soho/assets/img/masterise-homes-official-favicon.png",
  "/du-an-the-westique-residences": "/landing/the-westique-static/assets/img/the-westique-static-official-favicon.png",
  "/du-an-the-win-city": "/landing/the-win-city/assets/img/the-win-city-official-favicon.jpg",
  "/du-an-trellia-vista": "/landing/trellia-vista/assets/img/trellia-vista-official-favicon.png",
  "/du-an-vinhomes-green-paradise": "/landing/vinhomes-green-paradise/assets/img/vinhomes-green-paradise-official-favicon.png",
  "/du-an-waterpoint": "/landing/waterpoint/waterpoint-favicon.png",
};

const landingThankYouFaviconByRoute: Record<string, string> = {
  "/thank-you-arcadia": "/landing/arcadia/assets/img/arcadia-official-favicon.png",
  "/thank-you-artisan-park": "/landing/artisan-park/assets/img/artisan-park-official-favicon.png",
  "/thank-you-beachtro-tower": "/landing/beachtro-tower-static/assets/img/beachtro-tower-static-official-favicon.png",
  "/thank-you-capital-square": "/landing/capital-square/assets/img/capital-square-official-favicon.png",
  "/thank-you-diamond-sky": "/landing/diamond-sky/assets/img/diamond-sky-mark.svg",
  "/thank-you-eco-retreat": "/landing/eco-retreat/assets/img/eco-retreat-official-favicon.png",
  "/thank-you-elyse-island": "/landing/elyse-island/assets/img/elyse-island-official-favicon.png",
  "/thank-you-ga-thu-thiem": "/landing/ga-thu-thiem/assets/img/ga-thu-thiem-favicon.svg",
  "/thank-you-gem-park": "/landing/gem-park/assets/img/gem-park-official-favicon.ico",
  "/thank-you-gladia-by-the-water": "/landing/gladia-by-the-water/assets/img/gladia-by-the-water-official-favicon.jpg",
  "/thank-you-gladia-heights": "/logo_short.svg",
  "/thank-you-grand-marina-saigon": "/landing/grand-marina-saigon/assets/img/grand-marina-saigon-official-favicon.png",
  "/thank-you-green-skyline": "/landing/green-skyline-static/assets/img/green-skyline-mark.svg",
  "/thank-you-hanoi-signature": "/landing/hanoi-signature/assets/img/hanoi-signature-official-favicon.png",
  "/thank-you-hoiana-residences": "/landing/hoiana-residences/assets/img/hoiana-residences-official-favicon.jpg",
  "/thank-you-imperia-sensa-park": "/landing/imperia-sensa-park/assets/img/imperia-sensa-park-official-favicon.png",
  "/thank-you-la-home": "/landing/la-home/assets/img/la-home-official-favicon.png",
  "/thank-you-m-landmark-residences": "/landing/m-landmark-residences/assets/img/m-landmark-residences-official-favicon.png",
  "/thank-you-maia-ho-tram": "/landing/maia-ho-tram/assets/img/maia-ho-tram-bieu-tuong.svg",
  "/thank-you-masteri-cosmo-central": "/landing/masteri-cosmo-central/assets/img/masteri-cosmo-central-official-favicon.png",
  "/thank-you-nam-mekong": "/landing/nam-mekong-static/assets/img/nam-mekong-static-official-favicon.png",
  "/thank-you-newtown-legend": "/landing/newtown-legend/assets/img/newtown-legend-official-favicon.png",
  "/thank-you-nobu-da-nang": "/landing/nobu-da-nang/assets/img/nobu-da-nang-official-favicon.webp",
  "/thank-you-norton-park": "/landing/norton-park/assets/img/norton-park-official-favicon.jpg",
  "/thank-you-palm-river": "/landing/palm-river-static/assets/img/palm-river-static-official-favicon.png",
  "/thank-you-salacia-villas": "/landing/salacia-villas/assets/img/salacia-villas-official-favicon.jpg",
  "/thank-you-setia-edenia": "/landing/setia-edenia/assets/img/setia-edenia-official-favicon.png",
  "/thank-you-sola": "/landing/sola/assets/img/sola-official-favicon.png",
  "/thank-you-thanh-phu": "/landing/thanh-phu-static/assets/img/thanh-phu-static-official-favicon.png",
  "/thank-you-the-aspira": "/landing/the-aspira-static/assets/img/the-aspira-static-official-favicon.png",
  "/thank-you-the-berkley": "/landing/the-berkley/assets/img/the-berkley-official-favicon.png",
  "/thank-you-the-legend-da-nang": "/landing/the-legend-da-nang/assets/img/the-legend-da-nang-official-favicon.png",
  "/thank-you-the-nest": "/landing/the-nest/assets/img/the-nest-official-favicon.png",
  "/thank-you-the-rivus": "/landing/soho/assets/img/masterise-homes-official-favicon.png",
  "/thank-you-the-win-city": "/landing/the-win-city/assets/img/the-win-city-official-favicon.jpg",
  "/thank-you-trellia-vista": "/landing/trellia-vista/assets/img/trellia-vista-official-favicon.png",
  "/thank-you-vinhomes-green-paradise": "/landing/vinhomes-green-paradise/assets/img/vinhomes-green-paradise-official-favicon.png",
  "/thank-you-waterpoint": "/landing/waterpoint/waterpoint-favicon.png",
  "/thank-you-westique": "/landing/the-westique-static/assets/img/the-westique-static-official-favicon.png",
};

/**
 * Khai bÃ¡o cÃ¡c page cÃ³ layout Ä‘áº·c biá»‡t á»Ÿ Ä‘Ã¢y.
 * Key lÃ  pathname (khÃ´ng cÃ³ trailing slash, trá»« "/").
 * CÃ¡c field khÃ´ng khai bÃ¡o sáº½ láº¥y giÃ¡ trá»‹ máº·c Ä‘á»‹nh lÃ  true.
 *
 * VÃ­ dá»¥:
 * "/login": { header: false, footer: false, toTop: false },
 * "/some-page": { header: false },
 */
const specialLayouts: Record<string, LayoutConfig> = {
  "/du-an-the-gio-riverside": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-the-gio-riverside": { header: false, footer: false, toTop: false, contentPadding: false },
  "/duan-canho-forest-onsen": { header: false, footer: true, toTop: false },
  "/thank-you-eco-retreat": { header: false, footer: false, toTop: false },
  "/thank-you-waterpoint": { header: false, footer: false, toTop: false },
  "/phan-khu-rung-phuong-duan-eco-retreat": { header: false, footer: true, toTop: false },
  "/du-an-phu-gia-bao-loc": { header: false, footer: true, toTop: false },
  "/du-an-waterpoint": { header: false, footer: true, toTop: false },
  "/pk-nagomi-du-an-waterpoint": { header: false, footer: false, toTop: false, contentPadding: false },
  "/tuyen-dung-thu-cap": { header: false },
  "/co-hoi-nghe-nghiep": { header: false },
  "/du-an-nam-mekong-grand-plaza": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-nam-mekong": { header: false, footer: false, toTop: false },
  "/pk-park-village-du-an-waterpoint": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-palm-river": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-celesta-gold": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-the-westique-residences": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-westique": { header: false, footer: false, toTop: false },
  "/du-an-thanh-phu-centre-point": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-the-aspira": { header: false, footer: false, toTop: false, contentPadding: false },
  "/pk-beachtro-tower-du-an-blanca-city": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-beachtro-tower": { header: false, footer: false, toTop: false },
  "/thank-you-the-aspira": { header: false, footer: false, toTop: false },
  "/thank-you-thanh-phu": { header: false, footer: false, toTop: false },
  "/thank-you-palm-river": { header: false, footer: false, toTop: false },
  "/pk-the-aqua-du-an-waterpoint": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-skysolis": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-green-skyline": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-green-skyline": { header: false, footer: false, toTop: false },
  "/du-an-diamond-sky": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-diamond-sky": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-the-legend-da-nang": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-the-legend-da-nang": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-nobu-da-nang": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-nobu-da-nang": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-imperia-sensa-park": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-imperia-sensa-park": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-gladia-heights": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-gladia-heights": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-gladia-by-the-water": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-gladia-by-the-water": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-elyse-island": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-elyse-island": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-hoiana-residences": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-hoiana-residences": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-gem-park": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-gem-park": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-masteri-cosmo-central": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-masteri-cosmo-central": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-ban-dao-sola": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-sola": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-arcadia-at-lavila": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-arcadia": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-the-nest": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-the-nest": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-la-home": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-la-home": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-norton-park": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-norton-park": { header: false, footer: false, toTop: false, contentPadding: false },
  "/pk-soho-du-an-the-global-city": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-soho": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-grand-marina-saigon": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-grand-marina-saigon": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-the-berkley": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-the-berkley": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-maia-ho-tram": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-maia-ho-tram": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-newtown-legend": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-newtown-legend": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-setia-edenia": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-setia-edenia": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-the-win-city": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-the-win-city": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-vinhomes-green-paradise": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-vinhomes-green-paradise": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-the-rivus": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-the-rivus": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-salacia-villas": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-salacia-villas": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-capital-square": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-capital-square": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-artisan-park": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-artisan-park": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-ga-thu-thiem": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-ga-thu-thiem": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-m-landmark-residences": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-m-landmark-residences": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-trellia-vista": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-trellia-vista": { header: false, footer: false, toTop: false, contentPadding: false },
  "/du-an-hanoi-signature": { header: false, footer: false, toTop: false, contentPadding: false },
  "/thank-you-hanoi-signature": { header: false, footer: false, toTop: false, contentPadding: false },
  "/app-era": { header: false, footer: false, toTop: false, contentPadding: false },
};

function normalizePathname(pathname: string): string {
  return pathname === "/" ? pathname : pathname.replace(/\/$/, "");
}

const ADMIN_PATHS = [
  "/tin-tuc/quan-ly",
  "/tac-gia/quan-ly",
  "/tap-chi/quan-ly",
  "/du-an/quan-ly",
  "/agents/quan-ly",
  "/vinh-danh-va-he-thong/quan-ly",
  "/khoa-hoc/quan-ly",
  "/tuyen-dung/quan-ly",
  "/tuyen-dung/ung-vien",
  "/tai-khoan/quan-ly",
  "/ho-so-ca-nhan",
];

function isAdminPath(pathname: string): boolean {
  return ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const normalized = normalizePathname(pathname);

  useEffect(() => {
    const favicon = landingFaviconByRoute[normalized] ?? landingThankYouFaviconByRoute[normalized] ?? "/favicon.ico";
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.dataset.eraFavicon = "true";
    link.href = favicon;
    document.head.querySelectorAll<HTMLLinkElement>('link[rel="icon"]').forEach((candidate) => {
      if (candidate !== link) candidate.remove();
    });
  }, [normalized]);

  const isAdmin = isAdminPath(pathname);
  const specialConfig = specialLayouts[normalized] ?? {};

  const showHeader = isAdmin ? false : (specialConfig.header ?? defaultLayout.header);
  const showFooter = isAdmin ? false : (specialConfig.footer ?? defaultLayout.footer);
  const showToTop = isAdmin ? false : (specialConfig.toTop ?? defaultLayout.toTop);
  const showContentPadding = isAdmin ? false : (specialConfig.contentPadding ?? showHeader);

  return (
    <>
      {showHeader && <Header />}
      <div className={cn("flex-1", showContentPadding && "pt-0 md:pt-16")}>
        {children}
      </div>
      {showFooter && <Footer />}
      {showToTop && <ToTopButton />}
    </>
  );
}

