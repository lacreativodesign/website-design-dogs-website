import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire, Module } from 'node:module';

const require = createRequire(import.meta.url);

function loadPhoneModule() {
  const typescript = require('typescript');
  const previous = Module._extensions['.ts'];

  Module._extensions['.ts'] = (module, filename) => {
    const source = fs.readFileSync(filename, 'utf8');
    const result = typescript.transpileModule(source, {
      compilerOptions: {
        module: typescript.ModuleKind.CommonJS,
        target: typescript.ScriptTarget.ES2022,
      },
    });
    module._compile(result.outputText, filename);
  };

  try {
    delete require.cache[require.resolve('../src/lib/leads/phone.ts')];
    return require('../src/lib/leads/phone.ts');
  } finally {
    if (previous) Module._extensions['.ts'] = previous;
    else delete Module._extensions['.ts'];
  }
}

test('normalizes familiar US local formatting to E.164', () => {
  const { normalizePhoneNumber } = loadPhoneModule();
  assert.equal(
    normalizePhoneNumber('US', '(415) 900-2374'),
    '+14159002374',
  );
});

test('normalizes Pakistan and UK national formats using the selected country', () => {
  const { normalizePhoneNumber } = loadPhoneModule();
  assert.equal(
    normalizePhoneNumber('PK', '0300 1234567'),
    '+923001234567',
  );
  assert.equal(
    normalizePhoneNumber('GB', '020 7946 0018'),
    '+442079460018',
  );
});

test('other international accepts an explicit international number', () => {
  const { normalizePhoneNumber } = loadPhoneModule();
  assert.equal(
    normalizePhoneNumber('INTL', '+254 712 345678'),
    '+254712345678',
  );
});

test('rejects a country-code mismatch and implausible US number', () => {
  const { normalizePhoneNumber } = loadPhoneModule();
  assert.equal(normalizePhoneNumber('US', '+92 300 1234567'), undefined);
  assert.equal(normalizePhoneNumber('US', '555-0100'), undefined);
});
