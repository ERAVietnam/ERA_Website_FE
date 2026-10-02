import { IMG } from "./theme";

/* ===== Tổng quan — bảng thông số ===== */
export const SPEC_ROWS: { label: string; value: string; bold?: boolean }[] = [
  { label: "Tên dự án", value: "Nam Mekong Grand Plaza (Bình Dương)", bold: true },
  { label: "Vị trí", value: "Lô đất A4, vòng xoay WTC (Trung tâm Thương mại Thế giới), Thành phố mới Bình Dương — nay thuộc phường Bình Dương, TP. Hồ Chí Minh" },
  { label: "Chủ đầu tư", value: "Công ty Cổ phần Tập đoàn Nam Mê Kông (Mekong Group – mã CK: VC3)" },
  { label: "Tổng mức đầu tư", value: "Trên 4.000 tỷ đồng" },
  { label: "Diện tích khu đất", value: "13.095 m²" },
  { label: "Quy mô", value: "2 tòa tháp cao 30 tầng nổi và 3 tầng hầm đỗ xe" },
  { label: "Số lượng sản phẩm", value: "1.622 căn — Tháp G1 (Tháp A) 905 căn, Tháp G2 (Tháp B) 717 căn" },
  { label: "Loại hình", value: "Căn hộ Studio đến 3 phòng ngủ (35,85 – 125,28 m²), Penthouse (266,59 – 437,2 m²) và 29 căn thương mại dịch vụ tầng 1" },
  { label: "Pháp lý", value: "Hoàn thiện thủ tục chuyển nhượng một phần dự án từ Becamex IDC; Giấy phép xây dựng số 16943/SXD-QLXDCT ngày 21/11/2025; căn hộ sở hữu lâu dài" },
  { label: "Tiến độ", value: "Khởi công 22/04/2026 · bàn giao dự kiến năm 2028" },
  { label: "Điểm nhấn", value: "Mô hình đô thị giao thông công cộng (TOD), tiện ích khép kín, gian lánh nạn PCCC tại tầng 20 cùng cầu nối kỹ thuật giữa hai tòa tháp" },
  { label: "Đối tác", value: "Tư vấn thiết kế CDC & DK LAUD · giám sát CIDECO · quản lý vận hành CBRE · bảo lãnh Vietinbank" },
];

export const OVERVIEW_STATS = [
  { b: "13.095 m²", span: "Diện tích khu đất" },
  { b: "2 tháp", span: "30 tầng nổi · 3 tầng hầm" },
  { b: "1.622", span: "Căn hộ & sản phẩm" },
  { b: "50+", span: "Tiện ích nội khu" },
];

/* ===== Vị trí ===== */
export interface PhutItem { b: string; span: string }
export interface LocationTab {
  key: string;
  label: string;
  fig: string;
  figW: number;
  figH: number;
  figAlt: string;
  cap: string;
  title: string;
  items: PhutItem[];
}

export const LOCATION_TABS: LocationTab[] = [
  {
    key: "vitri",
    label: "Vị trí nội đô",
    fig: `${IMG}/nam-mekong-grand-plaza-ban-do-vi-tri-vong-xoay-wtc.webp`,
    figW: 1195,
    figH: 675,
    figAlt: "Bản đồ vị trí Nam Mekong Grand Plaza tại vòng xoay WTC, cạnh đường Lê Hoàn, gần Trung tâm hành chính và trường Nguyễn Khuyến",
    cap: "Dự án bao quanh bởi 4 mặt đường Duy Tân – Lê Hoàn – Nguyễn Thị Định – Chu Văn An · bấm để phóng to",
    title: "Từ dự án",
    items: [
      { b: "03–05′", span: "Trung tâm WTC, Ga Metro" },
      { b: "07–10′", span: "Trường học, Trung tâm hành chính, Aeon Midori Park" },
      { b: "10–15′", span: "Trường Quốc tế, Bệnh viện, Aeon Bình Dương" },
      { b: "15–20′", span: "Sân Golf" },
    ],
  },
  {
    key: "vung",
    label: "Kết nối vùng & metro",
    fig: `${IMG}/nam-mekong-grand-plaza-ban-do-ket-noi-metro.webp`,
    figW: 1400,
    figH: 784,
    figAlt: "Bản đồ kết nối vùng của Nam Mekong Grand Plaza: tuyến metro số 1, số 2, tuyến nối Biên Hòa và các khu công nghiệp, sân golf",
    cap: "Bản đồ kết nối vùng · bấm để phóng to",
    title: "Kết nối vùng",
    items: [
      { b: "Metro", span: "Tuyến số 1 (Bình Dương – Suối Tiên), tuyến số 2 và tuyến kết nối Biên Hòa theo quy hoạch" },
      { b: "30–35 km", span: "Đến trung tâm TP.HCM qua Quốc lộ 13 hoặc Mỹ Phước – Tân Vạn" },
      { b: "28–32 km", span: "Đến sân bay Tân Sơn Nhất" },
      { b: "~3 km", span: "Đến KCN VSIP 2 · KCN Mỹ Phước ~10 km" },
    ],
  },
];

