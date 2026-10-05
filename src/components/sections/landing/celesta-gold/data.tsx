import type { ReactNode } from "react";
import { IMG } from "./theme";

/* ===== Hero ===== */
export const HERO_FACTS = [
  { b: "1,28 ha", span: "Diện tích đất" },
  { b: "25 tầng", span: "2 tháp" },
  { b: "420", span: "Căn hộ" },
  { b: "9", span: "Căn/sàn" },
];

/* ===== Tổng quan ===== */
export const OVERVIEW_FACT =
  "Celesta Gold nằm mặt tiền đại lộ Nguyễn Hữu Thọ, xã Nhà Bè, TP.HCM (trước ngày 1/7/2025 là xã Phước Kiển, huyện Nhà Bè), sát khu đô thị Phú Mỹ Hưng. Quy mô hơn 1,28 ha với 2 tháp 25 tầng, chỉ 420 căn hộ, mỗi sàn 9 căn.";

export const OVERVIEW_STATS = [
  { b: "1,28 ha", span: "Diện tích đất" },
  { b: "2 tháp", span: "Cao 25 tầng" },
  { b: "420", span: "Căn hộ" },
  { b: "9", span: "Căn mỗi sàn" },
];

export const SPEC_ROWS: { label: string; value: ReactNode }[] = [
  { label: "Tên dự án", value: (<><b className="hl">Celesta Gold</b><small>Thuộc khu đô thị Celesta</small></>) },
  { label: "Chủ đầu tư", value: "Liên danh Keppel (Singapore) – Phú Long (Việt Nam) – Nomura Real Estate Vietnam (Nhật Bản)" },
  { label: "Vị trí", value: "Mặt tiền đại lộ Nguyễn Hữu Thọ, xã Nhà Bè, TP.HCM" },
  { label: "Diện tích đất", value: "Hơn 1,28 ha" },
  { label: "Quy mô", value: "2 tháp, 25 tầng" },
  { label: "Số căn", value: "420 căn hộ + khối đế thương mại, shophouse" },
  { label: "Mật độ", value: "9 căn/sàn" },
  { label: "Loại hình", value: "Căn hộ 1PN – 3PN, căn hộ sân vườn, penthouse, shophouse" },
  { label: "Kiến trúc", value: "AWP Architects" },
  { label: "Cảnh quan", value: "Belt Collins" },
  { label: "Nội thất", value: "Ong&Ong Việt Nam" },
  { label: "Tổng thầu", value: "Coteccons" },
  { label: "Chứng nhận xanh", value: (<b className="hl">BCA Green Mark Gold</b>) as ReactNode },
  { label: "Khởi công", value: "7/5/2026" },
  { label: "Bàn giao dự kiến", value: "Chờ chủ đầu tư xác nhận" },
];

export const GM_TEXT =
  "BCA Green Mark là hệ thống chứng nhận công trình xanh do Cơ quan Xây dựng Singapore (Building and Construction Authority) ban hành, đánh giá công trình theo hiệu quả năng lượng, sử dụng nước và chất lượng môi trường sống. Celesta Gold theo đuổi hạng Gold của chứng nhận này.";

/* ===== Vị trí ===== */
export const LOCATION_FACT =
  "Đại lộ Nguyễn Hữu Thọ là trục cửa ngõ nối khu Nam với trung tâm TP.HCM. Từ Celesta Gold mất khoảng 5 phút đến Phú Mỹ Hưng và khoảng 25 phút đến trung tâm Quận 1.";

export const TRAVEL_TIMES = [
  { b: "5 phút", span: "Phú Mỹ Hưng, SC VivoCity, ĐH RMIT, ĐH Tôn Đức Thắng, trường quốc tế SSIS, CIS" },
  { b: "7–10 phút", span: "Crescent Mall, Lotte Mart Quận 7, Bệnh viện FV, BV Tim Tâm Đức" },
  { b: "25 phút", span: "Trung tâm Quận 1 (qua cầu Kênh Tẻ / cầu Nguyễn Khoái)" },
];

export const INFRA_ITEMS = [
  "Mở rộng Nguyễn Hữu Thọ lên 6–8 làn xe",
  "Hầm chui nút giao Nguyễn Văn Linh – Nguyễn Hữu Thọ",
  "Metro số 4 dọc trục Nguyễn Hữu Thọ",
  "Cao tốc Bến Lức – Long Thành",
  "Cầu Thủ Thiêm 4, cầu Nguyễn Khoái, cầu Phú Mỹ 2",
];

