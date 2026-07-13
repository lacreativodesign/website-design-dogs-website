type LeadData={formType:string; packageCategory?:string; serviceCategory?:string; campaign?:string; failureCategory?:string; pagePath?:string};
type CampaignData={campaignSlug:string;offerCode:string;pagePath?:string;placement?:string;projectType?:string;failureCategory?:string;utmCampaign?:string;utmSource?:string;utmMedium?:string};
declare global{interface Window{dataLayer?:Array<Record<string,unknown>>}}
function emit(name:string,data:Record<string,unknown>){ if(typeof window==="undefined")return; window.dispatchEvent(new CustomEvent(name,{detail:data})); if(Array.isArray(window.dataLayer)) window.dataLayer.push({event:name,...data}); }
export function leadEvent(name:"wdd_lead_submit_started"|"wdd_lead_submit_success"|"wdd_lead_submit_failed",data:LeadData){emit(name,data)}
export function campaignEvent(name:"wdd_campaign_page_view"|"wdd_campaign_cta_click"|"wdd_campaign_form_started"|"wdd_campaign_form_submit_started"|"wdd_campaign_form_submit_success"|"wdd_campaign_form_submit_failed",data:CampaignData){emit(name,data)}
