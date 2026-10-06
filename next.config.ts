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
