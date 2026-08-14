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
| Flag Icons | country-flag-icons (SVG, inline) |
| Animation | Framer Motion |
| Carousel | embla-carousel-react, embla-carousel-autoplay |
| HTML Parsing | html-react-parser |
| Lightbox | yet-another-react-lightbox |
| Validation | zod |
| Utilities | clsx, tailwind-merge |
| Deploy | Vercel (Git integration, auto-deploy on push) |
| React Compiler | babel-plugin-react-compiler (devDependency) |

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
│       ├── accounts/         # Quản lý tài khoản
│       ├── academy/
│       ├── apply/            # Trang tuyển dụng (ứng tuyển)
│       ├── auth/             # Form đăng nhập
│       ├── contact/
│       ├── join/             # Gia nhập ERA
│       ├── landing/          # Landing pages (project-specific)
│       ├── legal/            # Điều khoản / chính sách
│       ├── magazines/        # E-magazine
│       ├── news/
│       ├── profile/          # Hồ sơ cá nhân
│       └── projects/
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
- Landing page routes nằm trong `app/(landing)/<slug>/page.tsx` để chia sẻ layout/tracking scripts qua route group.
- Components landing page nằm trong `components/sections/landing/<project>/`.
- Cấu trúc chuẩn:
  ```
  app/(landing)/
  └── <slug>/
      └── page.tsx            # Export metadata + render landing component

  components/sections/landing/<project>/
  ├── index.tsx             # Re-export
  ├── <Project>Landing.tsx  # Compose các sections
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
| `src/components/ui/ConfirmDialog.tsx` | Hộp thoại xác nhận (confirm/cancel) |
| `src/components/ui/Pagination.tsx` | Phân trang |
| `src/components/ui/PasswordInput.tsx` | Input mật khẩu có toggle ẩn/hiện |
| `src/components/ui/PopupNotification.tsx` | Thông báo popup |
| `src/components/ui/NetworkErrorPopup.tsx` | Popup lỗi mạng duy nhất, thay thế các thông báo lỗi chung |
| `src/components/ui/admin/*` | Shared admin list UI: `AdminListHeader`, `AdminFilters`, `AdminLoading`, `AdminTable`, `AdminEmptyState`, `SearchInput`, `SelectField`, `TagFilter`, `ViewModeToggle`, `ReviewerNotifySelect` |
| `src/components/shared/CountryFlag.tsx` | Inline SVG country flag component |
| `src/components/sections/news/manage/NewsManageActions.tsx` | Shared news admin action buttons (table/card layouts) |


### Lib
| File | Mô tả |
|------|-------|
| `src/lib/utils.ts` | `cn()` utility |
| `src/lib/theme.ts` | Color palette, `withOpacity()` utility |
| `src/lib/routes.ts` | Centralized route constants (`ROUTES`) |
| `src/lib/date.ts` | Shared date formatting (`formatDate`, `formatDateShort`, `formatDateTime`) |
| `src/lib/news.ts` | Shared news helpers (`getArticleImage`, `getFirstImageFromContent`) |
| `src/lib/news/status.ts` | News status badge config |
| `src/lib/newsCategoryServer.ts` | Server-side news category helpers |
| `src/lib/magazine/status.ts` | Magazine status badge config |
| `src/lib/recruitment/status.ts` | Recruitment status badge config |
| `src/lib/projects.ts` | Project helpers, FAQ constants, `PROJECT_TAGS`, `VIETNAM_PROVINCES` |
| `src/lib/permissions.ts` | Permission utilities |
| `src/lib/cookies.ts` | Cookie helpers |
| `src/lib/country.ts` | Country code utilities |
| `src/lib/error-messages.ts` | Error message constants |
| `src/lib/imageCompression.ts` | Browser image compression utility |

### Hooks
| File | Mô tả |
|------|-------|
| `src/hooks/useScrollToTop.ts` | Hook detect scroll > threshold |
| `src/hooks/usePermissionWarning.ts` | Hook hiển thị cảnh báo thiếu quyền |

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
| `/dang-nhap` | `app/dang-nhap/page.tsx` | `LoginPage` |
| `/ve-chung-toi` | `app/ve-chung-toi/page.tsx` | `AboutPage` |
| `/ve-chung-toi/apac` | `app/ve-chung-toi/apac/page.tsx` | `ApacPage` |
| `/ve-chung-toi/compass` | `app/ve-chung-toi/compass/page.tsx` | `CompassPage` |
| `/ve-chung-toi/era-real-estate` | `app/ve-chung-toi/era-real-estate/page.tsx` | `EraRealEstatePage` |
| `/ve-chung-toi/ve-era-viet-nam` | `app/ve-chung-toi/ve-era-viet-nam/page.tsx` | `AboutERAVNPage` |
| `/du-an` | `app/du-an/page.tsx` | `ProjectsPage` |
| `/du-an/[slug]` | `app/du-an/[slug]/page.tsx` | `ProjectsDetailPage` |
| `/du-an/quan-ly` | `app/du-an/quan-ly/page.tsx` | `ProjectsManagePage` |
| `/tin-tuc` | `app/tin-tuc/page.tsx` | `NewsPage` |
| `/tin-tuc/[slug]` | `app/tin-tuc/[slug]/page.tsx` | `NewsDetailPage` |
| `/tin-tuc/tin-thi-truong` | `app/tin-tuc/tin-thi-truong/page.tsx` | `NewsCategoryPage` |
| `/tin-tuc/tin-du-an` | `app/tin-tuc/tin-du-an/page.tsx` | `NewsCategoryPage` |
| `/tin-tuc/era-news` | `app/tin-tuc/era-news/page.tsx` | `NewsCategoryPage` |
| `/tin-tuc/thong-cao-bao-chi` | `app/tin-tuc/thong-cao-bao-chi/page.tsx` | `NewsCategoryPage` |
| `/tin-tuc/tap-chi` | `app/tin-tuc/tap-chi/page.tsx` | `MagazinesPage` |
| `/tin-tuc/tim-kiem` | `app/tin-tuc/tim-kiem/page.tsx` | `NewsSearchPage` |
| `/tin-tuc/quan-ly` | `app/tin-tuc/quan-ly/page.tsx` | `NewsManagePage` |
| `/tap-chi/quan-ly` | `app/tap-chi/quan-ly/page.tsx` | `MagazineManagePage` |
| `/khoa-hoc/quan-ly` | `app/(admin)/khoa-hoc/quan-ly/page.tsx` | `AcademyCourseManagePage` |
| `/agents/quan-ly` | `app/agents/quan-ly/page.tsx` | `AgentManagePage` |
| `/vinh-danh-va-he-thong/quan-ly` | `app/vinh-danh-va-he-thong/quan-ly/page.tsx` | `HonorsManagePage` |
| `/tai-khoan/quan-ly` | `app/tai-khoan/quan-ly/page.tsx` | `AccountManagePage` |
| `/ho-so-ca-nhan` | `app/ho-so-ca-nhan/page.tsx` | `ProfilePage` |
| `/gia-nhap` | `app/gia-nhap/page.tsx` | `JoinPage` |
| `/tuyen-dung` | `app/tuyen-dung/page.tsx` | `ApplyPage` |
| `/tuyen-dung/chi-tiet-cong-viec/[slug]` | `app/tuyen-dung/chi-tiet-cong-viec/[slug]/page.tsx` | `ApplyJobDetailPage` |
| `/tuyen-dung/quan-ly` | `app/tuyen-dung/quan-ly/page.tsx` | `ApplyManagePage` |
| `/tuyen-dung/ung-vien` | `app/tuyen-dung/ung-vien/page.tsx` | `ApplicationsManagePage` |
| `/thank-you-eco-retreat` | `app/(landing)/thank-you-eco-retreat/page.tsx` | `ThankYouEcoRetreatPage` |
| `/academy` | `app/academy/page.tsx` | `AcademyPage` |
| `/lien-he` | `app/lien-he/page.tsx` | `ContactPage` |
| `/dieu-khoan-su-dung` | `app/dieu-khoan-su-dung/page.tsx` | `LegalPage` |
| `/chinh-sach-bao-mat` | `app/chinh-sach-bao-mat/page.tsx` | `LegalPage` |
| `/duan-canho-forest-onsen` | `app/(landing)/duan-canho-forest-onsen/page.tsx` | `ForestOnsenLanding` |
| `/phan-khu-rung-phuong-duan-eco-retreat` | `app/(landing)/phan-khu-rung-phuong-duan-eco-retreat/page.tsx` | `EcoRetreatLanding` |

---

## 7. Build Config

```ts
// next.config.ts
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },  // Không dùng Next.js image optimization
};
```

> **Note**: Project không cấu hình `output: 'export'`. Ứng dụng dùng App Router native trên Vercel, bao gồm SSR/SSG/ISR và route handlers.

---

## 7.1 SEO & Search Console

| File | Mô tả |
|------|-------|
| `src/app/robots.ts` | Cho phép crawl public pages, chặn các admin/private paths: `/tin-tuc/quan-ly`, `/tap-chi/quan-ly`, `/du-an/quan-ly`, `/agents/quan-ly`, `/vinh-danh-va-he-thong/quan-ly`, `/tuyen-dung/quan-ly`, `/tuyen-dung/ung-vien`, `/tai-khoan/quan-ly`, `/ho-so-ca-nhan` |
| `src/app/sitemap.ts` | Static URLs + dynamic project detail URLs từ API. Chỉ đưa project/news có `isIndexed === true` vào sitemap. |
| `src/app/layout.tsx` | Google site verification: `k7gJl-mR813vH7LjJj1wD4B23PDH4N-F_bEW9pHylmc` |

**Trạng thái:**
- Sitemap đã submit: `https://era.com.vn/sitemap.xml`
- Google Search Console property: `https://era.com.vn/`
- Các trang đang được request re-index sau khi cập nhật metadata

---

## 7.2 Analytics & Tracking

| File | Mô tả |
|------|-------|
| `src/components/analytics/GoogleTagManager.tsx` | GTM noscript fallback. Script GTM chính được inject trong `<head>` của `layout.tsx` qua `NEXT_PUBLIC_GTM_ID`. |
| `src/components/analytics/MgidSensor.tsx` | MGID Sensor script, tự động áp dụng cho mọi landing page trong route group `(landing)`. |

### Landing page tracking
- Landing pages nằm trong `src/app/(landing)/` để chia sẻ layout/tracking scripts.
- MGID hiện chạy trên `/duan-canho-forest-onsen/`, `/thank-you-eco-retreat/` và `/phan-khu-rung-phuong-duan-eco-retreat/`, dễ mở rộng cho landing mới.

---

## 7.3 Backend Integration

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
- Login gọi `POST /auth/login` → backend trả về `{ account }` và set HttpOnly cookie `access_token` / `refresh_token`
- Frontend không lưu token vào `localStorage`; browser tự gửi HttpOnly cookie qua `withCredentials: true`
- Frontend set cookie non-HttpOnly `era_auth_state` (flag only, no token) để UI biết trạng thái login mà không cần gọi `/auth/me` khi chưa login
- Mỗi API request không thêm `Authorization` header; backend đọc token từ cookie
- Khi access token hết hạn (401), interceptor tự động gọi `POST /auth/refresh`; backend đọc refresh token từ cookie và set cookie mới
- Nếu refresh thất bại, request bị reject; `AuthContext.fetchMe()` cập nhật `account = null` và `AuthGuard` redirect về `/dang-nhap`
- Logout gọi `POST /auth/logout` → backend clear HttpOnly cookies; frontend xóa `era_auth_state` và redirect về `/`
- `pageshow` event kích hoạt re-validate khi page được restore từ bfcache; nếu `era_auth_state` mất thì redirect ngay để tránh hiển thị UI cũ

### API Client
| File | Mô tả |
|------|-------|
| `src/api/client.ts` | Axios instance với `withCredentials: true` |
| `src/api/interceptors.ts` | Response interceptor: unwrap response data, tự động refresh token qua cookie khi 401, retry request |
| `src/api/config.ts` | `BASE_URL` từ `NEXT_PUBLIC_API_URL` |
| `src/api/domains/*.ts` | API helpers theo module (auth, accounts, news, media, magazines, recruitment, projects, agents, honors, monthly honors, annual honors, academy courses) |

### API Routes

| File | Mô tả |
|------|-------|
| `src/app/api/revalidate/route.ts` | Webhook revalidate từ backend, xác thực bằng `REVALIDATE_SECRET` |
| `src/app/api/submit-lead/route.ts` | Proxy submit lead lên Google Apps Script (`LEAD_SCRIPT_URL`) |

### Route Guard
| File | Mô tả |
|------|-------|
| `src/proxy.ts` | Next.js proxy redirect URL danh mục tin tức cũ (`/tin-tuc/danh-muc/<slug>`) sang URL mới và bảo vệ server-side cho mọi path chứa `/quan-ly` hoặc `/ho-so-ca-nhan`. Kiểm tra cookie `era_auth_state`, redirect về `/dang-nhap` nếu chưa đăng nhập, và set `Cache-Control: no-store`. |
| `src/components/guards/AuthGuard.tsx` | Client-side guard dự phòng. Dựa vào `AuthContext.isAuthenticated`, redirect về `/dang-nhap` nếu chưa đăng nhập. |
| `src/app/(admin)/layout.tsx` | Wrap admin pages bằng `<AuthGuard>` và render `AdminSidebar` cho toàn bộ admin routes. |

### Environment Variables
| Variable | Mô tả |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Base URL backend, ví dụ `https://era-backend-xxx.asia-southeast1.run.app` |
| `REVALIDATE_SECRET` | Secret dùng để xác thực webhook revalidate từ BE |

---

## 7.4 News Module

### Public pages
- `/tin-tuc` tải danh sách tin đã publish từ API và gom theo danh mục.
- Category pages có route riêng: `/tin-tuc/tin-thi-truong`, `/tin-tuc/tin-du-an`, `/tin-tuc/era-news`, `/tin-tuc/thong-cao-bao-chi`.
- `/tin-tuc/[slug]` render chi tiết bài viết, metadata động, chỉ hiển thị bài đã publish và không nằm trong tương lai theo `displayPublishedAt` / `publishedAt`.
- Trang chi tiết tin tức render `NewsFaqSection` nếu bài có FAQ.
- Với danh mục `thong-cao-bao-chi`, trang chi tiết dùng layout một cột và hiển thị file PDF đính kèm ở cuối nội dung nếu có.

### Admin form
- Khi tạo bài viết, bắt buộc nhập 2-5 FAQ. FAQ gửi cùng payload create.
- Khi sửa bài viết đã tồn tại, phần thông tin chính và phần FAQ có thao tác lưu độc lập.
- FAQ dùng endpoint `PATCH /articles/:id/faqs`; chỉ sửa khi bài ở trạng thái `draft` hoặc `pending`, bài `published` chỉ đọc.
- Câu trả lời FAQ lưu HTML từ CKEditor compact: bold, italic, font color, bullet list và numbered list.
- Với category `thong-cao-bao-chi`, form cho phép upload tối đa 1 file PDF optional; FE gửi `pdfMediaId` về API.
- Với category `era-news`, form hiển thị `countryCode` (`SG / US / VN`) và public detail render `CountryFlag`.

---

## 7.5 Project Module

### Public pages
- `/du-an` tải danh sách dự án đã publish từ API và hỗ trợ tìm kiếm.
- Search dùng query `?search=...`; trang danh sách đọc query này khi render server-side.
- Chọn một item trong dropdown gợi ý đi thẳng tới `/du-an/[slug]`.
- Nhấn Enter hoặc nút `TÌM` điều hướng về `/du-an/?search=...`.
- `/du-an/[slug]` dùng ISR (`revalidate = 300`), metadata động và chỉ lấy project đã publish.

### Admin pages
- `/du-an/quan-ly/` quản lý dự án với bộ lọc tìm kiếm theo tên, trạng thái xuất bản, tỉnh/thành phố và **tags đa lựa chọn** (`TagFilter`).
- Tags filter gửi query `tags=tag1,tag2` về API; BE dùng `hasEvery` để lọc dự án chứa tất cả tag đã chọn.
- Tỉnh/thành phố filter dùng dropdown từ `VIETNAM_PROVINCES`, gửi query `province` về API; BE lọc bằng `location contains province`.

### Project form
- `location` trên API vẫn là một chuỗi.
- UI tách thành dropdown 34 tỉnh/thành bắt buộc và địa chỉ chi tiết không bắt buộc.
- Trước khi gửi API, FE ghép thành `Tỉnh/Thành phố, địa chỉ chi tiết`.
- Danh sách 34 tỉnh/thành nằm trong `src/lib/projects.ts` với constant `VIETNAM_PROVINCES`, dùng chung cho form và filter list.
- Project dùng `tags: string[]` thay cho các field type/status cũ.
- Form tạo/sửa dự án hiển thị đầy đủ 10 tags từ `PROJECT_TAGS`.

### Project FAQ
- Mỗi project bắt buộc có từ 2 đến 5 FAQ.
- Khi tạo project, FAQ được gửi cùng payload create.
- Khi chỉnh sửa project, form thông tin chính và FAQ có hai thao tác lưu độc lập.
- FAQ dùng endpoint `PATCH /projects/:id/faqs`.
- FAQ chỉ sửa được khi project ở trạng thái `draft` hoặc `pending`; `published` chỉ đọc.
- Câu trả lời FAQ lưu HTML từ CKEditor compact: bold, italic, font color, bullet list và numbered list.
- `ProjectsFaqSection` dùng chung cho preview và trang chi tiết công khai.

---

## 7.6 Agents / Honors Module

### Agents admin
- `/agents/quan-ly` quản lý danh sách agent.
- API domain: `src/api/domains/agents.ts`.
- Permission FE sidebar dùng `agents.all.view`.
- Form hỗ trợ tạo/sửa/xóa agent với fields:
  - `name` bắt buộc
  - `avatar` optional
  - `code` optional
- Avatar upload dùng drag/drop hoặc chọn file, upload qua `mediaApi.upload(..., folder='agents')`.
- FE truyền `filenameBase` theo tên agent để BE tạo tên file dạng slug tên agent + random suffix.
- UI không hiển thị trực tiếp URL ảnh avatar; chỉ hiển thị preview.

### Vinh danh và Hệ thống admin
- `/vinh-danh-va-he-thong/quan-ly` cho phép chọn một honor category rồi thêm/sắp xếp danh sách agents trong category đó.
- API domain: `src/api/domains/honors.ts`.
- Permission FE sidebar dùng `honors.all.view`.
- Save danh sách gọi `PATCH /honors/categories/:slug/agents` với list `agentIds` theo đúng thứ tự UI.

### Public About ERA Vietnam
- `AboutERAVNDivisionsSection` gọi `honorsApi.getPublicCategories()` và lấy category `he-thong-divisions-tai-era-vietnam`.
- `AboutERAVNAwardsSection` tab “Vinh Danh Thường Niên” gọi `annualHonorsApi.getPublicLists()` để render danh sách vinh danh theo năm.
- Tab “Vinh Danh Tháng” gọi `monthlyHonorsApi.getPublicLists()` để render danh sách vinh danh theo tháng.

---

## 8. Animation Convention

- Project có dùng Framer Motion, hiện rõ nhất ở `CompassMergeAnimation`.
- Không dùng animation đại trà cho mọi section; chỉ dùng khi animation phục vụ nội dung hoặc interaction cụ thể.
- Pattern ưu tiên: animation nằm trong component client riêng, không đẩy motion logic vào `app/*/page.tsx`.

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

---

## 10. Tab Implementations (đang phân mảnh)

Hiện có **4 kiểu tab** khác nhau trong project:

1. **Underline indicator** — `AboutERAVNTabs`, `NewsTabsSection`
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

## 12. Image Handling

Với `images.unoptimized: true`:
- Dùng `<Image fill className="object-cover" />` cho background / hero images
- Dùng `<Image width height />` cho explicit size (card thumbnail, avatar)
- Chỉ dùng `<img>` cho BCT logo ở Footer (tránh lỗi ESLint `no-img-element`)
- Khi API chưa có, dùng gray placeholder (`bg-gray-200`) với initials text

---

## 13. Mock Data Status

Nhiều section đang dùng mock data hardcoded inline:
- `AboutERAVNAwardsSection` — tab “Vinh Danh Tháng” lấy data từ Monthly Honors API; tab “Vinh Danh Thường Niên” lấy data từ Annual Honors API.
- Một số section marketing/landing — nội dung giới thiệu, gallery, testimonial (bao gồm landing Eco Retreat và Forest Onsen; các section marketing này được giữ static theo thiết kế).

Các module news, projects, recruitment, magazines, agents, honors, monthly honors, annual honors và academy courses đã lấy dữ liệu từ API ở các luồng đã triển khai. Project FAQ và News FAQ không còn dùng mock data. `AboutERAVNDivisionsSection` đã lấy danh sách divisions thật từ Honors API.

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
| `<img>` thay vì `<Image>` | `Footer.tsx` (BCT logo ×2) | Low | BCT logo không cần optimize |
| `no-unescaped-entities` | `ProjectsDetailContentSection.tsx`, `ProjectsManageList.tsx` | Low | `"` nên escape thành `&quot;` |
| Unused imports | `NewsManagePage.tsx` (colors), nhiều file khác | Low | Dọn dẹp định kỳ |
| Turbopack panic `/tuyen-dung/` | Dev server only | Low | Xóa `.next` và chạy lại nếu gặp |
| Stale route constants | `src/lib/routes.ts` | Low | `commission`, `training`, `inventory`, `technology`, `brandStory`, `operations` chưa có page file tương ứng — cần tạo page hoặc dọn dẹp |
| `any` type | `RichEditor.tsx`, `Button.tsx:forwardRef` | Done | Đã thay bằng proper types |
| Popup lỗi chung | Nhiều file | Done | Đã thay bằng `NetworkErrorPopup` |
| Dead code removed | May 2026 | Done | Đã xóa `Badge.tsx`, `SectionTitle.tsx`, `ImagePlaceholder.tsx`, `CompassCollabSection.tsx`, `CompassLoadingAnimation.tsx`, 12 CKEditor sub-packages, `themeClasses`, `cssVariables`, `color()`, `getRoute()`, `RouteKey` |

