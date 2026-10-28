/* Elyse Island landing — JS thuần, không thư viện (khung Gladia Heights / The Legend Đà Nẵng).
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

  /* ---------- phóng to ảnh ---------- */
  var lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), nguoiMoLb = null;
  function moLb(src, alt, nguon) {
    nguoiMoLb = nguon || null;
    lbImg.src = src; lbImg.alt = alt || ''; lbCap.textContent = alt || '';
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.documentElement.style.overflow = 'hidden';
    $('button', lb).focus();
  }
  function dongLb() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = '';
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

  /* ---------- cuộn: đánh dấu mục menu đang xem + ẩn header khi cuộn xuống ---------- */
  var hen = false, lastScrollY = scrollY;
  function capNhatHeader() {
    var y = scrollY;
    if (hdr.classList.contains('open')) hdr.classList.remove('nav-hide');
    else if (y <= 20 || y < lastScrollY - 4) hdr.classList.remove('nav-hide');
    else if (y > 80 && y > lastScrollY + 4) hdr.classList.add('nav-hide');
    lastScrollY = y;
  }
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; danhDauMenu(); capNhatHeader(); }); } }, { passive: true });
  danhDauMenu();
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
  function parentUrl() {
    var url = document.referrer || '';
    try { if (window.top && window.top.location) url = window.top.location.href; } catch (e) {}
    return url || location.href;
  }
  function layUTM() {
    var o = {}, urls = [location.href, parentUrl()];
    urls.forEach(function (url) {
      try {
        var p = new URL(url).searchParams;
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (k) { if (!o[k] && p.get(k)) o[k] = p.get(k); });
        if (!o.adclid && p.get('gclid')) o.adclid = p.get('gclid');
        if (!o.adclida && p.get('fbclid')) o.adclida = p.get('fbclid');
        if (!o.mglnd && p.get('mgclid')) o.mglnd = p.get('mgclid');
      } catch (e) {}
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

      var du = {
        formId: form.getAttribute('data-source') || 'ELYSE_ISLAND_LEAD',
        hoten: ten,
        sdt: sdt,
        url: parentUrl(),
        utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
        adclid: '', adclida: '', mglnd: '', ip: '',
        userAgent: navigator.userAgent || '',
        sanpham: f.product && f.product.value ? 'Elyse Island - ' + f.product.value : 'Elyse Island',
        email: '',
        message: '',
        sheet: 'ELYSE ISLAND',
        timestamp: new Date().toISOString()
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      if (!LEAD_ENDPOINT) {
        
        bao(form, 'Anh/chị vui lòng gọi hotline ERA 094.1125.000 để nhận bảng giá, mặt bằng và lịch tham quan.', 'loi');
        return;
      }
      nut.disabled = true; nut.setAttribute('data-chu', nut.textContent); nut.textContent = 'ĐANG GỬI...';
      var body = JSON.stringify(du), sent = false;
      try { if (navigator.sendBeacon) sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function (err) { console.error('[EI] Gửi lead lỗi:', err); });
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: du.formId }); } catch (x) {}
      window.top.location.href = '/thank-you-elyse-island/';
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

