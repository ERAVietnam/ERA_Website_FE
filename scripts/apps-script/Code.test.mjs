import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

// All spreadsheet state stays in memory. No HTTP/Google client is provided.
const source = readFileSync(new URL('./Code.gs', import.meta.url), 'utf8');
const headers = [
  'Timestamp', 'Họ tên', 'SĐT', 'URL gốc', 'utm_source', 'utm_medium',
  'utm_campaign', 'utm_term', 'utm_content', 'adclid', 'adclida', 'mglnd',
  'IP', 'Form ID', 'User Agent', 'Sản phẩm', 'Email', 'Lời nhắn',
];
const payload = {
  timestamp: '2026-11-18T06:00:00.000Z', hoten: 'Offline fixture', sdt: '0900123456',
  url: 'https://example.invalid/project/?utm_source=fixture', utm_source: 'source-a',
  utm_medium: 'medium-b', utm_campaign: 'campaign-c', utm_term: 'term-d',
  utm_content: 'content-e', adclid: 'click-f', adclida: 'click-g', mglnd: 'click-h',
  ip: '192.0.2.1', formId: 'ANY_FUTURE_FORM', userAgent: 'Offline agent',
  sanpham: 'Product i', email: 'offline@example.invalid', message: 'Goal j',
};
const expected = [
  '2026-11-18T06:00:00.000Z', 'Offline fixture', '0900123456',
  'https://example.invalid/project/?utm_source=fixture', 'source-a', 'medium-b',
  'campaign-c', 'term-d', 'content-e', 'click-f', 'click-g', 'click-h',
  '192.0.2.1', 'ANY_FUTURE_FORM', 'Offline agent', 'Product i',
  'offline@example.invalid', 'Goal j',
];

function sheet(name, initialRows = []) {
  return {
    rows: structuredClone(initialRows),
    maxColumns: Math.max(16, ...initialRows.map(row => row.length)), appendError: '',
    getName() { return name; },
    getLastRow() { return this.rows.length; },
    getLastColumn() {
      return Math.max(0, ...this.rows.map(row =>
        row.findLastIndex(value => value !== '' && value != null) + 1
      ));
    },
    getMaxColumns() { return this.maxColumns; },
    insertColumnsAfter(after, count) { this.maxColumns += count; },
    getRange(row, column, height, width) {
      if (column + width - 1 > this.maxColumns) throw new Error('Range exceeds sheet width');
      return {
        getValues: () => Array.from({ length: height }, (_, r) =>
          Array.from({ length: width }, (_, c) => this.rows[row - 1 + r]?.[column - 1 + c] ?? '')
        ),
        setValues: values => values.forEach((cells, r) => {
          this.rows[row - 1 + r] ??= [];
          cells.forEach((value, c) => { this.rows[row - 1 + r][column - 1 + c] = value; });
        }),
      };
    },
    appendRow(row) {
      if (this.appendError) throw new Error(this.appendError);
      this.rows.push(Array.from(row));
    },
  };
}

function receiver(sheets, { configuredId = '', bound = true, busy = false, mailError = '' } = {}) {
  const spreadsheet = { getSheets: () => sheets };
  const messages = [];
  let locked = false;
  const context = vm.createContext({
    console: { log() {}, warn() {} },
    MailApp: {
      sendEmail: message => {
        if (mailError) throw new Error(mailError);
        messages.push(structuredClone(message));
      },
    },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => bound ? spreadsheet : null,
      openById: id => {
        assert.equal(id, configuredId);
        return spreadsheet;
      },
    },
    LockService: {
      getScriptLock: () => ({
        tryLock: () => { locked = !busy && !locked; return locked; },
        hasLock: () => locked,
        releaseLock: () => { locked = false; },
      }),
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: text => ({
        text, setMimeType(mimeType) { this.mimeType = mimeType; return this; },
      }),
    },
  });
  const code = configuredId ? source.replace("const LEAD_SPREADSHEET_ID = '';", `const LEAD_SPREADSHEET_ID = '${configuredId}';`) : source;
  new vm.Script(code, { filename: 'Code.gs' }).runInContext(context);
  const json = response => {
    assert.equal(response.mimeType, 'application/json');
    return JSON.parse(response.text);
  };
  return {
    messages,
    post: data => json(context.doPost({ postData: { contents: JSON.stringify(data) } })),
    raw: contents => json(context.doPost({ postData: { contents } })),
    get: name => json(context.doGet(name === undefined ? undefined : { parameter: { sheet: name } })),
  };
}