---

## 16. Architecture Decisions & Rules

### Admin list UI
- Mọi trang quản lý list (`NewsManageList`, `MagazineManageList`, `ProjectsManageList`, `ApplyManageList`, `ApplicationsManageList`, `AccountManageList`, `AgentManagePage`, `HonorsManagePage`) ưu tiên dùng chung các base components trong `src/components/ui/admin/`:
  - `AdminListHeader` cho header tiêu đề + subtitle + nút tạo
  - `AdminFilters` cho panel bộ lọc
  - `AdminLoading`, `AdminTable`, `AdminEmptyState` cho trạng thái list
  - `SearchInput` / `SelectField` / `TagFilter` cho controls lọc
  - `ViewModeToggle` cho chuyển đổi table/card view

### News actions
- Tất cả action buttons trong admin news (table lẫn card) phải dùng `NewsManageActions` để đảm bảo logic phân quyền và UI đồng nhất.

### Shared helpers
- Không định nghĩa lại `formatDate`, `getArticleImage`, `statusConfig` trong các component. Import từ `src/lib/date.ts`, `src/lib/news.ts`, hoặc `src/lib/<module>/status.ts`.

### Country indicator (ERA News)
- `countryCode` (`SG / US / VN`) chỉ render UI cho danh mục `era-news`.
- Dùng `CountryFlag` component (SVG inline), không dùng ảnh asset.