export const QUANH = [
  { name: "WTC – khu triển lãm, văn phòng", d: "0,4 km" },
  { name: "Trường THCS – THPT Nguyễn Khuyến", d: "0,4 km" },
  { name: "Khu Hikari – phố Nhật", d: "0,5 km" },
  { name: "Dãy phố ngân hàng", d: "0,5 km" },
  { name: "Tòa nhà Trung tâm hành chính", d: "0,5–1 km" },
  { name: "Trung tâm hội nghị – triển lãm", d: "~1 km" },
  { name: "Trường Quốc tế Việt Hoa", d: "1 km" },
  { name: "Trường Ngô Thời Nhiệm", d: "~1 km" },
  { name: "Aeon Mall Midori Park", d: "1,3 km" },
  { name: "Công viên trung tâm TP mới", d: "1,3 km" },
  { name: "Trường Quốc tế Singapore (SIS)", d: "~1,5 km" },
  { name: "Trung tâm TDTT TP mới", d: "1,5 km" },
  { name: "Aeon Mall Sora Gardens", d: "2 km" },
  { name: "Đại học Quốc tế Miền Đông (EIU)", d: "2–2,5 km" },
  { name: "Harmonie Golf Park, Twin Doves", d: "4,5 km" },
  { name: "Khu du lịch Đại Nam", d: "6 km" },
];

/* ===== Tiện ích nội khu — slider + danh mục tầng ===== */
export const SLIDES = [
  { src: `${IMG}/nam-mekong-grand-plaza-ho-boi-tang-2-800.webp`, w: 800, h: 533, ten: "Hồ bơi tầng 2", mo: "Bể người lớn khoảng 240 m², bể trẻ em khoảng 50 m²." },
  { src: `${IMG}/nam-mekong-grand-plaza-sanh-le-tan-800.webp`, w: 800, h: 800, ten: "Sảnh lễ tân cao 7,2 m", mo: "Sảnh chính và khu đón khách tầng 1." },
  { src: `${IMG}/nam-mekong-grand-plaza-phong-gym-fitness-800.webp`, w: 800, h: 400, ten: "Gym – Fitness", mo: "Tầng 2 tháp G1, cạnh khu Boxing, Pilates." },
  { src: `${IMG}/nam-mekong-grand-plaza-phong-yoga-800.webp`, w: 800, h: 394, ten: "Khu Yoga", mo: "Không gian tập nhìn ra mảng xanh tầng 2." },
  { src: `${IMG}/nam-mekong-grand-plaza-phong-xong-hoi-da-muoi.webp`, w: 800, h: 1067, ten: "Xông hơi đá Himalaya", mo: "Cùng khu Sauna, Massage – Spa tầng 2." },
  { src: `${IMG}/nam-mekong-grand-plaza-phong-chieu-phim-800.webp`, w: 800, h: 532, ten: "Phòng chiếu phim", mo: "Tiện ích giải trí tầng 1 cho cư dân." },
  { src: `${IMG}/nam-mekong-grand-plaza-thu-vien-khu-doc-sach-800.webp`, w: 800, h: 800, ten: "Thư viện – phòng đọc sách", mo: "Góc đọc yên tĩnh cho cả gia đình." },
  { src: `${IMG}/nam-mekong-grand-plaza-khu-sinh-hoat-cong-dong-co-working-800.webp`, w: 800, h: 533, ten: "Khu sinh hoạt cộng đồng", mo: "Tổng 1.305 m² tại cả hai tòa tháp." },
  { src: `${IMG}/nam-mekong-grand-plaza-quay-cafe-bar-800.webp`, w: 800, h: 400, ten: "Quán cafe", mo: "Điểm hẹn ngay khối đế tầng 1." },
  { src: `${IMG}/nam-mekong-grand-plaza-nha-hang-noi-khu-800.webp`, w: 800, h: 400, ten: "Nhà hàng", mo: "Không gian ẩm thực trong khuôn viên." },
  { src: `${IMG}/nam-mekong-grand-plaza-vuon-tren-cao-cau-bo-hanh-800.webp`, w: 800, h: 533, ten: "Vườn trên cao", mo: "Mảng xanh tại tầng 20, 29 và 30." },
];

