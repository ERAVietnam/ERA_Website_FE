# Hướng dẫn setup Google Apps Script cho Lead Submission

## Cơ chế hoạt động

Frontend (browser) → **POST `/api/submit-lead`** (Next.js API Route, cùng origin) → **POST Google Apps Script** (server-to-server, không CORS).

## Bước 1: Mở Apps Script từ Google Sheet

1. Mở Google Sheet **"DATA WEB ERA"**
2. Vào menu **Tiện ích (Extensions)** → **Apps Script**
3. Xóa toàn bộ code mặc định trong file `Code.gs`
4. Paste code bên dưới vào

## Bước 2: Paste code

```js
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.hoten || "",
      data.sdt || "",
      data.url || "",
      data.utm_source || "",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.utm_term || "",
      data.utm_content || "",
      data.adclid || "",
      data.adclida || "",
      data.mglnd || "",
      data.ip || "",
      data.formId || "",
      data.userAgent || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Bước 3: Deploy Web App

1. Nhấn **Deploy (Triển khai)** → **New deployment (Triển khai mới)**
2. Nhấn biểu tượng **cài đặng (⚙️)** → chọn **Web app**
3. Điền:
   - **Description**: `Forest Onsen Lead API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` (hoặc `Anyone, even anonymous`)
4. Nhấn **Deploy**
5. Google sẽ yêu cầu **Authorize (Cấp quyền)** → nhấn qua các bước cho phép
6. Copy **Web App URL** (dạng `https://script.google.com/macros/s/XXXXXXXX/exec`)

## Bước 4: Cập nhật URL trong project

1. Mở file `.env.local` trong project Next.js
2. Thay thế giá trị (chú ý: **KHÔNG** dùng `NEXT_PUBLIC_`):

```env
LEAD_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

3. **Vercel Dashboard** → Project → Settings → Environment Variables:
   - Key: `LEAD_SCRIPT_URL`
   - Value: URL vừa copy
   - Environment: Production (và Preview nếu cần test)
4. Redeploy project trên Vercel

## Bước 5: Test

1. Mở trang `/duan-canho-forest-onsen`
2. Điền form và submit
3. Kiểm tra Google Sheet xem có row mới không

---

**Lưu ý:**
- Nếu thay đổi code Apps Script, phải **Deploy lại** (New deployment) để URL hoạt động
- Quota miễn phí Apps Script: 20,000 request/ngày
- Không cần lo CORS vì API Route proxy request từ server
