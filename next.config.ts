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
