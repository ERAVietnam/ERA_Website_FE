import type { ReactNode } from "react";
import { IMG } from "./theme";

/* ===== Hero ===== */
export const HERO_FACTS = [
  { b: (<>85,2<small> ha</small></>), span: "Giai đoạn 1" },
  { b: "1.251", span: "Sản phẩm" },
  { b: "14,41%", span: "Mật độ XD" },
  { b: "32", span: "Tiện ích" },
];

/* ===== Tổng quan ===== */
export const OVERVIEW_FACT =
  "Thanh Phú Centre Point là khu đô thị sinh thái – thương mại thấp tầng do BIM Land (Tập đoàn BIM Group) phát triển, mặt tiền đường Nguyễn Hữu Trí và ĐT.830C, xã Bến Lức, tỉnh Tây Ninh (trước ngày 1/7/2025 là xã Thanh Phú, huyện Bến Lức, tỉnh Long An). Giai đoạn 1 – Miền Thương Phú rộng 85,2 ha, cung cấp 1.251 nhà phố, shophouse và biệt thự.";

export const OVERVIEW_STATS = [
  { b: (<>85,2<small> ha</small></>), span: "Giai đoạn 1 · Miền Thương Phú" },
  { b: "1.251", span: "Nhà phố, shophouse, biệt thự" },
  { b: "14,41%", span: "Mật độ xây dựng" },
  { b: "48%", span: "Cây xanh, mặt nước, hạ tầng" },
];

export const SPEC_ROWS: { label: string; value: ReactNode }[] = [
  { label: "Tên dự án", value: (<>
      <b className="hl">Thanh Phú Centre Point</b>
      <small>BIM Thanh Phú · Khu dân cư kết hợp thương mại dịch vụ Thanh Phú</small>
    </>) },
  { label: "Vị trí", value: "Đường Nguyễn Hữu Trí & ĐT.830C, xã Bến Lức, tỉnh Tây Ninh" },
  { label: "Nhà phát triển", value: "BIM Land (Tập đoàn BIM Group)" },
  { label: "Chủ đầu tư pháp lý", value: "Liên danh BEHS & Covestcons" },
  { label: "Quy mô GĐ1", value: (<>
      <b className="hl">Miền Thương Phú 85,2 ha</b>
      <small>Vốn đầu tư 10.662 tỷ đồng</small>
    </>) },
  { label: "Sản phẩm GĐ1", value: (<>
      <b className="hl">1.251 căn</b>
      <small>Hội Phú 607 (78 nhà phố liền kề + 529 nhà phố thương mại) · Thương Phú 331 shophouse Strip Mall · An Phú 313 biệt thự</small>
    </>) },
  { label: "Mật độ xây dựng", value: (<>
      14,41%
      <small>48% quỹ đất cho cây xanh, mặt nước và hạ tầng công cộng</small>
    </>) },
  { label: "Kiến trúc", value: "Codinachs Architects (Tây Ban Nha)" },
  { label: "Cảnh quan", value: "BroadwayMalyan (Anh)" },
  { label: "Quản lý vận hành", value: "BEM" },
  { label: "Sở hữu", value: "Sổ hồng lâu dài cho ngườI Việt Nam" },
  { label: "Tầm nhìn dài hạn", value: "Khoảng 5.000 sản phẩm thấp tầng và 7.000 căn hộ cao tầng" },
];

export const CORE_VALUES = [
  { i: "Giao thương", b: (<>9,5<small> ha</small></>), span: "Mega Mall & Strip Mall – 3 tầng giao thương trên trục đô thị chính" },
  { i: "Trải nghiệm", b: "32", span: "tiện ích trong bán kính 10 phút đi bộ, công viên trung tâm 8 ha" },
  { i: "Lễ hội", b: (<>1,2<small> ha</small></>), span: "quảng trường sự kiện bên hồ, nhạc nước mỗi tối" },
];

/* ===== Vị trí ===== */
export const LOCATION_FACT =
  "Dự án mặt tiền đường Nguyễn Hữu Trí và ĐT.830C, xã Bến Lức, tỉnh Tây Ninh – sát nút giao Mỹ Yên của cao tốc TP.HCM – Trung Lương và cao tốc Bến Lức – Long Thành, cửa ngõ phía Tây TP.HCM.";

