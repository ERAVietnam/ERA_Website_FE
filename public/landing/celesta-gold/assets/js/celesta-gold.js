/* Celesta Gold landing — JS thuần, không thư viện.
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác. */
(function () {
  'use strict';

  var LEAD_ENDPOINT = '/api/submit-lead/';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function chuanSoDiDong(value) {
    var number = String(value || '').trim().replace(/[\s.()+-]/g, '');
    if (number.indexOf('84') === 0 && number.length === 11) number = '0' + number.slice(2);
    return /^0[35789][0-9]{8}$/.test(number) ? number : '';
  }

  /* Mỗi Agent dùng link ?sdt=<số di động>. Chỉ đổi các liên hệ đã có trong bản có form. */
  var agentPhone = chuanSoDiDong(new URLSearchParams(location.search).get('sdt'));
  if (agentPhone) {
    var phoneLabel = agentPhone.slice(0, 4) + '.' + agentPhone.slice(4, 7) + '.' + agentPhone.slice(7);
    $$('[data-agent-phone]').forEach(function (link) {
      link.setAttribute('href', 'tel:' + agentPhone);
      link.textContent = (link.getAttribute('data-agent-prefix') || '') + phoneLabel;
      link.setAttribute('aria-label', 'Gọi chuyên viên tư vấn: ' + phoneLabel);
    });
    $$('[data-agent-zalo]').forEach(function (link) {
      link.setAttribute('href', 'https://zalo.me/' + agentPhone);
    });
  }

  function parentUrl() {
    var url = document.referrer || '';
    try { if (window.top && window.top.location) url = window.top.location.href; } catch (e) {}
    return url || location.href;
  }
  function layUTM() {
    var p = new URLSearchParams(location.search);
    try { new URL(parentUrl()).searchParams.forEach(function (value, key) { if (!p.get(key)) p.set(key, value); }); } catch (e) {}
    var o = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'adclid', 'adclida', 'mgclid']
      .forEach(function (key) { if (p.get(key)) o[key === 'mgclid' ? 'mglnd' : key] = p.get(key); });
    return o;
  }
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var fields = form.elements, button = $('button[type="submit"]', form);
      var name = String(fields.name.value || '').trim().replace(/\s+/g, ' ');
      var phone = chuanSoDiDong(fields.phone.value);
      if (name.length < 2 || name.length > 100) { fields.name.focus(); return; }
      if (!phone) { fields.phone.focus(); return; }
      var payload = {
        formId: 'CELESTA_GOLD_LEAD', hoten: name, sdt: phone, url: parentUrl(), ip: '',
        userAgent: navigator.userAgent,
        sanpham: (fields.product && fields.product.value ? fields.product.value + '-Celesta Gold' : 'Celesta Gold'),
        email: fields.email ? String(fields.email.value || '').trim() : '',
        message: fields.message ? String(fields.message.value || '').trim() : '',
        sheet: 'CELESTA GOLD', timestamp: new Date().toISOString()
      };
      var utm = layUTM(); Object.keys(utm).forEach(function (key) { payload[key] = utm[key]; });
      var body = JSON.stringify(payload), sent = false;
      button.disabled = true;
      try { sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (e) {}
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
      try { window.top.location.href = '/thank-you-celesta-gold/'; } catch (e) { location.href = '/thank-you-celesta-gold/'; }
    });
  });

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

  /* ---------- tab (hiện chưa dùng — để sẵn) ---------- */
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
})();
