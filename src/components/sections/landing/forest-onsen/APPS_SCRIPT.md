# Apps Script dùng chung cho các landing

Receiver hoàn chỉnh nằm tại [`scripts/apps-script/Code.gs`](../../../../../scripts/apps-script/Code.gs). Copy toàn bộ file đó vào Apps Script của Google Sheet chung. Receiver không có danh sách landing hay formId; thêm landing mới chỉ cần tạo tab và cấu hình payload/header.

## Contract và giả định cần chốt trước khi copy

- Browser gửi JSON đến `/api/submit-lead/`; Next.js thêm IP nếu thiếu, rồi POST JSON server-to-server tới `LEAD_SCRIPT_URL`. Không cần thêm CORS header hay đổi frontend sang gọi Google trực tiếp.
- `sheet` là chuỗi bắt buộc dùng để chọn tab. Script trim hai đầu, chuẩn hóa Unicode NFC và so tên không phân biệt hoa/thường; vẫn phải đúng dấu và khoảng trắng bên trong. Không tìm thấy hoặc trùng tên sau chuẩn hóa thì trả lỗi; **không fallback tab active, không tự tạo tab**.
- Hàng 1 của từng tab là header. Bảng có dữ liệu giữ nguyên header/thứ tự 16 hoặc 18 cột; script không thêm cột vào bảng đang dùng. Mỗi cột đã dùng phải có header dạng text, không trống/merge/trùng key. Không đặt ghi chú hoặc bảng phụ bên phải bảng lead: `getLastColumn()` tính cả các ô đó.
- Tab hoàn toàn trống sẽ được tạo 18 header chuẩn ở lần POST đầu tiên. GET không khởi tạo header. Để quyết định schema trước khi nhận lead, nên tự điền hàng 1 theo bảng dưới.
- Header chuẩn tiếng Việt và key JSON đều được nhận diện; có thể sắp xếp lại cột. Tuy nhiên nên giữ A:P/Q:R như cũ vì công thức, báo cáo và trigger khác có thể vẫn đọc theo vị trí.
- Field mới dùng header **trùng chính xác key JSON, phân biệt hoa/thường** (ví dụ `budget`, `preferred_time`). Không cần sửa script. Đây là field ở cấp đầu của JSON; object/array được lưu thành chuỗi JSON trong một ô, không tự trải thành nhiều cột.
- Field có header nhưng thiếu/null trong payload ghi ô trống; `0` và `false` được giữ. `timestamp` thiếu/rỗng dùng thời gian ISO do receiver tạo. `mgclid` được chấp nhận làm alias khi `mglnd` thiếu/rỗng; payload hiện tại dùng `mglnd`.
- Field không có header không được ghi. Receiver trả thêm `ignoredFields` và log **tên field**, không log dữ liệu cá nhân. Đặc biệt bảng cũ 16 cột không lưu `email`/`message` cho tới khi người quản lý thêm Q/R; không tự chèn cột vì có thể ghi đè dữ liệu/công thức.
- Chuỗi bắt đầu bằng `=` (kể cả có khoảng trắng trước) được escape để không chạy công thức. Số điện thoại nên được gửi dạng chuỗi, không ép thành số ở frontend.
- Script xử lý JSON/schema, không thay thế validation form hay chống spam. Có khóa chống các request đồng thời cùng khởi tạo header; **không có cơ chế deduplicate/retry tự động**. Tránh tự gửi lại khi chưa kiểm tra tab sau một lỗi mạng không rõ kết quả.

## Schema chuẩn A:R

Tài liệu cũ dùng A:P cho một số tab và chỉ cho hai dự án thêm Q:R; workflow landing static quy định A:R. Bản dùng chung thay phân nhánh tên dự án bằng header thực tế của từng tab, giữ tương thích cả hai schema.

| Cột | Header chuẩn | Key JSON |
| --- | --- | --- |
| A | Timestamp | `timestamp` |
| B | Họ tên | `hoten` |
| C | SĐT | `sdt` |
| D | URL gốc | `url` |
| E | utm_source | `utm_source` |
| F | utm_medium | `utm_medium` |
| G | utm_campaign | `utm_campaign` |
| H | utm_term | `utm_term` |
| I | utm_content | `utm_content` |
| J | adclid | `adclid` |
| K | adclida | `adclida` |
| L | mglnd | `mglnd` |
| M | IP | `ip` |
| N | Form ID | `formId` |
| O | User Agent | `userAgent` |
| P | Sản phẩm | `sanpham` |
| Q | Email | `email` |
| R | Lời nhắn | `message` |

Header sai khoảng trắng cũ `Lờ i nhắn` vẫn map vào `message`. Không tạo đồng thời `Email` và `email` vì hai header đó cùng một key; receiver sẽ báo lỗi thay vì ghi nhầm.

Sunwah hiện gửi `sheet: 'SUNWAH PEARL'`, `formId: 'SUNWAH_PEARL_LEAD'`; mục tiêu đầu tư → `message`, loại phòng → `sanpham`. Tạo tab `SUNWAH PEARL` với đủ A:R để không bỏ mất mục tiêu/email. Các payload hiện có của THE MARQ, Forest Onsen, Eco Retreat, Diamond Sky, Phú Gia Bảo Lộc và landing khác không cần đổi khi tab/header đúng contract này.

