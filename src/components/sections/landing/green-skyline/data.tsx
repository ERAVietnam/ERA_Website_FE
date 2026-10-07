import type { ReactNode } from "react";
import { IMG } from "./theme";

/* ===== Hero ===== */
export const HERO_FACTS = [
  { b: "1.296", span: "Căn hộ" },
  { b: "4", span: "Tháp" },
  { b: "28–40", span: "Tầng" },
  { b: "12/2024", span: "Đã cất nóc" },
];

/* ===== Giới thiệu ===== */
export const INTRO = {
  kick: "Giới thiệu dự án",
  h2: (<>Giới thiệu <span className="nw">Green Skyline</span></>),
  paras: [
    (<><b>Green Skyline</b> là dự án căn hộ cao cấp của <b>TBS Land</b> (thành viên TBS Group), tọa lạc mặt tiền Quốc lộ 1K, đường GS1 và GS5, thuộc khu đô thị Green Square quy mô 39 ha.</>),
    "Dự án gồm 4 tháp cao 28–40 tầng với 1.296 căn hộ, kiến trúc theo cảm hứng City Resort, vận hành bởi Savills. Green Skyline đã cất nóc ngày 22/12/2024 và đang ở giai đoạn hoàn thiện cuối cùng theo tiêu chuẩn bàn giao cao cấp.",
    (<>Phát triển trên nền tảng R&amp;D và năng lực vận hành kế thừa từ TBS Group, Green Skyline hướng đến 3 giá trị cốt lõi: <b>Sản phẩm thật – Trải nghiệm thật – Giá trị thật</b>.</>),
  ],
  fig: {
    src: `${IMG}/green-skyline-anh-thuc-te-4-thap-da-cat-noc.webp`,
    src800: `${IMG}/green-skyline-anh-thuc-te-4-thap-da-cat-noc-800.webp`,
    w: 1100, h: 569,
    alt: "Ảnh flycam thực tế Green Skyline tháng 03/2026: 4 tháp căn hộ đã cất nóc bên Quốc lộ 1K, cạnh siêu thị GO! Dĩ An",
  },
};

/* ===== 3 giá trị thật ===== */
export interface Value { img: string; w: number; h: number; alt: string; so: string; h3: string; p: ReactNode }
export const VALUES: Value[] = [
  {
    img: `${IMG}/green-skyline-san-pham-that-cong-trinh-thuc-te.webp`, w: 800, h: 562,
    alt: "Sản phẩm thật: công trình Green Skyline thực tế tháng 03/2026, 4 tháp 28–40 tầng đã cất nóc và đang hoàn thiện",
    so: "01", h3: "Sản phẩm thật",
    p: "Đã cất nóc ngày 22/12/2024, đang hoàn thiện theo tiêu chuẩn bàn giao cao cấp. Tiến độ được kiểm chứng bằng chính công trình thực tế – rõ ràng, minh bạch và có thể kiểm tra.",
  },
  {
    img: `${IMG}/green-skyline-trai-nghiem-that-ho-boi-tang-3.webp`, w: 800, h: 600,
    alt: "Trải nghiệm thật: hồ bơi và vườn tiện ích tầng 3 Green Skyline đã hoàn thiện, ảnh chụp thực tế về đêm",
    so: "02", h3: "Trải nghiệm thật",
    p: "Cảnh quan và tiện ích tầng 3 đã gần hoàn thiện toàn bộ. Căn hộ hoàn thiện đúng tiêu chuẩn bàn giao để khách hàng xem trực tiếp chất lượng, ánh sáng, không gian và công năng.",
  },
  {
    img: `${IMG}/green-skyline-gia-tri-that-khu-do-thi-green-square.webp`, w: 800, h: 562,
    alt: "Giá trị thật: Green Skyline giữa khu đô thị Green Square 39 ha, liền kề hệ sinh thái y tế, mua sắm, đại học đã vận hành",
    so: "03", h3: "Giá trị thật",
    p: (<>
      Nằm trong khu đô thị Green Square 39 ha, cạnh hệ sinh thái đã vận hành:
      <ul>
        <li>Bệnh viện Quốc tế Hoàn Mỹ 13.000 m², 500 giường</li>
        <li>Siêu thị GO! 4.524 m², hơn 51 thương hiệu</li>
        <li>Khu đô thị ĐHQG TP.HCM 643,7 ha</li>
        <li>KCN Sóng Thần, Khu Công nghệ cao, KCX Linh Trung</li>
      </ul>
    </>),
  },
];

/* ===== Vị trí ===== */
export const LOCATION_FACT =
  "Khoảng 25 phút tới trung tâm TP. Hồ Chí Minh (Trung tâm Tài chính quốc tế VIFC) và trung tâm TP. Đồng Nai. Hệ tiện ích ngoại khu đã hình thành rõ nét – giáo dục, y tế, mua sắm, dịch vụ công – chỉ trong vài phút di chuyển.";

export const MAP_MAIN = {
  src: `${IMG}/green-skyline-so-do-vi-tri-tien-ich-ngoai-khu.webp`,
  zoom: `${IMG}/green-skyline-so-do-vi-tri-tien-ich-ngoai-khu-lon.webp`,
  w: 1400, h: 788,
  alt: "Sơ đồ vị trí Green Skyline giao Quốc lộ 1K: Metro số 1, ĐHQG, KCN Sóng Thần, Bệnh viện Hoàn Mỹ, GO! Dĩ An, nút giao Tân Vạn",
};

export const TRAVEL_TIMES = [
  { b: (<>05<small>phút</small></>), span: "Siêu thị GO!, BV Quốc tế Hoàn Mỹ, BV Thủ Đức, trường liên cấp Phan Chu Trinh, Việt Anh 2, TH Nguyễn Bỉnh Khiêm, ĐHQG TP.HCM, KCN Sóng Thần, trung tâm hành chính Dĩ An" },
  { b: (<>10<small>phút</small></>), span: "Làng Đại học, Vincom Thủ Đức, chợ Thủ Đức, Co.opXtra Linh Trung, BV Hoàn Hảo, ga Metro số 1, Khu Công nghệ cao, KCX Linh Trung 1, ĐH Tài chính – Marketing" },
  { b: (<>25<small>phút</small></>), span: "GigaMall Phạm Văn Đồng, sân bay Tân Sơn Nhất, trung tâm TP.HCM và Đồng Nai, cụm logistics Tân Vạn, cảng Bình Dương" },
];

