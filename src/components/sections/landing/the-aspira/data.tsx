import type { ReactNode } from "react";
import { IMG } from "./theme";

/* ===== Hero ===== */
export const HERO_FACTS = [
  { b: "1.212", span: "Sản phẩm" },
  { b: (<>30<small> tầng</small></>), span: "2 tháp" },
  { b: "EDGE", span: "Chuẩn xanh" },
  { b: (<>Q.II<small>/2027</small></>), span: "Bàn giao" },
];

/* ===== Tổng quan ===== */
export const OVERVIEW_STATS = [
  { b: (<>9.372<small> m²</small></>), span: "Diện tích đất" },
  { b: "2 × 30", span: "Tháp × tầng" },
  { b: "1.212", span: "Căn hộ & shophouse" },
  { b: "Q.II/2027", span: "Bàn giao dự kiến" },
];

export const SPEC_ROWS: { label: string; value: ReactNode }[] = [
  { label: "Vị trí", value: "Đường Nguyễn Thị Minh Khai, phường Tân Đông Hiệp, TP.HCM" },
  { label: "Chủ đầu tư", value: "Công ty TNHH Đầu tư Bất động sản Phúc An Gia" },
  { label: "Đơn vị phát triển", value: "Công ty CP Đầu tư Sài Gòn High Rise" },
  { label: "Diện tích đất", value: "9.372 m²" },
  { label: "Quy mô", value: (<>
      <b className="hl">2 tháp, 30 tầng</b>
      <small>28 tầng căn hộ + 2 tầng thương mại · 2 tầng hầm</small>
    </>) },
  { label: "Tổng sản phẩm", value: (<>
      <b className="hl">1.212</b>
      <small>1.204 căn hộ + 8 shophouse</small>
    </>) },
  { label: "Cơ cấu căn hộ", value: "1PN: 140 · 1PN+: 84 · 2PN: 840 · 2PN+: 140" },
  { label: "Tổng thầu", value: "DECOFI" },
  { label: "Ngân hàng đồng hành", value: "Nam Á Bank" },
  { label: "Chứng nhận xanh", value: "EDGE (12/2025)" },
  { label: "Khởi công", value: "Tháng 10/2024" },
  { label: "Bàn giao dự kiến", value: <b className="hl">Quý II/2027</b> },
];

export const INTRO = {
  kick: "Giới thiệu The Aspira",
  h2: (<>Sống năng lượng, <b>chọn The Aspira</b></>),
  body1:
    "The Aspira là dự án căn hộ 2 tháp 30 tầng trên đường Nguyễn Thị Minh Khai, phường Tân Đông Hiệp, TP.HCM (trước ngày 1/7/2025 thuộc phường Tân Bình, TP. Dĩ An, tỉnh Bình Dương). Chủ đầu tư là Công ty TNHH Đầu tư BĐS Phúc An Gia, đơn vị phát triển là Sài Gòn High Rise.",
  body2:
    "Dự án nằm gần các ga quy hoạch của tuyến Metro số 1 kéo dài, đã đạt chứng chỉ công trình xanh EDGE, cất nóc ngày 10/4/2026 và dự kiến bàn giao Quý II/2027.",
};

/* ===== Vị trí ===== */
export const LOCATION_FACT =
  "The Aspira nằm trên đường Nguyễn Thị Minh Khai, phường Tân Đông Hiệp, TP.HCM – gần các trục Quốc lộ 1K, Mỹ Phước – Tân Vạn, cao tốc TP.HCM – Chơn Thành và trong vùng phát triển TOD quanh ga S12 – S13 của tuyến Metro số 1 kéo dài (theo quy hoạch).";

export const REGIONAL_LINKS = [
  { b: (<>5–10<small>phút</small></>), span: "KCN VSIP 1, KCN Tân Đông Hiệp B, chợ Đông Thành, chợ Tân Bình, BV An Việt, THCS Tân Bình, THPT Nguyễn Thị Minh Khai" },
  { b: (<>11–15<small>phút</small></>), span: "Vincom Dĩ An, KCN Sóng Thần 1 & 2" },
  { b: (<>16–25<small>phút</small></>), span: "Aeon Mall Bình Dương, GO! Dĩ An, BV Quốc tế Becamex, KCX Linh Trung, KCN Bình Đường, KDL Thủy Châu, KDL Bửu Long" },
  { b: (<>26–30<small>phút</small></>), span: "Bến xe Miền Đông mới, Làng Đại học, BV Thủ Đức, BV Hoàn Hảo, BV Thuận Mỹ ITO, BV Hoàn Mỹ Thủ Đức" },
  { b: (<>31–45<small>phút</small></>), span: "GigaMall, Vincom Thủ Đức, KDL Suối Tiên, Khu Công nghệ cao, BV Hạnh Phúc" },
];

export const ROADS = [
  { b: "Tuyến Metro số 1 kéo dài", span: "Vùng TOD quanh ga S12 – S13 (theo quy hoạch)", icon: "metro" },
  { b: "Quốc lộ 1K", span: "Trục nối Dĩ An với Thủ Đức và Biên Hòa", icon: "road" },
  { b: "Mỹ Phước – Tân Vạn", span: "Trục vành đai công nghiệp chạy ngang khu vực", icon: "road" },
  { b: "Cao tốc TP.HCM – Chơn Thành", span: "Trục ĐT743 hướng lên phía Bắc", icon: "bridge" },
];

export const ROAD_ICONS: Record<string, ReactNode> = {
  metro: (<><rect x="5" y="3" width="14" height="14" rx="3" /><path d="M5 11h14M9 21l-2-4M15 21l2-4M9 14h.01M15 14h.01" /></>),
  road: <path d="M4 20 9 4M20 20 15 4M12 6v2M12 11v2M12 16v2" />,
  bridge: <path d="M2 16h20M4 16v4M20 16v4M2 16c4-6 16-6 20 0M8 12.6V16M12 11.5V16M16 12.6V16" />,
};

export const MAPS_LINK = "https://www.google.com/maps?q=10.935129,106.763333";

