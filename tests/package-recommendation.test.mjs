import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire, Module } from 'node:module';

const require = createRequire(import.meta.url);

function loadRecommendationModule() {
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
    for (const key of Object.keys(require.cache)) {
      if (
        key.includes('/src/lib/leads/package-recommendation') ||
        key.includes('/src/content/packages')
      ) {
        delete require.cache[key];
      }
    }
    return require('../src/lib/leads/package-recommendation.ts');
  } finally {
    if (previous) Module._extensions['.ts'] = previous;
    else delete Module._extensions['.ts'];
  }
}

const { recommendPackage } = loadRecommendationModule();

const cases = [
  ['website Starter', 'website-design', 'web-pages-1-5', 'web-integrations-1', undefined, 'starter'],
  ['website Essentials', 'website-design', 'web-pages-6-7', 'web-integrations-2', undefined, 'essentials'],
  ['website Business', 'website-design', 'web-pages-8-10', 'web-integrations-3', undefined, 'business'],
  ['website Professional', 'website-design', 'web-pages-11-15', 'web-integrations-5', undefined, 'professional'],
  ['website Growth', 'website-design', 'web-pages-16-20', 'web-integrations-7', undefined, 'growth'],
  ['website Premium', 'website-design', 'web-pages-21-30', 'web-integrations-10', undefined, 'premium'],
  ['ecommerce Shopify Launch', 'e-commerce', 'commerce-products-15', 'commerce-standard', 'Shopify', 'commerce-launch'],
  ['ecommerce Growth', 'e-commerce', 'commerce-products-50', 'commerce-growth', 'Shopify', 'commerce-growth'],
  ['ecommerce Pro', 'e-commerce', 'commerce-products-100', 'commerce-pro', 'WooCommerce', 'commerce-pro'],
  ['SEO Launch', 'seo-local', 'seo-pages-5', 'seo-single-market', undefined, 'seo-launch'],
  ['SEO Growth', 'seo-local', 'seo-pages-10', 'seo-growing', undefined, 'seo-growth'],
  ['SEO Authority', 'seo-local', 'seo-pages-20', 'seo-authority', undefined, 'seo-authority'],
  ['Social Foundation', 'social-media', 'social-foundation', 'social-organic', undefined, 'social-foundation'],
  ['Social Growth', 'social-media', 'social-growth', 'social-one-campaign', undefined, 'social-growth'],
  ['Social Scale', 'social-media', 'social-scale', 'social-three-campaigns', undefined, 'social-scale'],
  ['Care Essential', 'website-care', 'care-30', 'care-monthly', undefined, 'care-essential'],
  ['Care Business', 'website-care', 'care-90', 'care-twice-monthly', undefined, 'care-business'],
  ['Care Priority', 'website-care', 'care-180', 'care-weekly', undefined, 'care-priority'],
  ['App Blueprint', 'mobile-apps', 'app-blueprint', 'app-prototype-only', undefined, 'app-blueprint'],
  ['App MVP', 'mobile-apps', 'app-mvp', 'app-focused', undefined, 'app-launch-mvp'],
  ['App Growth', 'mobile-apps', 'app-growth', 'app-complex', undefined, 'app-growth'],
];

for (const [name, primaryType, size, complexity, platform, expected] of cases) {
  test(name, () => {
    const result = recommendPackage({
      primaryType,
      scope: { size, complexity },
      platform,
    });
    assert.equal(result.packageSlug, expected);
    assert.equal(result.custom, false);
  });
}

test('core package family wins over related add-ons by design', () => {
  const result = recommendPackage({
    primaryType: 'e-commerce',
    scope: {
      size: 'commerce-products-50',
      complexity: 'commerce-growth',
    },
    platform: 'Shopify',
  });
  assert.equal(result.packageSlug, 'commerce-growth');
  assert.equal(result.custom, false);
});

for (const [name, primaryType, size, complexity, platform] of [
  ['website over published limits', 'website-design', 'web-pages-30-plus', 'web-integrations-10'],
  ['commerce over published limits', 'e-commerce', 'commerce-products-100-plus', 'commerce-pro', 'Shopify'],
  ['commerce headless', 'e-commerce', 'commerce-products-50', 'commerce-growth', 'Headless / custom commerce'],
  ['SEO over published limits', 'seo-local', 'seo-pages-20-plus', 'seo-authority'],
  ['social over published limits', 'social-media', 'social-custom', 'social-three-campaigns'],
  ['care over published limits', 'website-care', 'care-180-plus', 'care-weekly'],
  ['app over published limits', 'mobile-apps', 'app-custom', 'app-complex'],
]) {
  test(name, () => {
    const result = recommendPackage({
      primaryType,
      scope: { size, complexity },
      platform,
    });
    assert.equal(result.packageSlug, null);
    assert.equal(result.custom, true);
  });
}

test('not sure does not pretend to know a package', () => {
  const result = recommendPackage({
    primaryType: 'not-sure',
    scope: { size: '', complexity: '' },
  });
  assert.equal(result.packageSlug, 'not-sure');
  assert.equal(result.custom, false);
});
