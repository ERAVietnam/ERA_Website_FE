import type { ReactNode } from "react";
import { IMG } from "./theme";

/* ===== Giới thiệu ===== */
export const INTRO = {
  ky: "Đô thị nghỉ dưỡng giữa lòng thành phố",
  h2: "Giới thiệu Palm River",
  body1:
    "Palm River là dự án căn hộ cao tầng kết hợp thương mại – dịch vụ tại khu đô thị Nam Rạch Chiếc, mặt tiền đường Song Hành cao tốc TP.HCM – Long Thành – Dầu Giây, phường Bình Trưng, TP.HCM (trước ngày 1/7/2025 thuộc phường An Phú, TP. Thủ Đức). Dự án do Công ty TNHH Nam Rạch Chiếc làm chủ đầu tư, Hướng Việt Properties phát triển.",
  body2:
    "Tọa lạc tại khu vực phát triển trọng điểm phía Đông TP.HCM, Palm River tiếp cận thuận tiện các trung tâm tài chính, giao thông, giáo dục và thương mại quan trọng.",
  body3:
    "Dự án gồm 4 tòa tháp 36 tầng nổi, 2 tầng hầm trên khu đất khoảng 1,89 ha, 2,7 km mặt tiền sông, với các dòng sản phẩm Studio, 1PN, 2PN, 3PN, Duplex, Penthouse cùng 13 Shophouse và 71 Officetel.",
};

export const INTRO_MOSAIC = [
  {
    cls: "m1",
    src: `${IMG}/palm-river-chan-thap-ben-song-giong-ong-to.webp`,
    w: 1000, h: 563,
    alt: "Chân tháp Palm River bên sông Giồng Ông Tố với công viên ven sông, lối dạo và bến thuyền",
  },
  {
    cls: "m2",
    src: `${IMG}/palm-river-thap-can-ho-nhin-tu-song-800.webp`,
    w: 800, h: 530,
    alt: "Các tháp căn hộ Palm River nhìn từ phía sông, dòng sông uốn quanh khu đô thị Nam Rạch Chiếc",
  },
  {
    cls: "m3",
    src: `${IMG}/palm-river-ban-cong-can-ho-hoang-hon-800.webp`,
    w: 800, h: 391,
    alt: "Ban công kính căn hộ Palm River lúc hoàng hôn, phòng khách mở ra tầm nhìn thành phố",
  },
];

/* ===== Tổng quan ===== */
export const OVERVIEW_STATS = [
  { b: "1,89 ha", span: "Diện tích khu đất" },
  { b: "4 tháp", span: "36 tầng nổi · 2 tầng hầm" },
  { b: "620", span: "Căn hộ" },
  { b: "Q.1/2029", span: "Dự kiến bàn giao" },
];

export const SPEC_ROWS: { label: string; value: ReactNode }[] = [
  { label: "Chủ đầu tư", value: "Công ty TNHH Nam Rạch Chiếc" },
  { label: "Đơn vị phát triển", value: "Hướng Việt Properties" },
  { label: "Vị trí", value: "Phường Bình Trưng, TP.HCM (mặt tiền đường Song Hành cao tốc TP.HCM – Long Thành – Dầu Giây, khu đô thị Nam Rạch Chiếc)" },
  { label: "Loại hình dự án", value: "Nhà ở chung cư cao tầng kết hợp thương mại – dịch vụ" },
  { label: "Loại hình căn hộ", value: "Studio, 1PN, 2PN, 3PN, Duplex, Penthouse · 13 Shophouse + 71 Officetel" },
  { label: "Quy mô dự án", value: "04 tòa tháp, 36 tầng nổi, 02 tầng hầm" },
  { label: "Diện tích khu đất", value: "Khoảng 1,89 ha" },
  { label: "Số lượng căn hộ", value: <><b>620 căn</b> — kèm 13 Shophouse khối đế và 71 Officetel</> },
  { label: "Hình thức sở hữu", value: "Sở hữu lâu dài (áp dụng đối với khách hàng quốc tịch Việt Nam)" },
  { label: "Tiến độ", value: "Khởi công 16/6/2026 – Dự kiến bàn giao Quý 1/2029" },
  { label: "Chiều cao · mật độ", value: "149,45 m · Mật độ xây dựng 39,5% · 4 – 6 căn/sàn" },
  { label: "Tư vấn thiết kế", value: "Kiến trúc DPA (Singapore) · Cảnh quan LJ-Group · Nội thất Dark-Horse · Thiết kế theo tiêu chuẩn xanh EDGE" },
];

