# GTM Event Dictionary

Application events are no-PII `dataLayer` events configured in GTM, not hardcoded GA4 or Meta scripts. Forbidden for every event: names, emails, phones, business names, websites, form text, reference IDs, submission IDs, IP addresses, Turnstile tokens, arbitrary query strings, Bizosto IDs, tenant IDs, purchase/revenue data.

| Event | Trigger | Allowed properties | Consent | GA4 mapping | Meta mapping | Deduplication/Test |
|---|---|---|---|---|---|---|
| `wdd_page_view` | App route view | pagePath,pageType,utmSource,utmMedium,utmCampaign | analytics | page_view | none/custom | Use this or GTM history, not both. Navigate once. |
| `wdd_theme_changed` | Theme toggle | theme,pagePath | analytics | custom | none | Toggle once. |
| `wdd_primary_cta_click` | CTA click | placement,pagePath,pageType | analytics | custom | none | Click CTA. |
| `wdd_portfolio_filter_used` | Portfolio filter | portfolioCategory,pagePath | analytics | custom | none | Filter once. |
| `wdd_faq_opened` | FAQ opened | faqId,faqPosition,pagePath | analytics | custom | none | Open answer. |
| `wdd_package_selected` | Package CTA | packageCategory,pagePath | analytics | select_item/custom | none | Click package. |
| `wdd_lead_submit_started` | Contact/quote submit attempt | formType,packageCategory,serviceCategory,pagePath,utmSource,utmMedium,utmCampaign | analytics | custom | none | Submit valid form. |
| `wdd_lead_submit_success` | Confirmed API success | formType,packageCategory,serviceCategory,pagePath,utmSource,utmMedium,utmCampaign | analytics/marketing | generate_lead | Lead | One success only after API success. |
| `wdd_lead_submit_failed` | API or validation failure | formType,failureCategory,pagePath | analytics | custom | none | Force failure. |
| `wdd_campaign_page_view` | Campaign route view | pagePath,pageType,campaignSlug,offerCode | analytics/marketing | page_view/custom | PageView/custom | Avoid duplicate GTM page views. |
| `wdd_campaign_cta_click` | Campaign CTA | campaignSlug,placement,offerCode,pagePath | analytics/marketing | custom | custom | Click CTA. |
| `wdd_campaign_form_started` | Campaign form interaction | campaignSlug,formType,offerCode,pagePath | analytics | custom | none | Focus form. |
| `wdd_campaign_form_submit_started` | Campaign submit attempt | campaignSlug,formType,offerCode,pagePath | analytics | custom | none | Submit. |
| `wdd_campaign_form_submit_success` | Confirmed campaign API success | campaignSlug,formType,offerCode,pagePath,utmSource,utmMedium,utmCampaign | analytics/marketing | generate_lead | Lead | No purchase/revenue. |
| `wdd_campaign_form_submit_failed` | Campaign failure | campaignSlug,formType,failureCategory,pagePath | analytics | custom | none | Force failure. |
| `wdd_consent_banner_viewed` | Banner shown | pagePath | none | custom optional | none | First visit. |
| `wdd_consent_updated` | Preferences saved | consentAnalytics,consentMarketing | necessary | custom optional | none | Save preferences. |
