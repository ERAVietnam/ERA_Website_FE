import type { ReactNode } from "react";
import { IMG } from "./theme";

/* ===== Tổng quan ===== */
export const OVERVIEW_FACT =
  "Dự án theo định hướng Healthy Home: căn hộ được thiết kế để lấy tối đa ánh sáng, gió tự nhiên và mảng xanh, cùng cộng đồng cư dân gắn kết.";

export const OVERVIEW_STATS = [
  { b: "~1 ha", span: "Diện tích đất" },
  { b: "40", span: "Tầng · 3 tháp" },
  { b: "1.101", span: "Sản phẩm" },
  { b: "19", span: "Thang máy" },
];

export const SPEC_ROWS: { label: string; value: ReactNode }[] = [
  { label: "Tên dự án", value: <b className="hl">SkySOLIS</b> },
  { label: "Chủ đầu tư", value: "Công ty TNHH MTV Vina An Thuận Phát" },
  {
    label: "Đơn vị phát triển",
    value: (
      <>
        <b className="hl">SkyWorld Development</b> (Malaysia)
        <small>qua Công ty TNHH SkyWorld Development (Việt Nam)</small>
      </>
    ),
  },
  { label: "Vị trí", value: "88/10 Đại lộ Bình Dương (QL13), phường Lái Thiêu, TP.HCM" },
  { label: "Diện tích đất", value: "Khoảng 1 ha" },
  {
    label: "Quy mô",
    value: (
      <>
        Tổ hợp cao 40 tầng gồm 3 tháp Alba, Helio, Lyra
        <small>3 tầng khối đế thương mại · 2 tầng hầm liên thông</small>
      </>
    ),
  },
  { label: "Tổng sản phẩm", value: "1.101 sản phẩm: 859 căn hộ, 222 căn mixed-use, 20 shophouse" },
  { label: "Loại hình", value: "Studio, 2PN, 3PN, Sky Villa, Mixed-use, Dual-key, Shophouse" },
  { label: "Định hướng", value: "Healthy Home" },
  { label: "Tiêu chuẩn chất lượng", value: <b className="hl">QLASSIC</b> },
  {
    label: "Pháp lý",
    value: (
      <>
        Căn hộ sở hữu lâu dài
        <small>Hồ sơ: phê duyệt 1/500, quyết định giao đất, chấp thuận chủ trương đầu tư, giấy phép xây dựng</small>
      </>
    ),
  },
  { label: "Bàn giao dự kiến", value: "Quý II/2029" },
];

/* ===== Tiện ích — accordion + 4 tầng ===== */
export interface AccItem { src: string; w: number; h: number; alt: string; ten: string; mo: string }
export const ACC_ITEMS: AccItem[] = [
  {
    src: `${IMG}/skysolis-ho-boi-tran-bo-tang-6.webp`, w: 1100, h: 717,
    alt: "Hồ bơi tràn bờ tầng 6 SkySOLIS giữa mảng xanh và các tháp căn hộ",
    ten: "Hồ bơi tràn bờ", mo: "Tầng 6 · hồ bơi tràn bờ, hồ bơi trẻ em, bể sục Jacuzzi và hiên thư giãn.",
  },
  {
    src: `${IMG}/skysolis-phong-gym-kinh-lay-sang.webp`, w: 1100, h: 825,
    alt: "Phòng Gym SkySOLIS vách kính lấy sáng tự nhiên, đường chạy và máy tập hiện đại",
    ten: "Phòng Gym", mo: "Tầng 6 · vách kính lấy sáng, máy tập hiện đại.",
  },
  {
    src: `${IMG}/skysolis-khu-golf-3d-trong-nha.webp`, w: 1100, h: 690,
    alt: "Khu Golf 3D trong nhà tại tầng tiện ích SkySOLIS với màn hình mô phỏng sân golf",
    ten: "Golf 3D", mo: "Tầng 6 · tập swing với màn hình mô phỏng sân golf.",
  },
  {
    src: `${IMG}/skysolis-rap-chieu-phim-tren-khong-tang-21.webp`, w: 1100, h: 653,
    alt: "Rạp chiếu phim trên không tầng 21 SkySOLIS: màn chiếu lớn, sofa và hiên nhìn ra thành phố",
    ten: "Rạp phim", mo: "Tầng 21 · rạp chiếu phim trên không, màn chiếu ngoài trời cạnh Sky Lounge.",
  },
  {
    src: `${IMG}/skysolis-sanh-tiec-banquet-hall-60-khach.webp`, w: 1100, h: 658,
    alt: "Sảnh tiệc Banquet Hall SkySOLIS sức chứa đến 60 khách, trần vòm gỗ và cửa kính lớn",
    ten: "Sảnh tiệc", mo: "Tầng 6 · sức chứa đến 60 người cho tiệc gia đình.",
  },
  {
    src: `${IMG}/skysolis-phong-am-nhac-music-room.webp`, w: 1100, h: 754,
    alt: "Phòng âm nhạc Music Room SkySOLIS với đàn piano, trống, guitar và ghế đôn nhiều màu",
    ten: "Music Room", mo: "Tầng 1 · không gian ươm mầm năng khiếu cho trẻ.",
  },
  {
    src: `${IMG}/skysolis-khu-vui-choi-tre-em-giua-vuon.webp`, w: 1100, h: 678,
    alt: "Khu vui chơi trẻ em giữa vườn cây tại SkySOLIS với cầu trượt và sân chơi mềm",
    ten: "Sân chơi", mo: "Khu vui chơi trẻ em giữa vườn cây, sàn mềm an toàn.",
  },
];

