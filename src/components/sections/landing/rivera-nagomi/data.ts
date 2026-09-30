import { IMG } from "./theme";

/* ===== Tổng quan — bảng thông số ===== */
export const SPEC_ROWS: { label: string; value: string; bold?: boolean }[] = [
  { label: "Tên phân khu", value: "Rivera Nagomi", bold: true },
  { label: "Khu đô thị", value: "Waterpoint" },
  { label: "Chủ đầu tư", value: "Công ty Cổ phần Đầu tư Nam Long hợp tác cùng Nishi-Nippon Railroad (Nhật Bản)" },
  { label: "Vị trí", value: "Mặt tiền ĐT.830, xã Bến Lức, tỉnh Tây Ninh" },
  { label: "Tổng diện tích", value: "5,8 ha" },
  { label: "Diện tích mặt nước", value: "khoảng 3 ha" },
  { label: "Số lượng sản phẩm", value: "158 căn" },
  { label: "Loại hình", value: "Shophouse, nhà phố vườn, biệt thự song lập, biệt thự đơn lập" },
  { label: "Tình trạng", value: "Giới thiệu ra thị trường từ tháng 9/2026" },
];

/* ===== Vị trí — 2 tab kết nối ===== */
export interface RouteItem { t: string; label: string }
export interface RouteGroup { sub: string; alt?: boolean; items: RouteItem[] }
export interface LocationTab {
  key: string;
  label: string;
  fig: string;
  figAlt: string;
  title: string;
  desc: string;
  routes: RouteItem[];
  groups: RouteGroup[];
}