## Cài receiver và deploy một Web app chung

1. Mở Google Sheet chung → **Extensions → Apps Script**. Sao lưu code/trigger hiện có trước khi thay receiver. Nếu có nhiều file `.gs`, chỉ giữ một bộ `doPost`/`doGet` và constants/helpers tương ứng, tránh khai báo trùng.
2. Copy toàn bộ [`Code.gs`](../../../../../scripts/apps-script/Code.gs). Bật V8 runtime nếu project cũ chưa dùng V8.
3. Điền `LEAD_SPREADSHEET_ID` bằng phần ID giữa `/spreadsheets/d/` và `/edit` trong URL Google Sheet; không điền cả URL. **Script standalone bắt buộc điền ID**. Với bound script có thể để rỗng nếu `getActiveSpreadsheet()` trả đúng file; vẫn khuyến nghị ID tường minh để Web app không phụ thuộc ngữ cảnh chạy. Nếu không tìm thấy spreadsheet, receiver trả lỗi cấu hình thay vì ghi chỗ khác.
4. Tạo các tab đúng `sheet` mà landing đang gửi; không phải thêm các tên đó vào script. Chuẩn bị header theo A:R hoặc giữ A:P có sẵn với các giới hạn optional fields nêu trên.
5. Nếu còn deployment cũ: **Deploy → Manage deployments → chọn Web app mà `LEAD_SCRIPT_URL` đang trỏ tới → Edit → Version: New version → Deploy**. Chỉ Save code không làm `/exec` cũ chạy bản mới. Cập nhật đúng deployment ID thì URL `/exec` giữ nguyên.
6. Nếu project/deployment cũ đã bị xóa hoặc không còn dùng được: **Deploy → New deployment → Web app**, **Execute as: Me / chủ sở hữu**, **Who has access: Anyone** (không yêu cầu người gửi đăng nhập). Cấp quyền truy cập Sheet bằng tài khoản có quyền sửa file đích. Chính sách Workspace có thể không cho chọn Anyone; khi đó cần quản trị viên xử lý, không dùng URL yêu cầu đăng nhập làm endpoint công khai.
7. Copy URL **`https://script.google.com/macros/s/<deployment-id>/exec`**, không dùng `/dev`, URL editor hoặc URL `script.googleusercontent.com` sau redirect.
8. Giữ/cập nhật biến server-only `LEAD_SCRIPT_URL` trong `.env.local` và môi trường host đang chạy website. Không thêm `NEXT_PUBLIC_`. Nếu URL thay đổi, khởi động lại Next.js local; production/preview cần áp dụng env vào bản chạy mới theo workflow host. Chỉ đổi code của đúng deployment và giữ URL thì không cần đổi env website.

