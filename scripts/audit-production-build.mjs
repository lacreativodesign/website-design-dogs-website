#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const blockers = [];
const warnings = [];
const forbiddenNames = new Set(['.env', '.env.local', 'tsconfig.tsbuildinfo']);
const forbiddenExt = ['.zip'];
const artifactDirs = new Set(['playwright-report', 'test-results', 'blob-report']);
const staticDir = join(root, '.next', 'static');

function safe(path){ return relative(root, path) || '.'; }
function walk(dir, visit){
  if(!existsSync(dir)) return;
  for(const entry of readdirSync(dir)){
    if(entry === 'node_modules' || entry === '.git') continue;
    const path = join(dir, entry); const st = statSync(path);
    if(st.isDirectory()) { visit(path, true); walk(path, visit); } else visit(path, false);
  }
}

walk(root, (path, isDir)=>{
  const name = path.split('/').pop();
  if(isDir && artifactDirs.has(name)) blockers.push(`Forbidden test artifact directory: ${safe(path)}`);
  if(!isDir && (forbiddenNames.has(name) || forbiddenExt.some(ext=>name.endsWith(ext)))) blockers.push(`Forbidden generated/committed file: ${safe(path)}`);
});

if(!existsSync(join(root, '.next'))) blockers.push('Missing .next output; run npm run build before build:audit.');

const secretKeys = ['BIZOSTO_INGEST_KEY','TURNSTILE_SECRET_KEY','META_CAPI_ACCESS_TOKEN','RESEND_API_KEY'];
const actualSecrets = secretKeys.map(k=>[k, process.env[k]]).filter(([,v])=>Boolean(v && String(v).length > 3));
walk(staticDir, (path, isDir)=>{
  if(isDir) return;
  const text = readFileSync(path, 'utf8');
  for(const [key,value] of actualSecrets){ if(text.includes(value)) blockers.push(`Secret value leaked to client static output near ${key}: ${safe(path)}`); }
  if(/fbq\s*\(/.test(text)) blockers.push(`Direct Meta Pixel initialization found: ${safe(path)}`);
  if(/gtag\s*\(\s*['"]config['"]/.test(text)) blockers.push(`Direct GA4 config found: ${safe(path)}`);
  if(/GTM-XXXX|GTM-PLACEHOLDER|google-site-verification-placeholder|bing-placeholder/i.test(text)) blockers.push(`Placeholder verification/tracking value found: ${safe(path)}`);
});

const serverText = ['.next/server/app/sitemap.xml.body', '.next/server/app/sitemap.xml.meta']
  .map(p=>join(root,p)).filter(existsSync).map(p=>readFileSync(p,'utf8')).join('\n');
if(serverText){
  if(/vercel\.app/.test(serverText)) blockers.push('Vercel preview hostname found in sitemap artifact.');
  if(/<loc>[^<]*\/campaigns\//.test(serverText)) blockers.push('Campaign route found in sitemap artifact.');
  if(/<loc>[^<]*\/api\//.test(serverText)) blockers.push('API route found in sitemap artifact.');
}

if(warnings.length) warnings.forEach(w=>console.warn(`WARNING: ${w}`));
if(blockers.length){ blockers.forEach(b=>console.error(`BLOCKER: ${b}`)); process.exit(1); }
console.log('Production build audit passed.');
