# ERA Vietnam Website - Project Overview

> File này tóm tắt cấu trúc và kiến trúc của project để đọc nhanh, không cần đọc lại toàn bộ source code.

---

## 1. Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Framework | Next.js 16.2.2 (App Router) |
| React | 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Font | Inter (Google Fonts) |
| Icons | Lucide React |
| Rich Editor | CKEditor 5 (monorepo package) |
| Utilities | clsx, tailwind-merge |
| Deploy | Vercel (Git integration, auto-deploy on push) |

---

## 2. Cấu trúc thư mục

```
src/
├── app/                    # Next.js App Router (pages + layouts)
│   ├── page.tsx            # Trang chủ
│   ├── layout.tsx          # Root layout (font + metadata)
│   ├── globals.css         # Design tokens, custom utilities
│   ├── (pages...)/         # Các trang theo URL
│   └── */quan-ly/page.tsx  # Trang quản lý (admin forms)
│
├── components/
│   ├── layout/             # Header, Footer, LayoutWrapper, ToTopButton
│   ├── ui/                 # Base UI components
│   ├── shared/             # Components dùng chung (RichEditor)
│   └── sections/           # Các section/page-specific components
│       ├── home/
│       ├── about/
│       ├── academy/
│       ├── apply/
│       ├── contact/
│       ├── projects/
│       ├── news/
│       └── landing/            # Landing pages (project-specific)
│
├── hooks/                  # Custom React hooks
├── lib/                    # Utils, constants, configs
└── types/                  # TypeScript type definitions
```

---

## 3. Quy ước & Pattern

### Page Pattern
- File trong `app/` chỉ export `metadata` và render 1 component từ `components/sections/`
- Logic UI nằm trong `components/sections/`, không trong `app/`

```tsx
// app/ve-chung-toi/page.tsx
import { AboutPage } from "@/components/sections/about";

export const metadata = { title: "...", description: "..." };
export default function VeChungToi() {
  return <AboutPage />;
}
```

### Layout Pattern
- `LayoutWrapper` quản lý hiển thị Header/Footer/ToTopButton theo page
- Có thể khai báo `specialLayouts` để ẩn header/footer cho từng page

### Styling Pattern
- Dùng `cn()` (clsx + tailwind-merge) để merge classes
- Color được quản lý qua `src/lib/theme.ts` và CSS variables trong `globals.css`
- Tailwind v4 dùng `@import "tailwindcss"` và `@theme inline`

### "use client" Convention
- `app/*.tsx` (page files) → **Server Component**, không có `"use client"`
- `components/sections/*.tsx` → **~90% là Client Component**, có `"use client"` (dùng state, effect, event)
- `components/ui/*.tsx` → Tùy component; `Button.tsx` đã có `"use client"`
- `lib/*.ts` → Pure TypeScript, **không cần** directive

### Landing Page Pattern
- Mỗi landing page nằm trong `components/sections/landing/<project>/`
- Cấu trúc chuẩn:
  ```
  landing/<project>/
  ├── page.tsx              # Export metadata + render landing component
  ├── index.tsx             # Re-export
  ├── ForestOnsenLanding.tsx # Compose các sections
  ├── theme.ts              # Color tokens dùng riêng cho landing
  ├── data.ts               # Mock data (units, faq, infrastructure...)
  └── sections/             # Mỗi section 1 file (Navbar, Hero, ...)
  ```
- `LayoutWrapper.tsx` có `specialLayouts` để ẩn Header/Footer mặc định
- Footer project có thể bật lại bằng `footer: true` trong `specialLayouts`

---

## 4. Core Files

### Layout
| File | Mô tả |
|------|-------|
| `src/app/layout.tsx` | Root layout, font Inter, metadata mặc định |
| `src/components/layout/LayoutWrapper.tsx` | Quản lý Header/Footer/ToTopButton theo page |
| `src/components/layout/Header.tsx` | Fixed header, scroll-aware, mobile drawer |
| `src/components/layout/Footer.tsx` | 4-column footer, responsive |
| `src/components/layout/ToTopButton.tsx` | Nút scroll to top |