export const TANGS = [
  {
    key: "1", label: "Tầng 1", small: "28 tiện ích", title: "Tiện ích nội khu tầng 1",
    items: ["Quảng trường dự án","Sảnh chính","Khu vực đón khách","Lối lên văn phòng","Sân chơi trẻ em","Vườn cỏ thư giãn","Đường dạo bộ","Vườn cảnh","Vườn chủ đề","Khu vui chơi – dạo bộ mùa hè","Khu vui chơi – check-in","ArtWork Decor","Vườn thiền, khu thể thao ngoài trời","Chòi nghỉ","Sảnh thương mại","Siêu thị mini","Khách sạn mini","Phòng khám nha khoa","Khu giặt là","Kids Club","Phòng chiếu phim","Phòng đọc sách","Quán cafe","Shop thời trang","Khu vui chơi thiếu nhi","Đường dạo cảnh quan","Nhà hàng","Khu đọc sách – nghỉ ngơi"],
  },
  {
    key: "2", label: "Tầng 2", small: "16 tiện ích", title: "Tiện ích tầng 2",
    items: ["Khu sinh hoạt cộng đồng","Thư viện","Nhà trẻ","Khu đọc sách","Hồ bơi","Khu xông hơi đá Himalaya","Khu Sauna","Khu Massage – Spa","Khu phòng Golf mô phỏng","Khu Gym – Fitness","Khu tập Boxing","Khu Yoga","Khu Pilates","Vườn hoa 4 mùa","Khu nghỉ","Xích đu"],
  },
  {
    key: "20", label: "Tầng 20", small: "3 tiện ích", title: "Tiện ích tầng 20",
    items: ["Ghế nghỉ","Khu đọc sách","Đường dạo"],
  },
  {
    key: "29", label: "Tầng 29", small: "4 tiện ích", title: "Tiện ích tầng 29",
    items: ["Vườn nướng BBQ","Khu tổ chức sự kiện – workshop","Vườn thiền","Khu massage chân bằng sỏi"],
  },
  {
    key: "30", label: "Tầng 30", small: "4 tiện ích", title: "Tiện ích tầng 30",
    items: ["Vườn trên cao","Khu đọc sách","Artwork decor","Khu đọc sách – nghỉ ngơi"],
  },
];

/* ===== Tiện ích ngoại khu ===== */
export const NK_CARDS = [
  {
    src: `${IMG}/nam-mekong-grand-plaza-to-hop-wtc-gateway-a1-800.webp`,
    w: 800, h: 450,
    zoom: `${IMG}/nam-mekong-grand-plaza-to-hop-wtc-gateway-a1.webp`,
    alt: "Tổ hợp WTC Gateway (A1) cạnh Nam Mekong Grand Plaza: nhà ga metro trung tâm, trung tâm thương mại và nhà thi đấu",
    b: "Tổ hợp Vòng xoay WTC Gateway (A1)",
    p: "Nằm liền kề dự án là khu phức hợp quy mô 7 ha, tích hợp nhà ga trung tâm của tuyến Metro số 1 nối dài. Nơi đây sở hữu trung tâm thương mại quy mô lớn, khu liên hợp thể thao hiện đại và quảng trường văn hoá mở, tạo ra một không gian sinh hoạt, vui chơi mang tầm cỡ quốc tế.",
  },
  {
    src: `${IMG}/nam-mekong-grand-plaza-view-trung-tam-hanh-chinh-800.webp`,
    w: 800, h: 450,
    zoom: `${IMG}/nam-mekong-grand-plaza-view-trung-tam-hanh-chinh.webp`,
    alt: "Từ Nam Mekong Grand Plaza nhìn về Trung tâm hành chính Bình Dương, vòng xoay WTC và tuyến metro trên cao",
    b: "Khu hành chính tập trung",
    p: "Nằm đối diện trực tiếp Trung tâm Văn hoá và Hành chính tỉnh Bình Dương, mang lại sự thuận lợi tuyệt đối khi cư dân cần tiếp cận các dịch vụ công và thủ tục pháp lý.",
  },
  {
    src: `${IMG}/nam-mekong-grand-plaza-quang-truong-central-station-800.webp`,
    w: 800, h: 450,
    zoom: `${IMG}/nam-mekong-grand-plaza-quang-truong-central-station.webp`,
    alt: "Quảng trường và nhà ga Central Station tại vòng xoay WTC Gateway với tuyến metro trên cao chạy qua",
    b: "Kết nối giao thông chiến lược",
    p: "Dễ dàng di chuyển đến các trục đường huyết mạch như Mỹ Phước – Tân Vạn, Vành đai 4 và Quốc lộ 13, giúp tối ưu hoá thời gian di chuyển đến nơi làm việc tại các khu công nghiệp trọng điểm.",
  },
];