export const TRAVEL_TIMES = [
  { b: (<>3<small>phút</small></>), span: "Nút giao Mỹ Yên – cao tốc TP.HCM – Trung Lương, cao tốc Bến Lức – Long Thành" },
  { b: (<>7<small>phút</small></>), span: "Quốc lộ 1A" },
  { b: (<>15<small>phút</small></>), span: "Bình Chánh" },
  { b: (<>20<small>phút</small></>), span: "Bến xe Miền Tây · Tân An (20–25 phút)" },
  { b: (<>30<small>phút</small></>), span: "Quận 5, Quận 6, Quận 7" },
  { b: (<>45<small>phút</small></>), span: "Quận 1 (chợ Bến Thành) · sân bay Tân Sơn Nhất · sân bay Long Thành" },
  { b: (<>80<small>phút</small></>), span: "Vũng Tàu" },
];

export const INFRASTRUCTURE = [
  { b: (<>Đường Nguyễn Hữu Trí mở rộng 30 m <i>2026</i></>), span: "Trục kết nối trực tiếp mặt tiền dự án" },
  { b: (<>Cao tốc Bến Lức – Long Thành <i>9/2026</i></>), span: "Thông xe toàn tuyến, nối thẳng về sân bay Long Thành" },
  { b: (<>Vành đai 3 – 8 làn <i>6/2026</i></>), span: "Thông xe kỹ thuật" },
  { b: (<>Võ Văn Kiệt nối dài 6–8 làn <i>2026–2028</i></>), span: "Trục Đông – Tây về trung tâm TP.HCM" },
  { b: (<>Vành đai 4 – 8 làn <i>2028</i></>), span: "Lộ giới 74,5 m" },
];

/* ===== Tiện ích ===== */
export interface AccSlide { src: string; src800: string; w: number; h: number; alt: string; ten: string; mo: string }
export const ACC_SLIDES: AccSlide[] = [
  {
    src: `${IMG}/thanh-phu-centre-point-cau-rong-bieu-tuong.webp`,
    src800: `${IMG}/thanh-phu-centre-point-cau-rong-bieu-tuong-800.webp`,
    w: 1000, h: 562,
    alt: "Cầu Rồng dài 50 m – cổng chào biểu tượng của Thanh Phú Centre Point vươn qua trục đường chính",
    ten: "Cầu Rồng 50 m", mo: "Cổng chào biểu tượng vươn qua trục đường chính.",
  },
  {
    src: `${IMG}/thanh-phu-centre-point-cong-vien-trung-tam-8ha.webp`,
    src800: `${IMG}/thanh-phu-centre-point-cong-vien-trung-tam-8ha-800.webp`,
    w: 1000, h: 562,
    alt: "Công viên trung tâm 8 ha của Thanh Phú Centre Point với mái che xanh, vòng nghệ thuật và lối dạo ven hồ",
    ten: "Công viên trung tâm 8 ha", mo: "Cùng hồ cảnh quan 3 ha giữa lòng khu đô thị.",
  },
  {
    src: `${IMG}/thanh-phu-centre-point-ho-boi-noi-tren-ho.webp`,
    src800: `${IMG}/thanh-phu-centre-point-ho-boi-noi-tren-ho-800.webp`,
    w: 1000, h: 562,
    alt: "Hồ bơi nổi trên hồ 3.300 m² tại Thanh Phú Centre Point, lối đi giữa mặt nước và cabana trắng",
    ten: "Hồ bơi nổi 3.300 m²", mo: "Hồ bơi đặt nổi trên mặt hồ cảnh quan.",
  },
  {
    src: `${IMG}/thanh-phu-centre-point-club-house.webp`,
    src800: `${IMG}/thanh-phu-centre-point-club-house-800.webp`,
    w: 1000, h: 562,
    alt: "Club House 3.400 m² của Thanh Phú Centre Point với hồ bơi và sân hiên lúc chiều tối",
    ten: "Club House 3.400 m²", mo: "Không gian sinh hoạt riêng của cư dân.",
  },
  {
    src: `${IMG}/thanh-phu-centre-point-show-nhac-nuoc.webp`,
    src800: `${IMG}/thanh-phu-centre-point-show-nhac-nuoc-800.webp`,
    w: 1000, h: 562,
    alt: "Show nhạc nước mỗi tối trên hồ quảng trường Thanh Phú Centre Point với cột nước sắc tím hồng",
    ten: "Nhạc nước mỗi tối", mo: "Trình diễn tại hồ quảng trường mỗi tối.",
  },
  {
    src: `${IMG}/thanh-phu-centre-point-quang-truong-su-kien.webp`,
    src800: `${IMG}/thanh-phu-centre-point-quang-truong-su-kien-800.webp`,
    w: 1000, h: 562,
    alt: "Quảng trường sự kiện 1,2 ha bên hồ cảnh quan Thanh Phú Centre Point với khán đài bậc thang",
    ten: "Quảng trường 1,2 ha", mo: "Sân khấu lễ hội, sự kiện bên hồ.",
  },
  {
    src: `${IMG}/thanh-phu-centre-point-pho-thuong-mai-am-thuc.webp`,
    src800: `${IMG}/thanh-phu-centre-point-pho-thuong-mai-am-thuc-800.webp`,
    w: 1000, h: 562,
    alt: "Phố thương mại, ẩm thực tại Thanh Phú Centre Point với café vỉa hè và hàng cây xanh hai bên",
    ten: "Phố thương mại, ẩm thực", mo: "Café ven hồ, chợ cuối tuần, phố đi bộ.",
  },
];

