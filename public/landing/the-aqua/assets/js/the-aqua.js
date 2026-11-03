/* The Aqua landing — JS thuần, không thư viện.
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác.
   Landing SALE (sale mở cho khách xem): không form, không hotline, không popup thu lead. */
(function () {
  'use strict';

  /* ⚪ VIDEO_ID: ID YouTube (phần sau "v=") — tuỳ chọn. Có ID thì phát YouTube;
        để trống = phát file MP4 trong assets/video/ (phim CĐT nén 720p, 11 MB, chỉ tải khi bấm). */
  var VIDEO_ID = '';
  var VIDEO_START = 0;
  var VIDEO_MP4 = 'assets/video/the-aqua-phim-gioi-thieu-720p.mp4';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- menu mobile ---------- */
  var hdr = $('#hdr'), burger = $('#burger');
  function dongMenu() {
    hdr.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  burger.addEventListener('click', function () {
    var mo = !hdr.classList.contains('open');
    hdr.classList.toggle('open', mo);
    burger.setAttribute('aria-expanded', String(mo));
    document.body.style.overflow = mo ? 'hidden' : '';
  });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', dongMenu); });

  /* ---------- header: an khi cuon xuong, hien khi cuon len ---------- */
  var lastScroll = window.scrollY || 0;
  var scrollTicking = false;
  function capNhatHeader() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y <= 80) hdr.classList.remove('nav-hide');
    else hdr.classList.toggle('nav-hide', y > lastScroll);
    lastScroll = y;
    scrollTicking = false;
  }
  function scheduleHeader() {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(capNhatHeader); }
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

  /* ---------- tab (kết nối, nhà mẫu) ---------- */
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

  /* ---------- accordion tiện ích: rê chuột / chạm để mở ô ---------- */
  var acc = $('#acc');
  if (acc) {
    var o = $$('figure', acc);
    var mo = function (f) { o.forEach(function (x) { x.classList.toggle('on', x === f); }); };
    o.forEach(function (f) {
      f.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) mo(f); });
      f.addEventListener('click', function () { mo(f); });
    });
  }

  /* ---------- phóng to ảnh ---------- */
  var lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), nguoiMoLb = null;
  function moLb(src, alt, nguon) {
    nguoiMoLb = nguon || null;
    lbImg.src = src; lbImg.alt = alt || ''; lbCap.textContent = alt || '';
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
    $('button', lb).focus();
  }
  function dongLb() {
    lb.classList.remove('open'); document.body.style.overflow = '';
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

  /* ---------- video: bấm mới tải (YouTube nếu có ID, không thì MP4 tự host) ---------- */
  var vid = $('#vid');
  function dangPhat() { return $('iframe', vid) || $('video', vid); }
  function phatVideo() {
    if (VIDEO_ID) {
      vid.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + VIDEO_ID +
        '?autoplay=1&rel=0&start=' + VIDEO_START + '" title="Phim giới thiệu The Aqua" ' +
        'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    } else {
      var bia = $('img', vid);
      var v = document.createElement('video');
      v.src = VIDEO_MP4; v.controls = true; v.autoplay = true; v.playsInline = true; v.preload = 'auto';
      if (bia) v.poster = bia.currentSrc || bia.src;
      v.setAttribute('title', 'Phim giới thiệu The Aqua');
      vid.innerHTML = ''; vid.appendChild(v);
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    }
    vid.style.cursor = 'default';
    vid.removeAttribute('role'); vid.removeAttribute('tabindex'); vid.removeAttribute('aria-label');
  }
  if (vid) {
    vid.addEventListener('click', function () { if (!dangPhat()) phatVideo(); });
    vid.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && !dangPhat()) { e.preventDefault(); phatVideo(); } });
  }

  /* ---------- cuộn: menu đang xem ---------- */
  var hen = false;
  addEventListener('scroll', function () {
    if (hen) return; hen = true;
    requestAnimationFrame(function () { hen = false; danhDauMenu(); });
  }, { passive: true });
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
})();