export const REGION = {
  kick: "Một vị trí hiếm có",
  h3: "25 phút tới hai thành phố trực thuộc Trung ương",
  paras: [
    "Green Skyline tọa lạc tại “tâm mạch” giao thoa của vùng kinh tế trọng điểm phía Nam. Từ giao điểm Quốc lộ 1K với các trục GS1, GS5, dự án thừa hưởng sự bứt phá hạ tầng khu Đông và kết nối nhanh tới trung tâm tài chính VIFC (TP.HCM) cũng như trung tâm hành chính TP. Đồng Nai.",
    "Mỗi bước chân kết nối trực tiếp với dòng chảy thương mại, dịch vụ của khu vực – nền tảng cho nhu cầu ở thực, cho thuê và giá trị bền vững.",
  ],
  roads: ["Quốc lộ 1K", "Xa lộ Hà Nội", "Phạm Văn Đồng", "Mai Chí Thọ", "Metro số 1", "Sân bay Long Thành"],
  map: {
    src: `${IMG}/green-skyline-ban-do-vung-25-phut-vifc-dong-nai.webp`,
    zoom: `${IMG}/green-skyline-ban-do-vung-25-phut-vifc-dong-nai-lon.webp`,
    w: 1200, h: 725,
    alt: "Bản đồ vùng Green Skyline: 25 phút tới trung tâm tài chính VIFC TP.HCM, trung tâm hành chính TP. Đồng Nai",
  },
};

/* ===== Tổng quan ===== */
export const OVERVIEW_STATS = [
  { b: "1.296", span: "Căn hộ" },
  { b: "4", span: "Tháp T1 · T2 · T3A · T3B" },
  { b: "28–40", span: "Tầng · khối đế 3 tầng" },
  { b: (<>39<small> ha</small></>), span: "Khu đô thị Green Square" },
];

export const SPEC_ROWS: { label: string; value: ReactNode }[] = [
  { label: "Tên dự án", value: (<>
      <b className="hl">Green Skyline</b>
      <small>Nhà chung cư OCC thuộc dự án Khu đô thị – Thương mại – Dịch vụ Quảng Trường Xanh (Green Square)</small>
    </>) },
  { label: "Chủ đầu tư", value: (<>
      TBS Land – thành viên TBS Group
      <small>Pháp nhân: Công ty Cổ phần Đầu tư Thái Bình</small>
    </>) },
  { label: "Vị trí", value: (<>
      Mặt tiền Quốc lộ 1K, đường GS1 &amp; GS5, khu đô thị Green Square, phường Đông Hòa, TP. Hồ Chí Minh
      <small>Trước ngày 1/7/2025 thuộc TP. Dĩ An, tỉnh Bình Dương</small>
    </>) },
  { label: "Quy mô", value: (<><b className="hl">4 tháp T1, T2, T3A, T3B</b> cao 28–40 tầng · khối đế 3 tầng</>) },
  { label: "Số căn", value: <b className="hl">1.296 căn hộ</b> },
  { label: "Loại hình", value: (<>
      Studio, 1PN+, 2PN, 2PN+, 3PN, Deluxe, Penthouse
      <small>Shophouse tại khối đế</small>
    </>) },
  { label: "Đối tác", value: "Tổng thầu SOL E&C · Thiết kế kiến trúc Vertical Studio · Thiết kế cảnh quan LJ-Asia · Tư vấn giám sát ICIC" },
  { label: "Quản lý vận hành", value: "Savills" },
  { label: "Tiến độ", value: (<>
      Cất nóc 22/12/2024
      <small>Nhận nhà dự kiến từ Quý 1/2027 theo chính sách bán hàng 14/09/2026 (tùy phương thức thanh toán)</small>
    </>) },
  { label: "Pháp lý", value: (<>
      Văn bản 20795/SXD-PTĐT ngày 19/12/2025 của Sở Xây dựng TP.HCM: 1.296 căn hộ đủ điều kiện bán nhà ở hình thành trong tương lai
      <small>Giấy phép xây dựng số 1713/GPXD ngày 09/05/2023</small>
    </>) },
];

export const REASONS = [
  "Nhu cầu ở thực và cho thuê luôn hiện hữu từ 100.000 sinh viên, giảng viên và 50.000 chuyên gia trong khu vực.",
  "Khoảng 10 phút đến ga Metro ĐHQG và Khu Công nghệ cao – dễ dàng kết nối đa trung tâm.",
  "Đón sóng tuyến Metro số 1 theo định hướng nối dài tới sân bay Long Thành – giá trị kết nối dài hạn.",
  "Quốc lộ 1K mở rộng – nâng cấp kết nối ngay mặt tiền dự án.",
  "Nút giao Linh Xuân mở rộng giảm ùn tắc – nâng cao chất lượng sống hằng ngày.",
  "Phân khu thương mại dịch vụ khởi công – hoàn thiện bức tranh tiện ích khu đô thị Green Square.",
  "Mặt bằng giá khu Đông TP.HCM đã được thiết lập mới – lợi thế cho căn hộ đã hoàn thiện, giá trị thật.",
];

/* ===== Kiến trúc ===== */
export const ARCH_POINTS = [
  { b: "Kiến trúc City Resort", span: "Ngôn ngữ thiết kế hiện đại với các đường cong mềm, chú trọng cả thẩm mỹ lẫn công năng." },
  { b: "Cầu vọng cảnh trên cao", span: "Nối liền 2 tòa tháp, lấy cảm hứng từ hình tượng chim hạc – biểu tượng gắn kết bền vững, cuộc sống thịnh vượng." },
  { b: "Hành trình liền mạch", span: "Lối tiếp cận, drop-off, sảnh thang máy, hành lang được sắp đặt liền mạch, tiện nghi mỗi ngày." },
  { b: "Phố thương mại khối đế", span: "Mua sắm – ẩm thực – giải trí ngay dưới chân tòa nhà, phục vụ cư dân và cả khu vực." },
];

