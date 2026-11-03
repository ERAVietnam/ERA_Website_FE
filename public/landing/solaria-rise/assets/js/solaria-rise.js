
(function () {
  'use strict';

  
  var LEAD_ENDPOINT = '/api/submit-lead/';

  var giamChuyenDong = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  
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

  
  var navLinks = $$('#nav a[href^="#"]');
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
          var chon = x === t;
          x.setAttribute('aria-selected', String(chon));
          var p = document.getElementById(x.getAttribute('aria-controls'));
          if (p) p.hidden = !chon;
        });
      });
    });
  });

  
  var acc = $('#acc');
  if (acc) {
    var o = $$('figure', acc);
    var mo = function (f) { o.forEach(function (x) { x.classList.toggle('on', x === f); }); };
    o.forEach(function (f) {
      f.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) mo(f); });
      f.addEventListener('click', function () { mo(f); });
    });
  }

  
  var lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), nguoiMoLb = null;
  function moLb(src, alt, nguon) {
    nguoiMoLb = nguon || null;
    lbImg.src = src; lbImg.alt = alt || ''; lbCap.textContent = alt || '';
    lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.documentElement.style.overflow = 'hidden';
    $('button', lb).focus();
  }
  function dongLb() {
    lb.classList.remove('open','zoomed'); lb.setAttribute('aria-hidden','true'); document.documentElement.style.overflow = '';
    lbImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    if (nguoiMoLb) nguoiMoLb.focus();
  }
  $$('[data-zoom]').forEach(function (el) {
    if (el.tagName !== 'BUTTON') { el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button'); }
    var mo = function () { var i = $('img', el); moLb(el.getAttribute('data-zoom'), el.getAttribute('data-alt') || (i ? i.alt : ''), el); };
    el.addEventListener('click', mo);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mo(); } });
  });
  lb.addEventListener('click', function (e) { if (e.target === lbImg) lb.classList.toggle('zoomed'); else if (e.target === lb || e.target.matches('[data-close]')) dongLb(); });
  lb.addEventListener('keydown',function(e){if(e.key==='Tab'){e.preventDefault();$('[data-close]',lb).focus();}});
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (lb.classList.contains('open')) dongLb();
    else if (hdr.classList.contains('open')) dongMenu();
  });

  
  var hen = false;
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; danhDauMenu(); }); } }, { passive: true });
  danhDauMenu();

  
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

  
  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ms) {
      ms.forEach(function (m) { if (m.isIntersecting) { m.target.classList.add('in'); io.unobserve(m.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }
  
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
      var product = f.product ? f.product.value : '';
      var du = {
        timestamp: new Date().toISOString(), hoten: ten, sdt: sdt,
        url: pageUrl.split('?')[0], ip: '', formId: 'SOLARIA_RISE_LEAD',
        userAgent: navigator.userAgent || '', sanpham: product || 'SOLARIA RISE',
        email: '', message: '', sheet: 'SOLARIA RISE', du_an: 'SOLARIA RISE',
        product: product,
        source: form.getAttribute('data-source') || 'dang-ky-solaria-rise',
        referrer: document.referrer || '(truc tiep)', device: innerWidth <= 860 ? 'mobile' : 'desktop',
        thoi_gian: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      nut.disabled = true; nut.setAttribute('data-chu', nut.textContent); nut.textContent = 'ĐANG GỬI...';
      var body = JSON.stringify(du), sent = false;
      try { sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function (err) { console.error('[SOLARIA] Gửi lead lỗi:', err); });
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
      try { window.top.location.href = '/thank-you-solaria-rise/'; } catch (x) { location.href = '/thank-you-solaria-rise/'; }
    });
  });

  
  var formDk = $('#dang-ky form');
  if (formDk) $$('[data-loai]').forEach(function (a) {
    a.addEventListener('click', function () {
      formDk.elements.product.value = a.getAttribute('data-loai');
      setTimeout(function () { formDk.elements.name.focus({ preventScroll: true }); }, 700);
    });
  });

  
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
  (function () {
    var hero = $('#hero');
    if (!hero || giamChuyenDong || !window.matchMedia) return;
    var mq = matchMedia('(min-width: 961px)');
    var DO_TRE = 0.16;          // trễ mềm: 1 = bám tức thì, nhỏ = trôi chậm theo cuộn
    var dich = 0, hienTai = 0, dangChay = false;
    function tinh() {
      var dai = hero.offsetHeight - $('.hero-san', hero).offsetHeight;
      var top = hero.getBoundingClientRect().top - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 0);
      dich = dai > 0 ? Math.min(1, Math.max(0, -top / dai)) : 0;
    }
    function khung() {
      hienTai += (dich - hienTai) * DO_TRE;
      if (Math.abs(dich - hienTai) < 0.001) hienTai = dich;
      hero.style.setProperty('--q', hienTai.toFixed(4));
      if (hienTai !== dich) requestAnimationFrame(khung); else dangChay = false;
    }
    function chay() { tinh(); if (!dangChay) { dangChay = true; requestAnimationFrame(khung); } }
    function batTat() {
      var bat = mq.matches;
      hero.classList.toggle('ghim', bat);
      if (!bat) { hero.style.setProperty('--q', 0); dich = hienTai = 0; return; }
      tinh(); hienTai = dich; hero.style.setProperty('--q', dich.toFixed(4));
    }
    batTat();
    addEventListener('scroll', function () { if (mq.matches) chay(); }, { passive: true });
    addEventListener('resize', function () { batTat(); });
  })();


})();

