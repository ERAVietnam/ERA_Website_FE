import type { NextConfig } from "next";

const noCacheHeaders = [
  { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/tin-tuc/danh-muc/:categorySlug",
        destination: "/tin-tuc/:categorySlug",
        permanent: true,
      },
      {
        source: "/tin-tuc/:categorySlug((?!danh-muc)[^/]+)/:articleSlug",
        destination: "/tin-tuc/:articleSlug",
        permanent: true,
      },
      // Đổi URL landing (09/10/2026) — redirect 308 về slug mới
      { source: "/the-aqua/:path*", destination: "/pk-the-aqua-du-an-waterpoint/:path*", permanent: true },
      { source: "/park-village/:path*", destination: "/pk-park-village-du-an-waterpoint/:path*", permanent: true },
      { source: "/skysolis/:path*", destination: "/du-an-skysolis/:path*", permanent: true },
      { source: "/nam-mekong-grand-plaza/:path*", destination: "/du-an-nam-mekong-grand-plaza/:path*", permanent: true },
      { source: "/palm-river/:path*", destination: "/du-an-palm-river/:path*", permanent: true },
      { source: "/du-an-beachtro-tower/:path*", destination: "/pk-beachtro-tower-du-an-blanca-city/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Serve the complete static landing document at the public project URL.
        // This keeps the URL unchanged while allowing crawlers to receive the
        // landing content in the first HTML response instead of only an iframe.
        {
          source: "/du-an-capital-square/",
          destination: "/landing/capital-square/index.html",
        },
        {
          source: "/du-an-capital-square/assets/:path*",
          destination: "/landing/capital-square/assets/:path*",
        },
        {
          source: "/du-an-arcadia-at-lavila/",
          destination: "/landing/arcadia/index.html",
        },
        {
          source: "/du-an-arcadia-at-lavila/assets/:path*",
          destination: "/landing/arcadia/assets/:path*",
        },
        {
          source: "/du-an-artisan-park/",
          destination: "/landing/artisan-park/index.html",
        },
        {
          source: "/du-an-artisan-park/assets/:path*",
          destination: "/landing/artisan-park/assets/:path*",
        },
        {
          source: "/du-an-ban-dao-sola/",
          destination: "/landing/sola/index.html",
        },
        {
          source: "/du-an-ban-dao-sola/assets/:path*",
          destination: "/landing/sola/assets/:path*",
        },
        {
          source: "/du-an-celesta-gold/",
          destination: "/landing/celesta-gold/index.html",
        },
        {
          source: "/du-an-celesta-gold/assets/:path*",
          destination: "/landing/celesta-gold/assets/:path*",
        },
        {
          source: "/du-an-diamond-sky/",
          destination: "/landing/diamond-sky/index.html",
        },
        {
          source: "/du-an-diamond-sky/assets/:path*",
          destination: "/landing/diamond-sky/assets/:path*",
        },
        {
          source: "/du-an-elyse-island/",
          destination: "/landing/elyse-island/index.html",
        },
        {
          source: "/du-an-elyse-island/assets/:path*",
          destination: "/landing/elyse-island/assets/:path*",
        },
        {
          source: "/du-an-ga-thu-thiem/",
          destination: "/landing/ga-thu-thiem/index.html",
        },
        {
          source: "/du-an-ga-thu-thiem/assets/:path*",
          destination: "/landing/ga-thu-thiem/assets/:path*",
        },
        {
          source: "/du-an-gem-park/",
          destination: "/landing/gem-park/index.html",
        },
        {
          source: "/du-an-gem-park/assets/:path*",
          destination: "/landing/gem-park/assets/:path*",
        },
        {
          source: "/du-an-gladia-by-the-water/",
          destination: "/landing/gladia-by-the-water/index.html",
        },
        {
          source: "/du-an-gladia-by-the-water/assets/:path*",
          destination: "/landing/gladia-by-the-water/assets/:path*",
        },
        {
          source: "/du-an-gladia-heights/",
          destination: "/landing/gladia-heights-dang-ky/index.html",
        },
        {
          source: "/du-an-gladia-heights/assets/:path*",
          destination: "/landing/gladia-heights-dang-ky/assets/:path*",
        },
        {
          source: "/du-an-grand-marina-saigon/",
          destination: "/landing/grand-marina-saigon/index.html",
        },
        {
          source: "/du-an-grand-marina-saigon/assets/:path*",
          destination: "/landing/grand-marina-saigon/assets/:path*",
        },
        {
          source: "/du-an-green-skyline/",
          destination: "/landing/green-skyline/index.html",
        },
        {
          source: "/du-an-green-skyline/assets/:path*",
          destination: "/landing/green-skyline/assets/:path*",
        },
        {
          source: "/du-an-hanoi-signature/",
          destination: "/landing/hanoi-signature/index.html",
        },
        {
          source: "/du-an-hanoi-signature/assets/:path*",
          destination: "/landing/hanoi-signature/assets/:path*",
        },
        {
          source: "/du-an-hoiana-residences/",
          destination: "/landing/hoiana-residences/index.html",
        },
        {
          source: "/du-an-hoiana-residences/assets/:path*",
          destination: "/landing/hoiana-residences/assets/:path*",
        },
        {
          source: "/du-an-imperia-sensa-park/",
          destination: "/landing/imperia-sensa-park/index.html",
        },
        {
          source: "/du-an-imperia-sensa-park/assets/:path*",
          destination: "/landing/imperia-sensa-park/assets/:path*",
        },
        {
          source: "/du-an-izumi-city/",
          destination: "/landing/izumi-city/index.html",
        },
        {
          source: "/du-an-izumi-city/assets/:path*",
          destination: "/landing/izumi-city/assets/:path*",
        },
        {
          source: "/du-an-la-home/",
          destination: "/landing/la-home/index.html",
        },
        {
          source: "/du-an-la-home/assets/:path*",
          destination: "/landing/la-home/assets/:path*",
        },
        {
          source: "/du-an-maia-ho-tram/",
          destination: "/landing/maia-ho-tram/index.html",
        },
        {
          source: "/du-an-maia-ho-tram/assets/:path*",
          destination: "/landing/maia-ho-tram/assets/:path*",
        },
        {
          source: "/du-an-masteri-cosmo-central/",
          destination: "/landing/masteri-cosmo-central/index.html",
        },
        {
          source: "/du-an-masteri-cosmo-central/assets/:path*",
          destination: "/landing/masteri-cosmo-central/assets/:path*",
        },
        {
          source: "/du-an-m-landmark-residences/",
          destination: "/landing/m-landmark-residences/index.html",
        },
        {
          source: "/du-an-m-landmark-residences/assets/:path*",
          destination: "/landing/m-landmark-residences/assets/:path*",
        },
        {
          source: "/du-an-monrei-saigon/",
          destination: "/landing/monrei-saigon/index.html",
        },
        {
          source: "/du-an-monrei-saigon/assets/:path*",
          destination: "/landing/monrei-saigon/assets/:path*",
        },
        {
          source: "/du-an-nam-mekong-grand-plaza/",
          destination: "/landing/nam-mekong/index.html",
        },
        {
          source: "/du-an-nam-mekong-grand-plaza/assets/:path*",
          destination: "/landing/nam-mekong/assets/:path*",
        },
        {
          source: "/du-an-newtown-legend/",
          destination: "/landing/newtown-legend/index.html",
        },
        {
          source: "/du-an-newtown-legend/assets/:path*",
          destination: "/landing/newtown-legend/assets/:path*",
        },
        {
          source: "/du-an-nobu-da-nang/",
          destination: "/landing/nobu-da-nang/index.html",
        },
        {
          source: "/du-an-nobu-da-nang/assets/:path*",
          destination: "/landing/nobu-da-nang/assets/:path*",
        },
        {
          source: "/du-an-norton-park/",
          destination: "/landing/norton-park/index.html",
        },
        {
          source: "/du-an-norton-park/assets/:path*",
          destination: "/landing/norton-park/assets/:path*",
        },
        {
          source: "/du-an-palm-river/",
          destination: "/landing/palm-river/index.html",
        },
        {
          source: "/du-an-palm-river/assets/:path*",
          destination: "/landing/palm-river/assets/:path*",
        },
        {
          source: "/du-an-persa-place/",
          destination: "/landing/persa-place/index.html",
        },
        {
          source: "/du-an-persa-place/assets/:path*",
          destination: "/landing/persa-place/assets/:path*",
        },
        {
          source: "/du-an-salacia-villas/",
          destination: "/landing/salacia-villas/index.html",
        },
        {
          source: "/du-an-salacia-villas/assets/:path*",
          destination: "/landing/salacia-villas/assets/:path*",
        },
        {
          source: "/du-an-setia-edenia/",
          destination: "/landing/setia-edenia/index.html",
        },
        {
          source: "/du-an-setia-edenia/assets/:path*",
          destination: "/landing/setia-edenia/assets/:path*",
        },
        {
          source: "/du-an-skysolis/",
          destination: "/landing/skysolis/index.html",
        },
        {
          source: "/du-an-skysolis/assets/:path*",
          destination: "/landing/skysolis/assets/:path*",
        },
        {
          source: "/du-an-solaria-rise/",
          destination: "/landing/solaria-rise/index.html",
        },
        {
          source: "/du-an-solaria-rise/assets/:path*",
          destination: "/landing/solaria-rise/assets/:path*",
        },
        {
          source: "/du-an-thanh-phu-centre-point/",
          destination: "/landing/thanh-phu/index.html",
        },
        {
          source: "/du-an-thanh-phu-centre-point/assets/:path*",
          destination: "/landing/thanh-phu/assets/:path*",
        },
        {
          source: "/du-an-the-aspira/",
          destination: "/landing/the-aspira/index.html",
        },
        {
          source: "/du-an-the-aspira/assets/:path*",
          destination: "/landing/the-aspira/assets/:path*",
        },
        {
          source: "/du-an-the-berkley/",
          destination: "/landing/the-berkley/index.html",
        },
        {
          source: "/du-an-the-berkley/assets/:path*",
          destination: "/landing/the-berkley/assets/:path*",
        },
        {
          source: "/du-an-the-gio-riverside/",
          destination: "/landing/the-gio-riverside/index.html",
        },
        {
          source: "/du-an-the-gio-riverside/assets/:path*",
          destination: "/landing/the-gio-riverside/assets/:path*",
        },
        {
          source: "/du-an-the-legend-da-nang/",
          destination: "/landing/the-legend-da-nang/index.html",
        },
        {
          source: "/du-an-the-legend-da-nang/assets/:path*",
          destination: "/landing/the-legend-da-nang/assets/:path*",
        },
        {
          source: "/du-an-the-nest/",
          destination: "/landing/the-nest/index.html",
        },
        {
          source: "/du-an-the-nest/assets/:path*",
          destination: "/landing/the-nest/assets/:path*",
        },
        {
          source: "/du-an-the-rivus/",
          destination: "/landing/the-rivus/index.html",
        },
        {
          source: "/du-an-the-rivus/assets/:path*",
          destination: "/landing/the-rivus/assets/:path*",
        },
        {
          source: "/du-an-the-westique-residences/",
          destination: "/landing/the-westique/index.html",
        },
        {
          source: "/du-an-the-westique-residences/assets/:path*",
          destination: "/landing/the-westique/assets/:path*",
        },
        {
          source: "/du-an-the-win-city/",
          destination: "/landing/the-win-city/index.html",
        },
        {
          source: "/du-an-the-win-city/assets/:path*",
          destination: "/landing/the-win-city/assets/:path*",
        },
        {
          source: "/du-an-trellia-vista/",
          destination: "/landing/trellia-vista/index.html",
        },
        {
          source: "/du-an-trellia-vista/assets/:path*",
          destination: "/landing/trellia-vista/assets/:path*",
        },
        {
          source: "/du-an-vinhomes-green-paradise/",
          destination: "/landing/vinhomes-green-paradise/index.html",
        },
        {
          source: "/du-an-vinhomes-green-paradise/assets/:path*",
          destination: "/landing/vinhomes-green-paradise/assets/:path*",
        },
        {
          source: "/pk-beachtro-tower-du-an-blanca-city/",
          destination: "/landing/beachtro-tower/index.html",
        },
        {
          source: "/pk-beachtro-tower-du-an-blanca-city/assets/:path*",
          destination: "/landing/beachtro-tower/assets/:path*",
        },
        {
          source: "/pk-nagomi-du-an-waterpoint/",
          destination: "/landing/rivera-nagomi/index.html",
        },
        {
          source: "/pk-nagomi-du-an-waterpoint/assets/:path*",
          destination: "/landing/rivera-nagomi/assets/:path*",
        },
        {
          source: "/pk-park-village-du-an-waterpoint/",
          destination: "/landing/park-village/index.html",
        },
        {
          source: "/pk-park-village-du-an-waterpoint/assets/:path*",
          destination: "/landing/park-village/assets/:path*",
        },
        {
          source: "/pk-soho-du-an-the-global-city/",
          destination: "/landing/soho/index.html",
        },
        {
          source: "/pk-soho-du-an-the-global-city/assets/:path*",
          destination: "/landing/soho/assets/:path*",
        },
        {
          source: "/pk-the-aqua-du-an-waterpoint/",
          destination: "/landing/the-aqua/index.html",
        },
        {
          source: "/pk-the-aqua-du-an-waterpoint/assets/:path*",
          destination: "/landing/the-aqua/assets/:path*",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*/quan-ly/:subPath*",
        headers: noCacheHeaders,
      },
      {
        source: "/ho-so-ca-nhan/:path*",
        headers: noCacheHeaders,
      },
    ];
  },
};

export default nextConfig;
