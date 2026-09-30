import { withOpacity } from "@/lib/theme";

/* ============================================
   Bảng màu RIÊNG của trang /tuyen-dung-thu-cap
   (theo yêu cầu design — chỉ áp dụng trong folder resales,
   không ảnh hưởng các trang khác của site)
   ============================================ */
export const rc = {
  /** Navy — thay thế colors.primary.navy.DEFAULT (#0C0C44) của site CHỈ ở trang này */
  navy: "#26235C",
  navyS20: withOpacity("#26235C", 0.2),

  /** Đỏ band số liệu — riêng section NHỮNG CON SỐ NỔI BẬT */
  redBand: "#A80027",
};
