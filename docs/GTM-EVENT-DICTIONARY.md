# GTM Event Dictionary

Website Design Dogs (`lacreativodesign/website-design-dogs-website`) emits no-PII `dataLayer` events only after the applicable optional consent category is granted and GTM is enabled. GTM is the single intended delivery path for GA4 and Meta; this repository contains no direct Meta Pixel or Conversions API implementation.

Never map names, email addresses, phone numbers, business names, websites, message text, reference IDs, submission IDs, IP addresses, Turnstile tokens, tenant IDs, secrets, arbitrary query strings, or monetary conversion values into GTM.

| Event | Trigger | Allowed properties | Consent | GTM mapping |
| --- | --- | --- | --- | --- |
| `wdd_view_packages` | Packages route view, once per client mount | `pagePath`, `pageType` | Analytics or marketing | Meta `ViewContent`; optional GA4 custom event |
| `wdd_select_package` | A package CTA is selected | `pagePath`, `packageSlug` | Analytics or marketing | Meta `ViewContent` or a custom package-selection event |
| `wdd_quote_start` | First interaction with a contact/quote/campaign form | `pagePath`, `formType`, `packageSlug`, `serviceSlug`, `campaignSlug`, `offerCode`, selected UTM fields | Analytics or marketing | Meta `Contact`; optional GA4 custom event |
| `wdd_lead_submit` | Locally valid form submission is sent to `/api/leads` | Safe form, package/service/campaign, page, and selected UTM properties | Analytics or marketing | Optional diagnostic custom event; never Meta Lead |
| `wdd_lead_success` | `/api/leads` returns accepted success, once per accepted submission | Safe form, package/service/campaign, page, and selected UTM properties | Analytics or marketing | GA4 `generate_lead`; Meta `Lead` |
| `wdd_lead_error` | `/api/leads` rejects or cannot accept a locally valid submission | Safe form, package/service/campaign, page, `failureCategory`, selected UTM properties | Analytics or marketing | Optional diagnostic custom event; never Meta Lead |

## GTM configuration

1. Enable GTM only with `NEXT_PUBLIC_ENABLE_GTM=true`, a valid `NEXT_PUBLIC_GTM_ID`, and the consent banner enabled.
2. Configure Consent Initialization defaults as denied for analytics and advertising storage; honor the application updates for analytics and marketing selections.
3. Use either these application page events or GTM History Change page views—not both for the same measurement destination.
4. Gate GA4 tags on analytics consent and Meta tags on marketing consent. The `wdd_lead_success` trigger must be the only Meta Lead trigger.
5. Validate with GTM Preview and Meta Events Manager before claiming Pixel or Lead delivery is live.
