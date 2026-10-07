# Quy trình tích hợp landing static vào ERA Website

Tài liệu này ghi lại pattern đang dùng cho các landing như Green Skyline, Diamond Sky và The Legend Đà Nẵng.

## 1. Xác định bộ giao diện bàn giao

Một landing static thường có cấu trúc:

```text
<ten-du-an>/
└─ co-form/
   └─ web/
      ├─ index.html
      └─ assets/
         ├─ css/
         ├─ js/
         ├─ img/
         └─ fonts/
```

Luôn dùng đúng thư mục `co-form/web` nếu cần form. Không dùng bản `khong-form` cho landing cần thu lead.

Kiểm tra nhanh:

- `index.html` có form `form[data-lead]` hay không.
- Có file JavaScript riêng trong `assets/js` hay không.
- Đường dẫn ảnh/script trong HTML có dạng tương đối như `assets/img/...`, `assets/js/...` hay không.
- Tên file ảnh trong HTML có tồn tại thật trong `assets` hay không.

## 2. Copy nguyên bộ static vào `public`

Ví dụ với The Legend Đà Nẵng:

```powershell
$src = 'D:\Download\the-legend-da-nang-giao-it-2026-10-07\the-legend-da-nang-giao-it\co-form\web'
$dst = 'public\landing\the-legend-da-nang'

New-Item -ItemType Directory -Force -Path $dst | Out-Null
Copy-Item (Join-Path $src 'index.html') (Join-Path $dst 'index.html') -Force
Copy-Item (Join-Path $src 'assets') $dst -Recurse -Force
```

Kết quả cần có:

```text
public/landing/the-legend-da-nang/index.html
public/landing/the-legend-da-nang/assets/img/...
public/landing/the-legend-da-nang/assets/css/...
public/landing/the-legend-da-nang/assets/js/...
```

Không đổi các đường dẫn tương đối trong `index.html`. Khi mở tại:

```text
/landing/the-legend-da-nang/index.html
```

thì `assets/img/...` sẽ tự trỏ đúng vào thư mục landing tương ứng.

## 3. Tạo route Next bọc landing bằng iframe

Tạo file:

```text
src/app/(landing)/du-an-the-legend-da-nang/page.tsx
```

