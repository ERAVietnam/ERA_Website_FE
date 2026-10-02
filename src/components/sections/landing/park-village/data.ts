import { IMG } from "./theme";

/* ===== Tổng quan — bảng thông số ===== */
export const SPEC_ROWS: { label: string; value: string; bold?: boolean }[] = [
  { label: "Tên phân khu", value: "Park Village", bold: true },
  { label: "Khu đô thị", value: "Waterpoint 355 ha" },
  { label: "Chủ đầu tư", value: "Nam Long Group hợp tác Nishi Nippon Railroad (Nhật Bản)" },
  { label: "Vị trí", value: "Mặt tiền ĐT.830, xã Bến Lức, tỉnh Tây Ninh" },
  { label: "Loại hình", value: "Biệt thự đơn lập Grand Villa trong compound khép kín" },
  { label: "Dòng sản phẩm", value: "Garden Grand Villa, Park Grand Villa, Canal Grand Villa" },
  { label: "Diện tích đất", value: "Từ 300 m² trở lên mỗi căn" },
  { label: "Thiết kế", value: "Kiến trúc TwoG Architecture · cảnh quan Lascal · hạ tầng Royal HaskoningDHV, Aurecon" },
];

export const OVERVIEW_STATS = [
  { b: "6,6 ha", span: "Diện tích" },
  { b: "96 căn", span: "Tuyệt tác Grand Villa" },
  { b: "5,05 ha", span: "Diện tích mảng xanh & kênh đào" },
  { b: "6,23 ha", span: "Diện tích mặt nước" },
];

/* ===== Vị trí ===== */
export interface RouteItem { t: string; label: string; alt?: boolean }
export interface LocationTab {
  key: string;
  label: string;
  fig: string;
  figAlt: string;
  title: string;
  desc: string;
  routes: RouteItem[];
  groups: { sub: string; items: RouteItem[] }[];
}

export const LOCATION_TABS: LocationTab[] = [
  {
    key: "bo",
    label: "Kết nối đường bộ",
    fig: `${IMG}/waterpoint-ket-noi-duong-bo.webp`,
    figAlt: "Sơ đồ kết nối đường bộ từ Waterpoint: 35 phút đến Tiền Giang, 40 phút đến Phú Mỹ Hưng, 55 phút đến trung tâm TP.HCM",
    title: "Kết nối đường bộ",
    desc: "Mặt tiền ĐT.830, tiếp cận cao tốc TP.HCM – Trung Lương và Quốc lộ 1, hai trục chính nối TP.HCM với miền Tây.",
    routes: [
      { t: "~40′", label: "đến Phú Mỹ Hưng" },
      { t: "~55′", label: "đến trung tâm TP.HCM" },
      { t: "~35′", label: "về Tiền Giang, hướng ĐB sông Cửu Long" },
    ],
    groups: [
      { sub: "Xe buýt Waterpoint (giai đoạn 1)", items: [{ t: "BUS", label: "~40′ Phú Mỹ Hưng · ~50′ Bến xe Miền Tây", alt: true }] },
      { sub: "Dự kiến", items: [{ t: "METRO", label: "~10′ đến Ga 3A · ~35′ đến Bến Bạch Đằng", alt: true }] },
    ],
  },
  {
    key: "thuy",
    label: "Kết nối đường thuỷ",
    fig: `${IMG}/waterpoint-ket-noi-duong-thuy.webp`,
    figAlt: "Sơ đồ kết nối đường thuỷ từ Waterpoint: 15 phút đến Tiền Giang, 40 phút đến cảng Hiệp Phước, 60 phút đến Bến Bạch Đằng",
    title: "Kết nối đường thuỷ",
    desc: "Waterpoint nằm ở khu vực ngã ba sông Vàm Cỏ Đông, phần mặt nước được đưa vào quy hoạch cảnh quan của khu đô thị.",
    routes: [
      { t: "~15′", label: "đến Tiền Giang" },
      { t: "~40′", label: "đến cảng Hiệp Phước" },
      { t: "~60′", label: "đến Bến Bạch Đằng, trung tâm TP.HCM" },
    ],
    groups: [],
  },
];

export const QUANH = [
  { name: "Central Park – công viên trung tâm 25 ha", pv: true },
  { name: "Trường mầm non, tiểu học, THCS & THPT" },
  { name: "Trường quốc tế, trường đại học" },
  { name: "Tổ hợp CLB thể thao & sự kiện" },
  { name: "CLB ven sông, CLB cộng đồng" },
  { name: "Harbour – vịnh cảng nước ngọt" },
  { name: "Trung tâm thương mại, trung tâm mua sắm giải trí" },
  { name: "Trạm xe buýt & thương mại" },
  { name: "Bệnh viện" },
  { name: "Nhà triển lãm văn hoá" },
];