export interface FloorTab {
  key: string;
  label: string;
  fig: string;
  zoom: string;
  w: number;
  h: number;
  alt: string;
  cap: string;
  title: string;
  count: number;
  twoCol?: boolean;
  items: string[];
  note?: string;
}

export const FLOOR_TABS: FloorTab[] = [
  {
    key: "1", label: "Tầng 1",
    fig: `${IMG}/skysolis-mat-bang-tien-ich-tang-1-tang-6.webp`,
    zoom: `${IMG}/skysolis-mat-bang-tien-ich-tang-1-tang-6-2800.webp`,
    w: 1200, h: 852,
    alt: "Mặt bằng tiện ích SkySOLIS nhìn từ trên cao: công viên tầng 1 và hồ bơi tràn bờ tầng 6, kèm chú thích 29 tiện ích",
    cap: "Mặt bằng tiện ích tầng 1 & tầng 6 · bấm để phóng to, dò số thứ tự",
    title: "Tầng 1 – Công viên & cộng đồng", count: 16, twoCol: true,
    items: ["Cổng chào","Công viên","Sân chơi trẻ em","Đài ngắm cảnh","Đài phun nước cảnh quan","Quảng trường sự kiện","Vườn thảo mộc","Vườn đọc sách thư giãn","Khu thể dục ngoài trời","Lối dạo bộ sân vườn","Khu ghế ngồi thư giãn","Mảng xanh vùng đệm","Phòng sinh hoạt cộng đồng","Music room","Mailbox, Parcel Locker","Sảnh đón"],
  },
  {
    key: "4", label: "Tầng 4",
    fig: `${IMG}/skysolis-mat-bang-tien-ich-tang-4-vuon-treo.webp`,
    zoom: `${IMG}/skysolis-mat-bang-tien-ich-tang-4-vuon-treo-1900.webp`,
    w: 1200, h: 597,
    alt: "Mặt bằng tầng 4 SkySOLIS: khu vườn treo, vườn cỏ lau trên cao và góc cây xanh thư giãn",
    cap: "Mặt bằng tầng 4 · bấm để phóng to",
    title: "Tầng 4 – Vườn trên cao", count: 3,
    items: ["Khu vườn treo","Vườn cỏ lau trên cao","Góc cây xanh thư giãn"],
    note: "Dải vườn chạy dọc hành lang nối các tháp, cho cư dân chỗ thư giãn ngay trong toà nhà.",
  },
  {
    key: "6", label: "Tầng 6",
    fig: `${IMG}/skysolis-mat-bang-tang-6-ho-boi-tran-bo.webp`,
    zoom: `${IMG}/skysolis-mat-bang-tang-6-ho-boi-tran-bo-3400.webp`,
    w: 1300, h: 662,
    alt: "Mặt bằng tầng 6 SkySOLIS: hồ bơi tràn bờ giữa sân tiện ích, các căn hộ Dual Key, 2PN, 3PN có ban công riêng",
    cap: "Mặt bằng tầng 6 (tầng tiện ích) · bấm để phóng to",
    title: "Tầng 6 – Hồ bơi & thể thao", count: 13, twoCol: true,
    items: ["Hồ bơi tràn bờ","Hồ bơi trẻ em","Bể sục Jacuzzi","Hiên hồ bơi thư giãn","Botanical Lounge","Khu BBQ","Khu sảnh tiệc","Phòng tắm tráng","Pool Locker","Phòng karaoke","Phòng GYM","Khu Golf 3D trong nhà","Không gian làm việc mở"],
  },
  {
    key: "21", label: "Tầng 21",
    fig: `${IMG}/skysolis-mat-bang-tien-ich-tang-21-sky-lounge.webp`,
    zoom: `${IMG}/skysolis-mat-bang-tien-ich-tang-21-sky-lounge-1990.webp`,
    w: 1200, h: 677,
    alt: "Mặt bằng tầng 21 SkySOLIS: Yoga, khu vui chơi trẻ em, rạp chiếu phim trên không, vườn thú cưng, Sky Lounge",
    cap: "Mặt bằng tầng 21 · bấm để phóng to",
    title: "Tầng 21 – Sky Lounge", count: 6,
    items: ["Yoga thư thái","Khu vui chơi trẻ em","Rạp chiếu phim trên không","Vườn thú cưng","Khu vườn sáng tạo","Sky Lounge tầng cao"],
  },
];

