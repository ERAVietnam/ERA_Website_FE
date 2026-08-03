# Hướng dẫn setup Google Apps Script cho Lead Submission

## Cơ chế hoạt động

Frontend (browser) → **POST `/api/submit-lead`** (Next.js API Route, cùng origin) → **POST Google Apps Script** (server-to-server, không CORS) → ghi vào tab theo field `sheet`.

Sheet **"DATA WEB ERA"** gồm 2 tab (cùng 16 cột A–P):
- `ECO RETREAT - FOREST ONSEN` — form FORM1–FORM4
- `ECO RETREAT - RỪNG PHƯỢNG` — form RP_FORM1 (LeadBand), RP_FORM2 (popup)

Ngoài `doPost`, script còn có `checkAndSendEmailNewCustomers()` (trigger theo thời gian) gửi email thông báo khi có lead mới ở cả 2 tab.

## Bước 1: Mở Apps Script từ Google Sheet

1. Mở Google Sheet **"DATA WEB ERA"**
2. Vào menu **Tiện ích (Extensions)** → **Apps Script**
3. Xóa toàn bộ code mặc định trong file `Code.gs`
4. Paste code bên dưới vào

## Bước 2: Paste code

```js
// ===== 1. NHẬN LEAD TỪ WEBSITE (Web App) =====
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Chọn tab theo tên gửi từ website; fallback về tab đang active nếu thiếu/sai tên
    const sheet = (data.sheet && ss.getSheetByName(data.sheet)) || ss.getActiveSheet();

    // Đảm bảo header đúng thứ tự ở dòng 1
    const expectedHeaders = [
      "Timestamp", "Họ tên", "SĐT", "URL gốc",
      "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
      "adclid", "adclida", "mglnd",
      "IP", "Form ID", "User Agent", "Sản phẩm"
    ];

    const firstRow = sheet.getRange(1, 1, 1, expectedHeaders.length);
    if (firstRow.getValues()[0][0] === "") {
      firstRow.setValues([expectedHeaders]);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),  // A: Timestamp
      data.hoten || "",                            // B: Họ tên
      data.sdt || "",                              // C: SĐT
      data.url || "",                              // D: URL gốc
      data.utm_source || "",                       // E: utm_source
      data.utm_medium || "",                       // F: utm_medium
      data.utm_campaign || "",                     // G: utm_campaign
      data.utm_term || "",                         // H: utm_term
      data.utm_content || "",                      // I: utm_content
      data.adclid || "",                           // J: adclid
      data.adclida || "",                          // K: adclida
      data.mglnd || "",                            // L: mglnd
      data.ip || "",                               // M: IP
      data.formId || "",                           // N: Form ID
      data.userAgent || "",                        // O: User Agent
      data.sanpham || "",                          // P: Sản phẩm
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

// ===== 2. GỬI EMAIL THÔNG BÁO KHÁCH MỚI (chạy bằng trigger theo thời gian) =====
function checkAndSendEmailNewCustomers() {
  var tabs = [
    {
      sheetName: "ECO RETREAT - FOREST ONSEN",
      subject: "Khách hàng mới đăng ký - FOREST ONSEN",
      propKey: "LAST_PROCESSED_ROW" // giữ key cũ để không reset mốc đã xử lý
    },
    {
      sheetName: "ECO RETREAT - RỪNG PHƯỢNG",
      subject: "Khách hàng mới đăng ký - RỪNG PHƯỢNG",
      propKey: "LAST_PROCESSED_ROW_RP"
    }
  ];

  var emailAddress = "cuong.letrong@era.com.vn";
  var props = PropertiesService.getScriptProperties();

  for (var t = 0; t < tabs.length; t++) {
    var tab = tabs[t];
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tab.sheetName);
    if (!sheet) continue;

    var lastRow = sheet.getLastRow();
    var lastProcessedRowStr = props.getProperty(tab.propKey);

    // LẦN ĐẦU CHẠY: đặt mốc là dòng hiện tại, không gửi mail cho khách cũ
    if (lastProcessedRowStr === null) {
      props.setProperty(tab.propKey, lastRow.toString());
      continue;
    }

    var lastProcessedRow = parseInt(lastProcessedRowStr);
    if (lastRow <= lastProcessedRow) continue;

    var startRow = lastProcessedRow + 1;
    var numRows = lastRow - lastProcessedRow;
    var data = sheet.getRange(startRow, 1, numRows, sheet.getLastColumn()).getValues();

    for (var i = 0; i < data.length; i++) {
      var rowData = data[i];
      var timestamp = rowData[0] ? rowData[0] : "";
      var name = rowData[1] ? rowData[1] : "Chưa cập nhật";
      var phone = rowData[2] ? rowData[2] : "Chưa cập nhật";
      var url = rowData[3] ? rowData[3] : "";

      if (!name && !phone) continue;

      var message = "Chào bạn,\n\nCó một khách hàng mới vừa để lại thông tin trên hệ thống. Chi tiết như sau:\n\n" +
                    "- Thời gian: " + timestamp + "\n" +
                    "- Họ tên: " + name + "\n" +
                    "- Số điện thoại: " + phone + "\n" +
                    "- URL gốc: " + url + "\n\n" +
                    "Vui lòng truy cập file Google Sheets 'DATA WEB ERA' để xem đầy đủ thông tin.";

      MailApp.sendEmail(emailAddress, tab.subject, message);
    }

    props.setProperty(tab.propKey, lastRow.toString());
  }
}
```

## Bước 3: Deploy Web App

1. Nhấn **Deploy (Triển khai)** → **Manage deployments (Quản lý triển khai)** → **✏️ Edit** → **Version: New version** → **Deploy**
2. Nếu chưa từng deploy: **Deploy** → **New deployment** → ⚙️ → **Web app**:
   - **Description**: `Eco Retreat Lead API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` (hoặc `Anyone, even anonymous`)
3. Google sẽ yêu cầu **Authorize (Cấp quyền)** → nhấn qua các bước cho phép
4. Copy **Web App URL** (dạng `https://script.google.com/macros/s/XXXXXXXX/exec`) — deploy lại New version thì **URL không đổi**

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
3. Kiểm tra tab **"ECO RETREAT - FOREST ONSEN"** xem có row mới không
4. Mở trang `/phan-khu-rung-phuong-duan-eco-retreat`, submit form → kiểm tra tab **"ECO RETREAT - RỪNG PHƯỢNG"**
5. Kiểm tra email `cuong.letrong@era.com.vn` nhận được thông báo (theo chu kỳ trigger)

---

**Lưu ý:**
- Nếu thay đổi code Apps Script, phải **Deploy lại (New version)** để Web App dùng code mới — URL không đổi
- Tên tab phải khớp chính xác với chuỗi FE gửi (`ECO RETREAT - FOREST ONSEN`, `ECO RETREAT - RỪNG PHƯỢNG`); sai tên thì rơi về tab đang active (dễ ghi nhầm)
- Trigger gửi mail chạy code đã save, không phụ thuộc version deploy
- Quota miễn phí Apps Script: 20,000 request/ngày
- Không cần lo CORS vì API Route proxy request từ server
