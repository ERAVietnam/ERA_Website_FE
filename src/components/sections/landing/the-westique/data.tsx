import type { ReactNode } from "react";
import { IMG } from "./theme";

/* ===== Hero ===== */
export const HERO_FACTS = [
  { b: "99", span: "Sản phẩm" },
  { b: "15", span: "Tầng" },
  { b: "8–10", span: "Căn/sàn" },
  { b: "40%", span: "Mật độ XD" },
];

/* ===== Tổng quan ===== */
export const OVERVIEW_FACT =
  "The Westique Residences là dự án căn hộ boutique của VCRE tại 289 Kinh Dương Vương, phường An Lạc, TP.HCM (trước ngày 1/7/2025 thuộc quận Bình Tân). Chỉ 1 tháp 15 tầng với 95 căn hộ và 4 shophouse, mỗi sàn 8–10 căn – cộng đồng cư dân tinh gọn, riêng tư ngay cửa ngõ phía Tây thành phố.";

export const OVERVIEW_STATS = [
  { b: (<>2.126<small> m²</small></>), span: "Diện tích đất" },
  { b: "15", span: "Tầng · 1 tháp" },
  { b: (<>95<small> + 4</small></>), span: "Căn hộ + shophouse" },
  { b: "40%", span: "Mật độ xây dựng" },
];

export const SPEC_ROWS: { label: string; value: ReactNode }[] = [
  { label: "Tên dự án", value: <b className="hl">The Westique Residences</b> },
  { label: "Chủ đầu tư", value: (<>
      Công ty Cổ phần Bất động sản Bản Việt
      <small>VCRE – Viet Capital Real Estate</small>
    </>) },
  { label: "Vị trí", value: "289 Kinh Dương Vương, phường An Lạc, TP.HCM" },
  { label: "Diện tích đất", value: "Khoảng 2.126 m²" },
  { label: "Quy mô", value: (<>
      1 tháp, 15 tầng
      <small>Tầng 1 sảnh &amp; shophouse · tầng 2–3 đỗ xe · tầng 4 tiện ích · tầng 5–15 căn hộ · tầng thượng Sky Park</small>
    </>) },
  { label: "Sản phẩm", value: (<><b className="hl">99 sản phẩm</b>: 95 căn hộ và 4 shophouse</>) },
  { label: "Loại căn", value: "Studio, 1 phòng ngủ, 2 phòng ngủ, 3 phòng ngủ · 12 loại layout" },
  { label: "Mật độ xây dựng", value: "40%" },
  { label: "Mỗi sàn", value: "8–10 căn · 3 thang máy" },
  { label: "Cao độ trần", value: "2,85 m (trần hoàn thiện)" },
  { label: "Tổng thầu", value: "Wealthcons" },
  { label: "Quản lý vận hành", value: (<>
      Tư vấn quản lý vận hành: Savills
      <small>hoặc đơn vị có tiêu chuẩn tương đương</small>
    </>) },
  { label: "Động thổ", value: "29/07/2026" },
  { label: "Mở bán dự kiến", value: "Tháng 10/2026" },
];

export const SONG_STATS = [
  { i: "Sống tinh tuyển", b: (<>99</>), span: "sản phẩm cho một cộng đồng chọn lọc" },
  { i: "Sống cân bằng", b: (<>12</>), span: "loại layout cho nhu cầu sống đa dạng" },
  { i: "Sống tận hưởng", b: (<>15<small> m²</small></>), span: "tiện ích cho mỗi căn hộ, 2 tầng tiện ích cho 11 tầng căn hộ" },
  { i: "Sống trọn vẹn", b: (<>2,85<small> m</small></>), span: "cao độ trần hoàn thiện, 10 trạm sạc xe điện" },
];

/* ===== Vị trí ===== */
export const LOCATION_FACT =
  "Dự án nằm kế bên 2 ga tương lai của tuyến Metro số 3A (Bến Thành – Tân Kiên): ga Công viên Phú Lâm và ga Bến xe Miền Tây. Từ đây thuận tiện kết nối Bến xe Miền Tây, đại lộ Võ Văn Kiệt và hệ tiện ích thương mại, giáo dục, y tế trong bán kính 5–20 phút.";