### UI Base
| File | Mô tả |
|------|-------|
| `src/components/ui/Button.tsx` | Variants: `primary`, `secondary`, `navy`, `navy-outline`, `outline`, `ghost`, `white`, `white-outline`, `danger`. Props: `shape` (default/circle), `isIconOnly`, `asChild`, `isLoading` |
| `src/components/ui/Container.tsx` | Responsive container với size variants |
| `src/components/ui/Section.tsx` | Section wrapper với bg, padding configs |


### Lib
| File | Mô tả |
|------|-------|
| `src/lib/utils.ts` | `cn()` utility |
| `src/lib/theme.ts` | Color palette, `withOpacity()` utility |
| `src/lib/routes.ts` | Centralized route constants (`ROUTES`) |

### Hooks
| File | Mô tả |
|------|-------|
| `src/hooks/useScrollToTop.ts` | Hook detect scroll > threshold |

---

## 5. Design System

### Colors (Primary)
```
Primary:     #C8102E (ERA Red)     → colors.primary.DEFAULT
Primary Dark:#990038               → colors.primary.dark.DEFAULT
Navy:        #0C0C44               → colors.primary.navy.DEFAULT
Secondary:   #41B3E0               → colors.secondary.DEFAULT
Accent:      #0f172a               → colors.accent.DEFAULT
White:       #ffffff               → colors.neutral.white
Gray 50:     #f9fafb              → colors.gray[50]
Gray 100:    #f3f4f6              → colors.gray[100]
Gray 500:    #6b7280              → colors.gray[500]
```

### Breakpoints
- Tailwind mặc định: `sm`, `md`, `lg`, `xl`
- Mobile-first design
- Header chuyển desktop/mobile ở `md`

---

## 6. Routes → Components Mapping

| Route | Page File | Main Component |
|-------|-----------|----------------|
| `/` | `app/page.tsx` | `HomePage` |
| `/ve-chung-toi` | `app/ve-chung-toi/page.tsx` | `AboutPage` |
| `/ve-chung-toi/apac` | `app/ve-chung-toi/apac/page.tsx` | `ApacPage` |
| `/ve-chung-toi/compass` | `app/ve-chung-toi/compass/page.tsx` | `CompassPage` |
| `/ve-chung-toi/era-real-estate` | `app/ve-chung-toi/era-real-estate/page.tsx` | `EraRealEstatePage` |
| `/ve-chung-toi/ve-era-viet-nam` | `app/ve-chung-toi/ve-era-viet-nam/page.tsx` | `AboutERAVNPage` |
| `/du-an` | `app/du-an/page.tsx` | `ProjectsPage` |
| `/du-an/chi-tiet` | `app/du-an/chi-tiet/page.tsx` | `ProjectsDetailPage` |
| `/du-an/quan-ly` | `app/du-an/quan-ly/page.tsx` | `ProjectsManagePage` |
| `/tin-tuc` | `app/tin-tuc/page.tsx` | `NewsPage` |
| `/tin-tuc/[slug]` | `app/tin-tuc/[slug]/page.tsx` | `NewsDetailPage` |
| `/tin-tuc/quan-ly` | `app/tin-tuc/quan-ly/page.tsx` | `NewsManagePage` |
| `/gia-nhap` | `app/gia-nhap/page.tsx` | `JoinPage` |
| `/ung-tuyen` | `app/ung-tuyen/page.tsx` | `ApplyPage` |
| `/ung-tuyen/chi-tiet-cong-viec` | `app/ung-tuyen/chi-tiet-cong-viec/page.tsx` | `ApplyJobDetailPage` |
| `/ung-tuyen/quan-ly` | `app/ung-tuyen/quan-ly/page.tsx` | `ApplyManagePage` |
| `/academy` | `app/academy/page.tsx` | `AcademyPage` |
| `/lien-he` | `app/lien-he/page.tsx` | `ContactPage` |
| `/dieu-khoan-su-dung` | `app/dieu-khoan-su-dung/page.tsx` | `LegalPage` |
| `/chinh-sach-bao-mat` | `app/chinh-sach-bao-mat/page.tsx` | `LegalPage` |
| `/duan-canho-forest-onsen` | `app/duan-canho-forest-onsen/page.tsx` | `ForestOnsenLanding` |

---

## 7. Build Config

```ts
// next.config.ts
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },  // Static export
};
```