/* ===== 06 Giá trị ===== */
export const VALUES_ROWS = [
  {
    dao: false,
    items: [
      { so: "01", h: "Tâm điểm kết nối", p: "Cửa ngõ kết nối khu Đông TP.HCM, thuận tiện tiếp cận các trung tâm kinh tế, giáo dục, thương mại và giải trí." },
      { so: "02", h: "Tiềm năng tăng trưởng bền vững", p: "Đón đầu động lực phát triển từ hạ tầng đồng bộ và lợi thế ven sông hiếm có." },
    ],
    img: `${IMG}/palm-river-6-gia-tri-tam-diem-ket-noi.webp`,
    img800: `${IMG}/palm-river-6-gia-tri-tam-diem-ket-noi-800.webp`,
    w: 1200, h: 750,
    alt: "Phối cảnh Palm City lúc hoàng hôn: các tháp Palm River bên sông, ga metro và cao tốc phía trước, xa xa là trung tâm TP.HCM",
  },
  {
    dao: true,
    items: [
      { so: "03", h: "Đại đô thị đa chức năng", p: "Hệ sinh thái “all-in-one” quy tụ giáo dục, y tế, thương mại, giải trí và giao thông hiện đại trong cùng một điểm đến." },
      { so: "04", h: "Chuẩn sống wellness", p: "Kiến trúc đề cao ánh sáng, thiên nhiên và sự cân bằng, mang đến trải nghiệm nghỉ dưỡng mỗi ngày." },
    ],
    img: `${IMG}/palm-river-6-gia-tri-metro.webp`,
    img800: `${IMG}/palm-river-6-gia-tri-metro.webp`,
    w: 800, h: 499,
    alt: "Tàu metro chạy trên cao cạnh cầu dây văng và các tòa nhà trung tâm TP.HCM, hình minh họa hạ tầng kết nối",
  },
  {
    dao: false,
    items: [
      { so: "05", h: "Riêng tư đắt giá", p: "Không gian sống thoáng mở với mật độ xây dựng hợp lý, nâng tầm sự riêng tư và giá trị sống." },
      { so: "06", h: "Tiện ích “sống khỏe” toàn diện", p: "Hơn 100 tiện ích nội – ngoại khu được quy hoạch đồng bộ, đáp ứng trọn vẹn nhu cầu sống, vận động và chăm sóc sức khỏe." },
    ],
    img: `${IMG}/palm-river-ho-boi-tre-em-may-truot.webp`,
    img800: `${IMG}/palm-river-ho-boi-tre-em-may-truot-800.webp`,
    w: 1000, h: 500,
    alt: "Hồ bơi trẻ em có máng trượt giữa cây xanh tại Palm River",
  },
];

export const LOCATION_BODY = [
  "Tọa lạc tại khu vực phát triển trọng điểm phía Đông TP.HCM, Palm River tiếp cận thuận tiện các trung tâm tài chính, giao thông, giáo dục và thương mại quan trọng.",
  "Dự án nằm trong khu đô thị Nam Rạch Chiếc, mặt tiền đường Song Hành cao tốc TP.HCM – Long Thành – Dầu Giây, liền kề trục An Phú – Thủ Thiêm.",
];

/* ===== Vị trí ===== */
export const LOCATION_GROUPS = [
  {
    h: "Kết nối đường sắt & metro",
    items: [
      { b: "Ngay", span: "Ga Bình Trưng (tuyến Thủ Thiêm – Long Thành) trước dự án" },
      { b: "~5′", span: "Ga Metro Thủ Thiêm" },
    ],
  },
  {
    h: "Kết nối đường bộ",
    items: [
      { b: "~3′", span: "Nút giao An Phú, cao tốc TP.HCM – Long Thành – Dầu Giây" },
      { b: "~10′", span: "Thủ Thiêm" },
      { b: "~12′", span: "Trung tâm Quận 1 (cũ) · cầu Cát Lái" },
      { b: "~30′", span: "Sân bay Long Thành" },
    ],
  },
  {
    h: "Giáo dục quốc tế",
    items: [
      { b: "~3′", span: "Trường Quốc tế Mỹ TAS" },
      { b: "7–10′", span: "AIS, VAS" },
    ],
  },
];