/* ===== Tiện ích nội khu — accordion + 2 nhóm ===== */
export interface AccItem { src: string; alt: string; ten: string; mo: string }
export const ACC_ITEMS: AccItem[] = [
  {
    src: `${IMG}/park-village-clubhouse-nam-au-vuon-hinh-hoc.webp`,
    alt: "Clubhouse phong cách Nam Âu của Park Village với hồ bơi, vườn hình học và đài phun nước phía trước",
    ten: "Clubhouse & đài phun nước trung tâm",
    mo: "Clubhouse phong cách Nam Âu nhìn ra vườn hình học và đài phun nước.",
  },
  {
    src: `${IMG}/park-village-ho-boi-clubhouse-noi-khu.webp`,
    alt: "Hồ bơi người lớn cạnh clubhouse nội khu Park Village với ghế tắm nắng, dù che và hàng cọ",
    ten: "Hồ bơi người lớn & trẻ em",
    mo: "Hồ bơi, jacuzzi và ghế tắm nắng dưới hàng cọ.",
  },
  {
    src: `${IMG}/park-village-vuon-au-dai-phun-nuoc.webp`,
    alt: "Vườn cảnh quan châu Âu trong Park Village với đài phun nước, hàng cây cắt tỉa và clubhouse phía sau",
    ten: "Vườn cảnh quan châu Âu",
    mo: "Lối dạo bộ, gazebo và hàng cây cắt tỉa đối xứng.",
  },
  {
    src: `${IMG}/park-village-san-bong-ro-clubhouse.webp`,
    alt: "Sân bóng rổ nội khu Park Village trước clubhouse phong cách Nam Âu",
    ten: "Sân bóng rổ",
    mo: "Sân bóng rổ ngay trước clubhouse.",
  },
  {
    src: `${IMG}/park-village-khu-the-thao-ngoai-troi.webp`,
    alt: "Khu thể thao ngoài trời Park Village nhìn từ trên cao với các sân thể thao giữa hàng cây xanh",
    ten: "Khu thể thao ngoài trời",
    mo: "Các sân thể thao giữa hàng cây xanh.",
  },
];

export const TI_NGOAI = [
  "Sân bóng rổ",
  "Khu thể thao ngoài trời",
  "Khu vực BBQ",
  "Hồ bơi người lớn",
  "Hồ bơi trẻ em",
  "Jacuzzi (bồn sục)",
  "Khu vui chơi trẻ em",
  "Vườn cảnh quan Châu Âu",
  "Lối dạo bộ",
  "Gazebo (chòi nghỉ)",
  "Đài phun nước trung tâm",
];

export const TI_TRONG = ["Siêu thị mini", "Phòng chơi trẻ em", "Cafe & lounge", "Cafe ngoài trời", "Phòng Gym", "Phòng Sauna"];

/* ===== Tiện ích ngoại khu ===== */
export interface NkCard { src: string; w: number; h: number; alt: string; b: string; span: string }
export const NK_CARDS: NkCard[] = [
  {
    src: `${IMG}/waterpoint-ben-thuyen-ven-song.webp`, w: 1200, h: 990,
    alt: "Bến thuyền ven sông Vàm Cỏ Đông trong khu đô thị Waterpoint, cạnh dãy biệt thự đã hoàn thiện",
    b: "River Club và bến du thuyền", span: "Bên sông Vàm Cỏ Đông",
  },
  {
    src: `${IMG}/waterpoint-cong-vien-bo-song.webp`, w: 1000, h: 669,
    alt: "Công viên bờ sông trong khu đô thị Waterpoint với bãi cỏ rộng, hàng cây và lối dạo",
    b: "Công viên bờ sông", span: "Bãi cỏ rộng cho cả nhà dạo chơi, thả diều",
  },
  {
    src: `${IMG}/waterpoint-cong-vien-bo-kenh-loi-dao.webp`, w: 1000, h: 667,
    alt: "Lối dạo lát gạch dọc công viên bờ kênh trong khu đô thị Waterpoint",
    b: "Công viên bờ kênh", span: "Lối dạo buổi sáng dọc mặt nước",
  },
  {
    src: `${IMG}/waterpoint-truong-quoc-te-emasi-plus.webp`, w: 1000, h: 750,
    alt: "Trường quốc tế song ngữ EMASI Plus trong khu đô thị Waterpoint với tháp đồng hồ và khối nhà gạch đỏ",
    b: "Trường quốc tế song ngữ EMASI Plus", span: "Ngay trong khu đô thị Waterpoint",
  },
];

