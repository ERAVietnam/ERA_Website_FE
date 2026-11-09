/* Izumi City landing — JS thuần, không thư viện (khung Gladia Heights / The Legend Đà Nẵng).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* 1 NGUỒN CHO 2 BẢN: phần form/thanh liên hệ chỉ chạy khi trang có form (bản có form).
     🔴 LEAD_ENDPOINT: nơi nhận lead (vd Google Apps Script .../exec) — IT điền. Để trống = form báo khách gọi hotline,
     KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '';

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
      t.addEventListener('keydown', function(e) { var delta=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0; if(delta){e.preventDefault();var next=tabs[(tabs.indexOf(t)+delta+tabs.length)%tabs.length];next.click();next.focus();} });
      t.addEventListener('click', function () {
        tabs.forEach(function (x) {
          var chon = x === t;
          x.setAttribute('aria-selected', String(chon)); x.tabIndex = chon ? 0 : -1;
          var p = document.getElementById(x.getAttribute('aria-controls'));
          if (p) { p.hidden = !chon; if (chon) { p.querySelectorAll('[data-troi], .rv').forEach(function(el) { el.classList.add('in'); }); } }
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
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; danhDauMenu(); }); } }, { passive: true });
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
  var giamChuyenDong = matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  /* ---------- HIỆU ỨNG H3 · hero "logo Izumi City phóng lớn mở ảnh" ----------
     Theo mẫu projects/template/hieu-ung/01-vet-loang-mo-anh (vết loang nở ra phủ kín màn khi ghim), đổi giọt nước thành
     mặt nạ logo gốc Izumi City; ghim bằng position:sticky + biến CSS --q như mẫu 04 (không GSAP). Mọi chuyển động viết trong CSS.
     Chỉ chạy ở máy tính ≥ 961 px và khi không bật "giảm chuyển động"; còn lại hero đứng yên, ảnh + chữ đủ từ đầu. */
  (function () {
    var hero = $('#hero');
    if (!hero || !window.matchMedia) return;
    var giam = matchMedia('(prefers-reduced-motion: reduce)');
    var hopAnh = $('.hero-khung', hero), chuHero = $('.hero-chu', hero);
    if (!CSS.supports('mask-image', 'url("assets/img/izumi-city-logo-mo-anh.webp")') && !CSS.supports('-webkit-mask-image', 'url("assets/img/izumi-city-logo-mo-anh.webp")')) return;
    var mq = matchMedia('(min-width: 961px)');
    var DO_TRE = 0.16;          // trễ mềm: 1 = bám tức thì, nhỏ = trôi chậm theo cuộn
    var dich = 0, hienTai = 0, dangChay = false;
    function tinh() {
      var dai = hero.offsetHeight - $('.hero-san', hero).offsetHeight;
      var top = hero.getBoundingClientRect().top - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 0);
      if (!mq.matches) dai = Math.max(1, hopAnh.offsetHeight * .85);
      dich = dai > 0 ? Math.min(1, Math.max(0, -top / dai)) : 0;
    }
    function datTienDo(q) {
      hero.style.setProperty('--q', q.toFixed(4));
      chuHero.inert = mq.matches && !giam.matches && q >= .46;
    }
    function khung() {
      hienTai += (dich - hienTai) * DO_TRE;
      if (Math.abs(dich - hienTai) < 0.001) hienTai = dich;
      datTienDo(hienTai);
      if (hienTai !== dich) requestAnimationFrame(khung); else dangChay = false;
    }
    function chay() { if (giam.matches) return; tinh(); if (!mq.matches) { hienTai = dich; datTienDo(dich); return; } if (!dangChay) { dangChay = true; requestAnimationFrame(khung); } }
    function batTat() {
      var bat = mq.matches && !giam.matches;
      hero.classList.toggle('ghim', bat);
      hero.classList.toggle('logo-leger', !mq.matches && !giam.matches);
      if (giam.matches) { dich = hienTai = 0; datTienDo(0); return; }
      tinh(); hienTai = dich; datTienDo(dich);
    }
    if (giam.addEventListener) giam.addEventListener('change', batTat);
    else if (giam.addListener) giam.addListener(batTat);
    batTat();
    addEventListener('scroll', function () { chay(); }, { passive: true });
    addEventListener('resize', function () { batTat(); });
  })();




  (function () {
    var the = $$('[data-luoi] [data-troi]');
    if (!the.length) return;
    if (giamChuyenDong || !('IntersectionObserver' in window)) { the.forEach(function (t) { t.classList.add('in'); }); return; }
    var hang = [];
    the.map(function (t) { var r = t.getBoundingClientRect(); return { t: t, top: r.top + scrollY, left: r.left }; })
      .sort(function (a, b) { return a.top - b.top || a.left - b.left; })
      .forEach(function (x) { var h = hang[hang.length - 1]; (h && Math.abs(x.top - h[0].top) <= 12) ? h.push(x) : hang.push([x]); });
    var io = new IntersectionObserver(function (ms) {
      ms.forEach(function (m) {
        if (!m.isIntersecting) return;
        io.unobserve(m.target);
        m.target._hang.forEach(function (x, i) {
          x.t.style.transitionDelay = (i * 0.1) + 's';
          x.t.classList.add('in');
          setTimeout(function () { x.t.style.transitionDelay = ''; }, 1200);   // bỏ trễ để rê chuột / chọn thẻ đổi màu ngay
        });
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    hang.forEach(function (h) { h[0].t._hang = h; io.observe(h[0].t); });
  })();


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

      var du = {
        du_an: 'Izumi City',
        name: ten, phone: sdt,
        product: f.product ? f.product.value : '',
        source: form.getAttribute('data-source') || 'khong-ro',
        page: location.href.split('?')[0],
        referrer: document.referrer || '(truc tiep)',
        device: innerWidth <= 860 ? 'mobile' : 'desktop',
        thoi_gian: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      if (!LEAD_ENDPOINT) {
        
        bao(form, 'Anh/chị vui lòng gọi 094.1125.000 để được hỗ trợ trực tiếp. Đăng ký này chưa được gửi.', 'loi');
        return;
      }
      nut.disabled = true; nut.setAttribute('data-chu', nut.textContent); nut.textContent = 'ĐANG GỬI...';
      // text/plain để tránh preflight CORS (Google Apps Script không trả lời OPTIONS)
      fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(du) })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          bao(form, 'Đã nhận đăng ký của anh/chị. Chuyên viên ERA sẽ gọi lại gửi thông tin dự án trong ngày ạ.', 'ok');
          nut.textContent = 'ĐÃ GỬI ✓';
          try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
          try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
          form.reset();
        })
        .catch(function (err) {
          console.error('[IZUMI] Gửi lead lỗi:', err);
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

(function(){
  var lb=document.getElementById('lb');
  document.addEventListener('keydown',function(e){
    if(e.key==='Tab'&&lb&&lb.classList.contains('open')){e.preventDefault();lb.querySelector('button').focus();}
  });
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.rv,[data-troi]').forEach(function(el){el.classList.add('in');});
  }
})();

/* Gardenia: desktop scroll-snap; mobile từng ảnh, không cần vuốt ngang. */
(function () {
  'use strict';
  document.querySelectorAll('[data-gardenia-slider]').forEach(function (root) {
    var rail = root.querySelector('.gd-amenity-track');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.gd-amenity-slide'));
    var picks = Array.prototype.slice.call(root.querySelectorAll('[data-gd-pick]'));
    var thumbs = root.querySelector('.gd-gallery-thumbs');
    var prev = root.querySelector('[data-gd-prev]'), next = root.querySelector('[data-gd-next]');
    var toggle = root.querySelector('[data-gd-toggle]');
    var count = root.querySelector('[data-gd-count]'), controls = root.querySelector('.gd-amenity-controls');
    if (!rail || !slides.length || !prev || !next || !toggle || !controls) return;
    controls.hidden = false;
    var motion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
    var compact = window.matchMedia ? window.matchMedia('(max-width:760px)') : { matches: false };
    var index = 0, scheduled = false, timer = null, paused = false;
    var visible = false, hovering = false, focused = false, touching = false;
    function lightboxOpen() { var lb = document.getElementById('lb'); return lb && lb.classList.contains('open'); }
    function allowed() { return slides.length > 1 && visible && !document.hidden && !motion.matches && !paused && !hovering && !focused && !touching && !lightboxOpen(); }
    function stop() { if (timer !== null) { clearTimeout(timer); timer = null; } }
    function queue() {
      stop();
      toggle.hidden = motion.matches;
      toggle.textContent = paused ? 'Phát ảnh' : 'Tạm dừng';
      toggle.setAttribute('aria-label', paused ? 'Bật tự động chuyển ảnh' : 'Tạm dừng tự động chuyển ảnh');
      if (count && count.parentElement) count.parentElement.setAttribute('aria-live', allowed() ? 'off' : 'polite');
      if (!allowed()) return;
      timer = setTimeout(function () {
        timer = null;
        if (!allowed()) return;
        var target = (index + 1) % slides.length;
        go(target, false, target === 0);
        queue();
      }, 4500);
    }
    function sync() {
      scheduled = false;
      if (!compact.matches) index = Math.max(0, Math.min(slides.length - 1, Math.round(rail.scrollLeft / Math.max(1, rail.clientWidth))));
      slides.forEach(function (slide, i) { slide.hidden = compact.matches && i !== index; });
      picks.forEach(function (pick, i) { if (i === index) pick.setAttribute('aria-current', 'true'); else pick.removeAttribute('aria-current'); });
      prev.disabled = next.disabled = slides.length <= 1;
      if (count) count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      if (!compact.matches && thumbs && thumbs.scrollTo && picks[index]) {
        var pick = picks[index];
        var left = Math.max(0, Math.min(thumbs.scrollWidth - thumbs.clientWidth, pick.offsetLeft - (thumbs.clientWidth - pick.offsetWidth) / 2));
        thumbs.scrollTo({ left: left, behavior: motion.matches ? 'auto' : 'smooth' });
      }
    }
    function go(n, manual, instant) {
      var target = Math.max(0, Math.min(slides.length - 1, n));
      if (compact.matches) { index = target; sync(); }
      else rail.scrollTo({ left: target * rail.clientWidth, behavior: motion.matches || instant ? 'auto' : 'smooth' });
      if (manual) queue();
    }
    picks.forEach(function (pick, i) { pick.addEventListener('click', function (e) { e.preventDefault(); go(i, true); }); });
    prev.addEventListener('click', function () { go((index + slides.length - 1) % slides.length, true, index === 0); });
    next.addEventListener('click', function () { go((index + 1) % slides.length, true, index === slides.length - 1); });
    toggle.addEventListener('click', function () { paused = !paused; queue(); });
    rail.addEventListener('keydown', function (e) {
      if (e.target !== rail) return;
      var n = e.key === 'ArrowRight' ? (index + 1) % slides.length : e.key === 'ArrowLeft' ? (index + slides.length - 1) % slides.length : e.key === 'Home' ? 0 : e.key === 'End' ? slides.length - 1 : null;
      if (n !== null) { e.preventDefault(); go(n, true, Math.abs(n - index) === slides.length - 1); }
    });
    rail.addEventListener('scroll', function () { if (!scheduled) { scheduled = true; requestAnimationFrame(sync); } }, { passive: true });
    root.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hovering = true; queue(); } });
    root.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hovering = false; queue(); } });
    root.addEventListener('pointerdown', function () { touching = true; queue(); }, { passive: true });
    function release() { if (touching) { touching = false; queue(); } }
    document.addEventListener('pointerup', release, { passive: true });
    document.addEventListener('pointercancel', release, { passive: true });
    root.addEventListener('focusin', function (e) { focused = e.target !== toggle; queue(); });
    root.addEventListener('focusout', function (e) { focused = !!(e.relatedTarget && root.contains(e.relatedTarget) && e.relatedTarget !== toggle); queue(); });
    document.addEventListener('visibilitychange', queue);
    window.addEventListener('pagehide', stop);
    window.addEventListener('pageshow', queue);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { visible = entry.isIntersecting && entry.intersectionRatio >= .2; queue(); });
      }, { threshold: [0, .2, .5] }).observe(rail);
    } else {
      function visibility() { var r = rail.getBoundingClientRect(); visible = r.bottom > 0 && r.top < window.innerHeight; queue(); }
      window.addEventListener('scroll', visibility, { passive: true });
      window.addEventListener('resize', visibility);
      visibility();
    }
    function resize() {
      slides.forEach(function (slide, i) { slide.hidden = compact.matches && i !== index; });
      rail.scrollTo({ left: compact.matches ? 0 : index * rail.clientWidth, behavior: 'auto' });
      sync();
    }
    if (compact.addEventListener) compact.addEventListener('change', resize);
    else if (compact.addListener) compact.addListener(resize);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(rail);
    else window.addEventListener('resize', resize);
    if (motion.addEventListener) motion.addEventListener('change', queue);
    else if (motion.addListener) motion.addListener(queue);
    sync(); queue();
  });
})();