export const ARCH = {
  main: {
    src: `${IMG}/green-skyline-cau-vong-canh-cam-hung-chim-hac.webp`,
    src800: `${IMG}/green-skyline-cau-vong-canh-cam-hung-chim-hac-800.webp`,
    w: 1200, h: 676,
    alt: "Cầu vọng cảnh trên cao nối 2 tháp Green Skyline, lấy cảm hứng từ hình tượng chim hạc",
  },
  thumb: {
    src: `${IMG}/green-skyline-cau-vong-canh-anh-thuc-te.webp`,
    w: 800, h: 592,
    alt: "Ảnh thực tế cầu vọng cảnh giữa 2 tháp Green Skyline đang hoàn thiện, tháng 03/2026",
  },
  gallery: [
    { src: `${IMG}/green-skyline-kien-truc-city-resort.webp`, w: 800, h: 865, alt: "Kiến trúc City Resort của Green Skyline: 2 tháp đường cong mềm nối bằng cầu vọng cảnh trên cao", cap: "2 tháp Green Skyline & cầu vọng cảnh" },
    { src: `${IMG}/green-skyline-sanh-tang-tret-anh-thuc-te.webp`, src800: `${IMG}/green-skyline-sanh-tang-tret-anh-thuc-te-800.webp`, w: 900, h: 600, alt: "Ảnh thực tế sảnh Green Skyline đã hoàn thiện: tường cây xanh, trần đèn nghệ thuật và khu tiếp khách, tháng 06/2026", cap: "Sảnh đón đã hoàn thiện", that: true },
    { src: `${IMG}/green-skyline-sanh-drop-off-khoi-de.webp`, src800: `${IMG}/green-skyline-sanh-drop-off-khoi-de-800.webp`, w: 900, h: 507, alt: "Sảnh drop-off Green Skyline: mái vòm cong đón xe, cà phê và cửa hàng ở khối đế", cap: "Sảnh drop-off khối đế" },
    { src: `${IMG}/green-skyline-pho-thuong-mai-khoi-de.webp`, src800: `${IMG}/green-skyline-pho-thuong-mai-khoi-de-800.webp`, w: 1000, h: 566, alt: "Phố thương mại khối đế Green Skyline: cửa hàng, quán cà phê và lối đi bộ cho cư dân và khu vực", cap: "Phố thương mại – điểm đến sôi động mỗi ngày" },
    { src: `${IMG}/green-skyline-pho-thuong-mai-anh-thuc-te.webp`, src800: `${IMG}/green-skyline-pho-thuong-mai-anh-thuc-te-800.webp`, w: 900, h: 600, alt: "Ảnh thực tế phố thương mại khối đế Green Skyline đã hoàn thiện mặt dựng, tháng 06/2026", cap: "Phố thương mại khối đế 06/2026", that: true },
  ],
};
/* ===== Tiện ích ===== */
export const AMENITY_FACT =
  "Tầng 3 – không gian đắt giá nhất của Green Skyline – mở ra hệ tiện ích nghỉ dưỡng theo những đường cong mềm mại; tầng 20 là điểm chạm an yên giữa tầng không. Cùng phố thương mại dưới chân tòa nhà, mọi trải nghiệm được tính toán cho một hành trình sống tiện nghi và gắn kết.";

export interface AccSlide { src: string; w: number; h: number; alt: string; ten: string; mo: string; that?: boolean }
export const ACC_SLIDES: AccSlide[] = [
  { src: `${IMG}/green-skyline-ho-boi-tang-3-anh-thuc-te.webp`, w: 800, h: 600, alt: "Ảnh thực tế hồ bơi tầng 3 Green Skyline đã hoàn thiện, chụp từ trên cao lúc lên đèn", ten: "Hồ bơi tầng 3 – thực tế", mo: "Hồ bơi chuẩn resort giữa vườn nhiệt đới đã hoàn thiện.", that: true },
  { src: `${IMG}/green-skyline-ho-boi-resort-tang-3.webp`, w: 800, h: 381, alt: "Hồ bơi chuẩn resort tầng 3 Green Skyline nhìn từ trên cao, uốn lượn giữa vườn nhiệt đới", ten: "Hồ bơi chuẩn resort", mo: "Ốc đảo xanh uốn lượn giữa vườn – tầng 3." },
  { src: `${IMG}/green-skyline-choi-nghi-to-chim-ho-boi.webp`, w: 800, h: 457, alt: "Chòi nghỉ tổ chim và ghế tắm nắng bên hồ bơi tầng 3 Green Skyline", ten: "Chòi nghỉ tổ chim", mo: "Ghế tắm nắng, chòi nghỉ bên hồ bơi." },
  { src: `${IMG}/green-skyline-cafe-nha-hang-tang-3.webp`, w: 800, h: 450, alt: "Khu cà phê – nhà hàng Green Skyline với vách kính lớn mở ra vườn", ten: "Cà phê – nhà hàng", mo: "Vách kính lớn mở ra vườn tầng 3." },
  { src: `${IMG}/green-skyline-phong-gym-view-thanh-pho.webp`, w: 800, h: 425, alt: "Phòng gym Green Skyline với vách kính lớn nhìn ra thành phố", ten: "Phòng gym", mo: "Gym, yoga, sauna cho nhịp sống an lành." },
  { src: `${IMG}/green-skyline-khu-vui-choi-tre-em.webp`, w: 800, h: 425, alt: "Khu vui chơi trẻ em trong nhà Green Skyline với cây xanh, cầu trượt và khu vận động", ten: "Vui chơi trẻ em", mo: "Khu vận động, trò chơi cho cư dân nhí." },
  { src: `${IMG}/green-skyline-vuon-bbq-tang-3.webp`, w: 800, h: 450, alt: "Vườn BBQ Green Skyline bên hồ tiểu cảnh và cây xanh lúc lên đèn", ten: "Vườn BBQ", mo: "Tiệc nướng bên hồ tiểu cảnh." },
  { src: `${IMG}/green-skyline-sky-garden-tang-20.webp`, w: 800, h: 476, alt: "Sky garden tầng 20 Green Skyline: lối dạo giữa tường cây xanh, ngắm toàn cảnh thành phố", ten: "Sky garden tầng 20", mo: "Vườn trên cao ngắm toàn cảnh thành phố." },
];