/* ===== Healthy Home ===== */
export const HH_ITEMS = [
  {
    src: `${IMG}/skysolis-healthy-home-thien-nhien-san-vuon-dai-phun-nuoc.webp`, w: 760, h: 582,
    alt: "Sân vườn nhiều tầng cây xanh và đài phun nước cảnh quan dưới chân tháp SkySOLIS",
    i: "01", b: "THIÊN NHIÊN", p: "Mảng xanh trải trên nhiều tầng, cho cư dân chỗ thư giãn ngay trong nhà",
  },
  {
    src: `${IMG}/skysolis-healthy-home-nang-tu-nhien-cua-kinh.webp`, w: 758, h: 722,
    alt: "Cư dân đọc sách bên cửa kính lớn đón nắng chiều trong căn hộ SkySOLIS",
    i: "02", b: "NẮNG", p: "Bố trí căn hộ và không gian chung để đón tối đa ánh sáng tự nhiên",
  },
  {
    src: `${IMG}/skysolis-healthy-home-khong-khi-sanh-thong-thoang.webp`, w: 900, h: 555,
    alt: "Sảnh đón SkySOLIS trần cao, cửa kính mở ra mảng xanh, thông gió tự nhiên",
    i: "03", b: "KHÔNG KHÍ", p: "Thông gió tự nhiên, vị trí căn hộ được tính để gió lưu thông khắp nhà",
  },
  {
    src: `${IMG}/skysolis-healthy-home-cong-dong-cu-dan-gan-ket.webp`, w: 900, h: 519,
    alt: "Gia đình và bạn bè nâng ly trong bữa tiệc tại không gian sinh hoạt chung SkySOLIS",
    i: "04", b: "CỘNG ĐỒNG", p: "Không gian chung cho gia đình và hàng xóm gắn kết",
  },
];

export const GALLERY = [
  { src: `${IMG}/skysolis-noi-that-phong-khach-anh-sang-am.webp`, w: 1000, h: 667, alt: "Phòng khách căn hộ SkySOLIS: sofa, bàn trà và kệ trang trí dưới ánh nắng ấm", cap: "Phòng khách" },
  { src: `${IMG}/skysolis-noi-that-can-2pn-phong-khach-ban-an.webp`, w: 1000, h: 642, alt: "Phòng khách và bàn ăn mẫu căn 2 phòng ngủ SkySOLIS, cửa kính lớn nhìn ra cây xanh", cap: "Căn 2PN" },
  { src: `${IMG}/skysolis-noi-that-sky-villa-phong-khach-bep.webp`, w: 1000, h: 575, alt: "Phòng khách liền bếp căn Sky Villa SkySOLIS, không gian rộng và sang trọng", cap: "Sky Villa" },
  { src: `${IMG}/skysolis-noi-that-can-3pn-ban-an-bep.webp`, w: 1000, h: 602, alt: "Bàn ăn và bếp mẫu căn 3 phòng ngủ SkySOLIS, đèn thả và cửa kính ra ban công", cap: "Căn 3PN" },
  { src: `${IMG}/skysolis-noi-that-phong-ngu-master-2pn2wc.webp`, w: 1000, h: 639, alt: "Phòng ngủ master mẫu căn 2PN2WC SkySOLIS với tủ áo và phòng tắm riêng", cap: "Phòng ngủ master" },
  { src: `${IMG}/skysolis-noi-that-phong-ngu-2pn1wc-ban-cong.webp`, w: 1000, h: 636, alt: "Phòng ngủ mẫu căn 2PN1WC SkySOLIS, cửa kính ra ban công nhìn cây xanh", cap: "Phòng ngủ" },
];

/* ===== Vị trí ===== */
export const VI_TRI_FACT =
  "Mặt tiền Đại lộ Bình Dương (QL13), phường Lái Thiêu, cách trạm metro khoảng 100 m theo quy hoạch.";

