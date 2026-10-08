(function () {
  'use strict';

  var LEAD_ENDPOINT = '/api/submit-lead/';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var hdr = $('#hdr'), burger = $('#burger');

  function dongMenu() {
    if (!hdr || !burger) return;
    hdr.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  }
  if (burger) burger.addEventListener('click', function () {
    var mo = !hdr.classList.contains('open');
    hdr.classList.toggle('open', mo);
    burger.setAttribute('aria-expanded', String(mo));
    document.documentElement.style.overflow = mo ? 'hidden' : '';
  });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', dongMenu); });

  var lastScroll = window.scrollY || 0;
  var scrollTicking = false;
  function capNhatHeader() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (hdr) {
      if (y <= 80) hdr.classList.remove('nav-hide');
      else hdr.classList.toggle('nav-hide', y > lastScroll);
    }
    lastScroll = y;
    scrollTicking = false;
  }
  function scheduleHeader() {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(capNhatHeader); }
  }
  addEventListener('scroll', scheduleHeader, { passive: true });
  document.addEventListener('scroll', scheduleHeader, { passive: true, capture: true });
  capNhatHeader();

  var navLinks = $$('a[href^="#"]');
  function danhDauMenu() {
    var moc = 120, dang = null;
    navLinks.forEach(function (a) {
      var sec = $(a.getAttribute('href'));
      if (sec && sec.getBoundingClientRect().top <= moc) dang = a;
    });
    navLinks.forEach(function (a) { a.classList.toggle('on', a === dang); });
  }

  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) {
          var active = x === t;
          x.setAttribute('aria-selected', String(active));
          var panel = document.getElementById(x.getAttribute('aria-controls'));
          if (panel) panel.hidden = !active;
        });
      });
    });
  });

  var vid = $('#vid'), play = $('#vid-play');
  if (vid && play) play.addEventListener('click', function () {
    var frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + vid.getAttribute('data-yt') + '?autoplay=1&rel=0&playsinline=1';
    frame.title = 'Video giới thiệu Thanh Phú Centre Point';
    frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    vid.innerHTML = '';
    vid.appendChild(frame);
    frame.focus();
  });

  var acc = $('#acc');
  if (acc) {
    var figures = $$('figure', acc);
    figures.forEach(function (figure) {
      function activate() { figures.forEach(function (x) { x.classList.toggle('on', x === figure); }); }
      figure.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) activate(); });
      figure.addEventListener('click', activate);
    });
  }

  var lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), lbOrigin = null;
  function dongLb() {
    if (!lb) return;
    lb.classList.remove('open');
    document.documentElement.style.overflow = '';
    if (lbImg) lbImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    if (lbOrigin) lbOrigin.focus();
  }
  $$('[data-zoom]').forEach(function (el) {
    if (el.tagName !== 'BUTTON') { el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button'); }
    function open() {
      var image = $('img', el);
      lbOrigin = el;
      lbImg.src = el.getAttribute('data-zoom');
      lbImg.alt = image ? image.alt : '';
      lbCap.textContent = lbImg.alt;
      lb.classList.add('open');
      document.documentElement.style.overflow = 'hidden';
      $('button', lb).focus();
    }
    el.addEventListener('click', open);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  if (lb) lb.addEventListener('click', function (e) { if (e.target !== lbImg) dongLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (lb && lb.classList.contains('open')) dongLb();
    else if (hdr && hdr.classList.contains('open')) dongMenu();
  });

  function chuanSDT(s) {
    s = String(s || '').replace(/[^0-9]/g, '');
    if (s.indexOf('84') === 0 && s.length === 11) s = '0' + s.slice(2);
    return /^0[35789][0-9]{8}$/.test(s) ? s : null;
  }
  function layUTM() {
    var params = new URLSearchParams(location.search), out = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'adclid', 'adclida', 'mglnd']
      .forEach(function (key) { if (params.get(key)) out[key] = params.get(key); });
    return out;
  }
  function bao(form, text, type) {
    var old = $('.msg', form);
    if (old) old.remove();
    var msg = document.createElement('div');
    msg.className = 'msg ' + type;
    msg.setAttribute('role', 'status');
    msg.textContent = text;
    form.appendChild(msg);
  }
  function layUrlGoc() {
    try { return window.top.location.href; } catch (e) { return location.href; }
  }
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = form.elements;
      var button = $('button[type=submit]', form);
      var name = (fields.name.value || '').trim();
      var phone = chuanSDT(fields.phone.value);
      if (!name) { bao(form, 'Anh/chị cho em xin họ tên với ạ.', 'err'); fields.name.focus(); return; }
      if (!phone) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'err'); fields.phone.focus(); return; }
      var product = fields.product ? fields.product.value : '';
      var lead = {
        timestamp: new Date().toISOString(), hoten: name, sdt: phone, url: layUrlGoc(), ip: '',
        formId: 'TP_LEAD', userAgent: navigator.userAgent || '',
        sanpham: (product || '') + '-Thanh Phú', email: '', message: '', sheet: 'THANH PHÚ',
        source: form.getAttribute('data-source') || 'form-dang-ky-tham-quan'
      };
      var utm = layUTM();
      Object.keys(utm).forEach(function (key) { lead[key] = utm[key]; });
      button.disabled = true;
      button.setAttribute('data-chu', button.textContent);
      button.textContent = 'ĐANG GỬI...';
      var body = JSON.stringify(lead), sent = false;
      try { sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (err) {}
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
      try { if (window.fbq) fbq('track', 'Lead'); } catch (err) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: lead.source }); } catch (err) {}
      window.location.href = '/thank-you-thanh-phu/';
    });
  });

  var formDk = $('#dang-ky form');
  $$('[data-loai]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!formDk || !formDk.elements.product) return;
      formDk.elements.product.value = link.getAttribute('data-loai');
      setTimeout(function () { formDk.elements.name.focus({ preventScroll: true }); }, 700);
    });
  });

  var bar = $('#bar'), dk = $('#dang-ky'), barTicking = false;
  function capNhatBar() {
    barTicking = false;
    if (!bar || !dk) return;
    var rect = dk.getBoundingClientRect();
    bar.classList.toggle('show', window.scrollY > window.innerHeight * 0.6 && !(rect.top < innerHeight && rect.bottom > 0));
  }
  addEventListener('scroll', function () {
    if (!barTicking) { barTicking = true; requestAnimationFrame(capNhatBar); }
  }, { passive: true });
  capNhatBar();

  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { observer.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });
  danhDauMenu();
  addEventListener('scroll', danhDauMenu, { passive: true });
})();
