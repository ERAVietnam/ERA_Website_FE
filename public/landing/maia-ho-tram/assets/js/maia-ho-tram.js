/* Maia Resort Ho Tram landing — JS thuần, không thư viện (khung Salacia Villas / SOHO).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác + 2 hiệu ứng:
   H3 vòng tròn bông hoa MAIA mở ảnh ở hero · M5 lưới thẻ căn hộ + villa trồi theo hàng, kẻ khung khi rê chuột. */
(function () {
  'use strict';

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '/api/submit-lead/';
  /* Bản có form sinh bằng _dungcu/tao-ban-co-form.py — sửa ở file này rồi chạy lại script. */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- menu điện thoại (khoá cuộn trên <html>: body đang overflow-x:clip) ---------- */
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

  /* ---------- tab (tiện ích · mặt bằng tầng · loại căn hộ) ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function chon(t, lay) {
      tabs.forEach(function (x) {
        var c = x === t;
        x.setAttribute('aria-selected', String(c));
        x.tabIndex = c ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) p.hidden = !c;
      });
      if (lay) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { chon(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (k) { e.preventDefault(); chon(tabs[(i + k + tabs.length) % tabs.length], true); }
      });
    });
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

  /* ---------- cuộn: đánh dấu mục menu + header thu gọn ---------- */
  var hen = false;
  function khiCuon() { danhDauMenu(); hdr.classList.toggle('nho', scrollY > 40); }
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; khiCuon(); }); } }, { passive: true });
  khiCuon();

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

  var giamChuyenDong = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- PHIM NỀN HERO (mặt biển 25 s, lặp, tắt tiếng) ----------
     Gắn src sau sự kiện load để ảnh khung đầu là LCP; điện thoại dùng bản 854 px. Giảm chuyển động / tiết kiệm dữ liệu: giữ ảnh tĩnh.
     Hero ra khỏi màn hình thì dừng phim cho đỡ tốn máy. */
  (function () {
    var hop = $('.hero-phim'), v = hop && $('video', hop);
    if (!v || giamChuyenDong || (navigator.connection && navigator.connection.saveData)) return;
    function nap() {
      v.src = matchMedia('(max-width: 960px)').matches ? v.dataset.phimDd : v.dataset.phimDt;
      v.addEventListener('playing', function () { hop.classList.add('chay'); }, { once: true });
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      if ('IntersectionObserver' in window) new IntersectionObserver(function (ms) {
        var m = ms[0]; if (m.isIntersecting) { var q = v.play(); if (q && q.catch) q.catch(function () {}); } else v.pause();
      }).observe(hop);
    }
    // Điện thoại: phim chỉ nạp khi khách chạm / lướt lần đầu — phim tự chạy ngay khi tải sẽ bị tính là LCP (đo 16/10: 3,6 s)
    function batDau() {
      if (!matchMedia('(max-width: 960px)').matches) return setTimeout(nap, 200);
      var da = false, ev = ['scroll', 'touchstart', 'pointerdown', 'keydown'];
      function mot() { if (da) return; da = true; ev.forEach(function (e) { removeEventListener(e, mot); }); nap(); }
      ev.forEach(function (e) { addEventListener(e, mot, { passive: true }); });
    }
    if (document.readyState === 'complete') batDau(); else addEventListener('load', batDau);
  })();

  /* ---------- HIỆU ỨNG H3 · hero "vòng tròn biểu tượng mở ảnh" ----------
     Theo mẫu projects/template/hieu-ung/01-vet-loang-mo-anh (vết loang nở ra phủ kín màn khi ghim), đổi giọt nước thành
     vòng tròn ôm bông hoa logo MAIA; ghim bằng position:sticky + biến CSS --q như mẫu 04 (không GSAP). Mọi chuyển động viết trong CSS.
     Chỉ chạy ở máy tính ≥ 961 px và khi không bật "giảm chuyển động"; còn lại hero đứng yên, ảnh + chữ đủ từ đầu. */
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

  /* ---------- HIỆU ỨNG M5 · lưới thẻ căn hộ + villa trồi theo HÀNG ----------
     Theo mẫu 03 (island-blue initRiseGrid): gom thẻ cùng hàng (lệch ≤ 12 px), mỗi hàng trồi lên khi cuộn tới, trong hàng trái → phải
     (lệch 0,1 s). Thẻ kẻ khung khi rê chuột / đang chọn viết bằng CSS. Giảm chuyển động / trình duyệt cũ: hiện sẵn. */
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
      if (!ten) { bao(form, 'Anh/chị cho em xin họ tên với ạ.', 'loi'); f.name.focus(); return; }
      if (!sdt) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'loi'); f.phone.focus(); return; }

      var pageUrl = location.href;
      try { pageUrl = window.top.location.href; } catch (x) {}
      var du = {
        timestamp: new Date().toISOString(),
        hoten: ten,
        sdt: sdt,
        url: pageUrl.split('?')[0],
        ip: '',
        formId: 'MAIA_LEAD',
        userAgent: navigator.userAgent || '',
        sanpham: f.unit ? f.unit.value : '',
        email: '',
        message: '',
        sheet: 'MAIA',
        source: form.getAttribute('data-source') || 'form-dang-ky-bang-gia',
        referrer: document.referrer || '(truc tiep)',
        device: innerWidth <= 860 ? 'mobile' : 'desktop',
        thoi_gian: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      };
      var utm = layUTM(); for (var k in utm) du[k] = utm[k];

      if (!LEAD_ENDPOINT) {
        console.warn('[LH] Chưa khai LEAD_ENDPOINT — lead KHÔNG được gửi:', du);
        bao(form, 'Trang đang ở bản xem thử, chưa nối nơi nhận thông tin. Anh/chị gọi hotline 094.1125.000 giúp em ạ.', 'loi');
        return;
      }
      nut.disabled = true;
      var body = JSON.stringify(du), sent = false;
      try { sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function (err) { console.error('[MAIA] Gửi lead lỗi:', err); });
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
      try { window.top.location.href = '/thank-you-maia-ho-tram/'; } catch (x) { location.href = '/thank-you-maia-ho-tram/'; }
    });
  });

  /* nút có data-loai -> ghi sẵn nhu cầu vào form (hiện chưa dùng) */
  var formDk = $('#dang-ky form');
  $$('[data-loai]').forEach(function (a) {
    a.addEventListener('click', function () {
      formDk.elements.product.value = a.getAttribute('data-loai');
      setTimeout(function () { formDk.elements.name.focus({ preventScroll: true }); }, 700);
    });
  });

  /* thanh Gọi / Zalo / Đăng ký trên điện thoại: hiện sau màn đầu, ẩn khi đang ở khối đăng ký */
  var bar = $('#bar'), dk = $('#dang-ky'), henBar = false;
  function capNhatBar() {
    henBar = false;
    var r = dk.getBoundingClientRect();
    bar.classList.toggle('show', scrollY > innerHeight * 0.6 && !(r.top < innerHeight && r.bottom > 0));
  }
  addEventListener('scroll', function () { if (!henBar) { henBar = true; requestAnimationFrame(capNhatBar); } }, { passive: true });
  capNhatBar();
})();