export const ROUTE_TIMES = [
  { b: "2 phút", span: "Lotte Mart, trạm metro" },
  { b: "3 phút", span: "Bệnh viện Quốc tế Becamex, KCN Đồng An" },
  { b: "5 phút", span: "Chợ Lái Thiêu, BV Đa khoa Thuận An, THPT Nguyễn Trãi, MindX, Sông Bé Golf Resort, KCN VSIP 1" },
  { b: "5–10 phút", span: "Thủ Đức (Giga Mall – Phạm Văn Đồng)" },
  { b: "35 phút", span: "Sân bay Tân Sơn Nhất, chợ Bến Thành, Bitexco, Landmark 81" },
];

export const HATANG = [
  { i: "QL13", span: "Dự án mở rộng Quốc lộ 13" },
  { i: "Metro", span: "Tuyến metro nối Bình Dương – TP.HCM, trạm cách dự án khoảng 100 m theo quy hoạch" },
];

/* ===== Ứng dụng ===== */
export const APP_FEATURES = [
  { b: "Giao tiếp tập trung", span: "Cư dân, ban quản lý, an ninh trên cùng 1 app" },
  { b: "Đăng ký khách từ xa", span: "Cho khách ra vào nhanh và an toàn" },
  { b: "Đặt tiện ích", span: "Đặt phòng họp, tiện ích chung trong vài thao tác" },
  { b: "Parcel Locker", span: "Tủ nhận hàng tự động tại sảnh" },
];

/* ===== Chủ đầu tư ===== */
export const CDT_STATS = [
  { b: "20+", span: "Năm kinh nghiệm" },
  { b: "110+", span: "Giải thưởng đến T1/2026" },
  { b: "81–87%", span: "Điểm QLASSIC các dự án" },
];

export const DA_BG = ["EdgeWood Residences","The Valley Residences","SkyLuxe On The Park Residences","SkyVogue Residences","Curvo Residences"];

/* ===== Căn hộ ===== */
export const DT_RANGES = [
  { label: "Studio – 3PN", b: "34 – 125 m²" },
  { label: "Sky Villa", b: "~132 m²" },
  { label: "Mixed-use", b: "59 – 95 m²" },
  { label: "Dual-key", b: "78 – 202 m²" },
  { label: "Shophouse", b: "20 căn" },
];

export interface Unit {
  key: string;
  tab: string;
  img?: string;
  w?: number;
  h?: number;
  imgAlt?: string;
  dt: string;
  dtSmall: string;
  name: string;
  specs: { k: string; v: string }[];
  points: string[];
  shophouse?: boolean;
  shImgs?: { src: string; w: number; h: number; alt: string }[];
}

