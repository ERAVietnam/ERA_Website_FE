/* Trellia Cove landing — JS thuần, không thư viện (khung ERA).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác. */
(function () {
  'use strict';

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '/api/submit-lead';

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
    tabs.forEach(function (t, i) {
      t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
      t.addEventListener('keydown', function (e) {
        var idx = i;
        if (e.key === 'ArrowRight') idx = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') idx = (i + tabs.length - 1) % tabs.length;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End') idx = tabs.length - 1;
        else return;
        e.preventDefault(); tabs[idx].click(); tabs[idx].focus();
      });
      t.addEventListener('click', function () {
        tabs.forEach(function (x) {
          var chon = x === t;
          x.setAttribute('aria-selected', String(chon)); x.tabIndex = chon ? 0 : -1;
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

  /* H1 — lớp tháp cùng kích thước ảnh nền, từ mẫu hero H1 đã duyệt. */
  (function () {
    var hero = $('#hero'), lop = $('.hero-khung .truoc');
    if (!hero || !lop) return;
    function hien() { lop.classList.add('da-nap'); hero.classList.add('co-lop'); }
    function nap() {
      lop.addEventListener('load',hien,{once:true});
      lop.addEventListener('error',function(){lop.style.display='none';hero.classList.add('co-lop');},{once:true});
      lop.srcset=lop.getAttribute('data-srcset');lop.src=lop.getAttribute('data-src');
      if(lop.complete && lop.naturalWidth) hien();
    }
    if(document.readyState==='complete') nap(); else addEventListener('load',nap,{once:true});
  })();

  /* Hiện nội dung theo nhịp cuộn; M3 dùng bộ tách từ của mẫu 04. */
  (function () {
    var motion = matchMedia('(prefers-reduced-motion:reduce)');
    var mobile = matchMedia('(max-width:760px)');
    var rv = $$('.rv'), texts = [], wordObserver, revealObserver;
    var hero = $('#hero'), imageFrame = $('.hero-hinh', hero || document);
    var frame = 0;
    function showWords(el) { el.setAttribute('data-thay', ''); }
    function splitWords(el) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var nodes = [], node;
      while ((node = walker.nextNode())) {
        if (node.parentElement.closest('.s,script,style,[aria-hidden="true"]')) continue;
        if (/\S/.test(node.nodeValue)) nodes.push(node);
      }
      var index = 0;
      nodes.forEach(function (textNode) {
        var fragment = document.createDocumentFragment();
        textNode.nodeValue.split(/(\s+)/).forEach(function (word) {
          if (!word) return;
          if (/^\s+$/.test(word)) fragment.appendChild(document.createTextNode(word));
          else {
            var span = document.createElement('span');
            span.className = 'tu'; span.textContent = word;
            span.style.setProperty('--tu-i', index++);
            fragment.appendChild(span);
          }
        });
        textNode.parentNode.replaceChild(fragment, textNode);
      });
      if (!index) return;
      el.style.setProperty('--gian-tu', Math.min(35,600 / Math.max(1,index-1)) + 'ms');
      el.setAttribute('data-tung-tu', '');
      el.classList.add('chu-san-sang');
      texts.push(el);
    }
    function revealPassed() {
      var threshold = innerHeight * .92;
      rv.forEach(function (el) {
        if (!el.classList.contains('in') && el.getClientRects().length && el.getBoundingClientRect().top < threshold) {
          el.classList.add('in');
          if (revealObserver) revealObserver.unobserve(el);
        }
      });
      texts.forEach(function (el) {
        if (!el.hasAttribute('data-thay') && el.getClientRects().length && el.getBoundingClientRect().top < threshold) {
          showWords(el); if (wordObserver) wordObserver.unobserve(el);
        }
      });
    }
    function update() {
      frame = 0;
      revealPassed();
      if (!hero || !imageFrame) return;
      if (motion.matches || mobile.matches) { hero.style.setProperty('--p', '0'); return; }
      var r = hero.getBoundingClientRect();
      var p = Math.min(1,Math.max(0,-r.top / Math.max(1,r.height)));
      hero.style.setProperty('--p',p.toFixed(3));
    }

    function schedule() { if (!frame) frame=requestAnimationFrame(update); }
    function refreshMotion() {
      if (motion.matches || mobile.matches) {
        texts.forEach(showWords);
        if (motion.matches) rv.forEach(function(el){el.classList.add('in');});
      }
      schedule();
    }
    if ('IntersectionObserver' in window && !motion.matches) {
      revealObserver = new IntersectionObserver(function(ms) {
        ms.forEach(function(m){if(m.isIntersecting){m.target.classList.add('in');revealObserver.unobserve(m.target);}});
      },{rootMargin:'0px 0px -8% 0px'});
      rv.forEach(function(el){revealObserver.observe(el);});
      // Trễ ngắn giữa các thẻ trong cùng một hàng; điện thoại không trễ.
      $$('.nhom-hien').forEach(function(group){
        var cards=$$('.rv',group), row=0, lastTop=-Infinity;
        cards.forEach(function(el){var top=el.offsetTop;if(Math.abs(top-lastTop)>12)row=0;el.style.setProperty('--tre-hien',(row++*90)+'ms');lastTop=top;});
      });
      revealPassed();
      document.documentElement.classList.add('rv-ready');
      if (!mobile.matches) {
        wordObserver = new IntersectionObserver(function(ms){ms.forEach(function(m){if(m.isIntersecting){showWords(m.target);wordObserver.unobserve(m.target);}});},{rootMargin:'0px 0px -8% 0px'});
        $$('.sec .head h2, #gioi-thieu h2').forEach(splitWords);
        texts.forEach(function(el){wordObserver.observe(el);});
      }
    } else rv.forEach(function(el){el.classList.add('in');});
    addEventListener('scroll',schedule,{passive:true});
    addEventListener('resize',refreshMotion);
    addEventListener('pageshow',schedule);
    if(motion.addEventListener)motion.addEventListener('change',refreshMotion);
    else if(motion.addListener)motion.addListener(refreshMotion);
    update();
  })();

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
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']
      .forEach(function (k) { if (p.get(k)) o[k] = p.get(k); });
    return o;
  }
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, nut = $('button[type=submit]', form);
      var ten = (f.name.value || '').trim(), sdt = chuanSDT(f.phone.value);
      if (!ten) { bao(form, 'Bạn vui lòng nhập họ tên.', 'loi'); f.name.focus(); return; }
      if (!sdt) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'loi'); f.phone.focus(); return; }

      var utm = layUTM();
      var du = {
        formId: 'TRELLIA_COVE_LEAD',
        hoten: ten,
        sdt: sdt,
        url: location.href.split('?')[0],
        utm_source: utm.utm_source || '', utm_medium: utm.utm_medium || '',
        utm_campaign: utm.utm_campaign || '', utm_term: utm.utm_term || '',
        utm_content: utm.utm_content || '', adclid: utm.gclid || '',
        adclida: '', mglnd: utm.fbclid || '', ip: '',
        userAgent: navigator.userAgent,
        sanpham: 'Loại căn-' + (f.product ? f.product.value : '') + '-Trellia Cove',
        email: '',
        message: 'Trellia Cove',
        sheet: 'MIZUKI PARK',
        timestamp: new Date().toISOString()
      };

      if (!LEAD_ENDPOINT) {
        console.warn('[Trellia Cove] Chưa cấu hình nơi nhận thông tin.');
        bao(form, 'Bạn vui lòng gọi 094.1125.000 để chuyên viên ERA tiếp nhận thông tin.', 'loi');
        return;
      }
      nut.disabled = true; nut.setAttribute('data-chu', nut.textContent); nut.textContent = 'ĐANG GỬI...';
      var body = JSON.stringify(du), sent = false;
      if (navigator.sendBeacon) sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' }));
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function (err) {
        console.error('[TC] Gửi lead lỗi:', err);
      });
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: form.getAttribute('data-source') || 'trellia-cove' }); } catch (x) {}
      window.top.location.href = '/thank-you-trellia-cove/';
    });
  });

  /* nút "Nhận chính sách căn ..." dưới layout căn hộ -> ghi sẵn loại căn vào form */
  var formDk = $('#dang-ky form');
  if (formDk) $$('[data-loai]').forEach(function (a) {
    a.addEventListener('click', function () {
      formDk.elements.product.value = a.getAttribute('data-loai');
      setTimeout(function () { formDk.elements.name.focus({ preventScroll: true }); }, 700);
    });
  });

  /* thanh Gọi / Zalo / Đăng ký trên điện thoại: hiện sau màn đầu, ẩn khi đang ở khối đăng ký */
  var bar = $('#bar'), dk = $('#dang-ky'), henBar = false;
  if (!bar || !dk) return;   // bản không form không có thanh Gọi/Zalo
  function capNhatBar() {
    henBar = false;
    var r = dk.getBoundingClientRect();
    bar.classList.toggle('show', scrollY > innerHeight * 0.6 && !(r.top < innerHeight && r.bottom > 0));
  }
  addEventListener('scroll', function () { if (!henBar) { henBar = true; requestAnimationFrame(capNhatBar); } }, { passive: true });
  capNhatBar();
})();