/* ===== Tiện ích ===== */
export const TI_BOX1 = [
  "Hồ bơi dài 70m, hồ bơi vô cực",
  "Sky Onsen (tắm khoáng kiểu Nhật), hồ trị liệu nóng – lạnh",
  "Private Spa, Sky Yoga Deck, Sky Gym & Pilates",
  "Khu golf mô phỏng, clubhouse, đài ngắm cảnh",
  "Khu vườn BBQ, khu vui chơi trẻ em",
];

export const TI_BOX2 = [
  "Công viên ven sông gần 3 km",
  "Khu thể thao Rạch Chiếc (~5 phút)",
  "Trường quốc tế TAS, AIS, VAS",
];

export const TI_BOX2_IMG = {
  src: `${IMG}/palm-river-cong-vien-ven-song.webp`,
  w: 764, h: 426,
  alt: "Công viên ven sông Giồng Ông Tố với đường chạy bộ, cây xanh và thuyền trên sông",
};

export interface Slide { src: string; w: number; h: number; alt: string; ten: string; mo?: string }
export const TI_SLIDES: Slide[] = [
  { src: `${IMG}/palm-river-ho-boi-70m-800.webp`, w: 800, h: 346, alt: "Hồ bơi dài 70 m giữa vườn nhiệt đới tại tầng 1 Palm River, nhìn thẳng ra mặt nước", ten: "Hồ bơi 70 m", mo: "Tầng 1, giữa vườn nhiệt đới, nhìn thẳng ra mặt nước." },
  { src: `${IMG}/palm-river-sky-onsen-tang-20-800.webp`, w: 800, h: 450, alt: "Sky Onsen tầng 20 Palm River: bể khoáng nóng bên vách kính nhìn hoàng hôn thành phố", ten: "Sky Onsen", mo: "Khoáng nóng trên không tầng 20, tầm nhìn toàn cảnh." },
  { src: `${IMG}/palm-river-ho-boi-tre-em-may-truot-800.webp`, w: 800, h: 400, alt: "Hồ bơi trẻ em có máng trượt giữa cây xanh tại Palm River", ten: "Hồ bơi trẻ em", mo: "Máng trượt và hồ nông an toàn cho bé." },
  { src: `${IMG}/palm-river-phong-golf-mo-phong-800.webp`, w: 800, h: 450, alt: "Phòng golf mô phỏng Palm River với màn hình lớn và khu ghế chờ", ten: "Phòng golf mô phỏng", mo: "Tầng 20, cạnh Sky Gym." },
  { src: `${IMG}/palm-river-san-nuong-bbq-tren-cao-800.webp`, w: 800, h: 450, alt: "Sân nướng BBQ trên cao Palm River, bàn ăn gia đình nhìn ra sông lúc chiều", ten: "Sân nướng BBQ trên cao", mo: "Bữa tối gia đình nhìn ra sông." },
  { src: `${IMG}/palm-river-ghe-treo-vuon-tren-cao-800.webp`, w: 800, h: 449, alt: "Khu ghế treo giữa vườn nhiệt đới trên cao tại Palm River, nhìn ra thành phố", ten: "Lounge ghế treo", mo: "Vườn nhiệt đới trên cao, đón gió và nắng chiều." },
  { src: `${IMG}/palm-river-kids-club-trong-nha-800.webp`, w: 800, h: 450, alt: "Kids Club trong nhà Palm River với vòm cầu vồng, bóng và kệ đồ chơi", ten: "Kids Club", mo: "Không gian chơi trong nhà cho trẻ nhỏ." },
  { src: `${IMG}/palm-river-phong-chieu-phim-cu-dan-800.webp`, w: 800, h: 621, alt: "Phòng chiếu phim cư dân Palm River với trần sao và ghế ngả bọc nỉ", ten: "Phòng chiếu phim", mo: "Tầng 1, ghế ngả và trần sao." },
  { src: `${IMG}/palm-river-phong-massage-tri-lieu-800.webp`, w: 800, h: 591, alt: "Phòng massage trị liệu Palm River với hai giường đơn và ánh sáng ấm", ten: "Phòng massage trị liệu", mo: "Thư giãn ngay trong khối đế." },
];

