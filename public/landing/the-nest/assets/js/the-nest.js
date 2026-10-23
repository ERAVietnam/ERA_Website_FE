/* The NEST Midori Park landing — JS thuần, không thư viện (khung The Rivus: H3 + M3; lưới an toàn hiện dần theo Masteri Cosmo Central).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác + 2 hiệu ứng:
   H3 ô vòm logo mở ảnh ở hero (chỉ máy tính) · M3 chữ quét đậm câu "Hành trình gieo mầm" ở khối Giá trị sống. */
(function () {
  'use strict';

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '/api/submit-lead';
  /* Bản có form sinh bằng _dungcu/tao-ban-co-form.py — sửa ở file này rồi chạy lại script. */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var hieuUng = document.documentElement.classList.contains('vl');   // có JS + không "giảm chuyển động"

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

  /* ---------- tab (bản đồ vị trí · tiện ích) ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function chon(t, lay) {
      tabs.forEach(function (x) {
        var c = x === t;
        x.setAttribute('aria-selected', String(c));
        x.tabIndex = c ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) { p.hidden = !c; if (c) p.classList.add('in'); }
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

  /* ---------- "Xem thêm": đoạn dài chỉ hiện vài dòng đầu ----------
     Chữ vẫn nằm đủ trong HTML (Google, AI đọc được hết); không có JS thì hiện đủ. data-gon = số dòng giữ lại. */
  var MUI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  $$('[data-gon]').forEach(function (el, i) {
    var mau = el.tagName === 'P' ? el : ($('p', el) || el);
    var cs = getComputedStyle(mau);
    var lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.7;
    var gioiHan = Math.round(lh * (parseFloat(el.getAttribute('data-gon')) || 4));
    if (el.scrollHeight <= gioiHan + lh * 2) return;
    if (!el.id) el.id = 'gon-' + (i + 1);
    el.style.setProperty('--gon', gioiHan + 'px');
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

  /* content-visibility (CSS) chỉ dùng lúc mở trang: tải xong thì gỡ để mọi khối có chiều cao thật — menu, nút neo cuộn đúng chỗ */
  function cvXong() { setTimeout(function () { document.documentElement.classList.add('cv-xong'); }, 300); }
  if (document.readyState === 'complete') cvXong(); else addEventListener('load', cvXong);
  $$('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function () { document.documentElement.classList.add('cv-xong'); }); });

  /* ---------- cuộn: đánh dấu mục menu + header thu gọn ---------- */
  var hen = false;
  function khiCuon() { danhDauMenu(); hdr.classList.toggle('nho', scrollY > 40); }
  addEventListener('scroll', function () { if (!hen) { hen = true; requestAnimationFrame(function () { hen = false; khiCuon(); }); } }, { passive: true });
  khiCuon();

  /* ---------- HIỆU ỨNG H3 · hero "ô vòm logo mở ảnh" ----------
     Theo mẫu projects/template/hieu-ung/01-vet-loang-mo-anh (vết loang nở ra phủ kín màn khi ghim), đổi giọt nước thành ô vòm của
     dấu chữ "n" logo The NEST; ghim bằng position:sticky + biến CSS --q như mẫu 04 (không GSAP). Mọi chuyển động viết trong CSS.
     Chỉ chạy ở máy tính ≥ 961 px và khi không bật "giảm chuyển động"; còn lại hero đứng yên, ảnh + chữ đủ từ đầu.
     Trang chỉ ghim 1 khối = hero. */
  (function () {
    var hero = $('#hero');
    if (!hero || !hieuUng || !window.matchMedia) return;
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

  /* ---------- HIỆU ỨNG M3 · chữ quét đậm ----------
     Theo mẫu 03 (island-blue initWipe): mỗi dòng mờ 28 % → phần đậm quét trái → phải bằng mask-position khi cuộn tới;
     thời lượng theo độ rộng dòng (700 px/giây, kẹp 0,5–1,8 s), dòng sau bắt đầu khi dòng trước quét được ~60 %.
     CSS chỉ phủ mặt nạ khi có lớp .cho (JS gắn) → không JS / giảm chuyển động: chữ đậm đủ. */
  (function () {
    var quet = $('#quet');
    if (!quet || !hieuUng || !('IntersectionObserver' in window)) return;
    var tre = 0;
    $$('span', quet).forEach(function (s) {
      var tg = Math.min(1.8, Math.max(0.5, s.getBoundingClientRect().width / 700));
      s.style.setProperty('--tg', tg.toFixed(2) + 's');
      s.style.setProperty('--tre', tre.toFixed(2) + 's');
      tre += tg * 0.6;
    });
    quet.classList.add('cho');
    var io = new IntersectionObserver(function (ms) {
      ms.forEach(function (m) { if (m.isIntersecting) { quet.classList.add('in'); io.disconnect(); } });
    }, { rootMargin: '0px 0px -22% 0px' });
    io.observe(quet);
  })();

  /* ---------- hiện dần khi cuộn tới ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ms) {
      ms.forEach(function (m) { if (m.isIntersecting) { m.target.classList.add('in'); io.unobserve(m.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
    // lưới an toàn: cuộn nhanh (kéo thanh cuộn, bấm menu) có lúc IntersectionObserver bỏ sót → khối đã vào màn hoặc đã qua thì hiện luôn
    var henRv = false;
    addEventListener('scroll', function () {
      if (henRv) return; henRv = true;
      setTimeout(function () {
        henRv = false;
        rv.forEach(function (el) { if (!el.classList.contains('in') && el.getBoundingClientRect().top < innerHeight) { el.classList.add('in'); io.unobserve(el); } });
      }, 250);
    }, { passive: true });
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
  /* Shared ERA lead contract. Capture the submit before the original static handler. */
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.matches || !form.matches('form[data-lead]')) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var f = form.elements, nut = $('button[type=submit]', form);
    var ten = (f.name.value || '').trim(), sdt = chuanSDT(f.phone.value);
    if (!ten) { bao(form, 'Vui lòng nhập họ tên.', 'loi'); f.name.focus(); return; }
    if (!sdt) { bao(form, 'Số điện thoại chưa đúng.', 'loi'); f.phone.focus(); return; }
    var search = location.search;
    try { if (window.top !== window) search += '&' + window.top.location.search.replace(/^\?/, ''); } catch (x) {}
    var params = new URLSearchParams(search), utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'adclid', 'adclida', 'mglnd', 'gclid', 'fbclid', 'mgclid'].forEach(function (k) {
      if (params.get(k)) utm[k === 'mgclid' ? 'mglnd' : (k === 'gclid' ? 'adclid' : (k === 'fbclid' ? 'adclida' : k))] = params.get(k);
    });
    var topUrl = location.href;
    try { topUrl = window.top.location.href; } catch (x) {}
    var unit = f.unit ? f.unit.value : '';
    var payload = {
      formId: 'THENEST_FORM', hoten: ten, sdt: sdt, email: '', message: '',
      utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
      adclid: '', adclida: '', mglnd: '',
      sanpham: unit ? 'The NEST - ' + unit : 'The NEST - Midori Park', sheet: 'THENEST',
      url: topUrl, ip: '', userAgent: navigator.userAgent || '', timestamp: new Date().toISOString()
    };
    Object.keys(utm).forEach(function (k) { payload[k] = utm[k]; });
    nut.disabled = true;
    nut.setAttribute('data-chu', nut.textContent);
    nut.textContent = 'Đang gửi...';
    var body = JSON.stringify(payload), sent = false;
    try { if (navigator.sendBeacon) sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
    var done = function () { try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {} window.top.location.href = '/thank-you-the-nest/'; };
    if (sent) { done(); return; }
    fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); done(); })
      .catch(function (err) { console.error('[THE-NEST] Lead error:', err); nut.disabled = false; nut.textContent = nut.getAttribute('data-chu'); bao(form, 'Gửi chưa được. Vui lòng thử lại.', 'loi'); });
  }, true);
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, nut = $('button[type=submit]', form);
      var ten = (f.name.value || '').trim(), sdt = chuanSDT(f.phone.value);
      if (!ten) { bao(form, 'Anh/chị cho em xin họ tên với ạ.', 'loi'); f.name.focus(); return; }
      if (!sdt) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'loi'); f.phone.focus(); return; }

      var du = {
        du_an: 'The NEST – Midori Park',
        name: ten, phone: sdt,
        product: f.product ? f.product.value : '',
        unit: f.unit ? f.unit.value : '',
        source: form.getAttribute('data-source') || 'khong-ro',
        page: location.href.split('?')[0],
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
      nut.disabled = true; nut.setAttribute('data-chu', nut.textContent); nut.textContent = 'Đang gửi...';
      // text/plain để tránh preflight CORS (Google Apps Script không trả lời OPTIONS)
      fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(du) })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          bao(form, 'Đã nhận đăng ký của anh/chị. Chuyên viên ERA sẽ gọi lại gửi thông tin dự án trong ngày ạ.', 'ok');
          nut.textContent = 'Đã gửi ✓';
          try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
          try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
          form.reset();
        })
        .catch(function (err) {
          console.error('[LH] Gửi lead lỗi:', err);
          nut.disabled = false; nut.textContent = nut.getAttribute('data-chu');
          bao(form, 'Gửi chưa được. Anh/chị thử lại hoặc gọi hotline 094.1125.000 giúp em ạ.', 'loi');
        });
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
    if (!bar || !dk) return;
    var r = dk.getBoundingClientRect();
    bar.classList.toggle('show', scrollY > innerHeight * 0.6 && !(r.top < innerHeight && r.bottom > 0));
  }
  addEventListener('scroll', function () { if (!henBar) { henBar = true; requestAnimationFrame(capNhatBar); } }, { passive: true });
  capNhatBar();
})();