export const NEARBY_AMENITIES = [
  { b: "Giao thông", span: "2 ga Metro số 3A tương lai, Bến xe Miền Tây, đại lộ Võ Văn Kiệt, Quốc lộ 1A" },
  { b: "Mua sắm", span: "AEON Mall Bình Tân, GO! An Lạc, Co.opmart Bình Tân, MM Mega Market Bình Phú, Lotte Mart, chợ An Lạc, chợ Bình Tây" },
  { b: "Y tế", span: "BV Triều An, BV Quốc tế City, BV Nhi Đồng Thành phố, BV Gia An 115, BV Đại học Y Dược" },
  { b: "Giáo dục", span: "Trường Liên cấp Ngô ThờI Nhiệm, Trường Quốc tế Nam Úc Scotch AGS, Trường Quốc tế Mỹ Việt, Mầm non quốc tế Maple Bear" },
  { b: "Công viên", span: "Công viên Phú Lâm, Công viên Bình Phú, Công viên nước Beryland" },
];

export const INFRASTRUCTURE = [
  { b: "Metro số 3A", span: "Bến Thành – Kinh Dương Vương – Tân Kiên" },
  { b: "Mở rộng Quốc lộ 1", span: "Lên 10–12 làn xe" },
  { b: "Tái tổ chức nút giao", span: "Nút giao Kinh Dương Vương" },
  { b: "Kéo dài đại lộ Võ Văn Kiệt", span: "Trục Đông – Tây về trung tâm" },
  { b: "Vành đai 3", span: "Hoàn thiện kết nối liên vùng" },
  { b: "Cao tốc Bến Lức – Long Thành", span: "Hoàn thiện tuyến cao tốc" },
];

/* ===== Tiện ích ===== */
export const AMENITY_FACT =
  "Theo tính toán của chủ đầu tư, mỗi căn hộ có khoảng 15 m² tiện ích, tương đương 6 m² cho mỗi cư dân. Tầng 4 dành cho hồ bơi và sức khỏe, tầng thượng là Sky Park ngắm thành phố.";

export interface AccSlide { src: string; src800?: string; w: number; h: number; alt: string; ten: string; mo: string }
export const ACC_SLIDES: AccSlide[] = [
  {
    src: `${IMG}/the-westique-residences-ho-boi-tang-4.webp`,
    src800: `${IMG}/the-westique-residences-ho-boi-tang-4-800.webp`,
    w: 1200, h: 740,
    alt: "Hồ bơi tầng 4 The Westique Residences: lòng hồ dài dưới mái dốc, vách kính nhìn ra thành phố lúc hoàng hôn",
    ten: "Hồ bơi tầng 4", mo: "Lòng hồ dài dưới mái dốc, vách kính nhìn ra thành phố.",
  },
  {
    src: `${IMG}/the-westique-residences-be-jacuzzi-view-thanh-pho.webp`,
    src800: `${IMG}/the-westique-residences-be-jacuzzi-view-thanh-pho-800.webp`,
    w: 1200, h: 702,
    alt: "Bể Jacuzzi tầng 4 The Westique Residences mở ra tầm nhìn thành phố khu Tây lúc hoàng hôn",
    ten: "Bể Jacuzzi", mo: "Bể sục với tầm nhìn rộng mở ra khu Tây.",
  },
  {
    src: `${IMG}/the-westique-residences-ho-boi-tre-em.webp`,
    src800: `${IMG}/the-westique-residences-ho-boi-tre-em-800.webp`,
    w: 1200, h: 702,
    alt: "Hồ bơi trẻ em tầng 4 The Westique Residences, khu nước nông riêng cho bé cạnh sàn thư giãn",
    ten: "Hồ bơi trẻ em", mo: "Không gian riêng, an toàn cho trẻ.",
  },
  {
    src: `${IMG}/the-westique-residences-phong-gym-yoga.webp`,
    src800: `${IMG}/the-westique-residences-phong-gym-yoga-800.webp`,
    w: 1108, h: 764,
    alt: "Phòng gym và yoga The Westique Residences với máy chạy bộ, khu tạ và vách kính cao từ sàn tới trần",
    ten: "Gym & yoga", mo: "Phòng tập hiện đại, vách kính từ sàn tới trần.",
  },
  {
    src: `${IMG}/the-westique-residences-kids-club.webp`,
    w: 752, h: 563,
    alt: "Kids' club The Westique Residences: phòng chơi sáng tạo với vòm gỗ uốn cong, đèn treo và cửa kính nhìn ra thành phố",
    ten: "Kids' club", mo: "Không gian vui chơi sáng tạo cho trẻ.",
  },
  {
    src: `${IMG}/the-westique-residences-community-lounge.webp`,
    src800: `${IMG}/the-westique-residences-community-lounge-800.webp`,
    w: 852, h: 645,
    alt: "Community Lounge The Westique Residences: sofa, bàn ăn chung và đèn chùm trong không gian sinh hoạt cộng đồng",
    ten: "Community Lounge", mo: "Nơi kết nối những tâm hồn đồng điệu.",
  },
  {
    src: `${IMG}/the-westique-residences-sky-park-tang-thuong.webp`,
    src800: `${IMG}/the-westique-residences-sky-park-tang-thuong-800.webp`,
    w: 1200, h: 711,
    alt: "Sky Park tầng thượng The Westique Residences: sân chơi trẻ em ngoài trờI, khu thư giãn và giàn cây xanh nhìn ra thành phố",
    ten: "Sky Park", mo: "Sân chơi trẻ em và khu thư giãn giữa tầng mây.",
  },
  {
    src: `${IMG}/the-westique-residences-khu-bbq-san-thuong.webp`,
    src800: `${IMG}/the-westique-residences-khu-bbq-san-thuong-800.webp`,
    w: 1200, h: 675,
    alt: "Khu BBQ trên tầng thượng The Westique Residences dưới giàn cây, bàn ăn ngoài trờI nhìn về trung tâm thành phố",
    ten: "Khu BBQ", mo: "Bàn tiệc ngoài trờI trên tầng thượng.",
  },
];