> **Note**: Không cần `output: 'export'` vì deploy trên Vercel hỗ trợ Next.js App Router native (SSR/SSG).

---

## 7.1 SEO & Search Console

| File | Mô tả |
|------|-------|
| `src/app/robots.ts` | Cho phép crawl toàn bộ, chặn `/quan-ly` routes |
| `src/app/sitemap.ts` | 15 static URLs (chưa bao gồm dynamic posts) |
| `src/app/layout.tsx` | Google site verification: `k7gJl-mR813vH7LjJj1wD4B23PDH4N-F_bEW9pHylmc` |

**Trạng thái:**
- Sitemap đã submit: `https://era.com.vn/sitemap.xml`
- Google Search Console property: `https://era.com.vn/`
- Các trang đang được request re-index sau khi cập nhật metadata

---

## 7.2 Backend Integration

### Tech Stack
| Layer | Công nghệ |
|-------|-----------|
| Framework | NestJS 11 |
| Language | TypeScript 5 |
| ORM | Prisma 6.6.0 |
| Database | Supabase PostgreSQL |
| File Storage | Cloudflare R2 |
| Deploy | Google Cloud Run |
| API Client | Axios |

### Auth Flow
- Login gọi `POST /auth/login` → backend trả về `{ account, accessToken, refreshToken }`
- Frontend lưu token vào `localStorage`
- Đồng thờ set cookie non-HttpOnly `access_token` để Next.js middleware đọc được
- Mỗi API request tự động thêm `Authorization: Bearer <accessToken>` qua axios interceptor
- Khi access token hết hạn (401), interceptor tự động gọi `POST /auth/refresh` với refresh token
- Logout xóa localStorage + cookie, redirect về `/`

### API Client
| File | Mô tả |
|------|-------|
| `src/api/client.ts` | Axios instance với `withCredentials: true` |
| `src/api/interceptors.ts` | Request/response interceptors: thêm Bearer token, refresh token, unwrap response data |
| `src/api/config.ts` | `BASE_URL` từ `NEXT_PUBLIC_API_URL` |
| `src/api/domains/*.ts` | API helpers theo module (auth, accounts, news, media) |

### Middleware
| File | Mô tả |
|------|-------|
| `src/proxy.ts` | Next.js middleware bảo vệ routes `/quan-ly` và `/ho-so-ca-nhan`. Đọc cookie `access_token`, redirect về `/` nếu chưa đăng nhập. Set `Cache-Control: no-store` để tránh bfcache. |

### Environment Variables
| Variable | Mô tả |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Base URL backend, ví dụ `https://era-backend-xxx.asia-southeast1.run.app` |

---

## 8. Animation Convention

> **Current**: Project đang không dùng animation library. Các section render static.
>
> Nếu cần thêm animation sau này, đề xuất dùng Framer Motion với pattern:
> ```tsx
> <motion.div
>   initial={{ opacity: 0, y: 20 }}
>   whileInView={{ opacity: 1, y: 0 }}
>   viewport={{ once: true }}
>   transition={{ delay: index * 0.1 }}
> >
> ```

---

## 9. Common Patterns (chưa tách thành UI component)

| Pattern | Files lặp | Đề xuất tách |
|---------|-----------|--------------|
| Hero Banner (`relative` + `Image fill` + overlay) | 12 hero sections | `ui/HeroBanner.tsx` |
| Data Table (header + body + edit/delete + empty) | 3 manage lists | `ui/DataTable.tsx` hoặc `shared/ManagePageTemplate.tsx` |
| Input / Select (rounded-lg border-gray-200 ...) | 4 form files | `ui/Input.tsx`, `ui/Select.tsx` |
| Image Fallback (rounded-2xl + bg-gray-100 + Image) | 11 files | `ui/ImageWithFallback.tsx` |
| Breadcrumb (`flex gap-2` + Link + `/`) | 3 detail pages | `ui/Breadcrumb.tsx` |
| Carousel Arrow (`w-10 h-10 rounded-full border`) | 3 testimonial/related sections | `ui/CircleButton.tsx` |
| File Upload (border-dashed + hover state) | 3 form files | `ui/FileUpload.tsx` |
| Search Input (icon + bg-gray-50 + input) | 2 files | `ui/SearchInput.tsx` |