test('existing 16/18-column tables retain headers, old rows and the documented field order', () => {
  for (const count of [16, 18]) {
    const original = [headers.slice(0, count), Array(count).fill('existing row')];
    const target = sheet('Arbitrary future landing', original);
    const api = receiver([target]);
    const result = api.post({ ...payload, sheet: '  ARBITRARY FUTURE LANDING  ' });
    assert.deepEqual(result, count === 18 ? { success: true } : { success: true, ignoredFields: ['email', 'message'] });
    assert.deepEqual(target.rows.slice(0, 2), original);
    assert.deepEqual(target.rows[2], expected.slice(0, count));
  }
});

test('an empty tab initializes all 18 columns once, independent of its name or form ID', () => {
  const target = sheet('SUNWAH PEARL');
  const api = receiver([target]);
  const data = { ...payload, sheet: 'SUNWAH PEARL', formId: 'SUNWAH_PEARL_LEAD' };
  assert.deepEqual(api.post(data), { success: true });
  assert.deepEqual(api.post({ ...data, hoten: 'Second fixture' }), { success: true });
  assert.deepEqual(target.rows[0], headers);
  assert.deepEqual(target.rows[1], expected.map((value, i) => i === 13 ? 'SUNWAH_PEARL_LEAD' : value));
  assert.equal(target.rows.length, 3);
  assert.equal(target.rows[2][1], 'Second fixture');
});

test('reordered headers map extra fields, zero/false, JSON, optional fields and old aliases', () => {
  const target = sheet('Future tab', [[
    'Lờ i nhắn', 'sdt', 'budget', 'optIn', 'details', 'Email', 'Form ID',
    'mglnd', 'not_sent', 'constructor', 'hoten', 'customCase',
  ]]);
  const result = receiver([target]).post({
    ...payload, sheet: 'Future tab', message: 'Distinct goal', mglnd: '', mgclid: 'alias-click',
    budget: 0, optIn: false, details: { choice: ['a', 'b'] }, email: null,
    hoten: '  =IMPORTXML("unsafe")', customCase: 'Case-sensitive value', customcase: 'not mapped',
  });
  assert.equal(result.success, true);
  assert.ok(result.ignoredFields.includes('customcase'));
  assert.deepEqual(target.rows[1], [
    'Distinct goal', '0900123456', 0, false, '{"choice":["a","b"]}', '',
    'ANY_FUTURE_FORM', 'alias-click', '', '', "'  =IMPORTXML(\"unsafe\")", 'Case-sensitive value',
  ]);
});

test('omitted timestamp is generated, and omitted optional fields remain blank', () => {
  const target = sheet('Any tab');
  const start = Date.now();
  assert.equal(receiver([target]).post({ sheet: 'Any tab', hoten: 'Fixture', sdt: '0012' }).success, true);
  assert.ok(Date.parse(target.rows[1][0]) >= start);
  assert.ok(Date.parse(target.rows[1][0]) <= Date.now());
  assert.equal(target.rows[1][2], '0012');
  assert.deepEqual(target.rows[1].slice(16), ['', '']);
});