/* ===== Mặt bằng ===== */
export const MB_STATS = [
  { b: "13.095 m²", span: "Quỹ đất quy hoạch" },
  { b: "57,26%", span: "Mật độ khối đế" },
  { b: "43,99%", span: "Mật độ khối tháp" },
  { b: "30,81%", span: "Mảng xanh cảnh quan" },
];

export const STACK = [
  { b: "Tầng 20", span: "Gian lánh nạn chuyên biệt kết hợp cầu nối kỹ thuật giữa hai tòa tháp để ứng phó PCCC.", hl: true },
  { b: "Tầng 3 – 30", span: "Khu căn hộ, hành lang rộng 1,8 m lấy sáng tự nhiên. Căn sân vườn tại tầng 3 – 4." },
  { b: "Tầng 1 – 2", span: "“Trái tim” giao thương rộng gần 7.500 m²: shophouse, sảnh đón, khu sinh hoạt cộng đồng và nhà trẻ nội khu gần 1.000 m²." },
  { b: "Hầm B1 – B3", span: "Khoảng 10.800 m² mỗi tầng, tổng 32.398 m² — đáp ứng chỗ đỗ xe cho toàn bộ 1.622 căn hộ.", ham: true },
];

export const TOWER_TABS = [
  {
    key: "g1", label: "Tháp G1 (Tháp A)",
    src: `${IMG}/nam-mekong-grand-plaza-mat-bang-tang-dien-hinh-thap-g1.webp`,
    w: 1400, h: 964,
    alt: "Mặt bằng tầng điển hình tháp G1 (Tháp A) Nam Mekong Grand Plaza, tầng 6 đến 22 số chẵn: căn studio đến 3 phòng ngủ",
    cap: "Tháp G1 · tầng 6, 8, 10, 12, 14, 16, 18, 22 · bấm để phóng to, xem mã và diện tích từng căn",
  },
  {
    key: "g2", label: "Tháp G2 (Tháp B)",
    src: `${IMG}/nam-mekong-grand-plaza-mat-bang-tang-dien-hinh-thap-g2.webp`,
    w: 1400, h: 970,
    alt: "Mặt bằng tầng điển hình tháp G2 (Tháp B) Nam Mekong Grand Plaza, tầng 6 đến 22 số chẵn: căn studio đến 3 phòng ngủ",
    cap: "Tháp G2 · tầng 6, 8, 10, 12, 14, 16, 18, 22 · bấm để phóng to, xem mã và diện tích từng căn",
  },
];

export const LEGEND = [
  { color: "#F9D9DF", label: "Căn Studio" },
  { color: "#FBF0A8", label: "1 phòng ngủ" },
  { color: "#D5EBD8", label: "1 phòng ngủ + 1" },
  { color: "#C9DDF3", label: "2 phòng ngủ" },
  { color: "#F6D2A9", label: "2 phòng ngủ + 1" },
  { color: "#D9CBE6", label: "3 phòng ngủ" },
  { color: "#8FA9C4", label: "Penthouse" },
];

/* ===== Căn hộ ===== */
export interface Unit {
  key: string;
  tab: string;
  img: string;
  w: number;
  h: number;
  alt: string;
  code: string;
  codeSub: string;
  ds: string;
  specs: { k: string; v: string }[];
  fine: string;
}