export const LOCATION_TABS: LocationTab[] = [
  {
    key: "bo",
    label: "Kết nối đường bộ",
    fig: `${IMG}/waterpoint-ket-noi-duong-bo.webp`,
    figAlt:
      "Sơ đồ kết nối đường bộ từ Waterpoint: 35 phút đến Tiền Giang, 40 phút đến Phú Mỹ Hưng, 55 phút đến trung tâm TP.HCM",
    title: "Kết nối đường bộ",
    desc: "Mặt tiền ĐT.830, tiếp cận cao tốc TP.HCM – Trung Lương và Quốc lộ 1, hai trục chính nối TP.HCM với miền Tây.",
    routes: [
      { t: "~40′", label: "đến Phú Mỹ Hưng" },
      { t: "~55′", label: "đến trung tâm TP.HCM" },
      { t: "~35′", label: "về Tiền Giang, hướng ĐB sông Cửu Long" },
    ],
    groups: [
      { sub: "Xe buýt Waterpoint (giai đoạn 1)", items: [{ t: "BUS", label: "~40′ Phú Mỹ Hưng · ~50′ Bến xe Miền Tây" }] },
      { sub: "Dự kiến", items: [{ t: "METRO", label: "~10′ đến Ga 3A · ~35′ đến Bến Bạch Đằng" }] },
    ],
  },
  {
    key: "thuy",
    label: "Kết nối đường thuỷ",
    fig: `${IMG}/waterpoint-ket-noi-duong-thuy.webp`,
    figAlt:
      "Sơ đồ kết nối đường thuỷ từ Waterpoint: 15 phút đến Tiền Giang, 40 phút đến cảng Hiệp Phước, 60 phút đến Bến Bạch Đằng",
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

export const KCN = [
  { name: "KCN Thuận Đạo", place: "Bến Lức" },
  { name: "KCN Vĩnh Lộc 2", place: "Bến Lức" },
  { name: "KCN Phúc Long", place: "Bến Lức" },
];

/* ===== Tiện ích nội khu — accordion ===== */
export interface AccItem { src: string; alt: string; ten: string; mo: string }
export const ACC_ITEMS: AccItem[] = [
  {
    src: `${IMG}/rivera-nagomi-ho-boi-noi-khu.webp`,
    alt: "Hồ bơi nội khu Rivera Nagomi với ghế tắm nắng, trẻ em bơi lội trước dãy biệt thự",
    ten: "Hồ bơi & khu vui chơi trẻ em",
    mo: "Hồ bơi ngoài trời giữa các dãy nhà, khu vui chơi riêng cho trẻ nhỏ.",
  },
  {
    src: `${IMG}/rivera-nagomi-cong-vien-kenh-dao.webp`,
    alt: "Công viên kênh đào nội khu Rivera Nagomi với cầu gỗ, chòi nghỉ và lối dạo ven kênh",
    ten: "Công viên kênh đào",
    mo: "Lối dạo, cầu nhỏ và chòi nghỉ chạy dọc kênh trong khu.",
  },
  {
    src: `${IMG}/rivera-nagomi-duong-noi-khu-hem-xanh.webp`,
    alt: "Đường nội khu và hẻm xanh cảnh quan Rivera Nagomi nhìn từ ban công ngập cây xanh",
    ten: "Hẻm xanh cảnh quan",
    mo: "Dải cây xanh len giữa các dãy nhà, nhìn từ ban công là thấy vườn.",
  },
];

export const TI_LIST = [
  { h: "Hồ bơi và khu vui chơi trẻ em", p: "Chỗ bơi mỗi ngày cho cả nhà, sân chơi riêng cho các bé." },
  { h: "Clubhouse, phòng gym, khu BBQ", p: "Không gian sinh hoạt chung, tập luyện và tiệc nướng cuối tuần." },
  { h: "Công viên kênh đào, khu thể thao ngoài trời", p: "Đi bộ, chạy bộ, chơi thể thao bên mặt nước." },
  { h: "Hẻm xanh cảnh quan giữa các dãy nhà", p: "Mảng xanh xen giữa khu ở theo tinh thần “Nagomi”." },
];

/* ===== Tiện ích ngoại khu ===== */
export interface NkCard { src: string; alt: string; b: string; span: string }
export const NK_CARDS: NkCard[] = [
  {
    src: `${IMG}/waterpoint-cong-vien-bo-song.webp`,
    alt: "Công viên bờ sông trong khu đô thị Waterpoint gần Rivera Nagomi, bãi cỏ rộng, hàng cây và lối dạo",
    b: "Công viên bờ sông, công viên bờ kênh",
    span: "Bãi cỏ rộng cho cả nhà dạo chơi, thả diều",
  },
  {
    src: `${IMG}/waterpoint-truong-quoc-te-emasi-plus.webp`,
    alt: "Trường quốc tế song ngữ EMASI Plus trong khu đô thị Waterpoint với tháp đồng hồ và khối nhà gạch đỏ",
    b: "Trường quốc tế song ngữ EMASI Plus",
    span: "Ngay trong khu đô thị Waterpoint",
  },
];

export const NK_LIST = [
  { b: "River Club và bến du thuyền", span: "Bên sông Vàm Cỏ Đông" },
  { b: "Công viên bờ sông, công viên bờ kênh", span: "Không gian xanh ven nước" },
  { b: "Trường mầm non nội khu", span: "Gần nhà cho các bé" },
  { b: "Trường quốc tế song ngữ EMASI Plus", span: "Hệ song ngữ trong khu" },
];

/* ===== Mặt bằng — chú thích ===== */
export const LEGEND_TIEN_ICH = [
  "River Club",
  "Bến du thuyền",
  "Công viên bờ sông",
  "Công viên bờ kênh",
  "Clubhouse",
  "Trường mầm non",
  "Hẻm xanh cảnh quan",
  "Trường quốc tế song ngữ EMASI Plus",
];

export const LEGEND_LOAI_HINH: { color: string; label: string }[] = [
  { color: "#F08F84", label: "Shophouse" },
  { color: "#737A3A", label: "Nhà phố vườn (Terrace house)" },
  { color: "#F7C66C", label: "Biệt thự song lập" },
  { color: "linear-gradient(90deg,#9FCBEF 33%,#3F7FB6 33% 66%,#B4D98A 66%)", label: "Biệt thự đơn lập" },
];

/* ===== Nhà mẫu ===== */
export interface Model {
  key: string;
  tab: string;
  img: string;
  alt: string;
  code: string;
  codeSub: string;
  name: string;
  specs: { k: string; v: string }[];
  btn: string;
  popupTitle: string;
  popupNote: string;
}

export const MODELS: Model[] = [
  {
    key: "np",
    tab: "Nhà phố vườn",
    img: `${IMG}/rivera-nagomi-nha-pho-vuon-np1.webp`,
    alt: "Mẫu nhà phố vườn NP1 Rivera Nagomi 6x15 m, đất 90 m², sàn 146,41 m², 4 phòng ngủ: phối cảnh và mặt bằng 3 tầng",
    code: "NP1",
    codeSub: "6 × 15 M",
    name: "Nhà phố vườn",
    specs: [
      { k: "Diện tích đất", v: "90 m²" },
      { k: "Diện tích sàn sử dụng", v: "146,41 m²" },
      { k: "Phòng ngủ", v: "4" },
      { k: "WC", v: "4" },
    ],
    btn: "NHẬN GIÁ MẪU NP1",
    popupTitle: "Nhận giá mẫu NP1",
    popupNote: "Giá, vị trí lô và mặt bằng mẫu nhà phố vườn NP1 — gửi qua Zalo trong ngày.",
  },
  {
    key: "sh",
    tab: "Shophouse",
    img: `${IMG}/rivera-nagomi-shophouse-tm6a.webp`,
    alt: "Mẫu shophouse TM6a căn góc Rivera Nagomi 8x17 m, đất 136 m², sàn 318,74 m², 3 phòng ngủ: phối cảnh và mặt bằng",
    code: "TM6a",
    codeSub: "8 × 17 M · CĂN GÓC",
    name: "Shophouse (nhà phố thương mại)",
    specs: [
      { k: "Diện tích đất", v: "136 m²" },
      { k: "Diện tích sàn sử dụng", v: "318,74 m²" },
      { k: "Phòng ngủ", v: "3" },
      { k: "WC", v: "5" },
    ],
    btn: "NHẬN GIÁ MẪU TM6a",
    popupTitle: "Nhận giá mẫu TM6a",
    popupNote: "Giá, vị trí lô và mặt bằng mẫu shophouse TM6a — gửi qua Zalo trong ngày.",
  },
  {
    key: "sl",
    tab: "Biệt thự song lập",
    img: `${IMG}/rivera-nagomi-biet-thu-song-lap-sl4.webp`,
    alt: "Mẫu biệt thự song lập SL4 căn góc Rivera Nagomi 14x15 m, đất 202 m², sàn 246,84 m², 4 phòng ngủ: phối cảnh và mặt bằng",
    code: "SL4",
    codeSub: "14 × 15 M · CĂN GÓC",
    name: "Biệt thự song lập",
    specs: [
      { k: "Diện tích đất", v: "202 m²" },
      { k: "Diện tích sàn sử dụng", v: "246,84 m²" },
      { k: "Phòng ngủ", v: "4" },
      { k: "WC", v: "6" },
    ],
    btn: "NHẬN GIÁ MẪU SL4",
    popupTitle: "Nhận giá mẫu SL4",
    popupNote: "Giá, vị trí lô và mặt bằng mẫu biệt thự song lập SL4 — gửi qua Zalo trong ngày.",
  },
  {
    key: "dl",
    tab: "Biệt thự đơn lập",
    img: `${IMG}/rivera-nagomi-biet-thu-don-lap-va3.webp`,
    alt: "Mẫu biệt thự đơn lập VA3 căn góc Rivera Nagomi 19x15 m, đất 277 m², sàn 276,11 m², 3 phòng ngủ: phối cảnh và mặt bằng",
    code: "VA3",
    codeSub: "19 × 15 M · CĂN GÓC",
    name: "Biệt thự đơn lập",
    specs: [
      { k: "Diện tích đất", v: "277 m²" },
      { k: "Diện tích sàn sử dụng", v: "276,11 m²" },
      { k: "Phòng ngủ", v: "3" },
      { k: "WC", v: "5" },
    ],
    btn: "NHẬN GIÁ MẪU VA3",
    popupTitle: "Nhận giá mẫu VA3",
    popupNote: "Giá, vị trí lô và mặt bằng mẫu biệt thự đơn lập VA3 — gửi qua Zalo trong ngày.",
  },
];

/* ===== Giá & CSBH ===== */
export const PRICE_ROWS: { name: string; chuan: string; nhanh: string; vay: string }[] = [
  { name: "Nhà phố vườn", chuan: "5,7", nhanh: "5,55", vay: "6,25" },
  { name: "Biệt thự song lập", chuan: "8,0", nhanh: "7,8", vay: "8,7" },
  { name: "Shophouse", chuan: "8,1", nhanh: "7,9", vay: "8,85" },
  { name: "Biệt thự đơn lập", chuan: "11,0", nhanh: "10,6", vay: "11,8" },
];

export const PERKS = [
  { b: "1", small: "%", span: "Ưu đãi “Đặc quyền sở hữu sớm”, trừ thẳng vào giá bán" },
  { b: "0,4", small: "%", span: "Ưu đãi thêm khi không chọn bảo lãnh ngân hàng" },
  { b: "36", small: " tháng", span: "Không thu phí quản lý vận hành từ ngày bàn giao*" },
  { b: "10", small: "%/năm", span: "Hỗ trợ lãi suất vay tối đa, trong 18 tháng" },
];

export interface ZoneRow { dot: string; time: string; chuan: string; nhanh: string; hl?: boolean }
export interface Zone {
  key: string;
  label: string;
  note: string;
  rows: ZoneRow[];
  vayNote: string;
  vayBullets: string[];
  poster: string;
  posterAlt: string;
}

export const ZONES: Zone[] = [
  {
    key: "z14",
    label: "Zone 1–4",
    note: "Dãy A14-15, B16-19, C9-12, D13, D18-19 · áp dụng HĐMB ký đến hết 31/03/2027",
    rows: [
      { dot: "1", time: "Ký hợp đồng mua bán", chuan: "10%", nhanh: "10%", hl: true },
      { dot: "2", time: "01 tháng từ khi ký HĐMB", chuan: "—", nhanh: "20%" },
      { dot: "3", time: "03 tháng từ khi ký HĐMB", chuan: "5%", nhanh: "—" },
      { dot: "4", time: "Tháng 05/2027", chuan: "5%", nhanh: "—" },
      { dot: "5", time: "Tháng 09/2027", chuan: "5%", nhanh: "—" },
      { dot: "6", time: "Tháng 01/2028", chuan: "5%", nhanh: "—" },
      { dot: "7", time: "Tháng 03/2028", chuan: "5%", nhanh: "20%" },
      { dot: "8", time: "Tháng 05/2028", chuan: "5%", nhanh: "—" },
      { dot: "9", time: "Tháng 07/2028", chuan: "5%", nhanh: "—" },
      { dot: "10", time: "Tháng 09/2028", chuan: "5%", nhanh: "—" },
      { dot: "11", time: "Tháng 10/2028 – Đợt bàn giao", chuan: "45%", nhanh: "45%", hl: true },
      { dot: "12", time: "Thông báo cấp giấy chứng nhận", chuan: "5%", nhanh: "5%" },
    ],
    vayNote: "Khách thanh toán 30% qua 5 đợt đến 01/2028 · ngân hàng giải ngân 70% từ 03/2028",
    vayBullets: [
      "Hỗ trợ lãi suất tối đa 10%/năm, 18 tháng từ đợt 6 (không quá 31/08/2029)",
      "Ân hạn nợ gốc tối đa 18 tháng",
      "Giá trị hỗ trợ tối đa 65% giá trị HĐMB",
      "Thời hạn vay tối đa 35 năm",
    ],
    poster: `${IMG}/rivera-nagomi-chinh-sach-ban-hang-zone-1-4.webp`,
    posterAlt: "Chính sách bán hàng Rivera Nagomi Zone 1-4: tiến độ thanh toán chuẩn, nhanh, vay 30/70, ưu đãi 1% và 0,4%",
  },
  {
    key: "z59",
    label: "Zone 5–9",
    note: "Dãy D8-10, D14-15, D20 · áp dụng HĐMB ký đến hết 31/03/2027",
    rows: [
      { dot: "1", time: "Ký hợp đồng mua bán", chuan: "10%", nhanh: "10%", hl: true },
      { dot: "2", time: "01 tháng từ khi ký HĐMB", chuan: "—", nhanh: "20%" },
      { dot: "3", time: "03 tháng từ khi ký HĐMB", chuan: "5%", nhanh: "—" },
      { dot: "4", time: "Tháng 09/2027", chuan: "5%", nhanh: "—" },
      { dot: "5", time: "Tháng 03/2028", chuan: "5%", nhanh: "—" },
      { dot: "6", time: "Tháng 09/2028", chuan: "5%", nhanh: "—" },
      { dot: "7", time: "Tháng 05/2029", chuan: "5%", nhanh: "20%" },
      { dot: "8", time: "Tháng 07/2029", chuan: "5%", nhanh: "—" },
      { dot: "9", time: "Tháng 09/2029", chuan: "10%", nhanh: "—" },
      { dot: "10", time: "Tháng 11/2029 – Đợt bàn giao", chuan: "45%", nhanh: "45%", hl: true },
      { dot: "11", time: "Thông báo cấp giấy chứng nhận", chuan: "5%", nhanh: "5%" },
    ],
    vayNote: "Khách thanh toán 30% qua 5 đợt đến 09/2028 · ngân hàng giải ngân 70% từ 05/2029",
    vayBullets: [
      "Hỗ trợ lãi suất tối đa 10%/năm, 18 tháng từ đợt 6 (không quá 31/10/2030)",
      "Ân hạn nợ gốc tối đa 18 tháng",
      "Giá trị hỗ trợ tối đa 65% giá trị HĐMB",
      "Thời hạn vay tối đa 35 năm",
    ],
    poster: `${IMG}/rivera-nagomi-chinh-sach-ban-hang-zone-5-9.webp`,
    posterAlt: "Chính sách bán hàng Rivera Nagomi Zone 5-9: tiến độ thanh toán chuẩn, nhanh, vay 30/70, bàn giao dự kiến 11/2029",
  },
];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Rivera Nagomi nằm ở đâu?",
    a: "Rivera Nagomi nằm trong khu đô thị Waterpoint, mặt tiền đường ĐT.830, xã Bến Lức, tỉnh Tây Ninh. Trước ngày 1/7/2025, khu vực này thuộc xã An Thạnh, huyện Bến Lức, tỉnh Long An.",
  },
  {
    q: "Chủ đầu tư Rivera Nagomi là ai?",
    a: "Rivera Nagomi do Công ty Cổ phần Đầu tư Nam Long phát triển cùng đối tác Nhật Bản Nishi-Nippon Railroad. Chính sách bán hàng của phân khu do Công ty Cổ phần Southgate, đơn vị phát triển dự án Waterpoint, ban hành.",
  },
  {
    q: "Rivera Nagomi có bao nhiêu căn và những loại hình nào?",
    a: "Rivera Nagomi có 158 căn thuộc bốn dòng sản phẩm: shophouse, nhà phố vườn, biệt thự song lập và biệt thự đơn lập, trên tổng diện tích 5,8 ha, trong đó khoảng 3 ha là mặt nước.",
  },
  {
    q: "Giá Rivera Nagomi bao nhiêu một căn?",
    a: "Theo giá tham khảo tháng 9/2026 (chưa phải bảng giá chính thức của chủ đầu tư), theo lịch thanh toán chuẩn: nhà phố vườn khoảng 5,7 tỷ/căn, biệt thự song lập khoảng 8 tỷ/căn, shophouse khoảng 8,1 tỷ/căn, biệt thự đơn lập khoảng 11 tỷ/căn. Lịch thanh toán nhanh có giá thấp hơn, lịch vay ngân hàng có giá cao hơn.",
  },
  {
    q: "Mua Rivera Nagomi có hỗ trợ vay ngân hàng không?",
    a: "Có. Với tiến độ thanh toán vay, khách hàng thanh toán 30%, ngân hàng giải ngân 70%. Chủ đầu tư hỗ trợ lãi suất vay tối đa 10%/năm trong 18 tháng, ân hạn nợ gốc tối đa 18 tháng, thời hạn vay tối đa 35 năm, theo thông báo chính sách bán hàng của Công ty Cổ phần Southgate.",
  },
  {
    q: "Khi nào Rivera Nagomi bàn giao nhà?",
    a: "Theo tiến độ thanh toán dự kiến trong chính sách bán hàng, đợt bàn giao của Zone 1-4 là tháng 10/2028 và của Zone 5-9 là tháng 11/2029.",
  },
  {
    q: "Từ Rivera Nagomi đi TP.HCM mất bao lâu?",
    a: "Theo tài liệu của chủ đầu tư, từ Waterpoint đi đường bộ khoảng 40 phút đến Phú Mỹ Hưng, khoảng 55 phút đến trung tâm TP.HCM và khoảng 35 phút đến Tiền Giang, qua cao tốc TP.HCM – Trung Lương và Quốc lộ 1.",
  },
  {
    q: "Rivera Nagomi có những tiện ích gì?",
    a: "Tiện ích nội khu Rivera Nagomi gồm hồ bơi, khu vui chơi trẻ em, clubhouse, phòng gym, khu BBQ, công viên kênh đào, khu thể thao ngoài trời và hẻm xanh cảnh quan. Xung quanh có River Club, bến du thuyền, công viên bờ sông, công viên bờ kênh, trường mầm non và Trường quốc tế song ngữ EMASI Plus.",
  },
];
