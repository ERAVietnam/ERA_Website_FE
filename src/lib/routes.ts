// ============================================
// ERA Vietnam - Route Configuration
// Centralized route management for easy maintenance
// ============================================

export const ROUTES = {
  // Main Pages
  home: "/",
  aboutUs: "/ve-chung-toi",
  compass: "/ve-chung-toi/compass",
  apac: "/ve-chung-toi/apac",
  era: "/ve-chung-toi/era-real-estate",
  eraVn: "/ve-chung-toi/ve-era-viet-nam",
  projects: "/du-an",
  projectDetail: "/du-an/chi-tiet",
  join: "/gia-nhap",
  apply: "/tuyen-dung",
  academy: "/academy",
  news: "/tin-tuc",
  newsCategory: "/tin-tuc",
  login: "/dang-nhap",
  contact: "/lien-he",
  
  
  // Join Team Sub-pages
  commission: "/gia-nhap/commission",
  training: "/gia-nhap/training",
  inventory: "/gia-nhap/inventory",
  technology: "/gia-nhap/technology",

  // Apply Sub-pages
  applyDetail: "/tuyen-dung/chi-tiet-cong-viec",
  
  // Footer Links
  brandStory: "/cau-chuyen-thuong-hieu",
  operations: "/linh-vuc-hoat-dong",
  recruitment: "/tuyen-dung",
  
  // Legal
  terms: "/dieu-khoan-su-dung",
  privacy: "/chinh-sach-bao-mat",
} as const;

export default ROUTES;