/* ===== Tiện ích ===== */
export interface Pin { top: string; left: string; c: string; ten: string; so: string; sang?: boolean }
export interface FloorAmenities {
  key: string;
  tab: string;
  lead: string;
  map: { src: string; src800: string; w: number; h: number; alt: string };
  pins: Pin[];
  groups: { c: string; h3: string; items: { so: string; ten: string; sang?: boolean }[] }[];
  photos: { src: string; src800?: string; w: number; h: number; alt: string; cap: string }[];
}

export const AMENITY_FLOORS: FloorAmenities[] = [
  {
    key: "tret",
    tab: "Tầng trệt · 21 tiện ích",
    lead: "Tầng trệt: tiện ích sôi động để vận động, tái tạo năng lượng mỗi ngày.",
    map: {
      src: `${IMG}/the-aspira-mat-bang-tien-ich-tang-tret.webp`,
      src800: `${IMG}/the-aspira-mat-bang-tien-ich-tang-tret-800.webp`,
      w: 1400, h: 673,
      alt: "Mặt bằng tiện ích tầng trệt The Aspira: hồ bơi, sân thể thao, vườn thiền, khu trẻ em và chuỗi shophouse",
    },
    pins: [
      { top: "78%", left: "71%", c: "#0670B8", ten: "Zen Arc", so: "1" },
      { top: "79.5%", left: "86%", c: "#0670B8", ten: "Zen Arc", so: "1" },
      { top: "84%", left: "65%", c: "#0670B8", ten: "Zen Aqua", so: "2" },
      { top: "20%", left: "58%", c: "#0D7506", ten: "Công viên Khởi Nguyên", so: "3" },
      { top: "41%", left: "49%", c: "#0D7506", ten: "Công viên Khởi Nguyên", so: "3" },
      { top: "45.5%", left: "56%", c: "#0D7506", ten: "Vườn An Minh", so: "4" },
      { top: "43%", left: "40%", c: "#0D7506", ten: "Lối An", so: "5" },
      { top: "48%", left: "8.5%", c: "#0D7506", ten: "Thiền Uyển", so: "6" },
      { top: "58%", left: "7%", c: "#0D7506", ten: "Vườn Thảo Mộc", so: "7" },
      { top: "72%", left: "6.5%", c: "#0D7506", ten: "Kỳ Đài Xanh", so: "8" },
      { top: "54%", left: "12%", c: "#D40707", ten: "Kids' Funny Park", so: "9" },
      { top: "43%", left: "24%", c: "#D40707", ten: "Kids' Funny Park", so: "9" },
      { top: "71%", left: "18%", c: "#D40707", ten: "Kids' Funny Park", so: "9" },
      { top: "53%", left: "27%", c: "#D40707", ten: "Happy Kids House", so: "10" },
      { top: "63%", left: "40.5%", c: "#D40707", ten: "Revive Gym", so: "11" },
      { top: "50%", left: "43%", c: "#D40707", ten: "Flamenco Pool", so: "12" },
      { top: "53%", left: "56%", c: "#D40707", ten: "Power Zone", so: "13" },
      { top: "31%", left: "73.5%", c: "#D40707", ten: "Nature Fitness", so: "14" },
      { top: "25%", left: "73.5%", c: "#D40707", ten: "Energy Hoops", so: "15" },
      { top: "74%", left: "40%", c: "#B004E2", ten: "Chuỗi Shophouse", so: "16" },
      { top: "63%", left: "48%", c: "#B004E2", ten: "Co-Working Hub", so: "17" },
      { top: "63%", left: "60%", c: "#B004E2", ten: "Home Mart", so: "18" },
      { top: "36%", left: "67%", c: "#B004E2", ten: "Nestflix", so: "19" },
      { top: "25%", left: "65%", c: "#B004E2", ten: "Sân đa năng Wehub", so: "20" },
      { top: "16%", left: "62%", c: "#B004E2", ten: "Co-Nest BBQ", so: "21" },
    ],
    groups: [
      { c: "#0670B8", h3: "Halo Point", items: [
        { so: "1", ten: "Zen Arc" }, { so: "2", ten: "Zen Aqua" },
      ]},
      { c: "#0D7506", h3: "Serena Point", items: [
        { so: "3", ten: "Công viên Khởi Nguyên" }, { so: "4", ten: "Vườn An Minh" },
        { so: "5", ten: "Lối An" }, { so: "6", ten: "Thiền Uyển" },
        { so: "7", ten: "Vườn Thảo Mộc" }, { so: "8", ten: "Kỳ Đài Xanh" },
      ]},
      { c: "#D40707", h3: "Erena Point", items: [
        { so: "9", ten: "Kids' Funny Park" }, { so: "10", ten: "Happy Kids House" },
        { so: "11", ten: "Revive Gym" }, { so: "12", ten: "Flamenco Pool" },
        { so: "13", ten: "Power Zone" }, { so: "14", ten: "Nature Fitness" },
        { so: "15", ten: "Energy Hoops" },
      ]},
      { c: "#B004E2", h3: "Solink Point", items: [
        { so: "16", ten: "Chuỗi Shophouse" }, { so: "17", ten: "Co-Working Hub" },
        { so: "18", ten: "Home Mart" }, { so: "19", ten: "Nestflix" },
        { so: "20", ten: "Sân đa năng Wehub" }, { so: "21", ten: "Co-Nest BBQ" },
      ]},
    ],
    photos: [
      { src: `${IMG}/the-aspira-tien-ich-ho-boi-flamenco-ve-dem.webp`, src800: `${IMG}/the-aspira-tien-ich-ho-boi-flamenco-ve-dem-800.webp`, w: 1000, h: 486, alt: "Hồ bơi Flamenco Pool giữa 2 tháp The Aspira về đêm, bao quanh là mảng xanh nội khu", cap: "Flamenco Pool về đêm" },
      { src: `${IMG}/the-aspira-tien-ich-ho-boi-ban-ngay.webp`, src800: `${IMG}/the-aspira-tien-ich-ho-boi-ban-ngay-800.webp`, w: 1000, h: 486, alt: "Hồ bơi tầng trệt The Aspira ban ngày với hàng dừa, ghế tắm nắng và mặt đứng căn hộ phía sau", cap: "Hồ bơi ban ngày" },
      { src: `${IMG}/the-aspira-tien-ich-thien-uyen-vuon-thien.webp`, w: 760, h: 640, alt: "Thiền Uyển – vườn thiền có mái che giữa khóm hoa tại tầng trệt The Aspira", cap: "Thiền Uyển" },
      { src: `${IMG}/the-aspira-tien-ich-loi-dao-vuon-tang-tret.webp`, src800: `${IMG}/the-aspira-tien-ich-loi-dao-vuon-tang-tret-800.webp`, w: 1000, h: 560, alt: "Lối dạo trong vườn tầng trệt The Aspira, nắng sớm xuyên tán cây và tường cây xanh", cap: "Lối dạo vườn tầng trệt" },
      { src: `${IMG}/the-aspira-tien-ich-chuoi-shophouse-mat-duong.webp`, src800: `${IMG}/the-aspira-tien-ich-chuoi-shophouse-mat-duong-800.webp`, w: 1000, h: 486, alt: "Chuỗi shophouse khối đế The Aspira mặt đường Nguyễn Thị Minh Khai, vỉa hè rộng rợp cây", cap: "Chuỗi shophouse" },
    ],
  },
  {
    key: "thuong",
    tab: "Tầng thượng · 17 tiện ích",
    lead: "Tầng thượng: không gian thư giãn, tĩnh tại trên cao.",
    map: {
      src: `${IMG}/the-aspira-mat-bang-tien-ich-tang-thuong.webp`,
      src800: `${IMG}/the-aspira-mat-bang-tien-ich-tang-thuong-800.webp`,
      w: 1400, h: 668,
      alt: "Mặt bằng tiện ích tầng thượng The Aspira: 5 cụm vườn trên cao Venus, Jupiter, Mercury, Mars, Saturn",
    },
    pins: [
      { top: "53%", left: "19.5%", c: "#FEE000", ten: "Light of Paradise", so: "1", sang: true },
      { top: "75%", left: "32%", c: "#FEE000", ten: "Milky Way", so: "2", sang: true },
      { top: "63.5%", left: "51.5%", c: "#FEE000", ten: "EverLove", so: "3", sang: true },
      { top: "62%", left: "22%", c: "#0D7506", ten: "Harmony Park", so: "4" },
      { top: "63.5%", left: "37%", c: "#0D7506", ten: "Herb of Love Garden", so: "5" },
      { top: "24%", left: "68%", c: "#0D7506", ten: "Zen Horizon", so: "6" },
      { top: "77%", left: "39%", c: "#0670B8", ten: "Viva Inspiration", so: "7" },
      { top: "65%", left: "47.5%", c: "#0670B8", ten: "Rainbow Town", so: "8" },
      { top: "74%", left: "47.5%", c: "#0670B8", ten: "Angel Island", so: "9" },
      { top: "65%", left: "69%", c: "#0670B8", ten: "Sky Dream Mercuria", so: "10" },
      { top: "54%", left: "27.5%", c: "#D22027", ten: "Aspira Zone", so: "11" },
      { top: "52%", left: "56%", c: "#D22027", ten: "Edena Rooftop", so: "12" },
      { top: "41%", left: "68.5%", c: "#D22027", ten: "SkyEnergy Park", so: "13" },
      { top: "65.5%", left: "15.5%", c: "#8C5530", ten: "Vision Point", so: "14" },
      { top: "76%", left: "50%", c: "#8C5530", ten: "Vision Point", so: "14" },
      { top: "22%", left: "62%", c: "#8C5530", ten: "Vision Point", so: "14" },
      { top: "65.5%", left: "63%", c: "#8C5530", ten: "Flora Sky Garden", so: "15" },
      { top: "36%", left: "62.5%", c: "#8C5530", ten: "Visionary Stone Garden", so: "16" },
      { top: "30%", left: "65%", c: "#8C5530", ten: "Inspire Walk", so: "17" },
    ],
    groups: [
      { c: "#FEE000", h3: "Venus Zone", items: [
        { so: "1", ten: "Light of Paradise", sang: true }, { so: "2", ten: "Milky Way", sang: true },
        { so: "3", ten: "EverLove", sang: true },
      ]},
      { c: "#0D7506", h3: "Jupiter Zone", items: [
        { so: "4", ten: "Harmony Park" }, { so: "5", ten: "Herb of Love Garden" }, { so: "6", ten: "Zen Horizon" },
      ]},
      { c: "#0670B8", h3: "Mercury Zone", items: [
        { so: "7", ten: "Viva Inspiration" }, { so: "8", ten: "Rainbow Town" },
        { so: "9", ten: "Angel Island" }, { so: "10", ten: "Sky Dream Mercuria" },
      ]},
      { c: "#D22027", h3: "Mars Zone", items: [
        { so: "11", ten: "Aspira Zone" }, { so: "12", ten: "Edena Rooftop" }, { so: "13", ten: "SkyEnergy Park" },
      ]},
      { c: "#8C5530", h3: "Saturn Zone", items: [
        { so: "14", ten: "Vision Point" }, { so: "15", ten: "Flora Sky Garden" },
        { so: "16", ten: "Visionary Stone Garden" }, { so: "17", ten: "Inspire Walk" },
      ]},
    ],
    photos: [
      { src: `${IMG}/the-aspira-tien-ich-sky-dream-mercuria-tang-thuong.webp`, src800: `${IMG}/the-aspira-tien-ich-sky-dream-mercuria-tang-thuong-800.webp`, w: 1000, h: 487, alt: "Sky Dream Mercuria – cổng vòm cây xanh và bãi cỏ vui chơi trên tầng thượng The Aspira", cap: "Sky Dream Mercuria" },
      { src: `${IMG}/the-aspira-tien-ich-vuon-anh-sang-tang-thuong-ve-dem.webp`, src800: `${IMG}/the-aspira-tien-ich-vuon-anh-sang-tang-thuong-ve-dem-800.webp`, w: 1000, h: 487, alt: "Vườn ánh sáng trên tầng thượng The Aspira về đêm với tượng hươu phát sáng và lối dạo", cap: "Vườn ánh sáng về đêm" },
      { src: `${IMG}/the-aspira-tien-ich-cay-anh-sang-tang-thuong.webp`, src800: `${IMG}/the-aspira-tien-ich-cay-anh-sang-tang-thuong-800.webp`, w: 1000, h: 561, alt: "Cây ánh sáng điêu khắc giữa khu vườn tầng thượng The Aspira, cư dân dạo chơi buổi tối", cap: "Cây ánh sáng" },
      { src: `${IMG}/the-aspira-tien-ich-khu-vui-choi-tre-em-tang-thuong.webp`, src800: `${IMG}/the-aspira-tien-ich-khu-vui-choi-tre-em-tang-thuong-800.webp`, w: 1000, h: 486, alt: "Khu vui chơi nước cho trẻ em trên tầng thượng The Aspira, cầu trượt và vòi phun", cap: "Khu vui chơi trẻ em" },
      { src: `${IMG}/the-aspira-tien-ich-vuon-tang-thuong-hoang-hon.webp`, src800: `${IMG}/the-aspira-tien-ich-vuon-tang-thuong-hoang-hon-800.webp`, w: 1000, h: 562, alt: "Vườn dạo tầng thượng The Aspira lúc chiều tối, đèn chuỗi và sàn gỗ nhìn ra thành phố", cap: "Vườn dạo tầng thượng" },
    ],
  },
];
/* ===== Mặt bằng & loại căn ===== */
export const UNIT_MIX = [
  { p: "11.6%", em: "1PN", b: "140", span: "căn" },
  { p: "7%", em: "1PN+", b: "84", span: "căn" },
  { p: "69.8%", em: "2PN", b: "840", span: "căn · khoảng 70%" },
  { p: "11.6%", em: "2PN+", b: "140", span: "căn" },
  { p: "4%", em: "Shophouse", b: "8", span: "căn khối đế" },
];

