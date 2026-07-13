#!/usr/bin/env node
const prod = process.argv.includes('--production');
const rows=[];
const add=(level,msg)=>rows.push({level,msg});
const env=process.env;
const mask=(v)=>v?`${String(v).slice(0,3)}…configured`:'not configured';
function url(name,{https=false,required=false,noLocal=false,noPreview=false}={}){ const v=env[name]; if(!v){
    if(required) add('BLOCKER',`${name} missing`); else add('WARNING',`${name} not configured`);
    return null;
  } try{const u=new URL(v); if(https&&u.protocol!=='https:') add('BLOCKER',`${name} must be HTTPS`); if(noLocal&&/localhost|127\.0\.0\.1/.test(u.hostname)) add('BLOCKER',`${name} cannot be localhost for production`); if(noPreview&&/vercel\.app$/.test(u.hostname)) add('BLOCKER',`${name} cannot be a Vercel preview hostname for production`); add('PASS',`${name} valid URL`); return u;}catch{add('BLOCKER',`${name} invalid URL`);return null;}}
const site=url('NEXT_PUBLIC_SITE_URL',{required:prod,noLocal:prod,noPreview:prod});
if(env.LEAD_SUBMISSION_ENABLED==='true'){
 url('BIZOSTO_API_URL',{https:true,required:true});
 ['BIZOSTO_TENANT_ID','BIZOSTO_API_KEY'].forEach(k=>env[k]?add('PASS',`${k} configured`):add('BLOCKER',`${k} missing`));
 ['BIZOSTO_API_KEY_HEADER','BIZOSTO_TENANT_HEADER'].forEach(k=>{ if(env[k]&&!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(env[k])) add('BLOCKER',`${k} invalid header name`); else add('PASS',`${k} acceptable`); });
 if(site && !(env.LEAD_ALLOWED_ORIGINS||'').split(',').includes(site.origin)) add('BLOCKER','LEAD_ALLOWED_ORIGINS must include production origin');
 ['LEAD_REQUEST_TIMEOUT_MS','LEAD_RATE_LIMIT_WINDOW_MS','LEAD_RATE_LIMIT_MAX'].forEach(k=>{ if(env[k] && Number(env[k])>0) add('PASS',`${k} valid`); else add('WARNING',`${k} using default or missing`); });
} else add(prod?'BLOCKER':'WARNING','LEAD_SUBMISSION_ENABLED is not true');
if(env.TURNSTILE_REQUIRED==='true'){ if(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) add('PASS','Turnstile public key configured'); else add('BLOCKER','Turnstile public key missing');
 if(env.TURNSTILE_SECRET_KEY) add('PASS','Turnstile secret configured'); else add('BLOCKER','Turnstile secret missing'); }
if(env.NEXT_PUBLIC_ENABLE_GTM==='true'){ if(/^GTM-[A-Z0-9]{6,}$/.test(env.NEXT_PUBLIC_GTM_ID||'')) add('PASS',`GTM ID ${mask(env.NEXT_PUBLIC_GTM_ID)}`); else add('BLOCKER','Valid GTM ID missing'); if(env.NEXT_PUBLIC_CONSENT_BANNER_ENABLED==='false') add('BLOCKER','GTM requires consent banner enabled'); }
['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION','NEXT_PUBLIC_BING_SITE_VERIFICATION','NEXT_PUBLIC_META_DOMAIN_VERIFICATION'].forEach(k=>{
  const level = env[k] ? 'PASS' : 'WARNING';
  add(level,`${k} ${env[k]?'configured':'not configured'}`);
});
if(env.ALLOW_PREVIEW_LEAD_SUBMISSION==='true') add('WARNING','ALLOW_PREVIEW_LEAD_SUBMISSION is true; keep false unless intentionally testing preview leads');
for(const r of rows) console.log(`${r.level}: ${r.msg}`);
process.exit(rows.some(r=>r.level==='BLOCKER')?1:0);