export const AMENITY_SPOTLIGHT = [
  "<b>Cầu Rồng dài 50 m</b> – cổng chào biểu tượng",
  "<b>Mega Mall & Strip Mall 9,5 ha</b>",
  "<b>Công viên trung tâm 8 ha</b> + hồ cảnh quan 3 ha + quảng trường sự kiện 1,2 ha",
  "<b>Hồ bơi nổi trên hồ 3.300 m²</b> + Club House 3.400 m²",
  "<b>Nhạc nước mỗi tối</b> tại hồ quảng trường",
];

export const AMENITY_DAILY = [
  "Phố thương mại, ẩm thực, chợ cuối tuần, café ven hồ",
  "Phòng khám đa khoa quốc tế, trường liên cấp",
  "9 sân thể thao (2 sân pickleball chuẩn quốc tế), sân bóng mini, đường chạy 1,6 km",
];

/* ===== Mặt bằng ===== */
export interface PlanTab { key: string; tab: string; src: string; src800: string; w: number; h: number; alt: string }
export const MASTER_PLANS: PlanTab[] = [
  {
    key: "pk0", tab: "Toàn GĐ1",
    src: `${IMG}/thanh-phu-centre-point-mat-bang-giai-doan-1-mien-thuong-phu.webp`,
    src800: `${IMG}/thanh-phu-centre-point-mat-bang-giai-doan-1-mien-thuong-phu-800.webp`,
    w: 1280, h: 720,
    alt: "Mặt bằng giai đoạn 1 Miền Thương Phú: phân khu Hội Phú 607 căn liền kề, Thương Phú 331 strip mall, An Phú 313 biệt thự",
  },
  {
    key: "pk1", tab: "Hội Phú",
    src: `${IMG}/thanh-phu-centre-point-phan-khu-hoi-phu.webp`,
    src800: `${IMG}/thanh-phu-centre-point-phan-khu-hoi-phu-800.webp`,
    w: 1280, h: 720,
    alt: "Vị trí phân khu Hội Phú 607 căn nhà phố liền kề và nhà phố thương mại trong giai đoạn 1 Thanh Phú Centre Point",
  },
  {
    key: "pk2", tab: "Thương Phú",
    src: `${IMG}/thanh-phu-centre-point-phan-khu-thuong-phu.webp`,
    src800: `${IMG}/thanh-phu-centre-point-phan-khu-thuong-phu-800.webp`,
    w: 1280, h: 720,
    alt: "Vị trí phân khu Thương Phú 331 shophouse strip mall dọc trục giao thông chính Thanh Phú Centre Point",
  },
  {
    key: "pk3", tab: "An Phú",
    src: `${IMG}/thanh-phu-centre-point-phan-khu-an-phu.webp`,
    src800: `${IMG}/thanh-phu-centre-point-phan-khu-an-phu-800.webp`,
    w: 1280, h: 720,
    alt: "Vị trí phân khu An Phú 313 biệt thự đơn lập, song lập ven kênh tại Thanh Phú Centre Point",
  },
];