export interface UnitType {
  key: string;
  tab: string;
  layout: { src: string; src800?: string; w: number; h: number; alt: string; cap: string };
  em: string;
  h3: string;
  dt?: { gfa: string; nsa: string };
  specs: string[];
  render3d?: { src: string; src800: string; w: number; h: number; alt: string };
  loai: string;
  foot: string;
}

export const UNIT_TYPES: UnitType[] = [
  {
    key: "1pn", tab: "1PN",
    layout: {
      src: `${IMG}/the-aspira-layout-can-1pn-mau-a1.webp`, w: 895, h: 942,
      alt: "Layout căn 1 phòng ngủ The Aspira mẫu A1: tim tường 41,56 m², thông thủy 36,40 m², có ban công",
      cap: "Layout mẫu A1",
    },
    em: "140 căn", h3: "Căn hộ 1 phòng ngủ",
    dt: { gfa: "39,43 – 42,54 m²", nsa: "35,06 – 36,48 m²" },
    specs: [
      "1 phòng ngủ · 1 WC · ban công",
      "Mẫu A1, A1-1, A2",
      "Mẫu A1 tầng 4–30: tim tường 41,56 m², thông thủy 36,40 m²",
      "Tầng 3 có căn kèm sân vườn riêng",
    ],
    render3d: {
      src: `${IMG}/the-aspira-phoi-canh-3d-can-1pn.webp`,
      src800: `${IMG}/the-aspira-phoi-canh-3d-can-1pn-800.webp`,
      w: 900, h: 635,
      alt: "Phối cảnh 3D căn 1 phòng ngủ The Aspira bố trí nội thất: phòng khách, bếp, phòng ngủ và ban công",
    },
    loai: "1PN",
    foot: "Diện tích theo mặt bằng chi tiết trên website chủ đầu tư, có thể chênh lệch theo vị trí căn.",
  },
  {
    key: "1pnp", tab: "1PN+",
    layout: {
      src: `${IMG}/the-aspira-layout-can-1pn-plus-mau-a3.webp`, w: 895, h: 943,
      alt: "Layout căn 1PN+ The Aspira mẫu A3: tim tường 54,15 m², thông thủy 49,15 m², có phòng đa năng",
      cap: "Layout mẫu A3",
    },
    em: "84 căn", h3: "Căn hộ 1PN+",
    dt: { gfa: "54,15 – 57,13 m²", nsa: "49,09 – 51,26 m²" },
    specs: [
      "1 phòng ngủ + 1 phòng đa năng · 1 WC · ban công",
      "Mẫu A3, A3-1",
      "Mẫu A3 tầng 4–30: tim tường 54,15 m², thông thủy 49,15 m²",
    ],
    render3d: {
      src: `${IMG}/the-aspira-phoi-canh-3d-can-1pn-plus.webp`,
      src800: `${IMG}/the-aspira-phoi-canh-3d-can-1pn-plus-800.webp`,
      w: 900, h: 634,
      alt: "Phối cảnh 3D căn 1PN+ The Aspira: phòng ngủ, phòng đa năng, khách bếp liền mạch và ban công",
    },
    loai: "1PN+",
    foot: "Diện tích theo mặt bằng chi tiết trên website chủ đầu tư, có thể chênh lệch theo vị trí căn.",
  },
  {
    key: "2pn", tab: "2PN",
    layout: {
      src: `${IMG}/the-aspira-layout-can-2pn-mau-b3.webp`, w: 896, h: 942,
      alt: "Layout căn 2 phòng ngủ 2 WC The Aspira mẫu B3: tim tường 67,66 m², thông thủy 61,15 m²",
      cap: "Layout mẫu B3",
    },
    em: "840 căn · khoảng 70%", h3: "Căn hộ 2 phòng ngủ",
    dt: { gfa: "64,35 – 69,44 m²", nsa: "58,12 – 62,28 m²" },
    specs: [
      "2 phòng ngủ · 2 WC · ban công",
      "Mẫu B1, B2, B3, B4 và các biến thể",
      "Mẫu B3 tầng 4–30: tim tường 67,66 m², thông thủy 61,15 m²",
      "Tầng 3 có căn kèm sân vườn riêng",
    ],
    render3d: {
      src: `${IMG}/the-aspira-phoi-canh-3d-can-2pn.webp`,
      src800: `${IMG}/the-aspira-phoi-canh-3d-can-2pn-800.webp`,
      w: 900, h: 635,
      alt: "Phối cảnh 3D căn 2 phòng ngủ The Aspira mẫu B3 với 2 WC, bếp và ban công",
    },
    loai: "2PN",
    foot: "Diện tích theo mặt bằng chi tiết trên website chủ đầu tư, có thể chênh lệch theo vị trí căn.",
  },
  {
    key: "2pnp", tab: "2PN+",
    layout: {
      src: `${IMG}/the-aspira-layout-can-2pn-plus-mau-c3.webp`, w: 895, h: 942,
      alt: "Layout căn 2PN+ The Aspira mẫu C3: tim tường 80,75 m², thông thủy 72,38 m²",
      cap: "Layout mẫu C3",
    },
    em: "140 căn", h3: "Căn hộ 2PN+",
    dt: { gfa: "80,75 – 83,72 m²", nsa: "71,89 – 75,63 m²" },
    specs: [
      "2 phòng ngủ + 1 phòng đa năng · 2 WC · ban công",
      "Mẫu C1, C2, C2-1, C3, C3-1",
      "Mẫu C3 tầng 4–30: tim tường 80,75 m², thông thủy 72,38 m²",
    ],
    render3d: {
      src: `${IMG}/the-aspira-phoi-canh-3d-can-2pn-plus.webp`,
      src800: `${IMG}/the-aspira-phoi-canh-3d-can-2pn-plus-800.webp`,
      w: 900, h: 635,
      alt: "Phối cảnh 3D căn 2PN+ The Aspira mẫu C3, 2 phòng ngủ, phòng đa năng và ban công dài",
    },
    loai: "2PN+",
    foot: "Diện tích theo mặt bằng chi tiết trên website chủ đầu tư, có thể chênh lệch theo vị trí căn.",
  },
  {
    key: "sh", tab: "Shophouse",
    layout: {
      src: `${IMG}/the-aspira-shophouse-khoi-de-mat-tien.webp`,
      src800: `${IMG}/the-aspira-shophouse-khoi-de-mat-tien-800.webp`,
      w: 1000, h: 529,
      alt: "Shophouse khối đế The Aspira mặt tiền đường, kính trong suốt và vỉa hè kinh doanh",
      cap: "Shophouse khối đế",
    },
    em: "8 căn", h3: "Shophouse khối đế",
    specs: [
      "Nằm trong 2 tầng thương mại khối đế",
      "Mặt tiền đường, vỉa hè kinh doanh",
      "Kết nối chuỗi tiện ích Solink Point: Co-Working Hub, Home Mart",
    ],
    loai: "Shophouse",
    foot: "Diện tích và giá shophouse: để lại thông tin, chuyên viên ERA Vietnam gửi chi tiết.",
  },
];

