import type { ReactNode } from "react";
import { IMG } from "./theme";

/* ===== Hero ===== */
export const HERO_FACTS = [
  { b: "1.785", span: "Căn hộ" },
  { b: "4", span: "Tòa tháp" },
  { b: "36–40", span: "Tầng" },
  { b: "Lâu dài", span: "Sở hữu" },
];

/* ===== Tổng quan ===== */
export const OVERVIEW_FACT =
  "Beachtro Tower được định vị là phân khu cao tầng sở hữu lâu dài cuối cùng trong lòng đại đô thị Blanca City, Vũng Tàu. Kết hợp không gian lưu trú hiện đại với hệ sinh thái vui chơi giải trí của Sun Group, Beachtro Tower vừa là chốn an cư – second-home ven biển, vừa là tài sản có thể khai thác lưu trú cho thuê.";

export const OVERVIEW_STATS = [
  { b: "1.785", span: "Căn hộ" },
  { b: "4", span: "Tòa tháp E6 – E9" },
  { b: "3", span: "Tầng hầm để xe" },
  { b: "4", span: "Mặt view panorama" },
];

export const SPEC_ROWS: { label: string; value: ReactNode }[] = [
  { label: "Tên dự án", value: (<>
      <b className="hl">Beachtro Tower</b>
      <small>Phân khu cao tầng thuộc đại đô thị Blanca City</small>
    </>) },
  { label: "Vị trí", value: (<>
      Đường 3 Tháng 2, phường Rạch Dừa và phường Phước Thắng, Vũng Tàu, TP. Hồ Chí Minh
      <small>Trong lòng Blanca City, liền kề công viên Whale Park 2,3 ha</small>
    </>) },
  { label: "Chủ đầu tư", value: (<>
      Tập đoàn Sun Group
      <small>Đơn vị phát triển: Sun Property – thành viên Tập đoàn Sun Group</small>
    </>) },
  { label: "Thiết kế cảnh quan", value: (<>
      Kume Design Asia
      <small>Thuộc Kume Sekkei Group</small>
    </>) },
  { label: "Quy mô", value: (<>
      <b className="hl">1.785 căn hộ</b>
      <small>3 tầng hầm để xe</small>
    </>) },
  { label: "Kết cấu", value: "4 tòa tháp: E6, E7 cao 36 tầng · E8 cao 38 tầng (537 căn) · E9 cao 40 tầng (506 căn)" },
  { label: "Loại hình", value: "Studio, 1BR+, 2BR, 2BR+, 3BR, 3BR+" },
  { label: "Diện tích tham khảo", value: (<>
      Studio 35,7 – 37,9 m² · 1BR+ 55 – 56,1 m² · 2BR+ 81,3 – 82,3 m²
      <small>Chi tiết từng mẫu căn (thông thủy / tim tường) ở mục Mặt bằng</small>
    </>) },
  { label: "Tầm nhìn", value: "4 mặt view panorama: sân golf Paradise · biển Bãi Trước & nội khu · biển Bãi Sau & Sun World · Beacon Tower" },
  { label: "Nhận nhà dự kiến", value: (<>
      <b className="hl">31/08/2028</b>
      <small>Theo chính sách bán hàng CSBH02.2 của chủ đầu tư</small>
    </>) },
  { label: "Pháp lý", value: "Sở hữu lâu dài" },
];

export const REASONS = [
  { b: "1", strong: "Cơ hội cuối cùng", span: "Tổ hợp tòa tháp sở hữu lâu dài cuối cùng tại Blanca City." },
  { b: "2", strong: "Mặt tiền", span: "Một mặt ôm trọn biển Bãi Sau, một mặt tiếp giáp đại lộ 3 Tháng 2." },
  { b: "3", strong: "Tầng hầm", span: "Hệ thống 3 tầng hầm đáp ứng nhu cầu đỗ xe và vận hành tiện nghi cho cư dân." },
  { b: "4", strong: "Mặt công viên", span: "Bao quanh bởi Whale Park, Central Park, Sport Park và Sea Soul Park." },
  { b: "5", strong: "Giác quan", span: "Đánh thức trọn vẹn 5 giác quan giữa miền nhiệt đới bên biển." },
  { b: "6", strong: "Tầng tiện ích", span: "Hệ tiện ích đặc quyền trải dài từ thấp đến cao – Tro Collection." },
];

