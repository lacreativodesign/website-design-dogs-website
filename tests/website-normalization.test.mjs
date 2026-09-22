import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire, Module } from 'node:module';

const require = createRequire(import.meta.url);

function loadWebsiteModule() {
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
    const key = require.resolve('../src/lib/leads/website.ts');
    delete require.cache[key];
    return require('../src/lib/leads/website.ts');
  } finally {
    if (previous) Module._extensions['.ts'] = previous;
    else delete Module._extensions['.ts'];
  }
}

test('website input accepts customer-friendly domains and normalizes them to https URLs', () => {
  const { normalizeWebsiteInput, isValidWebsiteInput } = loadWebsiteModule();

  assert.equal(normalizeWebsiteInput('bizosto.com'), 'https://bizosto.com/');
  assert.equal(normalizeWebsiteInput('www.bizosto.com'), 'https://www.bizosto.com/');
  assert.equal(
    normalizeWebsiteInput('bizosto.com/pricing?plan=pro'),
    'https://bizosto.com/pricing?plan=pro',
  );
  assert.equal(normalizeWebsiteInput('https://bizosto.com'), 'https://bizosto.com/');
  assert.equal(normalizeWebsiteInput('http://bizosto.com'), 'http://bizosto.com/');
  assert.equal(normalizeWebsiteInput(''), undefined);
  assert.equal(isValidWebsiteInput('bizosto.com'), true);
  assert.equal(isValidWebsiteInput(''), true);
});

test('website input rejects non-web schemes and non-public hostnames', () => {
  const { normalizeWebsiteInput, isValidWebsiteInput } = loadWebsiteModule();

  for (const value of [
    'mailto:hello@example.com',
    'javascript:alert(1)',
    'localhost',
    'http://localhost',
    '127.0.0.1',
    'not a domain',
  ]) {
    assert.equal(normalizeWebsiteInput(value), undefined);
    assert.equal(isValidWebsiteInput(value), false);
  }
});
