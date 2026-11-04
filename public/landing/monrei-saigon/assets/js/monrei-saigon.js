/* Monrei Saigon landing — JS thuần, không thư viện (khung Gladia Heights / The Legend Đà Nẵng).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác. */
(function () {
  'use strict';

  /* 1 NGUỒN CHO 2 BẢN: phần form/thanh liên hệ chỉ chạy khi trang có form (bản có form).
     🔴 LEAD_ENDPOINT: nơi nhận lead (vd Google Apps Script .../exec) — IT điền. Để trống = form báo khách gọi hotline,
     KHÔNG nuốt lead im lặng. */
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

  /* ---------- tab phân khu / loại sản phẩm ---------- */
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

  /* ---------- gallery tiện ích: nhóm ảnh, thumbnail, trước/sau ---------- */
  $$('[data-amenity-gallery]').forEach(function (gallery) {
    var slides = $$('[data-amenity-slide]', gallery);
    var filters = $$('[data-amenity-filter]', gallery);
    var thumbs = $$('[data-amenity-thumb]', gallery);
    var group = filters.length ? filters[0].getAttribute('data-amenity-filter') : '', index = 0;
    var count = $('[data-amenity-count]', gallery);
    function hienAnh() {
      var selected = slides.filter(function (slide) { return slide.getAttribute('data-group') === group; });
      if (!selected.length) return;
      index = (index + selected.length) % selected.length;
      var active = selected[index];
      slides.forEach(function (slide) { slide.hidden = slide !== active; });
      filters.forEach(function (button) { button.setAttribute('aria-pressed', String(button.getAttribute('data-amenity-filter') === group)); });
      thumbs.forEach(function (button) {
        button.hidden = button.getAttribute('data-group') !== group;
        button.setAttribute('aria-pressed', String(slides[Number(button.getAttribute('data-amenity-thumb'))] === active));
      });
      if (count) count.textContent = 'Ảnh ' + (index + 1) + ' / ' + selected.length;
    }
    filters.forEach(function (button) {
      button.addEventListener('click', function () { group = button.getAttribute('data-amenity-filter'); index = 0; hienAnh(); });
    });
    thumbs.forEach(function (button) {
      button.addEventListener('click', function () {
        var slide = slides[Number(button.getAttribute('data-amenity-thumb'))];
        if (!slide) return;
        group = slide.getAttribute('data-group');
        index = slides.filter(function (item) { return item.getAttribute('data-group') === group; }).indexOf(slide);
        hienAnh();
      });
    });
    var prev = $('[data-amenity-prev]', gallery), next = $('[data-amenity-next]', gallery);
    if (prev) prev.addEventListener('click', function () { index--; hienAnh(); });
    if (next) next.addEventListener('click', function () { index++; hienAnh(); });
    $$('[data-amenity-controls]', gallery).forEach(function (controls) { controls.hidden = false; });
    hienAnh();
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
  var hieuUng = document.documentElement.classList.contains('vl');
  var hero = $('#hero');
  function capNhatHero() {
    if (!hero) return;
    var r = hero.getBoundingClientRect();
    // Trở về đầu trang phải khôi phục chữ ngay cả khi cuộn nhanh hoặc đổi bố cục.
    var p = !hieuUng || window.scrollY <= 1 ? 0 : Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    hero.style.setProperty('--p', p.toFixed(3));
  }

  /* content-visibility (CSS) chỉ dùng lúc mở trang: tải xong thì gỡ để mọi khối có chiều cao thật — menu, nút neo cuộn đúng chỗ */
  function cvXong() { setTimeout(function () { document.documentElement.classList.add('cv-xong'); }, 300); }
  if (document.readyState === 'complete') cvXong(); else addEventListener('load', cvXong);
  $$('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function () { document.documentElement.classList.add('cv-xong'); }); });

  /* ---------- mở sóng nước: path và biến đổi từ mẫu hero H3c ---------- */
  (function () {
    var root = $('#hero'), media = root && $('.hero-hinh', root);
    if (!root || !media || !window.matchMedia) return;
    var reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !window.requestAnimationFrame) return;
    var NS = 'http://www.w3.org/2000/svg';
    var VET = 'M136.52 0C138.731 0 141.479 0.054 144.61 0.195 L151.473 0.55 L151.592 0.62 C155.828 0.942 160.48 1.404 165.321 2.064 L172.175 3.033 L172.417 3.162 C177.608 4.054 182.886 5.189 188.007 6.612 L188.184 6.622 L195.058 8.821 C198.171 9.877 201.18 11.087 204.006 12.439 C206.133 13.458 208.438 14.708 210.792 16.113 L218.821 21.251 L219.128 21.65 C223.536 24.883 227.621 28.421 230.548 31.813 C238.156 40.641 244.143 64.854 245.355 80.782 C246.315 93.407 248.895 123.345 235.566 155.391 C230.824 166.79 208.276 196.445 185.949 213.105 C167.626 226.779 130.153 244 83.176 244 C71.141 244 52.306 236.802 38.149 228.54 C35.086 226.516 28.424 222.302 27.541 221.64 C27.374 221.514 27.172 221.269 26.948 220.94 C23.848 218.428 21.474 215.983 20.165 213.778 C16.772 204.474 16.356 202.375 16.018 200.151 L15.12 193.486 L14.844 187.689 V180.833 C14.624 178.733 14.618 176.566 14.631 174.399 L14.84 165.428 C14.798 164.622 14.822 163.796 14.844 162.975 V157.052 L15.397 149.875 C15.329 145.3 15.369 141.312 15.236 138.092 C15.213 136.366 14.749 132.729 14.315 130.929 C13.471 128.324 12.186 125.045 10.721 121.575 L7.943 115.097 C6.613 112.17 5.368 109.354 4.329 106.841 C3.894 105.617 2.754 102.564 1.871 99.916 C1.81 99.732 1.772 99.501 1.752 99.23 C-0.18 90.456 -1.235 71.767 2.507 62.946 C5.087 56.871 14.444 48.35 25.105 40.181 L31.485 35.474 C36.622 31.714 41.798 28.201 46.481 25.166 L52.658 21.25 C54.26 20.209 57.8 18.011 60.583 16.585 C61.142 16.28 61.641 16.015 62.075 15.796 C63.537 15.056 65.363 14.293 67.471 13.52 C68.825 12.971 70.067 12.503 71.152 12.142 C73.139 11.479 76.212 10.577 77.5 10.209 C82.192 9.013 92.46 6.455 95.993 5.793 C99.526 5.131 101.882 4.506 102.618 4.414 L102.854 4.397 C107.854 3.419 112.808 2.557 117.439 1.861 L117.799 1.652 C119.179 1.468 122.436 1.045 124.423 0.824 C124.723 0.791 125.112 0.775 125.565 0.771 C129.865 0.279 133.627 0 136.52 0Z';
    var TOKEN = VET.match(/[MLCVHZ]|[-+]?\d*\.?\d+/gi);
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


    var defs = document.createElementNS(NS, 'svg');
    defs.setAttribute('aria-hidden', 'true');
    defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    defs.innerHTML = '<defs><clipPath id="monreiHeroWave" clipPathUnits="userSpaceOnUse"><path/></clipPath></defs>';
    root.appendChild(defs);
    var clipPath = defs.querySelector('path');
    var outline = document.createElementNS(NS, 'svg');
    outline.setAttribute('class', 'hero-wave-outline');
    outline.setAttribute('aria-hidden', 'true');
    var ring = document.createElementNS(NS, 'path');
    outline.appendChild(ring);$('.hero-san', root).appendChild(outline);
    var raf = 0, started = false;
    function finish() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      media.style.clipPath = media.style.webkitClipPath = '';
      outline.style.opacity = '0';
      root.classList.remove('wave-intro');
    }
    function start() {
      if (started || reduced.matches) return;
      started = true;
      if (root.getBoundingClientRect().bottom <= 0 || window.scrollY > root.offsetTop + 100) return;
      var W = media.clientWidth, H = media.clientHeight;
      if (!W || !H) return;
      var initial = Math.max(W * .68 / 247, H * .65 / 244);
      var full = Math.hypot(W, H) * 1.7 / 247;
      var duration = innerWidth <= 760 ? 950 : 1550;
      outline.setAttribute('width', W);outline.setAttribute('height', H);
      root.classList.add('wave-intro');
      media.style.clipPath = media.style.webkitClipPath = 'url(#monreiHeroWave)';
      var began = performance.now();
      function draw(now) {
        if (reduced.matches) { finish(); return; }
        var q = Math.min(1, Math.max(0, (now - began) / duration));
        var eased = 1 - Math.pow(1 - q, 3);
        var scale = initial + (full - initial) * eased;
        var d = bienDoi(W / 2 - 123.5 * scale, H / 2 - 122 * scale, scale);
        clipPath.setAttribute('d', d);ring.setAttribute('d', d);
        outline.style.opacity = String(.35 * (1 - q));
        if (q < 1) raf = requestAnimationFrame(draw); else finish();
      }
      draw(began);
    }
    addEventListener('resize', finish, { passive: true });
    addEventListener('pageshow', function (event) { if (event.persisted) finish(); });
    if (reduced.addEventListener) reduced.addEventListener('change', function () { if (reduced.matches) finish(); });
    if (document.readyState === 'complete') start(); else addEventListener('load', start, { once: true });
  })();

  /* ---------- hero video nền MP4 tự host, tắt tiếng và tự chạy ---------- */
  (function () {
    var root = $('#hero'), video = $('#hero-background-video');
    if (!root || !video) return;
    var reduced = matchMedia('(prefers-reduced-motion: reduce)');
    var toggle = $('[data-hero-motion]', root);
    var manualPause = false, visible = true, started = false, failed = false;
    function buttonState(paused) {
      if (!toggle || failed) return;
      toggle.hidden = false;
      toggle.textContent = paused ? 'Phát video' : 'Tạm dừng video';
      toggle.setAttribute('aria-pressed', String(paused));
    }
    function shouldPlay() {
      return !manualPause && !document.hidden && visible && !reduced.matches;
    }
    function sync() {
      if (!started || failed) return;
      if (!shouldPlay()) { video.pause(); return; }
      video.muted = true;
      var playing = video.play();
      if (playing && typeof playing.catch === 'function') playing.catch(function () {
        // Trình duyệt chặn tự phát: khách vẫn có thể bấm phát.
        if (shouldPlay() && video.paused) buttonState(true);
      });
    }
    function loadVideo() {
      if (started || reduced.matches) return;
      started = true;
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.src = matchMedia('(max-width: 760px)').matches ? video.dataset.srcMobile : video.dataset.src;
      video.load();
      sync();
    }
    video.addEventListener('playing', function () {
      root.classList.add('has-video'); buttonState(false);
    });
    video.addEventListener('loadeddata', sync);
    video.addEventListener('pause', function () { if (started) buttonState(true); });
    video.addEventListener('error', function () {
      failed = true; root.classList.remove('has-video');
      if (toggle) toggle.hidden = true;
    });
    if (toggle) toggle.addEventListener('click', function () {
      if (!started || failed) return;
      manualPause = !video.paused;
      buttonState(manualPause); sync();
    });
    document.addEventListener('visibilitychange', sync);
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { visible = entry.isIntersecting; sync(); });
      }, { threshold: 0.05 });
      observer.observe(root);
    }
    function motionChange() { if (!started && !reduced.matches) loadVideo(); sync(); }
    if (reduced.addEventListener) reduced.addEventListener('change', motionChange);
    if (document.readyState === 'complete') loadVideo();
    else addEventListener('load', loadVideo, { once: true });
  })();

  /* ---------- cuộn: đánh dấu mục menu + header thu gọn + hero ---------- */
  var hen = false;
  // Tên cập nhật theo sự kiện cuộn; không giữ trạng thái cũ trong hàng đợi header.
  addEventListener('scroll', capNhatHero, { passive: true });
  addEventListener('resize', capNhatHero, { passive: true });
  addEventListener('pageshow', capNhatHero);
  if ('IntersectionObserver' in window && hero) {
    var nhinHero = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) capNhatHero(); });
    }, { threshold: [0, 0.5, 1] });
    nhinHero.observe(hero);
  }
  function khiCuon() { danhDauMenu(); hdr.classList.toggle('nho', scrollY > 40); }
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; khiCuon(); }); } }, { passive: true });
  khiCuon();
  capNhatHero();