export const UNITS: Unit[] = [
  {
    key: "studio", tab: "Studio",
    img: `${IMG}/nam-mekong-grand-plaza-can-studio-3d.webp`, w: 1200, h: 548,
    alt: "Phối cảnh 3D căn Studio Nam Mekong Grand Plaza: phòng khách, bếp, giường ngủ và ban công",
    code: "Studio", codeSub: "35,85 – 45,13 M²",
    ds: "Phòng khách, bếp và góc ngủ liên thông trong một không gian, có ban công lấy sáng.",
    specs: [
      { k: "Diện tích", v: "35,85 – 45,13 m²" },
      { k: "Trần bê tông", v: "3,3 m" },
      { k: "Ban công", v: "Có" },
    ],
    fine: "Phối cảnh 3D căn điển hình, mang tính minh họa. Diện tích theo tài liệu CĐT; thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "1pn", tab: "1 phòng ngủ",
    img: `${IMG}/nam-mekong-grand-plaza-can-1-phong-ngu-3d.webp`, w: 674, h: 316,
    alt: "Phối cảnh 3D căn 1 phòng ngủ Metro Home Nam Mekong Grand Plaza 39,99 m²: phòng khách, bếp, phòng ngủ và logia",
    code: "1PN", codeSub: "METRO HOME · 39,99 M²",
    ds: "Phòng khách, bếp và bàn ăn liên thông; phòng ngủ mở ra logia — hợp người trẻ, chuyên gia hoặc đầu tư cho thuê.",
    specs: [
      { k: "Diện tích thông thủy", v: "39,99 m²" },
      { k: "Phòng khách + bếp + ăn", v: "20,44 m²" },
      { k: "Phòng ngủ", v: "9,11 m²" },
      { k: "WC", v: "3,3 m²" },
      { k: "Logia", v: "5,2 m²" },
    ],
    fine: "Phối cảnh 3D căn mẫu dòng Metro Home, mang tính minh họa. Thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "1pn1", tab: "1 phòng ngủ +",
    img: `${IMG}/nam-mekong-grand-plaza-can-1-phong-ngu-cong-3d.webp`, w: 661, h: 428,
    alt: "Phối cảnh 3D căn 1 phòng ngủ + Metro Home Nam Mekong Grand Plaza 66,15 m²: 2 phòng ngủ, 2 WC và 2 logia",
    code: "1PN +", codeSub: "METRO HOME · 66,15 M²",
    ds: "Phòng ngủ chính có WC khép kín, thêm phòng “+” linh hoạt làm phòng làm việc hoặc phòng ngủ phụ; 2 logia.",
    specs: [
      { k: "Diện tích thông thủy", v: "66,15 m²" },
      { k: "Phòng khách + bếp + ăn", v: "26,1 m²" },
      { k: "Phòng ngủ 1", v: "10,85 m²" },
      { k: "Phòng ngủ +", v: "10,6 m²" },
      { k: "WC khép kín", v: "3,6 m²" },
      { k: "WC chung", v: "3,7 m²" },
      { k: "Logia chính", v: "3,3 m²" },
      { k: "Logia phụ", v: "5,1 m²" },
    ],
    fine: "Phối cảnh 3D căn mẫu dòng Metro Home, mang tính minh họa. Thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "2pn", tab: "2 phòng ngủ",
    img: `${IMG}/nam-mekong-grand-plaza-can-2-phong-ngu-3d.webp`, w: 1000, h: 753,
    alt: "Phối cảnh 3D căn 2 phòng ngủ Nam Mekong Grand Plaza: phòng khách, bàn ăn, bếp, 2 phòng ngủ và ban công",
    code: "2PN", codeSub: "64,85 – 73,47 M²",
    ds: "Dòng căn chủ lực cho gia đình trẻ; nhà mẫu 2 phòng ngủ rộng 65 m².",
    specs: [
      { k: "Diện tích", v: "64,85 – 73,47 m²" },
      { k: "Phòng ngủ", v: "2" },
      { k: "Nhà mẫu", v: "65 m²" },
    ],
    fine: "Phối cảnh 3D căn điển hình, mang tính minh họa. Diện tích theo tài liệu CĐT; thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "3a1", tab: "3 phòng ngủ A1",
    img: `${IMG}/nam-mekong-grand-plaza-can-3-phong-ngu-a1-3d.webp`, w: 1000, h: 946,
    alt: "Phối cảnh 3D căn 3 phòng ngủ loại A1 Nam Mekong Grand Plaza với bếp riêng, phòng ăn 8 ghế và ban công",
    code: "3PN · A1", codeSub: "81,21 – 125,28 M²",
    ds: "Căn góc rộng với phòng ăn lớn và bếp tách riêng, hợp gia đình nhiều thế hệ.",
    specs: [
      { k: "Diện tích dòng 3PN", v: "81,21 – 125,28 m²" },
      { k: "Phòng ngủ", v: "3" },
      { k: "Nhà mẫu 3PN", v: "85 m²" },
    ],
    fine: "Phối cảnh 3D căn điển hình, mang tính minh họa. Diện tích theo tài liệu CĐT; thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "3a4", tab: "3 phòng ngủ A4",
    img: `${IMG}/nam-mekong-grand-plaza-can-3-phong-ngu-a4-3d.webp`, w: 900, h: 953,
    alt: "Phối cảnh 3D căn 3 phòng ngủ loại A4 Nam Mekong Grand Plaza với lô gia cây xanh, phòng khách và 3 phòng ngủ",
    code: "3PN · A4", codeSub: "81,21 – 125,28 M²",
    ds: "Bố cục vuông vức, lô gia cây xanh nối phòng khách, 3 phòng ngủ tách khu yên tĩnh.",
    specs: [
      { k: "Diện tích dòng 3PN", v: "81,21 – 125,28 m²" },
      { k: "Phòng ngủ", v: "3" },
      { k: "Kính cửa", v: "Low-E 2 lớp" },
    ],
    fine: "Phối cảnh 3D căn điển hình, mang tính minh họa. Diện tích theo tài liệu CĐT; thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "ph", tab: "Penthouse",
    img: `${IMG}/nam-mekong-grand-plaza-can-penthouse-san-vuon-3d.webp`, w: 1100, h: 906,
    alt: "Phối cảnh 3D căn Penthouse Nam Mekong Grand Plaza với sân vườn riêng, chòi nghỉ và nhiều phòng ngủ",
    code: "Penthouse", codeSub: "266,59 – 437,2 M²",
    ds: "Căn hộ đỉnh tháp với sân vườn riêng; một số tầng có chiều cao căn hộ 6,6 m để thiết kế như căn thông tầng.",
    specs: [
      { k: "Diện tích", v: "266,59 – 437,2 m²" },
      { k: "Sân vườn", v: "Riêng" },
      { k: "Tầng cao 6,6 m", v: "12, 19, 27, 29, 30" },
    ],
    fine: "Phối cảnh 3D căn điển hình, mang tính minh họa. Diện tích theo tài liệu CĐT; thông tin chính thức căn cứ hợp đồng mua bán.",
  },
];