export interface AmenityFloor { key: string; label: string; small: string; start: number; title: string; items: string[] }
export const AMENITY_FLOORS: AmenityFloor[] = [
  {
    key: "1", label: "Tầng 1 · ngoài trờI", small: "20", start: 1, title: "Tiện ích ngoài trờI tầng 1",
    items: ["Sảnh đón xe","Sàn tập yoga","Lounge vườn thác nước","Lounge sân trũng","Chòi nướng BBQ","Lounge mặt nước","Sân chơi trẻ em","Sân pickleball","Hồ bơi 70 m","Hồ bơi trẻ em","Sàn hồ bơi","Bể sục Jacuzzi","Khu ghế ngồi thương mại","Khu ghế nghỉ","Tiểu cảnh nước biểu tượng","Khán đài","Phố thương mại","Đường dạo ven sông","Sân chơi thú cưng","Bungalow thư giãn ngoài trờI"],
  },
  {
    key: "1t", label: "Tầng 1 · trong nhà", small: "9", start: 21, title: "Tiện ích trong nhà tầng 1",
    items: ["Sảnh thang máy riêng","Phòng nhận thư & bưu kiện","Phòng tập thể hình","Phòng massage trị liệu","Phòng chiếu phim","Phòng karaoke riêng","Trung tâm chăm sóc sức khỏe gia đình","Lounge cư dân","Sảnh đón chính"],
  },
  {
    key: "2", label: "Tầng 2", small: "7", start: 30, title: "Tiện ích tầng 2",
    items: ["Lounge ngắm sông","Cà phê sân hiên","Khu ghế ngồi thương mại","Ẩm thực ngoài trờI","Lounge ngắm thành phố","Bãi cỏ dưới tán cây","Tiểu cảnh nước biểu tượng"],
  },
  {
    key: "20", label: "Tầng 20", small: "32", start: 37, title: "Tiện ích tầng 20",
    items: ["Phòng xông khô","Hồ ngâm lạnh phục hồi","Cabana bên hồ bơi","Sky Gym","Phòng golf mô phỏng","Phòng thay đồ","Lounge phục hồi","Xích đu ngắm thành phố","Bi-a ngoài trờI","Bàn bóng bàn","Phòng xông ướt","Sảnh sự kiện riêng","Chòi thư giãn","Chòi thư giãn trên cao","Góc thể dục ngoài trờI","Vườn sinh thái","Sky Onsen","Sàn ngắm toàn cảnh","Sân nướng BBQ","Đài quan sát","Vườn đá trị liệu","Vườn trên cao","Lối dạo xanh lộng gió","Thang máy riêng","Lounge ghế treo","Lounge bãi biển","Hồ bơi vô cực","Góc thể dục","Sàn tập yoga","Khu trò chơi","Không gian làm việc chung","Lounge thư giãn"],
  },
];

/* ===== Mặt bằng điển hình ===== */
export interface Tower {
  key: string;
  label: string;
  fig: string;
  zoom: string;
  w: number;
  h: number;
  alt: string;
  cap: string;
  loai: { b: string; span: string }[];
}

export const TOWERS: Tower[] = [
  {
    key: "t3", label: "THÁP T3",
    fig: `${IMG}/palm-river-mat-bang-tang-dien-hinh-thap-t3.webp`,
    zoom: `${IMG}/palm-river-mat-bang-tang-dien-hinh-thap-t3-2000.webp`,
    w: 2560, h: 1810,
    alt: "Mặt bằng tầng điển hình tháp T3 Palm River: tầng 5–19 và 21–26 với 6 căn 2 và 3 phòng ngủ mỗi sàn",
    cap: "Tháp T3 · tầng 5 – 19 & 21 – 26 · bấm để phóng to",
    loai: [
      { b: "2PN thường", span: "85,9 / 76,6 – 77,3 m²" },
      { b: "2PN góc", span: "84,9 / 75,8 – 76,3 m²" },
      { b: "2PN đặc biệt", span: "120,2 – 121,9 / 110,6 – 115,5 m²" },
      { b: "3PN thường", span: "126,1 / 115,5 m²" },
      { b: "3PN góc", span: "125,3 / 115,3 – 116 m²" },
      { b: "3PN góc đặc biệt", span: "157 / 143,7 – 144,8 m²" },
    ],
  },
  {
    key: "t4", label: "THÁP T4",
    fig: `${IMG}/palm-river-mat-bang-tang-dien-hinh-thap-t4.webp`,
    zoom: `${IMG}/palm-river-mat-bang-tang-dien-hinh-thap-t4-2000.webp`,
    w: 2560, h: 1810,
    alt: "Mặt bằng tầng điển hình tháp T4 Palm River: tầng 6–19 và 21–25, 29–33 với 6 căn gồm 2PN, 2PN đặc biệt, 3PN và 3PN đặc biệt",
    cap: "Tháp T4 · tầng 6 – 19 & 21 – 25, 29 – 33 · bấm để phóng to",
    loai: [
      { b: "2PN thường", span: "85,9 / 76,6 – 77,3 m²" },
      { b: "2PN góc", span: "84,9 / 75,8 – 76,3 m²" },
      { b: "2PN đặc biệt", span: "120,2 – 121,9 / 110,6 – 115,5 m²" },
      { b: "3PN thường", span: "126,1 / 115,5 m²" },
      { b: "3PN góc", span: "125,3 / 115,3 – 116 m²" },
      { b: "3PN góc đặc biệt", span: "157 / 143,7 – 144,8 m²" },
    ],
  },
];

