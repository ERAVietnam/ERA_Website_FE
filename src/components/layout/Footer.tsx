"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";

const s = {
  footerBg: { backgroundColor: colors.primary.navy.DEFAULT },
  textWhite: { color: colors.neutral.white },
  textMuted: { color: colors.gray[300] },
  textFaint: { color: colors.gray[400] },
  borderTop: { borderTop: `1px solid ${colors.gray[700]}` },
};

export function Footer() {
  return (
    <footer className="py-12 lg:py-16" style={{ ...s.footerBg, ...s.textWhite }}>
      <Container>
        {/* Desktop: Logo only on top left */}
        <div className="hidden lg:flex items-center gap-3 mb-6">
          <Image
            src="/shared/logo_short_white.svg"
            alt="ERA Vietnam"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold" style={s.textWhite}>ERA Vietnam</span>
        </div>

        {/* Mobile: Logo + Company Name */}
        <div className="lg:hidden mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/shared/logo_short_white.svg"
              alt="ERA Vietnam"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold" style={s.textWhite}>ERA Vietnam</span>
          </div>
          <p className="text-sm tracking-wider font-semibold" style={s.textWhite}>
            CÔNG TY CỔ PHẦN BẤT ĐỘNG SẢN ERA VIỆT NAM
          </p>
        </div>

        {/* Desktop: 4 Headings in 1 row - Flexbox */}
        <div className="hidden lg:flex items-baseline justify-between mb-5">
          <h3 className="text-sm tracking-wider font-semibold leading-snug" style={{ width: '28%' }}>
            CÔNG TY CỔ PHẦN BẤT ĐỘNG SẢN ERA VIỆT NAM
          </h3>
          <h4 className="text-sm font-semibold leading-none" style={{ width: '22%' }}>
            Văn phòng làm việc
          </h4>
          <h4 className="text-sm font-semibold leading-none" style={{ width: '15%' }}>
            Về chúng tôi
          </h4>
          <h4 className="text-sm font-semibold text-left leading-none" style={{ width: '15%' }}>
            Theo dõi chúng tôi
          </h4>
        </div>

        {/* Main Footer Content - 4 Columns */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4 mb-10">
          {/* Column 1: MST, Address, Contact */}
          <div className="lg:w-[28%]">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs leading-relaxed pl-6" style={s.textMuted}>
                  MST: 0312393109 - Sở KHĐT TP. Hồ Chí Minh cấp ngày 30/07/2013
                </p>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={s.textMuted}>
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs leading-relaxed" style={s.textMuted}>
                    Địa chỉ ĐKKD: Lầu 14, L14-01, 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>

              {/* Main Office - mobile only */}
              <div className="flex items-start gap-2 lg:hidden">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={s.textWhite}>
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-semibold" style={s.textWhite}>Trụ sở chính</p>
                  <p className="text-xs leading-relaxed mt-1" style={s.textMuted}>
                    Số 22 - 24, Đường số 5, KĐT Sala, Phường An Khánh, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={s.textMuted}>
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href="tel:18006701"
                  className="text-xs transition-colors hover:opacity-80"
                  style={s.textMuted}
                  onClick={(e) => {
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                      navigator.userAgent
                    );
                    if (!isMobile) {
                      e.preventDefault();
                      navigator.clipboard.writeText("18006701").catch(() => {});
                      alert("Số hotline đã được sao chép: 1800 6701");
                    }
                  }}
                >
                  Hotline: 1800 6701
                </a>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={s.textMuted}>
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href="mailto:info@era.com.vn"
                  className="text-xs transition-colors hover:opacity-80"
                  style={s.textMuted}
                  onClick={(e) => {
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                      navigator.userAgent
                    );
                    if (!isMobile) {
                      e.preventDefault();
                      navigator.clipboard.writeText("info@era.com.vn").catch(() => {});
                      alert("Địa chỉ email đã được sao chép: info@era.com.vn");
                    }
                  }}
                >
                  Email: info@era.com.vn
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Office Locations */}
          <div className="lg:w-[22%]">
            {/* Mobile heading */}
            <h4 className="lg:hidden text-base font-semibold mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={s.textWhite}>
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Văn Phòng Chi Nhánh
            </h4>

            {/* Desktop: Trụ sở chính */}
            <div className="hidden lg:block mb-4">
              <div className="flex items-start gap-2 mb-1">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={s.textWhite}>
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold" style={s.textWhite}>Trụ sở chính</p>
              </div>
              <p className="text-xs leading-relaxed pl-6" style={s.textMuted}>
                Số 22 - 24, Đường số 5, KĐT Sala, Phường An Khánh, TP. Hồ Chí Minh
              </p>
            </div>

            <div className="mb-4">
              <div className="flex items-start gap-2 mb-1">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={s.textWhite}>
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold" style={s.textWhite}>VP Đà Nẵng:</p>
              </div>
              <p className="text-xs leading-relaxed pl-6" style={s.textMuted}>
                Tầng 2, 368 Trần Hưng Đạo, phường An Hải, TP. Đà Nẵng
              </p>
            </div>

            <div>
              <div className="flex items-start gap-2 mb-1">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={s.textWhite}>
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold" style={s.textWhite}>VP Hà Nội:</p>
              </div>
              <p className="text-xs leading-relaxed pl-6" style={s.textMuted}>
                P201 Toà nhà Viễn Đông, số 36 Hoàng Cầu, Phường Ô Chợ Dừa, Hà Nội
              </p>
            </div>
          </div>

          {/* Column 3: About Links */}
          <div className="lg:w-[15%]">
            {/* Mobile heading */}
            <h4 className="lg:hidden text-base font-semibold mb-4" style={s.textWhite}>Về chúng tôi</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm transition-colors hover:opacity-80" style={s.textMuted}>
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm transition-colors hover:opacity-80" style={s.textMuted}>
                  Lĩnh vực hoạt động
                </Link>
              </li>
              <li>
                <Link href={ROUTES.apply} className="text-sm transition-colors hover:opacity-80" style={s.textMuted}>
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links */}
          <div className="lg:w-[15%]">
            {/* Mobile heading */}
            <h4 className="lg:hidden text-base font-semibold mb-4" style={s.textWhite}>Theo dõi chúng tôi</h4>
            <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
              {/* Mobile: icon only */}
              <Link href="https://www.facebook.com/eraviet" target="_blank" rel="noopener noreferrer" className="lg:hidden transition-colors hover:opacity-80">
                <Image src="/shared/fb_icon.svg" alt="Facebook" width={40} height={40} className="w-10 h-10" />
              </Link>
              <Link href="https://www.youtube.com/@ERAVIETNAM" target="_blank" rel="noopener noreferrer" className="lg:hidden transition-colors hover:opacity-80">
                <Image src="/shared/ytb_icon.svg" alt="Youtube" width={40} height={40} className="w-10 h-10" />
              </Link>
              {/* Desktop: icon + text */}
              <Link href="https://www.facebook.com/eraviet" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-3 text-sm transition-colors hover:opacity-80" style={s.textMuted}>
                <Image src="/shared/fb_icon.svg" alt="Facebook" width={24} height={24} className="w-6 h-6" />
                Facebook
              </Link>
              <Link href="https://www.youtube.com/@ERAVIETNAM" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-3 text-sm transition-colors hover:opacity-80" style={s.textMuted}>
                <Image src="/shared/ytb_icon.svg" alt="Youtube" width={24} height={24} className="w-6 h-6" />
                Youtube
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col gap-4" style={s.borderTop}>
          {/* Mobile */}
          <div className="flex flex-col gap-3 lg:hidden">
            <p className="text-xs" style={s.textFaint}>© 2026 ERA Vietnam. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href={ROUTES.terms} className="text-xs transition-colors hover:opacity-80" style={s.textFaint}>
                Điều khoản sử dụng
              </Link>
              <Link href={ROUTES.privacy} className="text-xs transition-colors hover:opacity-80" style={s.textFaint}>
                Chính sách bảo mật
              </Link>
            </div>
            <Link
              href="http://online.gov.vn/nen-tang/83f3a2b6-2943-4aad-8a47-d20ce57305c6"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start transition-opacity hover:opacity-80"
              aria-label="Bộ Công Thương"
            >
              <img
                src="/shared/bct_icon.svg"
                alt="Bộ Công Thương"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex flex-row justify-between items-center gap-4">
            <Link
              href="http://online.gov.vn/nen-tang/83f3a2b6-2943-4aad-8a47-d20ce57305c6"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Bộ Công Thương"
            >
              <img
                src="/shared/bct_icon.svg"
                alt="Bộ Công Thương"
                className="h-12 w-auto"
              />
            </Link>
            
            <div className="flex items-center gap-6">
              <p className="text-xs" style={s.textFaint}>© 2026 ERA Vietnam. All rights reserved.</p>
              <Link href={ROUTES.terms} className="text-xs transition-colors hover:opacity-80" style={s.textFaint}>
                Điều khoản sử dụng
              </Link>
              <Link href={ROUTES.privacy} className="text-xs transition-colors hover:opacity-80" style={s.textFaint}>
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