export const SUBDIVISIONS = [
  { b: "Hội Phú", em: "607 căn", span: "529 nhà phố thương mại + 78 nhà phố liền kề; đường ô bàn cờ, sát công viên 8 ha và Mega Mall." },
  { b: "Thương Phú", em: "331 căn", span: "Shophouse Strip Mall trên trục giao thông chính." },
  { b: "An Phú", em: "313 căn", span: "Biệt thự đơn lập, song lập ven kênh, khép kín, dùng riêng Club House." },
  { b: "Làng Trù Phú", em: "Sinh thái – thể thao", span: "Làng sinh thái – thể thao dành cho cộng đồng cư dân." },
];

export const HOI_PHU_DETAIL = {
  src: `${IMG}/thanh-phu-centre-point-mat-bang-chi-tiet-phan-khu-hoi-phu.webp`,
  src800: `${IMG}/thanh-phu-centre-point-mat-bang-chi-tiet-phan-khu-hoi-phu-800.webp`,
  zoom: `${IMG}/thanh-phu-centre-point-mat-bang-chi-tiet-phan-khu-hoi-phu-lon.webp`,
  w: 1280, h: 720,
  alt: "Mặt bằng chi tiết phân khu Hội Phú: các dãy nhà phố thương mại và liền kề quanh hồ trung tâm, công viên và Mega Mall",
};

export const STREET_WIDTHS = ["13,5 m", "17 m", "19 m", "21 m", "32 m"];

/* ===== Sản phẩm ===== */
export interface Product {
  key: string;
  tab: string;
  img: string; img800: string; iw: number; ih: number; imgAlt: string; figCap: string;
  em: string; h3: string;
  specs: string[];
  giaLabel: string; gia: string;
  cta: string; loai: string;
  mb: string; mb800: string; mbW: number; mbH: number; mbAlt: string;
}

