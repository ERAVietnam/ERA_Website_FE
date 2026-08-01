// DỮ LIỆU MOCK cho trang tác giả — sẽ thay bằng API thật khi triển khai chức năng.
// Cấu trúc field theo danh sách đã chốt:
// - Bắt buộc: fullName, bio, experiences[], expertise[], areasServed[],
//   workEmail, zaloPhone, ít nhất 1 trong 3 social URL.
// - Không bắt buộc (null/rỗng → ẩn section tương ứng): jobTitle, division,
//   avatar, startYear, licenseNumber/licenseYear, associationMember,
//   awards[], pressMentions[], reviewedPosts[].

export interface AuthorExperienceItem {
  yearRange: string;
  name: string;
  role: string;
}

export interface AuthorAwardItem {
  year: string;
  name: string;
  org: string;
}

export interface AuthorPressItem {
  title: string;
  url: string;
  source: string;
  date: string;
}

export interface AuthorPostItem {
  category: string;
  date: string;
  title: string;
  url: string;
}

export interface DisplayAuthor {
  slug: string;
  fullName: string;
  jobTitle?: string | null;
  division?: string | null;
  avatarUrl?: string | null;
  avatarAlt?: string | null;
  bio: string;
  startYear?: number | null;
  licenseNumber?: string | null;
  licenseYear?: number | null;
  associationMember?: string | null;
  workEmail: string;
  zaloPhone: string;
  expertise: string[];
  areasServed: string[];
  experiences: AuthorExperienceItem[];
  awards?: AuthorAwardItem[];
  pressMentions?: AuthorPressItem[];
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
  youtubeUrl?: string | null;
  updatedAt: string;
  writtenPosts: AuthorPostItem[];
  reviewNote?: string | null;
  reviewedPosts?: AuthorPostItem[];
}

export const mockAuthor: DisplayAuthor = {
  slug: "nguyen-hoai-nam",
  fullName: "Nguyễn Hoài Nam",
  jobTitle: "Head of Sales Division",
  division: "SALES Division",
  avatarUrl: null,
  avatarAlt: null,
  bio: "Tôi làm môi giới căn hộ từ 2016, chủ yếu khu Đông TP.HCM và trục Bến Lức — Đức Hòa. Quan điểm của tôi: khách mua để ở và khách mua đầu tư cần hai kịch bản tư vấn hoàn toàn khác nhau, gộp chung là lý do nhiều deal đổ vỡ ở bước cuối. Với căn hộ dưới 3 tỷ, phần khách quan tâm nhất không phải tiện ích mà là lịch thanh toán 24 tháng đầu — nên tôi luôn đưa bảng dòng tiền ra trước khi nói về dự án.",
  startYear: 2016,
  licenseNumber: "12345/CCMG",
  licenseYear: 2019,
  associationMember: "Hội viên VARS",
  workEmail: "nam.nguyen@era.com.vn",
  zaloPhone: "0901234567",
  expertise: ["Căn hộ", "Đất nền", "Nghỉ dưỡng", "Pháp lý BĐS", "Đầu tư cho thuê"],
  areasServed: [
    "TP.HCM — khu Đông (Thủ Đức, Bình Chánh)",
    "Long An — Bến Lức, Đức Hòa",
    "Bình Dương — Dĩ An, Thuận An",
  ],
  experiences: [
    { yearRange: "2025 — 2026", name: "Eco Retreat — Forest Onsen", role: "Phụ trách phân phối phân khu căn hộ" },
    { yearRange: "2024", name: "Sky Solis", role: "Trưởng nhóm bán hàng" },
    { yearRange: "2022 — 2023", name: "Phú Gia Bảo Lộc", role: "Chuyên viên tư vấn cấp cao" },
  ],
  awards: [
    { year: "2024", name: "Top 10 Agent xuất sắc", org: "ERA Vietnam" },
    { year: "2023", name: "Best Team Leader — khối miền Nam", org: "ERA Vietnam" },
  ],
  pressMentions: [
    {
      title: "Thị trường căn hộ Long An 2026: nguồn cung dịch chuyển về Bến Lức",
      url: "https://baodautu.vn/vi-du-bai-pr",
      source: "Báo Đầu Tư",
      date: "12/03/2026",
    },
    {
      title: "NgườI mua nhà lần đầu nên đọc gì trong hợp đồng đặt cọc",
      url: "#",
      source: "CafeLand",
      date: "28/01/2026",
    },
  ],
  linkedinUrl: "https://www.linkedin.com/in/vi-du-linkedin",
  facebookUrl: "https://www.facebook.com/vi.du.facebook",
  youtubeUrl: "https://www.youtube.com/@vi-du-youtube",
  updatedAt: "30/07/2026",
  writtenPosts: [
    { category: "Căn hộ", date: "24/07/2026", title: "Lịch thanh toán Forest Onsen: 3 mốc khách hay tính sai", url: "#" },
    { category: "Pháp lý BĐS", date: "11/07/2026", title: "Đọc gì trong giấy phép xây dựng trước khi xuống cọc", url: "#" },
    { category: "Đầu tư cho thuê", date: "02/07/2026", title: "Căn hộ khu Đông cho thuê: số thật sau 12 tháng", url: "#" },
    { category: "Đất nền", date: "19/06/2026", title: "Đất nền Đức Hòa sau khi cao tốc thông: giá đã phản ánh đến đâu", url: "#" },
  ],
  reviewNote:
    "Nội dung dưới đây do đội ngũ ERA Vietnam biên soạn và được Nguyễn Hoài Nam — Head of Sales Division kiểm duyệt về mặt chuyên môn. Lĩnh vực kiểm duyệt: Pháp lý · Giá & thanh toán.",
  reviewedPosts: [
    { category: "Pháp lý BĐS", date: "20/07/2026", title: "Toàn bộ giấy tờ pháp lý dự án Eco Retreat, cập nhật 07/2026", url: "#" },
    { category: "Giá & thanh toán", date: "15/07/2026", title: "Bảng giá Sky Solis đợt 2 và điều kiện ưu đãi", url: "#" },
  ],
};