export interface AmenityFloor { key: string; tab: string; map: string; w: number; h: number; mapAlt: string; h3: string; phu: string; items: string[]; anh?: { src: string; w: number; h: number; alt: string; that?: boolean } }
export const AMENITY_FLOORS: AmenityFloor[] = [
  {
    key: "t1", tab: "Tầng 1",
    map: `${IMG}/green-skyline-mat-bang-tien-ich-tang-1.webp`, w: 1200, h: 1138,
    mapAlt: "Mặt bằng tiện ích tầng 1 Green Skyline: trạm sạc ô tô điện, sân chơi trẻ em, thể dục ngoài trờI, phố đi bộ, nhà trẻ",
    h3: "Tầng 1 – Phố đi bộ", phu: "Tiện ích sát mặt đất cho cả gia đình và nhịp sống xanh.",
    items: ["Trạm sạc ô tô điện", "Sân chơi trẻ em", "Khu thể dục ngoài trờI", "Phố đi bộ / mua sắm", "Nhà trẻ"],
  },
  {
    key: "t2", tab: "Tầng 2",
    map: `${IMG}/green-skyline-mat-bang-tien-ich-tang-2.webp`, w: 1200, h: 1180,
    mapAlt: "Mặt bằng tiện ích tầng 2 Green Skyline: khu vui chơi trẻ em, billiards, bóng bàn",
    h3: "Tầng 2 – Vui chơi", phu: "Không gian vui chơi, giải trí trong nhà.",
    items: ["Khu vui chơi trẻ em", "Billiards", "Bóng bàn"],
  },
  {
    key: "t3", tab: "Tầng 3",
    map: `${IMG}/green-skyline-mat-bang-tien-ich-tang-3.webp`, w: 1200, h: 1148,
    mapAlt: "Mặt bằng tiện ích tầng 3 Green Skyline: hồ bơi resort, hồ bơi trẻ em, chòi tổ chim, BBQ, gym, yoga, sauna, thư viện",
    h3: "Tầng 3 – Resort giữa phố", phu: "Không gian đắt giá nhất – hồ bơi, vườn và tiện ích sức khỏe đã gần hoàn thiện.",
    items: ["Chòi nghỉ tổ chim", "Khu vực BBQ", "Hồ bơi trẻ em", "Sân chơi trẻ em", "Hồ bơi tiêu chuẩn resort", "Khu thể thao ngoài trờI", "Khu cà phê / nhà hàng", "Phòng Yoga", "Phòng Gym", "Phòng Sauna", "Khuôn viên đọc sách", "Đường dạo bộ", "Thư viện", "Vườn thư giãn", "Hồ tiểu cảnh"],
    anh: { src: `${IMG}/green-skyline-vuon-tang-3-anh-thuc-te.webp`, w: 800, h: 450, alt: "Ảnh thực tế vườn và lối dạo tầng 3 Green Skyline, tháng 03/2026", that: true },
  },
  {
    key: "t20", tab: "Tầng 20",
    map: `${IMG}/green-skyline-mat-bang-tien-ich-tang-20.webp`, w: 1200, h: 1099,
    mapAlt: "Mặt bằng tầng 20 Green Skyline: yoga ngoài trờI, khu dưỡng sinh, đài quan sát, vườn thiền, cầu vọng cảnh",
    h3: "Tầng 20 – Sky garden", phu: "Điểm chạm an yên giữa tầng không, ngắm toàn cảnh thành phố.",
    items: ["Khu tập yoga ngoài trờI", "Khu thư giãn ngắm cảnh", "Khu tập dưỡng sinh", "Đài quan sát", "Vườn thiền", "Cầu vọng cảnh", "Khu đọc sách thư giãn"],
    anh: { src: `${IMG}/green-skyline-khu-doc-sach-tang-20.webp`, w: 800, h: 543, alt: "Khu đọc sách thư giãn ngoài trờI tầng 20 Green Skyline" },
  },
];

export const SECURITY = [
  "Hệ thống camera an ninh 4 lớp",
  "Khóa vân tay, thẻ từ",
  "Trạm sạc ô tô điện",
];