/* ===== Mặt bằng — chú thích ===== */
export const LEGEND = [
  { color: "#ADADAD", b: "Garden Grand Villa", span: "Bao quanh bởi vườn cây" },
  { color: "#E5D4C2", b: "Park Grand Villa", span: "Hướng công viên trung tâm Central Park" },
  { color: "#B69573", b: "Canal Grand Villa", span: "Hướng kênh đào" },
];

/* ===== Nhà mẫu ===== */
export interface Model {
  key: string;
  tab: string;
  img: string;
  w: number;
  h: number;
  imgAlt: string;
  tangImg: string;
  tangW: number;
  tangH: number;
  tangAlt: string;
  code: string;
  codeSub: string;
  name: string;
  ds: string;
  specs: { k: string; v: string }[];
  btn: string;
}

export const MODELS: Model[] = [
  {
    key: "garden", tab: "Garden Grand Villa",
    img: `${IMG}/park-village-garden-grand-villa-vb1-1.webp`, w: 887, h: 407,
    imgAlt: "Mẫu Garden Grand Villa VB1.1 Park Village: đất ~300 m², sàn ~268 m², 4 phòng ngủ, 2 tầng tân cổ điển",
    tangImg: `${IMG}/park-village-garden-grand-villa-vb1-1-mat-bang-tang.webp`, tangW: 850, tangH: 530,
    tangAlt: "Mặt bằng tầng 1 và tầng 2 mẫu Garden Grand Villa VB1.1 Park Village, mặt tiền 10,4 m",
    code: "VB1.1", codeSub: "MẶT TIỀN 10,4 M · 2 TẦNG",
    name: "Garden Grand Villa",
    ds: "Biệt thự bao quanh bởi vườn cây.",
    specs: [
      { k: "Diện tích đất", v: "~300 m²" },
      { k: "Diện tích sàn sử dụng", v: "~268 m²" },
      { k: "Phòng ngủ", v: "4" },
      { k: "WC", v: "4" },
    ],
    btn: "NHẬN THÔNG TIN MẪU VB1.1",
  },
  {
    key: "park", tab: "Park Grand Villa",
    img: `${IMG}/park-village-park-grand-villa-vb2-1.webp`, w: 889, h: 407,
    imgAlt: "Mẫu Park Grand Villa VB2.1 Park Village: đất ~300 m², sàn ~296 m², 4 phòng ngủ, 5 WC",
    tangImg: `${IMG}/park-village-park-grand-villa-vb2-1-mat-bang-tang.webp`, tangW: 793, tangH: 504,
    tangAlt: "Mặt bằng tầng 1 và tầng 2 mẫu Park Grand Villa VB2.1 Park Village, mặt tiền 13,85 m",
    code: "VB2.1", codeSub: "MẶT TIỀN 13,85 M · 2 TẦNG",
    name: "Park Grand Villa",
    ds: "Biệt thự hướng công viên trung tâm Central Park.",
    specs: [
      { k: "Diện tích đất", v: "~300 m²" },
      { k: "Diện tích sàn sử dụng", v: "~296 m²" },
      { k: "Phòng ngủ", v: "4" },
      { k: "WC", v: "5" },
    ],
    btn: "NHẬN THÔNG TIN MẪU VB2.1",
  },
  {
    key: "canal", tab: "Canal Grand Villa",
    img: `${IMG}/park-village-canal-grand-villa-vb3-1.webp`, w: 819, h: 375,
    imgAlt: "Mẫu Canal Grand Villa VB3.1 Park Village: đất ~468 m², sàn ~458 m², 4 phòng ngủ, 6 WC, hồ bơi riêng",
    tangImg: `${IMG}/park-village-canal-grand-villa-vb3-1-mat-bang-tang.webp`, tangW: 870, tangH: 476,
    tangAlt: "Mặt bằng tầng 1 và tầng 2 mẫu Canal Grand Villa VB3.1 Park Village có hồ bơi riêng, mặt tiền 16 m",
    code: "VB3.1", codeSub: "MẶT TIỀN 16 M · 2 TẦNG · HỒ BƠI RIÊNG",
    name: "Canal Grand Villa",
    ds: "Biệt thự hướng kênh đào.",
    specs: [
      { k: "Diện tích đất", v: "~468 m²" },
      { k: "Diện tích sàn sử dụng", v: "~458 m²" },
      { k: "Phòng ngủ", v: "4" },
      { k: "WC", v: "6" },
    ],
    btn: "NHẬN THÔNG TIN MẪU VB3.1",
  },
];