/* ===== Video ===== */
export const YT_ID = "hCIUmY984Zs";
export const VIDEO_PARAS = [
  "Giữa biển trờI Bãi Sau, Beachtro Tower mở ra bộ sưu tập 1.785 căn hộ mặt biển sở hữu lâu dài cuối cùng tại Blanca City – nơi biển xanh, thiên nhiên nhiệt đới và thế giới giải trí cùng hiện diện trong một phong cách sống khác biệt.",
  "Một mặt ôm trọn biển Bãi Sau, một mặt tựa đại lộ 3 Tháng 2, Beachtro Tower kết nối với 4 dải công viên, Sun World, trung tâm thương mại mặt biển cùng hệ tiện ích Tro Collection độc bản. Không gian sáng tạo DyHome mở ra một khoảng trắng để mỗi chủ nhân tự do định nghĩa tổ ấm theo cá tính riêng.",
  "Với đặc quyền sở hữu lâu dài bên biển Bãi Sau, Beachtro Tower không chỉ là nơi để tận hưởng, mà còn mang giá trị của một tài sản truyền đờI, cùng cơ hội khai thác lưu trú theo thờI gian.",
  "Beachtro Tower – Sống trọn sắc riêng, bên biển nhiệt đới.",
];

export const LIVINGS = [
  { i: "Beachtro Living · 1", b: "Resort Living", span: "Mỗi ngày là một kỳ nghỉ: thức giấc cùng sóng vỗ rì rào, chạm đặc quyền nghỉ dưỡng ngay ngưỡng cửa." },
  { i: "Beachtro Living · 2", b: "Festival Living", span: "Vũ trụ giải trí sôi động ngày đêm: hòa vào lễ hội rực rỡ, nhịp sống phồn hoa suốt 365 ngày." },
  { i: "Beachtro Living · 3", b: "Freedom Living", span: "Không gian sáng tạo bản sắc riêng: tự do biến hóa tọa độ riêng thành tuyên ngôn cá tính độc bản." },
];

/* ===== Vị trí ===== */
export const LOCATION_FACT =
  "Beachtro Tower nằm ở trung tâm đại đô thị Blanca City trên đường 3 Tháng 2, phường Rạch Dừa và phường Phước Thắng, Vũng Tàu (TP. Hồ Chí Minh) – môi trường sống sinh thái trong lành mà vẫn kết nối nhanh tới các trung tâm kinh tế lân cận, đón dòng du khách đổ về thành phố biển mỗi dịp cuối tuần và lễ tết.";

export const TRAVEL_TIMES = [
  { b: (<>02<small>phút</small></>), span: "Sun World, trung tâm thương mại mặt biển & biển Bãi Sau" },
  { b: (<>02<small>phút</small></>), span: "Hệ thống công viên, tiện ích thể thao và trải nghiệm nội khu" },
  { b: (<>45<small>phút</small></>), span: "Sân bay Long Thành" },
  { b: (<>70<small>phút</small></>), span: "Trung tâm TP. Hồ Chí Minh" },
];

export const ECOSYSTEM = [
  { b: "Trung tâm thương mại mặt biển 5 ha", span: "Trải dài dọc biển Bãi Sau, cùng các tuyến phố thương mại sầm uất" },
  { b: "Sun World Vũng Tàu 15 ha", span: "Công viên giải trí ngập không khí lễ hội, pháo hoa và lễ hội biển quanh năm" },
  { b: "Khách sạn 5 sao chuẩn quốc tế", span: "Dịch vụ lưu trú cao cấp ngay trong đô thị" },
  { b: "Tổ hợp trường học & công trình y tế", span: "Bố trí trong quy hoạch Blanca City, phục vụ cư dân" },
  { b: "1 km bờ biển riêng · 8 công viên nội khu", span: "Coastal Park, Whale Park, Central Park, Sport Park, Sea Soul Park…" },
];

export const ECOSYSTEM_BODY =
  "Cư dân Beachtro Tower sử dụng trực tiếp hàng loạt công trình biểu tượng của Blanca City – điều kiện để căn hộ thu hút khách thuê lưu trú ngắn hạn và dài hạn.";