/* ===== Mặt bằng 4 tháp ===== */
export interface TowerFloor { tab: string; img: string; img800?: string; w: number; h: number; alt: string }
export interface Tower { key: string; tab: string; floors: TowerFloor[] }
export const TOWERS: Tower[] = [
  {
    key: "t1", tab: "Tháp T1",
    floors: [
      { tab: "Tầng 4", img: `${IMG}/green-skyline-mat-bang-thap-t1-tang-4.webp`, w: 1400, h: 1033, alt: "Mặt bằng tầng 4 tháp T1 Green Skyline: mã căn và diện tích GFA, NFA các căn 1PN+, 2PN, 2PN+, 3PN" },
      { tab: "Tầng 5–8", img: `${IMG}/green-skyline-mat-bang-thap-t1-tang-5-8.webp`, w: 1400, h: 1032, alt: "Mặt bằng tầng 5–8 tháp T1 Green Skyline: mã căn và diện tích GFA, NFA từng căn" },
      { tab: "Tầng 9–27", img: `${IMG}/green-skyline-mat-bang-thap-t1-tang-9-27.webp`, img800: `${IMG}/green-skyline-mat-bang-thap-t1-tang-9-27-800.webp`, w: 1400, h: 1034, alt: "Mặt bằng tầng điển hình 9–27 tháp T1 Green Skyline: căn 1PN+, 2PN, 2PN+, 3PN với diện tích GFA, NFA" },
      { tab: "Tầng 28 · Penthouse", img: `${IMG}/green-skyline-mat-bang-thap-t1-tang-28-penthouse.webp`, w: 1400, h: 1039, alt: "Mặt bằng tầng 28 tháp T1 Green Skyline: 5 căn Penthouse diện tích tim tường 130,34–234,58 m²" },
    ],
  },
  {
    key: "t2", tab: "Tháp T2",
    floors: [
      { tab: "Tầng 4", img: `${IMG}/green-skyline-mat-bang-thap-t2-tang-4.webp`, w: 1400, h: 1034, alt: "Mặt bằng tầng 4 tháp T2 Green Skyline: mã căn và diện tích GFA, NFA từng căn" },
      { tab: "Tầng 5–8", img: `${IMG}/green-skyline-mat-bang-thap-t2-tang-5-8.webp`, w: 1400, h: 1034, alt: "Mặt bằng tầng 5–8 tháp T2 Green Skyline: căn Studio, 1PN+, 2PN, 3PN với diện tích GFA, NFA" },
      { tab: "Tầng 9–27", img: `${IMG}/green-skyline-mat-bang-thap-t2-tang-9-27.webp`, w: 1400, h: 1035, alt: "Mặt bằng tầng điển hình 9–27 tháp T2 Green Skyline: căn Studio, 1PN+, 2PN, 3PN với diện tích GFA, NFA" },
      { tab: "Tầng 28 · Deluxe", img: `${IMG}/green-skyline-mat-bang-thap-t2-tang-28-deluxe.webp`, w: 1400, h: 1037, alt: "Mặt bằng tầng 28 tháp T2 Green Skyline: các căn Deluxe với diện tích GFA và NFA" },
    ],
  },
  {
    key: "t3a", tab: "Tháp T3A",
    floors: [
      { tab: "Tầng 4", img: `${IMG}/green-skyline-mat-bang-thap-t3a-tang-4.webp`, w: 1400, h: 1034, alt: "Mặt bằng tầng 4 tháp T3A Green Skyline: mã căn và diện tích GFA, NFA từng căn" },
      { tab: "Tầng 5–8", img: `${IMG}/green-skyline-mat-bang-thap-t3a-tang-5-8.webp`, w: 1400, h: 1032, alt: "Mặt bằng tầng 5–8 tháp T3A Green Skyline: mã căn và diện tích GFA, NFA từng căn" },
      { tab: "Tầng 9–19 & 21–39", img: `${IMG}/green-skyline-mat-bang-thap-t3a-tang-9-39.webp`, w: 1400, h: 1030, alt: "Mặt bằng tầng điển hình 9–19 và 21–39 tháp T3A Green Skyline: căn 1PN+, 2PN, 3PN với diện tích GFA, NFA" },
      { tab: "Tầng 40 · Deluxe", img: `${IMG}/green-skyline-mat-bang-thap-t3a-tang-40-deluxe.webp`, w: 1400, h: 1029, alt: "Mặt bằng tầng 40 tháp T3A Green Skyline: các căn Deluxe với diện tích GFA và NFA" },
    ],
  },
  {
    key: "t3b", tab: "Tháp T3B",
    floors: [
      { tab: "Tầng 4", img: `${IMG}/green-skyline-mat-bang-thap-t3b-tang-4.webp`, w: 1400, h: 1043, alt: "Mặt bằng tầng 4 tháp T3B Green Skyline: mã căn và diện tích GFA, NFA từng căn" },
      { tab: "Tầng 5–8", img: `${IMG}/green-skyline-mat-bang-thap-t3b-tang-5-8.webp`, w: 1400, h: 1046, alt: "Mặt bằng tầng 5–8 tháp T3B Green Skyline: mã căn và diện tích GFA, NFA từng căn" },
      { tab: "Tầng 9–19 & 21–39", img: `${IMG}/green-skyline-mat-bang-thap-t3b-tang-9-39.webp`, w: 1400, h: 1044, alt: "Mặt bằng tầng điển hình 9–19 và 21–39 tháp T3B Green Skyline: căn 1PN+, 2PN, 3PN với diện tích GFA, NFA" },
      { tab: "Tầng 40 · Deluxe", img: `${IMG}/green-skyline-mat-bang-thap-t3b-tang-40-deluxe.webp`, w: 1400, h: 1042, alt: "Mặt bằng tầng 40 tháp T3B Green Skyline: các căn Deluxe với diện tích GFA và NFA" },
    ],
  },
];
/* ===== Căn hộ ===== */
export const COLLECTION_ROWS = [
  { loai: "Studio", so: "99", gfa: "40,08 – 44,78 m²", nfa: "35,18 – 40,20 m²" },
  { loai: "1PN+", so: "379", gfa: "50,54 – 64,37 m²", nfa: "45,10 – 58,24 m²" },
  { loai: "2PN", so: "523", gfa: "59,11 – 83,66 m²", nfa: "51,81 – 76,01 m²" },
  { loai: "2PN+", so: "49", gfa: "79,04 – 84,45 m²", nfa: "71,52 – 76,23 m²" },
  { loai: "3PN", so: "143", gfa: "79,44 – 108,15 m²", nfa: "71,50 – 99,99 m²" },
  { loai: "Deluxe", so: "18", gfa: "66,51 – 146,19 m²", nfa: "Tầng 28 T2 · tầng 40 T3A, T3B" },
  { loai: "Penthouse", so: "5", gfa: "130,34 – 234,58 m²", nfa: "Tầng 28 tháp T1" },
];

export interface UnitType {
  key: string; tab: string;
  img: string; img800?: string; w: number; h: number; alt: string;
  em: string; h3: string; specs: string[];
  dt: ReactNode; loai: string;
  extraLayout?: { src: string; alt: string };
}

