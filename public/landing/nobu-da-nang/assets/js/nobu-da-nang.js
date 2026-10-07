/* Nobu Residences Danang landing — JS thuần, không thư viện (khung The Legend Đà Nẵng).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác + hiệu ứng vết loang mở ảnh ở hero. */
(function () {
  'use strict';

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '/api/submit-lead/';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ==================== HERO · VẾT LOANG MỞ ẢNH ====================
     Theo mẫu projects/template/hieu-ung/01-vet-loang-mo-anh (Hoiana Beach Villas › initAmenitiesWithMask), viết lại bằng JS thuần
     (mẫu dùng GSAP + ScrollTrigger + Lenis + Swiper ~290 KB; ở đây ghim bằng position:sticky, "trễ mềm" bằng nội suy mỗi khung hình).
     Chỉ chạy khi <html> có lớp .vl (đã gắn trong <head> nếu người dùng không tắt chuyển động). */
  (function vetLoang() {
    var hero = $('#hero');
    if (!hero) return;
    var khung = $('.vl-khung', hero), lop = $('.vl-anh', hero), cuon = $('.vl-cuon', hero);
    var slides = $$('.vl-slide', hero), so = $('.vl-so', hero), cap = $('.vl-cap', hero);

    /* ---- slider ‹ 01 / 03 › (chạy cả khi tắt hiệu ứng) ---- */
    var dang = 0;
    function chonAnh(i) {
      dang = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === dang); });
      so.textContent = ('0' + (dang + 1)).slice(-2) + ' / ' + ('0' + slides.length).slice(-2);
      cap.textContent = slides[dang].getAttribute('data-cap') || '';
    }
    $('.vl-lui', hero).addEventListener('click', function () { chonAnh(dang - 1); });
    $('.vl-toi', hero).addEventListener('click', function () { chonAnh(dang + 1); });
    var vuot = null;   // vuốt ngang trên điện thoại
    lop.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') vuot = e.clientX; });
    lop.addEventListener('pointerup', function (e) {
      if (vuot === null) return;
      var d = e.clientX - vuot; vuot = null;
      if (Math.abs(d) > 50) chonAnh(dang + (d < 0 ? 1 : -1));
    });
    // ảnh 2, 3 bị cắt + ẩn -> loading=lazy có thể không tải: ép tải sau khi trang tải xong
    addEventListener('load', function () { $$('.vl-slide img', hero).forEach(function (im) { im.loading = 'eager'; }); });

    if (!document.documentElement.classList.contains('vl')) return;

    /* ===== CHỈNH Ở ĐÂY ===== (quãng đường ghim chỉnh ở CSS: --ghim) */
    var DO_TRE = 0.5;                     // "trễ mềm" theo chuột, giây (mẫu: scrub 0.5)
    var VET_LOANG_BAN_DAU = [170, 230];   // bề rộng vết loang lúc đầu: 15% màn hình, kẹp 170–230 px
    var ZOOM_DAU = 1.7;                   // ảnh 1 lúc đầu phóng to, thân tháp nằm giữa vết loang
    var PHAN_LOGO = 0.12;                 // đoạn lăn đầu: logo Nobu mờ đi, vết loang nở từ 0 ra cỡ ban đầu
    /* ======================== */

    var matNa = $('.vl-mat-na', hero), tren = $('.vl-chu-tren', hero), duoi = $('.vl-chu-duoi', hero);
    var logo = $('.vl-logo', hero), moTa = $('.vl-mo-ta', hero), goiY = $('.vl-goi-y', hero), eT = $('.vl-enso--trai', hero), eP = $('.vl-enso--phai', hero);
    var lopChu = [$('.vl-phu', hero), $('.vl-noi-dung', hero), $('.vl-dieu-khien', hero)];   // tiêu đề + lớp phủ tối + nút: hiện ở nửa sau

    // Hình vết loang (giọt nước méo) — khung 247 × 244, lấy nguyên từ mẫu
    var VET = 'M136.52 0C138.731 0 141.479 0.054 144.61 0.195 L151.473 0.55 L151.592 0.62 C155.828 0.942 160.48 1.404 165.321 2.064 L172.175 3.033 L172.417 3.162 C177.608 4.054 182.886 5.189 188.007 6.612 L188.184 6.622 L195.058 8.821 C198.171 9.877 201.18 11.087 204.006 12.439 C206.133 13.458 208.438 14.708 210.792 16.113 L218.821 21.251 L219.128 21.65 C223.536 24.883 227.621 28.421 230.548 31.813 C238.156 40.641 244.143 64.854 245.355 80.782 C246.315 93.407 248.895 123.345 235.566 155.391 C230.824 166.79 208.276 196.445 185.949 213.105 C167.626 226.779 130.153 244 83.176 244 C71.141 244 52.306 236.802 38.149 228.54 C35.086 226.516 28.424 222.302 27.541 221.64 C27.374 221.514 27.172 221.269 26.948 220.94 C23.848 218.428 21.474 215.983 20.165 213.778 C16.772 204.474 16.356 202.375 16.018 200.151 L15.12 193.486 L14.844 187.689 V180.833 C14.624 178.733 14.618 176.566 14.631 174.399 L14.84 165.428 C14.798 164.622 14.822 163.796 14.844 162.975 V157.052 L15.397 149.875 C15.329 145.3 15.369 141.312 15.236 138.092 C15.213 136.366 14.749 132.729 14.315 130.929 C13.471 128.324 12.186 125.045 10.721 121.575 L7.943 115.097 C6.613 112.17 5.368 109.354 4.329 106.841 C3.894 105.617 2.754 102.564 1.871 99.916 C1.81 99.732 1.772 99.501 1.752 99.23 C-0.18 90.456 -1.235 71.767 2.507 62.946 C5.087 56.871 14.444 48.35 25.105 40.181 L31.485 35.474 C36.622 31.714 41.798 28.201 46.481 25.166 L52.658 21.25 C54.26 20.209 57.8 18.011 60.583 16.585 C61.142 16.28 61.641 16.015 62.075 15.796 C63.537 15.056 65.363 14.293 67.471 13.52 C68.825 12.971 70.067 12.503 71.152 12.142 C73.139 11.479 76.212 10.577 77.5 10.209 C82.192 9.013 92.46 6.455 95.993 5.793 C99.526 5.131 101.882 4.506 102.618 4.414 L102.854 4.397 C107.854 3.419 112.808 2.557 117.439 1.861 L117.799 1.652 C119.179 1.468 122.436 1.045 124.423 0.824 C124.723 0.791 125.112 0.775 125.565 0.771 C129.865 0.279 133.627 0 136.52 0Z';
    var TAM_X = 123.5, TAM_Y = 122, RONG = 247;
    var TOKEN = VET.match(/[MLCVHZ]|[-+]?\d*\.?\d+/gi);

    // clipPath SVG (url(#…)) thay cho clip-path: path() — Safari điện thoại mới chạy được (như mẫu)
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    svg.innerHTML = '<defs><clipPath id="vlClip" clipPathUnits="userSpaceOnUse"><path/></clipPath></defs>';
    document.body.appendChild(svg);
    var duongCat = svg.querySelector('path');
    lop.style.webkitClipPath = 'url(#vlClip)'; lop.style.clipPath = 'url(#vlClip)';

    // phóng to + dời toạ độ path trực tiếp (Safari không ăn transform trong clipPath ổn định)
    function bienDoi(tx, ty, s) {
      var t = TOKEN, out = [], i = 0;
      while (i < t.length) {
        var c = t[i++];
        if (/[MLC]/i.test(c)) { out.push(c); while (i < t.length && !/[A-Z]/i.test(t[i])) { out.push((+t[i++] * s + tx).toFixed(1), (+t[i++] * s + ty).toFixed(1)); } }
        else if (/[VH]/i.test(c)) { out.push(c); while (i < t.length && !/[A-Z]/i.test(t[i])) out.push((+t[i++] * s + (c.toUpperCase() === 'V' ? ty : tx)).toFixed(1)); }
        else out.push('Z');
      }
      return out.join(' ');
    }

    var W = 0, H = 0, tiLeGoc = 1, tiLeCuoi = 15, batDau = 0, quangDuong = 1, dt = false;
    function doKichThuoc() {
      W = khung.clientWidth; H = khung.clientHeight; dt = innerWidth <= 760;
      tiLeGoc = Math.min(Math.max(VET_LOANG_BAN_DAU[0], W * 0.15), VET_LOANG_BAN_DAU[1]) / RONG;
      tiLeCuoi = (Math.hypot(W, H) / (RONG * tiLeGoc)) * 1.6;   // đủ phủ cả góc màn hình, dư vì hình không tròn
      var hdr = $('#hdr').offsetHeight;
      batDau = hero.getBoundingClientRect().top + scrollY - hdr;
      quangDuong = Math.max(1, hero.offsetHeight - H);
    }
    var easeIO = function (x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };   // power2.inOut
    var easeO = function (x) { return 1 - (1 - x) * (1 - x); };                                     // power2.out

    var hien = 0, dich = 0, tTruoc = 0, dangChay = false;
    function ve() {
      // 0. màn đầu chỉ có logo Nobu; lăn đoạn đầu thì logo mờ + thu nhỏ, vết loang nở ra đúng chỗ logo
      var a = easeO(Math.min(1, hien / PHAN_LOGO));
      logo.style.opacity = String(1 - a);
      logo.style.transform = 'translate(-50%,-50%) scale(' + (1 - a * 0.25).toFixed(3) + ')';
      var h = Math.max(0, (hien - PHAN_LOGO) / (1 - PHAN_LOGO));   // phần còn lại: hiệu ứng như cũ
      var mo = easeIO(h);
      // 1. vết loang: nở từ cỡ ban đầu tới phủ kín khung
      var s = tiLeGoc * a * (1 + mo * (tiLeCuoi - 1));
      duongCat.setAttribute('d', bienDoi(W / 2 - TAM_X * s, H / 2 - TAM_Y * s, s));
      // 2. ảnh lùi từ cận cảnh (thân tháp giữa vết loang) về toàn cảnh — máy tính: tháp ở 30% chiều ngang ảnh
      var d = Math.pow(1 - mo, 2), k = 1 + (ZOOM_DAU - 1) * d;
      var tx = dt ? -(k - 1) * W / 2 : d * (W / 2 - 0.3 * W * ZOOM_DAU);
      var ty = -(k - 1) * H / 2;
      cuon.style.transform = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) scale(' + k.toFixed(4) + ')';
      // 3. chữ tách lên – xuống, ensō trượt ra hai bên (nửa đầu quãng lăn)
      var e = easeO(Math.min(1, h / 0.5)), nua = RONG * s / 2 * 0.99;
      var cach = Math.max(nua, RONG * tiLeGoc / 2) + 28 + e * 140;
      tren.style.transform = 'translate(-50%,calc(-100% - ' + cach.toFixed(1) + 'px))';
      duoi.style.transform = 'translate(-50%,' + cach.toFixed(1) + 'px)';
      tren.style.opacity = duoi.style.opacity = String(1 - e);
      moTa.style.transform = 'translate(-50%,' + (RONG * tiLeGoc / 2 + 28 + duoi.offsetHeight + 26).toFixed(1) + 'px)';
      moTa.style.opacity = goiY.style.opacity = String(Math.max(0, 1 - hien * 12));
      eT.style.transform = 'translate(' + (-e * 250) + 'px,-50%) rotate(-12deg)';
      eP.style.transform = 'translate(' + (e * 250) + 'px,-50%) rotate(150deg)';
      eT.style.opacity = eP.style.opacity = String((dt ? 0.24 : 0.32) * (1 - e));
      // 4. tiêu đề, lớp phủ tối, nút ‹ › hiện dần khi vết loang đã đủ lớn (không lọt chữ vào giọt lúc đầu)
      var c = Math.min(1, Math.max(0, (h - 0.42) / 0.38));
      lopChu.forEach(function (el) { el.style.opacity = String(c); el.style.visibility = c > 0 ? 'visible' : 'hidden'; });
      matNa.style.visibility = hien > 0.985 ? 'hidden' : 'visible';
      // khi đã phủ kín: bỏ cắt cho nhẹ máy
      if (hien > 0.999) { lop.style.clipPath = lop.style.webkitClipPath = 'none'; }
      else if (lop.style.clipPath === 'none') { lop.style.clipPath = lop.style.webkitClipPath = 'url(#vlClip)'; }
    }
    function khungHinh(now) {
      var b = Math.min(0.05, (now - (tTruoc || now)) / 1000); tTruoc = now;
      hien += (dich - hien) * (1 - Math.exp(-b / (DO_TRE * 0.32)));
      if (Math.abs(dich - hien) < 0.0004) hien = dich;
      ve();
      if (hien !== dich) requestAnimationFrame(khungHinh); else { dangChay = false; tTruoc = 0; }
    }
    function capNhat() {
      dich = Math.min(1, Math.max(0, (scrollY - batDau) / quangDuong));
      if (!dangChay && dich !== hien) { dangChay = true; requestAnimationFrame(khungHinh); }
    }
    doKichThuoc();
    hien = dich = Math.min(1, Math.max(0, (scrollY - batDau) / quangDuong));   // mở trang giữa chừng: vào thẳng trạng thái đúng
    ve();
    addEventListener('scroll', capNhat, { passive: true });
    addEventListener('resize', function () { doKichThuoc(); capNhat(); ve(); }, { passive: true });
    addEventListener('load', function () { doKichThuoc(); capNhat(); ve(); });
  })();

  /* ---------- menu mobile ---------- */
  var hdr = $('#hdr'), burger = $('#burger');
  function dongMenu() {
    hdr.classList.remove('open');
    hdr.classList.remove('nav-hide');
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  }
  burger.addEventListener('click', function () {
    var mo = !hdr.classList.contains('open');
    hdr.classList.toggle('open', mo);
    burger.setAttribute('aria-expanded', String(mo));
    document.documentElement.style.overflow = mo ? 'hidden' : '';
  });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', dongMenu); });

  /* mục menu đang xem */
  var navLinks = $$('#nav a[href^="#"]');
  function danhDauMenu() {
    var moc = 120, dang = null;
    navLinks.forEach(function (a) {
      var sec = $(a.getAttribute('href'));
      if (sec && sec.getBoundingClientRect().top <= moc) dang = a;
    });
    navLinks.forEach(function (a) { a.classList.toggle('on', a === dang); });
  }

  /* ---------- tab: data-doi = đổi ảnh bằng lớp mờ dần (class "on"); không có = ẩn/hiện panel ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list), mo = list.hasAttribute('data-doi');
    function chon(t) {
      tabs.forEach(function (x) {
        var dung = x === t;
        x.setAttribute('aria-selected', String(dung));
        x.tabIndex = dung ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (!p) return;
        if (mo) p.classList.toggle('on', dung); else p.hidden = !dung;
      });
    }
    tabs.forEach(function (t, i) {
      t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
      t.addEventListener('click', function () { chon(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, j = -1;
        if (k === 'ArrowDown' || k === 'ArrowRight') j = (i + 1) % tabs.length;
        if (k === 'ArrowUp' || k === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
        if (j < 0) return;
        e.preventDefault(); tabs[j].focus(); chon(tabs[j]);
      });
    });
  });

  /* ---------- accordion tiện ích: rê chuột / chạm để mở ô ---------- */
  var acc = $('#acc');
  if (acc) {
    var o = $$('figure', acc);
    var moO = function (f) { o.forEach(function (x) { x.classList.toggle('on', x === f); }); };
    o.forEach(function (f) {
      f.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) moO(f); });
      f.addEventListener('click', function () { moO(f); });
    });
  }

  /* ---------- phóng to ảnh ---------- */
  var lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), nguoiMoLb = null;
  function moLb(src, alt, nguon) {
    nguoiMoLb = nguon || null;
    lbImg.src = src; lbImg.alt = alt || ''; lbCap.textContent = alt || '';
    lb.classList.add('open'); document.documentElement.style.overflow = 'hidden';
    $('button', lb).focus();
  }
  function dongLb() {
    lb.classList.remove('open'); document.documentElement.style.overflow = '';
    lbImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    if (nguoiMoLb) nguoiMoLb.focus();
  }
  $$('[data-zoom]').forEach(function (el) {
    if (el.tagName !== 'BUTTON') { el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button'); }
    var mo = function () { var i = $('img', el); moLb(el.getAttribute('data-zoom'), el.getAttribute('data-alt') || (i ? i.alt : ''), el); };
    el.addEventListener('click', mo);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mo(); } });
  });
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) dongLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (lb.classList.contains('open')) dongLb();
    else if (hdr.classList.contains('open')) dongMenu();
  });

  /* ---------- cuộn: đánh dấu mục menu đang xem ---------- */
  var hen = false;
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; danhDauMenu(); }); } }, { passive: true });
  danhDauMenu();

  /* Header ẩn khi cuộn xuống, hiện lại khi cuộn lên. */
  var lastScrollY = scrollY;
  var henHdr = false;
  function capNhatHeader() {
    henHdr = false;
    var y = scrollY;
    if (hdr.classList.contains('open')) {
      hdr.classList.remove('nav-hide');
    } else if (y <= 20 || y < lastScrollY - 4) {
      hdr.classList.remove('nav-hide');
    } else if (y > 80 && y > lastScrollY + 4) {
      hdr.classList.add('nav-hide');
    }
    lastScrollY = y;
  }
  addEventListener('scroll', function () { if (!henHdr) { henHdr = true; requestAnimationFrame(capNhatHeader); } }, { passive: true });
  capNhatHeader();

  /* ---------- "Xem thêm": đoạn dài chỉ hiện vài dòng đầu ----------
     Chữ vẫn nằm đủ trong HTML (Google, AI đọc được hết); không có JS thì hiện đủ. data-gon = số dòng giữ lại. */
  var MUI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  $$('[data-gon]').forEach(function (el, i) {
    var mau = el.tagName === 'P' ? el : ($('p', el) || el);
    var cs = getComputedStyle(mau);
    var lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.7;
    var cao = Math.round(lh * (parseFloat(el.getAttribute('data-gon')) || 4));
    if (el.scrollHeight <= cao + lh * 2) return;   // chỉ dư 1–2 dòng thì để nguyên
    if (!el.id) el.id = 'gon-' + (i + 1);
    el.style.setProperty('--gon', cao + 'px');
    el.classList.add('gon', 'dong');
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'xem-them';
    b.setAttribute('aria-controls', el.id); b.setAttribute('aria-expanded', 'false');
    b.innerHTML = '<span>Xem thêm</span>' + MUI;
    el.parentNode.insertBefore(b, el.nextSibling);
    b.addEventListener('click', function () {
      var mo = el.classList.contains('dong');
      el.classList.toggle('dong', !mo);
      b.setAttribute('aria-expanded', String(mo));
      b.firstChild.textContent = mo ? 'Thu gọn' : 'Xem thêm';
      if (!mo && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' });
    });
  });

  /* ---------- hiện dần khi cuộn tới ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ms) {
      ms.forEach(function (m) { if (m.isIntersecting) { m.target.classList.add('in'); io.unobserve(m.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }
  /* ==================== BẢN CÓ FORM: gửi lead (sinh bởi _dungcu/tao-ban-co-form.py) ==================== */
  function bao(form, chu, kieu) {
    var cu = $('.msg', form); if (cu) cu.remove();
    var d = document.createElement('div');
    d.className = 'msg ' + (kieu === 'loi' ? 'err' : 'ok');
    d.setAttribute('role', 'status');
    d.textContent = chu;
    form.appendChild(d);
  }
  // số VN: bỏ ký tự thừa, +84 -> 0, phải là di động 10 số
  function chuanSDT(s) {
    s = String(s || '').replace(/[^0-9]/g, '');
    if (s.indexOf('84') === 0 && s.length === 11) s = '0' + s.slice(2);
    return /^0[35789][0-9]{8}$/.test(s) ? s : null;
  }
  function parentUrl() {
    var url = document.referrer || '';
    try { if (window.top && window.top.location) url = window.top.location.href; } catch (e) {}
    return url || location.href;
  }
  function layUTM() {
    var parentUrlValue = parentUrl();
    var p = new URLSearchParams(location.search);
    try {
      var refParams = new URL(parentUrlValue).searchParams;
      refParams.forEach(function (value, key) { if (!p.get(key)) p.set(key, value); });
    } catch (e) {}
    var o = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'adclid', 'adclida', 'mgclid']
      .forEach(function (k) { if (p.get(k)) o[k === 'mgclid' ? 'mglnd' : k] = p.get(k); });
    return o;
  }
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, nut = $('button[type=submit]', form);
      var ten = (f.name.value || '').trim(), sdt = chuanSDT(f.phone.value), mail = (f.email.value || '').trim();
      if (!ten) { bao(form, 'Anh/chị cho em xin họ tên với ạ.', 'loi'); f.name.focus(); return; }
      if (!sdt) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'loi'); f.phone.focus(); return; }
      if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { bao(form, 'Email chưa đúng — anh/chị kiểm lại giúp em, hoặc để trống.', 'loi'); f.email.focus(); return; }

      var du = {
        formId: 'NOBU_LEAD',
        hoten: ten,
        sdt: sdt,
        url: parentUrl(),
        ip: '',
        userAgent: navigator.userAgent,
        sanpham: 'Nobu Residences Danang',
        email: mail,
        message: '',
        sheet: 'NOBU',
        timestamp: new Date().toISOString()
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      var body = JSON.stringify(du), sent = false;
      if (navigator.sendBeacon) {
        try {
          sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' }));
        } catch (x) {}
      }
      if (!sent) {
        fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          keepalive: true
        }).catch(function (err) { console.error('[NOBU] Gửi lead lỗi:', err); });
      }
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { form_id: du.formId }); } catch (x) {}
      window.top.location.href = '/thank-you-nobu-da-nang';
    });
  });


  /* thanh Gọi / Zalo / Đăng ký trên điện thoại: hiện sau màn đầu, ẩn khi đang ở khối đăng ký */
  var bar = $('#bar'), dk = $('#dang-ky'), henBar = false;
  function capNhatBar() {
    henBar = false;
    var r = dk.getBoundingClientRect();
    bar.classList.toggle('show', scrollY > innerHeight * 0.6 && !(r.top < innerHeight && r.bottom > 0));
  }
  addEventListener('scroll', function () { if (!henBar) { henBar = true; requestAnimationFrame(capNhatBar); } }, { passive: true });
  capNhatBar();
})();