test('invalid requests, missing/ambiguous tabs and invalid headers never write to another tab', () => {
  const cases = [
    { label: 'malformed JSON', contents: '{', error: /Invalid JSON/ },
    { label: 'array JSON', contents: '[]', error: /must be an object/ },
    { label: 'null JSON', contents: 'null', error: /must be an object/ },
    { label: 'empty body', contents: '', error: /Missing JSON/ },
    { label: 'missing sheet', data: {}, error: /sheet name/ },
    { label: 'numeric sheet', data: { sheet: 123 }, error: /sheet name/ },
    { label: 'unknown tab', data: { sheet: 'Missing' }, error: /Tab not found/ },
    { label: 'ambiguous tab', tabs: [sheet('Target'), sheet(' TARGET ')], error: /Ambiguous/ },
    { label: 'duplicate aliases', tabs: [sheet('Target', [['Email', 'email']])], error: /Duplicate/ },
    { label: 'missing header', tabs: [sheet('Target', [['', 'hoten']])], error: /text header/ },
    { label: 'non-text header', tabs: [sheet('Target', [['hoten', 123]])], error: /text header/ },
  ];
  for (const fixture of cases) {
    const tabs = fixture.tabs || [sheet('Target', [headers]), sheet('Other active tab', [headers])];
    const before = structuredClone(tabs.map(tab => tab.rows));
    const api = receiver(tabs);
    const result = 'contents' in fixture ? api.raw(fixture.contents) : api.post(fixture.data || { sheet: 'Target' });
    assert.equal(result.success, false, fixture.label);
    assert.match(result.error, fixture.error, fixture.label);
    assert.deepEqual(tabs.map(tab => tab.rows), before, fixture.label);
    assert.deepEqual(api.messages, [], fixture.label);
  }
});

test('append and lock failures return errors, and a subsequent valid append still works', () => {
  const target = sheet('Target', [headers]);
  const api = receiver([target]);
  target.appendError = 'Fixture permission failure';
  assert.deepEqual(api.post({ ...payload, sheet: 'Target' }), { success: false, error: 'Fixture permission failure' });
  assert.equal(target.rows.length, 1);
  assert.deepEqual(api.messages, []);
  target.appendError = '';
  assert.deepEqual(api.post({ ...payload, sheet: 'Target' }), { success: true });
  const busyResult = receiver([target], { busy: true }).post({ ...payload, sheet: 'Target' });
  assert.equal(busyResult.success, false);
  assert.match(busyResult.error, /busy/);
  assert.equal(target.rows.length, 2);
});

test('health checks are read-only, distinguish empty/headered tabs and reject missing tabs', () => {
  const empty = sheet('Empty');
  const filled = sheet('Headered', [headers, expected]);
  const api = receiver([empty, filled]);
  const before = structuredClone([empty.rows, filled.rows]);
  assert.equal(api.get().success, true);
  assert.deepEqual(api.get(' Empty '), {
    success: true, service: 'ERA landing lead receiver', version: '2026-11-18-mail',
    sheet: 'Empty', columns: 0, initialized: false,
  });
  assert.equal(api.get('headered').columns, 18);
  assert.equal(api.get('headered').initialized, true);
  assert.equal(api.get('missing').success, false);
  assert.deepEqual([empty.rows, filled.rows], before);
  assert.deepEqual(api.messages, []);
});

test('a successful append notifies both recipients with only the actual destination tab name', () => {
  const target = sheet('Future landing tab', [headers]);
  const api = receiver([target]);
  assert.deepEqual(api.post({ ...payload, sheet: '  FUTURE LANDING TAB  ' }), { success: true });
  assert.deepEqual(target.rows[1], expected);
  assert.deepEqual(api.messages, [{
    to: 'cuong.letrong@era.com.vn,viet.nguyen@era.com.vn',
    subject: 'ERA Website: Có lead mới',
    body: 'Có lead mới được ghi vào tab: Future landing tab.',
  }]);
});

test('mail quota/authorization errors preserve append success and ignored-field warnings', () => {
  for (const [count, error] of [[16, 'Mail quota exceeded'], [18, 'MailApp authorization required']]) {
    const target = sheet('Any tab', [headers.slice(0, count)]);
    const api = receiver([target], { mailError: error });
    const result = api.post({ ...payload, sheet: 'Any tab' });
    assert.deepEqual(result, {
      success: true,
      ...(count === 16 ? { ignoredFields: ['email', 'message'] } : {}),
      emailNotificationError: error,
    });
    assert.deepEqual(target.rows[1], expected.slice(0, count));
    assert.equal(target.rows.length, 2);
    assert.deepEqual(api.messages, []);
  }
});

test('standalone configuration opens the configured spreadsheet; missing configuration errors clearly', () => {
  const target = sheet('Target', [headers]);
  assert.deepEqual(receiver([target], { configuredId: 'offline-spreadsheet', bound: false })
    .post({ ...payload, sheet: 'Target' }), { success: true });
  assert.match(receiver([], { bound: false }).get().error, /LEAD_SPREADSHEET_ID/);
});