/* ===== Tiện ích ===== */
export interface AccSlide { src: string; src800: string; w: number; h: number; alt: string; ten: string; mo: string }
export const ACC_SLIDES: AccSlide[] = [
  {
    src: `${IMG}/celesta-gold-ho-boi-resort-san-go-tam-nang.webp`,
    src800: `${IMG}/celesta-gold-ho-boi-resort-san-go-tam-nang-800.webp`,
    w: 1200, h: 750,
    alt: "Hồ bơi phong cách resort tại Celesta Gold: sàn gỗ tắm nắng, hàng ghế dài, cabana và hàng dừa quanh hồ",
    ten: "Hồ bơi resort 63 m", mo: "Hồ bơi dài hơn 63 m, sàn tắm nắng và lounge bar.",
  },
  {
    src: `${IMG}/celesta-gold-ho-boi-cong-vien-nuoc-tre-em.webp`,
    src800: `${IMG}/celesta-gold-ho-boi-cong-vien-nuoc-tre-em-800.webp`,
    w: 1200, h: 750,
    alt: "Hồ bơi uốn lượn giữa vườn nhiệt đới tại Celesta Gold, góc hồ sục thư giãn và khu cầu trượt nước cho trẻ em",
    ten: "Jacuzzi & công viên nước", mo: "Cụm Jacuzzi, công viên nước chủ đề Amazon cho trẻ em.",
  },
  {
    src: `${IMG}/celesta-gold-phong-vui-choi-tre-em.webp`,
    src800: `${IMG}/celesta-gold-phong-vui-choi-tre-em-800.webp`,
    w: 1200, h: 750,
    alt: "Phòng vui chơi trẻ em tại Celesta Gold: hồ bóng, trần mây trắng và vách gỗ uốn cong",
    ten: "Khu trẻ em", mo: "Nhà chơi kính vạn hoa, phòng sinh hoạt gia đình.",
  },
  {
    src: `${IMG}/celesta-gold-phong-gym-may-tap.webp`,
    src800: `${IMG}/celesta-gold-phong-gym-may-tap-800.webp`,
    w: 1200, h: 750,
    alt: "Phòng gym Celesta Gold với máy tập kháng lực, khu tạ tự do và đèn vòng trang trí trên trần",
    ten: "Phòng gym", mo: "Máy tập kháng lực, khu tạ tự do.",
  },
  {
    src: `${IMG}/celesta-gold-phong-yoga-thien.webp`,
    src800: `${IMG}/celesta-gold-phong-yoga-thien-800.webp`,
    w: 1200, h: 750,
    alt: "Phòng yoga Celesta Gold sàn gỗ, võng yoga bay và vách kính nhìn ra thành phố",
    ten: "Yoga – thiền", mo: "Không gian yoga, thiền và đường chạy bộ.",
  },
  {
    src: `${IMG}/celesta-gold-sanh-sinh-hoat-chung-lounge.webp`,
    src800: `${IMG}/celesta-gold-sanh-sinh-hoat-chung-lounge-800.webp`,
    w: 1200, h: 750,
    alt: "Sảnh sinh hoạt chung Celesta Gold: quầy bar, bàn dài, sofa và vách lam gỗ nhìn ra mảng xanh",
    ten: "Sảnh sinh hoạt chung", mo: "Không gian gặp gỡ của cộng đồng cư dân.",
  },
];

export const AMENITY_GROUPS = [
  { b: "Hồ bơi & thư giãn", span: "Hồ bơi resort dài hơn 63 m, cụm Jacuzzi, sàn tắm nắng, lounge bar" },
  { b: "Trẻ em", span: "Công viên nước chủ đề Amazon, nhà chơi kính vạn hoa, phòng sinh hoạt gia đình" },
  { b: "Sức khỏe", span: "Phòng gym, khu yoga – thiền ngoài trờI, đường chạy bộ" },
  { b: "Cầu kết nối trên cao", span: "Cầu nối giữa 2 tháp, ngắm toàn cảnh thành phố" },
  { b: "Cộng đồng", span: "Công viên thú cưng, sân BBQ, sảnh sinh hoạt chung" },
  { b: "Thương mại", span: "Shophouse khối đế với cửa hàng tiện lợi, café, F&B" },
];

