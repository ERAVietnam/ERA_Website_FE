/* Phú Gia Bảo Lộc landing — JS thuần, không thư viện.
   Nội dung đã nằm sẵn trong HTML; file này chỉ thêm tương tác. */
(function () {
  'use strict';

  function baoChieuCaoChoTrangCha() {
    if (window.parent === window) return;
    var body = document.body, html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight, html.scrollHeight, html.offsetHeight);
    window.parent.postMessage({ type: 'era-landing-height', height: height }, window.location.origin);
  }

  window.addEventListener('load', baoChieuCaoChoTrangCha);
  window.addEventListener('resize', baoChieuCaoChoTrangCha);
  if (window.ResizeObserver) new ResizeObserver(baoChieuCaoChoTrangCha).observe(document.documentElement);

  /* BẢN CÓ FORM — sinh bởi _dungcu/tao-ban-co-form.py. KHÔNG sửa tay.
     🔴 LEAD_ENDPOINT: địa chỉ nhận lead, vd Google Apps Script .../exec.
     Để trống = form báo khách "bản xem thử, gọi hotline", KHÔNG nuốt lead im lặng. */
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

  /* ---------- album mục 09: lật từng trang ---------- */
  (function () {
    var album = $('#album-09');
    if (!album) return;
    var pages = $$('.album-page', album), panel = $('.album-pages', album);
    var nav = $('.album-nav', album), prev = $('[data-album-prev]', album);
    var next = $('[data-album-next]', album), status = $('.album-status', album);
    if (!pages.length || !panel || !nav || !prev || !next || !status) return;
    var current = 0, turning = false, touch = null, suppressClickUntil = 0;
    var reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
    function number(n) { return String(n).padStart(2, '0'); }
    function warm(index) {
      [index, index + 1].forEach(function (i) {
        var img = pages[i] && $('img', pages[i]);
        if (img) img.loading = 'eager';
      });
    }
    function update() {
      prev.disabled = current === 0;
      next.disabled = current === pages.length - 1;
      status.textContent = 'Trang ' + number(current + 1) + ' / ' + number(pages.length);
    }
    pages.forEach(function (page, i) {
      page.hidden = i !== current;
      page.setAttribute('aria-hidden', String(i !== current));
      page.tabIndex = i === current ? 0 : -1;
      page.classList.toggle('is-current', i === current);
    });
    album.classList.add('album-ready');
    nav.hidden = false;
    update();
    if ('IntersectionObserver' in window) {
      var loader = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          warm(current); loader.disconnect();
        }
      }, { rootMargin: '250px' });
      loader.observe(album);
    } else warm(current);

    function turn(target) {
      if (turning || target < 0 || target >= pages.length || target === current) return;
      turning = true;
      album.setAttribute('aria-busy', 'true');
      var outgoing = pages[current], incoming = pages[target];
      var forward = target > current, flipping = forward ? outgoing : incoming;
      var animation = forward ? 'album-forward' : 'album-backward';
      var restoreFocus = outgoing.contains(document.activeElement), timer = null, finished = false;
      warm(target);
      outgoing.tabIndex = -1;
      incoming.hidden = false;
      incoming.tabIndex = -1;
      function finish(event) {
        if (finished || (event && (event.target !== flipping || (event.animationName && event.animationName !== animation)))) return;
        finished = true;
        clearTimeout(timer);
        flipping.removeEventListener('animationend', finish);
        flipping.classList.remove(animation);
        outgoing.hidden = true;
        outgoing.setAttribute('aria-hidden', 'true');
        outgoing.classList.remove('is-current');
        incoming.hidden = false;
        incoming.setAttribute('aria-hidden', 'false');
        incoming.tabIndex = 0;
        incoming.classList.add('is-current');
        current = target;
        turning = false;
        album.setAttribute('aria-busy', 'false');
        update();
        if (restoreFocus) incoming.focus({ preventScroll: true });
      }
      if (reducedMotion.matches) finish();
      else {
        flipping.addEventListener('animationend', finish);
        flipping.classList.add(animation);
        var duration = getComputedStyle(flipping).animationDuration.split(',')[0].trim();
        var milliseconds = parseFloat(duration) * (duration.indexOf('ms') !== -1 ? 1 : 1000);
        timer = setTimeout(finish, (milliseconds || 1100) + 180);
      }
    }
    prev.addEventListener('click', function () { turn(current - 1); });
    next.addEventListener('click', function () { turn(current + 1); });
    album.addEventListener('keydown', function (e) {
      var target = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: pages.length - 1 }[e.key];
      if (target !== undefined) { e.preventDefault(); turn(target); }
    });
    panel.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch' && e.isPrimary && !turning) touch = { id: e.pointerId, x: e.clientX, y: e.clientY };
    }, { passive: true });
    panel.addEventListener('pointerup', function (e) {
      if (!touch || touch.id !== e.pointerId) return;
      var dx = e.clientX - touch.x, dy = e.clientY - touch.y;
      touch = null;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        suppressClickUntil = Date.now() + 350;
        turn(current + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
    panel.addEventListener('pointercancel', function () { touch = null; }, { passive: true });
    album.addEventListener('click', function (e) {
      if (Date.now() < suppressClickUntil) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  }());

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
  /* ---------- video nhúng tự phát khi khung video hiện trên màn hình ---------- */
  (function () {
    var frames = $$('iframe[data-section-clip]').map(function (frame) {
      var src = frame.getAttribute('src');
      var button = frame.id === 'clip-tong-quan' ? $('[data-clip-sound]') : null;
      if (button && /^https?:$/.test(location.protocol)) {
        src += '&origin=' + encodeURIComponent(location.origin);
      }
      return { frame: frame, section: frame.closest('section'), src: src,
        button: button, player: null, ready: false, active: false, blocked: false };
    }).filter(function (item) { return item.section && item.src; });
    if (!frames.length) return;
    var scheduled = false;
    function syncSound(item) {
      if (!item.button || !item.ready) return;
      var muted = item.player.isMuted();
      item.button.textContent = item.blocked ? 'Phát video' : (muted ? 'Bật tiếng' : 'Tắt tiếng');
      item.button.setAttribute('aria-pressed', String(!muted));
    }
    function createPlayer(item) {
      if (!item.button || item.player || !window.YT || !window.YT.Player) return;
      // API sẽ gọi playVideo sau onReady, không phát sớm khi người xem đã lướt qua.
      item.frame.setAttribute('src', item.src.replace('autoplay=1', 'autoplay=0'));
      item.player = new window.YT.Player(item.frame, { events: {
        onReady: function (event) {
          item.player = event.target;
          item.ready = true;
          item.button.hidden = false;
          item.player.mute();
          if (item.active && !document.hidden) item.player.playVideo();
          else item.player.pauseVideo();
          syncSound(item);
        },
        onStateChange: function (event) {
          if (event.data === 1) {
            item.blocked = false;
            if (!item.active || document.hidden) item.player.pauseVideo();
          }
          syncSound(item);
        },
        onAutoplayBlocked: function () {
          item.blocked = true;
          syncSound(item);
        },
        onError: function () { item.button.hidden = true; }
      } });
    }
    function update() {
      scheduled = false;
      var current = null, distance = Infinity;
      if (!document.hidden) {
        frames.forEach(function (item) {
          var rect = item.frame.getBoundingClientRect();
          var visible = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0));
          var nextDistance = Math.abs((rect.top + rect.bottom) / 2 - innerHeight / 2);
          if (rect.height > 0 && visible >= Math.min(rect.height, innerHeight) * .25 && nextDistance < distance) {
            current = item;
            distance = nextDistance;
          }
        });
      }
      frames.forEach(function (item) {
        var wasActive = item.active;
        item.active = item === current;
        if (item.active) item.frame.setAttribute('loading', 'eager');
        if (item.active && !item.player) createPlayer(item);
        if (item.player) {
          if (item.ready && wasActive !== item.active) {
            item.player.mute();
            if (item.active) item.player.playVideo();
            else item.player.pauseVideo();
            syncSound(item);
          }
        } else {
          // Không có API: YouTube vẫn tự phát tắt tiếng qua URL; Drive bấm Play.
          var next = item.active ? item.src : 'about:blank';
          if (item.frame.getAttribute('src') !== next) item.frame.setAttribute('src', next);
        }
      });
    }
    function schedule() {
      if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('pageshow', schedule);
    frames.forEach(function (item) {
      if (!item.button) return;
      item.button.addEventListener('click', function () {
        if (!item.ready || !item.active || document.hidden) return;
        if (item.blocked || item.player.isMuted()) item.player.unMute();
        else item.player.mute();
        if (item.blocked || item.player.getPlayerState() !== 1) item.player.playVideo();
        item.blocked = false;
        syncSound(item);
      });
    });
    if (frames.some(function (item) { return !!item.button; }) && !(window.YT && window.YT.Player)) {
      var previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof previousReady === 'function') previousReady();
        schedule();
      };
      var api = document.createElement('script');
      api.src = 'https://www.youtube.com/iframe_api';
      api.async = true;
      document.head.appendChild(api);
    }
    update();
  })();

  /* ---------- clip tự phát khi cuộn đến ---------- */
  (function () {
    var clips = $$('video[data-scroll-play]').map(function (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      return { video: video, ratio: 0, userPaused: false, blocked: false,
        finished: false, pending: false, ignorePause: false, request: 0 };
    });
    if (!clips.length) return;
    var active = null;
    function pause(clip) {
      clip.request++;
      clip.pending = false;
      if (!clip.video.paused) clip.ignorePause = true;
      clip.video.pause();
      if (active === clip) active = null;
    }
    function start(clip) {
      if (active === clip && (!clip.video.paused || clip.pending)) return;
      clips.forEach(function (other) { if (other !== clip && (!other.video.paused || other.pending)) pause(other); });
      active = clip;
      clip.pending = true;
      var request = ++clip.request;
      function failed() {
        if (request !== clip.request) return;
        clip.pending = false;
        clip.blocked = true;
        if (active === clip) active = null;
        // Trình duyệt chặn tự phát: vẫn có nút Play và điều khiển video gốc.
      }
      try {
        var play = clip.video.play();
        if (play && typeof play.then === 'function') {
          play.then(function () {
            if (request === clip.request) clip.pending = false;
            if (active !== clip || document.hidden || clip.ratio < .5) pause(clip);
          }).catch(failed);
        } else clip.pending = false;
      } catch (error) { failed(); }
    }
    function update() {
      var best = null;
      if (!document.hidden) {
        clips.forEach(function (clip) {
          if (clip.ratio >= .5 && !clip.userPaused && !clip.blocked && !clip.finished &&
              (!best || clip.ratio > best.ratio)) best = clip;
        });
      }
      clips.forEach(function (clip) {
        if (clip !== best && (!clip.video.paused || clip.pending)) pause(clip);
      });
      if (best) start(best);
    }
    clips.forEach(function (clip) {
      clip.video.addEventListener('pause', function () {
        if (clip.ignorePause) { clip.ignorePause = false; return; }
        if (clip.ratio >= .5 && !clip.video.ended) {
          clip.userPaused = true;
          if (active === clip) active = null;
        }
      });
      clip.video.addEventListener('play', function () {
        clip.userPaused = false;
        clip.blocked = false;
        clip.finished = false;
        clips.forEach(function (other) { if (other !== clip && (!other.video.paused || other.pending)) pause(other); });
        active = clip;
      });
      clip.video.addEventListener('ended', function () {
        clip.finished = true;
        if (active === clip) active = null;
      });
    });
    function seen(clip, ratio) {
      clip.ratio = ratio;
      if (ratio === 0) {
        clip.userPaused = false;
        clip.blocked = false;
        clip.finished = false;
      }
    }
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var clip = clips.filter(function (item) { return item.video === entry.target; })[0];
          if (clip) seen(clip, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        update();
      }, { threshold: [0, .01, .5, .75, 1] });
      // Chỉ nạp thông tin video khi gần tới, không tải cả ba clip lúc mở trang.
      var loader = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.preload = 'metadata';
          if (entry.target.paused && entry.target.readyState === 0) entry.target.load();
          loader.unobserve(entry.target);
        });
      }, { rootMargin: '250px 0px' });
      clips.forEach(function (clip) { observer.observe(clip.video); loader.observe(clip.video); });
    } else {
      var scheduled = false;
      function measure() {
        scheduled = false;
        clips.forEach(function (clip) {
          var r = clip.video.getBoundingClientRect();
          var height = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
          var width = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0));
          seen(clip, r.height && r.width ? height * width / (r.height * r.width) : 0);
        });
        update();
      }
      function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(measure); } }
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      measure();
    }
    document.addEventListener('visibilitychange', update);
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
  function parentUrl() {
    try { return window.top.location.href.split('?')[0]; } catch (e) { return location.href.split('?')[0]; }
  }
  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, nut = $('button[type=submit]', form);
      var ten = (f.name.value || '').trim(), sdt = chuanSDT(f.phone.value);
      if (!ten) { bao(form, 'Anh/chị cho em xin họ tên với ạ.', 'loi'); f.name.focus(); return; }
      if (!sdt) { bao(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'loi'); f.phone.focus(); return; }

      var product = f.product ? f.product.value : '';
      var utm = layUTM();
      var du = {
        formId: form.getAttribute('data-source') || 'PGBL_NEW_LEAD',
        hoten: ten, sdt: sdt, email: '', message: '',
        url: parentUrl(), ip: '', userAgent: navigator.userAgent,
        sanpham: product ? product + ' - Phú Gia Bảo Lộc' : 'Phú Gia Bảo Lộc',
        sheet: 'PHÚ GIA BẢO LỘC', timestamp: new Date().toISOString(),
        source: form.getAttribute('data-source') || 'form-dang-ky-tham-quan',
        referrer: document.referrer || '(trực tiếp)',
        device: innerWidth <= 860 ? 'mobile' : 'desktop'
      };
      for (var k in utm) du[k] = utm[k];
      if (du.gclid) du.mglnd = du.gclid;
      if (du.fbclid) du.adclida = du.fbclid;

      if (!LEAD_ENDPOINT) {
        console.warn('[PGBL] Chưa khai LEAD_ENDPOINT — lead KHÔNG được gửi:', du);
        bao(form, 'Trang đang ở bản xem thử, chưa nối nơi nhận thông tin. Anh/chị gọi hotline 094.1125.000 giúp em ạ.', 'loi');
        return;
      }
      nut.disabled = true; nut.setAttribute('data-chu', nut.textContent); nut.textContent = 'ĐANG GỬI...';
      fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(du), keepalive: true })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          try { if (window.fbq) fbq('track', 'Lead'); } catch (x) {}
          try { if (window.gtag) gtag('event', 'generate_lead', { source: du.source }); } catch (x) {}
          window.top.location.href = '/thank-you-phu-gia-bao-loc/';
        })
        .catch(function (err) {
          console.error('[PGBL] Gửi lead lỗi:', err);
          nut.disabled = false; nut.textContent = nut.getAttribute('data-chu');
          bao(form, 'Gửi chưa được. Anh/chị thử lại hoặc gọi hotline 094.1125.000 giúp em ạ.', 'loi');
        });
    });
  });

  /* nút "Nhận giá nền ..." ở tab sản phẩm -> ghi sẵn loại sản phẩm vào form */
  var formDk = $('#dang-ky form');
  $$('[data-loai]').forEach(function (a) {
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