### Form validation
- Các field enum optional như `countryCode` phải normalize giá trị rỗng (`""`) thành `undefined` trước khi gửi schema validation.

## 17. Notes

- **Image optimization**: `images.unoptimized: true` chỉ tắt Next.js image optimization, không biến toàn bộ ứng dụng thành static export
- **Scroll Performance**: Dùng `requestAnimationFrame` trong scroll handlers
- **Mobile Header**: Floating pills pattern + slide drawer
- **CKEditor**: Custom upload adapter (base64), license GPL
- **Path Alias**: `@/*` → `./src/*`
- **Metadata**: Public pages chính có `metadata` hoặc `generateMetadata`; admin pages và route handlers không bắt buộc export metadata riêng

---

## 18. Current Codebase Additions - Academy Courses, Monthly Honors, Admin Routes

> Section này cập nhật trạng thái codebase hiện tại. Nếu có điểm nào mâu thuẫn với các phần cũ phía trên, ưu tiên section này.

### Routes added / updated

| Route | Page File | Main Component |
|-------|-----------|----------------|
| `/dang-nhap` | `app/dang-nhap/page.tsx` | `LoginPage` |
| `/academy` | `app/academy/page.tsx` | `AcademyPage` |
| `/khoa-hoc/quan-ly` | `app/(admin)/khoa-hoc/quan-ly/page.tsx` | `AcademyCourseManagePage` |
| `/phan-khu-rung-phuong-duan-eco-retreat` | `app/(landing)/phan-khu-rung-phuong-duan-eco-retreat/page.tsx` | `EcoRetreatLanding` |