/* ===== Tiện ích nội khu ===== */
export const AMENITY_FACT =
  "Lấy cảm hứng từ triết lý “5 Golden Hours” – 5 giờ vàng thực sự thuộc về bạn giữa vòng tròn 24 giờ, Beachtro Tower được thiết kế hệ tiện ích “đo ni đóng giày” trải dài từ mặt đất lên tầng cao, để nghỉ dưỡng và tái tạo năng lượng ngay tại ngưỡng cửa.";

export interface AccSlide { src: string; src800: string; w: number; h: number; alt: string; ten: string; mo: string }
export const ACC_SLIDES: AccSlide[] = [
  {
    src: `${IMG}/beachtro-tower-tro-oasis-pool-bar.webp`,
    src800: `${IMG}/beachtro-tower-tro-oasis-pool-bar-800.webp`,
    w: 1000, h: 562,
    alt: "Tro Oasis Pool tại Beachtro Tower: bể bơi ốc đảo có quầy pool bar dưới mái vòm, cư dân thư giãn bên làn nước",
    ten: "Tro Oasis Pool", mo: "Bể bơi ốc đảo nghỉ dưỡng có pool bar – tầng 1.",
  },
  {
    src: `${IMG}/beachtro-tower-be-boi-vuon-nhiet-doi.webp`,
    src800: `${IMG}/beachtro-tower-be-boi-vuon-nhiet-doi-800.webp`,
    w: 1000, h: 562,
    alt: "Bể bơi giữa vườn nhiệt đới dưới chân tháp Beachtro Tower lúc hoàng hôn",
    ten: "Bể bơi vườn nhiệt đới", mo: "Làn nước giữa hàng cọ dưới chân tháp.",
  },
  {
    src: `${IMG}/beachtro-tower-water-playground-cho-be.webp`,
    src800: `${IMG}/beachtro-tower-water-playground-cho-be-800.webp`,
    w: 1000, h: 558,
    alt: "Bể bơi và khu vui chơi nước Water Playground tại Beachtro Tower với phao hồng hạc, cây cọ và hoa nhiệt đới",
    ten: "Water Playground", mo: "Khu vui chơi nước cho cư dân nhí.",
  },
  {
    src: `${IMG}/beachtro-tower-bbq-garden-tren-cao.webp`,
    src800: `${IMG}/beachtro-tower-bbq-garden-tren-cao-800.webp`,
    w: 1000, h: 562,
    alt: "BBQ Garden trên cao tại Beachtro Tower: bàn tiệc nướng ngoài trờI dưới giàn che, nhìn ra núi và hoàng hôn",
    ten: "BBQ Garden trên cao", mo: "Tiệc nướng ngoài trờI ngắm hoàng hôn – Tro Play.",
  },
  {
    src: `${IMG}/beachtro-tower-vuon-ho-boi-khoi-de-tren-cao.webp`,
    src800: `${IMG}/beachtro-tower-vuon-ho-boi-khoi-de-tren-cao-800.webp`,
    w: 1000, h: 558,
    alt: "Khối đế Beachtro Tower nhìn từ trên cao: bể bơi tự do, vườn liên hoàn và lối dạo giữa các tòa tháp",
    ten: "Vườn liên hoàn 6 chủ đề", mo: "Nghỉ dưỡng, vọng cảnh, thư giãn, sum vầy, đại dương, sáng tạo.",
  },
  {
    src: `${IMG}/beachtro-tower-cong-chao-tro-chill.webp`,
    src800: `${IMG}/beachtro-tower-cong-chao-tro-chill-800.webp`,
    w: 1000, h: 558,
    alt: "Cổng chào Beachtro Tower với bồn hoa nhiệt đới và vườn thư giãn trước sảnh tòa tháp về đêm",
    ten: "Cổng chào Tro Chill", mo: "Cổng chào kết hợp vườn thư giãn Flow Hi Garden.",
  },
  {
    src: `${IMG}/beachtro-tower-canh-quan-giua-cac-toa.webp`,
    src800: `${IMG}/beachtro-tower-canh-quan-giua-cac-toa-800.webp`,
    w: 1000, h: 562,
    alt: "Cảnh quan giữa các tòa Beachtro Tower: suối cảnh, lối dạo và khối đế thương mại sôi động",
    ten: "Cảnh quan giữa các tòa", mo: "Suối cảnh, lối dạo và khối đế thương mại.",
  },
];

