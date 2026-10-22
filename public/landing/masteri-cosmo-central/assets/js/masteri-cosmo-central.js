/* Masteri Cosmo Central landing — JS thuần, không thư viện (khung Arcadia: H1 + M4 theo The Berkley).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác + 2 hiệu ứng:
   H1 chữ COSMO CENTRAL kẹp sau mái 3 tháp ở hero · M4 sơ đồ giao điểm tự vẽ + vệt sáng chạy dọc ở khối Vị trí. */
(function () {
  'use strict';

  /* Gửi lead qua API nội bộ; backend chuyển tiếp vào tab COSMOCENTRAL. */
  var LEAD_ENDPOINT = '/api/submit-lead';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var hieuUng = document.documentElement.classList.contains('vl');   // có JS + không "giảm chuyển động"

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

  /* ---------- tab (tiện ích theo tầng · loại căn hộ) ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function chon(t, lay) {
      tabs.forEach(function (x) {
        var c = x === t;
        x.setAttribute('aria-selected', String(c));
        x.tabIndex = c ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) { p.hidden = !c; if (c) p.classList.add('in'); }
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

  /* ---------- "Xem thêm": đoạn dài chỉ hiện vài dòng đầu ----------
     Chữ vẫn nằm đủ trong HTML (Google, AI đọc được hết); không có JS thì hiện đủ. data-gon = số dòng giữ lại. */
  var MUI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  $$('[data-gon]').forEach(function (el, i) {
    var mau = el.tagName === 'P' ? el : ($('p', el) || el);
    var cs = getComputedStyle(mau);
    var lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.7;
    var gioiHan = Math.round(lh * (parseFloat(el.getAttribute('data-gon')) || 4));
    if (el.scrollHeight <= gioiHan + lh * 2) return;
    if (!el.id) el.id = 'gon-' + (i + 1);
    el.style.setProperty('--gon', gioiHan + 'px');
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

  /* ---------- HIỆU ỨNG H1 · chữ kẹp sau tòa nhà (hero) ----------
     Theo mẫu projects/template/hieu-ung/04-mo-man-chieu-sau (11tanjung): JS chỉ ghi tiến độ cuộn vào --p (0 ở đầu trang → 1 khi
     hero ra khỏi màn), chuyển động viết bằng calc() + transition trong CSS. Không ghim, không màn tải. */
  var hero = $('#hero');
  function capNhatHero() {
    if (!hieuUng || !hero) return;
    var r = hero.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    hero.style.setProperty('--p', p.toFixed(3));
  }

  /* content-visibility (CSS) chỉ dùng lúc mở trang: tải xong thì gỡ để mọi khối có chiều cao thật — menu, nút neo cuộn đúng chỗ */
  function cvXong() { setTimeout(function () { document.documentElement.classList.add('cv-xong'); }, 300); }
  if (document.readyState === 'complete') cvXong(); else addEventListener('load', cvXong);
  $$('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function () { document.documentElement.classList.add('cv-xong'); }); });

  /* lớp tháp đã xoá trời: nạp sau sự kiện load (ảnh nền hero là LCP), xong thì hiện tên lớn kẹp sau tháp */
  (function () {
    var lop = $('.hero-khung .truoc'); if (!lop || !hero) return;
    function hien() { lop.classList.add('da-nap'); hero.classList.add('co-lop'); }
    function nap() {
      lop.addEventListener('load', hien, { once: true });
      lop.addEventListener('error', function () { hero.classList.add('co-lop'); }, { once: true });   // lỗi ảnh: vẫn hiện tên (đè lên tháp còn hơn mất chữ)
      lop.sizes = lop.getAttribute('sizes'); lop.srcset = lop.getAttribute('data-srcset'); lop.src = lop.getAttribute('data-src');
    }
    if (document.readyState === 'complete') nap(); else addEventListener('load', nap);
  })();

  /* ---------- cuộn: đánh dấu mục menu + header thu gọn + hero ---------- */
  var hen = false;
  function khiCuon() { danhDauMenu(); hdr.classList.toggle('nho', scrollY > 40); capNhatHero(); }
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; khiCuon(); }); } }, { passive: true });
  khiCuon();

  /* ---------- HIỆU ỨNG M4 · sơ đồ giao điểm tự vẽ + vệt sáng chạy dọc ----------
     Theo mẫu projects/template/hieu-ung/03-phong-xuyen-chu (nét kẻ tự vẽ I5 + đường sáng initSvgGlowLine) — KHÔNG ghim.
     Cuộn tới sơ đồ (30 % sơ đồ vào màn): gắn .ve → CSS vẽ 2 vòng đi bộ rồi 5 tia đường xe (stroke-dashoffset), đầu tia nảy, tên hiện;
     vẽ xong gắn .da-ve → vệt sáng cam chạy dọc từng tia lặp lại. Giảm chuyển động / không JS: CSS vẽ sẵn, không vệt sáng. */
  (function () {
    var gd = $('[data-giao-diem]');
    if (!gd) return;
    if (!hieuUng || !('IntersectionObserver' in window)) { gd.classList.add('ve'); return; }
    var io2 = new IntersectionObserver(function (ms) {
      ms.forEach(function (m) {
        if (!m.isIntersecting) return;
        io2.disconnect();
        gd.classList.add('ve');
        setTimeout(function () { gd.classList.add('da-ve'); }, 2900);
      });
    }, { threshold: 0.3 });
    io2.observe(gd);
  })();

  /* ---------- hiện dần khi cuộn tới ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ms) {
      ms.forEach(function (m) { if (m.isIntersecting) { m.target.classList.add('in'); io.unobserve(m.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
    // lưới an toàn: cuộn nhanh (kéo thanh cuộn, bấm menu) có lúc IntersectionObserver bỏ sót → khối đã vào màn hoặc đã qua thì hiện luôn
    var henRv = false;
    addEventListener('scroll', function () {
      if (henRv) return; henRv = true;
      setTimeout(function () {
        henRv = false;
        rv.forEach(function (el) { if (!el.classList.contains('in') && el.getBoundingClientRect().top < innerHeight) { el.classList.add('in'); io.unobserve(el); } });
      }, 250);
    }, { passive: true });
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
    var o = {}, lists = [new URLSearchParams(location.search)];
    try { if (window.top && window.top.location) lists.push(new URLSearchParams(window.top.location.search)); } catch (e) {}
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'adclid', 'adclida', 'gclid', 'fbclid', 'mgclid']
      .forEach(function (k) {
        for (var i = 0; i < lists.length; i++) {
          var v = lists[i].get(k);
          if (v) { o[k === 'mgclid' ? 'mglnd' : k] = v; break; }
        }
      });
    return o;
  }
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, nut = $('button[type=submit]', form);
      var ten = (f.name.value || '').trim(), sdt = chuanSDT(f.phone.value);
      if (!ten) { bao(form, 'Anh/chị cho em xin họ tên với ạ.', 'loi'); f.name.focus(); return; }
      if (!sdt) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'loi'); f.phone.focus(); return; }

      var unit = f.unit ? f.unit.value : '';
      var du = {
        formId: 'COSMOCENTRAL_FORM',
        hoten: ten,
        sdt: sdt,
        email: '',
        message: '',
        sanpham: unit ? 'Masteri Cosmo Central – ' + unit : 'Masteri Cosmo Central',
        sheet: 'COSMOCENTRAL',
        url: parentUrl(),
        ip: '',
        userAgent: navigator.userAgent || '',
        timestamp: new Date().toISOString()
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      var body = JSON.stringify(du), sent = false;
      if (navigator.sendBeacon) {
        try { sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
      }
      if (!sent) {
        fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          keepalive: true
        }).catch(function (err) { console.error('[COSMOCENTRAL] Gửi lead lỗi:', err); });
      }
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: 'COSMOCENTRAL_FORM' }); } catch (x) {}
      window.top.location.href = '/thank-you-masteri-cosmo-central/';
    });
  });

  /* nút có data-loai -> ghi sẵn nhu cầu vào form (hiện chưa dùng) */
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