Admin/private route handling:

- `src/proxy.ts` protects all paths containing `/quan-ly`, so `/khoa-hoc/quan-ly` is protected server-side by `era_auth_state`.
- `src/app/(admin)/layout.tsx` wraps admin pages with `AuthGuard` and renders `AdminSidebar`.
- `src/components/layout/LayoutWrapper.tsx` includes `/khoa-hoc/quan-ly` in `ADMIN_PATHS`, so public Header/Footer/ToTop are hidden for this route.
- `src/app/robots.ts` disallows `/khoa-hoc/quan-ly`.

### Academy public page

- `AcademyCoursesSection` no longer uses hardcoded course mock data for the course list.
- Public course list uses:
  - `GET /academy-courses/public`
  - `GET /academy-courses/public/tags`
- Filter “Chọn khóa học” supports multi-select tags.
- FE sends multi-tag filter as `tagIds=id1,id2,id3`.
- Backend returns courses matching at least one selected tag.
- Empty filtered result displays neutral gray empty state: “Chưa có khóa học phù hợp.”
- Course card keeps the mock UI sizing/layout: left image column, title, tag line, bullet-style description, opening date/COMING SOON, CTA button.
- Course `description` comes from richtext HTML, but public card extracts list/text items and renders them as compact bullet/numbered text so richtext heading sizes do not break the card layout.