Pattern:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tên landing | ERA Vietnam",
  description: "Mô tả landing",
  alternates: {
    canonical: "https://era.com.vn/du-an-the-legend-da-nang/",
  },
  openGraph: {
    title: "Tên landing",
    description: "Mô tả landing",
    type: "website",
    url: "https://era.com.vn/du-an-the-legend-da-nang/",
    images: [
      {
        url: "/landing/the-legend-da-nang/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tên landing",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Tên landing"
        src="/landing/the-legend-da-nang/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
```

Iframe giúp giữ nguyên CSS/JS/layout của bản bàn giao, tránh xung đột với component React chung của website.

## 4. Tắt layout chung của website

Trong `src/components/layout/LayoutWrapper.tsx`, thêm route vào `specialLayouts`:

```tsx
"/du-an-the-legend-da-nang": {
  header: false,
  footer: false,
  toTop: false,
  contentPadding: false,
},
```

Landing static đã có header/footer riêng nên không được render thêm Header/Footer của website chính.

## 5. Tạo trang cảm ơn

Tạo route:

```text
src/app/(landing)/thank-you-the-legend-da-nang/page.tsx
```

Trang cảm ơn cần có:

- Hiệu ứng xuất hiện nội dung sau khi vào trang.
- Thông báo đăng ký thành công.
- Countdown 10 giây.
- Tự chuyển về `/` sau 10 giây.
- Ảnh nền lấy từ `/landing/<slug>/assets/img/...`.

Thêm route này vào `specialLayouts` và không render header/footer chung.

Form trong iframe chuyển trang bằng:

```js
window.top.location.href = '/thank-you-the-legend-da-nang';
```

Dùng `window.top` vì form nằm bên trong iframe.

## 6. Nối form vào API chung

Không nối trực tiếp từ trình duyệt tới Google Apps Script. Form phải gửi tới:

```text
/api/submit-lead
```

Payload chuẩn tương ứng với Apps Script hiện tại:

```js
{
  formId: 'TLD_LEAD',
  hoten: ten,
  sdt: sdt,
  url: parentUrl(),
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  adclid: '',
  adclida: '',
  mglnd: '',
  ip: '',
  userAgent: navigator.userAgent,
  sanpham: 'Loại căn-The Legend Đà Nẵng',
  email: '',
  message: '',
  sheet: 'THE LEGEND ĐÀ NẴNG',
  timestamp: new Date().toISOString()
}
```

Apps Script dùng các key sau để ghi 18 cột:

```text
Timestamp, Họ tên, SĐT, URL gốc,
utm_source, utm_medium, utm_campaign, utm_term, utm_content,
adclid, adclida, mglnd, IP, Form ID, User Agent, Sản phẩm,
Email, Lời nhắn
```

Không chỉnh Apps Script nếu đã dùng đúng contract trên. Tên `sheet` phải trùng tên tab Google Sheet; Apps Script hiện match không phân biệt hoa thường nhưng vẫn cần đúng dấu/khoảng trắng thực tế.

## 7. Lấy URL, UTM, User Agent và IP

Vì landing chạy trong iframe, URL cần lấy từ trang cha:

```js
function parentUrl() {
  var url = document.referrer || '';
  try {
    if (window.top && window.top.location) url = window.top.location.href;
  } catch (e) {}
  return url || location.href;
}
```

UTM cần đọc cả query của iframe và query của trang cha. Mapping bắt buộc:

```text
mgclid -> mglnd
```

`userAgent` lấy từ `navigator.userAgent`.

`ip` để rỗng ở frontend; API `/api/submit-lead` lấy IP từ các forwarded headers của môi trường deploy. Khi chạy localhost, IP có thể rỗng vì không có proxy header.

## 8. Behavior submit theo pattern Diamond Sky

Submit dùng fire-and-forget để chuyển trang cảm ơn ngay:

```js
var body = JSON.stringify(payload);
var sent = false;

if (navigator.sendBeacon) {
  sent = navigator.sendBeacon(
    '/api/submit-lead',
    new Blob([body], { type: 'application/json' })
  );
}

if (!sent) {
  fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    keepalive: true,
  }).catch(console.error);
}

window.top.location.href = '/thank-you-<slug>';
```

Trước khi submit vẫn validate Họ tên và SĐT. SĐT Việt Nam chuẩn hóa về 10 số, hỗ trợ đầu `+84`.

## 9. Header ẩn khi scroll

Trong CSS của `index.html`:

```css
.hdr {
  position: sticky;
  top: 0;
  transform: translateY(0);
  transition: transform .28s ease;
}

.hdr.nav-hide {
  transform: translateY(-100%);
}
```

Trong JS:

```js
var lastScrollY = scrollY;

function capNhatHeader() {
  var y = scrollY;
  if (hdr.classList.contains('open')) {
    hdr.classList.remove('nav-hide');
  } else if (y <= 20 || y < lastScrollY - 4) {
    hdr.classList.remove('nav-hide');
  } else if (y > 80 && y > lastScrollY + 4) {
    hdr.classList.add('nav-hide');
  }
  lastScrollY = y;
}
```

Khi đóng/mở menu mobile cũng phải xóa `nav-hide` để menu không bị che:

```js
hdr.classList.remove('nav-hide');
```

## 10. Sitemap và kiểm tra

Thêm URL landing vào `src/app/sitemap.ts`:

```ts
{
  url: `${baseUrl}/du-an-the-legend-da-nang/`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.8,
},
```

Chạy kiểm tra:

```powershell
node --check public/landing/<slug>/assets/js/<landing>.js
npx.cmd tsc --noEmit --pretty false
npx.cmd eslint src/app/(landing)/<route>/page.tsx src/components/layout/LayoutWrapper.tsx src/app/sitemap.ts
```

Khi dev server đang chạy, kiểm tra tối thiểu:

```text
/du-an-<slug>/
/thank-you-<slug>/
/landing/<slug>/index.html
/landing/<slug>/assets/js/<landing>.js
```

Tất cả cần trả HTTP 200. Sau đó test thực tế trên trình duyệt:

1. Mở URL có UTM.
2. Cuộn xuống/lên để kiểm tra header.
3. Mở menu mobile.
4. Điền form và submit.
5. Kiểm tra trang thank-you.
6. Kiểm tra tab Google Sheet đủ 18 cột và đúng `sheet`.
