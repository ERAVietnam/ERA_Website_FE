(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ENDPOINT = '/api/submit-lead/', SHEET = 'PALM RIVER', THANK_YOU = '/thank-you-palm-river/';
  var hdr = $('#hdr'), burger = $('#burger');

  function closeMenu() { if (!hdr) return; hdr.classList.remove('open'); if (burger) burger.setAttribute('aria-expanded', 'false'); document.documentElement.style.overflow = ''; }
  if (burger) burger.addEventListener('click', function () { var open = !hdr.classList.contains('open'); hdr.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); document.documentElement.style.overflow = open ? 'hidden' : ''; });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  function updateTabs(list, tab) {
    $$('[role="tab"]', list).forEach(function (item) { var selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; var panel = document.getElementById(item.getAttribute('aria-controls')); if (panel) { panel.hidden = !selected; if (selected) panel.classList.add('in'); } });
  }
  $$('[role="tablist"]').forEach(function (list) { var tabs = $$('[role="tab"]', list); tabs.forEach(function (tab, index) { tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1; tab.addEventListener('click', function () { updateTabs(list, tab); }); tab.addEventListener('keydown', function (e) { var next = -1; if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % tabs.length; if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length; if (next < 0) return; e.preventDefault(); updateTabs(list, tabs[next]); tabs[next].focus(); }); }); });

  var capNhatSlider = [];
  $$('.slider').forEach(function (slider) { var track = $('.track', slider), prev = $('.sl-truoc', slider), next = $('.sl-sau', slider), count = $('.sl-dem', slider), slides = $$('.slide', track); if (!track || !slides.length) return; var step = function () { return slides[0].getBoundingClientRect().width + 14; }; var update = function () { if (!track.clientWidth) return; var max = track.scrollWidth - track.clientWidth - 2; prev.disabled = track.scrollLeft <= 2; next.disabled = track.scrollLeft >= max; count.textContent = (next.disabled ? slides.length : Math.min(slides.length, Math.round(track.scrollLeft / step()) + 1)) + ' / ' + slides.length; }; prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); }); next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); }); track.addEventListener('scroll', update, { passive: true }); capNhatSlider.push(update); update(); });
  addEventListener('resize', function () { capNhatSlider.forEach(function (update) { update(); }); });

  var lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), lbOrigin = null;
  function closeLightbox() { if (!lb) return; lb.classList.remove('open'); document.documentElement.style.overflow = ''; lbImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; if (lbOrigin) lbOrigin.focus(); }
  function openLightbox(el) { var image = $('img', el); lbOrigin = el; lbImg.src = el.getAttribute('data-zoom'); lbImg.alt = image ? image.alt : ''; lbCap.textContent = lbImg.alt; lb.classList.add('open'); document.documentElement.style.overflow = 'hidden'; $('button', lb).focus(); }
  if (lb) { $$('[data-zoom]').forEach(function (el) { el.tabIndex = 0; el.setAttribute('role', 'button'); el.addEventListener('click', function () { openLightbox(el); }); el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(el); } }); }); lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLightbox(); }); }

  var towerData = {
    'p-t3': ['2PN góc|84,9 / 76,3 m²', '2PN thường|76,6 / 77,3 m²', '2PN đặc biệt|120,2 – 121,9 / 116,6 – 111,3 m²', '3PN góc|125,3 / 115,3 – 116 m²', '3PN thường|126,1 / 115,5 – 116,2 m²'],
    'p-t4': ['2PN góc|84,9 / 76,3 m²', '2PN thường|76,6 / 77,3 m²', '2PN đặc biệt|120,2 – 121,9 / 116,6 – 111,3 m²', '3PN thường|126,1 / 115,5 – 116,2 m²', '3PN đặc biệt|157 / 143,7 – 144,8 m²']
  };
  function renderTower(panel) { var values = towerData[panel.id]; if (!values) return; $$('li', panel).forEach(function (li, index) { var parts = values[index].split('|'); if (parts[0]) $('b', li).textContent = parts[0]; if (parts[1]) $('span', li).textContent = parts[1]; }); }
  renderTower($('#p-t3')); renderTower($('#p-t4'));

  /* Cập nhật thông số Layout căn hộ theo bảng số liệu mới nhất. */
  function setLayoutText(id, small, rows) {
    var panel = document.getElementById(id);
    if (!panel) return;
    var smallEl = $('.code small', panel);
    if (smallEl) smallEl.textContent = small;
    $$('dl dd', panel).forEach(function (el, index) { if (rows[index] !== undefined) el.textContent = rows[index]; });
    var image = $('figure img', panel);
    if (image && image.alt) image.alt = image.alt.replace(/GSA[^·]+· NSA[^"”]+/i, small);
  }
  setLayoutText('c-2pn', 'Thông thủy 76,3 m² · tim tường 84,9 m²', ['84,9 / 76,3 m²', '76,6 / 77,3 m²', '2']);
  setLayoutText('c-2pn-db', 'Thông thủy 116,6 – 111,3 m² · tim tường 120,2 – 121,9 m²', ['120,2 – 121,9 m²', '116,6 – 111,3 m²', '2']);
  setLayoutText('c-3pn', 'Thông thủy 115,2 – 116,2 m² · tim tường 125,3 – 126,1 m²', ['126,1 / 115,5 – 116,2 m²', '125,3 / 115,3 – 116 m²', '3']);
  setLayoutText('c-3pn-db', 'Thông thủy 143,7 – 144,8 m² · tim tường 157 m²', ['157 m²', '143,7 – 144,8 m²', '3']);

  /* Xóa FAQ về diện tích theo yêu cầu nội dung mới. */
  $$('.faq details').forEach(function (detail) {
    var summary = $('summary', detail);
    if (summary && /diện tích/i.test(summary.textContent || '')) detail.remove();
  });
  $$('script[type="application/ld+json"]').forEach(function (script) {
    try {
      var json = JSON.parse(script.textContent || '');
      var graph = Array.isArray(json['@graph']) ? json['@graph'] : [json];
      graph.forEach(function (item) {
        if (item['@type'] === 'FAQPage' && Array.isArray(item.mainEntity)) {
          item.mainEntity = item.mainEntity.filter(function (q) { return !/diện tích/i.test(q.name || ''); });
        }
      });
      script.textContent = JSON.stringify(Array.isArray(json['@graph']) ? { '@context': json['@context'], '@graph': graph } : graph[0]);
    } catch (e) {}
  });

  var form = $('#dang-ky form'), selectedProduct = '';
  $$('[data-can]').forEach(function (link) { link.addEventListener('click', function () { selectedProduct = link.getAttribute('data-can') || ''; if (form && form.elements.product) form.elements.product.value = selectedProduct; }); });
  function normalizePhone(value) { var clean = String(value || '').replace(/[^0-9]/g, ''); if (clean.indexOf('84') === 0 && clean.length === 11) clean = '0' + clean.slice(2); return /^0[35789][0-9]{8}$/.test(clean) ? clean : null; }
  function getUtm() { var params = new URLSearchParams(location.search), result = {}; ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'adclid', 'adclida', 'mglnd'].forEach(function (key) { if (params.get(key)) result[key] = params.get(key); }); if (!result.adclid && params.get('gclid')) result.adclid = params.get('gclid'); if (!result.adclida && params.get('fbclid')) result.adclida = params.get('fbclid'); return result; }
  function showMessage(target, text, kind) { var old = $('.msg', target); if (old) old.remove(); var el = document.createElement('div'); el.className = 'msg ' + kind; el.setAttribute('role', 'status'); el.textContent = text; target.appendChild(el); }
  function submit(formElement, formId) { var fields = formElement.elements, name = (fields.name.value || '').trim(), phone = normalizePhone(fields.phone.value), email = fields.email ? (fields.email.value || '').trim() : ''; if (!name) { showMessage(formElement, 'Anh/chị cho em xin họ tên với ạ.', 'err'); fields.name.focus(); return; } if (!phone) { showMessage(formElement, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'err'); fields.phone.focus(); return; } if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { showMessage(formElement, 'Email chưa đúng định dạng — anh/chị có thể bỏ trống.', 'err'); fields.email.focus(); return; }
    var pageUrl = location.href; try { pageUrl = window.top.location.href; } catch (e) {}
    var data = { timestamp: new Date().toISOString(), hoten: name, sdt: phone, url: pageUrl.split('?')[0], ip: '', formId: formId, userAgent: navigator.userAgent, sanpham: (selectedProduct || (fields.product && fields.product.value) || '-Palm River'), email: email, message: '', sheet: SHEET }; var utm = getUtm(); Object.keys(utm).forEach(function (key) { data[key] = utm[key]; });
    var button = $('button[type=submit]', formElement); button.disabled = true; var body = JSON.stringify(data), sent = false; try { sent = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (e) {} if (!sent) fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {}); try { if (window.fbq) fbq('track', 'Lead'); } catch (e) {} try { if (window.gtag) gtag('event', 'generate_lead', { source: formId }); } catch (e) {} setTimeout(function () { window.top.location.href = THANK_YOU; }, 80);
  }
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); submit(form, 'PR_LEAD'); });

  /* Popup 45% theo behavior của bản React */
  var pop = document.createElement('div'); pop.className = 'pr-modal'; pop.innerHTML = '<div class="pr-pop" role="dialog" aria-modal="true" aria-labelledby="pr-pop-title"><button type="button" class="pr-close" aria-label="Đóng">×</button><img src="assets/img/palm-river-toan-canh-bon-thap-ven-song-800.webp" alt="Toàn cảnh Palm River ven sông"><h3 id="pr-pop-title">Nhận rổ hàng & bảng tính dòng tiền Palm River</h3><p>Chuyên viên ERA gửi rổ hàng tháp T3, T4 và bảng tính dòng tiền qua Zalo trong ngày.</p><form><input name="name" required placeholder="Họ tên (*)"><input name="phone" required placeholder="Số điện thoại (*)"><button type="submit" class="btn">GỬI THÔNG TIN</button></form><a href="tel:0941125000">HOTLINE: 094.1125.000</a></div>';
  var popStyle = document.createElement('style'); popStyle.textContent = '.pr-modal{position:fixed;inset:0;z-index:700;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(13,38,37,.76);overflow:hidden}.pr-modal.open{display:flex}.pr-pop{position:relative;width:min(440px,100%);max-height:92vh;overflow:hidden;background:#fff;border-radius:16px;padding:18px;box-shadow:0 24px 70px rgba(0,0,0,.3)}.pr-pop img{width:100%;height:180px;object-fit:cover;border-radius:10px}.pr-pop h3{margin:18px 0 6px;color:#0e4745;font-size:20px;line-height:1.3}.pr-pop p{margin:0;color:#486362;font-size:14px;line-height:1.6}.pr-pop form{display:flex;flex-direction:column;gap:10px;margin-top:16px}.pr-pop input{width:100%;padding:13px;border:1px solid #dce8e6;border-radius:9px;font:inherit}.pr-pop .btn{width:100%;margin-top:2px}.pr-pop>a{display:block;margin-top:14px;text-align:center;color:#0e4745;font-weight:700}.pr-close{position:absolute;right:28px;top:28px;width:36px;height:36px;border:0;border-radius:50%;background:rgba(255,255,255,.9);font-size:22px;cursor:pointer}'; document.head.appendChild(popStyle); document.body.appendChild(pop);
  var popForm = $('form', pop), autoOpened = false; try { autoOpened = sessionStorage.getItem('pr-pop') === '1'; } catch (e) {} function closePop() { pop.classList.remove('open'); document.documentElement.style.overflow = ''; } function openPop() { if (autoOpened) return; autoOpened = true; try { sessionStorage.setItem('pr-pop', '1'); } catch (e) {} pop.classList.add('open'); document.documentElement.style.overflow = 'hidden'; } $('.pr-close', pop).addEventListener('click', closePop); pop.addEventListener('click', function (e) { if (e.target === pop) closePop(); }); popForm.addEventListener('submit', function (e) { e.preventDefault(); submit(popForm, 'PR_POPUP'); });

  var lastScroll = window.scrollY, ticking = false, bar = $('#bar'), deferPopup = 0;
  document.addEventListener('click', function (e) { var anchor = e.target.closest && e.target.closest('a[href^="#"]'); if (anchor) deferPopup = Date.now() + 4000; });
  function onScroll() { ticking = false; var max = Math.max(1, document.documentElement.scrollHeight - innerHeight), percent = scrollY / max; if (hdr && !hdr.classList.contains('open')) hdr.classList.toggle('nav-hide', scrollY > lastScroll && scrollY > 80); lastScroll = scrollY; if (bar) { var cta = $('#dang-ky').getBoundingClientRect(); bar.classList.toggle('show', scrollY > innerHeight * .6 && !(cta.top < innerHeight && cta.bottom > 0)); } if (percent >= .45 && Date.now() >= deferPopup && !pop.classList.contains('open')) openPop(); }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true }); onScroll();
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); closeLightbox(); closePop(); } });
  var reveal = $$('.rv'); if ('IntersectionObserver' in window) { var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } }); }, { rootMargin: '0px 0px -8% 0px' }); reveal.forEach(function (el) { observer.observe(el); }); } else reveal.forEach(function (el) { el.classList.add('in'); });
})();