### Academy course admin

- New admin page: `/khoa-hoc/quan-ly`.
- Component: `src/components/sections/academy/manage/AcademyCourseManagePage.tsx`.
- API domain: `src/api/domains/academy-courses.ts`.
- Types added in `src/types/api.ts`:
  - `AcademyCourse`
  - `AcademyCourseTag`
  - `AcademyCourseFilters`
  - `CreateAcademyCourseInput`
  - `UpdateAcademyCourseInput`
  - tag create/update input types
- Sidebar item “Khóa học” uses permission `academy.courses.all.view`.
- Admin features:
  - List/search/filter courses.
  - Filter by tag and active status.
  - Create/update/delete course.
  - Upload course image via `mediaApi.uploadImage(..., 'academy')`.
  - Choose multiple tags for a course.
  - Richtext description uses shared `RichEditor` with `disableImage` and `compact`, matching News FAQ answer editor.
  - `openingDate` optional; empty value means public UI displays `COMING SOON`.
  - `isActive` controls whether course appears in public API.
- UI uses shared admin components: `AdminListHeader`, `AdminFilters`, `SearchInput`, `SelectField`, `AdminTable`, `AdminEmptyState`, `Pagination`, `ConfirmDialog`, `PopupNotification`, `NetworkErrorPopup`.

