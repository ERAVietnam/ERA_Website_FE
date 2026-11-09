(function () {
  'use strict';

  var endpoint = '/api/submit-lead/';
  var form = document.querySelector('form[data-lead]');
  if (!form) return;

  function parentUrl() {
    var url = document.referrer || '';
    try { if (window.top && window.top.location) url = window.top.location.href; } catch (e) {}
    return url || location.href;
  }

  function normalizePhone(value) {
    var digits = String(value || '').replace(/\D/g, '');
    if (digits.indexOf('84') === 0 && digits.length === 11) digits = '0' + digits.slice(2);
    return /^0[35789]\d{8}$/.test(digits) ? digits : '';
  }

  function getUtm() {
    var params = new URLSearchParams(location.search);
    var result = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'mgclid']
      .forEach(function (key) { if (params.get(key)) result[key] = params.get(key); });
    return result;
  }

  document.addEventListener('submit', function (event) {
    if (event.target !== form) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    var fields = form.elements;
    var name = String(fields.name && fields.name.value || '').trim();
    var phone = normalizePhone(fields.phone && fields.phone.value);
    var product = String(fields.product && fields.product.value || '').trim();
    if (!name || !phone) {
      alert('Vui lòng nhập họ tên và số điện thoại hợp lệ.');
      return;
    }

    var payload = Object.assign({
      timestamp: new Date().toISOString(),
      formId: 'IZUMI_CITY_LEAD',
      hoten: name,
      sdt: phone,
      email: '',
      url: parentUrl(),
      utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
      adclid: '', adclida: '', mglnd: '', ip: '',
      userAgent: navigator.userAgent,
      sanpham: product || 'Izumi City',
      message: product,
      sheet: 'IZUMI CITY'
    }, getUtm());

    var body = JSON.stringify(payload);
    var sent = false;
    try {
      sent = navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
    } catch (error) {}
    if (!sent) {
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
    }
    window.top.location.href = '/thank-you-izumi-city/';
  }, true);
}());
