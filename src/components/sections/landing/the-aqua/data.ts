import { IMG } from "./theme";

/* ===== Tổng quan ===== */
export const OVERVIEW_FACT =
  "Sở hữu vị trí đẹp nhất phân khu Aquaria khi trải dài bên Vịnh Cảng nước ngọt 8,6ha và Công viên ven sông 3,5ha, các compound biệt lập The Aqua mở ra không gian sống như nghỉ dưỡng, mỗi ngày đều là kỳ nghỉ đầy hạnh phúc bất tận dành riêng cho Cộng đồng Gia đình Thượng lưu trong “Modern Township” Waterpoint – Khu đô thị tích hợp hàng đầu phía Tây TP.HCM.";

export const OVERVIEW_STATS = [
  { b: "355 ha", span: "Khu đô thị Waterpoint" },
  { b: "8,6 ha", span: "Vịnh Cảng nước ngọt" },
  { b: "3,5 ha", span: "Công viên ven sông" },
  { b: "8 km", span: "Kênh đào cảnh quan" },
];

export const SPEC_ROWS: { label: string; value: string; bold?: boolean }[] = [
  { label: "Tên sản phẩm", value: "The Aqua – compound biệt lập thuộc phân khu Aquaria", bold: true },
  { label: "Khu đô thị", value: "Waterpoint 355 ha" },
  { label: "Chủ đầu tư", value: "Nam Long Group hợp tác Nishi-Nippon Railroad (Nhật Bản)" },
  { label: "Vị trí", value: "Mặt tiền ĐT.830, xã Bến Lức, tỉnh Tây Ninh (trước 1/7/2025 thuộc huyện Bến Lức, tỉnh Long An)" },
  { label: "Loại hình", value: "Biệt thự trong compound biệt lập, cổng và tiện ích riêng" },
  { label: "Dòng sản phẩm", value: "Harborfront, Riverfront, Canal và Garden Grand Villa" },
  { label: "Kiến trúc", value: "Nhật đương đại · thiết kế công trình TWOG, ARDOR" },
  { label: "Cảnh quan & hạ tầng", value: "Lascal · Royal HaskoningDHV, Aurecon" },
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

export const LOCATION_FACT =
  "Được ôm ấp bởi thiên nhiên khoáng đạt và “phong thuỷ thịnh vượng” hiếm có khi trải dài bên Vịnh Cảng nước ngọt 8,6ha và Công viên ven sông 3,5ha, các compound biệt lập The Aqua mở ra không gian sống như nghỉ dưỡng. Mỗi ngày đều là kỳ nghỉ đầy hạnh phúc bất tận dành riêng cho Gia đình Thượng lưu trong khu đô thị tích hợp hàng đầu phía Tây TP.HCM.";

export const QUANH = [
  { name: "Vị trí đẹp nhất phân khu Aquaria", pv: true },
  { name: "Bên Vịnh Cảng nước ngọt 8,6 ha" },
  { name: "Công viên ven sông 3,5 ha" },
  { name: "Sông Vàm Cỏ Đông 5,8 km bao quanh khu đô thị" },
  { name: "Hệ thống kênh đào 8 km" },
  { name: "Mặt tiền đường ĐT.830" },
  { name: "Xe buýt nội khu, trạm cách nhau 400 m" },
];

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

/* ===== Tiện ích nội khu ===== */
export interface AccItem { src: string; w: number; h: number; alt: string; ten: string; mo: string; nhan: string }
export const ACC_ITEMS: AccItem[] = [
  {
    src: `${IMG}/the-aqua-ho-boi-san-vuon-biet-thu.webp`, w: 1400, h: 788,
    alt: "Phối cảnh hồ bơi tràn bờ trong sân vườn biệt thự The Aqua, hàng cọ và mặt nước phía sau",
    ten: "Hồ bơi người lớn, trẻ em", mo: "Làn nước trong xanh giữa hàng cọ, nhìn ra mặt nước.", nhan: "Phối cảnh minh hoạ",
  },
  {
    src: `${IMG}/the-aqua-cafe-ngoai-troi-ven-song.webp`, w: 1400, h: 788,
    alt: "Phối cảnh cafe ngoài trời, bàn BBQ và lối dạo ven sông của The Aqua lúc hoàng hôn",
    ten: "Cafe ngoài trời", mo: "Bàn cafe, BBQ bên lối dạo ven sông lúc hoàng hôn.", nhan: "Phối cảnh minh hoạ",
  },
  {
    src: `${IMG}/waterpoint-khu-vui-choi-tre-em.webp`, w: 1200, h: 712,
    alt: "Khu vui chơi trẻ em giữa tán cây xanh đang vận hành trong khu đô thị Waterpoint",
    ten: "Khu vui chơi trẻ em", mo: "Sân chơi sắc màu dưới tán cây xanh.", nhan: "Ảnh thực tế Waterpoint",
  },
  {
    src: `${IMG}/waterpoint-san-the-thao-da-nang.webp`, w: 1400, h: 806,
    alt: "Sân thể thao đa năng Waterpoint: sân tennis, pickleball và bóng rổ giữa hàng cây xanh",
    ten: "Sân thể thao đa năng", mo: "Tennis, pickleball, bóng rổ giữa hàng cây.", nhan: "Ảnh thực tế Waterpoint",
  },
  {
    src: `${IMG}/waterpoint-duong-dap-xe-dao-bo.webp`, w: 1400, h: 849,
    alt: "Cư dân đạp xe trên đường dành riêng cho xe đạp cạnh bãi cỏ trong khu đô thị Waterpoint",
    ten: "Đường dạo bộ", mo: "Lối dạo và làn xe đạp riêng cạnh bãi cỏ.", nhan: "Ảnh thực tế Waterpoint",
  },
];

export const TI_NHOM1 = ["Hồ bơi người lớn, trẻ em","Clubhouse","Khu thể thao ngoài trời","Cafe ngoài trời","Khu vui chơi trẻ em","Đường dạo bộ","Sân thể thao đa năng"];
export const TI_NHOM2 = ["Vườn Nhật","Chòi nghỉ sân vườn kiểu Nhật","Khu vực BBQ","Sân tập yoga","Nhà hàng, cafe bên sông","Bến thuyền"];

/* ===== Tiện ích ngoại khu ===== */
export interface NkCard { src: string; w: number; h: number; alt: string; b: string; span: string; rong?: boolean }
export const NK_CARDS: NkCard[] = [
  {
    src: `${IMG}/waterpoint-cong-vien-bo-song-tha-dieu.webp`, w: 1114, h: 745,
    alt: "Công viên Waterpoint ngày hội thả diều: bãi cỏ lớn, sân chơi sắc màu và lối dạo dưới tán cây",
    b: "Công viên bờ sông", span: "Bãi cỏ rộng cho cả nhà dạo chơi, thả diều",
  },
  {
    src: `${IMG}/waterpoint-cong-vien-bo-kenh.webp`, w: 1200, h: 899,
    alt: "Công viên bờ kênh Waterpoint nhìn từ trên cao: bãi cỏ rộng, hàng cọ và lối dạo uốn theo dòng kênh",
    b: "Công viên bờ kênh", span: "Lối dạo uốn theo dòng kênh, hàng cọ thẳng tắp",
  },
  {
    src: `${IMG}/waterpoint-truong-mam-non-khu-biet-thu.webp`, w: 1200, h: 675,
    alt: "Lớp mầm non trong khu biệt thự đã có cư dân sinh sống tại Waterpoint",
    b: "Trường mầm non nội khu", span: "Gần nhà, ngay trong khu đô thị",
  },
  {
    src: `${IMG}/waterpoint-truong-quoc-te-emasi-plus-thap-dong-ho.webp`, w: 1200, h: 900,
    alt: "Trường quốc tế song ngữ EMASI Plus trong khu đô thị Waterpoint với tháp đồng hồ và khối nhà gạch đỏ",
    b: "Trường quốc tế song ngữ EMASI Plus", span: "Ngay trong khu đô thị Waterpoint",
  },
  {
    src: `${IMG}/waterpoint-clubhouse-ben-thuyen-ven-song.webp`, w: 1400, h: 735,
    alt: "Clubhouse, hồ bơi và bến thuyền ven sông Vàm Cỏ Đông trong khu đô thị Waterpoint",
    b: "Clubhouse & bến thuyền ven sông", span: "Bên sông Vàm Cỏ Đông, khu đô thị Waterpoint", rong: true,
  },
];

/* ===== Mặt bằng ===== */
export const MB_FACT =
  "Mặt bằng The Aqua chia sản phẩm theo vị thế: Riverfront Grand Villa hướng sông Vàm Cỏ Đông, Harborfront Grand Villa hướng Vịnh Cảng, Canal Villa và Canal Grand Villa ven kênh đào, Garden Villa và Garden Grand Villa hướng vườn nội khu.";

export const LEGEND = [
  { color: "#F1E8B1", b: "Riverfront Grand Villa", span: "Mặt sông Vàm Cỏ Đông" },
  { color: "#FFCB85", b: "Harborfront Grand Villa", span: "Mặt Vịnh Cảng nước ngọt" },
  { color: "#91A8C8", b: "Canal Grand Villa", span: "Mặt kênh đào" },
  { color: "#DAB4D9", b: "Canal Villa", span: "Mặt kênh đào" },
  { color: "#C5A187", b: "Garden Grand Villa", span: "Mặt vườn nội khu" },
  { color: "#A5C9C7", b: "Garden Villa", span: "Mặt vườn nội khu" },
];

/* ===== Nhà mẫu ===== */
export interface Model {
  key: string;
  tab: string;
  img: string;
  w: number;
  h: number;
  imgAlt: string;
  code: string;
  codeSub: string;
  name: string;
  ds: string;
  specs: { k: string; v: string }[];
}

export const MODELS: Model[] = [
  {
    key: "harbor", tab: "Harborfront Grand Villa",
    img: `${IMG}/the-aqua-harborfront-grand-villa-vc3-1.webp`, w: 960, h: 520,
    imgAlt: "Mẫu Harborfront Grand Villa VC3.1 The Aqua: đất ~20 x 30 m, sàn ~568 m², 3+1 phòng ngủ, 3 tầng mái bằng",
    code: "VC3.1", codeSub: "MÁI BẰNG · 3 TẦNG",
    name: "Harborfront Grand Villa",
    ds: "Vị trí độc tôn bên Vịnh Cảng nước ngọt 8,6 ha.",
    specs: [
      { k: "Diện tích đất", v: "~20 x 30 m" },
      { k: "Diện tích sàn sử dụng", v: "~568 m²" },
      { k: "Phòng ngủ", v: "3+1" },
      { k: "WC", v: "5" },
    ],
  },
  {
    key: "river", tab: "Riverfront Grand Villa",
    img: `${IMG}/the-aqua-riverfront-grand-villa-vc1-1.webp`, w: 960, h: 520,
    imgAlt: "Mẫu Riverfront Grand Villa VC1.1 The Aqua: đất ~20 x 30 m, sàn ~427 m², 5 phòng ngủ, 2 tầng mái dốc",
    code: "VC1.1", codeSub: "MÁI DỐC · 2 TẦNG",
    name: "Riverfront Grand Villa",
    ds: "Tầm nhìn sông Vàm Cỏ Đông và dải công viên ven sông.",
    specs: [
      { k: "Diện tích đất", v: "~20 x 30 m" },
      { k: "Diện tích sàn sử dụng", v: "~427 m²" },
      { k: "Phòng ngủ", v: "5" },
      { k: "WC", v: "6" },
    ],
  },
  {
    key: "canal", tab: "Canal Grand Villa",
    img: `${IMG}/the-aqua-canal-grand-villa-vc1-2.webp`, w: 960, h: 519,
    imgAlt: "Mẫu Canal Grand Villa VC1.2 The Aqua: đất ~20 x 30 m, sàn ~425 m², 4 phòng ngủ, 2 tầng mái bằng, hồ bơi sân vườn",
    code: "VC1.2", codeSub: "MÁI BẰNG · 2 TẦNG",
    name: "Canal Grand Villa",
    ds: "Bên dòng kênh đào cảnh quan len lỏi quanh khu phố biệt lập.",
    specs: [
      { k: "Diện tích đất", v: "~20 x 30 m" },
      { k: "Diện tích sàn sử dụng", v: "~425 m²" },
      { k: "Phòng ngủ", v: "4" },
      { k: "WC", v: "5" },
    ],
  },
  {
    key: "garden", tab: "Garden Grand Villa",
    img: `${IMG}/the-aqua-garden-grand-villa-vb1-1.webp`, w: 960, h: 522,
    imgAlt: "Mẫu Garden Grand Villa VB1.1 The Aqua: đất ~15 x 20 m, sàn ~299 m², 4 phòng ngủ, 3 tầng mái bằng",
    code: "VB1.1", codeSub: "MÁI BẰNG · 3 TẦNG",
    name: "Garden Grand Villa",
    ds: "Mặt vườn nội khu, sắc xanh tràn vào từng không gian sống.",
    specs: [
      { k: "Diện tích đất", v: "~15 x 20 m" },
      { k: "Diện tích sàn sử dụng", v: "~299 m²" },
      { k: "Phòng ngủ", v: "4" },
      { k: "WC", v: "4" },
    ],
  },
];

export const CMP_ROWS = [
  { mau: "Harborfront VC3.1", dat: "~20 x 30 m", san: "~568 m²", pn: "3+1", wc: "5", tang: "3 tầng · mái bằng" },
  { mau: "Riverfront VC1.1", dat: "~20 x 30 m", san: "~427 m²", pn: "5", wc: "6", tang: "2 tầng · mái dốc" },
  { mau: "Canal VC1.2", dat: "~20 x 30 m", san: "~425 m²", pn: "4", wc: "5", tang: "2 tầng · mái bằng" },
  { mau: "Garden VB1.1", dat: "~15 x 20 m", san: "~299 m²", pn: "4", wc: "4", tang: "3 tầng · mái bằng" },
];

/* ===== Chính sách ===== */
export const CS_ITEMS = [
  { b: "Bảng giá chính thức", span: "Theo từng dòng Harborfront, Riverfront, Canal và Garden Grand Villa." },
  { b: "Ưu đãi đợt hiện hành", span: "Chiết khấu, quà tặng theo thông báo của chủ đầu tư." },
  { b: "Lịch thanh toán & hỗ trợ vay", span: "Tiến độ thanh toán và ngân hàng liên kết." },
];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "The Aqua nằm ở đâu?",
    a: "The Aqua là compound biệt thự thuộc phân khu Aquaria trong khu đô thị Waterpoint, mặt tiền đường ĐT.830, xã Bến Lức, tỉnh Tây Ninh. Trước ngày 1/7/2025, khu vực này thuộc xã An Thạnh, huyện Bến Lức, tỉnh Long An. The Aqua trải dài bên Vịnh Cảng nước ngọt 8,6 ha và công viên ven sông 3,5 ha.",
  },
  {
    q: "Chủ đầu tư The Aqua là ai?",
    a: "The Aqua do Nam Long Group phát triển cùng đối tác Nhật Bản Nishi-Nippon Railroad. Thiết kế công trình do TWOG và ARDOR thực hiện, cảnh quan do Lascal, hạ tầng do Royal HaskoningDHV và Aurecon tư vấn.",
  },
  {
    q: "The Aqua có những dòng sản phẩm nào?",
    a: "The Aqua chia biệt thự theo vị thế: Harborfront Grand Villa hướng Vịnh Cảng, Riverfront Grand Villa hướng sông Vàm Cỏ Đông, Canal Grand Villa ven kênh đào và Garden Grand Villa hướng vườn nội khu; mặt bằng còn có Canal Villa và Garden Villa. Kiến trúc mang phong cách Nhật đương đại.",
  },
  {
    q: "Các mẫu nhà The Aqua rộng bao nhiêu?",
    a: "Mẫu Harborfront Grand Villa VC3.1 có đất khoảng 20 x 30 m, sàn khoảng 568 m², 3+1 phòng ngủ. Mẫu Riverfront Grand Villa VC1.1 có đất khoảng 20 x 30 m, sàn khoảng 427 m², 5 phòng ngủ. Mẫu Canal Grand Villa VC1.2 có đất khoảng 20 x 30 m, sàn khoảng 425 m², 4 phòng ngủ. Mẫu Garden Grand Villa VB1.1 có đất khoảng 15 x 20 m, sàn khoảng 299 m², 4 phòng ngủ.",
  },
  {
    q: "Giá The Aqua bao nhiêu?",
    a: "Chủ đầu tư chưa công bố bảng giá và chính sách bán hàng mới của The Aqua trên kênh chính thức. Giá từng căn phụ thuộc dòng sản phẩm, diện tích và vị trí lô; bảng giá chính thức theo thông báo của chủ đầu tư.",
  },
  {
    q: "The Aqua có những tiện ích nội khu gì?",
    a: "Tiện ích nội khu The Aqua gồm hồ bơi người lớn và trẻ em, clubhouse, khu thể thao ngoài trời, cafe ngoài trời, khu vui chơi trẻ em, đường dạo bộ và sân thể thao đa năng. Sơ đồ tiện ích của chủ đầu tư còn có vườn Nhật, chòi nghỉ sân vườn kiểu Nhật, khu BBQ, sân tập yoga, nhà hàng cafe bên sông và bến thuyền.",
  },
  {
    q: "Từ The Aqua đi TP.HCM mất bao lâu?",
    a: "Theo tài liệu của chủ đầu tư, từ Waterpoint đi đường bộ khoảng 40 phút đến Phú Mỹ Hưng, khoảng 55 phút đến trung tâm TP.HCM và khoảng 35 phút đến Tiền Giang, qua cao tốc TP.HCM – Trung Lương và Quốc lộ 1. Đường thuỷ khoảng 60 phút đến Bến Bạch Đằng.",
  },
  {
    q: "Quanh The Aqua có tiện ích ngoại khu nào?",
    a: "Cư dân The Aqua dùng chung tiện ích của khu đô thị Waterpoint 355 ha, gồm công viên bờ sông, công viên bờ kênh, trường mầm non nội khu, Trường quốc tế song ngữ EMASI Plus cùng clubhouse và bến thuyền ven sông Vàm Cỏ Đông.",
  },
];