// Six photographs remain in one amenity slider; no autoplay.
(function(){
const data=[["san-vuon-tu-tren-cao", "Khoảng xanh kết nối", "Sân vườn đan xen đường dạo, kết nối các không gian sinh hoạt chung của cư dân."], ["khong-gian-cong-dong", "Gặp gỡ giữa thiên nhiên", "Không gian cộng đồng mở ra những cuộc gặp gỡ và phút thư giãn bên gia đình."], ["bai-co-su-kien", "Bãi cỏ cho những cuộc hẹn", "Một khoảng mở để cùng trò chuyện, nghỉ ngơi và tận hưởng nhịp sống ngoài trời."], ["vuon-yoga", "Thư thái giữa sắc xanh", "Khu vườn yoga trong cảnh quan nội khu, thêm không gian vận động mỗi ngày."], ["rap-phim-ngoai-troi", "Buổi tối bên nhau", "Phối cảnh không gian trình chiếu ngoài trời, gắn kết cộng đồng khi thành phố lên đèn."], ["san-choi-tre-em", "Thế giới nhỏ của trẻ thơ", "Khu vui chơi trẻ em trong khuôn viên dự án, bên những khoảng xanh dành cho gia đình."]]; let index=0;
function show(n){index=(n+data.length)%data.length;document.querySelectorAll('[data-slide]').forEach((el,i)=>{el.hidden=i!==index;el.classList.toggle('active',i===index)});document.querySelector('#slide-title').textContent=data[index][1];document.querySelector('#slide-desc').textContent=data[index][2];document.querySelector('#slide-count').textContent=String(index+1).padStart(2,'0')+' / 06';document.querySelectorAll('[data-slide-to]').forEach((el,i)=>el.setAttribute('aria-pressed',String(i===index)));}
document.querySelector('#slide-prev').addEventListener('click',()=>show(index-1));document.querySelector('#slide-next').addEventListener('click',()=>show(index+1));document.querySelectorAll('[data-slide-to]').forEach(el=>el.addEventListener('click',()=>show(Number(el.dataset.slideTo))));
document.querySelectorAll('[role=tablist]').forEach(list=>{const tabs=[...list.querySelectorAll('[role=tab]')];tabs.forEach((t,i)=>{t.tabIndex=t.getAttribute('aria-selected')==='true'?0:-1;t.addEventListener('click',()=>{tabs.forEach(x=>x.tabIndex=x===t?0:-1);document.querySelectorAll('.rv:not(.in)').forEach(x=>{if(x.getBoundingClientRect().top<innerHeight)x.classList.add('in')});if(window.ScrollTrigger)ScrollTrigger.refresh();if(t.classList.contains('product-card'))document.getElementById(t.getAttribute('aria-controls')).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});});t.addEventListener('keydown',e=>{let n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:e.key==='Home'?0:e.key==='End'?tabs.length-1:null;if(n!==null){e.preventDefault();const next=tabs[(n+tabs.length)%tabs.length];next.click();next.focus();}});});});
document.querySelectorAll('.faq details').forEach(el=>el.addEventListener('toggle',()=>{if(el.open)document.querySelectorAll('.faq details').forEach(x=>{if(x!==el)x.open=false;});}));
})();
// M5: the row grouping and timing are copied from the approved effect 03.
(function(){
if(matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap || !window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);
if(matchMedia('(max-width:767px)').matches)return;
(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>{
document.querySelectorAll('[data-hien="luoi"]').forEach(luoi=>{
const o=[...luoi.querySelectorAll('[data-hien="troi"]')].map(el=>{const r=el.getBoundingClientRect();return {el,top:r.top+scrollY,left:r.left};}).sort((a,b)=>a.top-b.top||a.left-b.left);
const hang=[];o.forEach(x=>{const h=hang[hang.length-1];(h&&Math.abs(x.top-h[0].top)<=12)?h.push(x):hang.push([x]);});
hang.forEach(h=>gsap.fromTo(h.map(x=>x.el),{y:24,autoAlpha:0},{y:0,autoAlpha:1,ease:'power2.out',duration:.7,stagger:.1,clearProps:'transform',scrollTrigger:{trigger:h[0].el,start:'top 85%',toggleActions:'play none none none'}}));
});ScrollTrigger.refresh();});
})();