(function(){
 'use strict';
 var reduced = matchMedia('(prefers-reduced-motion: reduce)');
 var hero = document.querySelector('.hero');
 var photo = document.querySelector('.hero-photo');
 var heroImg = photo && photo.querySelector('img');
 var rings = document.querySelector('[data-m2]');
 var burst = document.querySelector('.burst');
 var desktop = matchMedia('(min-width: 761px)');

 // H3: công thức path SVG mẫu 01, mở một lần; không ghim, không thu lại khi cuộn.
 var heroSvg = null, heroPath = null, heroFrame = null, heroTimer = null;
 var heroBlob = 'M136.52 0C138.731 0 141.479 0.054 144.61 0.195 L151.473 0.55 L151.592 0.62 C155.828 0.942 160.48 1.404 165.321 2.064 L172.175 3.033 L172.417 3.162 C177.608 4.054 182.886 5.189 188.007 6.612 L188.184 6.622 L195.058 8.821 C198.171 9.877 201.18 11.087 204.006 12.439 C206.133 13.458 208.438 14.708 210.792 16.113 L218.821 21.251 L219.128 21.65 C223.536 24.883 227.621 28.421 230.548 31.813 C238.156 40.641 244.143 64.854 245.355 80.782 C246.315 93.407 248.895 123.345 235.566 155.391 C230.824 166.79 208.276 196.445 185.949 213.105 C167.626 226.779 130.153 244 83.176 244 C71.141 244 52.306 236.802 38.149 228.54 C35.086 226.516 28.424 222.302 27.541 221.64 C27.374 221.514 27.172 221.269 26.948 220.94 C23.848 218.428 21.474 215.983 20.165 213.778 C16.772 204.474 16.356 202.375 16.018 200.151 L15.12 193.486 L14.844 187.689 V180.833 C14.624 178.733 14.618 176.566 14.631 174.399 L14.84 165.428 C14.798 164.622 14.822 163.796 14.844 162.975 V157.052 L15.397 149.875 C15.329 145.3 15.369 141.312 15.236 138.092 C15.213 136.366 14.749 132.729 14.315 130.929 C13.471 128.324 12.186 125.045 10.721 121.575 L7.943 115.097 C6.613 112.17 5.368 109.354 4.329 106.841 C3.894 105.617 2.754 102.564 1.871 99.916 C1.81 99.732 1.772 99.501 1.752 99.23 C-0.18 90.456 -1.235 71.767 2.507 62.946 C5.087 56.871 14.444 48.35 25.105 40.181 L31.485 35.474 C36.622 31.714 41.798 28.201 46.481 25.166 L52.658 21.25 C54.26 20.209 57.8 18.011 60.583 16.585 C61.142 16.28 61.641 16.015 62.075 15.796 C63.537 15.056 65.363 14.293 67.471 13.52 C68.825 12.971 70.067 12.503 71.152 12.142 C73.139 11.479 76.212 10.577 77.5 10.209 C82.192 9.013 92.46 6.455 95.993 5.793 C99.526 5.131 101.882 4.506 102.618 4.414 L102.854 4.397 C107.854 3.419 112.808 2.557 117.439 1.861 L117.799 1.652 C119.179 1.468 122.436 1.045 124.423 0.824 C124.723 0.791 125.112 0.775 125.565 0.771 C129.865 0.279 133.627 0 136.52 0Z';
 function transformHeroPath(d, tx, ty, scale) {
  var tokens = d.match(/[MLCVHZ]|[-+]?\d*\.?\d+/gi), out = [], i = 0;
  while (i < tokens.length) {
   var command = tokens[i++];
   if (/[MLC]/i.test(command)) {
    out.push(command);
    while (i < tokens.length && !/[A-Z]/i.test(tokens[i]))
     out.push((+tokens[i++] * scale + tx).toFixed(2), (+tokens[i++] * scale + ty).toFixed(2));
   } else if (/[VH]/i.test(command)) {
    out.push(command);
    while (i < tokens.length && !/[A-Z]/i.test(tokens[i]))
     out.push((+tokens[i++] * scale + (command.toUpperCase() === 'V' ? ty : tx)).toFixed(2));
   } else out.push('Z');
  }
  return out.join(' ');
 }
 function finishHero() {
  if (heroFrame !== null) { cancelAnimationFrame(heroFrame); heroFrame = null; }
  if (heroTimer !== null) { clearTimeout(heroTimer); heroTimer = null; }
  if (photo) {
   photo.style.removeProperty('clip-path');
   photo.style.removeProperty('-webkit-clip-path');
  }
  if (heroSvg) { heroSvg.remove(); heroSvg = null; heroPath = null; }
 }
 function startHero() {
  if (!hero || !photo || reduced.matches || !('requestAnimationFrame' in window)) return;
  var w = photo.clientWidth, h = photo.clientHeight;
  if (!w || !h) return;
  var mobile = !desktop.matches;
  var duration = mobile ? 750 : 1500;
  var centerX = w * (mobile ? .54 : .77), centerY = h * .5;
  var initial = Math.max(w * (mobile ? .80 : .40), h * .70) / 247;
  var finalScale = Math.hypot(w, h) * 2.4 / 247;
  heroSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  heroSvg.setAttribute('aria-hidden', 'true');
  heroSvg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
  heroSvg.innerHTML = '<defs><clipPath id="elyseHeroBloom" clipPathUnits="userSpaceOnUse"><path/></clipPath></defs>';
  document.body.appendChild(heroSvg);
  heroPath = heroSvg.querySelector('path');
  function paint(progress) {
   var smooth = progress * progress * (3 - 2 * progress);
   var scale = initial + (finalScale - initial) * smooth;
   heroPath.setAttribute('d', transformHeroPath(heroBlob, centerX - 123.5 * scale, centerY - 122 * scale, scale));
  }
  paint(0);
  photo.style.clipPath = photo.style.webkitClipPath = 'url(#elyseHeroBloom)';
  var started = null;
  function step(now) {
   if (reduced.matches || document.hidden || !heroPath) { finishHero(); return; }
   if (started === null) started = now;
   var progress = Math.min(1, (now - started) / duration);
   if (progress >= 1) { finishHero(); return; }
   paint(progress);
   heroFrame = requestAnimationFrame(step);
  }
  heroTimer = setTimeout(finishHero, duration + 500);
  heroFrame = requestAnimationFrame(step);
 }
 window.addEventListener('resize', finishHero, { passive: true });
 document.addEventListener('visibilitychange', function () { if (document.hidden) finishHero(); });
 if(rings && !reduced.matches && desktop.matches){
  rings.classList.add('motion');
  new IntersectionObserver(function(entries,observer){entries.forEach(function(e){if(e.isIntersecting){rings.classList.add('in');observer.disconnect();}});},{threshold:.25}).observe(rings);
 }
 // M2: mở ảnh một lần khi tới; sau đó luôn thấy ảnh đầy đủ khi quay lại.
 if(burst && 'IntersectionObserver' in window){
  var burstObserver = new IntersectionObserver(function(entries,observer){
   entries.forEach(function(entry){
    if(!entry.isIntersecting)return;
    observer.unobserve(burst);
    if(!desktop.matches || reduced.matches)return;
    burst.classList.add('is-opening');
    function finishBurst(){burst.classList.remove('is-opening');}
    burst.addEventListener('animationend',finishBurst,{once:true});
    setTimeout(finishBurst,1100);
   });
  },{threshold:.15});
  burstObserver.observe(burst);
 }
 reduced.addEventListener('change',function(){
  if(reduced.matches){finishHero();if(burst)burst.classList.remove('is-opening');}
 });
 startHero();
 // Dùng phím mũi tên, Home, End ở tab theo chuẩn truy cập bàn phím.
 document.querySelectorAll('[role="tablist"]').forEach(function(list){
  var tabs=Array.from(list.querySelectorAll('[role="tab"]'));
  function roving(){tabs.forEach(function(t){t.tabIndex=t.getAttribute('aria-selected')==='true'?0:-1;});}
  tabs.forEach(function(t,i){t.addEventListener('click',roving);t.addEventListener('keydown',function(e){
   var next=i;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;
   e.preventDefault();tabs[next].click();tabs[next].focus();
  });});roving();
 });
 // Giữ focus ở menu và hộp xem ảnh khi mở.
 document.addEventListener('keydown',function(e){
  if(e.key!=='Tab')return;
  var box=document.querySelector('#lb.open') || document.querySelector('.hdr.open');if(!box)return;
  var focus=Array.from(box.querySelectorAll('a,button,[tabindex="0"]')).filter(function(x){return x.getClientRects().length;});
  if(!focus.length)return;var first=focus[0],last=focus[focus.length-1];
  if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
 });
})();
