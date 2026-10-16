/* The Berkley landing — JS thuần, không thư viện (khung Capital Square / Norton Park).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác + 2 hiệu ứng:
   H3 khung chữ B mở ảnh ở hero · M4 tuyến metro tự vẽ ở khối Vị trí. */
(function () {
  'use strict';

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '/api/submit-lead/';
  /* Bản có form sinh bằng _dungcu/tao-ban-co-form.py — sửa ở file này rồi chạy lại script. */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- menu điện thoại (khoá cuộn trên <html>: body đang overflow-x:clip) ---------- */
  var hdr = $('#hdr'), burger = $('#burger');
  function dongMenu() {
    hdr.classList.remove('open');
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
    lb.classList.remove('open', 'to'); document.documentElement.style.overflow = '';
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
  /* bấm vào ảnh đang phóng: chuyển cỡ vừa màn <-> cỡ thật (cuộn để xem) — bản vẽ mặt bằng cần đọc số */
  lbImg.addEventListener('click', function () {
    var to = lb.classList.toggle('to');
    if (to) lb.scrollTo((lbImg.offsetWidth - lb.clientWidth) / 2, 0);
  });
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

  var giamChuyenDong = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- HIỆU ỨNG H3 · hero "khung chữ B mở ảnh" ----------
     Theo mẫu projects/template/hieu-ung/01-vet-loang-mo-anh (vết loang nở ra phủ kín màn khi ghim), đổi giọt nước thành
     khung chữ B đặc ruột (14/10 MKT đổi từ D) có viền mảnh, cuộn thì eo B khép thành D; ghim bằng position:sticky + biến CSS --q như mẫu 04 (không GSAP). Mọi chuyển động viết trong CSS.
     Chỉ chạy ở máy tính ≥ 961 px và khi không bật "giảm chuyển động"; còn lại hero đứng yên, ảnh + chữ đủ từ đầu. */
  (function () {
    var hero = $('#hero');
    if (!hero || giamChuyenDong || !window.matchMedia) return;
    var mq = matchMedia('(min-width: 961px)');
    var DO_TRE = 0.16;          // trễ mềm: 1 = bám tức thì, nhỏ = trôi chậm theo cuộn
    var dich = 0, hienTai = 0, dangChay = false;
    /* Hình khung (MKT 14/10 lần 2): 3 dáng cùng cấu trúc path (đường ngang trên + 2 cung bậc ba + eo + 2 cung + đáy), toạ độ 0–100.
       B = chữ B đặc ruột · D = eo khép lại, 1 bầu · N = chữ nhật. Cuộn: --q 0 → .4 nắn B → D, --q .4 → 1 nắn D → N + khung nở (--q2). */
    var B = [60, 77.67,0,92,10.52,92,23.5, 92,36.48,77.67,47,60,47, 62,49, 82.99,49,100,60.42,100,74.5, 100,88.58,82.99,100,62,100];
    var D = [60, 70.61,0,80.78,5.27,88.28,14.64, 95.79,24.02,100,36.74,100,50, 100,50, 100,63.26,95.79,75.98,88.28,85.36, 80.78,94.73,70.61,100,60,100];
    var N = [100, 100,8,100,17,100,25, 100,33,100,42,100,50, 100,50, 100,58,100,67,100,75, 100,83,100,92,100,100];
    var duong = [$('#khung-chu path'), $('.hero-vien path', hero)].filter(Boolean);
    function em(t) { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); }
    function veHinh(q) {
      var t1 = em(q / 0.4), t2 = em((q - 0.4) / 0.6), p = [];
      for (var i = 0; i < B.length; i++) p.push(+(t2 ? D[i] + (N[i] - D[i]) * t2 : B[i] + (D[i] - B[i]) * t1).toFixed(2));
      var d = 'M0 0H' + p[0] + 'C' + p.slice(1, 13).join(' ') + 'L' + p[13] + ' ' + p[14] + 'C' + p.slice(15).join(' ') + 'H0Z';
      duong.forEach(function (e) { e.setAttribute('d', d); });
      hero.style.setProperty('--q2', t2.toFixed(4));
    }
    function tinh() {
      var dai = hero.offsetHeight - $('.hero-san', hero).offsetHeight;
      var top = hero.getBoundingClientRect().top - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 0);
      dich = dai > 0 ? Math.min(1, Math.max(0, -top / dai)) : 0;
    }
    function khung() {
      hienTai += (dich - hienTai) * DO_TRE;
      if (Math.abs(dich - hienTai) < 0.001) hienTai = dich;
      hero.style.setProperty('--q', hienTai.toFixed(4)); veHinh(hienTai);
      if (hienTai !== dich) requestAnimationFrame(khung); else dangChay = false;
    }
    function chay() { tinh(); if (!dangChay) { dangChay = true; requestAnimationFrame(khung); } }
    function batTat() {
      var bat = mq.matches;
      hero.classList.toggle('ghim', bat);
      if (!bat) { hero.style.setProperty('--q', 0); dich = hienTai = 0; veHinh(0); return; }
      tinh(); hienTai = dich; hero.style.setProperty('--q', dich.toFixed(4)); veHinh(dich);
    }
    batTat();
    addEventListener('scroll', function () { if (mq.matches) chay(); }, { passive: true });
    addEventListener('resize', function () { batTat(); });
  })();

  /* ---------- HIỆU ỨNG M4 · tuyến metro tự vẽ + vệt sáng chạy dọc ----------
     Theo mẫu projects/template/hieu-ung/03-phong-xuyen-chu (nét kẻ tự vẽ I5 + đường sáng initSvgGlowLine).
     Cuộn tới khối: --ve 0 → 1 (CSS vẽ đường ray 1,6 s, các ga nảy lần lượt), xong thì gắn .da-ve cho vệt sáng chạy lặp. */
  (function () {
    var t = $('[data-metro]');
    if (!t) return;
    var m = $('.metro-khung', t);
    function ve() { m.style.setProperty('--ve', 1); setTimeout(function () { m.classList.add('da-ve'); }, giamChuyenDong ? 0 : 1900); }
    if (giamChuyenDong || !('IntersectionObserver' in window)) { ve(); return; }
    var io2 = new IntersectionObserver(function (ms) {
      if (ms[0].isIntersecting) { ve(); io2.disconnect(); }
    }, { rootMargin: '0px 0px -20% 0px' });
    io2.observe(t);
  })();

  /* ---------- hiện dần khi cuộn tới ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ms) {
      // cuộn nhanh vượt qua (phần tử đã nằm trên màn) cũng hiện luôn — soát 2560 px 15/10 bắt 1 tiêu đề bị bỏ lỡ
      ms.forEach(function (m) { if (m.isIntersecting || m.boundingClientRect.top < 0) { m.target.classList.add('in'); io.unobserve(m.target); } });
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
        formId: 'BERKLEY_LEAD',
        userAgent: navigator.userAgent || '',
        sanpham: [f.product ? f.product.value : '', f.unit && f.unit.value ? 'Loại căn ' + f.unit.value : ''].filter(Boolean).join(' · '),
        email: '',
        message: '',
        sheet: 'BERKLEY',
        source: form.getAttribute('data-source') || 'form-dang-ky-tham-quan',
        referrer: document.referrer || '(truc tiep)',
        device: innerWidth <= 860 ? 'mobile' : 'desktop',
        thoi_gian: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      if (!LEAD_ENDPOINT) {
        console.warn('[LH] Chưa khai LEAD_ENDPOINT — lead KHÔNG được gửi:', du);
        bao(form, 'Trang đang ở bản xem thử, chưa nối nơi nhận thông tin. Anh/chị gọi hotline 094.1125.000 giúp em ạ.', 'loi');
        return;
      }
      nut.disabled = true;
      var body = JSON.stringify(du), sent = false;
      try { sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function (err) { console.error('[BERKLEY] Gửi lead lỗi:', err); });
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
      try { window.top.location.href = '/thank-you-the-berkley/'; } catch (x) { location.href = '/thank-you-the-berkley/'; }
    });
  });

  /* nút "Nhận thông tin ..." dưới khối lưu trú -> ghi sẵn nhu cầu vào form */
  var formDk = $('#dang-ky form');
  $$('[data-loai]').forEach(function (a) {
    a.addEventListener('click', function () {
      formDk.elements.product.value = a.getAttribute('data-loai');
      setTimeout(function () { formDk.elements.name.focus({ preventScroll: true }); }, 700);
    });
  });

  /* nút "Nhận tư vấn loại căn này" ở khối mặt bằng -> ghi loại căn vào form */
  $$('[data-can]').forEach(function (a) {
    a.addEventListener('click', function () {
      var can = a.getAttribute('data-can'), dong = $('.can-chon', formDk);
      formDk.elements.unit.value = can;
      dong.textContent = 'Loại căn quan tâm: ' + can; dong.hidden = false;
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