export const AREA_ROWS = [
  { loai: "Studio", dt: "35,85 – 45,13 m²" },
  { loai: "1 phòng ngủ", dt: "39,32 – 40,29 m²" },
  { loai: "1 phòng ngủ +", dt: "65,64 – 65,79 m²" },
  { loai: "2 phòng ngủ", dt: "64,85 – 73,47 m²" },
  { loai: "3 phòng ngủ", dt: "81,21 – 125,28 m²" },
  { loai: "Penthouse", dt: "266,59 – 437,2 m²" },
  { loai: "Thương mại dịch vụ tầng 1 (29 căn)", dt: "48,4 – 164,2 m²" },
];

export const TC = [
  { b: "Trần căn hộ", span: "3,3 m sàn đến trần bê tông · 2,65 – 2,70 m đến trần thạch cao" },
  { b: "Kính Low-E 2 lớp", span: "Cửa ra ban công giảm nhiệt, chống tia UV, giảm tiếng ồn" },
  { b: "Bàn giao", span: "Điều hòa âm trần phòng khách, phòng ngủ để đầu chờ · cửa chính chống cháy" },
  { b: "Thang máy Mitsubishi", span: "28 thang: mỗi tòa 12 thang cư dân và 2 thang PCCC" },
  { b: "Căn sân vườn", span: "50 căn sân vườn tại tầng 3 và tầng 4" },
  { b: "Tầng cao 6,6 m", span: "Tầng 12, 19, 27, 29, 30 — có thể thiết kế như căn thông tầng" },
  { b: "Cáp quang từng căn", span: "Ổ mạng tới vị trí tivi phòng khách và phòng ngủ" },
  { b: "Mọi căn có ban công", span: "Thiết kế vuông vức, lấy sáng tự nhiên và khí trời" },
];