export const UNITS: Unit[] = [
  {
    key: "2pn1", tab: "2PN1WC",
    img: `${IMG}/skysolis-layout-can-2pn1wc-b1-1.webp`, w: 900, h: 600,
    imgAlt: "Layout 3D căn hộ 2 phòng ngủ 1 vệ sinh SkySOLIS mẫu B1.1, khoảng 70,6 m² tim tường",
    dt: "~70,6 m²", dtSmall: "tim tường", name: "Căn hộ 2PN1WC",
    specs: [
      { k: "Mẫu căn", v: "B1.1" },
      { k: "Tháp / Tầng", v: "Lyra / 6–40" },
      { k: "Dòng 2PN1WC", v: "67 – 79 m²" },
    ],
    points: ["Phù hợp với gia đình trẻ","Không gian thiết kế khoáng đạt và sang trọng","Tối ưu ánh sáng thiên nhiên và không khí tươi"],
  },
  {
    key: "2pn2", tab: "2PN2WC",
    img: `${IMG}/skysolis-layout-can-2pn2wc-c3-1.webp`, w: 900, h: 675,
    imgAlt: "Layout 3D căn hộ 2 phòng ngủ 2 vệ sinh SkySOLIS mẫu C3.1, khoảng 81,2 m² tim tường",
    dt: "~81,2 m²", dtSmall: "tim tường", name: "Căn hộ 2PN2WC",
    specs: [
      { k: "Mẫu căn", v: "C3.1 (nhà mẫu)" },
      { k: "Tháp / Tầng", v: "Alba – Lyra / 6–40" },
      { k: "Dòng 2PN2WC", v: "69 – 91 m²" },
    ],
    points: ["Phù hợp với gia đình có nhiều thành viên","Không gian thiết kế khoáng đạt và sang trọng","Tối ưu ánh sáng thiên nhiên và không khí tươi"],
  },
  {
    key: "3pn", tab: "3PN2WC",
    img: `${IMG}/skysolis-layout-can-3pn2wc-d1-1a.webp`, w: 900, h: 675,
    imgAlt: "Layout 3D căn hộ 3 phòng ngủ SkySOLIS mẫu D1.1a, khoảng 102,8 m² tim tường",
    dt: "~102,8 m²", dtSmall: "tim tường", name: "Căn hộ 3PN2WC",
    specs: [
      { k: "Mẫu căn", v: "D1.1a (nhà mẫu)" },
      { k: "Tháp / Tầng", v: "Alba – Lyra / 7–21, 22–40" },
      { k: "Dòng 3PN2WC", v: "102 – 125 m²" },
    ],
    points: ["Phù hợp với gia đình có nhiều thành viên","Không gian thiết kế khoáng đạt và sang trọng","Tối ưu ánh sáng thiên nhiên và không khí tươi"],
  },
  {
    key: "st", tab: "Studio",
    img: `${IMG}/skysolis-layout-can-studio-a1-2.webp`, w: 900, h: 608,
    imgAlt: "Layout 3D căn hộ Studio SkySOLIS mẫu A1.2, khoảng 35,5 m² tim tường",
    dt: "~35,5 m²", dtSmall: "tim tường", name: "Căn hộ Studio",
    specs: [
      { k: "Mẫu căn", v: "A1.2" },
      { k: "Tháp / Tầng", v: "Alba – Lyra / 7–40" },
      { k: "Dòng Studio", v: "34 – 35 m²" },
    ],
    points: ["Phù hợp với người trẻ năng động, thành đạt","Không gian thiết kế tối ưu","Tối ưu ánh sáng thiên nhiên và không khí tươi"],
  },
  {
    key: "sv", tab: "Sky Villa",
    img: `${IMG}/skysolis-layout-can-sky-villa-e1-1.webp`, w: 900, h: 600,
    imgAlt: "Layout 3D căn Sky Villa SkySOLIS mẫu E1.1, khoảng 131,9 m², bếp khô và bếp ướt tách biệt",
    dt: "~131,9 m²", dtSmall: "tim tường", name: "Căn hộ Sky Villa",
    specs: [
      { k: "Mẫu căn", v: "E1.1 · 3PN 2WC" },
      { k: "Tháp / Tầng", v: "Lyra / 7–20, 22–40" },
    ],
    points: ["Phù hợp với gia đình có nhiều thế hệ","Bếp khô và bếp ướt tách biệt, thể hiện đẳng cấp gia chủ","Tối ưu ánh sáng thiên nhiên và không khí tươi"],
  },
  {
    key: "mx", tab: "Mixed Use",
    img: `${IMG}/skysolis-layout-can-mixed-use-x1-1a.webp`, w: 800, h: 884,
    imgAlt: "Layout 3D căn Mixed Use SkySOLIS mẫu X1.1a, khoảng 59,8 m², vừa ở vừa đăng ký kinh doanh",
    dt: "~59,8 m²", dtSmall: "tim tường", name: "Căn hộ Mixed Use",
    specs: [
      { k: "Mẫu căn", v: "X1.1a · 1PN 1WC" },
      { k: "Tháp / Tầng", v: "Helio / 4–5, 7–40" },
      { k: "Dòng Mixed Use", v: "59 – 95 m²" },
    ],
    points: ["Vừa có thể ở và có thể đăng ký kinh doanh","Phù hợp với nhịp sống năng động","Tối ưu ánh sáng thiên nhiên và không khí tươi"],
  },
  {
    key: "dk", tab: "Dual Key",
    img: `${IMG}/skysolis-layout-can-dual-key-z10-1.webp`, w: 900, h: 600,
    imgAlt: "Layout 3D căn Dual Key SkySOLIS mẫu Z10.1, khoảng 116 m², 2 lối vào riêng vừa ở vừa cho thuê",
    dt: "~116,0 m²", dtSmall: "tim tường", name: "Căn hộ Dual Key",
    specs: [
      { k: "Mẫu căn", v: "Z10.1 · 3PN 2WC" },
      { k: "Tháp / Tầng", v: "Helio / 7–40" },
      { k: "Dòng Dual Key", v: "78 – 202 m²" },
    ],
    points: ["Phù hợp vừa ở vừa kinh doanh","Không gian thiết kế khoáng đạt và sang trọng","Tối ưu ánh sáng thiên nhiên và không khí tươi"],
  },
  {
    key: "sh", tab: "Shophouse",
    dt: "20", dtSmall: "căn shophouse", name: "Chuỗi shophouse khối đế",
    specs: [],
    points: [
      "Diện tích 113 – 320 m², 1 trệt + 2 lầu, sở hữu lâu dài",
      "Chuỗi nhà hàng và cửa hàng tiện ích tại khối đế, bao bọc giữa những mảng xanh đầy nắng",
      "Đón cả cư dân 3 tháp lẫn khách vãng lai trên trục Quốc lộ 13",
    ],
    shophouse: true,
    shImgs: [
      { src: `${IMG}/skysolis-shophouse-khoi-de-mat-tien-xanh.webp`, w: 1000, h: 590, alt: "Chuỗi shophouse khối đế SkySOLIS với mặt tiền kính và mảng xanh lúc chiều tối" },
      { src: `${IMG}/skysolis-shophouse-dinh-huong-nha-hang-cafe.webp`, w: 1000, h: 556, alt: "Định hướng thiết kế shophouse SkySOLIS làm nhà hàng – cà phê, trần lượn sóng và cửa kính lớn" },
    ],
  },
];