if (document.documentElement.classList.contains('vl') && 'IntersectionObserver' in window) {
const CHU_TUNG_TU = {tgTu:1000,gian:50,toiDa:2000};
document.querySelectorAll('[data-tung-tu]').forEach(el => {
  let i = 0;
  (function tach(node) {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const phan = n.textContent.split(/(\s+)/).filter(Boolean).map(s => {
          if (/^\s+$/.test(s)) return document.createTextNode(s);
          const sp = document.createElement('span'); sp.className = 'tu'; sp.textContent = s; sp.style.setProperty('--i', i++); return sp;
        });
        n.replaceWith(...phan);
      } else if (n.nodeType === 1) tach(n);
    });
  })(el);
  // Câu dài thì rút khoảng trễ giữa các từ để cả câu không quá toiDa
  const gian = i > 1 ? Math.min(CHU_TUNG_TU.gian, (CHU_TUNG_TU.toiDa - CHU_TUNG_TU.tgTu) / (i - 1)) : 0;
  el.style.setProperty('--gian', gian + 'ms');
  el.style.setProperty('--tg-tu', CHU_TUNG_TU.tgTu + 'ms');
});
const nhin = new IntersectionObserver(ds => ds.forEach(d => d.isIntersecting && d.target.setAttribute('data-thay','')), { threshold: .2 });
document.querySelectorAll('[data-tung-tu]').forEach(el => nhin.observe(el));

}

  /* ==================== PHẦN BẢN CÓ FORM: gửi lead (không có form thì các vòng lặp dưới không chạy) ==================== */
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
      try { if (window.top && window.top.location) pageUrl = window.top.location.href; } catch (x) {}
      var du = {
        timestamp: new Date().toISOString(),
        hoten: ten,
        sdt: sdt,
        url: pageUrl.split('?')[0],
        ip: '',
        formId: 'MONREI_SAIGON_LEAD',
        source: form.getAttribute('data-source') || 'form-monrei-saigon',
        userAgent: navigator.userAgent,
        sanpham: 'Monrei Saigon' + (f.product && f.product.value ? ' - ' + f.product.value : ''),
        email: f.email ? f.email.value : '',
        message: '',
        sheet: 'MONREI SAIGON'
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      nut.disabled = true; nut.setAttribute('data-chu', nut.textContent); nut.textContent = 'ĐANG GỬI...';
      var body = JSON.stringify(du), sent = false;
      try { sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
      var request = sent ? Promise.resolve({ ok: true }) : fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true });
      request
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
          try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
          window.top.location.href = '/thank-you-monrei-saigon/';
        })
        .catch(function (err) {
          console.error('[MONREI] Gửi lead lỗi:', err);
          nut.disabled = false; nut.textContent = nut.getAttribute('data-chu');
          bao(form, 'Gửi chưa được. Anh/chị thử lại hoặc gọi hotline 094.1125.000 giúp em ạ.', 'loi');
        });
    });
  });

  /* nút "Nhận giá căn ..." ở tab loại căn -> ghi sẵn loại căn vào form */
  var formDk = $('#dang-ky form');
  if (formDk) $$('[data-loai]').forEach(function (a) {
    a.addEventListener('click', function () {
      formDk.elements.product.value = a.getAttribute('data-loai');
      setTimeout(function () { formDk.elements.name.focus({ preventScroll: true }); }, 700);
    });
  });

  /* thanh Gọi / Zalo / Đăng ký trên điện thoại: hiện sau màn đầu, ẩn khi đang ở khối đăng ký */
  var bar = $('#bar'), dk = $('#dang-ky'), henBar = false;
  if (bar && dk) {
  function capNhatBar() {
    henBar = false;
    var r = dk.getBoundingClientRect();
    bar.classList.toggle('show', scrollY > innerHeight * 0.6 && !(r.top < innerHeight && r.bottom > 0));
  }
  addEventListener('scroll', function () { if (!henBar) { henBar = true; requestAnimationFrame(capNhatBar); } }, { passive: true });
  capNhatBar();
  }
})();