export const UNIT_TYPES: UnitType[] = [
  {
    key: "studio", tab: "Studio",
    img: `${IMG}/green-skyline-layout-can-studio.webp`, img800: `${IMG}/green-skyline-layout-can-studio-800.webp`, w: 1000, h: 678,
    alt: "Layout căn hộ Studio Green Skyline: diện tích tim tường 40,08–44,78 m², sử dụng 35,18–40,20 m²",
    em: "Căn hộ Studio · 99 căn", h3: "Studio",
    specs: ["Khu ngủ, phòng khách và bếp liên thông", "1 vệ sinh, lô gia", "Tầng 4–27 tháp T2"],
    dt: (<>40,08 – 44,78 / 35,18 – 40,20 m²</>),
    loai: "Studio",
  },
  {
    key: "1pnp", tab: "1PN+",
    img: `${IMG}/green-skyline-layout-can-1pn-plus.webp`, w: 760, h: 1078,
    alt: "Layout căn hộ 1PN+ mẫu A1 Green Skyline: diện tích tim tường 50,54–55,56 m², sử dụng 45,10–50,65 m²",
    em: "Căn hộ 1 phòng ngủ+ · 379 căn", h3: "1PN+",
    specs: ["Phòng ngủ chính + phòng linh hoạt", "Phòng khách, bếp & bàn ăn", "6 mẫu A1, A2, B1, B2, C1, C2 – cả 4 tháp"],
    dt: (<>
      50,54 – 64,37 / 45,10 – 58,24 m²
      <small style={{ display: "block", fontWeight: 500, color: "var(--muted)", marginTop: 2 }}>Layout: mẫu A1 – 270 căn, 50,54 – 55,56 m² tim tường.</small>
    </>),
    loai: "1PN+",
  },
  {
    key: "2pn", tab: "2PN",
    img: `${IMG}/green-skyline-layout-can-2pn.webp`, w: 760, h: 1105,
    alt: "Layout căn hộ 2PN mẫu A1 Green Skyline: diện tích tim tường 67,81–68,31 m², sử dụng 60,67–61,31 m²",
    em: "Căn hộ 2 phòng ngủ · 523 căn", h3: "2PN",
    specs: ["2 phòng ngủ, 2 vệ sinh", "Phòng khách, bếp & bàn ăn, lô gia", "13 mẫu căn – loại căn nhiều nhất dự án"],
    dt: (<>59,11 – 83,66 / 51,81 – 76,01 m²<small style={{ display: "block", fontWeight: 500, color: "var(--muted)", marginTop: 2 }}>Layout: mẫu A1 – 203 căn, 67,81 – 68,31 m². Mẫu E lớn 80,96 – 83,66 m².</small></>),
    loai: "2PN",
    extraLayout: {
      src: `${IMG}/green-skyline-layout-can-2pn-mau-e.webp`,
      alt: "Layout căn hộ 2PN mẫu E Green Skyline: diện tích tim tường 80,96–83,66 m², sử dụng 73,59–76,01 m²",
    },
  },
  {
    key: "2pnp", tab: "2PN+",
    img: `${IMG}/green-skyline-layout-can-2pn-plus.webp`, w: 760, h: 1106,
    alt: "Layout căn hộ 2PN+ mẫu A Green Skyline: diện tích tim tường 79,04–84,45 m², sử dụng 71,52–76,23 m²",
    em: "Căn hộ 2 phòng ngủ+ · 49 căn", h3: "2PN+",
    specs: ["2 phòng ngủ + phòng linh hoạt", "Phòng khách, bếp & bàn ăn", "Mẫu A – tầng 4–27 tháp T1"],
    dt: (<>79,04 – 84,45 / 71,52 – 76,23 m²</>),
    loai: "2PN+",
  },
  {
    key: "3pn", tab: "3PN",
    img: `${IMG}/green-skyline-layout-can-3pn.webp`, w: 760, h: 1106,
    alt: "Layout căn hộ 3PN mẫu A1 Green Skyline: diện tích tim tường 79,44–79,64 m², sử dụng 71,5–72,14 m²",
    em: "Căn hộ 3 phòng ngủ · 143 căn", h3: "3PN",
    specs: ["3 phòng ngủ, 2 vệ sinh", "Phòng khách, bếp & bàn ăn, lô gia", "4 mẫu A1, A2, B, C"],
    dt: (<>79,44 – 108,15 / 71,50 – 99,99 m²<small style={{ display: "block", fontWeight: 500, color: "var(--muted)", marginTop: 2 }}>Layout: mẫu A1 – 84 căn. Mẫu B lớn 101,52 – 108,15 m².</small></>),
    loai: "3PN",
    extraLayout: {
      src: `${IMG}/green-skyline-layout-can-3pn-mau-b.webp`,
      alt: "Layout căn hộ 3PN mẫu B Green Skyline: diện tích tim tường 101,52–108,15 m², sử dụng 92,43–98,43 m²",
    },
  },
  {
    key: "deluxe", tab: "Deluxe",
    img: `${IMG}/green-skyline-mat-bang-thap-t2-tang-28-deluxe.webp`, w: 1400, h: 1037,
    alt: "Mặt bằng tầng 28 tháp T2 Green Skyline: các căn Deluxe với diện tích GFA và NFA",
    em: "Căn hộ Deluxe · 18 căn", h3: "Deluxe",
    specs: ["Tầng 28 tháp T2", "Tầng 40 tháp T3A, T3B", "Bàn giao thô – tự do thiết kế nội thất"],
    dt: (<>66,51 – 146,19 m²<small style={{ display: "block", fontWeight: 500, color: "var(--muted)", marginTop: 2 }}>Mặt bằng tầng 40 xem ở mục Mặt bằng.</small></>),
    loai: "Deluxe – Penthouse",
  },
  {
    key: "penthouse", tab: "Penthouse",
    img: `${IMG}/green-skyline-mat-bang-thap-t1-tang-28-penthouse.webp`, w: 1400, h: 1039,
    alt: "Mặt bằng tầng 28 tháp T1 Green Skyline: 5 căn Penthouse diện tích tim tường 130,34–234,58 m²",
    em: "Penthouse · 5 căn", h3: "Penthouse",
    specs: ["Tầng 28 tháp T1 – tầng cao nhất tháp", "Bàn giao thô – tự do thiết kế nội thất", "5 căn độc bản"],
    dt: (<>130,34 – 234,58 m²</>),
    loai: "Deluxe – Penthouse",
  },
];

export const INTERIOR_RENDER = [
  { src: `${IMG}/green-skyline-noi-that-can-1pn-bep-an.webp`, w: 700, h: 409, alt: "Phối cảnh nội thất căn hộ 1PN Green Skyline: bếp và bàn ăn tông gỗ sáng", cap: "1PN · bếp & bàn ăn" },
  { src: `${IMG}/green-skyline-noi-that-can-2pn-phong-ngu.webp`, w: 700, h: 426, alt: "Phối cảnh nội thất căn hộ 2PN Green Skyline: phòng ngủ tông xanh rêu và gỗ ấm", cap: "2PN · phòng ngủ" },
  { src: `${IMG}/green-skyline-noi-that-can-3pn-phong-khach.webp`, w: 700, h: 364, alt: "Phối cảnh nội thất căn hộ 3PN Green Skyline: phòng khách liền bếp và bàn ăn", cap: "3PN · phòng khách" },
  { src: `${IMG}/green-skyline-noi-that-can-3pn-phong-ngu-master.webp`, w: 700, h: 414, alt: "Phối cảnh nội thất căn hộ 3PN Green Skyline: phòng ngủ master với vách đầu giường bọc nệm", cap: "3PN · phòng ngủ master" },
];

/* ===== Bàn giao ===== */
export const HANDOVER_SUMMARY = [
  { b: "Sàn & tường", span: "Gạch Porcelain vân gỗ 150×900 mm (Viglacera / Á Mỹ), sơn Jotun, trần thạch cao Vĩnh Tường." },
  { b: "Cửa & khóa", span: "Cửa chính gỗ chống cháy EI60 (An Cường / American Door), khóa điện tử 5 cách mở Häfele: vân tay, mã số, thẻ từ, chìa cơ, app." },
  { b: "Phòng tắm", span: "Thiết bị vệ sinh Kohler, vách kính tắm đứng cường lực, máy nước nóng Ferroli." },
  { b: "Bếp", span: "Tủ bếp An Cường / Mỹ Khang / Casta, bếp từ + máy hút mùi Panasonic / Häfele / Teka." },
  { b: "Điện & tiện nghi", span: "Thiết bị Hager, LS, cáp Cadivi; chuông cửa màn hình 7 inch Aiphone (Nhật Bản)." },
  { b: "Điều hòa", span: "Không gồm máy – chờ sẵn ống đồng, ống nước ngưng để lắp đặt sau." },
];

