# Quy trình tích hợp landing static vào ERA Website

Tài liệu này ghi lại quy trình tích hợp landing dự án vào ERA Website và đóng gói bản không form để upload sang ứng dụng bên ngoài.

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

### Lưu ý bắt buộc về encoding và font

- Các file text của landing (`index.html`, `fonts.css`, `llms.txt`, `robots.txt`, `sitemap.xml`) phải được giữ ở **UTF-8**.
- Khi sửa bằng PowerShell, phải đọc và ghi rõ encoding UTF-8; không dùng thao tác đọc mặc định rồi ghi lại, vì có thể làm tiếng Việt thành dạng `PhÃ²...` và khiến trang hiển thị sai.
- Không xử lý ảnh, font `.woff2`, SVG hoặc các file nhị phân như text. Chỉ copy nguyên file hoặc dùng công cụ thao tác nhị phân.
- Sau khi thay HTML/CSS/font, phải đổi giá trị `?v=` ở đường dẫn `fonts.css`, JavaScript và/hoặc file font để tránh trình duyệt giữ cache cũ.
- Kiểm tra thực tế bằng trình duyệt: tiếng Việt phải hiển thị đúng, trong DevTools không có lỗi tải `fonts.css` hoặc `.woff2`.

## 3. Chọn cách tích hợp landing vào FE: rewrite hoặc iframe

Hiện có hai cách tích hợp:

### 3.1. Rewrite trực tiếp — cách ưu tiên cho landing static mới

Rewrite trong `next.config.ts` trỏ URL public của dự án tới file HTML trong `public/landing`:

```ts
{
  source: "/du-an-the-legend-da-nang/",
  destination: "/landing/the-legend-da-nang/index.html",
},
{
  source: "/du-an-the-legend-da-nang/assets/:path*",
  destination: "/landing/the-legend-da-nang/assets/:path*",
},
```

Khi dùng rewrite:

- URL người dùng vẫn giữ nguyên.
- Server trả trực tiếp HTML landing trong response đầu tiên, thuận lợi hơn cho bot và công cụ đọc nội dung.
- `index.html` phải tự có title, description, canonical, Open Graph, Twitter Card và structured data cần thiết; không nên chỉ dựa vào `metadata` trong `page.tsx` vì rewrite `beforeFiles` có thể trả file HTML trước khi route React được render.
- Nếu HTML dùng đường dẫn tương đối như `assets/img/...`, phải giữ nguyên cấu trúc thư mục hoặc thêm `<base href="/landing/<slug>/">`.
- Phải có rewrite riêng cho `assets/:path*` nếu URL public cần tải asset qua route dự án.
- Phải kiểm tra form, tracking, video, JavaScript, ảnh và trang thank-you sau khi rewrite.

Rewrite là cách mặc định nên dùng cho landing HTML static mới nếu không có xung đột với logic của landing.

### 3.2. Iframe — chỉ dùng cho landing cũ hoặc landing cần cô lập

Iframe giúp cô lập CSS/JS của landing với React app:

### Trạng thái rewrite trong project

Capital Square là landing đầu tiên được dùng để kiểm thử phương án rewrite trực tiếp. Sau đó cơ chế này đã được áp dụng cho thêm nhiều landing khác.

- Route mẫu: `/du-an-capital-square/`.
- `next.config.ts` rewrite route này tới `public/landing/capital-square/index.html` bằng `beforeFiles`.
- URL người dùng không đổi; server trả trực tiếp toàn bộ HTML landing để bot đọc được nội dung ngay ở lần phản hồi đầu tiên.
- `public/landing/capital-square/index.html` có `<base href="/landing/capital-square/">` để các đường dẫn tương đối `assets/...` tiếp tục tải đúng sau khi rewrite.
- Đã kiểm thử local: HTML có H1, nội dung, JSON-LD, canonical, form, ảnh, CSS và JavaScript.
- Với landing khác, phải kiểm tra lại từng route vì mỗi landing có thể có form, video, tracking, asset và trang cảm ơn khác nhau.
- Sau khi deploy FE, phải kiểm tra lại HTML thô bằng trình duyệt hoặc `Invoke-WebRequest`, không chỉ kiểm tra giao diện hiển thị.