### Media API update

- `src/api/domains/media.ts` upload folder union includes `academy`.
- Course images are uploaded to Cloudflare R2 folder `academy` through the backend media endpoint.

### Honors / Monthly honors public data

- `/ve-chung-toi/ve-era-viet-nam/` awards area now uses real APIs for monthly honors instead of mock data.
- API domain: `src/api/domains/monthly-honors.ts`.
- Monthly honors admin UI is integrated inside `/vinh-danh-va-he-thong/quan-ly`.
- Public monthly honors uses `GET /monthly-honors/public`.
- Admin monthly honors uses `GET/POST/PATCH/DELETE /monthly-honors`.

### Annual honors public/admin data

- `/ve-chung-toi/ve-era-viet-nam/` awards area uses real annual honor lists instead of the old single fixed annual grouping.
- API domain: `src/api/domains/annual-honors.ts`.
- Annual honors admin UI is integrated inside `/vinh-danh-va-he-thong/quan-ly` under the `Vinh danh thường niên` management option.
- Public annual honors uses `GET /annual-honors/public`.
- Admin annual honors uses:
  - `GET /annual-honors`
  - `GET /annual-honors/:id`
  - `POST /annual-honors`
  - `PATCH /annual-honors/:id`
  - `PATCH /annual-honors/:id/categories/:slug/agents`
  - `DELETE /annual-honors/:id`