export const HANDOVER_RAW = "Bàn giao thô: căn Deluxe, Penthouse (tầng 28 tháp T1, T2; tầng 40 tháp T3A, T3B) và shophouse khối đế.";
/* ===== Chủ đầu tư / Vận hành ===== */
export const OPERATOR = {
  fig: {
    src: `${IMG}/green-skyline-tbs-land-savills-hop-tac-van-hanh.webp`,
    w: 871, h: 697,
    alt: "Đại diện TBS Land và Savills – đơn vị quản lý vận hành Green Skyline (ảnh tài liệu chủ đầu tư)",
  },
  h3: "Vận hành từ trái tim",
  paras: [
    (<>Green Skyline được vận hành bởi <b>Savills</b> – đơn vị quản lý bất động sản quốc tế với hơn 170 năm kinh nghiệm – mang đến hệ tiêu chuẩn quản lý chuyên nghiệp cho một cộng đồng sống văn minh, an toàn.</>),
    "Quy trình chuyên nghiệp cùng đội ngũ vận hành được đào tạo bài bản giúp mọi hoạt động quản lý hướng đến sự ổn định và chất lượng sống lâu dài cho cư dân.",
  ],
};

export const TBS_STATS = [
  { b: "70", span: "Quốc gia xuất khẩu đến" },
  { b: "31", span: "Nhà máy khắp cả nước" },
  { b: "07", span: "Trung tâm R&D" },
  { b: "45.000+", span: "Cán bộ công nhân viên" },
  { b: "100 ha", span: "Kho vận logistics" },
  { b: "04", span: "Lĩnh vực hoạt động" },
];

export const PARTNERS_IMG = {
  src: `${IMG}/green-skyline-doi-tac-thiet-ke-thi-cong-van-hanh.webp`,
  src800: `${IMG}/green-skyline-doi-tac-thiet-ke-thi-cong-van-hanh-800.webp`,
  w: 1100, h: 729,
  alt: "Đối tác Green Skyline: Vertical Studio, Savills, SOL E&C, ICIC và LJ-Asia – thiết kế, vận hành, thi công, giám sát, cảnh quan",
};

/* ===== Chính sách ===== */
export const POLICY_OPTIONS = [
  { em: "Lựa chọn 1", so: (<>CK 8%<small>trừ vào giá bán</small></>), p: "Áp dụng cho tất cả loại căn hộ, trừ căn 1PN+, 2PN tháp Skyline Central, căn hộ khối đế, Deluxe, Penthouse.", hl: true },
  { em: "Lựa chọn 2", so: (<>CK 6%<small>+ tặng gói nội thất</small></>), p: "Áp dụng cho căn 1PN+, 2PN tháp Skyline Central.", hl: false },
  { em: "Lựa chọn 3", so: (<>CK 7%<small>trừ vào giá bán</small></>), p: "Áp dụng cho căn hộ khối đế, Deluxe, Penthouse.", hl: false },
];

export const EXTRA_PERKS = [
  { b: "Thêm 1% – thanh toán sớm đủ 10%", span: "Thanh toán đủ 10% trong 72 giờ kể từ khi xác nhận chọn căn và hoàn tất ký hợp đồng mua bán đúng hạn." },
  { b: "Mua sỉ: thêm 1% – 2,5%", span: "2 sản phẩm 1% · 3 sản phẩm 1,5% · 4 sản phẩm 2% · từ 5 sản phẩm 2,5% – giao dịch cùng thờI điểm, đứng tên trực tiếp." },
];

export const PAYMENT_METHODS = [
  { em: "Phương thức 1", h3: "Thanh toán chuẩn 16 tháng", so: (<>CK 4%<small>trên giá sau chiết khấu chương trình</small></>), p: "10% ký HĐMB · 6 đợt × 5% mỗi 2 tháng · 55% + phí bảo trì khi bàn giao (dự kiến 12/2027) · 5% khi nhận sổ hồng.", hl: false },
  { em: "Phương thức 2", h3: "Vay ngân hàng 50%", so: (<>0% lãi suất<small>tối đa 24 tháng, không quá 15/10/2028</small></>), p: "Khách hàng 10% + 5% · 30% + phí bảo trì khi bàn giao (dự kiến 04/2027) · 5% khi nhận sổ; ngân hàng giải ngân 35% + 15%.", hl: false },
  { em: "Phương thức 3", h3: "Vay ngân hàng 70%", so: (<>0% · 18 tháng<small>hoặc lãi cố định 5,5% tối đa 36 tháng</small></>), p: "Khách hàng 10% + 5% · 10% + phí bảo trì khi bàn giao (dự kiến 04/2027) · 5% khi nhận sổ; ngân hàng giải ngân 35% + 35%.", hl: false },
  { em: "Phương thức 4", h3: "Thanh toán nhanh 40%", so: (<>CK 7,5%<small>trên giá sau chiết khấu chương trình</small></>), p: "10% ký HĐMB · 30% trong 4 ngày · 3 đợt × 10% · 25% + phí bảo trì khi bàn giao (dự kiến 05/2027) · 5% khi nhận sổ.", hl: false },
  { em: "Phương thức 5", h3: "Thanh toán nhanh 55%", so: (<>CK 8,5%<small>trên giá sau chiết khấu chương trình</small></>), p: "10% ký HĐMB · 45% trong 4 ngày · 3 đợt × 5% · 25% + phí bảo trì khi bàn giao (dự kiến 05/2027) · 5% khi nhận sổ.", hl: false },
  { em: "Phương thức 6", h3: "Thanh toán nhanh 70%", so: (<>CK 10%<small>nhận nhà sớm Quý 1/2027</small></>), p: "10% ký HĐMB · 60% trong 4 ngày · 25% + phí bảo trì khi bàn giao (dự kiến 01/2027) · 5% khi nhận sổ.", hl: true },
];

export const PAYMENT_SCHEDULE: { b: string; span: string; nha?: boolean }[] = [
  { b: "50 triệu", span: "Đăng ký giữ chỗ" },
  { b: "10%", span: "Ký HĐMB trong 7 ngày kể từ khi xác nhận chọn căn" },
  { b: "6 × 5%", span: "Mỗi đợt cách nhau 2 tháng (đợt 2 – đợt 7)" },
  { b: "55%", span: "+ kinh phí bảo trì khi bàn giao nhà (dự kiến 12/2027)", nha: true },
  { b: "5%", span: "Khi nhận sổ hồng" },
];

export const POLICY_NOTE =
  "Chính sách do Công ty Cổ phần Đầu tư Thái Bình (TBS Land) ban hành, áp dụng cho khách hàng thanh toán đủ đợt 1 và ký hợp đồng mua bán mới trong thờI gian áp dụng; chủ đầu tư bảo lưu quyền điều chỉnh. Vay vốn tại ngân hàng chủ đầu tư chỉ định (Shinhan, Vietcombank, VietinBank). Giá bán và bảng tính dòng tiền theo từng căn do chuyên viên ERA cung cấp.";

