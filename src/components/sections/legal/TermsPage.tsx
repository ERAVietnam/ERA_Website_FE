"use client";

import { LegalHeroSection } from "./LegalHeroSection";
import { LegalPageLayout } from "./LegalPageLayout";
import type { LegalSection } from "./LegalPageLayout";

const termsSections: LegalSection[] = [
  {
    id: "gioi-thieu",
    heading: "1. Giới thiệu",
    content: (
      <>
        <p className="mb-4">
          Chào mừng bạn đến với ERA Việt. Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu dưới đây. Vui lòng đọc kỹ các nội dung này.
        </p>
        <p>
          Website ERA Việt Nam được quản lý và vận hành bởi Công ty Cổ phần Bất động sản ERA Việt Nam. Trang web cung cấp thông tin, dịch vụ về lĩnh vực bất động sản cho người dùng.
        </p>
      </>
    ),
  },
  {
    id: "chap-nhan-dieu-khoan",
    heading: "2. Chấp nhận điều khoản",
    content: (
      <>
        <p className="mb-4">
          Bằng việc truy cập, duyệt hoặc đăng ký tài khoản trên ERA Việt Nam, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý chịu sự ràng buộc bởi các điều khoản này.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng ngừng sử dụng website ngay lập tức.</li>
          <li>Bạn cam kết rằng bạn đủ tuổi hợp pháp để tham gia các hoạt động trên website.</li>
        </ul>
      </>
    ),
  },
  {
    id: "su-dung-website",
    heading: "3. Sử dụng website",
    content: (
      <>
        <p className="mb-4">
          Bạn cam kết chỉ sử dụng website cho các mục đích hợp pháp và tuân thủ các quy định sau:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Không được phép: Sao chép, sửa đổi, phân phối hoặc sử dụng nội dung website vì mục đích thương mại mà không có sự cho phép bằng văn bản của chúng tôi.</li>
          <li>Không được phép: Sử dụng phần mềm, bot hoặc các biện pháp can thiệp kỹ thuật nhằm làm gián đoạn, gây hại hoặc thu thập dữ liệu trái phép từ hệ thống.</li>
          <li>Không được phép: Đăng tải nội dung xúc phạm, đồi trụy, vi phạm bản quyền hoặc có tính chất gây hại tới cộng đồng.</li>
        </ul>
      </>
    ),
  },
  {
    id: "quyen-so-huu",
    heading: "4. Quyền sở hữu trí tuệ",
    content: (
      <>
        <p className="mb-4">
          Tất cả nội dung có trên website, bao gồm nhưng không giới hạn ở: văn bản, hình ảnh, logo, biểu tượng, video, thiết kế, mã nguồn và dữ liệu, đều thuộc sở hữu độc quyền của Công ty Cổ phần Bất động sản ERA Việt Nam hoặc bên thứ ba đã cấp phép cho chúng tôi.
        </p>
        <p className="mb-4">
          Bạn không được phép sử dụng, sao chép hoặc phát hành bất kỳ tài liệu nào trên website mà không có sự đồng ý trước của chủ sở hữu quyền sở hữu trí tuệ.
        </p>
      </>
    ),
  },
  {
    id: "gioi-han-trach-nhiem",
    heading: "5. Giới hạn trách nhiệm",
    content: (
      <>
        <p className="mb-4">
          Dịch vụ &quot;như hiện trạng&quot;: Website được cung cấp trên cơ sở &quot;như hiện trạng&quot; (as-is). Chúng tôi không đảm bảo rằng website sẽ hoạt động không bị gián đoạn, không có lỗi hoặc không có virus.
        </p>
        <p className="mb-4">
          Miễn trừ trách nhiệm: Trong phạm vi tối đa mà pháp luật cho phép, Công ty Cổ phần Bất động sản ERA Việt Nam sẽ không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên hoặc hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng website, ngay cả khi chúng tôi đã được thông báo về khả năng xảy ra các thiệt hại đó.
        </p>
      </>
    ),
  },
  {
    id: "thay-doi-dieu-khoan",
    heading: "6. Thay đổi điều khoản",
    content: (
      <>
        <p className="mb-4">
          Chúng tôi có quyền cập nhật, sửa đổi hoặc thay thế các điều khoản này tại bất kỳ thời điểm nào mà không cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website. Việc bạn tiếp tục sử dụng website sau khi các thay đổi được đăng tải đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
        </p>
      </>
    ),
  },
  {
    id: "luat-ap-dung",
    heading: "7. Luật áp dụng",
    content: (
      <>
        <p className="mb-4">
          Các điều khoản sử dụng này được điều chỉnh và giải thích theo pháp luật của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam. Mọi tranh chấp phát sinh từ hoặc liên quan đến các điều khoản này sẽ được giải quyết tại tòa án có thẩm quyền tại Thành phố Hồ Chí Minh.
        </p>
      </>
    ),
  },
  {
    id: "lien-he",
    heading: "8. Liên hệ",
    content: (
      <>
        <p className="mb-4">
         Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào liên quan đến Điều khoản sử dụng này, vui lòng liên hệ với chúng tôi qua:
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

export function TermsPage() {
  return (
    <main>
      <LegalHeroSection
        title="Điều khoản sử dụng"
        subtitle="Các điều khoản và điều kiện chi phối việc bạn truy cập và sử dụng website của ERA Vietnam."
      />
      <LegalPageLayout
        lastUpdated="21 Tháng 4, 2026"
        sections={termsSections}
      />
    </main>
  );
}