- Each annual list has `year`, optional `title`, and category-specific agent memberships. Year must be unique.
- The 2026 migration copies current legacy honor memberships into the 2026 annual list, excluding the system divisions category.
- Permission group is shared with honors: `honors.all.view/create/update/delete`.

### Reviewer notification flow

- Account create/update form has reviewer flags:
  - `isNewsReviewer`
  - `isProjectReviewer`
- Submit-review dialogs/forms for news and projects include `ReviewerNotifySelect`.
- FE sends optional `notifyAccountId` when submitting news/project for review.
- Email button deep-links back to the admin edit form with `?edit=<id>`.

### API routes

| File | Mô tả |
|------|-------|
| `src/app/api/revalidate/route.ts` | Webhook revalidate từ backend, xác thực bằng `REVALIDATE_SECRET` |
| `src/app/api/submit-lead/route.ts` | Proxy submit lead lên Google Apps Script (`LEAD_SCRIPT_URL`) |

### API domains currently active

`src/api/domains/*.ts` currently includes helpers for:

- `auth`
- `accounts`
- `news`
- `media`
- `magazines`
- `recruitment`
- `projects`
- `agents`
- `honors`
- `monthly-honors`
- `annual-honors`
- `academy-courses`
- `authors`
- `consultation`

### Mock data status update

- Academy course list on `/academy` uses real API data.
- News, projects, recruitment, magazines, agents, honors, monthly honors, annual honors, and academy courses have API-backed admin/public flows where implemented.
- Some marketing-only Academy sections still intentionally use static content/images: hero banners, stats, roadmap, videos, activities, testimonials, FAQ.
- Landing/marketing sections outside the CMS scope may still contain hardcoded content by design.
- Eco Retreat landing page (`/phan-khu-rung-phuong-duan-eco-retreat/`) renders real landing sections; marketing content inside landing is static by design.

---

## 19. Current Codebase Additions - Authors, Consultation, Rich Editor Image Layouts

> Section này phản ánh các phần mới hơn trong codebase hiện tại. Nếu có điểm nào mâu thuẫn với các section cũ phía trên, ưu tiên section này.

### Authors / Tác giả

- Public route mới:
  - `/tac-gia/[slug]` render trang hồ sơ tác giả.
- Admin route mới:
  - `/tac-gia/quan-ly` render `AuthorManagePage`.
- API domain:
  - `src/api/domains/authors.ts`.
- API endpoints FE đang dùng:
  - `GET /authors/public`
  - `GET /authors/public/:slug`
  - `GET /authors/public/:slug/articles`
  - `GET /authors/options`
  - `GET /authors`
  - `GET /authors/:id`
  - `POST /authors`
  - `PATCH /authors/:id`
  - `DELETE /authors/:id`
- Sidebar admin có item “Tác giả”, hiển thị theo permission `authors.all.view`.
- News form hiện có 2 field chọn tác giả hiển thị:
  - `displayAuthorId`
  - `displayReviewerId`
- Trang chi tiết tin tức render link tác giả/người kiểm duyệt nếu author đang active.
- JSON-LD:
  - `articleJsonLd()` dùng `displayAuthor` active làm `Person`, fallback về `Organization`.
  - `profilePageJsonLd()` render schema `ProfilePage` + `Person` cho trang tác giả.