export interface FloorPlan {
  key: string;
  label: string;
  fig: string;
  zoom: string;
  w: number;
  h: number;
  alt: string;
  cap: string;
}

export const FLOOR_PLANS: FloorPlan[] = [
  {
    key: "dh", label: "Tầng 7–20 & 22–40",
    fig: `${IMG}/skysolis-mat-bang-tang-dien-hinh-7-20-22-40.webp`,
    zoom: `${IMG}/skysolis-mat-bang-tang-dien-hinh-7-20-22-40-3500.webp`,
    w: 1300, h: 662,
    alt: "Mặt bằng tầng điển hình 7–20 và 22–40 SkySOLIS: 3 tháp Alba, Helio, Lyra với mã căn và diện tích",
    cap: "Mặt bằng tầng điển hình · bấm để phóng to, đọc mã căn và diện tích",
  },
  {
    key: "45", label: "Tầng 4–5",
    fig: `${IMG}/skysolis-mat-bang-tang-4-5.webp`,
    zoom: `${IMG}/skysolis-mat-bang-tang-4-5-3270.webp`,
    w: 1300, h: 626,
    alt: "Mặt bằng tầng 4–5 SkySOLIS: mã căn, diện tích thông thủy NSA và tim tường NFA từng căn",
    cap: "Mặt bằng tầng 4–5 · bấm để phóng to",
  },
  {
    key: "6", label: "Tầng 6",
    fig: `${IMG}/skysolis-mat-bang-tang-6-ho-boi-tran-bo.webp`,
    zoom: `${IMG}/skysolis-mat-bang-tang-6-ho-boi-tran-bo-3400.webp`,
    w: 1300, h: 662,
    alt: "Mặt bằng tầng 6 SkySOLIS: hồ bơi tràn bờ giữa sân tiện ích, các căn hộ Dual Key, 2PN, 3PN có ban công riêng",
    cap: "Mặt bằng tầng 6 · căn có ban công riêng (PES) · bấm để phóng to",
  },
  {
    key: "21", label: "Tầng 21",
    fig: `${IMG}/skysolis-mat-bang-tang-21.webp`,
    zoom: `${IMG}/skysolis-mat-bang-tang-21-3500.webp`,
    w: 1300, h: 662,
    alt: "Mặt bằng tầng 21 SkySOLIS: căn hộ xen tầng tiện ích Sky Lounge, mã căn và diện tích từng căn",
    cap: "Mặt bằng tầng 21 · bấm để phóng to",
  },
];

/* ===== Chính sách ===== */
export const UU_DAI = [
  { b: "1%", strong: "Booking từ 01/10 đến hết 23/10/2026", span: "Chiết khấu trên giá mua (khách booking trước 01/10/2026 được 2%)." },
  { b: "1%", strong: "Không nhận bảo lãnh ngân hàng", span: "Khách tự nguyện không nhận Chứng thư bảo lãnh ngân hàng." },
  { b: "3%", strong: "Thanh toán chuẩn", span: "Chiết khấu trên giá bán căn hộ (chưa VAT, KPBT), thanh toán 11 đợt." },
  { b: "8%", strong: "Thanh toán nhanh 50%", span: "Trừ trực tiếp vào giá bán căn hộ (chưa VAT, KPBT)." },
  { b: "9,9%/năm", strong: "Hỗ trợ lãi suất 30 tháng", span: "Khi chọn vay ngân hàng, tính từ ngày giải ngân lần đầu." },
  { b: "7", strong: "Ngân hàng liên kết", span: "Vietcombank, BIDV, VietinBank, Hong Leong Bank, Public Bank, MB Bank, VPBank." },
];