/* ===== Thư viện hình ảnh ===== */
export interface GalleryGroup { key: string; label: string; slides: Slide[] }
export const GALLERY: GalleryGroup[] = [
  {
    key: "1", label: "Tổng thể",
    slides: [
      { src: `${IMG}/palm-river-toan-canh-bon-thap-ven-song-800.webp`, w: 800, h: 450, alt: "Toàn cảnh bốn tháp Palm River nhìn từ phía cao tốc, phía trước là sông và công viên", ten: "Toàn cảnh 4 tòa tháp" },
      { src: `${IMG}/palm-river-mat-dung-thap-va-hang-co-800.webp`, w: 800, h: 531, alt: "Mặt đứng các tháp Palm River với cầu nối trên cao và hàng cọ dọc bờ sông", ten: "Mặt đứng uốn theo dòng chảy" },
      { src: `${IMG}/palm-river-palm-city-hai-dong-song-800.webp`, w: 800, h: 400, alt: "Palm River giữa khu đô thị Palm City, được hai dòng sông bao quanh", ten: "Giữa lòng Palm City" },
    ],
  },
  {
    key: "2", label: "Tiện ích & cảnh quan",
    slides: [
      { src: `${IMG}/palm-river-sanh-don-xe-khoi-de-800.webp`, w: 800, h: 450, alt: "Sảnh đón xe khối đế Palm River với vườn cây, đài nước và dãy cửa hàng", ten: "Sảnh đón xe khối đế" },
      { src: `${IMG}/palm-river-san-vuon-dai-nuoc-khoi-de-800.webp`, w: 800, h: 432, alt: "Sân vườn khối đế Palm River với đài nước, cọ xanh và mái vòm uốn lượn", ten: "Sân vườn & đài nước" },
      { src: `${IMG}/palm-river-loi-dao-duoi-tan-cay-800.webp`, w: 800, h: 545, alt: "Lối dạo lát gỗ dưới tán cây cổ thụ cạnh khối đế Palm River", ten: "Lối dạo dưới tán cây" },
      { src: `${IMG}/palm-river-lounge-cu-dan-800.webp`, w: 800, h: 400, alt: "Lounge cư dân Palm River với sofa cong và vách trang trí kim loại", ten: "Lounge cư dân" },
    ],
  },
  {
    key: "3", label: "Nội thất căn hộ mẫu",
    slides: [
      { src: `${IMG}/palm-river-phong-khach-can-2-phong-ngu-800.webp`, w: 800, h: 627, alt: "Phòng khách căn 2 phòng ngủ Palm River, tông gỗ sáng với điểm nhấn xanh rêu và cam đất", ten: "Phòng khách căn 2PN" },
      { src: `${IMG}/palm-river-ban-an-can-ho-800.webp`, w: 800, h: 801, alt: "Bàn ăn căn hộ Palm River với ghế băng bọc nỉ và cửa kính lấy sáng", ten: "Bàn ăn" },
      { src: `${IMG}/palm-river-phong-ngu-can-ho-800.webp`, w: 800, h: 400, alt: "Phòng ngủ căn hộ Palm River với đầu giường ốp vải và cửa sổ nhìn cây xanh", ten: "Phòng ngủ" },
      { src: `${IMG}/palm-river-phong-khach-can-3-phong-ngu-800.webp`, w: 800, h: 527, alt: "Phòng khách căn 3 phòng ngủ Palm River với sofa cong và ghế bành xanh", ten: "Phòng khách căn 3PN" },
      { src: `${IMG}/palm-river-phong-thay-do-can-3-phong-ngu-800.webp`, w: 800, h: 802, alt: "Phòng thay đồ căn 3 phòng ngủ Palm River với tủ kính và gương bầu dục", ten: "Phòng thay đồ căn 3PN" },
    ],
  },
];

