// Shared receiver for /api/submit-lead/. Paste this whole file into Code.gs.
// Set the ID for a standalone script; also recommended for bound Web Apps.
// Leave empty only when getActiveSpreadsheet() resolves the intended bound file.
const LEAD_SPREADSHEET_ID = '';

// All landings share these recipients. No visitor data is included in emails.
const LEAD_NOTIFICATION_RECIPIENTS = [
  'cuong.letrong@era.com.vn',
  'viet.nguyen@era.com.vn',
];

// Existing A:P order is preserved. Q:R are optional on existing sheets.
// These are column aliases, not a list of projects or allowed form IDs.
const LEAD_COLUMNS = [
  ['Timestamp', 'timestamp'],
  ['Họ tên', 'hoten'],
  ['SĐT', 'sdt'],
  ['URL gốc', 'url'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_term', 'utm_term'],
  ['utm_content', 'utm_content'],
  ['adclid', 'adclid'],
  ['adclida', 'adclida'],
  ['mglnd', 'mglnd'],
  ['IP', 'ip'],
  ['Form ID', 'formId'],
  ['User Agent', 'userAgent'],
  ['Sản phẩm', 'sanpham'],
  ['Email', 'email'],
  ['Lời nhắn', 'message'],
];

function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Missing JSON POST body.');
    }
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (error) {
      throw new Error('Invalid JSON POST body.');
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('JSON body must be an object.');
    }

    const sheet = leadSheet_(leadSpreadsheet_(), data.sheet);
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) {
      throw new Error('Receiver is busy. Check the sheet before retrying.');
    }

    const empty = sheet.getLastRow() === 0;
    const headers = empty ? LEAD_COLUMNS.map(column => column[0]) : leadHeaders_(sheet);
    const keys = headers.map(leadHeaderKey_);
    const row = keys.map(key => {
      let value = Object.prototype.hasOwnProperty.call(data, key) ? data[key] : '';
      if (key === 'timestamp' && (value === '' || value == null)) {
        value = new Date().toISOString();
      }
      if (key === 'mglnd' && (value === '' || value == null)) {
        value = Object.prototype.hasOwnProperty.call(data, 'mgclid') ? data.mgclid : '';
      }
      if (value == null) return '';
      if (typeof value === 'object') value = JSON.stringify(value);
      // Never execute a visitor-supplied spreadsheet formula.
      if (typeof value === 'string' && /^\s*=/.test(value)) return "'" + value;
      return value;
    });
    const ignoredFields = Object.keys(data).filter(key =>
      key !== 'sheet' && keys.indexOf(key) === -1 &&
      !(key === 'mgclid' && keys.indexOf('mglnd') !== -1)
    );

    if (empty) {
      if (sheet.getMaxColumns() < headers.length) {
        sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
      }
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    sheet.appendRow(row);
    lock.releaseLock();
    console.log('Lead appended to tab: ' + sheet.getName());
    if (ignoredFields.length) console.warn('Fields without headers: ' + ignoredFields.join(', '));
    const result = ignoredFields.length ? { success: true, ignoredFields: ignoredFields } : { success: true };
    try {
      leadNotify_(sheet.getName());
    } catch (error) {
      // The row already exists: do not report a failed lead or invite a retry.
      result.emailNotificationError = error.message || String(error);
      console.warn('Email notification failed: ' + result.emailNotificationError);
    }
    return leadJson_(result);
  } catch (error) {
    return leadJson_({ success: false, error: error.message || String(error) });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function leadNotify_(sheetName) {
  MailApp.sendEmail({
    to: LEAD_NOTIFICATION_RECIPIENTS.join(','),
    subject: 'ERA Website: Có lead mới',
    body: 'Có lead mới được ghi vào tab: ' + sheetName + '.',
  });
}

// Read-only: /exec or /exec?sheet=URL_ENCODED_TAB_NAME. Never appends a row.
function doGet(e) {
  try {
    const spreadsheet = leadSpreadsheet_();
    const result = { success: true, service: 'ERA landing lead receiver', version: '2026-11-18-mail' };
    if (e && e.parameter && Object.prototype.hasOwnProperty.call(e.parameter, 'sheet')) {
      const sheet = leadSheet_(spreadsheet, e.parameter.sheet);
      const headers = sheet.getLastRow() === 0 ? [] : leadHeaders_(sheet);
      result.sheet = sheet.getName();
      result.columns = headers.length;
      result.initialized = headers.length > 0;
    }
    return leadJson_(result);
  } catch (error) {
    return leadJson_({ success: false, error: error.message || String(error) });
  }
}

function leadSpreadsheet_() {
  const id = LEAD_SPREADSHEET_ID.trim();
  const spreadsheet = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('No spreadsheet is bound. Set LEAD_SPREADSHEET_ID in Code.gs.');
  }
  return spreadsheet;
}

function leadSheet_(spreadsheet, name) {
  if (typeof name !== 'string' || !name.trim()) {
    throw new Error('Missing non-empty sheet name in JSON or query parameter.');
  }
  const target = name.trim().normalize('NFC').toLowerCase();
  const matches = spreadsheet.getSheets().filter(sheet =>
    sheet.getName().trim().normalize('NFC').toLowerCase() === target
  );
  if (!matches.length) throw new Error('Tab not found: "' + name.trim() + '". No row was written.');
  if (matches.length > 1) throw new Error('Ambiguous tab name after trimming/case normalization: "' + name.trim() + '".');
  return matches[0];
}

function leadHeaders_(sheet) {
  const count = sheet.getLastColumn();
  if (!count) throw new Error('Missing header row in tab: ' + sheet.getName());
  const headers = sheet.getRange(1, 1, 1, count).getValues()[0];
  const keys = headers.map(header => {
    if (typeof header !== 'string' || !header.trim()) {
      throw new Error('Every used column needs a text header in row 1: ' + sheet.getName());
    }
    return leadHeaderKey_(header);
  });
  if (new Set(keys).size !== keys.length) {
    throw new Error('Duplicate headers map to the same JSON field: ' + sheet.getName());
  }
  return headers;
}

function leadHeaderKey_(header) {
  const name = header.trim().normalize('NFC');
  const normalized = name.replace(/\s+/g, '').toLowerCase();
  const column = LEAD_COLUMNS.find(column =>
    column[0].replace(/\s+/g, '').toLowerCase() === normalized ||
    column[1].toLowerCase() === normalized
  );
  // Unrecognized headers are literal JSON keys, including their case.
  // Whitespace normalization above also accepts the old typo "Lờ i nhắn".
  return column ? column[1] : name;
}

function leadJson_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