export const DESIGN_PLUS: ReactNode[] = [
  <><b>100% căn có ban công</b>, đón sáng tự nhiên</>,
  <><b>Smart Home</b> · Smart Building</>,
  <>Thiết bị <b>Häfele</b></>,
  <>Gỗ <b>An Cường</b></>,
];

export const DESIGN_ICONS: ReactNode[] = [
  (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" /></>),
  (<><path d="M3 11 12 4l9 7v9H3Z" /><path d="M9 20v-5h6v5M12 9v.01" /></>),
  (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16M9 14h6" /></>),
  (<><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" /></>),
];

export const FLOOR_PLANS = [
  {
    key: "t430", tab: "Tầng 4 – 30",
    src: `${IMG}/the-aspira-mat-bang-tang-dien-hinh-4-30.webp`,
    zoom: `${IMG}/the-aspira-mat-bang-tang-dien-hinh-4-30-lon.webp`,
    w: 1400, h: 674,
    alt: "Mặt bằng tầng điển hình 4–30 The Aspira: 2 tháp Sunara và Moonara, 23 căn mỗi tháp mỗi tầng",
  },
  {
    key: "t3", tab: "Tầng 3",
    src: `${IMG}/the-aspira-mat-bang-tang-3.webp`,
    zoom: `${IMG}/the-aspira-mat-bang-tang-3-lon.webp`,
    w: 1400, h: 674,
    alt: "Mặt bằng tầng 3 The Aspira: căn hộ có sân vườn riêng nhìn xuống hồ bơi và vườn nội khu",
  },
];

/* ===== Thư viện ===== */
export const GALLERY_PHOTOS = [
  { src: `${IMG}/the-aspira-phoi-canh-toan-khu-ho-boi-noi-khu-800.webp`, w: 800, h: 449, alt: "Phối cảnh The Aspira giữa khu dân cư Tân Đông Hiệp, 2 tháp 30 tầng và hồ bơi nội khu" },
  { src: `${IMG}/the-aspira-phoi-canh-2-thap-ve-dem-800.webp`, w: 800, h: 707, alt: "2 tháp The Aspira sáng đèn về đêm nhìn từ lối vào chính" },
  { src: `${IMG}/the-aspira-vi-tri-tuyen-metro-so-1-keo-dai-800.webp`, w: 800, h: 389, alt: "The Aspira giữa khu dân cư hiện hữu, tuyến Metro số 1 kéo dài chạy ngang theo quy hoạch" },
  { src: `${IMG}/the-aspira-tien-ich-ho-boi-flamenco-ve-dem-800.webp`, w: 800, h: 389, alt: "Hồ bơi Flamenco Pool The Aspira về đêm nhìn từ trên cao" },
  { src: `${IMG}/the-aspira-tien-ich-chuoi-shophouse-mat-duong-800.webp`, w: 800, h: 389, alt: "Khối đế thương mại The Aspira nhìn từ mặt đường" },
  { src: `${IMG}/the-aspira-tien-ich-vuon-anh-sang-tang-thuong-ve-dem-800.webp`, w: 800, h: 390, alt: "Vườn ánh sáng tầng thượng The Aspira lúc đêm" },
  { src: `${IMG}/the-aspira-tien-ich-sky-dream-mercuria-tang-thuong-800.webp`, w: 800, h: 390, alt: "Sky Dream Mercuria trên tầng thượng The Aspira ban ngày" },
  { src: `${IMG}/the-aspira-tien-ich-cay-anh-sang-tang-thuong-800.webp`, w: 800, h: 449, alt: "Cây ánh sáng giữa vườn tầng thượng The Aspira buổi tối" },
  { src: `${IMG}/the-aspira-tien-ich-khu-vui-choi-tre-em-tang-thuong-800.webp`, w: 800, h: 389, alt: "Khu vui chơi nước cho trẻ em trên tầng thượng The Aspira" },
];

export const DOCS = [
  { b: "Brochure The Aspira", span: "Tổng quan dự án, tiện ích và thiết kế căn hộ." },
  { b: "Mặt bằng căn chi tiết", span: "Mặt bằng từng mẫu căn 1PN đến 2PN+, tầng 3 và tầng 4–30." },
  { b: "Bảng tính dòng tiền", span: "Trả góp theo thu nhập, theo chính sách bán hàng hiện hành." },
];

export const TOUR_360_LINK = "https://360.theaspira.vn/";

/* ===== Tiến độ ===== */
export const MILESTONES = [
  { b: "10/2024", span: "Khởi công dự án", xong: true },
  { b: "10/2025", span: "Thi công đến tầng 11", xong: true },
  { b: "12/2025", span: "Đạt 19/30 tầng · nhận chứng chỉ công trình xanh EDGE (19/12/2025)", xong: true },
  { b: "10/4/2026", span: "Cất nóc – sớm 30 ngày so với kế hoạch", xong: true },
  { b: "Quý II/2027", span: "Dự kiến bàn giao", xong: false },
];

export const PROGRESS_PHOTOS = [
  { src: `${IMG}/the-aspira-tien-do-le-cat-noc-10-4-2026.webp`, src800: `${IMG}/the-aspira-tien-do-le-cat-noc-10-4-2026-800.webp`, w: 800, h: 533, alt: "Lễ cất nóc The Aspira ngày 10/4/2026 tại công trường, sớm 30 ngày so với kế hoạch", cap: (<><b>10/4/2026</b> · Lễ cất nóc</>) },
  { src: `${IMG}/the-aspira-tien-do-chung-chi-edge-19-12-2025.webp`, src800: `${IMG}/the-aspira-tien-do-chung-chi-edge-19-12-2025-800.webp`, w: 800, h: 514, alt: "The Aspira nhận chứng chỉ công trình xanh EDGE tại Diễn đàn VSCF ngày 19/12/2025", cap: (<><b>19/12/2025</b> · Nhận chứng chỉ EDGE</>) },
  { src: `${IMG}/the-aspira-tien-do-thi-cong-thang-10-2025.webp`, src800: `${IMG}/the-aspira-tien-do-thi-cong-thang-10-2025-800.webp`, w: 800, h: 449, alt: "Công trường The Aspira tháng 10/2025: 2 tháp thi công vượt tầng 9 giữa khu dân cư Tân Đông Hiệp", cap: (<><b>10/2025</b> · Công trường từ trên cao</>) },
  { src: `${IMG}/the-aspira-tien-do-cong-truong-bang-tien-do.webp`, src800: `${IMG}/the-aspira-tien-do-cong-truong-bang-tien-do-800.webp`, w: 800, h: 535, alt: "Bảng cập nhật tiến độ trên công trường The Aspira, phía sau là khu dân cư hiện hữu", cap: (<><b>2025</b> · Bảng tiến độ công trường</>) },
];

/* ===== Nhà mẫu ===== */
export interface Showroom {
  key: string;
  tab: string;
  em: string;
  h3: string;
  specs: string[];
  photos: { lon: string; src800: string; nho: string; w: number; h: number; alt: string }[];
}

export const SHOWROOMS: Showroom[] = [
  {
    key: "st", tab: "Studio",
    em: "Phong cách Fusion", h3: "Căn hộ Studio",
    specs: ["1 phòng ngủ · 1 WC", "Bếp từ, chậu rửa thương hiệu Häfele"],
    photos: [
      { lon: `${IMG}/the-aspira-nha-mau-can-studio-fusion.webp`, src800: `${IMG}/the-aspira-nha-mau-can-studio-fusion-800.webp`, nho: `${IMG}/the-aspira-nha-mau-can-studio-fusion-nho.webp`, w: 1280, h: 719, alt: "Nhà mẫu căn hộ Studio The Aspira phong cách Fusion: 1 phòng ngủ, 1 WC" },
      { lon: `${IMG}/the-aspira-nha-mau-studio-toan-can.webp`, src800: `${IMG}/the-aspira-nha-mau-studio-toan-can-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-studio-toan-can-nho.webp`, w: 1280, h: 719, alt: "Toàn cảnh căn Studio The Aspira nhìn về cửa chính, bếp dọc tường, sàn đá bóng" },
      { lon: `${IMG}/the-aspira-nha-mau-studio-bep-cua-so.webp`, src800: `${IMG}/the-aspira-nha-mau-studio-bep-cua-so-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-studio-bep-cua-so-nho.webp`, w: 1280, h: 719, alt: "Bếp và phòng khách căn Studio The Aspira nhìn ra cửa kính ban công" },
      { lon: `${IMG}/the-aspira-nha-mau-studio-bep-tu-chau-rua.webp`, src800: `${IMG}/the-aspira-nha-mau-studio-bep-tu-chau-rua-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-studio-bep-tu-chau-rua-nho.webp`, w: 1280, h: 719, alt: "Chậu rửa inox và bếp từ Häfele bàn giao căn Studio The Aspira" },
    ],
  },
  {
    key: "2pn", tab: "2PN",
    em: "Phong cách Contemporary", h3: "Căn hộ 2PN",
    specs: ["2 phòng ngủ · 2 WC", "Thiết bị bếp, thiết bị vệ sinh thương hiệu Häfele"],
    photos: [
      { lon: `${IMG}/the-aspira-nha-mau-can-2pn-contemporary.webp`, src800: `${IMG}/the-aspira-nha-mau-can-2pn-contemporary-800.webp`, nho: `${IMG}/the-aspira-nha-mau-can-2pn-contemporary-nho.webp`, w: 1280, h: 718, alt: "Nhà mẫu căn hộ 2PN The Aspira phong cách Contemporary: 2 phòng ngủ, 2 WC" },
      { lon: `${IMG}/the-aspira-nha-mau-2pn-phong-khach-bep.webp`, src800: `${IMG}/the-aspira-nha-mau-2pn-phong-khach-bep-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-2pn-phong-khach-bep-nho.webp`, w: 1280, h: 718, alt: "Phòng khách và bếp căn 2PN The Aspira, sàn đá vân trắng, nhìn ra cửa sổ" },
      { lon: `${IMG}/the-aspira-nha-mau-2pn-loi-vao-hanh-lang.webp`, src800: `${IMG}/the-aspira-nha-mau-2pn-loi-vao-hanh-lang-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-2pn-loi-vao-hanh-lang-nho.webp`, w: 1280, h: 718, alt: "Hành lang căn 2PN The Aspira: cửa gỗ hai phòng ngủ, bếp và cửa chính cuối nhà" },
      { lon: `${IMG}/the-aspira-nha-mau-2pn-phong-ngu.webp`, src800: `${IMG}/the-aspira-nha-mau-2pn-phong-ngu-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-2pn-phong-ngu-nho.webp`, w: 1280, h: 718, alt: "Phòng ngủ căn 2PN The Aspira sàn gỗ, tường trắng" },
      { lon: `${IMG}/the-aspira-nha-mau-2pn-thiet-bi-hafele.webp`, src800: `${IMG}/the-aspira-nha-mau-2pn-thiet-bi-hafele-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-2pn-thiet-bi-hafele-nho.webp`, w: 1280, h: 718, alt: "Thiết bị vệ sinh, chậu rửa và bếp từ Häfele bàn giao căn 2PN The Aspira" },
    ],
  },
  {
    key: "2pnp", tab: "2PN+",
    em: "Phong cách Urban", h3: "Căn hộ 2PN+",
    specs: ["2 phòng ngủ + 1 phòng đa năng · 2 WC", "Thiết bị bếp, thiết bị vệ sinh thương hiệu Häfele"],
    photos: [
      { lon: `${IMG}/the-aspira-nha-mau-can-2pn-plus-urban.webp`, src800: `${IMG}/the-aspira-nha-mau-can-2pn-plus-urban-800.webp`, nho: `${IMG}/the-aspira-nha-mau-can-2pn-plus-urban-nho.webp`, w: 1280, h: 719, alt: "Nhà mẫu căn hộ 2PN+ The Aspira phong cách Urban: 2 phòng ngủ, 2 WC, 1 phòng đa năng" },
      { lon: `${IMG}/the-aspira-nha-mau-2pn-plus-phong-khach-lien-bep.webp`, src800: `${IMG}/the-aspira-nha-mau-2pn-plus-phong-khach-lien-bep-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-2pn-plus-phong-khach-lien-bep-nho.webp`, w: 1280, h: 719, alt: "Phòng khách liền bếp căn 2PN+ The Aspira, sàn đá bóng, trần thạch cao đèn âm" },
      { lon: `${IMG}/the-aspira-nha-mau-2pn-plus-bep-chu-l.webp`, src800: `${IMG}/the-aspira-nha-mau-2pn-plus-bep-chu-l-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-2pn-plus-bep-chu-l-nho.webp`, w: 1280, h: 719, alt: "Bếp chữ L căn 2PN+ The Aspira: tủ bếp trên dưới, bếp từ, chậu rửa đôi, kính ốp tường" },
      { lon: `${IMG}/the-aspira-nha-mau-2pn-plus-phong-ngu.webp`, src800: `${IMG}/the-aspira-nha-mau-2pn-plus-phong-ngu-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-2pn-plus-phong-ngu-nho.webp`, w: 1280, h: 719, alt: "Phòng ngủ căn 2PN+ The Aspira sàn gỗ, cửa sổ lấy sáng tự nhiên" },
      { lon: `${IMG}/the-aspira-nha-mau-2pn-plus-phong-ngu-goc.webp`, src800: `${IMG}/the-aspira-nha-mau-2pn-plus-phong-ngu-goc-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-2pn-plus-phong-ngu-goc-nho.webp`, w: 1280, h: 719, alt: "Phòng ngủ góc căn 2PN+ The Aspira, cửa sổ hai mặt" },
      { lon: `${IMG}/the-aspira-nha-mau-2pn-plus-thiet-bi-hafele.webp`, src800: `${IMG}/the-aspira-nha-mau-2pn-plus-thiet-bi-hafele-nho.webp`, nho: `${IMG}/the-aspira-nha-mau-2pn-plus-thiet-bi-hafele-nho.webp`, w: 1280, h: 719, alt: "Thiết bị vệ sinh và bếp từ thương hiệu Häfele bàn giao căn 2PN+ The Aspira" },
    ],
  },
];

/* ===== Chính sách ===== */
export const POLICY_CARDS = [
  { b: (<>20<small>%</small></>), span: "Khách hàng thanh toán 20%, ngân hàng cho vay tới 80%" },
  { b: (<>24<small> tháng</small></>), span: "Hỗ trợ lãi suất 24 tháng, ân hạn nợ gốc tới 6 năm" },
  { b: (<>6,8<small> triệu/tháng</small></>), span: "Trả góp chỉ từ 6,8 triệu đồng mỗi tháng" },
  { b: (<>8<small>%</small></>), span: "Thanh toán nhanh: chiết khấu đến 8%" },
  { b: (<>80<small> triệu</small></>), span: "Tặng gói Smart Home trị giá 80 triệu đồng" },
  { b: (<>12<small> tháng</small></>), span: "Tặng 12 tháng phí quản lý" },
];

/* ===== Đối tác ===== */
export interface Partner { logo?: { src: string; w: number; h: number; alt: string }; textLogo?: string; i: string; b: string }
export const PARTNERS: Partner[] = [
  { logo: { src: `${IMG}/the-aspira-doi-tac-tong-thau-decofi.webp`, w: 360, h: 301, alt: "Logo DECOFI – tổng thầu xây dựng The Aspira" }, i: "Tổng thầu", b: "DECOFI" },
  { logo: { src: `${IMG}/the-aspira-doi-tac-ngan-hang-nam-a-bank.webp`, w: 360, h: 72, alt: "Logo Nam Á Bank – ngân hàng đồng hành dự án The Aspira" }, i: "Ngân hàng", b: "Nam Á Bank" },
  { textLogo: "CBRE", i: "Tư vấn vận hành", b: "CBRE" },
  { logo: { src: `${IMG}/the-aspira-doi-tac-thiet-ke-y-tuong-kume.webp`, w: 300, h: 426, alt: "Logo KUME Design Asia – thiết kế ý tưởng The Aspira" }, i: "Thiết kế ý tưởng", b: "KUME" },
  { logo: { src: `${IMG}/the-aspira-doi-tac-kien-truc-dp-consulting.webp`, w: 360, h: 123, alt: "Logo DP Consulting – thiết kế kiến trúc The Aspira" }, i: "Kiến trúc", b: "DP Consulting" },
  { logo: { src: `${IMG}/the-aspira-doi-tac-ket-cau-pmdc.webp`, w: 360, h: 149, alt: "Logo PMDC – thiết kế kết cấu The Aspira" }, i: "Kết cấu", b: "PMDC" },
  { logo: { src: `${IMG}/the-aspira-doi-tac-co-dien-hme.webp`, w: 360, h: 241, alt: "Logo HME – thiết kế cơ điện The Aspira" }, i: "Cơ điện", b: "HME" },
  { logo: { src: `${IMG}/the-aspira-doi-tac-noi-that-vertical-studio.webp`, w: 360, h: 67, alt: "Logo Vertical Studio – thiết kế nội thất The Aspira" }, i: "Nội thất", b: "Vertical Studio" },
  { logo: { src: `${IMG}/the-aspira-doi-tac-canh-quan-oasis-concept.webp`, w: 360, h: 117, alt: "Logo Oasis Concept – thiết kế cảnh quan The Aspira" }, i: "Cảnh quan", b: "Oasis Concept" },
  { logo: { src: `${IMG}/the-aspira-doi-tac-quy-hoach-kien-xanh.webp`, w: 300, h: 229, alt: "Logo Kiến Xanh – thiết kế quy hoạch The Aspira" }, i: "Quy hoạch", b: "Kiến Xanh" },
];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "The Aspira nằm ở đâu?",
    a: "The Aspira nằm trên đường Nguyễn Thị Minh Khai, phường Tân Đông Hiệp, TP.HCM (trước ngày 1/7/2025 thuộc phường Tân Bình, TP. Dĩ An, tỉnh Bình Dương), gần Quốc lộ 1K, Mỹ Phước – Tân Vạn và trong vùng phát triển TOD quanh ga S12 – S13 của tuyến Metro số 1 kéo dài (theo quy hoạch).",
  },
  {
    q: "Chủ đầu tư dự án The Aspira là ai?",
    a: "Chủ đầu tư The Aspira là Công ty TNHH Đầu tư Bất động sản Phúc An Gia, đơn vị phát triển là Công ty Cổ phần Đầu tư Sài Gòn High Rise. Tổng thầu là DECOFI, ngân hàng đồng hành là Nam Á Bank.",
  },
  {
    q: "The Aspira có bao nhiêu căn hộ và những loại căn nào?",
    a: "The Aspira có 1.212 sản phẩm gồm 1.204 căn hộ và 8 shophouse. Cơ cấu căn hộ: 140 căn 1PN, 84 căn 1PN+, 840 căn 2PN (khoảng 70%) và 140 căn 2PN+.",
  },
  {
    q: "Diện tích căn hộ The Aspira bao nhiêu m²?",
    a: "Theo mặt bằng chi tiết của chủ đầu tư, diện tích thông thủy căn 1PN khoảng 35,06 – 36,48 m², 1PN+ khoảng 49,09 – 51,26 m², 2PN khoảng 58,12 – 62,28 m² và 2PN+ khoảng 71,89 – 75,63 m². 100% căn hộ có ban công.",
  },
  {
    q: "Giá căn hộ The Aspira bao nhiêu?",
    a: "Giá tham khảo The Aspira từ khoảng 37,9 triệu đồng/m². Theo thông tin báo chí tháng 4/2026, khách hàng thanh toán 20%, ngân hàng cho vay tới 80%, hỗ trợ lãi suất 24 tháng và ân hạn nợ gốc tới 6 năm. Bảng giá từng căn theo công bố của chủ đầu tư tại thờI điểm giao dịch.",
  },
  {
    q: "Khi nào The Aspira bàn giao?",
    a: "The Aspira khởi công tháng 10/2024, cất nóc ngày 10/4/2026 (sớm 30 ngày so với kế hoạch) và dự kiến bàn giao Quý II/2027.",
  },
  {
    q: "The Aspira có những tiện ích gì?",
    a: "The Aspira có 21 tiện ích tầng trệt (hồ bơi Flamenco Pool, Revive Gym, Kids' Funny Park, vườn Thiền Uyển, Co-Working Hub, chuỗi shophouse…) và 17 tiện ích tầng thượng chia thành 5 cụm Venus, Jupiter, Mercury, Mars và Saturn Zone.",
  },
];

/* ===== CTA form ===== */
export const PRODUCT_TYPES = ["1PN", "1PN+", "2PN", "2PN+", "Shophouse"];

export const CTA = {
  lead: "Nhận bảng giá, mặt bằng căn và bảng tính trả góp theo thu nhập từ chuyên viên ERA Vietnam.",
  bullets: [
    "Bảng giá căn hộ và chính sách bán hàng mới nhất",
    "Mặt bằng căn chi tiết từng mẫu",
    "Bảng tính trả góp theo thu nhập",
  ],
  loaiChips: ["1PN", "1PN+", "2PN", "2PN+", "Shophouse"],
  ket: "Chuyên viên ERA gọi lại gửi bảng giá, bảng tính dòng tiền và hẹn lịch tham quan.",
  formTitle: "Nhận báo giá The Aspira",
  formSub: "Bảng giá, mặt bằng căn và bảng tính trả góp theo thu nhập · Bảo mật thông tin",
};