/* ===== Chính sách bán hàng ===== */
export const PAYMENTS = [
  {
    key: "chuan", label: "Cơ bản",
    title: "1. Phương thức thanh toán cơ bản",
    desc: "Chia 21 đợt theo tiến độ, không vay ngân hàng — dòng tiền nhẹ, đều đặn đến khi nhận nhà.",
    ck: "",
    img: `${IMG}/nam-mekong-grand-plaza-lich-thanh-toan-co-ban.webp`, w: 1649, h: 954,
    alt: "Lịch thanh toán cơ bản Nam Mekong Grand Plaza: từ chuyển cọc 08/10/2026 đến bàn giao 04/2028 và nhận sổ hồng",
    foot: "Áp dụng cho khách thanh toán theo tiến độ chuẩn, không vay vốn ngân hàng. Mốc thời gian dự kiến theo bảng của chủ đầu tư; ngày chính thức theo thông báo mở bán.",
  },
  {
    key: "65", label: "0 đồng / 24 tháng · vay 65%",
    title: "2. Thanh toán 0 đồng trong 24 tháng — ngân hàng giải ngân 65%",
    desc: "Khách chuẩn bị 30% vốn tự có; chủ đầu tư hỗ trợ lãi suất 24 tháng kể từ ngày giải ngân đầu tiên.",
    ck: "0 đồng · 24 tháng",
    img: `${IMG}/nam-mekong-grand-plaza-lich-thanh-toan-0-dong-vay-65.webp`, w: 1536, h: 1024,
    alt: "Lịch thanh toán 0 đồng trong 24 tháng Nam Mekong Grand Plaza, ngân hàng giải ngân 65% giá trị căn hộ",
    foot: "Hỗ trợ lãi suất trong 24 tháng nhưng không quá ngày 30/11/2028; sau đó theo quy định của ngân hàng.",
  },
  {
    key: "50", label: "0 đồng / 24 tháng · vay 50%",
    title: "3. Thanh toán 0 đồng trong 24 tháng — ngân hàng giải ngân 50%",
    desc: "Khách chuẩn bị 20% vốn tự có ban đầu; 25% còn lại thanh toán khi nhận nhà.",
    ck: "0 đồng · 24 tháng",
    img: `${IMG}/nam-mekong-grand-plaza-lich-thanh-toan-0-dong-vay-50.webp`, w: 1586, h: 992,
    alt: "Lịch thanh toán 0 đồng trong 24 tháng Nam Mekong Grand Plaza, ngân hàng giải ngân 50% giá trị căn hộ",
    foot: "Hỗ trợ lãi suất trong 24 tháng nhưng không quá ngày 30/11/2028; sau đó theo quy định của ngân hàng.",
  },
  {
    key: "70", label: "Thanh toán nhanh 70%",
    title: "4. Phương thức thanh toán nhanh 70%",
    desc: "Thanh toán 70% đến lúc ký hợp đồng mua bán, nhận chiết khấu 4% giá trị căn hộ.",
    ck: "Chiết khấu 4%",
    img: `${IMG}/nam-mekong-grand-plaza-lich-thanh-toan-70.webp`, w: 1536, h: 1024,
    alt: "Lịch thanh toán 70% Nam Mekong Grand Plaza: 5% ký cọc, 65% ký HĐMB, chiết khấu 4% giá trị căn hộ",
    foot: "Chiết khấu tính trên giá trị căn hộ chưa gồm thuế GTGT và kinh phí bảo trì.",
  },
  {
    key: "95", label: "Thanh toán nhanh 95%",
    title: "5. Phương thức thanh toán nhanh 95%",
    desc: "Thanh toán 95% đến lúc ký hợp đồng mua bán, nhận chiết khấu cao nhất 8%.",
    ck: "Chiết khấu 8%",
    img: `${IMG}/nam-mekong-grand-plaza-lich-thanh-toan-95.webp`, w: 1536, h: 1024,
    alt: "Lịch thanh toán 95% Nam Mekong Grand Plaza: 5% ký cọc, 90% ký HĐMB, chiết khấu 8% giá trị căn hộ",
    foot: "Chiết khấu tính trên giá trị căn hộ chưa gồm thuế GTGT và kinh phí bảo trì.",
  },
];

export const VAY = [
  { b: "80%", span: "Ngân hàng cho vay tối đa giá trị căn hộ" },
  { b: "35 năm", span: "Thời gian vay tối đa" },
  { b: "24 tháng", span: "Chủ đầu tư hỗ trợ lãi suất (tối đa 70% giá trị căn)" },
  { b: "7", span: "Ngân hàng: Vietcombank, MBBank, BIDV, VPBank, VietinBank, ACB, HDBank" },
];

