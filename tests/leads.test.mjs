import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('lead submission source files avoid browser secret exposure', () => {
  const client = fs.readFileSync('src/components/forms/submission.ts', 'utf8');
  assert.equal(client.includes('BIZOSTO_API_KEY'), false);
  assert.equal(client.includes('TURNSTILE_SECRET_KEY'), false);
});

test('environment example keeps secrets server-only', () => {
  const env = fs.readFileSync('.env.example', 'utf8');
  assert.match(env, /BIZOSTO_API_KEY=/);
  assert.equal(env.includes('NEXT_PUBLIC_BIZOSTO'), false);
});
