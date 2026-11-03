(function () {
  'use strict';
  var ENDPOINT = '/api/submit-lead/', SHEET = 'WATERPOINT', THANK_YOU = '/thank-you-waterpoint/', VIDEO_ID = 'SE8dkZDSoN8';
  var $ = function (s, root) { return (root || document).querySelector(s); };
  var $$ = function (s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); };

  var hdr = $('#hdr'), burger = $('#burger');
  function closeMenu() { if (!hdr) return; hdr.classList.remove('open'); if (burger) burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', function () { var open = !hdr.classList.contains('open'); hdr.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); document.body.style.overflow = open ? 'hidden' : ''; });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  $$('[role="tablist"]').forEach(function (list) { var tabs = $$('[role="tab"]', list); tabs.forEach(function (tab) { tab.addEventListener('click', function () { tabs.forEach(function (item) { var selected = item === tab; item.setAttribute('aria-selected', String(selected)); var panel = document.getElementById(item.getAttribute('aria-controls')); if (panel) panel.hidden = !selected; }); }); }); });
  var acc = $('#acc');
  if (acc) { var figures = $$('figure', acc); var activate = function (figure) { figures.forEach(function (item) { item.classList.toggle('on', item === figure); }); }; figures.forEach(function (figure) { figure.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) activate(figure); }); figure.addEventListener('click', function () { activate(figure); }); }); }

  var lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), lbOrigin = null;
  function closeLightbox() { if (!lb) return; lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; if (lbOrigin) lbOrigin.focus(); }
  function openLightbox(el) { var image = $('img', el); lbOrigin = el; lbImg.src = el.getAttribute('data-zoom'); lbImg.alt = image ? image.alt : ''; lbCap.textContent = lbImg.alt; lb.classList.add('open'); document.body.style.overflow = 'hidden'; $('button', lb).focus(); }
  if (lb) { $$('[data-zoom]').forEach(function (el) { if (el.tagName !== 'BUTTON') { el.tabIndex = 0; el.setAttribute('role', 'button'); } el.addEventListener('click', function () { openLightbox(el); }); el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(el); } }); }); lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLightbox(); }); }

  var pop = $('#pop'), popTitle = $('#pop-t'), popNote = $('#pop-n'), popForm = pop && $('form', pop), popOrigin = null, autoOpened = false;
  var popupText = { gia: ['Nhận bảng giá chính thức', 'Em gửi bảng giá, giỏ hàng theo zone và dòng tiền 3 lịch thanh toán qua Zalo.', 'popup-bang-gia'], mau: ['Nhận giá mẫu nhà bạn quan tâm', 'Em gửi giá các căn cùng mẫu còn trong giỏ hàng và mặt bằng chi tiết.', 'popup-mau-nha'], video: ['Nhận video giới thiệu Rivera Nagomi', 'Để lại số, em gửi video qua Zalo ngay.', 'popup-video'], auto: ['Rivera Nagomi — mảnh ghép mới tại Waterpoint', 'Để lại số, em gửi bảng giá tham khảo và lịch tham quan cuối tuần.', 'popup-tu-dong'] };
  try { autoOpened = sessionStorage.getItem('rn-pop') === '1'; } catch (e) {}
  function closePopup() { if (!pop) return; pop.classList.remove('open'); document.body.style.overflow = ''; if (popOrigin) popOrigin.focus(); }
  function openPopup(type, model, origin) { var text = popupText[type] || popupText.gia; popTitle.textContent = model ? 'Nhận giá mẫu ' + model : text[0]; popNote.textContent = text[1]; popForm.setAttribute('data-source', text[2]); popForm.elements.product.value = model || ''; var oldMessage = $('.msg', popForm); if (oldMessage) oldMessage.remove(); popOrigin = origin || null; pop.classList.add('open'); document.body.style.overflow = 'hidden'; autoOpened = true; setTimeout(function () { popForm.elements.name.focus(); }, 60); }
  if (pop) { $$('[data-pop]').forEach(function (button) { button.addEventListener('click', function () { openPopup(button.getAttribute('data-pop'), button.getAttribute('data-mau'), button); }); }); pop.addEventListener('click', function (e) { if (e.target === pop || e.target.hasAttribute('data-close')) closePopup(); }); }
  document.addEventListener('keydown', function (e) { if (e.key !== 'Escape') return; if (lb && lb.classList.contains('open')) closeLightbox(); else if (pop && pop.classList.contains('open')) closePopup(); else if (hdr && hdr.classList.contains('open')) closeMenu(); });

  function phone(value) { var clean = String(value || '').replace(/[^0-9]/g, ''); if (clean.indexOf('84') === 0 && clean.length === 11) clean = '0' + clean.slice(2); return /^0[35789][0-9]{8}$/.test(clean) ? clean : null; }
  function getUtm() { var params = new URLSearchParams(location.search), result = {}; ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'adclid', 'adclida', 'mglnd'].forEach(function (key) { if (params.get(key)) result[key] = params.get(key); }); if (!result.adclid && params.get('gclid')) result.adclid = params.get('gclid'); if (!result.adclida && params.get('fbclid')) result.adclida = params.get('fbclid'); return result; }
  function message(form, text, kind) { var old = $('.msg', form); if (old) old.remove(); var el = document.createElement('div'); el.className = 'msg ' + kind; el.setAttribute('role', 'status'); el.textContent = text; form.appendChild(el); }
  function send(form) {
    var fields = form.elements, name = (fields.name.value || '').trim(), sdt = phone(fields.phone.value);
    if (!name) { message(form, 'Anh/chị cho em xin họ tên với ạ.', 'err'); fields.name.focus(); return; }
    if (!sdt) { message(form, 'Số điện thoại chưa đúng — cần 10 số, bắt đầu 03/05/07/08/09.', 'err'); fields.phone.focus(); return; }
    var topUrl = location.href; try { topUrl = window.top.location.href; } catch (e) {}
    var product = fields.product ? fields.product.value : '', visit = fields.visit ? fields.visit.value : ''; if (visit) product += (product ? ' — ' : '') + 'Tham quan: ' + visit;
    var data = { timestamp: new Date().toISOString(), hoten: name, sdt: sdt, url: topUrl.split('?')[0], ip: '', formId: form.getAttribute('data-source') === 'popup' ? 'RN_POPUP' : 'RN_LEAD', userAgent: navigator.userAgent, sanpham: product || 'Rivera Nagomi', email: fields.email ? fields.email.value : '', message: fields.message ? fields.message.value : '', sheet: SHEET };
    var utm = getUtm(); Object.keys(utm).forEach(function (key) { data[key] = utm[key]; });
    var button = $('button[type=submit]', form); button.disabled = true; var body = JSON.stringify(data), sent = false;
    try { sent = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (e) {}
    if (!sent) fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
    try { if (window.fbq) fbq('track', 'Lead'); } catch (e) {} try { if (window.gtag) gtag('event', 'generate_lead', { source: data.formId }); } catch (e) {}
    setTimeout(function () { window.top.location.href = THANK_YOU; }, 80);
  }
  $$('form[data-lead]').forEach(function (form) { form.addEventListener('submit', function (e) { e.preventDefault(); send(form); }); });

  var video = $('#vid');
  function playVideo() { if (!video || $('iframe', video)) return; video.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + VIDEO_ID + '?autoplay=1&rel=0" title="Video giới thiệu Rivera Nagomi" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'; video.style.cursor = 'default'; }
  if (video) { video.addEventListener('click', playVideo); video.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playVideo(); } }); }

  var lastScroll = window.scrollY, ticking = false, deferAnchorUntil = 0;
  document.addEventListener('click', function (e) { var anchor = e.target.closest && e.target.closest('a[href^="#"]'); if (anchor) deferAnchorUntil = Date.now() + 4000; });
  function onScroll() { ticking = false; var doc = document.documentElement, max = Math.max(1, doc.scrollHeight - innerHeight), percent = scrollY / max; if ($('#bar')) $('#bar').classList.toggle('show', scrollY > innerHeight * 0.6); if (hdr && !hdr.classList.contains('open')) hdr.classList.toggle('nav-hide', scrollY > lastScroll && scrollY > 80); lastScroll = scrollY; if (!autoOpened && percent >= 0.45 && Date.now() >= deferAnchorUntil && pop && !pop.classList.contains('open') && !(lb && lb.classList.contains('open'))) { autoOpened = true; try { sessionStorage.setItem('rn-pop', '1'); } catch (e) {} openPopup('auto'); } }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true }); onScroll();
  var reveal = $$('.rv'); if ('IntersectionObserver' in window) { var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } }); }, { rootMargin: '0px 0px -8% 0px' }); reveal.forEach(function (el) { observer.observe(el); }); } else reveal.forEach(function (el) { el.classList.add('in'); });
})();