/* ===== Layout căn hộ ===== */
export interface Unit {
  key: string;
  tab: string;
  img?: string;
  w?: number;
  h?: number;
  imgAlt?: string;
  code: string;
  codeSub: string;
  ds: string;
  specs: { k: string; v: string }[];
  btn: string;
  btnCan: string;
  fine: string;
  duplex?: boolean;
}

export const UNITS: Unit[] = [
  {
    key: "studio", tab: "Studio",
    img: `${IMG}/palm-river-layout-can-studio-800.webp`, w: 800, h: 800,
    imgAlt: "Layout căn Studio Palm River, GSA 41,3 m² · NSA 37,3 m²",
    code: "Studio", codeSub: "Từ 34,86 m²",
    ds: "Không gian liền mạch giường ngủ – sofa – bếp, mặt kính trải dài lấy sáng; hợp ngườI trẻ độc thân và nhà đầu tư cho thuê.",
    specs: [
      { k: "Diện tích", v: "Từ 34,86 m²" },
      { k: "Căn điển hình (GSA / NSA)", v: "41,3 / 37,3 m²" },
      { k: "Phòng ngủ", v: "Không gian mở" },
    ],
    btn: "Nhận rổ hàng Studio", btnCan: "Studio",
    fine: "Layout điển hình theo tài liệu CĐT, nội thất mang tính minh họa. Thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "1pn", tab: "1PN",
    img: `${IMG}/palm-river-layout-can-1pn-800.webp`, w: 800, h: 800,
    imgAlt: "Layout căn 1 phòng ngủ Palm River, GSA 65,9 m² · NSA 60,2 m²",
    code: "1PN", codeSub: "Tham khảo ~65,9 m²",
    ds: "Căn góc bo tròn, phòng khách rộng kèm bàn ăn 4 chỗ và phòng ngủ tách riêng.",
    specs: [
      { k: "Tim tường (GSA)", v: "65,9 m²" },
      { k: "Thông thủy (NSA)", v: "60,2 m²" },
      { k: "Phòng ngủ", v: "1" },
    ],
    btn: "Nhận rổ hàng 1PN", btnCan: "1PN",
    fine: "Layout điển hình theo tài liệu CĐT, nội thất mang tính minh họa. Thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "2pn", tab: "2PN",
    img: `${IMG}/palm-river-layout-can-2pn-800.webp`, w: 800, h: 800,
    imgAlt: "Layout căn 2 phòng ngủ Palm River, GSA 84,9 m² · NSA 75,8 m²",
    code: "2PN", codeSub: "Thông thủy 75,8 m² · tim tường 84,9 m²",
    ds: "Dòng căn chủ lực của tháp T3 và T4: 2 phòng ngủ, 2 phòng tắm, bếp và bàn ăn liền phòng khách.",
    specs: [
      { k: "2PN góc (GSA / NSA)", v: "84,9 / 75,8 m²" },
      { k: "2PN thường (GSA / NSA)", v: "85,9 / 76,9 m²" },
      { k: "Phòng ngủ", v: "2" },
    ],
    btn: "Nhận rổ hàng 2PN", btnCan: "2PN",
    fine: "Layout điển hình (căn 2PN góc) theo tài liệu CĐT, nội thất mang tính minh họa. Thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "2pndb", tab: "2PN đặc biệt",
    img: `${IMG}/palm-river-layout-can-2pn-lon-800.webp`, w: 800, h: 800,
    imgAlt: "Layout căn 2 phòng ngủ đặc biệt Palm River, GSA 120,2 m² · NSA 110,9 m²",
    code: "2PN đặc biệt", codeSub: "Thông thủy 110,9 m² · tim tường 120,2 m²",
    ds: "Căn 2 phòng ngủ diện tích lớn, phòng khách và bàn ăn rộng, phòng ngủ chính có phòng tắm riêng với bồn tắm.",
    specs: [
      { k: "Tim tường (GSA)", v: "120,2 – 121,9 m²" },
      { k: "Thông thủy (NSA)", v: "110,9 – 111,7 m²" },
      { k: "Phòng ngủ", v: "2" },
    ],
    btn: "Nhận rổ hàng 2PN đặc biệt", btnCan: "2PN đặc biệt",
    fine: "Layout điển hình theo tài liệu CĐT, nội thất mang tính minh họa. Thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "3pn", tab: "3PN",
    img: `${IMG}/palm-river-layout-can-3pn-800.webp`, w: 800, h: 800,
    imgAlt: "Layout căn 3 phòng ngủ Palm River, GSA 126,1 m² · NSA 115,2 m²",
    code: "3PN", codeSub: "Thông thủy 115,2 m² · tim tường 126,1 m²",
    ds: "Bố cục khung lớn đón ánh sáng tự nhiên và tầm nhìn sông, cây xanh; 3 phòng ngủ tách khu yên tĩnh.",
    specs: [
      { k: "3PN thường (GSA / NSA)", v: "126,1 / 115,2 m²" },
      { k: "3PN góc (GSA / NSA)", v: "125,3 / 115,3 m²" },
      { k: "Phòng ngủ", v: "3" },
    ],
    btn: "Nhận rổ hàng 3PN", btnCan: "3PN",
    fine: "Layout điển hình theo tài liệu CĐT, nội thất mang tính minh họa. Thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "3pndb", tab: "3PN đặc biệt",
    img: `${IMG}/palm-river-layout-can-3pn-lon-800.webp`, w: 800, h: 800,
    imgAlt: "Layout căn 3 phòng ngủ đặc biệt Palm River, GSA 157 m² · NSA 144 m²",
    code: "3PN đặc biệt", codeSub: "Thông thủy 144,0 m² · tim tường 157,0 m²",
    ds: "Căn góc lớn nhất của tầng điển hình tháp T4, phòng khách hai mặt kính và phòng ngủ chính kèm phòng tắm, bồn tắm riêng.",
    specs: [
      { k: "Tim tường (GSA)", v: "157 m²" },
      { k: "Thông thủy (NSA)", v: "144 m²" },
      { k: "Phòng ngủ", v: "3" },
    ],
    btn: "Nhận rổ hàng 3PN đặc biệt", btnCan: "3PN đặc biệt",
    fine: "Layout điển hình theo tài liệu CĐT, nội thất mang tính minh họa. Thông tin chính thức căn cứ hợp đồng mua bán.",
  },
  {
    key: "dp", tab: "Duplex / Penthouse",
    code: "Duplex · Penthouse", codeSub: "Đến hơn 300 m²",
    ds: "Dòng căn thông tầng và căn đỉnh tháp, không gian sống nhiều tầng nhìn trọn sông Giồng Ông Tố và thành phố.",
    specs: [
      { k: "Diện tích", v: "Đến hơn 300 m²" },
      { k: "Duplex", v: "42 căn" },
      { k: "Penthouse", v: "8 căn" },
    ],
    btn: "Nhận layout Duplex / Penthouse", btnCan: "Duplex / Penthouse",
    fine: "Số căn theo bảng Hỏi – Đáp của CĐT; diện tích mang tính tham khảo.",
    duplex: true,
  },
];

