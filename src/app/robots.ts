import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/tin-tuc/quan-ly",
        "/tap-chi/quan-ly",
        "/du-an/quan-ly",
        "/agents/quan-ly",
        "/vinh-danh-va-he-thong/quan-ly",
        "/khoa-hoc/quan-ly",
        "/tuyen-dung/quan-ly",
        "/tuyen-dung/ung-vien",
        "/tai-khoan/quan-ly",
        "/ho-so-ca-nhan",
      ],
    },
    sitemap: "https://era.com.vn/sitemap.xml",
  };
}