Không tự động chuyển landing cũ từ iframe sang rewrite nếu chưa kiểm tra form, tracking, asset, video và URL cảm ơn của landing đó.

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

Iframe giúp giữ nguyên CSS/JS/layout của bản bàn giao, tránh xung đột với component React chung của website. Tuy nhiên nội dung HTML nằm trong iframe không phải là nội dung trực tiếp của trang cha; vì vậy nếu ưu tiên SEO/bot, nên đánh giá rewrite trực tiếp trước.

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

## Quy tắc đặt tên URL landing

- Landing của một dự án độc lập dùng dạng `/du-an-<slug>/`.
  Ví dụ: `/du-an-vinhomes-green-paradise/`, `/du-an-the-win-city/`.
- Landing của phân khu hoặc tòa thuộc một dự án dùng dạng `/pk-<slug>-du-an-<slug-du-an>/`.
  Ví dụ: `/pk-nagomi-du-an-waterpoint/`, `/pk-park-village-du-an-waterpoint/`.
- `<slug>` viết thường, không dấu, các từ cách nhau bằng dấu gạch ngang; giữ tên thương hiệu/dự án ngắn gọn và nhất quán.
- Khi đổi URL phải đồng bộ cả thư mục route trong `src/app/(landing)/`, metadata canonical/OG, `public/landing/<slug>/index.html`, `llms.txt`, sitemap và `LayoutWrapper`.

## Quy tắc mặc định cho mỗi landing dự án

Mặc định khi tích hợp một landing dự án mới, thực hiện đủ hai bản mà không cần nhắc lại:

1. Bản có form trong project Next.js: kết nối `/api/submit-lead/`, cấu hình đúng tab Google Sheet, tạo route dự án và trang thank-you.
2. Bản không form, không số điện thoại, không Zalo và không thông tin liên hệ tại `D:\ERA\landing\<slug>-static`. Bản này giữ nguyên nội dung, hình ảnh, thông tin dự án/chủ đầu tư/đại lý cần thiết; chỉ loại bỏ các thành phần thu lead và liên hệ.

Nếu người phụ trách yêu cầu rõ là chỉ làm bản có form, chỉ triển khai bản trong FE và không tự tạo bản ZIP không form. Ví dụ: landing Phú Gia Bảo Lộc bản mới chỉ có form; landing cũ vẫn được giữ nguyên theo yêu cầu.

Khi tạo bản static, ưu tiên dùng thư mục `khong-form/web` nếu bộ giao có sẵn. Chỉ cập nhật các file text như `index.html`, `llms.txt`, `sitemap.xml`, `robots.txt`; không đọc/ghi lại thư mục `assets` bằng thao tác xử lý text để tránh làm hỏng ảnh, font và file nhị phân.

### Quy tắc một thư mục landing trong FE

Trong `public/landing`, mỗi dự án chỉ được có một thư mục runtime theo đúng `<slug>`. Không tạo thêm thư mục `<slug>-static` trong FE.

- Landing có form dùng chính thư mục `<slug>` để chứa `index.html`, `assets`, JavaScript form và các tài nguyên liên quan. Route, trang cảm ơn, metadata, favicon và các đường dẫn rewrite/iframe đều phải trỏ về thư mục này.
- Khi hợp nhất một landing cũ có bản `<slug>` và `<slug>-static`, hãy copy phần cần thiết vào `<slug>`, kiểm tra đủ `index.html` và `assets`, cập nhật toàn bộ đường dẫn `/landing/...`, rồi mới xóa thư mục `<slug>-static`.
- Bản ZIP không form dùng cho ứng dụng upload bên ngoài tại `D:\ERA\landing\<slug>-static` là kho riêng, không phải thư mục thứ hai trong FE và không cần tạo bản sao trong `public/landing`.
- Không đổi tên route URL chỉ vì hợp nhất thư mục. Giữ nguyên logic form, submit lead, trang cảm ơn và metadata hiện có.
- File `vercel.json` đi kèm bộ HTML từ phòng thiết kế chỉ phục vụ việc host preview trên Vercel trước khi bàn giao. Khi landing đã được tích hợp vào project FE (đã link Git/Vercel ở cấp project) hoặc đóng gói ZIP để upload sang app khác, phải xóa `vercel.json` khỏi thư mục landing; không cần mang theo file cấu hình preview này.