export const FLOOR_AMENITIES = [
  { t: "Tầng 1", b: "Tro Chill & Tro Oasis Pool", span: "Cổng chào kết hợp vườn thư giãn Flow Hi Garden, bể bơi ốc đảo Tro Oasis Pool và khu vui chơi nước Water Playground." },
  { t: "Tầng 2", b: "Tro Work & Tro Fitness", span: "Co-working space sáng tạo theo tinh thần “Focus – Create – Inspire”, trạm Gym & Pilates cao cấp." },
  { t: "Tầng 3", b: "Tro Play", span: "Khu vườn liên hoàn 6 chủ đề: vườn nghỉ dưỡng, vọng cảnh, thư giãn, sum vầy, đại dương và sáng tạo; BBQ Garden trên cao, Kid Hi Garden, vườn trà đạo." },
  { t: "Tầng 20", b: "The 20 Tro Nest", span: "Tổ hợp vườn chơi trên cao độc đáo." },
  { t: "Tầng thượng", b: "Tro Signature", span: "Đài vọng cảnh panorama ngắm toàn cảnh biển trờI, Tropical Garden Lounge." },
];

/* ===== Tiện ích ngoại khu ===== */
export const EXTERNAL_FACT =
  "Beachtro Tower liền giáp công viên lớn nhất dự án – Whale Park 2,3 ha, cùng Kid Sport Park, Sport Park, hệ thống y tế, trường học và trung tâm thương mại mặt biển của Blanca City.";

export const PARKS = [
  { b: "Whale Park", span: "2,3 ha – khu vui chơi nước, đường thể thao, đài phun nước biểu tượng" },
  { b: "Central Park", span: "Quảng trường, sân khấu ngoài trờI, hồ cảnh quan, trục lễ hội" },
  { b: "Sport Park", span: "Sân tennis, bóng rổ, pickleball, bóng đá, food court" },
  { b: "Sea Soul Park", span: "Vườn nhiệt đới, mê cung rong biển, sân chơi bạch tuộc" },
];

export const CITY_AMENITIES = [
  { b: "Sun World Vũng Tàu 15 ha", span: "Vũ trụ giải trí vận hành 365 ngày" },
  { b: "TTTM mặt biển & Coastal Park", span: "Quảng trường lễ hội, bãi cát nhân tạo, khu ẩm thực ven biển" },
  { b: "Đại lộ hoa", span: "Đường hoa An Nam – Việt Nam, Gaulois – Pháp, đường hoa Luis" },
];

/* ===== Mặt bằng ===== */
export const TOWERS = [
  { b: "E6", span: "36 tầng" },
  { b: "E7", span: "36 tầng" },
  { b: "E8", span: "38 tầng · 537 căn" },
  { b: "E9", span: "40 tầng · 506 căn" },
];

export const VIEWS = ["Sân golf Paradise", "Nội khu – biển Bãi Trước", "Sun World – biển Bãi Sau", "Beacon Tower"];

export interface UnitLayout {
  key: string;
  tab: string;
  img: string;
  img800: string;
  w: number;
  h: number;
  alt: string;
  em: string;
  h3: string;
  specs: string[];
  dt: ReactNode;
  loai: string;
  extraLayout?: { src: string; alt: string };
}