export const UUDAI = [
  {
    src: `${IMG}/nam-mekong-grand-plaza-uu-dai-booking-som-1-5-800.webp`, w: 800, h: 451,
    zoom: `${IMG}/nam-mekong-grand-plaza-uu-dai-booking-som-1-5.webp`,
    alt: "Ưu đãi booking sớm Nam Mekong Grand Plaza: tặng ngay chiết khấu 1,5% trên giá bán",
    title: "1. Chính sách booking sớm",
    p: "Tặng ngay chiết khấu 1,5% giá trị căn hộ cho khách hàng đặt mua căn hộ đến ngày 30/11/2026. Giá trị quà tặng khấu trừ trực tiếp vào giá trị căn hộ.",
  },
  {
    src: `${IMG}/nam-mekong-grand-plaza-boc-tham-5-o-to-lynk-co-800.webp`, w: 800, h: 451,
    zoom: `${IMG}/nam-mekong-grand-plaza-boc-tham-5-o-to-lynk-co.webp`,
    alt: "Bốc thăm may mắn Nam Mekong Grand Plaza: 5 ô tô Lynk & Co cho 500 căn ký hợp đồng mua bán đầu tiên",
    title: "2. Bốc thăm may mắn",
    p: "Khi bán đạt 500 căn hộ đến ngày 30/11/2026 — tổng giá trị giải thưởng 4,236 tỷ đồng:",
    list: [
      "01 giải Nhất · Lynk & Co 03+ — 1,899 tỷ",
      "01 giải Nhì · Lynk & Co 01 Hyper — 919 triệu",
      "01 giải Ba · Lynk & Co 06 Hyper Pro — 739 triệu",
      "02 giải Tư · Lynk & Co 06 Core Plus — 679 triệu/xe",
    ],
  },
];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Nam Mekong Grand Plaza nằm ở đâu?",
    a: "Nam Mekong Grand Plaza nằm tại Lô đất A4, Khu đô thị mới (Khu 1), ngay vòng xoay WTC của Thành phố mới Bình Dương, nay thuộc phường Bình Dương, TP. Hồ Chí Minh. Dự án được bao quanh bởi 4 mặt đường Duy Tân, Lê Hoàn, Nguyễn Thị Định và Chu Văn An, cách tòa nhà Trung tâm hành chính khoảng 500 m – 1 km.",
  },
  {
    q: "Chủ đầu tư Nam Mekong Grand Plaza là ai?",
    a: "Chủ đầu tư là Công ty Cổ phần Tập đoàn Nam Mê Kông (Mekong Group), thành lập ngày 05/05/1993, niêm yết trên Sở Giao dịch Chứng khoán Hà Nội với mã VC3, hoạt động trong lĩnh vực bất động sản, năng lượng tái tạo, cảng biển – logistics. Dự án do CDC và DK LAUD tư vấn thiết kế, CIDECO tư vấn giám sát, CBRE quản lý vận hành.",
  },
  {
    q: "Nam Mekong Grand Plaza có quy mô bao nhiêu căn?",
    a: "Dự án rộng 13.095 m², gồm 2 tòa tháp G1 (Tháp A) và G2 (Tháp B) cao 30 tầng nổi, 3 tầng hầm, tổng cộng 1.622 căn: tháp G1 có 905 căn, tháp G2 có 717 căn. Tầng 1 có 29 căn thương mại dịch vụ, dân số dự kiến khoảng 3.926 người.",
  },
  {
    q: "Căn hộ Nam Mekong Grand Plaza có những diện tích nào?",
    a: "Theo tài liệu chủ đầu tư: Studio 35,85 – 45,13 m², 1 phòng ngủ 39,32 – 40,29 m², 1 phòng ngủ + 65,64 – 65,79 m², 2 phòng ngủ 64,85 – 73,47 m², 3 phòng ngủ 81,21 – 125,28 m² và Penthouse 266,59 – 437,2 m². Nhà mẫu gồm căn 2 phòng ngủ 65 m² và căn 3 phòng ngủ 85 m².",
  },
  {
    q: "Pháp lý và tiến độ Nam Mekong Grand Plaza thế nào?",
    a: "Dự án đã hoàn thiện thủ tục chuyển nhượng một phần dự án từ Becamex IDC, được cấp Giấy phép xây dựng số 16943/SXD-QLXDCT ngày 21/11/2025 và khởi công ngày 22/04/2026, bàn giao dự kiến năm 2028. Căn hộ sở hữu lâu dài; người nước ngoài được sở hữu 50 năm. Ngân hàng Vietinbank bảo lãnh dự án.",
  },
  {
    q: "Nam Mekong Grand Plaza có những phương thức thanh toán nào?",
    a: "Có 5 phương thức: thanh toán cơ bản chia 21 đợt theo tiến độ; thanh toán 0 đồng trong 24 tháng với ngân hàng giải ngân 65% hoặc 50%; thanh toán nhanh 70% chiết khấu 4%; thanh toán nhanh 95% chiết khấu 8%. Ngân hàng cho vay tối đa 80% giá trị căn hộ, thời hạn tới 35 năm.",
  },
  {
    q: "Nam Mekong Grand Plaza có những tiện ích nội khu gì?",
    a: "Dự án có hơn 50 tiện ích trải trên tầng 1, 2, 20, 29 và 30: hồ bơi tầng 2 (bể người lớn khoảng 240 m², bể trẻ em khoảng 50 m²), gym, yoga, pilates, boxing, xông hơi đá Himalaya, sauna, spa, phòng golf mô phỏng, thư viện, phòng chiếu phim, nhà trẻ 984 m², khu sinh hoạt cộng đồng 1.305 m², vườn nướng BBQ tầng 29 và vườn trên cao tầng 30.",
  },
  {
    q: "Từ Nam Mekong Grand Plaza đi TP.HCM và sân bay bao xa?",
    a: "Theo tài liệu chủ đầu tư, dự án cách trung tâm TP.HCM khoảng 30 – 35 km qua Quốc lộ 13 hoặc đường Mỹ Phước – Tân Vạn, cách sân bay Tân Sơn Nhất khoảng 28 – 32 km, cách KCN VSIP 2 khoảng 3 km. Từ dự án mất khoảng 3 – 5 phút đến Trung tâm WTC và ga metro.",
  },
];
