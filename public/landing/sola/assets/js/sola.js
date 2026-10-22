/* Bán đảo SOLA – The Global City landing — JS thuần, không thư viện (khung landing SOHO / Arcadia).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác + 2 hiệu ứng:
   H2 phóng xuyên chữ O (cầu sóng) của logo SOLA (khối "Bán đảo SOLA, nơi…") · M2 3 vòng số liệu + ảnh toàn cảnh nở mép mềm (khối Compound). */
(function () {
  'use strict';

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '/api/submit-lead';
  /* Bản có form sinh bằng _dungcu/tao-ban-co-form.py — sửa ở file này rồi chạy lại script. */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var giamChuyenDong = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cao(bien) { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(bien)) || 0; }

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

  /* ---------- tab (5 công viên · 4 loại hình sản phẩm) ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function chon(t, lay) {
      var pDang = null;
      tabs.forEach(function (x) {
        var c = x === t;
        x.setAttribute('aria-selected', String(c));
        x.tabIndex = c ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) { p.hidden = !c; if (c) pDang = p; }
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
    var gioiHan = Math.round(lh * (parseFloat(el.getAttribute('data-gon')) || 4));
    if (el.scrollHeight <= gioiHan + lh * 2) return;   // chỉ dư 1–2 dòng thì để nguyên
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

  /* ---------- HIỆU ỨNG H2 · phóng xuyên chữ O của logo SOLA ----------
     Theo mẫu projects/template/hieu-ung/03-phong-xuyen-chu (island-blue "WE DO ART…"): khối ghim, 2 đoạn chữ mờ + nhoè,
     chữ lớn phóng ×DO_PHONG lấy tâm là chữ O (dời dòng cho O vào giữa màn), lớp tối phủ lên, thẻ bung ra từ giữa.
     Viết lại bằng position:sticky + biến CSS --q như hero Salacia (không tải GSAP/Lenis cho nhẹ trang). Mọi chuyển động viết trong CSS,
     JS chỉ ghi --q (0 → 1), --s (độ phóng), --ox/--oy (tâm chữ O) và --tx (dời O vào giữa màn).
     Chữ O của SOLA là quả cầu có sóng bên trong: CSS cho sóng (#px-song) tan ở đầu đoạn, chỉ vòng tròn (#px-o) phóng thành khung nhìn xuống bán đảo.
     Chỉ chạy ở máy tính ≥ 961 px và khi không bật "giảm chuyển động"; còn lại khối đứng yên, chữ + 3 thẻ đủ từ đầu. */
  (function () {
    var khoi = $('#ban-dao');
    if (!khoi || giamChuyenDong || !window.matchMedia) return;
    var mq = matchMedia('(min-width: 961px)');
    var dong = $('#px-dong'), o = $('#px-o'), san = $('.px-san', khoi);
    var DO_PHONG = 20;          // O của logo SOLA là vòng tròn rộng ~28 % dòng chữ → ×20 đã phủ kín màn 2560 px
    var DO_TRE = 0.16;          // trễ mềm: 1 = bám tức thì, nhỏ = trôi chậm theo cuộn
    var dich = 0, hienTai = 0, dangChay = false;
    function ghi(q) {
      var e = Math.min(1, Math.max(0, (q - 0.04) / 0.56));
      khoi.style.setProperty('--q', q.toFixed(4));
      khoi.style.setProperty('--s', (1 + (DO_PHONG - 1) * e * e * e).toFixed(3));   // power3.in như mẫu
    }
    // đo tâm chữ O khi chưa phóng (đo lúc phóng là lệch)
    function datTam() {
      var q = hienTai; ghi(0);
      var b = dong.getBoundingClientRect(), r = o.getBoundingClientRect();
      khoi.style.setProperty('--ox', ((r.left + r.width / 2 - b.left) / b.width * 100).toFixed(2) + '%');
      khoi.style.setProperty('--oy', ((r.top + r.height / 2 - b.top) / b.height * 100).toFixed(2) + '%');
      khoi.style.setProperty('--tx', (innerWidth / 2 - (r.left + r.width / 2)).toFixed(1) + 'px');
      ghi(q);
    }
    function tinh() {
      var dai = khoi.offsetHeight - san.offsetHeight;
      var top = khoi.getBoundingClientRect().top - cao('--hdr');
      dich = dai > 0 ? Math.min(1, Math.max(0, -top / dai)) : 0;
    }
    function khung() {
      hienTai += (dich - hienTai) * DO_TRE;
      if (Math.abs(dich - hienTai) < 0.001) hienTai = dich;
      ghi(hienTai);
      if (hienTai !== dich) requestAnimationFrame(khung); else dangChay = false;
    }
    function chay() { tinh(); if (!dangChay) { dangChay = true; requestAnimationFrame(khung); } }
    // ảnh bán đảo nhìn từ trên cao hiện qua lỗ chữ O: chỉ máy tính cần, tải sau khi trang đã hiện xong (không tranh băng thông với ảnh hero = LCP)
    var nen = $('.px-nen img', khoi);
    function taiNen() { if (nen && nen.getAttribute('data-src')) { nen.src = nen.getAttribute('data-src'); nen.removeAttribute('data-src'); } }
    function henTaiNen() { if (document.readyState === 'complete') setTimeout(taiNen, 300); else addEventListener('load', function () { setTimeout(taiNen, 300); }); }
    function batTat() {
      var bat = mq.matches;
      khoi.classList.toggle('ghim', bat);
      if (!bat) { ghi(0); dich = hienTai = 0; return; }
      henTaiNen();
      datTam(); tinh(); hienTai = dich; ghi(dich);
    }
    batTat();
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { if (mq.matches) datTam(); });
    addEventListener('scroll', function () { if (mq.matches) chay(); }, { passive: true });
    addEventListener('resize', batTat);
  })();

  /* ---------- HIỆU ỨNG M2 · 3 vòng số liệu + ảnh toàn cảnh bán đảo nở mép mềm ----------
     Theo mẫu projects/template/hieu-ung/04-mo-man-chieu-sau (mục 4 ba vòng tròn, mục 5 ảnh nở mép mềm) — KHÔNG ghim
     (trang chỉ ghim khối H2). [data-tien-do] nhận --p: 0 khi đỉnh khối vừa ló dưới đáy màn → 1 khi đỉnh khối lên tới ~30% màn.
     CSS lo phần chuyển động (transition .6s làm mượt). Giảm chuyển động: CSS đặt --p:1, JS không chạy. */
  (function () {
    var ds = $$('[data-tien-do]');
    if (!ds.length) return;
    if (giamChuyenDong) { ds.forEach(function (el) { el.style.setProperty('--p', 1); }); return; }
    var hen2 = false;
    function capNhat() {
      hen2 = false;
      var vh = innerHeight;
      ds.forEach(function (el) {
        var top = el.getBoundingClientRect().top;
        var p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.7)));
        el.style.setProperty('--p', p.toFixed(3));
      });
    }
    addEventListener('scroll', function () { if (!hen2) { hen2 = true; requestAnimationFrame(capNhat); } }, { passive: true });
    addEventListener('resize', capNhat);
    capNhat();
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
    if (!ten) { bao(form, 'Vui long nhap ho ten.', 'loi'); f.name.focus(); return; }
    if (!sdt) { bao(form, 'So dien thoai chua dung.', 'loi'); f.phone.focus(); return; }
    var search = location.search;
    try { if (window.top !== window) search += '&' + window.top.location.search.replace(/^\?/, ''); } catch (x) {}
    var params = new URLSearchParams(search), utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'mgclid'].forEach(function (k) {
      if (params.get(k)) utm[k === 'mgclid' ? 'mglnd' : k] = params.get(k);
    });
    var topUrl = location.href;
    try { topUrl = window.top.location.href; } catch (x) {}
    var unit = f.unit ? f.unit.value : '';
    var payload = {
      formId: 'SOLA_FORM', hoten: ten, sdt: sdt, email: '', message: '',
      sanpham: unit ? 'SOLA - ' + unit : 'SOLA - The Global City', sheet: 'SOLA',
      url: topUrl, ip: '', userAgent: navigator.userAgent || '', timestamp: new Date().toISOString()
    };
    Object.keys(utm).forEach(function (k) { payload[k] = utm[k]; });
    nut.disabled = true;
    nut.setAttribute('data-chu', nut.textContent);
    nut.textContent = 'Dang gui...';
    var body = JSON.stringify(payload), sent = false;
    try { if (navigator.sendBeacon) sent = navigator.sendBeacon(LEAD_ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (x) {}
    var done = function () { try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {} window.top.location.href = '/thank-you-sola/'; };
    if (sent) { done(); return; }
    fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); done(); })
      .catch(function (err) { console.error('[SOLA] Lead error:', err); nut.disabled = false; nut.textContent = nut.getAttribute('data-chu'); bao(form, 'Gui chua duoc. Vui long thu lai.', 'loi'); });
  }, true);
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, nut = $('button[type=submit]', form);
      var ten = (f.name.value || '').trim(), sdt = chuanSDT(f.phone.value);
      if (!ten) { bao(form, 'Anh/chị cho em xin họ tên với ạ.', 'loi'); f.name.focus(); return; }
      if (!sdt) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'loi'); f.phone.focus(); return; }

      var du = {
        du_an: 'Bán đảo SOLA – The Global City',
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
    var r = dk.getBoundingClientRect();
    bar.classList.toggle('show', scrollY > innerHeight * 0.6 && !(r.top < innerHeight && r.bottom > 0));
  }
  addEventListener('scroll', function () { if (!henBar) { henBar = true; requestAnimationFrame(capNhatBar); } }, { passive: true });
  capNhatBar();
})();