export const CS_NOTE =
  "Lưu ý: khách chọn 1 trong 3 phương thức thanh toán. Thanh toán nhanh chỉ áp dụng khi thanh toán sớm bằng vốn tự có và không áp dụng đồng thời với hỗ trợ lãi suất. Chiết khấu áp dụng khi hoàn tất thủ tục giữ chỗ, ký thỏa thuận đúng quy định và thanh toán đúng tiến độ.";

export interface PayTable {
  key: string;
  label: string;
  caption: React.ReactNode;
  columns: string[];
  rows: { dot: string; time: React.ReactNode; cells: string[] }[];
  banks?: string[];
  note?: string;
}

export const PAY_TABLES: PayTable[] = [
  {
    key: "chuan", label: "Thanh toán chuẩn",
    caption: <>Phương thức thanh toán chuẩn — <b>chiết khấu 3%</b> trên giá bán căn hộ (chưa VAT và KPBT)</>,
    columns: ["Đợt", "Thời điểm thanh toán", "% giá mua"],
    rows: [
      { dot: "1", time: <>Ký thỏa thuận ký quỹ<small>Dự kiến tháng 10/2026</small></>, cells: ["5% (chưa VAT)"] },
      { dot: "2", time: "Tháng 03/2027", cells: ["5% (chưa VAT)"] },
      { dot: "3", time: <>Thông báo ký hợp đồng mua bán<small>Dự kiến tháng 06/2027</small></>, cells: ["10% (gồm VAT) + VAT đợt 1, 2"] },
      { dot: "4 – 9", time: "Mỗi quý từ 09/2027 đến 12/2028", cells: ["5% mỗi đợt (gồm VAT)"] },
      { dot: "10", time: <>Thông báo bàn giao căn hộ<small>Dự kiến Quý II/2029</small></>, cells: ["45% (gồm VAT) + 2% KPBT + VAT đợt 11"] },
      { dot: "11", time: "Nhận Giấy chứng nhận quyền sở hữu", cells: ["5% (không VAT)"] },
    ],
  },
  {
    key: "nhanh", label: "Thanh toán nhanh",
    caption: <>Phương thức thanh toán nhanh 50% — <b>chiết khấu 8%</b> trừ trực tiếp vào giá bán căn hộ (chưa VAT và KPBT)</>,
    columns: ["Đợt", "Thời điểm thanh toán", "% giá mua"],
    rows: [
      { dot: "1", time: <>Ký thỏa thuận ký quỹ<small>Dự kiến tháng 10/2026</small></>, cells: ["5% (chưa VAT)"] },
      { dot: "2", time: "Tháng 03/2027", cells: ["5% (chưa VAT)"] },
      { dot: "3", time: <>Thông báo ký hợp đồng mua bán<small>Dự kiến tháng 06/2027</small></>, cells: ["40% (gồm VAT) + VAT đợt 1, 2"] },
      { dot: "4", time: <>Thông báo bàn giao căn hộ<small>Dự kiến Quý II/2029</small></>, cells: ["45% (gồm VAT) + 2% KPBT + VAT đợt 5"] },
      { dot: "5", time: "Nhận Giấy chứng nhận quyền sở hữu", cells: ["5% (không VAT)"] },
    ],
  },
  {
    key: "vay", label: "Vay ngân hàng",
    caption: <>Phương thức vay ngân hàng — <b>hỗ trợ lãi suất 9,9%/năm trong 30 tháng</b> từ ngày ngân hàng giải ngân lần đầu</>,
    columns: ["Đợt", "Thời điểm thanh toán", "Vốn tự có", "Ngân hàng giải ngân"],
    rows: [
      { dot: "1", time: "Ký thỏa thuận ký quỹ", cells: ["5% (chưa VAT)", "—"] },
      { dot: "2", time: "Tháng 03/2027", cells: ["5% (chưa VAT)", "—"] },
      { dot: "3", time: <>Thông báo ký hợp đồng mua bán<small>Dự kiến tháng 06/2027</small></>, cells: ["10% (gồm VAT) + VAT đợt 1, 2", "30% (gồm VAT)"] },
      { dot: "4", time: <>Thông báo bàn giao căn hộ<small>Dự kiến Quý II/2029</small></>, cells: ["2% KPBT + VAT đợt 5", "45% (gồm VAT)"] },
      { dot: "5", time: "Nhận Giấy chứng nhận quyền sở hữu", cells: ["—", "5% (không VAT)"] },
    ],
    banks: ["Vietcombank","BIDV","VietinBank","Hong Leong Bank","Public Bank","MB Bank","VPBank"],
    note: "Việc cho vay do ngân hàng khách chọn thẩm định và quyết định theo chính sách tín dụng từng thời điểm; chủ đầu tư không cam kết khoản vay được duyệt.",
  },
];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "SkySOLIS nằm ở đâu?",
    a: "SkySOLIS nằm tại số 88/10 Đại lộ Bình Dương (Quốc lộ 13), phường Lái Thiêu, TP.HCM; trước ngày 1/7/2025 khu vực này thuộc TP. Thuận An, tỉnh Bình Dương. Dự án cách trạm metro khoảng 100 m theo quy hoạch, 2 phút đến Lotte Mart và khoảng 35 phút đến sân bay Tân Sơn Nhất.",
  },
  {
    q: "Chủ đầu tư SkySOLIS là ai?",
    a: "Chủ đầu tư SkySOLIS là Công ty TNHH MTV Vina An Thuận Phát; đơn vị phát triển là SkyWorld Development Berhad (Malaysia) thông qua Công ty TNHH SkyWorld Development (Việt Nam). Đơn vị thiết kế là AG INGO Vietnam. ERA Vietnam là đại lý phân phối chính thức.",
  },
  {
    q: "SkySOLIS có quy mô và sản phẩm gì?",
    a: "Dự án rộng khoảng 1 ha, gồm 3 tháp Alba, Helio, Lyra cao 40 tầng trên 3 tầng khối đế thương mại và 2 tầng hầm, tổng 1.101 sản phẩm: 859 căn hộ (Studio, 2PN, 3PN, Sky Villa), 222 căn mixed-use (Mixed Use, Dual Key) và 20 shophouse.",
  },
  {
    q: "Căn hộ SkySOLIS rộng bao nhiêu?",
    a: "Theo chủ đầu tư: Studio 34 – 35 m², 2PN1WC 67 – 79 m², 2PN2WC 69 – 91 m², 3PN2WC 102 – 125 m², Sky Villa khoảng 132 m², Mixed Use 59 – 95 m², Dual Key 78 – 202 m², shophouse 113 – 320 m². Đơn giá trong hợp đồng mua bán tính theo diện tích tim tường.",
  },
  {
    q: "SkySOLIS có những tiện ích gì?",
    a: "Tiện ích trải trên 4 tầng: tầng 1 có công viên, sân chơi trẻ em, quảng trường sự kiện, Music room; tầng 4 có vườn treo; tầng 6 có hồ bơi tràn bờ, Jacuzzi, BBQ, sảnh tiệc 60 khách, Gym, karaoke, Golf 3D trong nhà; tầng 21 có Yoga, rạp chiếu phim trên không, vườn thú cưng và Sky Lounge. Phí quản lý dự kiến 12.000 – 15.000 đ/m² đã gồm tiện ích.",
  },
  {
    q: "Pháp lý SkySOLIS thế nào, sở hữu bao lâu?",
    a: "Hồ sơ pháp lý dự án gồm phê duyệt 1/500, quyết định giao đất, quyết định chấp thuận chủ trương đầu tư và giấy phép xây dựng. Căn hộ và shophouse sở hữu lâu dài; người nước ngoài được mua và sở hữu 50 năm theo luật hiện hành.",
  },
  {
    q: "Khi nào SkySOLIS bàn giao và bàn giao theo tiêu chuẩn nào?",
    a: "Dự kiến ký hợp đồng mua bán Quý II/2027 và bàn giao Quý II/2029. Căn hộ bàn giao hoàn thiện cơ bản cao cấp với nội thất liền tường, kệ bếp, thiết bị vệ sinh, khóa thông minh, áp dụng tiêu chuẩn kiểm định chất lượng QLASSIC; một số loại hình bàn giao thô theo lựa chọn của khách hàng.",
  },
  {
    q: "Chính sách thanh toán SkySOLIS ra sao?",
    a: "Theo chính sách ngày 14/09/2026, khách chọn 1 trong 3 cách: thanh toán chuẩn chiết khấu 3%, thanh toán nhanh 50% chiết khấu 8%, hoặc vay ngân hàng được hỗ trợ lãi suất 9,9%/năm trong 30 tháng. Booking từ 01/10 đến hết 23/10/2026 được chiết khấu thêm 1%, không nhận bảo lãnh ngân hàng thêm 1%. Giá trung bình tham khảo khoảng 55 triệu/m²; chuyên viên ERA đã gửi bạn trang này sẽ gửi bảng giá từng căn.",
  },
];

/* ===== CTA ===== */
export const CTA_BULLETS = [
  "Hồ sơ pháp lý dự án SkySOLIS",
  "Chính sách ưu đãi, bảng giá và lịch thanh toán từng căn",
  "Brochure, layout và mặt bằng tầng",
  "Hẹn lịch tham quan nhà mẫu cùng chuyên viên ERA đã gửi bạn trang này",
];