export const FLOOR_STACK = [
  { hl: true, t: "Tầng thượng", b: "Sky Park", span: "Khu vui chơi trẻ em ngoài trờI, khu BBQ, khu thư giãn & ngắm cảnh" },
  { hl: false, t: "Tầng 5–15", b: "11 tầng căn hộ", span: "95 căn Studio – 3 phòng ngủ, 8–10 căn mỗi sàn, 3 thang máy" },
  { hl: true, t: "Tầng 4", b: "Tiện ích sức khỏe", span: "Hồ bơi, hồ bơi trẻ em, bể Jacuzzi, phòng gym & yoga, kids' club, Community Lounge" },
  { hl: false, t: "Tầng 2–3", b: "Đỗ xe cư dân", span: "Khu đỗ xe riêng cho cư dân, trạm sạc xe điện" },
  { hl: false, t: "Tầng 1", b: "Sảnh & shophouse", span: "Sảnh đón cư dân, bãi đỗ xe khách, trạm sạc xe điện, 4 shophouse" },
];

export const OPERATING_SERVICES = [
  "An ninh 6 lớp",
  "Bảo vệ 24/7",
  "Lễ tân hỗ trợ từng căn hộ",
  "Khu giao nhận hàng",
  "10 trạm sạc xe điện",
];

/* ===== Sản phẩm ===== */
export const PRODUCT_ROWS = [
  { loai: "Studio", sl: "10", gfa: "34,6 – 35,3", nsa: "30,3" },
  { loai: "1 phòng ngủ", sl: "13", gfa: "55,2 – 59,7", nsa: "48,6 – 53,5" },
  { loai: "2 phòng ngủ", sl: "54", gfa: "70,2 – 83,0", nsa: "62,8 – 75,1" },
  { loai: "3 phòng ngủ", sl: "18", gfa: "101,0 – 108,1", nsa: "90,9 – 99,6" },
  { loai: "Shophouse", sl: "4", gfa: "46,9 – 77,2", nsa: "43,3 – 69,9" },
  { loai: "Tổng cộng", sl: "99", gfa: "", nsa: "" },
];

export interface FloorPlan { key: string; tab: string; src: string; src800: string; w: number; h: number; alt: string }
export const FLOOR_PLANS: FloorPlan[] = [
  {
    key: "mb1", tab: "Tầng 5–6",
    src: `${IMG}/the-westique-residences-mat-bang-tang-5-6.webp`,
    src800: `${IMG}/the-westique-residences-mat-bang-tang-5-6-800.webp`,
    w: 1400, h: 1067,
    alt: "Mặt bằng căn hộ tầng 5–6 The Westique Residences: 10 căn gồm Studio, 1 phòng ngủ và 2 phòng ngủ quanh lõi thang",
  },
  {
    key: "mb2", tab: "Tầng 7–9",
    src: `${IMG}/the-westique-residences-mat-bang-tang-7-9.webp`,
    src800: `${IMG}/the-westique-residences-mat-bang-tang-7-9-800.webp`,
    w: 1400, h: 1349,
    alt: "Mặt bằng căn hộ tầng 7–9 The Westique Residences: Studio, 1 phòng ngủ, 2 phòng ngủ và căn góc 3 phòng ngủ",
  },
  {
    key: "mb3", tab: "Tầng 10–15",
    src: `${IMG}/the-westique-residences-mat-bang-tang-10-15.webp`,
    src800: `${IMG}/the-westique-residences-mat-bang-tang-10-15-800.webp`,
    w: 1400, h: 1100,
    alt: "Mặt bằng căn hộ tầng 10–15 The Westique Residences: 8 căn mỗi sàn gồm 1 phòng ngủ, 2 phòng ngủ và 3 phòng ngủ",
  },
];