export const UNIT_LAYOUTS: UnitLayout[] = [
  {
    key: "studio", tab: "Studio",
    img: `${IMG}/beachtro-tower-layout-can-studio.webp`,
    img800: `${IMG}/beachtro-tower-layout-can-studio-800.webp`,
    w: 1000, h: 553,
    alt: "Layout căn Studio Beachtro Tower: diện tích thông thủy 31,9 m², tim tường 36,3 m², trần cao 3,5 m",
    em: "Căn hộ Studio", h3: "Studio",
    specs: ["Phòng ngủ, khu bếp & bàn ăn", "1 vệ sinh, logia", "Chiều cao tầng 3,5 m"],
    dt: (<>31,9 / 36,3 m²</>),
    loai: "Studio",
  },
  {
    key: "1brp", tab: "1BR+",
    img: `${IMG}/beachtro-tower-layout-can-1br-plus.webp`,
    img800: `${IMG}/beachtro-tower-layout-can-1br-plus-800.webp`,
    w: 1000, h: 601,
    alt: "Layout căn 1BR+ Beachtro Tower: diện tích thông thủy 50,8 m², tim tường 56,1 m², 2 phòng ngủ",
    em: "Căn hộ 1 phòng ngủ+", h3: "1BR+",
    specs: ["Phòng khách, khu bếp & bàn ăn", "Phòng ngủ 1 + phòng ngủ 2", "1 vệ sinh, logia"],
    dt: (<>50,8 / 56,1 m²</>),
    loai: "1BR+",
  },
  {
    key: "2br", tab: "2BR",
    img: `${IMG}/beachtro-tower-layout-can-2br.webp`,
    img800: `${IMG}/beachtro-tower-layout-can-2br-800.webp`,
    w: 1000, h: 537,
    alt: "Layout căn 2BR Beachtro Tower: diện tích thông thủy 68,8 m², tim tường 74,5 m², 2 phòng ngủ",
    em: "Căn hộ 2 phòng ngủ", h3: "2BR",
    specs: ["Phòng khách, khu bếp & bàn ăn", "2 phòng ngủ", "Vệ sinh, logia"],
    dt: (<>68,8 / 74,5 m²</>),
    loai: "2BR",
  },
  {
    key: "2brp", tab: "2BR+",
    img: `${IMG}/beachtro-tower-layout-can-2br-plus.webp`,
    img800: `${IMG}/beachtro-tower-layout-can-2br-plus-800.webp`,
    w: 1000, h: 584,
    alt: "Layout căn 2BR+ Beachtro Tower: diện tích thông thủy 74,8 m², tim tường 81 m², 3 phòng ngủ",
    em: "Căn hộ 2 phòng ngủ+", h3: "2BR+",
    specs: ["Phòng khách, khu bếp & bàn ăn", "Phòng ngủ 1, 2, 3", "Vệ sinh, logia"],
    dt: (<>74,8 / 81 m²</>),
    loai: "2BR+",
  },
  {
    key: "3br", tab: "3BR",
    img: `${IMG}/beachtro-tower-layout-can-3br.webp`,
    img800: `${IMG}/beachtro-tower-layout-can-3br-800.webp`,
    w: 1000, h: 604,
    alt: "Layout căn 3BR Beachtro Tower: diện tích thông thủy 94,4 m², tim tường 102 m², 3 phòng ngủ",
    em: "Căn hộ 3 phòng ngủ · 2 mẫu", h3: "3BR",
    specs: ["Phòng khách, khu bếp & bàn ăn", "3 phòng ngủ", "Vệ sinh, logia"],
    dt: (<>94,4 / 102 m²<small style={{ display: "block", fontWeight: 500, color: "var(--muted)", marginTop: 2 }}>Mẫu lớn: 103,7 / 112 m²</small></>),
    loai: "3BR",
    extraLayout: {
      src: `${IMG}/beachtro-tower-layout-can-3br-goc.webp`,
      alt: "Layout căn 3BR Beachtro Tower mẫu lớn: diện tích thông thủy 103,7 m², tim tường 112 m², 3 phòng ngủ",
    },
  },
  {
    key: "3brp", tab: "3BR+",
    img: `${IMG}/beachtro-tower-layout-can-3br-plus.webp`,
    img800: `${IMG}/beachtro-tower-layout-can-3br-plus-800.webp`,
    w: 1000, h: 674,
    alt: "Layout căn 3BR+ Beachtro Tower: diện tích thông thủy 118,3 m², tim tường 126,8 m², 4 phòng ngủ",
    em: "Căn hộ 3 phòng ngủ+", h3: "3BR+",
    specs: ["Phòng khách, khu bếp & bàn ăn", "Phòng ngủ 1, 2, 3, 4", "Vệ sinh, logia"],
    dt: (<>118,3 / 126,8 m²</>),
    loai: "3BR+",
  },
];