- Sitemap đã include public author pages nếu API public trả dữ liệu.

### Consultation / Form tư vấn

- Shared component:
  - `src/components/shared/ConsultationCard.tsx`.
- API domain:
  - `src/api/domains/consultation.ts`.
- Endpoint:
  - `POST /consultation`.
- Hiện FE gửi:
  - `name`
  - `phone`
  - `sourceUrl`
  - `sourceLabel`
- `ToTopButton` có tích hợp consultation CTA trên mobile theo ngữ cảnh trang hiện tại.
- Luồng hiện tại là gửi thông tin tư vấn qua backend/mail, không có table DB riêng ở FE layer.

### RichEditor image layouts

- `RichEditor` hiện hỗ trợ chèn layout ảnh trong content HTML, chưa đổi DB.
- Grid image layout:
  - `src/components/shared/ImageGridModal.tsx`
  - `src/components/shared/image-grid-layout.ts`
  - Nút toolbar: `Grid ảnh`.
  - Hỗ trợ 2-6 ảnh.
  - Có biến thể layout cho 3 ảnh và 5 ảnh.
  - Sau khi lưu vào editor, grid có nút `Sửa` và `Xóa`; public/preview ẩn action buttons bằng CSS.
- Carousel image layout:
  - `src/components/shared/ImageCarouselModal.tsx`
  - `src/components/shared/image-carousel-layout.ts`
  - `src/components/shared/ImageCarousel.tsx`
- Layout ảnh được lưu trực tiếp trong richtext HTML bằng các `data-era-*` attributes, ví dụ:
  - `data-era-image-grid`
  - `data-era-layout-id`
  - `data-era-image-carousel`
  - `data-era-carousel-id`
- RichEditor có logic chặn chỉnh sửa trực tiếp bên trong block layout; người dùng phải bấm nút sửa/xóa của layout.

### Admin/private route notes

- `src/proxy.ts` bảo vệ mọi path có `/quan-ly`, nên `/tac-gia/quan-ly` đã được bảo vệ server-side theo cookie `era_auth_state`.
- `src/components/layout/LayoutWrapper.tsx` có `/tac-gia/quan-ly` trong danh sách admin paths để ẩn Header/Footer public.
- `src/app/robots.ts` hiện đang chặn nhiều admin/private routes. Nên đảm bảo luôn có `/tac-gia/quan-ly` trong danh sách disallow nếu chưa được thêm.

### Media folder notes

- FE media upload flow hiện đã có thêm folder phục vụ tác giả ở backend là `authors`.
- Nếu FE upload avatar tác giả qua media API, cần dùng đúng folder `authors`.

### Current known maintainability note

- `RichEditor.tsx` đang chứa nhiều logic: CKEditor config, image upload, grid/carousel insert/edit/delete, runtime CSS và guard chống sửa layout trực tiếp.
- Nếu tiếp tục thêm layout ảnh mới như list/zigzag/hierarchical, nên ưu tiên tách plugin/layout handling ra file riêng để tránh file này tiếp tục phình lớn.

---

## 20. Current verification notes - 2026-08-13

> Section này ghi lại các điểm đã đối chiếu trực tiếp với codebase hiện tại. Nếu mâu thuẫn với nội dung cũ phía trên, ưu tiên section này.

### Current admin routes

- `src/app/(admin)/tac-gia/quan-ly/page.tsx` tồn tại và render `AuthorManagePage`.
- `src/app/tac-gia/[slug]/page.tsx` tồn tại và render public author profile page.
- `src/components/layout/LayoutWrapper.tsx` đã có `/tac-gia/quan-ly` trong `ADMIN_PATHS`, nên route này ẩn Header/Footer public.
- `src/proxy.ts` bảo vệ mọi path chứa `/quan-ly`, nên `/tac-gia/quan-ly` đã được bảo vệ server-side bằng `era_auth_state`.

### Current robots status

- `src/app/robots.ts` hiện disallow:
  - `/tin-tuc/quan-ly`
  - `/tap-chi/quan-ly`
  - `/du-an/quan-ly`
  - `/agents/quan-ly`
  - `/vinh-danh-va-he-thong/quan-ly`
  - `/khoa-hoc/quan-ly`
  - `/tuyen-dung/quan-ly`
  - `/tuyen-dung/ung-vien`
  - `/tai-khoan/quan-ly`
  - `/ho-so-ca-nhan`
- `src/app/robots.ts` hiện chưa thấy `/tac-gia/quan-ly` trong danh sách disallow.

### Current API domains

`src/api/domains/*.ts` hiện có thêm:

- `authors.ts`
- `consultation.ts`

Các domain này tương ứng với backend modules `authors` và `consultation`.
