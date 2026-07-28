import { expect, type Page } from '@playwright/test';
export const serviceRoutes=['/services/custom-website-design','/services/website-development','/services/e-commerce-solutions','/services/conversion-optimization','/services/seo-local-optimization','/services/content-copywriting','/services/hosting-security','/services/analytics-reporting'];
export const packageRoutes=['/packages/starter','/packages/business','/packages/growth'];
export const publicRoutes=['/','/services',...serviceRoutes,'/portfolio','/packages',...packageRoutes,'/about','/contact','/faq','/get-started','/privacy-policy','/terms-and-conditions','/refund-cancellation-policy','/cookie-policy'];
export const campaignRoutes=['/campaigns/cleaning','/campaigns/roofing','/campaigns/landscaping','/campaigns/home-services'];
export async function noConsoleFailures(page:Page){const errors:string[]=[];page.on('console',m=>{if(['error','warning'].includes(m.type()) && /hydration|failed|error/i.test(m.text())) errors.push(m.text());});page.on('pageerror',e=>errors.push(e.message));return errors;}
export async function expectNoOverflow(page:Page){expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBeTruthy();}
