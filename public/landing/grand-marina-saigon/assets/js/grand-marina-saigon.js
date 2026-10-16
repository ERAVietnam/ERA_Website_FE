/* Grand Marina Saigon landing — JS thuần, không thư viện (khung SOHO / Salacia Villas).
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác + 2 hiệu ứng:
   H4 phim tua theo cuộn ở hero (chỉ máy tính) · M3 chữ quét đậm ở khối Hai thương hiệu. */
(function () {
  'use strict';

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
  var LEAD_ENDPOINT = '/api/submit-lead/';
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

  /* ---------- tab (bộ sưu tập · mặt bằng tầng) ---------- */
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

  /* ---------- HIỆU ỨNG H4 · phim tua theo cuộn ở hero ----------
     Theo mẫu projects/template/hieu-ung/05-phim-tua-theo-cuon (villa3 + arden): khối dài, bên trong ghim 1 màn (sticky),
     vị trí cuộn làm mượt (DO_MUOT) rồi gán video.currentTime — chỉ gán khi !video.seeking (gán trùng không bắn "seeked", tự khoá dễ treo).
     Khác mẫu: KHÔNG màn tải (landing quảng cáo phải hiện ngay) — ảnh hero là LCP, phim tải SAU sự kiện load rồi mới phủ lên;
     phim hỏng / chưa tải xong thì vẫn là hero tĩnh, chữ vẫn đổi theo cuộn. Phim đã nén khung khoá mỗi 4 hình cho tua mượt.
     Chỉ chạy ở máy tính ≥ 961 px và khi không bật "giảm chuyển động". */
  (function () {
    var khoi = $('#hero'), film = $('#hero-film');
    if (!khoi || !film || giamChuyenDong || !window.matchMedia) return;
    var mq = matchMedia('(min-width: 961px)');
    var san = $('.hero-san', khoi), chu = $('.hero-chu > div', khoi), canh = $$('#hero-canh li', khoi);
    var DO_MUOT = 0.1;                 // càng nhỏ càng "nặng" — phim đuổi theo con lăn chậm hơn
    var MOC = [0, 0.175, 0.366, 0.557, 0.748]; // 5 cảnh: tháp · cửa kính · hồ bơi · bữa tối · toàn cảnh đêm — phim CĐT bản Ratio 1440×678 (đúng tỉ lệ) từ giây 3,704 tới hết (Anh chọn 15/10), scene: 0 · 1,98 · 4,14 · 6,30 · 8,46 / 11,28 s · cảnh 5 không có <li> → tắt chú thích
    var dich = 0, hienTai = 0, dangChay = false, phimSan = false, daTai = false, canhCu = -1;
    function tinh() {
      var dai = khoi.offsetHeight - san.offsetHeight;
      var top = khoi.getBoundingClientRect().top - cao('--hdr');
      dich = dai > 0 ? Math.min(1, Math.max(0, -top / dai)) : 0;
    }
    function tua(t) {
      if (!phimSan || film.seeking || Math.abs(t - film.currentTime) < 0.015) return;
      try { film.currentTime = t; } catch (e) {}
    }
    function ve(q) {
      khoi.style.setProperty('--q', q.toFixed(4));
      // Anh 15/10: chưa lăn = ảnh tĩnh sắc nét (1839 px); bắt đầu lăn mới cho phim (1280 px) phủ lên — khung đầu phim = ảnh tĩnh nên không giật
      film.classList.toggle('song', phimSan && q > 0.004);
      if (phimSan) tua(Math.min(film.duration - 0.05, q * film.duration));
      var c = 0;
      for (var i = 0; i < MOC.length; i++) if (q >= MOC[i] - 0.02) c = i;
      if (c !== canhCu) {
        canhCu = c;
        canh.forEach(function (li) { li.classList.toggle('on', +li.getAttribute('data-canh') === c); });
        if (c > 0) chu.setAttribute('data-tat', ''); else chu.removeAttribute('data-tat');
      }
    }
    function khung() {
      hienTai += (dich - hienTai) * DO_MUOT;
      if (Math.abs(dich - hienTai) < 0.0006) hienTai = dich;
      ve(hienTai);
      if (hienTai !== dich) requestAnimationFrame(khung); else dangChay = false;
    }
    function chay() { tinh(); if (!dangChay) { dangChay = true; requestAnimationFrame(khung); } }
    // phim chỉ tải khi trang đã hiện xong (không tranh băng thông với ảnh hero = LCP)
    function taiPhim() {
      if (daTai) return; daTai = true;
      film.addEventListener('error', function () { phimSan = false; film.classList.remove('song'); });
      var kiem = function () {
        if (!phimSan && film.readyState >= 2 && film.seekable.length && film.seekable.end(0) > 1) {
          phimSan = true; ve(hienTai);
        }
      };
      ['loadeddata', 'canplay', 'canplaythrough', 'progress'].forEach(function (e) { film.addEventListener(e, kiem); });
      film.preload = 'auto';
      film.src = film.getAttribute('data-src');
      film.load();
    }
    function henTaiPhim() { var t = function () { setTimeout(taiPhim, 400); }; if (document.readyState === 'complete') t(); else addEventListener('load', t); }
    function batTat() {
      var bat = mq.matches;
      khoi.classList.toggle('phim', bat);
      if (!bat) { khoi.style.removeProperty('--q'); canh.forEach(function (li) { li.classList.remove('on'); }); chu.removeAttribute('data-tat'); canhCu = -1; return; }
      henTaiPhim();
      tinh(); hienTai = dich; ve(dich);
    }
    batTat();
    addEventListener('scroll', function () { if (mq.matches) chay(); }, { passive: true });
    addEventListener('resize', batTat);
    window.__phim = { film: film, get trangThai() { return { phimSan: phimSan, t: film.currentTime, q: hienTai }; } };
  })();

  /* ---------- HIỆU ỨNG M3 · chữ quét đậm ----------
     Theo mẫu 03 (island-blue initWipe): mỗi dòng mờ 30 % → phần đậm quét trái → phải bằng mask-position khi cuộn tới;
     thời lượng theo độ rộng dòng (700 px/giây, kẹp 0,5–1,8 s), dòng sau bắt đầu khi dòng trước quét được ~60 %.
     CSS chỉ phủ mặt nạ khi có lớp .cho (JS gắn) → không JS / giảm chuyển động: chữ đậm đủ. */
  (function () {
    var quet = $('#quet');
    if (!quet || giamChuyenDong || !('IntersectionObserver' in window)) return;
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
        formId: 'MARINASG_LEAD',
        userAgent: navigator.userAgent || '',
        sanpham: f.product ? f.product.value : '',
        email: '',
        message: f.unit ? f.unit.value : '',
        sheet: 'MARINASG',
        source: form.getAttribute('data-source') || 'form-dang-ky-nhan-thong-tin',
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
      if (!sent) fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function (err) { console.error('[MARINASG] Gửi lead lỗi:', err); });
      try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
      try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
      try { window.top.location.href = '/thank-you-grand-marina-saigon/'; } catch (x) { location.href = '/thank-you-grand-marina-saigon/'; }
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
