# Hướng dẫn setup Google Apps Script cho Lead Submission

## Cơ chế hoạt động

Frontend (browser) → **POST `/api/submit-lead`** (Next.js API Route, cùng origin) → **POST Google Apps Script** (server-to-server, không CORS) → ghi vào tab theo field `sheet`.

Sheet **"DATA WEB ERA"** gồm 3 tab:
- `ECO RETREAT - FOREST ONSEN` — 16 cột A–P, form FORM1–FORM4
- `ECO RETREAT - RỪNG PHƯỢNG` — 16 cột A–P, form RP_FORM1 (LeadBand), RP_FORM2 (popup)
- `PHÚ GIA BẢO LỘC` — 18 cột A–R (thêm `Email` và `Lờ i nhắn` ở cuối), form PGBL_CONTACT

Ngoài `doPost`, script còn có `checkAndSendEmailNewCustomers()` (trigger theo thờ i gian) gửi email thông báo khi có lead mới ở cả 3 tab.

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

    // Tìm tab theo tên, không phân biệt hoa thường & trim khoảng trắng
    const targetName = String(data.sheet || "").trim();
    const allSheets = ss.getSheets();
    const matchedSheet = allSheets.find(
      (s) => s.getName().trim().toLowerCase() === targetName.toLowerCase()
    );
    const sheet = matchedSheet || ss.getActiveSheet();

    // Log để debug (xem trong View → Executions)
    Logger.log("Received sheet: " + data.sheet);
    Logger.log("Matched sheet: " + (matchedSheet ? matchedSheet.getName() : "NOT FOUND"));
    Logger.log("Payload: " + JSON.stringify(data));

    // Chỉ tab PHÚ GIA BẢO LỘC mới có thêm 2 cột Email & Lờ i nhắn
    const isPGBL = targetName.toLowerCase() === "phú gia bảo lộc";

    const baseHeaders = [
      "Timestamp", "Họ tên", "SĐT", "URL gốc",
      "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
      "adclid", "adclida", "mglnd",
      "IP", "Form ID", "User Agent", "Sản phẩm"
    ];

    const expectedHeaders = isPGBL
      ? [...baseHeaders, "Email", "Lờ i nhắn"]
      : baseHeaders;

    const firstRow = sheet.getRange(1, 1, 1, expectedHeaders.length);
    if (firstRow.getValues()[0][0] === "") {
      firstRow.setValues([expectedHeaders]);
    }

    const baseRow = [
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
    ];

    if (isPGBL) {
      sheet.appendRow([
        ...baseRow,
        data.email || "",    // Q: Email
        data.message || ""   // R: Lờ i nhắn
      ]);
    } else {
      sheet.appendRow(baseRow);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== 2. GỬI EMAIL THÔNG BÁO KHÁCH MỚI (chạy bằng trigger theo thờ i gian) =====
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
    },
    {
      sheetName: "PHÚ GIA BẢO LỘC",
      subject: "Khách hàng mới đăng ký - PHÚ GIA BẢO LỘC",
      propKey: "LAST_PROCESSED_ROW_PGBL"
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
      var email = rowData.length > 16 && rowData[16] ? rowData[16] : "";
      var message = rowData.length > 17 && rowData[17] ? rowData[17] : "";

      if (!name && !phone) continue;

      var body = "Chào bạn,\n\nCó một khách hàng mới vừa để lại thông tin trên hệ thống. Chi tiết như sau:\n\n" +
                 "- Thờ i gian: " + timestamp + "\n" +
                 "- Họ tên: " + name + "\n" +
                 "- Số điện thoại: " + phone + "\n" +
                 (email ? "- Email: " + email + "\n" : "") +
                 (message ? "- Lờ i nhắn: " + message + "\n" : "") +
                 "- URL gốc: " + url + "\n\n" +
                 "Vui lòng truy cập file Google Sheets 'DATA WEB ERA' để xem đầy đủ thông tin.";

      MailApp.sendEmail(emailAddress, tab.subject, body);
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
5. Mở trang `/du-an-phu-gia-bao-loc`, điền đầy đủ Họ tên, SĐT, Email, Lờ i nhắn → submit → kiểm tra tab **"PHÚ GIA BẢO LỘC"**
6. Kiểm tra email `cuong.letrong@era.com.vn` nhận được thông báo (theo chu kỳ trigger)

---

**Lưu ý:**
- Nếu thay đổi code Apps Script, phải **Deploy lại (New version)** để Web App dùng code mới — URL không đổi
- Tên tab phải khớp chính xác với chuỗi FE gửi (`ECO RETREAT - FOREST ONSEN`, `ECO RETREAT - RỪNG PHƯỢNG`, `PHÚ GIA BẢO LỘC`); sai tên thì rơi về tab đang active (dễ ghi nhầm)
- Trigger gửi mail chạy code đã save, không phụ thuộc version deploy
- Quota miễn phí Apps Script: 20,000 request/ngày
- Không cần lo CORS vì API Route proxy request từ server
