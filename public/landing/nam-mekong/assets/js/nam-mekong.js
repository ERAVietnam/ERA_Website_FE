/* Nam Mekong Grand Plaza landing — JS thuần, không thư viện.
   Landing cho SALE: không form, không hotline. Nội dung nằm sẵn trong HTML; file này chỉ thêm tương tác. */
(function () {
  'use strict';

  /* ==================== PHIM GIỚI THIỆU ====================
     VIDEO_SRC: file mp4 tự lưu trong assets/video/ (ưu tiên nếu có).
     VIDEO_ID : ID YouTube (phần sau "v=") — dùng khi Anh Tony có link YouTube.
     VIDEO_DRIVE: ID file Google Drive (phần giữa /d/ và /view) — file phải để "ai có link đều xem được".
       Dự phòng: phim CĐT trên Drive id 1scRu1YPyJmBMBTyyVtSQ9O4c-gN7s42t (1,79 GB, chủ sở hữu bankinhdoanh@nammekonggroup.vn).
     Cả ba trống = bấm khung video hiện dòng "phim đang cập nhật". */
  var VIDEO_SRC = '';
  var VIDEO_ID = 'cN734xzqIT8';   // youtu.be/cN734xzqIT8 — kênh Era Vietnam Review (01/10/2026)
  var VIDEO_DRIVE = '';

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

  /* mục menu đang xem */
  var navLinks = $$('#nav a[href^="#"]');
  function danhDauMenu() {
    var dang = null;
    navLinks.forEach(function (a) {
      var sec = $(a.getAttribute('href'));
      if (sec && sec.getBoundingClientRect().top <= 120) dang = a;
    });
    navLinks.forEach(function (a) { a.classList.toggle('on', a === dang); });
  }

  /* ---------- tab (bản đồ, tầng tiện ích, tháp, loại căn, phương thức thanh toán) ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function chon(t) {
      tabs.forEach(function (x) {
        var dung = x === t;
        x.setAttribute('aria-selected', String(dung));
        x.tabIndex = dung ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) p.hidden = !dung;
      });
    }
    tabs.forEach(function (t, i) {
      t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
      t.addEventListener('click', function () { chon(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, j = -1;
        if (k === 'ArrowRight' || k === 'ArrowDown') j = (i + 1) % tabs.length;
        if (k === 'ArrowLeft' || k === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
        if (j < 0) return;
        e.preventDefault(); chon(tabs[j]); tabs[j].focus();
      });
    });
  });

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
    var mo = function () {
      var i = $('img', el);
      moLb(el.getAttribute('data-zoom'), el.getAttribute('data-alt') || (i ? i.alt : ''), el);
    };
    el.addEventListener('click', mo);
    el.addEventListener('keydown', function (e) { if (e.target === el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); mo(); } });
  });
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) dongLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (lb.classList.contains('open')) dongLb();
    else if (hdr.classList.contains('open')) dongMenu();
  });

  /* ---------- trượt tiện ích ---------- */
  var track = $('#track'), truoc = $('#sl-truoc'), sau = $('#sl-sau'), dem = $('#sl-dem');
  if (track) {
    var slides = $$('.slide', track);
    var buoc = function () { return slides[0].getBoundingClientRect().width + 14; };
    var hienTai = function () { return Math.round(track.scrollLeft / buoc()); };
    var capNhat = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      truoc.disabled = track.scrollLeft <= 2;
      sau.disabled = track.scrollLeft >= max;
      var so = sau.disabled ? slides.length : Math.min(slides.length, hienTai() + 1);
      dem.textContent = so + ' / ' + slides.length;
    };
    truoc.addEventListener('click', function () { track.scrollBy({ left: -buoc(), behavior: 'smooth' }); });
    sau.addEventListener('click', function () { track.scrollBy({ left: buoc(), behavior: 'smooth' }); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); sau.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); truoc.click(); }
    });
    var henSl = false;
    track.addEventListener('scroll', function () { if (!henSl) { henSl = true; requestAnimationFrame(function () { henSl = false; capNhat(); }); } }, { passive: true });
    addEventListener('resize', capNhat);
    capNhat();
  }

  /* ---------- video: bấm mới tải ---------- */
  var vid = $('#vid');
  function phatVideo() {
    if (VIDEO_SRC) {
      var poster = $('img', vid).currentSrc || $('img', vid).src;
      vid.innerHTML = '<video controls autoplay playsinline preload="auto" poster="' + poster + '" src="' + VIDEO_SRC +
        '" title="Phim giới thiệu Nam Mekong Grand Plaza"></video>';
    } else if (VIDEO_ID) {
      vid.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + VIDEO_ID +
        '?autoplay=1&rel=0" title="Phim giới thiệu Nam Mekong Grand Plaza" ' +
        'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    } else if (VIDEO_DRIVE) {
      vid.innerHTML = '<iframe src="https://drive.google.com/file/d/' + VIDEO_DRIVE + '/preview" ' +
        'title="Phim giới thiệu Nam Mekong Grand Plaza" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    } else {
      if (!$('.cho', vid)) {
        var d = document.createElement('div');
        d.className = 'cho'; d.setAttribute('role', 'status');
        d.textContent = 'Phim giới thiệu đang được cập nhật lên trang. Chuyên viên ERA sẽ gửi anh/chị bản đầy đủ.';
        vid.appendChild(d);
      }
      return;
    }
    vid.style.cursor = 'default';
    vid.removeAttribute('role'); vid.removeAttribute('tabindex'); vid.removeAttribute('aria-label');
  }
  if (vid) {
    var chuaPhat = function () { return !$('iframe, video', vid); };
    vid.addEventListener('click', function () { if (chuaPhat()) phatVideo(); });
    vid.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && chuaPhat()) { e.preventDefault(); phatVideo(); } });
  }

  /* ---------- cuộn: menu đang xem ---------- */
  var hen = false;
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; danhDauMenu(); }); } }, { passive: true });
  danhDauMenu();

  var lastScrollY = window.scrollY;
  addEventListener('scroll', function () {
    if (!hdr || hdr.classList.contains('open')) return;
    var y = window.scrollY;
    hdr.classList.toggle('nav-hide', y > lastScrollY && y > 80);
    lastScrollY = y;
  }, { passive: true });

  function chuanSoDienThoai(value) {
    var clean = String(value || '').replace(/[^0-9]/g, '');
    if (clean.indexOf('84') === 0 && clean.length === 11) clean = '0' + clean.slice(2);
    return /^0[35789][0-9]{8}$/.test(clean) ? clean : null;
  }
  function layUtm() {
    var params = new URLSearchParams(location.search), result = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'adclid', 'adclida', 'mglnd'].forEach(function (key) { if (params.get(key)) result[key] = params.get(key); });
    if (!result.adclid && params.get('gclid')) result.adclid = params.get('gclid');
    if (!result.adclida && params.get('fbclid')) result.adclida = params.get('fbclid');
    return result;
  }
  function baoLoi(form, text) {
    var old = $('.msg', form); if (old) old.remove();
    var el = document.createElement('div'); el.className = 'msg err'; el.setAttribute('role', 'status'); el.textContent = text; form.appendChild(el);
  }
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = form.elements, name = (fields.hoten.value || '').trim(), phone = chuanSoDienThoai(fields.sdt.value);
      if (!name) { baoLoi(form, 'Anh/chị cho em xin họ tên với ạ.'); fields.hoten.focus(); return; }
      if (!phone) { baoLoi(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.'); fields.sdt.focus(); return; }
      var pageUrl = location.href; try { pageUrl = window.top.location.href; } catch (x) {}
      var data = { timestamp: new Date().toISOString(), hoten: name, sdt: phone, url: pageUrl.split('?')[0], ip: '', formId: 'NMG_LEAD', userAgent: navigator.userAgent, sanpham: '-Nam Mekong', email: fields.email ? fields.email.value : '', message: '', sheet: 'MEKONG' };
      var utm = layUtm(); Object.keys(utm).forEach(function (key) { data[key] = utm[key]; });
      var button = $('button[type=submit]', form); button.disabled = true;
      var body = JSON.stringify(data), sent = false;
      try { sent = navigator.sendBeacon('/api/submit-lead/', new Blob([body], { type: 'application/json' })); } catch (x) {}
      if (!sent) fetch('/api/submit-lead/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: 'NMG_LEAD' }); } catch (x) {}
      setTimeout(function () { window.top.location.href = '/thank-you-nam-mekong/'; }, 80);
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
})();