export const PRODUCTS: Product[] = [
  {
    key: "sp1", tab: "Nhà phố liền kề",
    img: `${IMG}/thanh-phu-centre-point-nha-pho-lien-ke-hoi-phu.webp`,
    img800: `${IMG}/thanh-phu-centre-point-nha-pho-lien-ke-hoi-phu-800.webp`,
    iw: 1000, ih: 562,
    imgAlt: "Phối cảnh dãy nhà phố liền kề phân khu Hội Phú, Thanh Phú Centre Point: 1 trệt 3 lầu, ban công cây xanh",
    figCap: "Nhà phố liền kề · Hội Phú",
    em: "Mẫu M8 · 78 căn",
    h3: "Nhà phố liền kề",
    specs: ["Đất 5,5 × 15 m (82,5 m²)", "1 trệt 3 lầu, tổng sàn 236,56 m²", "4 phòng ngủ, 4 WC", "Sân BBQ trên tầng thượng"],
    giaLabel: "Giá tham khảo", gia: "5,79 – 6,74 tỷ/căn",
    cta: "Nhận báo giá liền kề", loai: "Nhà phố liền kề",
    mb: `${IMG}/thanh-phu-centre-point-mat-bang-nha-pho-lien-ke-m8.webp`,
    mb800: `${IMG}/thanh-phu-centre-point-mat-bang-nha-pho-lien-ke-m8-800.webp`,
    mbW: 1920, mbH: 1080,
    mbAlt: "Mặt bằng 4 tầng nhà phố liền kề mẫu M8 Thanh Phú Centre Point: đất 82,5 m², sàn 236,56 m²",
  },
  {
    key: "sp2", tab: "Shophouse",
    img: `${IMG}/thanh-phu-centre-point-shophouse-nha-pho-thuong-mai.webp`,
    img800: `${IMG}/thanh-phu-centre-point-shophouse-nha-pho-thuong-mai-800.webp`,
    iw: 1000, ih: 562,
    imgAlt: "Phối cảnh shophouse nhà phố thương mại Thanh Phú Centre Point: tầng trệt kinh doanh, phố đi bộ có quán café",
    figCap: "Shophouse · nhà phố thương mại",
    em: "Mẫu M6, M7 · 529 căn",
    h3: "Shophouse – nhà phố thương mại",
    specs: ["Tổng sàn 217,25 – 309,90 m²", "Mặt tiền 5,5 – 7 m", "Tầng trệt kinh doanh riêng, lối đi riêng lên tầng ở", "Chờ sẵn hố thang máy"],
    giaLabel: "Giá tham khảo", gia: "6,06 – 8,91 tỷ/căn",
    cta: "Nhận báo giá shophouse", loai: "Nhà phố thương mại",
    mb: `${IMG}/thanh-phu-centre-point-mat-bang-shophouse-m7.webp`,
    mb800: `${IMG}/thanh-phu-centre-point-mat-bang-shophouse-m7-800.webp`,
    mbW: 1920, mbH: 1080,
    mbAlt: "Mặt bằng 4 tầng shophouse mẫu M7 Thanh Phú Centre Point: tầng trệt kinh doanh, lối đi riêng lên tầng ở",
  },
  {
    key: "sp3", tab: "Strip Mall",
    img: `${IMG}/thanh-phu-centre-point-strip-mall-goc.webp`,
    img800: `${IMG}/thanh-phu-centre-point-strip-mall-goc-800.webp`,
    iw: 1000, ih: 562,
    imgAlt: "Phối cảnh căn strip mall góc Thanh Phú Centre Point với mặt tiền rộng, mái vòm kính và thương hiệu bán lẻ",
    figCap: "Strip Mall góc · Thương Phú",
    em: "Phân khu Thương Phú · 331 căn",
    h3: "Strip Mall góc",
    specs: ["Mặt tiền 8,5 – 11,5 m", "Tổng sàn 289 – 383 m²", "2–3 mặt thoáng", "Hợp F&B, showroom, ngân hàng"],
    giaLabel: "Giá tham khảo", gia: "Sắp công bố",
    cta: "Nhận giá Strip Mall", loai: "Shophouse Strip Mall",
    mb: `${IMG}/thanh-phu-centre-point-strip-mall-thuong-phu.webp`,
    mb800: `${IMG}/thanh-phu-centre-point-strip-mall-thuong-phu-800.webp`,
    mbW: 1000, mbH: 562,
    mbAlt: "Dãy strip mall phân khu Thương Phú, Thanh Phú Centre Point: căn góc 3 tầng mặt kính, vỉa hè rộng cho café và showroom",
  },
  {
    key: "sp4", tab: "Biệt thự",
    img: `${IMG}/thanh-phu-centre-point-biet-thu-an-phu.webp`,
    img800: `${IMG}/thanh-phu-centre-point-biet-thu-an-phu-800.webp`,
    iw: 1000, ih: 562,
    imgAlt: "Phối cảnh biệt thự phân khu An Phú, Thanh Phú Centre Point: 3 tầng, sân vườn và hàng cây trước nhà",
    figCap: "Biệt thự · An Phú",
    em: "Mẫu M1 – M5 · 313 căn",
    h3: "Biệt thự An Phú",
    specs: ["Đất 150 – 300 m²", "Mặt tiền 6 – 7 m", "Cao tối đa 3 tầng", "View công viên kênh Học Trò và Club House"],
    giaLabel: "Giá tham khảo", gia: "Dự kiến từ 7,9 tỷ/căn",
    cta: "Nhận báo giá biệt thự", loai: "Biệt thự An Phú",
    mb: `${IMG}/thanh-phu-centre-point-biet-thu-song-lap.webp`,
    mb800: `${IMG}/thanh-phu-centre-point-biet-thu-song-lap-800.webp`,
    mbW: 1000, mbH: 562,
    mbAlt: "Biệt thự song lập Thanh Phú Centre Point với ban công rộng, mái hiên và lối vào xe riêng",
  },
];

export const PRODUCT_TYPES = ["Nhà phố liền kề", "Nhà phố thương mại", "Shophouse Strip Mall", "Biệt thự An Phú"];