export const UNIT_LAYOUTS: FloorPlan[] = [
  {
    key: "lo1", tab: "Studio",
    src: `${IMG}/the-westique-residences-layout-can-studio.webp`,
    src800: `${IMG}/the-westique-residences-layout-can-studio-800.webp`,
    w: 1600, h: 607,
    alt: "Layout căn Studio The Westique Residences: căn ST1 và ST2 diện tích tim tường 34,6–35,3 m², thông thủy 30,3 m²",
  },
  {
    key: "lo2", tab: "1 phòng ngủ",
    src: `${IMG}/the-westique-residences-layout-can-1-phong-ngu.webp`,
    src800: `${IMG}/the-westique-residences-layout-can-1-phong-ngu-800.webp`,
    w: 1600, h: 516,
    alt: "Layout căn 1 phòng ngủ The Westique Residences: căn A1 và A2 diện tích tim tường 55,2–59,7 m²",
  },
  {
    key: "lo3", tab: "2PN · B1–B3",
    src: `${IMG}/the-westique-residences-layout-can-2-phong-ngu-b1-b2-b3.webp`,
    src800: `${IMG}/the-westique-residences-layout-can-2-phong-ngu-b1-b2-b3-800.webp`,
    w: 1600, h: 745,
    alt: "Layout căn 2 phòng ngủ The Westique Residences: căn B1-A, B1-B, B2 và B3 diện tích tim tường 70,2–80,2 m²",
  },
  {
    key: "lo4", tab: "2PN · còn lại",
    src: `${IMG}/the-westique-residences-layout-can-2-phong-ngu-b4-b5-b6.webp`,
    src800: `${IMG}/the-westique-residences-layout-can-2-phong-ngu-b4-b5-b6-800.webp`,
    w: 1600, h: 749,
    alt: "Layout căn 2 phòng ngủ The Westique Residences: các căn 2 phòng ngủ còn lại, diện tích tim tường đến 83,0 m²",
  },
  {
    key: "lo5", tab: "3 phòng ngủ",
    src: `${IMG}/the-westique-residences-layout-can-3-phong-ngu.webp`,
    src800: `${IMG}/the-westique-residences-layout-can-3-phong-ngu-800.webp`,
    w: 1600, h: 612,
    alt: "Layout căn 3 phòng ngủ The Westique Residences: căn C1 tim tường 108,1 m² và căn C2 tim tường 101,0 m²",
  },
];

export const HANDOVER_STANDARDS = [
  "Hoàn thiện liền tường",
  "Thiết bị thương hiệu cao cấp",
  "Hệ máy lạnh multi",
  "Hệ tủ & thiết bị, phụ kiện bếp",
  "Trọn bộ thiết bị nhà vệ sinh",
  "Tủ giày Laminate",
];

export const INTERIOR_GALLERY = [
  {
    src: `${IMG}/the-westique-residences-noi-that-phong-khach.webp`,
    src800: `${IMG}/the-westique-residences-noi-that-phong-khach-800.webp`,
    w: 900, h: 1028,
    alt: "Phòng khách căn hộ mẫu The Westique Residences: sofa kem, bàn tròn đá và cửa kính lớn đón sáng tự nhiên",
    cap: "Phòng khách",
  },
  {
    src: `${IMG}/the-westique-residences-noi-that-bep-phong-an.webp`,
    src800: `${IMG}/the-westique-residences-noi-that-bep-phong-an-800.webp`,
    w: 1200, h: 772,
    alt: "Bếp và phòng ăn căn hộ mẫu The Westique Residences: bàn ăn đá, tủ bếp liền tường và khu tiếp khách",
    cap: "Bếp & phòng ăn",
  },
  {
    src: `${IMG}/the-westique-residences-noi-that-phong-ngu.webp`,
    src800: `${IMG}/the-westique-residences-noi-that-phong-ngu-800.webp`,
    w: 868, h: 579,
    alt: "Phòng ngủ master căn 2 phòng ngủ The Westique Residences với đầu giường ốp vải, đèn hắt trần và rèm che sáng",
    cap: "Phòng khách",
  },
];