/* ===== Chủ đầu tư ===== */
export const INVESTORS = [
  {
    logo: `${IMG}/cdt-keppel-logo.webp`, w: 355, h: 119,
    alt: "Logo Keppel – thành viên liên danh phát triển Celesta Gold",
    b: "Keppel", i: "Singapore",
    p: "Hoạt động tại hơn 20 quốc gia; dự án tại Việt Nam gồm Empire City, Estella Heights.",
  },
  {
    logo: `${IMG}/cdt-phu-long-logo.webp`, w: 480, h: 270,
    alt: "Logo Phú Long Real Estate – thành viên liên danh phát triển Celesta Gold",
    b: "Phú Long", i: "Việt Nam",
    p: "Đồng phát triển khu đô thị Celesta trên trục Nguyễn Hữu Thọ.",
  },
  {
    logo: `${IMG}/cdt-nomura-logo.webp`, w: 240, h: 103,
    alt: "Biểu tượng Nomura Real Estate – thành viên liên danh phát triển Celesta Gold",
    b: "Nomura Real Estate Vietnam", i: "Nhật Bản",
    p: "Thành viên liên danh phát triển Celesta Gold.",
  },
];

export const CELESTA_PHASES = ["Celesta Avenue", "Celesta Heights", "Celesta Rise"];
export const PARTNERS = [
  "AWP Architects · kiến trúc",
  "Belt Collins · cảnh quan",
  "Ong&Ong Việt Nam · nội thất",
  "Coteccons · tổng thầu",
];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Celesta Gold nằm ở đâu?",
    a: "Celesta Gold nằm mặt tiền đại lộ Nguyễn Hữu Thọ, xã Nhà Bè, TP.HCM (trước ngày 1/7/2025 là xã Phước Kiển, huyện Nhà Bè), sát khu đô thị Phú Mỹ Hưng. Từ dự án mất khoảng 5 phút đến Phú Mỹ Hưng, SC VivoCity, ĐH RMIT và khoảng 25 phút đến trung tâm Quận 1.",
  },
  {
    q: "Chủ đầu tư Celesta Gold là ai?",
    a: "Celesta Gold do liên danh Keppel (Singapore), Phú Long (Việt Nam) và Nomura Real Estate Vietnam (Nhật Bản) phát triển. Đây là phân khu căn hộ cao cấp tiếp theo của khu đô thị Celesta trên trục Nguyễn Hữu Thọ.",
  },
  {
    q: "Celesta Gold có bao nhiêu căn hộ?",
    a: "Celesta Gold rộng hơn 1,28 ha, gồm 2 tháp cao 25 tầng với 420 căn hộ, mỗi sàn chỉ 9 căn, cùng khối đế thương mại và shophouse.",
  },
  {
    q: "Celesta Gold có những loại căn hộ nào?",
    a: "Dự án có căn hộ 1 phòng ngủ đến 3 phòng ngủ, căn hộ sân vườn, penthouse và shophouse khối đế. Diện tích và bảng giá từng loại căn được chuyên viên ERA gửi khi chủ đầu tư công bố.",
  },
  {
    q: "Celesta Gold có những tiện ích gì?",
    a: "Celesta Gold có hơn 40 tiện ích theo phong cách nghỉ dưỡng sinh thái: hồ bơi resort dài hơn 63 m, cụm Jacuzzi, công viên nước chủ đề Amazon cho trẻ em, phòng gym, khu yoga – thiền ngoài trờI, đường chạy bộ, cầu kết nối trên cao giữa 2 tháp, công viên thú cưng, sân BBQ và shophouse khối đế.",
  },
  {
    q: "BCA Green Mark Gold là gì?",
    a: "BCA Green Mark là chứng nhận công trình xanh do Cơ quan Xây dựng Singapore (BCA) ban hành, đánh giá công trình theo hiệu quả năng lượng, sử dụng nước và chất lượng môi trường sống. Celesta Gold theo đuổi hạng Gold của chứng nhận này.",
  },
  {
    q: "Ai thiết kế và thi công Celesta Gold?",
    a: "Kiến trúc Celesta Gold do AWP Architects thiết kế, cảnh quan do Belt Collins, nội thất do Ong&Ong Việt Nam; tổng thầu thi công là Coteccons.",
  },
  {
    q: "Khi nào Celesta Gold bàn giao?",
    a: "Celesta Gold khởi công ngày 7/5/2026. ThờI điểm bàn giao đang chờ chủ đầu tư xác nhận; chuyên viên ERA đã gửi bạn trang này sẽ cập nhật ngay khi có thông báo chính thức.",
  },
];

/* ===== CTA ===== */
export const CTA_BULLETS = [
  "Bảng giá Celesta Gold khi chủ đầu tư công bố",
  "Bảng tính dòng tiền theo từng loại căn 1PN / 2PN / 3PN",
  "Tư vấn suất ưu tiên và tài liệu dự án",
];
