(function () {
  'use strict';

  var ENDPOINT = '/api/submit-lead/';
  var $ = function (s, root) { return (root || document).querySelector(s); };
  var $$ = function (s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); };
  var header = $('#hdr');
  var burger = $('#burger');

  function closeMenu() {
    if (!header || !burger) return;
    header.classList.remove('open', 'nav-hide');
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = !header.classList.contains('open');
      header.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.documentElement.style.overflow = open ? 'hidden' : '';
    });
  }
  $$('#nav a').forEach(function (link) { link.addEventListener('click', closeMenu); });

  var previousScroll = window.scrollY || 0;
  var scrollPending = false;
  function updateHeader() {
    scrollPending = false;
    var current = window.scrollY || 0;
    if (!header) return;
    header.classList.toggle('nho', current > 40);
    if (current <= 40 || current < previousScroll) header.classList.remove('nav-hide');
    else if (current > previousScroll && !header.classList.contains('open')) header.classList.add('nav-hide');
    previousScroll = current;
  }
  addEventListener('scroll', function () {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateHeader); }
  }, { passive: true });
  updateHeader();

  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function selectTab(tab, focus) {
      tabs.forEach(function (item) {
        var selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(item.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { selectTab(tab, false); });
      tab.addEventListener('keydown', function (event) {
        var direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (direction) { event.preventDefault(); selectTab(tabs[(index + direction + tabs.length) % tabs.length], true); }
      });
    });
  });

  var lightbox = $('#lb');
  var lightboxImage = $('#lb-img');
  var lightboxCaption = $('#lb-cap');
  var lastZoom = null;
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.documentElement.style.overflow = '';
    if (lightboxImage) lightboxImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    if (lastZoom) lastZoom.focus();
  }
  $$('[data-zoom]').forEach(function (item) {
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    function openLightbox() {
      var image = $('img', item);
      if (!lightbox) return;
      lastZoom = item;
      lightboxImage.src = item.getAttribute('data-zoom');
      lightboxImage.alt = item.getAttribute('data-alt') || (image ? image.alt : '');
      lightboxCaption.textContent = lightboxImage.alt;
      lightbox.classList.add('open');
      document.documentElement.style.overflow = 'hidden';
      $('button', lightbox).focus();
    }
    item.addEventListener('click', openLightbox);
    item.addEventListener('keydown', function (event) { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox(); } });
  });
  if (lightbox) lightbox.addEventListener('click', function (event) { if (event.target !== lightboxImage) closeLightbox(); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { if (lightbox && lightbox.classList.contains('open')) closeLightbox(); else closeMenu(); }
  });

  function normalizePhone(value) {
    var phone = String(value || '').replace(/[^0-9]/g, '');
    if (phone.indexOf('84') === 0 && phone.length === 11) phone = '0' + phone.slice(2);
    return /^0[35789][0-9]{8}$/.test(phone) ? phone : null;
  }
  function readTracking() {
    var result = {}, params = [];
    try { params.push(new URLSearchParams(location.search)); } catch (error) {}
    try { if (window.top !== window) params.push(new URLSearchParams(window.top.location.search)); } catch (error) {}
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'adclid', 'adclida', 'mglnd', 'gclid', 'fbclid', 'mgclid'].forEach(function (key) {
      for (var i = 0; i < params.length; i++) {
        var value = params[i].get(key);
        if (value) { result[key === 'mgclid' ? 'mglnd' : key] = value; break; }
      }
    });
    return result;
  }
  function showMessage(form, message, error) {
    var old = $('.msg', form);
    if (old) old.remove();
    var node = document.createElement('div');
    node.className = 'msg ' + (error ? 'err' : 'ok');
    node.setAttribute('role', 'status');
    node.textContent = message;
    form.appendChild(node);
  }

  $$('form[data-lead]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var fields = form.elements;
      var submit = $('button[type="submit"]', form);
      var name = (fields.name.value || '').trim();
      var phone = normalizePhone(fields.phone.value);
      if (!name) { showMessage(form, 'Vui lòng nhập họ tên.', true); fields.name.focus(); return; }
      if (!phone) { showMessage(form, 'Số điện thoại chưa đúng, cần 10 số bắt đầu 03/05/07/08/09.', true); fields.phone.focus(); return; }
      var pageUrl = location.href;
      try { pageUrl = window.top.location.href; } catch (error) {}
      var payload = {
        timestamp: new Date().toISOString(), hoten: name, sdt: phone, url: pageUrl,
        utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
        adclid: '', adclida: '', mglnd: '', ip: '', formId: 'HANOI_SIGNATURE_LEAD',
        userAgent: navigator.userAgent || '',
        sanpham: fields.product && fields.product.value ? fields.product.value : 'Hanoi Signature',
        email: '', message: '', sheet: 'HANOISIG',
        source: form.getAttribute('data-source') || 'form-dang-ky-tham-quan'
      };
      var tracking = readTracking();
      Object.keys(tracking).forEach(function (key) { payload[key] = tracking[key]; });
      var body = JSON.stringify(payload), sent = false;
      if (submit) submit.disabled = true;
      try { sent = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' })); } catch (error) {}
      if (!sent) fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
      setTimeout(function () {
        try { window.top.location.href = '/thank-you-hanoi-signature/'; } catch (error) { location.href = '/thank-you-hanoi-signature/'; }
      }, 120);
    });
  });

  var form = $('#dang-ky form');
  $$('[data-loai]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (form && form.elements.product) form.elements.product.value = link.getAttribute('data-loai');
      if (form && form.elements.name) setTimeout(function () { form.elements.name.focus({ preventScroll: true }); }, 700);
    });
  });

  var bar = $('#bar'), register = $('#dang-ky');
  function updateBar() {
    if (!bar || !register) return;
    var rect = register.getBoundingClientRect();
    bar.classList.toggle('show', scrollY > innerHeight * 0.6 && !(rect.top < innerHeight && rect.bottom > 0));
  }
  addEventListener('scroll', updateBar, { passive: true });
  updateBar();

  var reveal = $$('.rv');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(function (item) { observer.observe(item); });
  } else reveal.forEach(function (item) { item.classList.add('in'); });
})();