/* ===== Bảng giá ===== */
export const PRICE_CARDS = [
  { em: "78 căn · Hội Phú", h3: "Nhà phố liền kề", dt: "Đất 82,5 m²", so: (<>5,79 – 6,74 tỷ<small>/căn</small></>), goc: "", hl: false },
  { em: "529 căn · Hội Phú", h3: "Nhà phố thương mại", dt: "Đất 74,25 – 88 m²", so: (<>6,06 – 8,91 tỷ<small>/căn</small></>), goc: "Căn góc, trục chính view công viên: 8,44 – 8,91 tỷ", hl: true },
  { em: "331 căn · Thương Phú", h3: "Shophouse Strip Mall", dt: "Mặt tiền 8,5 – 11,5 m", so: (<span className="cho">Sắp công bố</span>), goc: "", hl: false },
  { em: "313 căn · An Phú", h3: "Biệt thự An Phú", dt: "Đất 150 – 300 m²", so: (<>Từ 7,9 tỷ<small>/căn · dự kiến</small></>), goc: "", hl: false },
];

/* ===== Chủ đầu tư ===== */
export const BIM_PROJECTS = ["Hạ Long Marina", "Phú Quốc Marina", "Thanh Phú Centre Point"];

export const PROJECT_PARTIES = [
  { i: "Nhà phát triển", b: "BIM Land", span: "Tập đoàn BIM Group" },
  { i: "Chủ đầu tư pháp lý", b: "Liên danh BEHS & Covestcons", span: "" },
  { i: "Kiến trúc", b: "Codinachs Architects", span: "Tây Ban Nha" },
  { i: "Cảnh quan", b: "BroadwayMalyan", span: "Anh" },
  { i: "Quản lý vận hành", b: "BEM", span: "" },
  { i: "Đại lý phân phối chính thức", b: "ERA Vietnam", span: "" },
];