**Quyền MailApp mới:** tài khoản owner chạy Web app cần cấp quyền gửi email `https://www.googleapis.com/auth/script.send_mail` bên cạnh quyền Sheet hiện có. Apps Script thường tự phát hiện scope; nếu `appsscript.json` khai báo `oauthScopes` tường minh, thêm scope gửi mail vào danh sách, không xóa các scope Sheet đang dùng. MailApp chỉ gửi email, không cần quyền đọc hộp thư Gmail ([tài liệu Google](https://developers.google.com/apps-script/reference/mail/mail-app)).

Sau khi paste/save code, có thể chọn **doGet → Run** trong editor để cấp lại quyền bằng tài khoản owner: hàm này chỉ mở Sheet, không append và không gọi MailApp. Không Run `doPost`/hàm gửi thông báo để xin quyền vì có thể tạo lead/gửi mail thật. Sau khi chấp thuận quyền, deploy **New version** như trên; mở health check và đối chiếu version `2026-11-18-mail`. GET không chứng minh gửi mail/quota thành công. Chưa có quyền gửi mail thì lead vẫn có thể ghi Sheet nếu quyền Sheet còn hiệu lực, nhưng response sẽ có `emailNotificationError` khi gọi MailApp phát sinh lỗi.

Nếu Google chặn toàn bộ Web app để yêu cầu tái cấp quyền, request có thể chưa vào `doPost`; cần hoàn tất authorization ở tài khoản owner. Nhánh bắt lỗi mail chỉ bảo vệ những request đã chạy tới bước append thành công, không bỏ qua được cổng cấp quyền/deployment của Google.

Không repoint `/api/submit-lead-thu-cap/` hoặc `LEAD_SCRIPT_URL_THU_CAP`: đây là flow riêng trong repo.

## JSON response và kiểm tra an toàn

Sau khi `appendRow` hoàn tất, Apps Script trả trực tiếp JSON MIME:

```json
{"success":true}
```

Nếu payload có field chưa có header, vẫn ghi các field đã map rồi trả ví dụ:

```json
{"success":true,"ignoredFields":["budget"]}
```

Nếu đã ghi lead nhưng gửi thông báo email lỗi (ví dụ hết quota/chưa cấp quyền), response vẫn thành công:

```json
{"success":true,"emailNotificationError":"Mail quota exceeded"}
```

`ignoredFields` và `emailNotificationError` có thể cùng xuất hiện. Xem thêm cảnh báo `Email notification failed` trong Executions/log; không submit lại lead chỉ để thử gửi lại email vì hàng lead đã tồn tại.

Lỗi parse JSON, sheet/header/quyền ghi hoặc append trả:

```json
{"success":false,"error":"Tab not found: \"SUNWAH PEARL\". No row was written."}
```

Không bọc thêm `data` trong Apps Script. **Proxy hiện tại** tự bọc `{success: res.ok, data: <JSON Apps Script>}`; HTTP 200 từ Google không đồng nghĩa append thành công. Khi debug phải xem `data.success`, `data.error`, `data.ignoredFields`, `data.emailNotificationError`, không chỉ `success` ở ngoài. Bản receiver này không sửa proxy/helper/flow chuyển trang của các landing.

Kiểm tra không ghi lead:

1. Mở `/exec` của deployment mới. Mong đợi `success: true`, `service: 'ERA landing lead receiver'`, `version: '2026-11-18-mail'`. Đây chỉ xác nhận code mới và khả năng mở file, chưa chứng minh quyền append/gửi mail.
2. Mở `/exec?sheet=SUNWAH%20PEARL`. Với tab đã có đủ header chuẩn mong đợi `success: true`, `sheet: 'SUNWAH PEARL'`, `columns: 18`, `initialized: true`. Tab trống trả `columns: 0`, `initialized: false` và không bị thay đổi.
3. Có thể dùng cùng query cho bất kỳ tab nào. Health check chỉ đọc tên tab/header, không đọc/trả lead hay liệt kê toàn bộ tab.
4. Đối chiếu deployment ID trong URL `/exec` với `LEAD_SCRIPT_URL` tại đúng môi trường website. Trong **Executions**, lỗi quyền/runtime/deployment phải được xử lý bằng tài khoản quản lý Apps Script/Sheet. Không thể kết luận Google đã ghi đúng chỉ từ trang thank-you hoặc beacon được browser nhận gửi.
5. Khi chủ sở hữu chủ động submit một lead thật sau này: đối chiếu tab đích, Q/R và formId. Không chạy thử `doPost` bằng dữ liệu giả vào Sheet thật chỉ để kiểm tra triển khai.

## Kiểm tra receiver offline

Từ thư mục `ERA_Website_FE`, chạy:

```sh copy Copy Offline Test
node --test scripts/apps-script/Code.test.mjs
```

Test gọi `doPost`/`doGet` của chính `Code.gs` trong Node VM với Sheet/ContentService/LockService/MailApp giả lập trong bộ nhớ; không có HTTP client hay kết nối Google. Bao phủ schema 16/18 cột, tab mới, header đảo thứ tự, field bổ sung, optional/zero/false/JSON, escape công thức, lỗi JSON/tab/header/append/lock và GET không ghi dữ liệu/gửi mail. Test mail kiểm tra đúng hai người nhận, nội dung chỉ có tên tab, không gửi khi ghi thất bại và lỗi quota/quyền mail không làm mất success hay ghi thêm hàng. Các test này không xác minh quyền Google, deployment hay việc email tới hộp thư thật.

## Thông báo email sau khi ghi lead

Sau `appendRow` thành công, receiver giải phóng khóa ghi rồi gọi `leadNotify_` cho mọi tab, không có danh sách landing/formId. Hàm chỉ nhận tên tab thực tế đã match, không nhận payload khách hàng. Một email gửi tới cả `cuong.letrong@era.com.vn` và `viet.nguyen@era.com.vn`, danh sách cấu hình duy nhất tại `LEAD_NOTIFICATION_RECIPIENTS` đầu `Code.gs`.

- Subject: `ERA Website: Có lead mới`.
- Body: `Có lead mới được ghi vào tab: <tên tab>.` Không chứa tên khách, số điện thoại, email khách, lựa chọn sản phẩm, URL, IP hoặc nội dung form.
- Không gọi MailApp khi JSON/tab/header/append thất bại, hoặc khi health check GET. Lỗi gửi mail được bắt riêng và log/trả `emailNotificationError`, không đổi kết quả append thành lỗi, không retry hay append lại.
- MailApp chạy bằng tài khoản owner của Web app và chịu quota gửi mail của tài khoản đó; mỗi lead gửi tới hai recipients. MailApp nhận lệnh thành công không đảm bảo thư đã đến inbox (còn spam/bounce/lọc mail). Không có queue/retry email tự động.

Không cần trigger theo thời gian cho thông báo mới. Tài liệu trước đây có `checkAndSendEmailNewCustomers()` đọc ba tab và gửi dữ liệu khách hàng: nếu project vẫn còn trigger cũ, người quản lý cần rà soát/tắt thông báo cũ tương ứng để tránh email trùng hoặc gửi dữ liệu cá nhân ngoài yêu cầu mới. Bản local này không tự xóa trigger hay thay đổi Google; sao lưu trước khi điều chỉnh các automation khác.