/* ===== Chính sách ===== */
export const PAYMENT_PLANS = [
  { em: "Phương án 1", h3: "Tiến độ chuẩn – không vay", so: (<>CK 5%<small>chiết khấu không vay</small></>), p: "Giãn tiến độ đến 46 tháng theo 2 giai đoạn 70 – 30.", hl: false },
  { em: "Phương án 2", h3: "Vay ngân hàng", so: (<>70%<small>vay & hỗ trợ lãi suất tối đa</small></>), p: "Hỗ trợ lãi suất đến 30 tháng (không muộn hơn 31/08/2029), ân hạn nợ gốc theo thờI gian hỗ trợ.", hl: false },
  { em: "Phương án 3", h3: "Thanh toán sớm 95%", so: (<>CK 13,5%<small>thanh toán muộn nhất 25/10/2026</small></>), p: "Nhận bàn giao khi dự án nghiệm thu, dự kiến 31/08/2028.", hl: true },
  { em: "Phương án 4", h3: "Thanh toán sớm 70%", so: (<>CK 6%<small>thanh toán muộn nhất 25/10/2026</small></>), p: "Phần còn lại theo tiến độ chuẩn của phương án 1.", hl: false },
  { em: "Phương án 5", h3: "Thanh toán sớm 50%", so: (<>CK 3%<small>thanh toán muộn nhất 25/10/2026</small></>), p: "Phần còn lại theo tiến độ chuẩn của phương án 1.", hl: false },
];

export const PAYMENT_SCHEDULE: { b: string; span: string; nha?: boolean }[] = [
  { b: "Ký HĐTHNV", span: "Đặt 100 triệu (Studio, 1BR+, 2BR, 2BR+) hoặc 150 triệu (3BR, 3BR+)" },
  { b: "15%", span: "Ngày thứ 10 (gồm tiền đợt 1) · ký HĐMB khoảng 30 ngày sau" },
  { b: "4 × 10%", span: "Ngày thứ 100, 220, 340, 460" },
  { b: "15%", span: "Ngày thứ 610 – lũy kế 70%" },
  { b: "Nhận nhà", span: "Sun Early Key: đủ 70% nhận căn hộ để sử dụng, dự kiến 31/08/2028", nha: true },
  { b: "5 × 5%", span: "Ngày thứ 760, 910, 1060, 1210, 1360" },
  { b: "Bàn giao", span: "100% kinh phí bảo trì + thuế GTGT của 5%; 5% vào tài khoản đảm bảo cấp sổ (CĐT trả lãi 8%/năm)" },
  { b: "5%", span: "Khi được cấp giấy chứng nhận quyền sở hữu" },
];

export const PRIVILEGES = [
  { b: "Sun Early Key – Tân gia sớm, khai thác ngay, thanh toán sau", span: "Thanh toán tối thiểu 70% giá trị căn hộ (gồm GTGT) là nhận căn hộ để sử dụng khi dự án nghiệm thu." },
  { b: "Lãi 8%/năm khi thanh toán trước hạn", span: "Thanh toán bằng vốn tự có trước hạn ít nhất 10 ngày (không áp dụng đồng thờI với chiết khấu TTS)." },
  { b: "Miễn phí dịch vụ quản lý 2 năm", span: "Tính từ ngày nhận bàn giao căn hộ (không gồm phí dịch vụ của bên thứ ba)." },
  { b: "Hội viên Sun Signature", span: "Tích điểm 0,7% – 2% giá trị giao dịch, chi tiêu trong hệ sinh thái Sun Group." },
  { b: "Tùy chọn hoàn thiện liền tường", span: "Đăng ký thêm gói hoàn thiện: 10 – 11,2 triệu/m² thông thủy (gồm GTGT, tạm tính) tùy loại căn." },
  { b: "Vay đến 70%, miễn phí trả nợ trước hạn", span: "Trong thờI gian hỗ trợ lãi suất; ngân hàng theo chỉ định của chủ đầu tư." },
];