### Ngoại lệ về cấu trúc bàn giao

- Không tạo thêm thư mục `public/landing/<slug>-static` trong FE.
- Bản ZIP bên ngoài phải là một landing độc lập, không phụ thuộc vào React app, API nội bộ hoặc đường dẫn `/landing/...` của FE.
- Khi đóng gói ZIP, `index.html` phải nằm ở thư mục gốc của ZIP; các đường dẫn `assets/...` phải tồn tại tương ứng trong ZIP.
- Không đổi tên hoặc di chuyển từng file asset riêng lẻ nếu HTML/JS/CSS vẫn đang tham chiếu đường dẫn cũ.

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

## 10. Video và asset dung lượng lớn

- Video phải được copy nguyên file vào `assets/video/` hoặc thư mục tương ứng mà HTML đang tham chiếu.
- Ưu tiên dùng đường dẫn tương đối, ví dụ `assets/video/hero.mp4`; không hard-code đường dẫn local như `D:\Download\...`.
- Khi zip, phải giữ nguyên cả tên file, chữ hoa/chữ thường và cấu trúc thư mục. Không chỉ copy `index.html` mà bỏ thư mục `assets/video`.
- Sau khi upload ZIP lên ứng dụng bên ngoài, mở DevTools và kiểm tra request video phải trả HTTP 200, không phải 404.
- Nếu video quá nặng, nén bằng H.264/AAC nhưng vẫn phải kiểm tra lại độ phân giải, âm thanh, autoplay và thời gian tải. Không tự động thay video bằng link trang khác nếu yêu cầu là video phải phát trực tiếp trong landing.
- Trước khi bàn giao, kiểm tra trên cả desktop và mobile: video hero, play/pause, âm thanh, controls, fullscreen và hành vi khi cuộn ra khỏi hero nếu landing có logic này.

## 11. SEO, metadata và structured data

Mỗi landing phải kiểm tra đầy đủ các phần sau:

- `<title>` đúng tên dự án.
- `<meta name="description">` mô tả đúng landing.
- `canonical` trỏ đúng URL public cuối cùng, có hoặc không có dấu `/` nhất quán.
- `og:title`, `og:description`, `og:url`, `og:image`.
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
- Ảnh `og:image` và `twitter:image` trả HTTP 200 với Content-Type là `image/*`.
- Có `robots` cho phép index nếu landing được phép xuất hiện trên Google.
- Có JSON-LD phù hợp. Landing dự án nên có `RealEstateListing`; nếu có thông tin cư trú/dự án cụ thể có thể kết hợp thêm `Residence` hoặc schema phù hợp khác.
- Không điền thông tin không chắc chắn vào JSON-LD, đặc biệt là địa chỉ, giá, diện tích, số phòng, ngày mở bán và thông tin chủ đầu tư.

Nếu landing dùng rewrite trực tiếp, các thẻ SEO và JSON-LD quan trọng phải nằm trong `index.html`, vì file HTML có thể được trả trực tiếp thay cho `page.tsx`.

## 12. Sitemap và kiểm tra

### 12.1. Bảng kiểm URL ảnh share (Open Graph)

Trước khi zip/upload landing, phải kiểm tra các thẻ `og:image` và `twitter:image`:

- URL ảnh phải trả HTTP 200 và Content-Type là `image/*`.
- Nếu ảnh được upload cùng landing, đường dẫn public chuẩn là `https://era.com.vn/landing/<slug>/assets/...`.
- Không dùng nhầm URL dạng `https://era.com.vn/du-an-<slug>/assets/...` nếu URL đó không thực sự phát ảnh. Trang public có thể trả HTTP 200 nhưng file ảnh bên trong vẫn trả 404.
- Khi landing được upload qua `eravnTrans` và URL có mã agent, không hard-code `og:image` theo một URL agent cụ thể. Backend phải rewrite `og:image` và `twitter:image` về `/<agent>/<project>/<phase>/<landing>/assets/...`, hoặc asset phải được publish ở URL global chắc chắn truy cập được.
- Sau khi sửa URL ảnh, phải kiểm tra cả link landing đầy đủ và short-link `/s/...`, sau đó refresh cache share của Facebook/Zalo.

