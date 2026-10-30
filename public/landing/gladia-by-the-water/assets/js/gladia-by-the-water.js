/* GLADIA BY THE WATER landing — JS thuần, không thư viện (khung Gladia Heights / The Legend Đà Nẵng).
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

  /* ---------- phóng to ảnh ---------- */
  var lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), nguoiMoLb = null;
  function moLb(src, alt, nguon) {
    nguoiMoLb = nguon || null;
    lbImg.src = src; lbImg.alt = alt || ''; lbCap.textContent = alt || '';
    lb.classList.add('open'); lb.removeAttribute('aria-hidden'); document.documentElement.style.overflow = 'hidden';
    $('button', lb).focus();
  }
  function dongLb() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.documentElement.style.overflow = '';
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

  /* ---------- cuộn: đánh dấu mục menu đang xem ---------- */
  var hen = false;
  var lastScrollY = scrollY;
  function capNhatHeader() {
    var y = scrollY;
    if (hdr.classList.contains("open")) hdr.classList.remove("nav-hide");
    else if (y <= 20 || y < lastScrollY - 4) hdr.classList.remove("nav-hide");
    else if (y > 80 && y > lastScrollY + 4) hdr.classList.add("nav-hide");
    lastScrollY = y;
  }
  addEventListener("scroll", function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; danhDauMenu(); capNhatHeader(); }); } }, { passive: true });
  danhDauMenu();

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
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-gallery] .gallery-tile') : null;
    if (!el) return;
    var i = $('img', el);
    if (i) moLb(i.currentSrc || i.src, '', el);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.closest ? e.target.closest('[data-gallery] .gallery-tile') : null;
    if (!el) return;
    e.preventDefault();
    var i = $('img', el);
    if (i) moLb(i.currentSrc || i.src, '', el);
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
  function layUTM() {
    var search = location.search;
    try { if (window.top !== window) search += '&' + window.top.location.search.replace(/^\?/, ''); } catch (e) {}
    var p = new URLSearchParams(search), o = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'adclid', 'adclida', 'mglnd', 'gclid', 'fbclid', 'mgclid']
      .forEach(function (k) { if (p.get(k)) o[k === 'mgclid' ? 'mglnd' : (k === 'gclid' ? 'adclid' : (k === 'fbclid' ? 'adclida' : k))] = p.get(k); });
    return o;
  }
  function parentUrl() {
    var url = document.referrer || '';
    try { if (window.top && window.top.location) url = window.top.location.href; } catch (e) {}
    return url || location.href;
  }
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, nut = $('button[type=submit]', form);
      var ten = (f.name.value || '').trim(), sdt = chuanSDT(f.phone.value);
      if (!ten) { bao(form, 'Anh/chị cho em xin họ tên với ạ.', 'loi'); f.name.focus(); return; }
      if (!sdt) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'loi'); f.phone.focus(); return; }

      var du = {
        formId: 'GLADIA_BY_THE_WATER_FORM',
        hoten: ten,
        sdt: sdt,
        email: '',
        message: '',
        sanpham: f.product && f.product.value ? 'The Water - ' + f.product.value : 'The Water',
        sheet: 'GLADIA',
        url: parentUrl(),
        ip: '',
        userAgent: navigator.userAgent || '',
        timestamp: new Date().toISOString()
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      if (!LEAD_ENDPOINT) {
        
        bao(form, 'Trang đang ở bản xem thử, chưa nối nơi nhận thông tin. Anh/chị gọi hotline 094.1125.000 giúp em ạ.', 'loi');
        return;
      }
      nut.disabled = true; nut.setAttribute('data-chu', nut.textContent); nut.textContent = 'ĐANG GỬI...';
      var body = JSON.stringify(du), sent = false;
      try {
        if (navigator.sendBeacon) sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' }));
      } catch (x) {}
      var done = function () { window.top.location.href = '/thank-you-gladia-by-the-water/'; };
      if (sent) { done(); return; }
      fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); done(); })
        .catch(function (err) {
          console.error('[GLADIA] Gửi lead lỗi:', err);
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

(function(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const CHU_TUNG_TU={tgTu:1000,gian:50,toiDa:2000};
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
const nhin = new IntersectionObserver(ds => ds.forEach(d => {
  if (!d.isIntersecting) return;
  d.target.setAttribute('data-thay', '');
  nhin.unobserve(d.target);
}), { threshold: .2 });
document.querySelectorAll('[data-tung-tu]').forEach(el => nhin.observe(el));

})();

document.querySelectorAll('[data-gallery]').forEach(function(g){
  var originals=Array.from(g.querySelectorAll(':scope > .gallery-item'));
  var extra=document.createElement('figure');
  extra.className='gallery-item gallery-extra';
  extra.innerHTML='<img src="assets/img/gladia-by-the-water-gallery-new-13.webp" width="800" height="533" alt="" loading="lazy" decoding="async">';
  originals.push(extra);
  var groups=[[0,1,2,3,10],[4,5,7,12,11],[6],[8],[9]], slides=[], collageCount=0;
  groups.forEach(function(group,slideIndex){
    var slide=document.createElement('div');
    var isSingle=group.length===1;
    if(!isSingle)collageCount++;
    slide.className='gallery-item gallery-slide gallery-slide-'+(slideIndex+1)+(isSingle?' gallery-single gallery-ratio-'+(group[0]+1):' gallery-collage gallery-collage-'+collageCount);
    group.forEach(function(index){
      var tile=originals[index];
      if(!tile)return;
      tile.hidden=false;
      tile.className='gallery-tile'+(tile===extra?' gallery-extra':'');
      tile.setAttribute('tabindex','0');
      tile.setAttribute('role','button');
      var caption=tile.querySelector('figcaption');
      if(caption)caption.remove();
      slide.appendChild(tile);
    });
    g.appendChild(slide);
    slides.push(slide);
  });
  var style=document.createElement('style');
  style.textContent=''
    +'.gallery-slide{display:grid;grid-template-columns:1fr;grid-template-rows:1fr;aspect-ratio:7/4;overflow:hidden;margin:0}'
    +'.gallery-collage{grid-template-columns:repeat(2,minmax(0,1fr)) 1.5fr;grid-template-rows:repeat(2,minmax(0,1fr));gap:4px}'
    +'.gallery-collage-2{grid-template-columns:repeat(2,minmax(0,1fr)) 1.634fr}'
    +'.gallery-collage .gallery-tile:nth-child(1){grid-column:1;grid-row:1}.gallery-collage .gallery-tile:nth-child(2){grid-column:2;grid-row:1}.gallery-collage .gallery-tile:nth-child(3){grid-column:1;grid-row:2}.gallery-collage .gallery-tile:nth-child(4){grid-column:2;grid-row:2}.gallery-collage .gallery-tile:last-child{grid-column:3;grid-row:1/span 2}'
    +'.gallery-collage-2{grid-template-columns:1.634fr repeat(2,minmax(0,1fr))}.gallery-collage-2 .gallery-tile:nth-child(1){grid-column:2;grid-row:1}.gallery-collage-2 .gallery-tile:nth-child(2){grid-column:3;grid-row:1}.gallery-collage-2 .gallery-tile:nth-child(3){grid-column:2;grid-row:2}.gallery-collage-2 .gallery-tile:nth-child(4){grid-column:3;grid-row:2}.gallery-collage-2 .gallery-tile:last-child{grid-column:1;grid-row:1/span 2}'
    +'.gallery-single .gallery-tile img{object-fit:cover}.gallery-ratio-7 img{object-position:center bottom}.gallery-ratio-9 img{object-position:center center}.gallery-ratio-10 img{object-position:center top}'
    +'.gallery-slide[hidden]{display:none}'
    +'.gallery-tile{display:flex;min-width:0;min-height:0;align-items:center;justify-content:center;overflow:hidden;margin:0;background:transparent}'
    +'.gallery-tile{cursor:zoom-in}.gallery-tile img{display:block;width:100%;height:100%;aspect-ratio:auto;object-fit:contain;background:transparent;transition:transform .35s ease}.gallery-tile:hover img,.gallery-tile:focus-visible img{transform:scale(1.04)}'
    +'.gallery-collage .gallery-tile img{object-fit:cover;object-position:center}'
    +'.gallery-collage .gallery-extra img{object-position:left center}'
    +'@media(max-width:760px){.gallery-controls output{min-width:58px}}';
  document.head.appendChild(style);
  var fs=slides,i=0;
  function show(n){i=(n+fs.length)%fs.length;fs.forEach(function(f,k){f.hidden=k!==i});g.querySelector('output').textContent=String(i+1).padStart(2,'0')+' / '+fs.length}
  g.querySelector('[data-next]').addEventListener('click',function(){show(i+1)});
  g.querySelector('[data-prev]').addEventListener('click',function(){show(i-1)});
  show(0);
});
document.querySelectorAll('[role="tablist"]').forEach(function(l){var ts=Array.from(l.querySelectorAll('[role="tab"]'));l.addEventListener('keydown',function(e){var i=ts.indexOf(document.activeElement);if(i<0)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();var t=ts[(i+(e.key==='ArrowRight'?1:-1)+ts.length)%ts.length];t.focus();t.click()}})});
document.querySelectorAll('.faq details').forEach(function(d){d.addEventListener('toggle',function(){if(d.open)document.querySelectorAll('.faq details').forEach(function(x){if(x!==d)x.open=false})})});

document.getElementById('lb').addEventListener('keydown',function(e){if(e.key==='Tab'){e.preventDefault();this.querySelector('button').focus()}});