/* ===== DyHome ===== */
export const DYHOME_STYLES = ["Modern Tropical", "Tân cổ điển", "Indochine", "Địa Trung Hải"];

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Beachtro Tower nằm ở đâu?",
    a: "Beachtro Tower nằm trong lòng đại đô thị Blanca City trên đường 3 Tháng 2, phường Rạch Dừa và phường Phước Thắng, Vũng Tàu, TP. Hồ Chí Minh (trước ngày 1/7/2025 thuộc tỉnh Bà Rịa – Vũng Tàu). Dự án một mặt hướng biển Bãi Sau, một mặt tựa đại lộ 3 Tháng 2, liền kề công viên Whale Park 2,3 ha.",
  },
  {
    q: "Ai là chủ đầu tư Beachtro Tower?",
    a: "Beachtro Tower là phân khu cao tầng của Blanca City do Tập đoàn Sun Group làm chủ đầu tư, Sun Property – thành viên Tập đoàn Sun Group – là đơn vị phát triển. Thiết kế cảnh quan do Kume Design Asia (thuộc Kume Sekkei Group) thực hiện.",
  },
  {
    q: "Quy mô Beachtro Tower như thế nào?",
    a: "Beachtro Tower có 1.785 căn hộ trong 4 tòa tháp: E6 và E7 cao 36 tầng, E8 cao 38 tầng, E9 cao 40 tầng, cùng 3 tầng hầm để xe. Dự án thuộc đại đô thị Blanca City quy mô 96,6 ha.",
  },
  {
    q: "Beachtro Tower có những loại căn hộ nào, diện tích bao nhiêu?",
    a: "Dự án có căn Studio (thông thủy 31,9 m²), 1BR+ (50,8 m²), 2BR (68,8 m²), 2BR+ (74,8 m²), 3BR (94,4 – 103,7 m²) và 3BR+ (118,3 m²); diện tích tim tường tương ứng từ 36,3 m² đến 126,8 m². Chiều cao tầng 3,5 m. Mỗi căn có 4 hướng view tùy vị trí: sân golf Paradise, biển Bãi Trước, biển Bãi Sau – Sun World hoặc Beacon Tower.",
  },
  {
    q: "Chính sách thanh toán Beachtro Tower hiện nay ra sao?",
    a: "Theo chính sách CSBH02.2 áp dụng từ 28/09/2026: thanh toán tiến độ chuẩn không vay được chiết khấu 5%, giãn đến 46 tháng theo 2 giai đoạn 70 – 30; vay ngân hàng tối đa 70% với hỗ trợ lãi suất đến 30 tháng; thanh toán sớm 95%, 70%, 50% trước 25/10/2026 được chiết khấu lần lượt 13,5%, 6% và 3%. Đặt cọc ban đầu 100 triệu đồng (Studio đến 2BR+) hoặc 150 triệu đồng (3BR, 3BR+).",
  },
  {
    q: "Khi nào nhận nhà Beachtro Tower?",
    a: "Theo chính sách của chủ đầu tư, khách hàng thanh toán tối thiểu 70% giá trị căn hộ được nhận căn hộ để sử dụng theo chương trình Sun Early Key khi dự án nghiệm thu đưa vào sử dụng, dự kiến ngày 31/08/2028.",
  },
  {
    q: "Tiện ích nội khu Beachtro Tower gồm những gì?",
    a: "Hệ tiện ích Tro Collection trải theo tầng: tầng 1 Tro Chill với bể bơi Tro Oasis Pool, vườn Flow Hi Garden, Water Playground; tầng 2 Tro Work & Fitness với co-working space, gym và pilates; tầng 3 Tro Play với vườn liên hoàn 6 chủ đề, BBQ Garden, Kid Hi Garden; tầng 20 Tro Nest vườn chơi trên cao; tầng thượng Tro Signature với đài vọng cảnh panorama.",
  },
  {
    q: "Căn hộ Beachtro Tower có được sở hữu lâu dài không?",
    a: "Có. Beachtro Tower là tổ hợp tháp căn hộ sở hữu lâu dài cuối cùng tại Blanca City. Hồ sơ pháp lý, hợp đồng mẫu và bảng tính giá theo từng căn được chuyên viên ERA cung cấp theo công bố chính thức của chủ đầu tư.",
  },
];

/* ===== CTA form ===== */
export const PRODUCT_TYPES = ["Studio", "1BR+", "2BR", "2BR+", "3BR", "3BR+"];

export const CTA = {
  lead: "Sống trọn sắc riêng, bên biển nhiệt đới. Nhận bảng tính giá theo căn, mặt bằng tầng và chính sách mới nhất từ ERA Vietnam.",
  bullets: [
    "Bảng tính giá theo căn và 5 phương án thanh toán",
    "Mặt bằng tầng điển hình, layout chi tiết từng mẫu căn",
    "Lịch tham quan Blanca City và tiện ích Tro Collection",
  ],
  loaiChips: ["Studio", "1BR+", "2BR", "2BR+", "3BR", "3BR+"],
  ket: "Chuyên viên ERA gọi lại xác nhận lịch, đón anh/chị tham quan dự án.",
  formTitle: "Đăng ký tham quan dự án",
  formSub: "Nhận bảng tính giá theo căn, mặt bằng tầng và chính sách mới nhất · Bảo mật thông tin",
};
