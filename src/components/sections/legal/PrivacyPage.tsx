"use client";

import { LegalHeroSection } from "./LegalHeroSection";
import { LegalPageLayout } from "./LegalPageLayout";
import type { LegalSection } from "./LegalPageLayout";

const privacySections: LegalSection[] = [
  {
    id: "gioi-thieu",
    heading: "1. Giới thiệu",
    content: (
      <>
        <p className="mb-4">
          Chào mừng bạn đến với ERA Việt Nam. Chúng tôi cam kết bảo vệ sự riêng tư và bảo mật thông tin cá nhân của bạn.
        </p>
        <p>
          Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi bạn 
          truy cập hoặc sử dụng dịch vụ của chúng tôi. Việc bạn tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn chấp thuận 
          các điều khoản trong chính sách này.        
        </p>
      </>
    ),
  },
  {
    id: "thong-tin-thu-thap",
    heading: "2. Thông tin chúng tôi thu thập",
    content: (
      <>
        <p className="mb-4">
          Để cung cấp dịch vụ tốt nhất, chúng tôi có thể thu thập các loại thông tin sau:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Thông tin cá nhân: họ tên, số điện thoại, địa chỉ email.</li>
          <li>Thông tin sử dụng: dữ liệu về cách bạn tương tác với website.</li>
          <li>Thông tin thiết bị: loại trình duyệt, hệ điều hành, địa chỉ IP.</li>
          <li>Thông tin vị trí: dữ liệu vị trí địa lý nếu bạn cho phép.</li>
        </ul>
      </>
    ),
  },
  {
    id: "muc-dich-su-dung",
    heading: "3. Mục đích sử dụng thông tin",
    content: (
      <>
        <p className="mb-4">
          Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Cung cấp và cải thiện dịch vụ của chúng tôi.</li>
          <li>Hỗ trợ khách hàng, giải đáp thắc mắc và khiếu nại.</li>
          <li>Gửi thông tin về dự án, khuyến mãi (nếu bạn đồng ý).</li>
          <li>Phân tích dữ liệu để cải thiện trải nghiệm người dùng và tối ưu hóa.</li>
          <li>Tuân thủ các quy định pháp luật hiện hành.</li>
        </ul>
      </>
    ),
  },
  {
    id: "bao-ve-thong-tin",
    heading: "4. Bảo vệ thông tin",
    content: (
      <>
        <p className="mb-4">
          Chúng tôi áp dụng các biện pháp an ninh kỹ thuật và hành chính phù hợp để bảo vệ thông tin cá nhân của bạn khỏi bị truy cập trái phép, sử dụng sai mục đích hoặc tiết lộ ngoài ý muốn:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Mã hóa dữ liệu trong quá trình truyền tải và lưu trữ.</li>
          <li>Hạn chế truy cập chỉ cho nhân viên có thẩm quyền.</li>
          <li>Thường xuyên cập nhật và kiểm tra hệ thống bảo mật.</li>
          <li>Sử dụng tường lửa và phần mềm chống xâm nhập.</li>
        </ul>
      </>
    ),
  },
  {
    id: "chia-se-thong-tin",
    heading: "5. Chia sẻ thông tin",
    content: (
      <>
        <p className="mb-4">
          Chúng tôi cam kết không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba vì mục đích tiếp thị. Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Khi có sự đồng ý rõ ràng từ bạn.</li>
          <li>Đối tác cung cấp dịch vụ hỗ trợ vận hành (có cam kết bảo mật).</li>
          <li>Khi yêu cầu bởi cơ quan pháp luật có thẩm quyền.</li>
          <li>Trong trường hợp sáp nhập, mua bán hoặc chuyển nhượng doanh nghiệp.</li>
        </ul>
      </>
    ),
  },
  {
    id: "quyen-nguoi-dung",
    heading: "6. Quyền của ngườI dùng",
    content: (
      <>
        <p className="mb-4">
          Bạn có quyền thực hiện các hành động sau đối với thông tin cá nhân của mình:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Quyền truy cập: Yêu cầu sao chép thông tin cá nhân chúng tôi đang lưu giữ.</li>
          <li>Quyền chỉnh sửa: Cập nhật hoặc sửa đổi thông tin không chính xác.</li>
          <li>Quyền xóa: Yêu cầu xóa thông tin cá nhân trong một số trường hợp.</li>
          <li>Quyền hạn chế: Yêu cầu hạn chế xử lý thông tin cá nhân.</li>
          <li>Quyền phản đối: Phản đối việc xử lý thông tin cho mục đích marketing.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "7. Cookies và công nghệ theo dõi",
    content: (
      <>
        <p className="mb-4">
          Website sử dụng &quot;Cookies&quot; để nâng cao trải nghiệm của bạn. Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn giúp chúng tôi:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Ghi nhớ tùy chọn và cài đặt của bạn.</li>
          <li>Phân tích lưu lượng truy cập và hành vi ngườI dùng.</li>
          <li>Cải thiện trải nghiệm duyệt web cá nhân hóa.</li>
          <li>Đảm bảo tính bảo mật và an toàn của phiên làm việc.</li>
        </ul>
      </>
    ),
  },
  {
    id: "thay-doi-chinh-sach",
    heading: "8. Thay đổi chính sách",
    content: (
      <>
        <p className="mb-4">
          Chúng tôi có quyền cập nhật, chỉnh sửa chính sách bảo mật này bất kỳ 
          lúc nào để phù hợp với hoạt động kinh doanh hoặc yêu cầu pháp lý. 
          Phiên bản cập nhật sẽ được đăng tải trên website và có hiệu lực 
          ngay lập tức. Chúng tôi khuyến khích bạn thường xuyên kiểm tra 
          trang này để nắm bắt thông tin.
        </p>
      </>
    ),
  },
  {
    id: "lien-he",
    heading: "9. Liên hệ",
    content: (
      <>
        <p className="mb-4">
          Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc yêu cầu nào liên quan đến chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua thông tin dưới đây:
        </p>
        <div className="mt-4">
          <p className="mb-1">
            <strong>Công ty Cổ phần Bất động sản ERA Việt Nam</strong>
          </p>
          <p className="mb-1">Địa chỉ: Lầu 14, L14-01, 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
          <p className="mb-1">Hotline: 1800 6701</p>
          <p>Email: info@era.com.vn</p>
        </div>
      </>
    ),
  },
];

export function PrivacyPage() {
  return (
    <main>
      <LegalHeroSection
        title="Chính sách bảo mật"
        subtitle="Cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng và đối tác."
      />
      <LegalPageLayout
        lastUpdated="21 Tháng 4, 2026"
        sections={privacySections}
      />
    </main>
  );
}