export const PROGRESS_PHOTOS = [1, 2, 3, 4].map((n) => ({
  src: `${IMG}/thanh-phu-centre-point-tien-do-thi-cong-24-08-2026-${n}.webp`,
  w: 720, h: 405,
  alt: [
    "Tiến độ thi công Thanh Phú Centre Point ngày 24/08/2026: hạ tầng giao thông, móng các dãy nhà phố và hồ cảnh quan",
    "Công trường Thanh Phú Centre Point ngày 24/08/2026: văn phòng bán hàng mái xanh và các tuyến đường nội khu",
    "Toàn cảnh thi công Thanh Phú Centre Point ngày 24/08/2026 nhìn từ trên cao, hồ nước và khung nhà phố",
    "Cảnh quan ven hồ và văn phòng bán hàng Thanh Phú Centre Point ngày 24/08/2026 bên trục đường chính",
  ][n - 1],
}));

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Thanh Phú Centre Point nằm ở đâu?",
    a: "Thanh Phú Centre Point nằm mặt tiền đường Nguyễn Hữu Trí và ĐT.830C, xã Bến Lức, tỉnh Tây Ninh (trước ngày 1/7/2025 là xã Thanh Phú, huyện Bến Lức, tỉnh Long An). Dự án sát nút giao Mỹ Yên của cao tốc TP.HCM – Trung Lương và cao tốc Bến Lức – Long Thành, cửa ngõ phía Tây TP.HCM nối với 13 tỉnh miền Tây.",
  },
  {
    q: "Ai phát triển dự án Thanh Phú Centre Point?",
    a: "Nhà phát triển là BIM Land – đơn vị bất động sản của Tập đoàn BIM Group, hơn 30 năm phát triển, với các dự án tiêu biểu Hạ Long Marina, Phú Quốc Marina. Chủ đầu tư pháp lý là Liên danh BEHS & Covestcons. Kiến trúc do Codinachs Architects (Tây Ban Nha), cảnh quan do BroadwayMalyan (Anh), quản lý vận hành là BEM.",
  },
  {
    q: "Quy mô giai đoạn 1 Miền Thương Phú như thế nào?",
    a: "Giai đoạn 1 – Miền Thương Phú rộng 85,2 ha, vốn đầu tư 10.662 tỷ đồng, cung cấp 1.251 sản phẩm: phân khu Hội Phú 607 căn, Thương Phú 331 căn, An Phú 313 căn. Mật độ xây dựng 14,41%, 48% quỹ đất dành cho cây xanh, mặt nước và hạ tầng công cộng. Tầm nhìn dài hạn khoảng 5.000 sản phẩm thấp tầng và 7.000 căn hộ cao tầng.",
  },
  {
    q: "Thanh Phú Centre Point có những loại sản phẩm nào?",
    a: "Dự án có nhà phố liền kề mẫu M8 (đất 82,5 m², 1 trệt 3 lầu, sàn 236,56 m²), shophouse nhà phố thương mại mẫu M6, M7 (sàn 217,25 – 309,90 m², mặt tiền 5,5 – 7 m), Strip Mall góc (mặt tiền 8,5 – 11,5 m, sàn 289 – 383 m²) và biệt thự An Phú mẫu M1 – M5 (đất 150 – 300 m², cao tối đa 3 tầng).",
  },
  {
    q: "Giá bán Thanh Phú Centre Point bao nhiêu?",
    a: "Giá tham khảo đã gồm ưu đãi theo chính sách bán hàng hiện hành: nhà phố liền kề 5,79 – 6,74 tỷ/căn; nhà phố thương mại 6,06 – 8,91 tỷ/căn (căn góc, trục chính view công viên 8,44 – 8,91 tỷ); biệt thự An Phú dự kiến từ 7,9 tỷ/căn; shophouse Strip Mall sắp công bố. Giá thay đổi theo lộ giới, hướng view và ưu đãi áp dụng.",
  },
  {
    q: "Tiện ích nội khu Thanh Phú Centre Point gồm những gì?",
    a: "Dự án có 32 tiện ích trong bán kính 10 phút đi bộ: Cầu Rồng dài 50 m, Mega Mall và Strip Mall 9,5 ha, công viên trung tâm 8 ha, hồ cảnh quan 3 ha, quảng trường sự kiện 1,2 ha, hồ bơi nổi trên hồ 3.300 m², Club House 3.400 m², nhạc nước mỗi tối, phòng khám đa khoa quốc tế, trường liên cấp, 9 sân thể thao và đường chạy 1,6 km.",
  },
  {
    q: "Từ Thanh Phú Centre Point về trung tâm TP.HCM mất bao lâu?",
    a: "Theo bản đồ vị trí của chủ đầu tư, từ dự án mất khoảng 3 phút tới nút giao Mỹ Yên, 7 phút tới Quốc lộ 1A, 20 phút tới Bến xe Miền Tây, 30 phút tới Quận 5, 6, 7 và 45 phút tới Quận 1, sân bay Tân Sơn Nhất hoặc sân bay Long Thành. ThờI gian mang tính tham khảo, phụ thuộc điều kiện giao thông.",
  },
  {
    q: "Mua nhà Thanh Phú Centre Point được sở hữu thế nào?",
    a: "Sản phẩm tại Thanh Phú Centre Point được cấp sổ hồng sở hữu lâu dài cho ngườI Việt Nam. Hồ sơ pháp lý, hợp đồng mẫu và lịch thanh toán được chuyên viên ERA cung cấp theo công bố chính thức của chủ đầu tư.",
  },
];

/* ===== CTA form ===== */
export const CTA = {
  h2a: "Đăng ký tham quan",
  lead: "Nhận bảng giá theo block, mặt bằng chi tiết GĐ1 và bảng tính dòng tiền theo từng phương thức thanh toán từ ERA Vietnam.",
  bullets: [
    "Bảng giá theo block và chính sách bán hàng mới nhất",
    "Mặt bằng chi tiết giai đoạn 1 Miền Thương Phú",
    "Bảng tính dòng tiền theo từng phương thức thanh toán",
  ],
  loaiChips: ["Nhà phố", "Shophouse", "Biệt thự"],
  ket: "Chuyên viên ERA gọi lại xác nhận lịch, đón anh/chị tham quan dự án.",
  formTitle: "Đăng ký tham quan dự án",
  formSub: "Nhận bảng giá theo block, mặt bằng GĐ1 và chính sách mới nhất · Bảo mật thông tin",
};