Kiểm tra nhanh trước khi giao:

```powershell
$html = (Invoke-WebRequest $landingUrl -UseBasicParsing).Content
$og = [regex]::Match($html, 'property=["'']og:image["''][^>]+content=["'']([^"'']+)').Groups[1].Value
Invoke-WebRequest $og -Method Head -UseBasicParsing
```

Thêm URL landing vào `src/app/sitemap.ts` nếu landing chưa có trong danh sách static:

```ts
{
  url: `${baseUrl}/du-an-the-legend-da-nang/`,
  // Dùng ngày cập nhật thực tế nếu có; không dùng new Date() cho mọi request.
  lastModified: new Date("2026-10-07T00:00:00.000Z"),
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

Nếu landing có rewrite trực tiếp, kiểm tra thêm:

```powershell
$response = Invoke-WebRequest $landingUrl -UseBasicParsing
$response.StatusCode
$response.Headers['Content-Type']
$response.Content | Select-String '<h1|canonical|og:image|application/ld\+json'
```

Phải xác nhận HTML trả về là nội dung landing thật, không chỉ là một trang React chứa iframe.

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
7. Kiểm tra video, ảnh và font không trả 404.
8. Nếu dùng rewrite, kiểm tra HTML response đầu tiên có nội dung, metadata và JSON-LD.
 
## Pattern UI: danh sách dài bên phải, ảnh sticky bên trái

Khi một section có danh sách tiện ích hoặc mốc thông tin dài làm phần ảnh bên trái bị trống, dùng pattern giống Palm River và Capital Square:

- Bố cục desktop là grid 2 cột: ảnh/gallery bên trái, nội dung/list bên phải.
- Cột ảnh dùng `position: sticky`, `top: calc(var(--hdr) + 18px)` và `align-self: start`.
- Danh sách bên phải để chiều cao tự nhiên theo toàn bộ nội dung; không đặt `max-height`, `overflow-y: auto`, scrollbar hoặc bắt wheel bằng JavaScript.
- Khi user cuộn xuống, ảnh giữ nguyên vị trí còn danh sách bên phải tiếp tục chạy; khi danh sách hết, toàn trang tiếp tục cuộn. Cuộn ngược lên hoạt động tương tự.
- Nếu section cha đang dùng `overflow: hidden`, sticky có thể không hoạt động. Dùng `overflow: clip` cho section đó khi trình duyệt hỗ trợ.

Mẫu CSS:

```css
@media (min-width: 901px) {
  .list-sticky-layout {
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    gap: clamp(18px, 3vw, 48px);
    align-items: start;
  }

  .list-sticky-layout .sticky-media {
    position: sticky;
    top: calc(var(--hdr) + 18px);
    align-self: start;
  }
}

@media (max-width: 900px) {
  .list-sticky-layout { grid-template-columns: 1fr; }
}

@supports (overflow: clip) {
  #section-id { overflow: clip; }
}
```

Không biến danh sách thành một hộp cuộn riêng. Mục tiêu là dùng scroll tự nhiên của toàn trang, không xuất hiện thanh cuộn phụ và không gây lỗi cuộn trên mobile.

## Quy trình bắt buộc: luôn tạo cả hai bản

Mỗi landing mới phải được tích hợp đồng thời ở hai nơi:

1. **Bản có form trong project FE**: dùng bản `co-form`, đặt tại `ERA_Website_FE/public/landing/<slug>`, giữ route `/du-an-<slug>/`, nối `/api/submit-lead/`, trang thank-you, header và logic submit.
2. **Bản không form bên ngoài**: dùng bản `khong-form`, đặt tại `D:\ERA\landing\<slug>-static` để đóng gói ZIP/upload sang app khác. Bản này không có form, hotline, Zalo, popup hay logic submit.

Khi tạo bản không form, copy nguyên `index.html`, `assets`, `llms.txt`, `robots.txt`, `sitemap.xml`; không copy `vercel.json`. Phải thay metadata tên miền tạm bằng URL thật, kiểm tra `og:image`/`twitter:image` trả HTTP 200, và không tạo bản `<slug>-static` thứ hai trong FE.
