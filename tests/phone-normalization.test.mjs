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

test('keeps national-format normalization available for existing integrations', () => {
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

test('accepts explicit international numbers without requiring a country selector', () => {
  const { normalizePhoneNumber } = loadPhoneModule();

  assert.equal(
    normalizePhoneNumber('US', '+971 50 123 4567'),
    '+971501234567',
  );
  assert.equal(
    normalizePhoneNumber('US', '+44 20 7946 0018'),
    '+442079460018',
  );
  assert.equal(
    normalizePhoneNumber('US', '+92 300 1234567'),
    '+923001234567',
  );
});

test('infers country metadata from explicit international numbers', () => {
  const { inferPhoneCountryFromInput } = loadPhoneModule();

  assert.equal(inferPhoneCountryFromInput('(415) 900-2374'), 'US');
  assert.equal(inferPhoneCountryFromInput('+971 50 123 4567'), 'AE');
  assert.equal(inferPhoneCountryFromInput('+44 20 7946 0018'), 'GB');
  assert.equal(inferPhoneCountryFromInput('+92 300 1234567'), 'PK');
  assert.equal(inferPhoneCountryFromInput('+254 712 345678'), 'INTL');
});

test('rejects implausible local US numbers', () => {
  const { normalizePhoneNumber } = loadPhoneModule();
  assert.equal(normalizePhoneNumber('US', '555-0100'), undefined);
});
