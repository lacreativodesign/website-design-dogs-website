import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();
const publicSourceDirs = ['src/app','src/components','src/content'];
const prohibited = [
  /trusted by thousands/i,/thousands of customers/i,/number one/i,/best agency/i,/award-winning/i,
  /guaranteed (results|ranking|leads|revenue)/i,/money-back guarantee/i,/unlimited revisions/i,
  /only \d+ spots left/i,/offer expires/i,/countdown/i,/five-star rating/i,/customer rating/i,
];
function files(dir){ return readdirSync(dir).flatMap(e=>{const p=join(dir,e); return statSync(p).isDirectory()?files(p):[p];}); }

test('visible public content avoids unsupported marketing claims',()=>{
  const offenders=[];
  for(const dir of publicSourceDirs.flatMap(d=>files(join(root,d)))){
    if(!/\.(ts|tsx|mdx?)$/.test(dir)) continue;
    const text=readFileSync(dir,'utf8');
    for(const pattern of prohibited){ if(pattern.test(text) && !/not guaranteed|no guarantee|no money[- ]back guarantee|does not create.*money[- ]back guarantee|no countdown/i.test(text)) offenders.push(`${dir.replace(root+'/','')} matched ${pattern}`); }
  }
  assert.deepEqual(offenders,[]);
});

test('portfolio and campaign concepts remain disclosed',()=>{
  const campaigns=readFileSync(join(root,'src/content/campaigns.ts'),'utf8');
  const portfolioPage=readFileSync(join(root,'src/app/portfolio/page.tsx'),'utf8') + readFileSync(join(root,'src/components/portfolio/portfolio-filter.tsx'),'utf8');
  assert.match(portfolioPage,/DESIGN CONCEPT/i);
  assert.match(campaigns,/design concept/i);
  assert.match(campaigns,/not presented as a completed client project/i);
});