---

## 10. Tab Implementations (đang phân mảnh)

Hiện có **4 kiểu tab** khác nhau trong project:

1. **Underline indicator** — `AboutERAVNTabs`, `NewsTabsSection`, `ProjectsListSection`
2. **Pill toggle** — `ApplyRecruitmentSection`, `AcademyCoursesSection`, `ContactOfficesSection`
3. **Border container** — `AboutERAVNAwardsSection`
4. **Rounded-full segmented** — `LegalPageLayout`

> **Todo**: Unify thành 1 `<Tabs>` component trong `ui/`.

---

## 11. Form Styling Pattern

Input class chuẩn đang copy-paste ở nhiều file:
```tsx
className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
```

> **Todo**: Tách thành `ui/Input.tsx` và `ui/Select.tsx`.

---

## 12. Image Handling (Static Export)

Với `images.unoptimized: true`:
- Dùng `<Image fill className="object-cover" />` cho background / hero images
- Dùng `<Image width height />` cho explicit size (card thumbnail, avatar)
- Chỉ dùng `<img>` cho BCT logo ở Footer (tránh lỗi ESLint `no-img-element`)
- Khi API chưa có, dùng gray placeholder (`bg-gray-200`) với initials text

---

## 13. Mock Data Status

Nhiều section đang dùng mock data hardcoded inline:
- `AboutERAVNAwardsSection` — achievers, agents, divisions
- `ApplyRecruitmentSection` — jobs array
- `ProjectsListSection` — projects array
- `NewsDetailPage` — relatedNews array

> Khi API ready, chỉ cần thay mock arrays bằng API response. Component structure không đổi.

---

## 14. Anti-patterns

| Vấn đề | Ví dụ | Cách làm đúng |
|--------|-------|---------------|
| Override Section padding qua `className` | `className="!py-10"` trên `<Section>` | Dùng prop `padding="xs/sm/md/lg/xl"` của Section |
| Viết `max-w-6xl mx-auto px-4` inline | `ApplyJobDetailPage.tsx` (4 lần) | Dùng `<Container size="lg">` |
| Copy-paste input class string | `ApplyManageForm`, `NewsManageForm` | Dùng `ui/Input.tsx` |
| Inline `style={{ color: colors.gray[500] }}` | Nhiều file trước refactor | Dùng Tailwind class `text-gray-500` hoặc `style` từ `lib/theme` |

---

## 15. Known Issues / Tech Debt

| Issue | File | Mức độ | Ghi chú |
|-------|------|--------|---------|
| `setState` trong `useEffect` | `ApplyGalleryModal.tsx:33` | Medium | Có thể gây cascading renders |
| `any` type | `RichEditor.tsx` (5 lần), `Button.tsx:forwardRef` | Medium | Cần thay bằng proper types |
| `<img>` thay vì `<Image>` | `Footer.tsx` (BCT logo ×2) | Low | BCT logo không cần optimize |
| `no-unescaped-entities` | `ProjectsDetailContentSection.tsx`, `ProjectsManageList.tsx` | Low | `"` nên escape thành `&quot;` |
| Unused imports | `NewsManagePage.tsx` (colors), nhiều file khác | Low | Dọn dẹp định kỳ |
| Turbopack panic `/ung-tuyen/` | Dev server only | Low | Xóa `.next` và chạy lại nếu gặp |
| Dead code removed | May 2026 | Done | Đã xóa `Badge.tsx`, `SectionTitle.tsx`, `ImagePlaceholder.tsx`, `CompassCollabSection.tsx`, `CompassLoadingAnimation.tsx`, 12 CKEditor sub-packages, `axios`, `themeClasses`, `cssVariables`, `color()`, `getRoute()`, `RouteKey` |

---

## 16. Notes

- **Static Export**: `images.unoptimized: true` → build ra HTML tĩnh
- **Scroll Performance**: Dùng `requestAnimationFrame` trong scroll handlers
- **Mobile Header**: Floating pills pattern + slide drawer
- **CKEditor**: Custom upload adapter (base64), license GPL
- **Path Alias**: `@/*` → `./src/*`
- **Metadata**: Mỗi page đều có `Metadata` export với OpenGraph
