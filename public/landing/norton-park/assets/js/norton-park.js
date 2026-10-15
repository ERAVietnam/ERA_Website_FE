/* Norton Park landing — JS thuần, không thư viện (khung Hanoi Signature / Vinhomes Green Paradise).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác. */
(function () {
  'use strict';

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '/api/submit-lead/';
  /* Bản có form sinh bằng _dungcu/tao-ban-co-form.py — sửa ở file này rồi chạy lại script. */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- 1 · HERO · HOA NỞ MỞ ẢNH (khuôn vết loang Nobu — nobu-da-nang vetLoang()) ----------
     Hình cắt = hoạ tiết Norton Park (2 cánh + hạt rơi, symbol #nv). Màn đầu: hoạ tiết đặc ở giữa nền ngà (CSS: cánh xoè, hạt rơi).
     Lăn: hoạ tiết đặc mờ đi, cùng lúc hiện "cửa sổ" cùng hình nhìn vào ảnh 3D -> nở ra quanh tâm hạt tới phủ kín, ảnh lùi từ cận cảnh. */
  (function hoaNo() {
    var hero = $('#hero');
    if (!hero) return;
    var dinh = $('.vl-dinh', hero), khung = $('.vl-khung', hero), lop = $('.vl-anh', hero), cuon = $('.vl-cuon', hero);
    var slides = $$('.vl-slide', hero), so = $('.vl-so', hero), cap = $('.vl-cap', hero);

    /* ---- slider ‹ 01 / 02 › (chạy cả khi tắt hiệu ứng) ---- */
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
    // ảnh 2 ẩn -> loading=lazy có thể không tải: ép tải sau khi trang tải xong
    addEventListener('load', function () { $$('.vl-slide img', hero).forEach(function (im) { im.loading = 'eager'; }); });

    if (!document.documentElement.classList.contains('vl')) return;

    /* ===== CHỈNH Ở ĐÂY ===== (quãng đường ghim chỉnh ở CSS: --ghim) */
    var DO_TRE = 0.5;               // "trễ mềm" theo chuột, giây (mẫu: scrub 0.5)
    var HOA_RONG = [72, 150];       // bề rộng hoạ tiết màn đầu: 8% màn hình, kẹp 72–150 px
    var ZOOM_DAU = 1.55;            // ảnh lúc đầu phóng to quanh tâm hạt (trục cổng chính), lùi dần về toàn cảnh
    var PHAN_HOA = 0.13;            // đoạn lăn đầu: hoạ tiết đặc mờ đi, cửa sổ cùng hình hiện ra
    var NHIP_1 = 0.45;              // nhịp 1 (phần còn lại): cả bông hoa lớn dần giữa khung tới HOA_CAO chiều cao khung
    var HOA_CAO = 0.8;              // nhịp 2: hạt nở quanh tâm hạt tới phủ kín
    /* ======================== */

    var matNa = $('.vl-mat-na', hero), hoa = $('.vl-hoa', hero), tren = $('.vl-chu-tren', hero), duoi = $('.vl-chu-duoi', hero);
    var moTa = $('.vl-mo-ta', hero), goiY = $('.vl-goi-y', hero), roi = $('.vl-roi', hero);
    var nT = $('.vl-nen-hoa.trai', hero), nP = $('.vl-nen-hoa.phai', hero);
    var lopChu = [$('.vl-phu', hero), $('.vl-dieu-khien', hero)];

    // hoạ tiết Norton Park (khung 130 × 162): cánh trái + cánh phải + hạt; tâm hạt = tâm nở
    var VET = 'M1.60 2.05L1.60 43.98C1.60 43.98 46.35 72.96 64.93 128.80C61.78 93.00 77.90 45.38 1.60 2.05Z' +
              'M64.93 128.80C83.52 72.96 128.17 43.98 128.17 43.98L128.17 2.05C51.87 45.38 68.09 93.00 64.93 128.80Z' +
              'M64.43 132.21C56.66 132.21 50.36 138.51 50.36 146.28C50.36 154.05 56.66 160.34 64.43 160.34C72.20 160.34 78.50 154.05 78.50 146.28C78.50 138.51 72.20 132.21 64.43 132.21Z';
    var RONG = 130, CAO = 162, HAT_X = 64.43, HAT_Y = 146.28, HAT_R = 14.07;
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

    var W = 0, H = 0, s0 = 1, sGiua = 4, sCuoi = 50, hx = 0, hy = 0, batDau = 0, quangDuong = 1, choMoTa = true;
    function doKichThuoc() {
      W = khung.clientWidth; H = khung.clientHeight;
      s0 = Math.min(Math.max(HOA_RONG[0], W * 0.08), HOA_RONG[1]) / RONG;
      hero.style.setProperty('--hoa-w', (RONG * s0).toFixed(1) + 'px');
      // nhịp 1: hoa giữa khung lớn tới HOA_CAO chiều cao khung (không vượt 90% bề rộng)
      sGiua = Math.max(s0, Math.min(H * HOA_CAO / CAO, W * 0.9 / RONG));
      // nhịp 2: tâm hạt lúc hết nhịp 1 -> hạt (hình tròn) nở tới khi phủ góc xa nhất của khung
      hx = W / 2 + (HAT_X - RONG / 2) * sGiua; hy = H / 2 + (HAT_Y - CAO / 2) * sGiua;
      sCuoi = Math.hypot(Math.max(hx, W - hx), Math.max(hy, H - hy)) / HAT_R * 1.04;
      batDau = hero.getBoundingClientRect().top + scrollY - $('#hdr').offsetHeight;
      quangDuong = Math.max(1, hero.offsetHeight - dinh.offsetHeight);
      cuon.style.transformOrigin = '50% 60%';
      // khung thấp (màn 16:9 nhỏ): đoạn mô tả chạm "Lăn để khám phá" -> ẩn (chữ này đã có ở dải ô-liu ngay dưới)
      var dayMoTa = H / 2 + (CAO / 2) * s0 + 26 + duoi.offsetHeight + 26 + moTa.offsetHeight;
      choMoTa = dayMoTa < H - 20 - goiY.offsetHeight - 14;
    }
    var easeIO = function (x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };   // power2.inOut
    var easeO = function (x) { return 1 - (1 - x) * (1 - x); };                                     // power2.out
    var easeI = function (x) { return x * x * x; };                                                // nở chậm lúc đầu, bung ở cuối

    var hien = 0, dich = 0, tTruoc = 0, dangChay = false;
    function ve() {
      // 0. đoạn đầu: hoạ tiết đặc mờ đi, cửa sổ cùng hình hiện ra đúng chỗ
      var a = easeO(Math.min(1, hien / PHAN_HOA));
      hoa.style.opacity = String(1 - a);
      lop.style.opacity = String(a);
      var h = Math.max(0, (hien - PHAN_HOA) / (1 - PHAN_HOA));
      // 1. nhịp 1: cả bông hoa lớn dần, luôn nằm giữa khung · nhịp 2: hạt nở quanh tâm hạt tới phủ kín
      var s, tx, ty;
      if (h <= NHIP_1) {
        s = s0 + (sGiua - s0) * easeIO(h / NHIP_1);
        tx = W / 2 - (RONG / 2) * s; ty = H / 2 - (CAO / 2) * s;
      } else {
        s = sGiua + (sCuoi - sGiua) * easeI((h - NHIP_1) / (1 - NHIP_1));
        tx = hx - HAT_X * s; ty = hy - HAT_Y * s;
      }
      duongCat.setAttribute('d', bienDoi(tx, ty, s));
      // 2. ảnh lùi từ cận cảnh (quanh trục cổng) về toàn cảnh
      var k = 1 + (ZOOM_DAU - 1) * Math.pow(1 - easeIO(h), 2);
      cuon.style.transform = 'scale(' + k.toFixed(4) + ')';
      // 3. chữ tách lên – xuống, hoạ tiết nền trượt ra hai bên, cánh rơi tan
      var e = easeO(Math.min(1, h / 0.5));
      var cach = (CAO / 2) * Math.max(s0, Math.min(s, sGiua)) + 26 + e * 60;   // chữ luôn ở ngoài bông hoa
      tren.style.transform = 'translate(-50%,calc(-100% - ' + cach.toFixed(1) + 'px))';
      duoi.style.transform = 'translate(-50%,' + cach.toFixed(1) + 'px)';
      var duoi0 = (CAO / 2) * s0 + 26;
      tren.style.opacity = duoi.style.opacity = String(1 - e);
      moTa.style.transform = 'translate(-50%,' + (duoi0 + duoi.offsetHeight + 26).toFixed(1) + 'px)';
      moTa.style.opacity = goiY.style.opacity = String(Math.max(0, 1 - hien * 10));
      moTa.style.visibility = choMoTa ? '' : 'hidden';
      roi.style.opacity = String(Math.max(0, 1 - hien * 4));
      nT.style.transform = 'translate(' + (-e * 260) + 'px,-50%) rotate(-24deg)';
      nP.style.transform = 'translate(' + (e * 260) + 'px,-50%) rotate(160deg)';
      nT.style.opacity = String(0.2 * (1 - e)); nP.style.opacity = String(0.07 * (1 - e));
      // 4. lớp phủ + nút ‹ › hiện khi cửa sổ đã đủ lớn
      var c = Math.min(1, Math.max(0, (h - 0.8) / 0.18));
      lopChu.forEach(function (el) { el.style.opacity = String(c); el.style.visibility = c > 0 ? 'visible' : 'hidden'; });
      var xong = hien > 0.985;
      matNa.style.visibility = xong ? 'hidden' : 'visible';
      matNa.classList.toggle('an', xong);
      // đã phủ kín: bỏ cắt cho nhẹ máy
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

  /* ---------- menu điện thoại (khoá cuộn trên <html>: body đang overflow-x:clip) ---------- */
  var hdr = $('#hdr'), burger = $('#burger');
  var lastScrollY = scrollY || 0, henHeader = false;
  function capNhatHeader() {
    henHeader = false;
    var y = scrollY || 0;
    if (hdr.classList.contains('open') || y <= 20 || y < lastScrollY - 2) hdr.classList.remove('nav-hide');
    else if (y > 96 && y > lastScrollY + 2) hdr.classList.add('nav-hide');
    lastScrollY = y;
  }
  addEventListener('scroll', function () { if (!henHeader) { henHeader = true; requestAnimationFrame(capNhatHeader); } }, { passive: true });
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

  /* ---------- tab (tiện ích · mặt bằng tầng · loại căn hộ) ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function chon(t, lay) {
      tabs.forEach(function (x) {
        var c = x === t;
        x.setAttribute('aria-selected', String(c));
        x.tabIndex = c ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) p.hidden = !c;
      });
      if (lay) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { chon(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (k) { e.preventDefault(); chon(tabs[(i + k + tabs.length) % tabs.length], true); }
      });
    });
  });

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

  /* ---------- cuộn: đánh dấu mục menu + header thu gọn ---------- */
  var hen = false;
  function khiCuon() { danhDauMenu(); hdr.classList.toggle('nho', scrollY > 40); }
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; khiCuon(); }); } }, { passive: true });
  khiCuon();

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
  function layUTM() {
    var p = new URLSearchParams(location.search), o = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']
      .forEach(function (k) { if (p.get(k)) o[k] = p.get(k); });
    return o;
  }
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, nut = $('button[type=submit]', form);
      var ten = (f.name.value || '').trim(), sdt = chuanSDT(f.phone.value);
      if (!ten) { bao(form, 'Anh/chị cho em xin họ tên với ạ.', 'loi'); f.name.focus(); return; }
      if (!sdt) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'loi'); f.phone.focus(); return; }

      var pageUrl = location.href;
      try { pageUrl = window.top.location.href; } catch (x) {}
      var du = {
        timestamp: new Date().toISOString(),
        hoten: ten,
        sdt: sdt,
        url: pageUrl.split('?')[0],
        ip: '',
        formId: 'NORTONPARK_LEAD',
        userAgent: navigator.userAgent || '',
        sanpham: f.product ? f.product.value : '',
        email: '',
        message: '',
        sheet: 'NORTONPARK',
        source: form.getAttribute('data-source') || 'form-dang-ky-tham-quan',
        referrer: document.referrer || '(truc tiep)',
        device: innerWidth <= 860 ? 'mobile' : 'desktop',
        thoi_gian: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      if (!LEAD_ENDPOINT) {
        console.warn('[NP] Chưa khai LEAD_ENDPOINT — lead KHÔNG được gửi:', du);
        bao(form, 'Trang đang ở bản xem thử, chưa nối nơi nhận thông tin. Anh/chị gọi hotline 094.1125.000 giúp em ạ.', 'loi');
        return;
      }
      nut.disabled = true;
      var body = JSON.stringify(du), sent = false;
      try { sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function (err) { console.error('[NORTONPARK] Gửi lead lỗi:', err); });
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
      try { window.top.location.href = '/thank-you-norton-park/'; } catch (x) { location.href = '/thank-you-norton-park/'; }
    });
  });

  /* nút "Nhận thông tin căn ..." dưới bảng loại căn -> ghi sẵn loại căn vào form */
  var formDk = $('#dang-ky form');
  $$('[data-loai]').forEach(function (a) {
    a.addEventListener('click', function () {
      formDk.elements.product.value = a.getAttribute('data-loai');
      setTimeout(function () { formDk.elements.name.focus({ preventScroll: true }); }, 700);
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