/* ===== FAQ ===== */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Green Skyline nằm ở đâu?",
    a: "Green Skyline nằm mặt tiền Quốc lộ 1K, giao đường GS1 và GS5, trong khu đô thị Green Square (Quảng Trường Xanh) 39 ha, phường Đông Hòa, TP. Hồ Chí Minh (trước ngày 1/7/2025 thuộc TP. Dĩ An, tỉnh Bình Dương). Dự án cạnh siêu thị GO! và Bệnh viện Quốc tế Hoàn Mỹ, khoảng 25 phút tới trung tâm TP.HCM (VIFC) và trung tâm TP. Đồng Nai.",
  },
  {
    q: "Chủ đầu tư và quy mô Green Skyline ra sao?",
    a: "Green Skyline do TBS Land – thành viên TBS Group – phát triển; pháp nhân chủ đầu tư là Công ty Cổ phần Đầu tư Thái Bình. Dự án gồm 4 tháp T1, T2, T3A, T3B cao 28–40 tầng trên khối đế 3 tầng, tổng cộng 1.296 căn hộ Studio, 1PN+, 2PN, 2PN+, 3PN, Deluxe, Penthouse và shophouse khối đế. Tổng thầu SOL E&C, thiết kế kiến trúc Vertical Studio, cảnh quan LJ-Asia, tư vấn giám sát ICIC, quản lý vận hành Savills.",
  },
  {
    q: "Căn hộ Green Skyline có diện tích bao nhiêu?",
    a: "Theo diện tích tim tường: Studio 40,08 – 44,78 m², 1PN+ 50,54 – 64,37 m², 2PN 59,11 – 83,66 m², 2PN+ 79,04 – 84,45 m², 3PN 79,44 – 108,15 m², Deluxe 66,51 – 146,19 m² và Penthouse 130,34 – 234,58 m². Diện tích sử dụng của Studio từ 35,18 m² đến 3PN tối đa 99,99 m².",
  },
  {
    q: "Pháp lý Green Skyline đã đủ điều kiện bán chưa?",
    a: "Ngày 19/12/2025, Sở Xây dựng TP.HCM có văn bản số 20795/SXD-PTĐT thông báo 1.296 căn hộ thuộc công trình Nhà chung cư OCC, dự án Khu đô thị – Thương mại – Dịch vụ Quảng Trường Xanh đủ điều kiện bán nhà ở hình thành trong tương lai. Dự án có giấy phép xây dựng số 1713/GPXD ngày 09/05/2023.",
  },
  {
    q: "Green Skyline đã xây đến đâu, khi nào nhận nhà?",
    a: "Green Skyline đã cất nóc ngày 22/12/2024, cảnh quan và tiện ích tầng 3 đã gần hoàn thiện. Theo chính sách bán hàng ngày 14/09/2026, khách hàng chọn phương thức thanh toán nhanh 70% được nhận nhà sớm dự kiến Quý 1/2027; các phương thức khác theo mốc bàn giao dự kiến từ 04/2027 đến 12/2027 do chủ đầu tư công bố.",
  },
  {
    q: "Chính sách thanh toán Green Skyline hiện nay ra sao?",
    a: "Theo Thông báo 133/2026/CSBH-TB áp dụng từ 15/09/2026: chiết khấu chương trình 6% đến 8% tùy loại căn; 6 phương thức gồm thanh toán chuẩn 16 tháng chiết khấu 4%, vay ngân hàng 50% hoặc 70% với lãi suất 0% tối đa 24 hoặc 18 tháng (hoặc lãi cố định 5,5% tối đa 36 tháng), thanh toán nhanh 40%, 55%, 70% chiết khấu 7,5%, 8,5%, 10%. Giữ chỗ 50 triệu đồng.",
  },
  {
    q: "Tiện ích nội khu Green Skyline gồm những gì?",
    a: "Tiện ích trải trên 4 tầng: tầng 1 có trạm sạc ô tô điện, sân chơi trẻ em, khu thể dục ngoài trờI, phố đi bộ, nhà trẻ; tầng 2 có khu vui chơi trẻ em, billiards, bóng bàn; tầng 3 có hồ bơi chuẩn resort, hồ bơi trẻ em, chòi nghỉ tổ chim, BBQ, gym, yoga, sauna, thư viện, cà phê; tầng 20 là sky garden với yoga ngoài trờI, khu dưỡng sinh, đài quan sát, vườn thiền và cầu vọng cảnh. An ninh camera 4 lớp, khóa vân tay, thẻ từ.",
  },
  {
    q: "Căn hộ Green Skyline bàn giao như thế nào?",
    a: "Căn hộ bàn giao hoàn thiện cơ bản: sàn gạch Porcelain vân gỗ Viglacera hoặc Á Mỹ, sơn Jotun, trần thạch cao Vĩnh Tường, cửa chính chống cháy EI60, khóa điện tử Häfele 5 cách mở, thiết bị vệ sinh Kohler, máy nước nóng Ferroli, tủ bếp, bếp từ và máy hút mùi. Căn Deluxe, Penthouse (tầng 28 tháp T1, T2 và tầng 40 tháp T3A, T3B) cùng shophouse bàn giao thô.",
  },
];

/* ===== CTA form ===== */
export const PRODUCT_TYPES = ["Studio", "1PN+", "2PN", "2PN+", "3PN", "Deluxe – Penthouse"];

export const CTA = {
  kick: "Trải nghiệm thật",
  h2: (<>Đăng ký tham quan căn hộ mẫu &amp; tiện ích thực tế</>),
  lead: "Trải nghiệm trực tiếp căn hộ hoàn thiện và tiện ích tầng 3 đã đưa vào hoạt động; nhận bảng giá và bảng tính dòng tiền từ ERA Vietnam.",
  bullets: [
    "Tham quan căn hộ hoàn thiện theo tiêu chuẩn bàn giao",
    "Bảng giá, bảng tính dòng tiền theo từng căn",
    "Chính sách bán hàng mới nhất và 6 phương thức thanh toán",
  ],
  loaiChips: ["Studio", "1PN+", "2PN", "2PN+", "3PN", "Deluxe – Penthouse"],
  ket: "Chuyên viên ERA gọi lại xác nhận lịch, đón anh/chị tham quan dự án.",
  formTitle: "Đăng ký tham quan",
  formSub: "Tham quan căn hộ mẫu & tiện ích thực tế · nhận bảng giá, bảng tính dòng tiền · bảo mật thông tin",
  ctaBg: `${IMG}/green-skyline-tien-ich-tang-3-thuc-te-dang-ky-tham-quan.webp`,
};