export const CMP_ROWS = [
  { loai: "Studio (từ 34,86 m²)", gsa: "41,3 m²", nsa: "37,3 m²" },
  { loai: "1PN", gsa: "65,9 m²", nsa: "60,2 m²" },
  { loai: "2PN", gsa: "84,9 – 85,9 m²", nsa: "75,8 – 76,9 m²" },
  { loai: "2PN đặc biệt", gsa: "120,2 – 121,9 m²", nsa: "110,9 – 111,7 m²" },
  { loai: "3PN", gsa: "125,3 – 126,1 m²", nsa: "115,2 – 115,3 m²" },
  { loai: "3PN đặc biệt", gsa: "157 m²", nsa: "144 m²" },
  { loai: "Duplex / Penthouse", gsa: "Đến hơn 300 m² (tham khảo)", nsa: "" },
];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Palm River nằm ở đâu?",
    a: "Palm River nằm tại khu phố 19, phường Bình Trưng, TP. Hồ Chí Minh (trước ngày 1/7/2025 thuộc phường An Phú, TP. Thủ Đức), mặt tiền đường Song Hành cao tốc TP.HCM – Long Thành – Dầu Giây, trong khu đô thị Nam Rạch Chiếc (Palm City 30,6 ha). Dự án ngay ga Bình Trưng của tuyến đường sắt Thủ Thiêm – Long Thành và cách nút giao An Phú khoảng 3 phút.",
  },
  {
    q: "Chủ đầu tư Palm River là ai?",
    a: "Chủ đầu tư là Công ty TNHH Nam Rạch Chiếc, đơn vị phát triển là Hướng Việt Properties (thuộc Hướng Việt Holdings). Tên pháp lý của dự án là Khu nhà ở chung cư cao tầng kết hợp thương mại – dịch vụ 3 (ký hiệu CC3) thuộc Dự án Khu Trung tâm Nam Rạch Chiếc; tên thương mại là phân khu Palm River.",
  },
  {
    q: "Palm River có quy mô bao nhiêu căn?",
    a: "Dự án rộng khoảng 1,89 ha, gồm 4 tòa tháp T1 – T4 cao 36 tầng nổi (149,45 m) và 2 tầng hầm, tổng cộng 620 căn hộ cùng 13 Shophouse khối đế và 71 Officetel. Mỗi sàn chỉ 4 – 6 căn: tháp T1 4 căn/sàn, tháp T2, T3, T4 6 căn/sàn. Mật độ xây dựng 39,5%.",
  },
  {
    q: "Căn hộ Palm River có những diện tích nào?",
    a: "Studio từ 34,86 m². Theo mặt bằng chủ đầu tư công bố: Studio điển hình 41,3 m² tim tường (37,3 m² thông thủy); 1PN 65,9 m² (60,2 m²); 2PN 84,9 – 85,9 m² (75,8 – 76,9 m²); 2PN đặc biệt 120,2 – 121,9 m² (110,9 – 111,7 m²); 3PN 125,3 – 126,1 m² (115,2 – 115,3 m²); 3PN đặc biệt 157 m² (144 m²). Duplex và Penthouse đến hơn 300 m².",
  },
  {
    q: "Khi nào Palm River bàn giao?",
    a: "Palm River khởi công ngày 16/6/2026 và dự kiến bàn giao Quý 1/2029. Hình thức sở hữu lâu dài áp dụng đối với khách hàng quốc tịch Việt Nam.",
  },
  {
    q: "Palm River có những tiện ích gì?",
    a: "Dự án có 68 tiện ích bố trí tại tầng 1, tầng 2 và tầng 20, mọi cư dân đều được sử dụng: hồ bơi dài 70 m, hồ bơi trẻ em, hồ bơi vô cực và Sky Onsen tầng 20, hồ ngâm lạnh phục hồi, Sky Gym, phòng golf mô phỏng, sân nướng BBQ, Kids Club, phòng chiếu phim, sân pickleball cùng nhà trẻ 1.404,52 m². Bên ngoài là công viên ven sông Giồng Ông Tố dài gần 3 km.",
  },
  {
    q: "Palm River có chỗ đậu ô tô cho mỗi căn không?",
    a: "Có. Mỗi căn hộ đi kèm 1 chỗ đậu ô tô. Theo bảng Hỏi – Đáp của chủ đầu tư, 2 tầng hầm (khoảng 18.990 m² mỗi tầng) có 633 chỗ đậu ô tô và 1.240 chỗ xe máy, hai lối ra vào hầm bố trí tại tháp T1 và T4.",
  },
  {
    q: "Từ Palm River đi Thủ Thiêm, Quận 1 và sân bay mất bao lâu?",
    a: "Từ dự án mất khoảng 3 phút tới nút giao An Phú và cao tốc TP.HCM – Long Thành – Dầu Giây, khoảng 5 phút tới ga Metro Thủ Thiêm, khoảng 10 phút tới Thủ Thiêm, khoảng 12 phút tới trung tâm Quận 1 (cũ) và cầu Cát Lái, khoảng 30 phút tới sân bay Long Thành.",
  },
];

/* ===== CTA ===== */
export const CTA = {
  ky: "Palm River cùng ERA Vietnam",
  h2: "Đăng ký nhận thông tin",
  lead: "Đăng ký nhận Bảng tính dòng tiền & Rổ hàng độc quyền từ ERA Vietnam.",
  bullets: [
    "Rổ hàng căn tháp T3, T4 theo loại căn anh/chị quan tâm",
    "Bảng tính dòng tiền theo từng phương thức thanh toán",
    "Layout chi tiết, kể cả Duplex và Penthouse",
  ],
  formTitle: "Nhận Bảng tính dòng tiền & Rổ hàng Palm River",
  formSub: "Chuyên viên ERA gửi qua Zalo trong ngày · Bảo mật thông tin",
};