/* ===== Chủ đầu tư ===== */
export const VCRE_PROJECTS = [
  { b: "Nobu Danang", s: "khách sạn", hl: false },
  { b: "The Westique", s: "nhà ở", hl: true },
  { b: "Nobu Saigon", s: "khách sạn", hl: false },
  { b: "The Vertex", s: "thương mại", hl: false },
  { b: "Hyatt Regency Phu Quoc", s: "khách sạn", hl: false },
  { b: "Phu An", s: "nhà ở", hl: false },
  { b: "Thanh Da", s: "nhà ở", hl: false },
];

export const AWARDS = [
  {
    src: `${IMG}/vcre-best-luxury-boutique-developer-2026.webp`,
    w: 800, h: 800,
    alt: "VCRE được vinh danh Best Luxury Boutique Developer tại Vietnam Real Estate Awards 2026 của Dot Property",
    b: "Best Luxury Boutique Developer",
    span: "VCRE · Vietnam Real Estate Awards 2026 (Dot Property)",
  },
  {
    src: `${IMG}/the-westique-residences-giai-asia-pacific-property-awards-2026.webp`,
    src800: `${IMG}/the-westique-residences-giai-asia-pacific-property-awards-2026-800.webp`,
    w: 1400, h: 788,
    alt: "The Westique Residences đạt 2 giải Asia Pacific Property Awards 2026–2027 về kiến trúc và dự án nhà ở cao tầng",
    b: "Asia Pacific Property Awards 2026–2027",
    span: "The Westique Residences: Kiến trúc nhà ở cao tầng tiêu biểu · Dự án nhà ở cao tầng tốt nhất (Việt Nam)",
  },
];

export const CONSULTANTS = [
  { b: "Planetworks", span: "Ý tưởng kiến trúc" },
  { b: "DB – Beyond design & build", span: "Tư vấn kiến trúc" },
  { b: "Ong&Ong", span: "Tư vấn thiết kế nội thất" },
  { b: "TA Landscape Architecture", span: "Tư vấn cảnh quan" },
  { b: "Space Engineering", span: "Tư vấn cơ điện (MEP)" },
  { b: "Acons", span: "Tư vấn kết cấu" },
  { b: "DJ Coalition", span: "Tư vấn chiếu sáng mặt dựng" },
  { b: "SCQC", span: "Giám sát xây dựng" },
  { b: "Wealthcons", span: "Tổng thầu xây dựng" },
];

/* ===== Pháp lý ===== */
export const LEGAL_TIMELINE = [
  { b: "11/2016", span: "Giấy chứng nhận quyền sử dụng đất", sap: false },
  { b: "08/2025", span: "Giấy chứng nhận đầu tư", sap: false },
  { b: "11/2025", span: "Phê duyệt quy hoạch 1/500", sap: false },
  { b: "03/2026", span: "Phê duyệt báo cáo nghiên cứu khả thi", sap: false },
  { b: "04/2026", span: "Thẩm duyệt phòng cháy chữa cháy", sap: false },
  { b: "05/2026", span: "Thông báo khởi công", sap: false },
  { b: "09/2026", span: "Văn bản đủ điều kiện bán hàng", sap: true },
];

