type Data={formType:string; packageCategory?:string; serviceCategory?:string; campaign?:string; failureCategory?:string; pagePath?:string};
declare global{interface Window{dataLayer?:Array<Record<string,unknown>>}}
export function leadEvent(name:"wdd_lead_submit_started"|"wdd_lead_submit_success"|"wdd_lead_submit_failed",data:Data){ if(typeof window==="undefined")return; window.dispatchEvent(new CustomEvent(name,{detail:data})); if(Array.isArray(window.dataLayer)) window.dataLayer.push({event:name,...data}); }
