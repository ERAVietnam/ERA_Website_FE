/* The Aspira landing — JS thuần, không thư viện.
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác. */
(function () {
  'use strict';

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '/api/submit-lead/';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- menu mobile ---------- */
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

  /* ---------- header: an khi cuon xuong, hien khi cuon len ---------- */
  var lastScroll = window.scrollY || 0;
  var headerTicking = false;
  function capNhatHeader() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y <= 80) hdr.classList.remove('nav-hide');
    else hdr.classList.toggle('nav-hide', y > lastScroll);
    lastScroll = y;
    headerTicking = false;
  }
  function scheduleHeader() {
    if (!headerTicking) { headerTicking = true; requestAnimationFrame(capNhatHeader); }
  }
  addEventListener('scroll', scheduleHeader, { passive: true });
  document.addEventListener('scroll', scheduleHeader, { passive: true, capture: true });
  capNhatHeader();

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

  /* ---------- tab (tầng tiện ích, loại căn, mặt bằng tầng, thư viện) ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) {
          var chon = x === t;
          x.setAttribute('aria-selected', String(chon));
          var p = document.getElementById(x.getAttribute('aria-controls'));
          if (p) p.hidden = !chon;
        });
      });
    });
  });

  /* ---------- video: bấm mới tải phim (tự host, 8 MB) — trang nhẹ, không chặn tốc độ ---------- */
  var vid = $('#vid'), nutVid = $('#vid-play');
  if (vid && nutVid) {
    nutVid.addEventListener('click', function () {
      var v = document.createElement('video');
      v.src = vid.getAttribute('data-src');
      v.controls = true; v.autoplay = true; v.playsInline = true; v.preload = 'auto';
      v.setAttribute('title', 'Phim teaser The Aspira');
      vid.innerHTML = '';
      vid.appendChild(v);
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      v.focus();
    });
  }
  /* rời tab Video thì dừng phim */
  $$('[role="tab"]').forEach(function (t) {
    t.addEventListener('click', function () {
      var v = $('#vid video');
      if (v && t.id !== 'tab-video') v.pause();
    });
  });

  /* ---------- nhà mẫu: bấm ô nhỏ / mũi tên -> đổi ảnh lớn (ảnh lớn chỉ tải khi bấm) ---------- */
  $$('.nm').forEach(function (nm) {
    var lon = $('.nm-lon', nm), img = $('img', lon), dem = $('.nm-dem', nm), nut = $$('.nm-nho button', nm), dang = 0;
    function xem(i) {
      dang = (i + nut.length) % nut.length;
      var b = nut[dang], src = b.getAttribute('data-lon');
      img.removeAttribute('srcset');
      img.src = src; img.alt = $('img', b).alt;
      lon.setAttribute('data-zoom', src);
      nut.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      dem.textContent = (dang + 1) + ' / ' + nut.length;
      var ds = b.parentNode.parentNode;   /* điện thoại: dải ô nhỏ vuốt ngang -> trượt tới ô đang xem */
      if (ds.scrollWidth > ds.clientWidth) ds.scrollLeft += b.getBoundingClientRect().left - ds.getBoundingClientRect().left - 8;
    }
    nut.forEach(function (b, i) { b.addEventListener('click', function () { xem(i); }); });
    $('.nm-truoc', nm).addEventListener('click', function () { xem(dang - 1); });
    $('.nm-sau', nm).addEventListener('click', function () { xem(dang + 1); });
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
    var mo = function () { var i = $('img', el); moLb(el.getAttribute('data-zoom'), i ? i.alt : '', el); };
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
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'adclid', 'adclida', 'mglnd']
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
        url: pageUrl,
        ip: '',
        formId: 'AS_LEAD',
        userAgent: navigator.userAgent || '',
        sanpham: ((f.product && f.product.value) || '') + '-The Aspira',
        email: '',
        message: '',
        sheet: 'THE ASPIRA',
        source: form.getAttribute('data-source') || 'form-dang-ky'
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      nut.disabled = true; nut.setAttribute('data-chu', nut.textContent); nut.textContent = 'ĐANG GỬI...';
      var body = JSON.stringify(du), sent = false;
      try { sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function (err) {
        console.error('[The Aspira] Gửi lead lỗi:', err);
      });
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
      window.location.href = '/thank-you-the-aspira/';
    });
  });

  /* nút "Nhận báo giá ..." ở tab sản phẩm -> ghi sẵn loại sản phẩm vào form */
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