export const CMP_ROWS = [
  { mau: "Garden Grand Villa VB1.1", dat: "~300 m²", san: "~268 m²", pn: "4", wc: "4", rieng: "Bao quanh bởi vườn cây" },
  { mau: "Park Grand Villa VB2.1", dat: "~300 m²", san: "~296 m²", pn: "4", wc: "5", rieng: "Hướng Central Park" },
  { mau: "Canal Grand Villa VB3.1", dat: "~468 m²", san: "~458 m²", pn: "4", wc: "6", rieng: "Hướng kênh đào, hồ bơi riêng" },
];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Park Village nằm ở đâu?",
    a: "Park Village nằm ở trung tâm khu đô thị Waterpoint, mặt tiền đường ĐT.830, xã Bến Lức, tỉnh Tây Ninh. Trước ngày 1/7/2025, khu vực này thuộc xã An Thạnh, huyện Bến Lức, tỉnh Long An. Phân khu có ba mặt giáp kênh đào, mặt còn lại hướng ra công viên trung tâm 25 ha.",
  },
  {
    q: "Chủ đầu tư Park Village là ai?",
    a: "Park Village do Nam Long Group phát triển cùng đối tác Nhật Bản Nishi Nippon Railroad. Kiến trúc do TwoG Architecture thiết kế, cảnh quan do Lascal thực hiện, hạ tầng do Royal HaskoningDHV và Aurecon tư vấn.",
  },
  {
    q: "Park Village có bao nhiêu căn và những loại hình nào?",
    a: "Park Village có 96 căn biệt thự đơn lập dòng Grand Villa trên diện tích 6,6 ha, chia thành ba dòng: Garden Grand Villa, Park Grand Villa và Canal Grand Villa. Diện tích đất mỗi căn từ 300 m² trở lên.",
  },
  {
    q: "Các mẫu nhà Park Village rộng bao nhiêu?",
    a: "Mẫu Garden Grand Villa VB1.1 có đất khoảng 300 m², sàn khoảng 268 m², 4 phòng ngủ, 4 WC. Mẫu Park Grand Villa VB2.1 có đất khoảng 300 m², sàn khoảng 296 m², 4 phòng ngủ, 5 WC. Mẫu Canal Grand Villa VB3.1 có đất khoảng 468 m², sàn khoảng 458 m², 4 phòng ngủ, 6 WC và hồ bơi riêng.",
  },
  {
    q: "Giá Park Village bao nhiêu?",
    a: "Chủ đầu tư chưa công bố bảng giá và chính sách bán hàng Park Village trên kênh chính thức. Giá từng căn phụ thuộc dòng sản phẩm, diện tích và vị trí lô. Liên hệ hotline 094.1125.000 để nhận bảng giá chính thức khi công bố.",
  },
  {
    q: "Park Village có những tiện ích nội khu gì?",
    a: "Tiện ích nội khu Park Village gồm clubhouse phong cách Nam Âu với siêu thị mini, phòng chơi trẻ em, cafe và lounge, cafe ngoài trời, phòng gym, phòng sauna; ngoài trời có hồ bơi người lớn, hồ bơi trẻ em, jacuzzi, sân bóng rổ, khu thể thao ngoài trời, khu BBQ, khu vui chơi trẻ em, vườn cảnh quan châu Âu, lối dạo bộ, gazebo và đài phun nước trung tâm.",
  },
  {
    q: "Từ Park Village đi TP.HCM mất bao lâu?",
    a: "Theo tài liệu của chủ đầu tư, từ Waterpoint đi đường bộ khoảng 40 phút đến Phú Mỹ Hưng, khoảng 55 phút đến trung tâm TP.HCM và khoảng 35 phút đến Tiền Giang, qua cao tốc TP.HCM – Trung Lương và Quốc lộ 1.",
  },
  {
    q: "Quanh Park Village có tiện ích ngoại khu nào?",
    a: "Cư dân Park Village dùng chung tiện ích của khu đô thị Waterpoint 355 ha, gồm River Club và bến du thuyền, công viên bờ sông, công viên bờ kênh, trường mầm non nội khu và Trường quốc tế song ngữ EMASI Plus.",
  },
];