export const MILESTONES = [
  {
    src: `${IMG}/the-westique-residences-le-dong-tho-29-07-2026.webp`,
    src800: `${IMG}/the-westique-residences-le-dong-tho-29-07-2026-800.webp`,
    w: 1000, h: 632,
    alt: "Lễ động thổ The Westique Residences ngày 29/07/2026 với đại diện VCRE và các đối tác trên sân khấu",
    cap: (<><b>29/07/2026</b> · Lễ động thổ chính thức</>),
  },
  {
    src: `${IMG}/the-westique-residences-khai-truong-nha-mau-01-08-2026.webp`,
    src800: `${IMG}/the-westique-residences-khai-truong-nha-mau-01-08-2026-800.webp`,
    w: 1000, h: 625,
    alt: "Khai trương nhà mẫu bán hàng The Westique Residences ngày 01/08/2026, múa lân trước Experience Gallery",
    cap: (<><b>01/08/2026</b> · Khai trương nhà mẫu bán hàng</>),
  },
];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "The Westique Residences nằm ở đâu?",
    a: "The Westique Residences nằm tại 289 Kinh Dương Vương, phường An Lạc, TP.HCM (trước ngày 1/7/2025 thuộc quận Bình Tân), cửa ngõ phía Tây thành phố. Dự án kế bên 2 ga tương lai của tuyến Metro số 3A là ga Công viên Phú Lâm và ga Bến xe Miền Tây, gần Bến xe Miền Tây và đại lộ Võ Văn Kiệt.",
  },
  {
    q: "Chủ đầu tư The Westique Residences là ai?",
    a: "Chủ đầu tư là Công ty Cổ phần Bất động sản Bản Việt (VCRE – Viet Capital Real Estate), đơn vị theo đuổi định hướng Boutique Developer với các dự án Nobu Danang, Nobu Saigon, The Vertex, Hyatt Regency Phu Quoc. VCRE được vinh danh Best Luxury Boutique Developer tại Vietnam Real Estate Awards 2026 của Dot Property.",
  },
  {
    q: "Vì sao The Westique Residences chỉ có 99 sản phẩm?",
    a: "The Westique Residences phát triển theo mô hình boutique: quy mô hữu hạn để kiểm soát chất lượng thiết kế, mật độ và trải nghiệm sống. Dự án chỉ có 1 tháp 15 tầng với 95 căn hộ và 4 shophouse, mỗi sàn 8–10 căn, mật độ xây dựng 40%.",
  },
  {
    q: "The Westique Residences có những loại căn hộ nào?",
    a: "Dự án có 10 căn Studio (thông thủy 30,3 m²), 13 căn 1 phòng ngủ (48,6–53,5 m²), 54 căn 2 phòng ngủ (62,8–75,1 m²), 18 căn 3 phòng ngủ (90,9–99,6 m²) và 4 shophouse (43,3–69,9 m²), tổng cộng 12 loại layout. Diện tích theo tài liệu chủ đầu tư, số liệu chính xác theo hợp đồng mua bán.",
  },
  {
    q: "Tiện ích nội khu The Westique Residences gồm những gì?",
    a: "Dự án có 2 tầng tiện ích. Tầng 4 gồm hồ bơi, hồ bơi trẻ em, bể Jacuzzi, phòng gym và yoga, kids' club, Community Lounge. Tầng thượng là Sky Park với khu vui chơi trẻ em ngoài trờI, khu BBQ và khu thư giãn ngắm cảnh. Tầng 1 đến tầng 3 có sảnh cư dân, khu đỗ xe và 10 trạm sạc xe điện.",
  },
  {
    q: "Pháp lý The Westique Residences đến đâu?",
    a: "Theo tài liệu chủ đầu tư, dự án có giấy chứng nhận quyền sử dụng đất (11/2016), giấy chứng nhận đầu tư (08/2025), quy hoạch 1/500 được phê duyệt (11/2025), báo cáo nghiên cứu khả thi được phê duyệt (03/2026), thẩm duyệt phòng cháy chữa cháy (04/2026) và thông báo khởi công (05/2026). Lễ động thổ diễn ra ngày 29/07/2026.",
  },
  {
    q: "Ai thiết kế, thi công và vận hành The Westique Residences?",
    a: "Ý tưởng kiến trúc do Planetworks, tư vấn kiến trúc DB, nội thất Ong&Ong, cảnh quan TA Landscape Architecture, kết cấu Acons, cơ điện Space Engineering; tổng thầu Wealthcons, giám sát SCQC. Tư vấn quản lý vận hành là Savills hoặc đơn vị có tiêu chuẩn tương đương.",
  },
  {
    q: "Khi nào The Westique Residences mở bán và giá bao nhiêu?",
    a: "Theo tài liệu dự án, The Westique Residences dự kiến mở bán tháng 10/2026. Bảng giá từng căn, chính sách bán hàng và lịch thanh toán được chuyên viên ERA đã gửi bạn trang này cập nhật theo công bố chính thức của chủ đầu tư.",
  },
];

/* ===== CTA ===== */
export const CTA_BULLETS = [
  "Bảng giá từng căn và chính sách bán hàng mới nhất",
  "Lịch thanh toán, phương án vay theo từng loại căn",
  "Mặt bằng, layout chi tiết và hẹn lịch tham quan nhà mẫu",
];
